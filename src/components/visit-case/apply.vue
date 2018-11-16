<template>
  <!--各种申请操作-->
  <section class="component apply">
    <el-form label-width="120px" class="text-left tableInput" ref="apply-circulation" :rules="rules" :model="model">
      <!--停催-->
      <el-form-item label="停催到期时间" prop="pauseDueTime" v-if="applyType==='PAUSE_CASE'">
        <el-date-picker v-model="model.pauseDueTime" :picker-options="$common.datePickDisabledDate(1)" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" @change="pauseDueTimeChange">
        </el-date-picker>
      </el-form-item>
      <!--流转-->
      <el-form-item label="流转去向" prop="turnSource" v-if="applyType==='TURN_CASE'">
        <el-select v-model="model.turnSource" placeholder="请选择" clearable>
          <el-option v-for="{index,name,code} in $dict.getDictData('TurnGoal').filter(v => v.code.startsWith(fromChannel))" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <!--人工划扣-->
      <template v-if="applyType === 'REPAY_AUTO'">
        <el-form-item prop="repaymentType" label="划扣方式">
          <el-radio-group v-model="repaymentType">
            <el-radio label="MULTIPERIOD">划扣</el-radio>
            <el-radio label="ADVANCE">提前结清</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="repaymentPeriods" label="划扣期数" v-if="repaymentType === 'MULTIPERIOD'">
          <el-input v-model="model.repaymentPeriods" type="number">
            <template slot="append">期</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repayAmount" label="还款金额" v-if="repaymentType === 'MULTIPERIOD'">
          <el-input v-model="model.repayAmount" type="number">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </template>
      <!--协催-->
      <template v-if="applyType === 'ASSIT_COLLECTOR'">
        <el-form-item label="协催类型" prop="assistType" v-if="model.assistType!=='SELF_VISIT'">
          <el-select placeholder="请选择" v-model="model.assistType">
            <el-option v-for="{index,name,code} in assistType" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址类型" prop="addressType" v-if="model.assistType==='ASSIT_VISIT' && model.assistType !== 'SELF_VISIT'">
          <el-select placeholder="请选择" v-model="model.addressType">
            <el-option v-for="{index,name,code} in $dict.getDictData('AddressType')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省份/城市/区" prop="areaIds" v-if="model.assistType==='ASSIT_VISIT' && model.assistType !== 'SELF_VISIT'">
          <el-cascader v-model="model.areaIds" :options="$city.getCityData()" change-on-select clearable></el-cascader>
        </el-form-item>
        <el-form-item label="外访地址" prop="addressDetail" v-if="model.assistType==='ASSIT_VISIT' && model.assistType !== 'SELF_VISIT'">
          <el-input v-model="model.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="协催到期时间" prop="visitEndDate">
          <el-date-picker v-model="model.visitEndDate" :picker-options="$common.datePickDisabledDate(1)" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
      </template>
      <template v-if="applyType === 'DERATE_CASE'">
        <el-form-item label="申请减免金额" prop="derateAmount">
          <el-input-number :min="0" v-model="model.derateAmount" :precision="2"></el-input-number>
        </el-form-item>
        <el-form-item label="上传文件" prop="fileIds">
          <file-upload ref="upload_case_import" :fileList.sync="fileList" :AllowExtension="['xlsx','xls','jpg','png']"></file-upload>
        </el-form-item>
      </template>
      <!--通用原因-->
      <el-form-item label="申请原因" prop="applyDescription">
        <el-input type="textarea" v-model="model.applyDescription" :rows="3" :maxlength="500"></el-input>
      </el-form-item>

    </el-form>
    <div class="operate-buttons">
      <el-button @click="close">取消</el-button>
      <el-button @click="commit" :loading="submitLoading">确定</el-button>
    </div>

    <el-dialog title="检查结果" width="800px" :visible.sync="dialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <check-apply :applyType="applyType" :messageData="checkMessages" @success="dialog = false;confirmSubmit()" @close="cancelContinue()"></check-apply>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import {  namespace } from 'vuex-class';
import { CaseApplyRecordService } from '~/services/domain-service/case-apply-record.service';
import { VisitCaseManageService } from '~/services/domain-service/visit-case-manage.service';
import { FlowTaskService } from '~/services/domain-service/flow-task.service';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { CASE_CHANNEL, ApplyType } from "~/config/enum.config";
import FileUpload from '~/components/common/file-upload.vue';
import { Form } from "element-ui";
import CheckApply from "./check-apply.vue"

