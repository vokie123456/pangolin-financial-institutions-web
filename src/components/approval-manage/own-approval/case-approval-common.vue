<template>
  <!--我的审批-公共审批-组件 -->
  <section class="component case-approval-common">
    <el-form ref='form' :rules="rules" label-width="90px" :model="applyModel">
      <!-- 停催-->
      <el-row>
        <el-col :span="12">
          <el-form-item label="停催类型" v-if="rowData.applyCategory==='PAUSE_CASE'">
            <el-select placeholder="请选择" v-model="rowData.caseHaltCategory" disabled>
              <el-option v-for="{index,name,code} in $dict.getDictData('CaseHaltCategory')" :key="index" :label="name" :value="code" disabled>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="停催到期时间" v-if="rowData.applyCategory==='PAUSE_CASE'">
            <el-date-picker v-model="rowData.pauseDueTime" type="date" placeholder="请选择日期" readonly @change="pauseDueTimeChange">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 减免 -->
      <el-form-item label="减免金额" v-if="rowData.applyCategory==='DERATE_CASE'">
        <el-input readonly :value="rowData.derateAmount"></el-input>
      </el-form-item>
      <!-- 流转 -->
      <el-form-item label="流转去向" v-if="rowData.applyCategory==='TURN_CASE'">
        <el-select placeholder="请选择" v-model="rowData.turnGoal" disabled>
          <el-option v-for="{index,name,code} in $dict.getDictData('TurnGoal')" :key="index" :label="name" :value="code" disabled>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 协催 -->
      <el-form-item label="协催类型" v-if="rowData.applyCategory==='ASSIT_COLLECTOR'">
        <el-select placeholder="请选择" v-model="rowData.assistType" disabled>
          <el-option v-for="{index,name,code} in $dict.getDictData('AssistType')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协催到期时间" v-if="rowData.applyCategory==='ASSIT_COLLECTOR'">
        <el-date-picker v-model="rowData.visitEndDate" type="date" placeholder="请选择日期" readonly>
        </el-date-picker>
      </el-form-item>
      <!-- 划扣 -->
      <el-form-item v-if="rowData.applyCategory==='REPAY_AUTO'" label-width="24px">
        <el-row>
          <el-col :span='3'>
            <el-radio disabled v-model="rowData.repaymentType" label="MULTIPERIOD" style="margin-top:7px;">划扣</el-radio>
          </el-col>
          <el-col :span='5'>
            <el-input disabled v-model="rowData.repaymentPeriods" type="number">
              <template slot="append">期</template>
            </el-input>
          </el-col>
          <el-col :span='3' :offset="5">
            <el-radio disabled v-model="rowData.repaymentType" label="ADVANCE">提前结清</el-radio>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 公共 -->
      <el-form-item label="申请人">
        <el-input readonly :value="rowData.applyRealName"></el-input>
      </el-form-item>
      <el-form-item label="申请原因" v-if="rowData.applyCategory!=='REPAY_AUTO'">
        <el-input type="textarea" :value="rowData.applyDescription" readonly></el-input>
      </el-form-item>
      <el-form-item label="审批历史">
        <data-box :data="recordHistory">
          <template slot="columns">
            <el-table-column prop="approvalRealName" label="审批人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="approvalTime" label="审批时间" :formatter="(row) => $filter.dateTimeFormat(row.approvalTime)" :min-width="$helper.getColumnWidth(5)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="applyStatus" label="审批结果" :formatter="(row) => $filter.dictConvert(row.applyStatus,'ApplyStatus')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="approvalOpinion" label="审批意见" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
            </el-table-column>
          </template>
        </data-box>
      </el-form-item>
      <el-form-item label="审批意见" prop="approvalOpinion" v-if="rowData.applyStatus==='PENDING'">
        <el-input type="textarea" v-model="applyModel.approvalOpinion" :readonly="rowData.applyStatus!=='PENDING'"></el-input>
      </el-form-item>
    </el-form>
    <div class="confirm-button" v-if="rowData.applyStatus==='PENDING'">
      <el-button @click="commit('REJECT')" :loading="submitLoading">拒绝</el-button>
      <el-button @click="commit('PASS')" :loading="submitLoading">同意</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { CaseApplyRecordService } from '~/services/domain-service/case-apply-record.service';

const CollectionExecution = namespace('collection-execution');

@Component({
  components: {
    DataBox,
  },
})
export default class CaseApprovalCommon extends Vue {
  @Dependencies(CaseApplyRecordService)
  private caseApplyRecordService: CaseApplyRecordService;
  private submitLoading: boolean = false;
  private rules: any = {
    applyStatus: [{ required: true, message: '请选择审批状态' }],
    approvalOpinion: [{ required: true, message: '请输入审批意见' }],
  };
  private applyModel: any = {
    applyStatus: 'PASS',
    approvalOpinion: '',
    id: '',
  };
  private recordHistory: any[] = [];
  @CollectionExecution.State('perDueDate')
  private perDueDate;
  @Prop({ required: true })
  private rowData: string;
  @Watch('rowData', { immediate: true })
  private idChange(value) {
    this.applyModel.id = value.id;
    this.caseApplyRecordService
      .recordHistory({ applyId: value.id })
      .subscribe((data) => {
        this.recordHistory = data;
      });
  }
  @Emit('close')
  private close() {
    this.reset();
  }

  private reset() {
    const form: any = this.$refs['form'];
    form.resetFields();
  }

  private commit(applyStatus) {
    const form: any = this.$refs['form'];
    form.validate((result) => {
      if (!result) return;
      this.applyModel.applyStatus = applyStatus;
      this.submitLoading = true;
      this.caseApplyRecordService.dealApply(this.applyModel).subscribe(
        (data) => {
          this.submitLoading = false;
          this.$message.success('审批成功');
          this.close();
        },
        (err) => {
          this.submitLoading = false;
        },
      );
    });
  }

  private pauseDueTimeChange() {
    console.log(this.perDueDate)
  }
}
</script>

<style lang="less">
.component.case-approval-common {
  .data-box > * {
    padding: 0 !important;
  }
}
</style>
