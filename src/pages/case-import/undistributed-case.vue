<template>
  <!--案件导入-待分配案件-->
  <section class="page undistributed-case">
    <data-form :model="importModel" @onSearch="refreshData" :page="pageService" :rules="undistributedRule" @handleResetForm="follFeedback">
      <template slot="default-input">
        <el-form-item label="案件批次号" prop="batchNumber">
          <el-input v-model="importModel.batchNumber" :maxlength="13"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="personalName">
          <el-input v-model="importModel.personalName" :maxlength="13"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobileNo">
          <el-input v-model="importModel.mobileNo" :maxlength="13"></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
        <!-- <el-form-item label="省份/城市/区" prop="areadId">
          <el-cascader v-model="importModel.areadId" :options="$city.getCityData()" change-on-select clearable></el-cascader>
        </el-form-item> -->
        <el-form-item label="委托方" prop="principalId">
          <el-select placeholder="请选择" v-model="importModel.principalId">
            <el-option v-for="item in principalList.content" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="dayRange">
          <number-range v-model="importModel.dayRange" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="逾期总金额" prop="amountRange">
          <number-range v-model="importModel.amountRange"></number-range>
        </el-form-item>
        <el-form-item label="佣金比例" prop="rateRange">
          <number-range v-model="importModel.rateRange"></number-range>
        </el-form-item>
        <el-form-item label="案件手数" prop="handNumber">
          <el-input v-model="importModel.handNumber"></el-input>
        </el-form-item>
        <el-form-item label="逾期期数" prop="overduePeriod">
          <!-- <el-input v-model="importModel.overduePeriod"></el-input> -->
          <el-select v-model="importModel.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="manualDistruibute">手动分案</el-button>
      </template>
    </data-form>
    <data-box :data="importDataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="caseNumber" label="案件编号" :min-width="$helper.getOperateWidth(2)">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>案件编号: {{ scope.row.caseNumber }}</p>
              <span slot="reference">
                <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="principalName" label="委托方" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.encryptPhone(row.mobileNo)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期阶段" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="逾期金额(元)" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.toThousands(row.overdueAmount)">
        </el-table-column>
        <el-table-column prop="handNumber" label="案件手数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="commissionRate" label="佣金比例(%)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
      </template>
    </data-box>
    <!--案件分配弹框-->
    <el-dialog title="案件分配" :center="true" :visible.sync="dialog.manual" width="600px" @open="$nextTick(()=>$refs['manual-distrubute'].refresh(selectionList))">
      <manual-distrubute ref="manual-distrubute" @close="dialog.manual=false" @refreshList="refreshData" :selectionList="selectionList"></manual-distrubute>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import NumberRange from "~/components/common/number-range.vue";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import { PageService } from "~/utils/page.service";
import ManualDistrubute from "~/components/case-import/manual-distrubute.vue";
import { State, Getter, Mutation, namespace } from "vuex-class";
import { CaseInfoService } from "../../services/domain-service/case-info.service";
import { OpenExecutionData } from "~/config/types";
import { CASE_CHANNEL } from '~/config/enum.config';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(103)
@Layout("workspace")
@Component({
  components: {
    ManualDistrubute,
    DataForm,
    DataBox,
    NumberRange
  }
})
export default class UndistributedCase extends Vue {
  @State
  public principalList: any;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(CaseInfoService)
  private CaseInfoService: CaseInfoService;
  @CollectionExecutionModule.Action private openCollectionExecution;
  private importModel: any = {
    principalId: "",
    batchNumber: "",
    mobileNo: "",
    personalName: "",
    dayRange: { min: "", max: "" },
    amountRange: { min: "", max: "" },
    rateRange: { min: "", max: "" },
    handNumber: "",
    overduePeriod: "",
    areadId: []
  };
  private dialog: any = {
    manual: false
  };

  // 表单验证规则
  private undistributedRule = {
    mobileNo: [
      {
        validator: this.$validator.phoneNumber,
        trigger: "blur"
      }
    ]
  };

  private importDataSet: any = [];
  private selectionList: any[] = [];
  private caseDetail: any = {};

  /**
   * 获取待分配案件
   */
  public refreshData() {
    this.CaseInfoService.getAllDistributeCaseInfos(
      this.importModel,
      this.pageService
    ).subscribe(
      data => {
        this.importDataSet = data;
      }
    );
  }

  private mounted() {
    this.refreshData();
  }

  /**
   * 手动分案
   */
  private manualDistruibute() {
    if (this.selectionList.length === 0) {
      this.$message("请选择要分配的案件");
    } else {
      this.dialog.manual = true;
    }
  }

  /**
   * 重置numberRange
   */
  private follFeedback() {
    this.importModel.amountRange = { min: "", max: "" };
    this.importModel.dayRange = { min: "", max: "" };
    this.importModel.rateRange = { min: "", max: "" };
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.id, row.caseNumber, CASE_CHANNEL.undistributed, true))
  }
}
</script>

<style lang="less">
</style>