const CollectionExecution = namespace('collection-execution');

@Component({
  components: {
    FileUpload,
    CheckApply
  },
})
export default class Apply extends Vue {
  @Dependencies(CaseApplyRecordService)
  private caseApplyRecordService: CaseApplyRecordService;
  @Dependencies(VisitCaseManageService)
  private visitCaseManageService: VisitCaseManageService;
  @Dependencies(FlowTaskService)
  private flowTaskService: FlowTaskService;

  @CollectionExecution.State('perDueDate') private perDueDate;

  /**
   * 案件ID
   */
  @Prop({ type: Array, required: true })
  private caseIds;

  /**
   * 申请类型
   */
  @Prop({ type: String })
  private applyType;

  @Prop({ type: String })
  private fromChannel;

  @Prop({ type: Object })
  private otherData;

  private caseList: any = []; // 案件数组
  private model: any = null;
  private rules: any = null;

  private dialog: boolean = false;
  private submitLoading: boolean = false;
  private fileList: any[] = [];
  private checkMessages:any = {}

  private created() {
    this.fileList = []
    this.model = {
      applyCategory: '',
      applyDescription: '',
      caseIds: [],
      turnSource: '',
      pauseDueTime: '',
      repaymentType: '', // 划扣类型
      repaymentPeriods: '', // 划扣期数
      repayAmount: '', // 还款金额
      assistType: '', // 协催类型
      addressDetail: '',
      addressType: 'HOUSE_ADDR',
      visitEndDate: '',
      areaIds: [],
      areaId: '',
      personalAddressId: '',
      derateAmount: '',
      fileIds: [],
      confirm: 0
    }
    this.rules = {
      applyDescription: { required: true, message: '请输入申请原因', trigger: 'blur' },
      turnSource: { required: true, message: '请选择流转去向', trigger: 'change' },
      pauseDueTime: { required: true, message: '请选择停催到期时间' },
      repaymentType: { required: true, message: '请选择划扣方式' },
      repaymentPeriods: { required: true, message: '请输入划扣期数' },
      repayAmount: { required: true, message: '请输入还款金额' },
      assistType: { required: true, message: '请选择协催类型' },
      addressType: { required: true, message: '请选择地址类型' },
      addressDetail: { required: true, message: '请输入外访地址' },
      visitEndDate: { required: true, message: '请选择协催到期时间' },
      areaIds: { required: true, message: '请选择省份/城市/地区' },
      derateAmount: { required: true, message: '请输入申请减免金额' }
    }
  }


  @Emit('close')
  private close() {
    this.fileList = []
    this.checkMessages = {}
    const form = this.$refs['apply-circulation'] as Form;
    form.resetFields()
  }

  @Watch("otherData", { immediate: true })
  private onOtherDataChange(val) {
    if (!val) return
    if (val.assistType) {
      this.$nextTick(() => {
        this.model.assistType = val.assistType
      })
    }
  }


  //过滤协催类型
  private get assistType() {
    // 要过滤的字段
    const disabledAssistTypes: any = ["LAWER_IN", "LAWER_OUT", "SELF_VISIT"]
    // 如果是外访，将外访协催禁用
    if (this.fromChannel === CASE_CHANNEL.visit) disabledAssistTypes.push("ASSIT_VISIT")
    return this.$dict.getDictData('AssistType').filter(v => !disabledAssistTypes.includes(v.code))
  }



  private refresh(selectionList) {
    this.caseList = selectionList;
    this.model.caseIds = this.caseList.map((v) => v.id);
  }

  /**
   * 提交前检查
   */
  private commit() {
    const ApplyCirculation: any = this.$refs['apply-circulation'];
    ApplyCirculation.validate((valid) => {
      if (!valid) return false;
      this.model.confirm = 0;
      this.commitNext();
    });
  }

