<template>
  <!-- 催收执行页-案件信息模块-案件信息 -->
  <section class="component case-info">
    <!-- 案件信息 -->
    <data-grid :totalSpan="12" :labelWidth="125" labelAlign="center" contentAlign="left" style="margin:10px;">
      <data-grid-item label="客户姓名" :span="3">{{caseInfo.personalInfoPersonalName}}</data-grid-item>
      <data-grid-item label="联系电话" :span="3">{{caseInfo.personalInfoMobileNo}}</data-grid-item>
      <data-grid-item label="申请金额" :span="3">{{caseInfo.contractInfoApplyAmount}}</data-grid-item>
      <data-grid-item label="批准贷款金额" :span="3">{{caseInfo.contractInfoLoanAmount}}</data-grid-item>
      <data-grid-item label="放款日期" :span="3">{{caseInfo.contractInfoLoanDate | dateFormat}}</data-grid-item>
      <data-grid-item label="贷款期限" :span="3">{{caseInfo.contractInfoLoanTerm}}</data-grid-item>
      <data-grid-item label="账单周期" :span="3">{{caseInfo.contractInfoBillCycle}}</data-grid-item>
      <data-grid-item label="还款日" :span="3">{{caseInfo.contractInfoPayDate}}</data-grid-item>
      <data-grid-item label="每月还款额" :span="3">{{caseInfo.contractInfoMonthPayAmount}}</data-grid-item>
      <data-grid-item label="逾期金额" :span="3">{{caseInfo.overdueAmount}}</data-grid-item>
      <data-grid-item label="逾期本金" :span="3">{{caseInfo.overdueCapital}}</data-grid-item>
      <data-grid-item label="逾期利息" :span="3">{{caseInfo.overdueInterest}}</data-grid-item>
      <data-grid-item label="逾期期数" :span="3">{{caseInfo.overduePeriod}}</data-grid-item>
      <data-grid-item label="逾期天数" :span="3">{{caseInfo.overdueDays}}</data-grid-item>
      <data-grid-item label="未结罚息" :span="3">{{caseInfo.unboundFine}}</data-grid-item>
      <data-grid-item label="未结利息" :span="3">{{caseInfo.unboundInterest}}</data-grid-item>
      <data-grid-item label="已还款期数" :span="3">{{caseInfo.hasPayPeriods}}</data-grid-item>
      <data-grid-item label="还款方式" :span="3">{{caseInfo.contractInfoPayWay}}</data-grid-item>
      <data-grid-item label="年利率" :span="3">{{caseInfo.contractInfoYearRate}}</data-grid-item>
      <data-grid-item label="罚息利率" :span="3">{{caseInfo.contractInfoPenaltyRate}}</data-grid-item>
      <data-grid-item label="提前还款违约金费率" :span="3">{{caseInfo.contractInfoDamageRate}}</data-grid-item>
      <data-grid-item label="分期服务费费率" :span="3">{{caseInfo.contractInfoServiceRate}}</data-grid-item>
      <data-grid-item label="贷款类型" :span="3">{{caseInfo.contractInfoLoanType}}</data-grid-item>
      <data-grid-item label="进入催收日期" :span="3">{{caseInfo.followInTime | dateFormat}}</data-grid-item>
      <data-grid-item label="永久催收员" :span="3">{{caseInfo.caseInfoRecordCurrentCollectorRealName}}</data-grid-item>
      <data-grid-item label="临时催收员真实姓名" :span="3">{{caseInfo.caseInfoRecordTempCollectorRealName}}</data-grid-item>
      <data-grid-item label="临时案件到期日" :span="3">{{caseInfo.caseInfoRecordTempEndDate}}</data-grid-item>
      <data-grid-item label="食言次数累计" :span="3">{{caseInfo.caseInfoRecordCheatTimes}}</data-grid-item>
      <data-grid-item label="是否共债" :span="3">{{caseInfo.caseInfoRecordIsSameCase}}</data-grid-item>
      <data-grid-item label="共债总额" :span="3">{{caseInfo.caseInfoRecordSameCaseAmount}}</data-grid-item>
      <data-grid-item label="黑名单标记" :span="3">{{caseInfo.caseInfoRecordBlackFlag}}</data-grid-item>
      <data-grid-item label="是否协催" :span="3">{{caseInfo.caseInfoRecordAssistFlag}}</data-grid-item>
      <data-grid-item label="协催人员真实姓名" :span="3">{{caseInfo.caseInfoRecordAssistCollectorRealName}}</data-grid-item>
      <data-grid-item label="诉讼阶段" :span="3">{{caseInfo.caseInfoRecordLawPhase}}</data-grid-item>
      <data-grid-item label="反欺诈结果" :span="3">{{caseInfo.caseInfoRecordUnCheatResult}}</data-grid-item>
      <data-grid-item label="是否信修共享" :span="3">{{caseInfo.caseInfoRecordisRepairShare}}</data-grid-item>
      <data-grid-item label="信修共享时间" :span="3">{{caseInfo.caseInfoRecordRepairShareTime}}</data-grid-item>
      <data-grid-item label="是否抢案共享" :span="3">{{caseInfo.caseInfoRecordIsRobShare}}</data-grid-item>
      <data-grid-item label="锁定催收员真实姓名" :span="3">{{caseInfo.caseInfoRecordLockCollectorRealName}}</data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import { DataImportExcelInfoService } from '~/services/dataimp-service/data-import-excel-info.service.ts';
import { DataGrid, DataGridItem } from '@zct1989/vue-component';
import DataBox from '~/components/common/data-box.vue';
import { Prop } from "vue-property-decorator";
import { CASE_CHANNEL } from "~/config/enum.config"

@Component({
  components: {
    DataBox,
    DataGrid,
    DataGridItem,
  },
})
export default class CaseInfo extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  @Dependencies(DataImportExcelInfoService)
  private dataImportExcelInfoService: DataImportExcelInfoService;
  private caseInfo: any = {};


  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  /**
   * caseChannel
   */
  @Prop({ type: String, required: true })
  private caseChannel: string;

  private activated(){
    this.refreshData()
  }

  /**
   * 是否导入
   */
  private get isImport() {
    return this.caseChannel === CASE_CHANNEL.import
  }

  private refreshData() {
    if (this.isImport) {
      this.dataImportExcelInfoService.getImportCaseInfo(this.caseId).subscribe(
        data => this.caseInfo = data
      )
    } else {
      this.caseOperatorPageService.queryCaseInfo(this.caseId).subscribe(
        (data) => this.caseInfo = data
      );
    }
  }
}
</script>

<style lang="less" scoped>
.component.case-info {
  .circle {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-left: 15px;
    margin-right: 5px;
    background-color: #28313e;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    vertical-align: middle;
  }

  .circle-title {
    font-size: 14px;
    line-height: 13px;
    color: #28313e;
  }
}
</style>
