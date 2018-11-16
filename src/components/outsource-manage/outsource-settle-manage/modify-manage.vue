<template>
  <section class="component modify-company">
    <data-form :model="queryModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="申请号" prop="companyName">
          <el-input v-model="queryModel.companyName"></el-input>
        </el-form-item>
        <el-form-item label="顾客名称" prop="companyName">
          <el-input v-model="queryModel.companyName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="companyName">
          <el-input v-model="queryModel.companyName"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="clickExport" :disabled="selectionList.length === 0">导出明细</el-button>
      </template>
    </data-form>
    <data-box @onPageChange="refreshData" :data="dataList" :selectionList.sync="selectionList">
      <template slot="columns">
        <el-table-column prop="outsName" label="受托方" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="companyStatus" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户名称" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="" label="分案时期数" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="outAmount" label="分案金额" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="repaymentAmount" label="还款金额" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="enterAmount" label="入账金额" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="outConfirmAmount" label="受托方确认金额" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="checkStatus" label="账单状态" :formatter="(row) => $filter.dictConvert(row.checkStatus,'CheckStatus')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="commissionRate" label="费率" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="commissionAmount" label="佣金" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="repaymentTime" label="还款时间" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <span>{{scope.row.repaymentTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="entryTime" label="入账时间" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <span>{{scope.row.entryTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { OutsourceSettlevOucherService } from '~/services/domain-service/outsource-settle-manage-index.service';
import { PageService } from '~/utils/page.service';

@Component({
  components: {
    DataBox,
    DataForm,
  },
})
export default class ModifyCompany extends Vue {
  @Dependencies(OutsourceSettlevOucherService)
  private outsourceSettlevOucherService: OutsourceSettlevOucherService;
  @Dependencies(PageService)
  private pageService: PageService;

  @Prop({ required: true })
  private caseRow: any;

  private queryModel: any = {
    caseNumber: '',
    personalName: '',
    mobileNo: '',
    outBatch: '', //批次号 必传
  };
  private dataList: any[] = [];
  private selectionList: any[] = [];

  @Emit('refreshList')
  private refreshList() { }
  @Emit('close')
  private close() { }

  private mounted() {
    this.refreshData();
  }

  @Watch('caseRow')
  private onCaseRowChange() {
    this.refreshData();
  }

  /**
   * 查询详情列表
   */
  private refreshData() {
    this.queryModel.outBatch = this.caseRow.batchNumber;
    this.queryModel.outsourceId = this.caseRow.outsourceId;
    this.outsourceSettlevOucherService
      .getSettlementSheetDetailPageList(this.queryModel)
      .subscribe(
        (data) => {
          this.dataList = data.content;
        }
      );
  }

  /**
   * 导出明细
   */
  private clickExport() {
    //需要导出的列表 ids
    const idArray: any[] = [];
    this.selectionList.map((v) => {
      idArray.push(v.id);
    });
    const param = {
      ids: idArray,
    };
    this.outsourceSettlevOucherService
      .exportSettlementSheetDetail(param)
      .subscribe(
        (data) => {
          this.$message.success('导出成功!');
          window.open(data.url);
        }
      );
  }
}
</script>

<style lang="less" scoped>
</style>