  /**
   * 
   */
  private commitNext() {
    this.flowTaskService
      .checkApplyCategory({ applyCategory: this.applyType })
      .subscribe((data) => {
        // 0 拒绝，1 提示，2 通过
        if (data.status === 1) {
          this.$confirm("该" + this.$dict.getDictName(this.applyType, 'ApplyCategory') + "申请将直接生效，是否继续?", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submit();
          }).catch(() => {
            this.submitLoading = false
          });
        } else if (data.status === 2) {
          this.submit();
        }
      }, this.error); 
  }

  private confirmSubmit() {
    this.model.confirm = 1;
    this.submit()
  }

  private cancelContinue() {
    this.dialog = false;
    this.submitLoading = false;
  }

  /**
   * 提交申请
   */
  private submit() {
    this.submitLoading = true
    this.model.caseIds = this.caseIds;
    this.model.applyCategory = this.applyType;
    switch (this.applyType) {
      // 委外调账
      case ApplyType.adjustment.value:
        break;
      // 协催
      case ApplyType.assist.value:
        this.assistCollector()
        break;
      // 核销
      case ApplyType.verify.value:
        break;
      // 正常留案
      case ApplyType.leave.value:
        this.normalLeave();
        break;
      // 协催留案
      case ApplyType.assistLeave.value:
        this.assistLeave();
        break;
      // 暂停催收
      case ApplyType.pause.value:
        this.pause();
        break;
      // 停催激活
      case ApplyType.active.value:
        this.active();
        break;
      // 流转
      case ApplyType.turn.value:
        this.applyTurnCase();
        break;
      // 减免
      case ApplyType.derate.value:
        this.derateCase()
        break;
      // 人工扣划
      case ApplyType.repay.value:
        this.repay();
        break;
      // 回收案件
      case ApplyType.recycle.value:
        this.recyle();
        break;
      default:
        break;
    }
  }

  /**
   * 流转
   */
  private applyTurnCase() {
    this.caseApplyRecordService
      .applyTurnCase(this.model)
      .subscribe(this.success, this.error);
  }

  /**
   * 正常留案
   */
  private normalLeave() {
    this.caseApplyRecordService
      .applyLeaveCase(this.model)
      .subscribe(this.success, this.error);
  }

  /**
   * 暂停
   */
  private pause() {
    let requestModel = this.model;
    if (this.otherData) {
      requestModel = { ...this.model, ...this.otherData };
    }
    this.caseApplyRecordService
      .applyPauseCase(requestModel)
      .subscribe(this.success, this.error);
  }

  /**
   * 激活
   */
  private active() {
    this.caseApplyRecordService
      .applyPauseCaseActive(this.model)
      .subscribe(this.success, this.error);
  }

  /**
   * 回收
   */
  private recyle() {
    this.visitCaseManageService
      .returnCase(this.model)
      .subscribe(this.success, this.error);
  }

  /**
   * 协催留案
   */
  private assistLeave() {
    this.caseApplyRecordService
      .applyAssistLeaveCase(this.model)
      .subscribe(this.success, this.error);
  }

  /**
   * 申请成功 
   */
  private success(data: any) {
    if (data && data.status !== 2) {
      this.checkMessages = data
      this.dialog = true
    } else {
      this.submitLoading = false
      this.$message.success('操作成功');
      this.close();
    }
  }

  /**
   * 申请失败
   */
  private error() {
    this.submitLoading = false
  }

  private get repaymentType() {
    return this.model.repaymentType;
  }

  /**
   * 划扣时如果选择提前结清，需要清除划扣期数
   */
  private set repaymentType(val) {
    if (val !== 'MULTIPERIOD') {
      this.model.repaymentPeriods = '';
    }
    this.model.repaymentType = val;
  }

  /**
   * 划扣
   */
  private repay() {
    this.caseApplyRecordService
      .applyRepay(this.model)
      .subscribe(this.success, this.error);
  }

  private pauseDueTimeChange() {
    const currentDay: any = new Date(this.model.pauseDueTime);
    const nextDay: any = new Date();
    if (nextDay.getDate() > this.perDueDate) {
      nextDay.setMonth(nextDay.getMonth() + 1);
    }
    nextDay.setDate(this.perDueDate);
    if (currentDay > nextDay) {
      this.$message.warning('当前选择日期超过下个账单日');
    }
  }

  /**
   * 协催
   */
  private assistCollector() {
    this.model.areaId = this.model.areaIds[this.model.areaIds.length - 1];
    this.model.personalAddressId = this.otherData.personalAddressId;
    this.caseApplyRecordService
      .applyCaseAssist(this.model)
      .subscribe(this.success, this.error);
  }

  /**
   * 减免
   */
  private derateCase() {
    this.model.fileIds = this.fileList.map((v) => v.response.id);
    this.caseApplyRecordService.applyDerate(this.model).subscribe(this.success, this.error)
  }

}
</script>

<style lang="less" scoped>
.component.apply {
  .el-radio-group {
    margin-top: 0;
    line-height: 0;
  }
}
</style>
