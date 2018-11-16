<template>
  <!-- 协催诉讼待分配-确认分案-组件 -->
  <section class="component assist-visit-confirm-distribution">
    <distribution-pattern v-model="model.distributeMode"> </distribution-pattern>
    <data-box :data="userDataSet" ref="data-box">
      <template slot="columns">
        <el-table-column prop="userName" label="用户名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="realName" label="催收员" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="currentNum" label="当前案件数" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="currentAmt" label="当前案件总金额" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column label="确认分配案件数" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-input :disabled="model.distributeMode!=='BY_CUSTOMIZE'" type="number" :maxlength="2" v-model="scope.row.num" :min="0" :max="inputMax"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sumCapital" label="案件本金" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => this.isCustomerDistribution? '-':row.sumCapital">
        </el-table-column>
        <el-table-column prop="sumAmt" label="案件总金额" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => this.isCustomerDistribution? '-':row.sumAmt">
        </el-table-column>
        <el-table-column prop="sumNum" label="案件总数量" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => this.isCustomerDistribution? '-':row.sumNum">
        </el-table-column>
      </template>
    </data-box>
    <div style="text-align:center;margin-top:30px;">
      <el-button @click="back">上一步</el-button>
      <el-button @click="cancle">取消</el-button>
      <el-button @click="next">确定</el-button>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { Prop, Emit, Watch } from 'vue-property-decorator';
import { CaseAssitVisitStayService } from '~/services/domain-service/case-assist-visit-stay.service.ts';
import { CaseAssistService } from '~/services/domain-service/case-assist.service.ts';
import { CaseAssistAntiFraudCaseStayService } from '~/services/domain-service/case-assist-anti-fraud-case-stay.service.ts';

import DistributionPattern from '~/components/distribution-common/distribution-pattern.vue';


@Component({
  components: {
    DataBox,
    DistributionPattern,
  },
})
export default class AssistLawsuitConfirmDistribution extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(CaseAssitVisitStayService)
  private caseAssitVisitStayService: CaseAssitVisitStayService;
  @Dependencies(CaseAssistService)
  private caseAssistService: CaseAssistService;
  @Dependencies(CaseAssistAntiFraudCaseStayService)
  private caseAssistAntiFraudCaseStayService: CaseAssistAntiFraudCaseStayService;

  @Prop({ required: true })
  private distributionData: any;

  @Prop({ required: true })
  private collectionType: any;
  /**
   * 查询实体
   */
  private model: any = {
    distributeCategory: 'TO_COLLECTOR',
    commonFlag: 'YES',
    distributeMode: 'BY_CUSTOMIZE',
    distributeNumber: [],
    analyseId: '', // 分案预览
  };
  /**
   * table数据源
   */
  private userDataSet: any[] = [];

  /**
   * 是否自定义分配
   */
  private get isCustomerDistribution() {
    return this.model.distributeMode === 'BY_CUSTOMIZE';
  }

  /**
   * 输入框最大值
   */
  private get inputMax() {
    return this.model.caseIds.length;
  }

  @Emit('refreshList')
  private refreshList() { }

  @Watch('model.distributeMode')
  private onDistributeModeChange(val) {
    this.reviewDistributeCase();
  }

  @Watch('distributionData', { immediate: true })
  private distributionDataChange(value) {
    if (!value) return;
    this.userDataSet = value.selectedUser;
    this.model.userIds = value.selectedUser.map((v) => v.id);
    this.model.caseIds = value.selectedCase.map((v) => v.caseId);
    this.model.caseAssistIds = value.selectedCase.map((v) => v.id);

    this.reviewDistributeCase();
  }

  /**
   * 获取预览分案结果
   */
  private reviewDistributeCase() {

    if (this.collectionType === "LAW_STAY" || this.collectionType === "LAW_STAY_OUTSOURCE") {
      console.log('======诉讼待分配======');
      this.caseAssitVisitStayService.synergisticDistribution(this.model).subscribe(
        (data) => {
          this.userDataSet = data.resDistModel || [];
          this.model.analyseId = data.analyseId;
        },
        (err) => {
          this.resetDistributionModel();
        },
      );
    } else {
      console.log('======反欺诈调查待分配======');
      this.caseAssistAntiFraudCaseStayService.previewCaseAssist(this.model).subscribe(
        (data) => {
          this.userDataSet = data.resDistModel || [];
          this.model.analyseId = data.analyseId;
        },
        (err) => {
          this.resetDistributionModel();
        },
      );
    }
  }

  //取消
  @Emit('close')
  private cancle() {
    this.resetDistributionModel();
  }
  //上一步
  @Emit('back')
  private back() {
    this.resetDistributionModel();
  }

  //确定
  private next() {
    this.model.distributeNumber = this.userDataSet.map((v) => parseInt(v.num));
    if (this.collectionType === "LAW_STAY") {
      console.log('======诉讼待分配======');
      this.caseAssitVisitStayService.confirmDistributeCase(this.model).subscribe(
        (data) => {
          this.$message.success('分配成功');
          this.cancle();
          this.refreshList();
        }
      );
    } else if (this.collectionType === "LAW_STAY_OUTSOURCE") {
      console.log('======诉讼待分配======');
      this.caseAssitVisitStayService.confirmDistributeCaseOut(this.model).subscribe(
        (data) => {
          this.$message.success('分配成功');
          this.cancle();
          this.refreshList();
        }
      );
    } else {
      console.log('======反欺诈调出待分配======');
      this.caseAssistAntiFraudCaseStayService.distributeCaseAssist(this.model).subscribe(
        (data) => {
          this.$message.success('分配成功');
          this.cancle();
          this.refreshList();
        }
      );
    }

  }

  /**
   * 初始化查询实体基础信息
   */
  private resetDistributionModel() {
    this.model.distributeMode = 'BY_CUSTOMIZE';
    this.model.distributeNumber = [];
    this.model.analyseId = '';
  }
}
</script>
<style lang="less" scoped>
</style>
