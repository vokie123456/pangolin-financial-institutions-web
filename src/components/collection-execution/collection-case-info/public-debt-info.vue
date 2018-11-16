<template>
  <!-- 催收执行页-案件信息模块-共债信息 -->
  <section class="component public-debt-info">
    <data-box :height="390" :data="debtInfo">
      <template slot="columns">
        <el-table-column prop="caseNumber" label="案件编号" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <el-button type='text' @click="jumpToOther(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="overdueAmount" label="逾期金额" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overdueCapital" label="逾期本金" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overdueInterest" label="逾期利息" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overdueManageFee" label="逾期管理费" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productProductCategory" label="产品类型" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="productProductName" label="产品名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import { DataImportExcelInfoService } from '~/services/dataimp-service/data-import-excel-info.service';
import { Prop } from "vue-property-decorator";
import { CASE_CHANNEL } from "~/config/enum.config"
import { namespace } from "vuex-class";
import { OpenExecutionData } from "~/config/types";

const CollectionExecutionModule = namespace('collection-execution');


@Component({
  components: {
    DataBox,
  },
})
export default class PublicDebtInfo extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  @Dependencies(DataImportExcelInfoService)
  private dataImportExcelInfoService: DataImportExcelInfoService;

  private debtInfo: any[] = [];

  @CollectionExecutionModule.Action private openCollectionExecution;


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

  private refreshData() {
    if (this.caseChannel === CASE_CHANNEL.import) {
      this.dataImportExcelInfoService
        .getImportDebtCaseInfo(this.caseId)
        .subscribe((data) => {
          this.debtInfo = data || [];
        });
    } else {
      // 获取案件信息
      this.caseOperatorPageService
        .queryDebtCaseInfo({ caseId: this.caseId })
        .subscribe((data) => {
          this.debtInfo = data || [];
        });
    }
  }
  private jumpToOther(row) {
    this.openCollectionExecution(new OpenExecutionData(row.id, row.caseNumber, this.caseChannel, true))
  }
}
</script>

<style lang="less" scoped>
</style>
