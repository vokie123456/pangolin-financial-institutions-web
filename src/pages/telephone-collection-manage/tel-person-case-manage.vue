<template>
  <!-- 电催案件管理-个人案件池-页面 -->
  <section class="page tel-person-case-manage">
    <data-form :rules="rules" :model="model" @onSearch="refreshData" @handleResetForm="handleResetForm" :page="pageService">
      <template slot="default-input">
        <el-form-item label="客户姓名" prop="personalName">
          <el-input v-model="model.personalName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobileNo">
          <el-input v-model="model.mobileNo"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="model.idCard"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="productCategory">
          <el-input v-model="model.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="deptIds">
          <el-cascader v-model="model.deptIds" :options="callDepartmentData" @change="getcupoName" :props="{value:'id',label:'deptName'}" change-on-select :show-all-levels="false" clearable></el-cascader>
        </el-form-item>
      </template>
      <template slot="collapse-input">
        <el-form-item label="申请号" prop="caseNumber">
          <el-input v-model="model.caseNumber"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="model.productName"></el-input>
        </el-form-item>
        <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="model.customerCategory" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CustomerCategory')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件金额" prop="overdueAmount">
          <number-range v-model="model.overdueAmount" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="逾期阶段" prop="overduePeriod">
          <el-select v-model="model.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <number-range v-model="model.overdueDays" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="案件流入时间" prop="followInTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.followInTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-cascader v-model="model.area" :options="$city.getCityData()" change-on-select clearable></el-cascader>
        </el-form-item>
        <el-form-item label="案件标记" prop="caseMark">
          <el-select v-model="model.caseMark" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CaseMark')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="advanceCirculation">申请流转</el-button>
      </template>
      <template slot="append">
        <case-marker @change-color="onColorChange" :selectionList="selectionList"></case-marker>
      </template>
    </data-form>
    <div class="databox-title">{{`查询结果统计：列表逾期总金额 ${$filter.toThousands(totalInfo.totalAmount)}元`}}</div>
    <data-box :data="dataSet" :selectionList.sync="selectionList" @onPageChange="queryPageInfo" :sort="sortService" :page="pageService" ref="data-box" showCaseMark>
      <template slot="columns">
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(4)" :formatter="(row)=> $city.getCityName(Number(row.area))">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期阶段" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="perDueDate" label="还款日" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="currentCollectorRealName" label="永久催收员" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="tempCollectorRealName" label="临时催收员" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="lockCollectorRealName" label="锁定人员" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="turnSource" label="流转来源" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.turnSource,'TurnSource')">
        </el-table-column>
        <el-table-column prop="recordFollowInTime" label="案件流入时间" :formatter="(row) => $filter.dateTimeFormat(row.recordFollowInTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="distributeTime" label="案件分配时间" :formatter="(row) => $filter.dateTimeFormat(row.distributeTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followupTime" label="跟进时间" :formatter="(row) => $filter.dateTimeFormat(row.followupTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followupBack" label="行动码" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')">
        </el-table-column>
        <el-table-column prop="leaveCaseFlag" label="留案标识" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.roleStatus,'CommonFlag')">
        </el-table-column>
        <el-table-column prop="leaveDueDate" label="留案到期时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.leaveDueDate)">
        </el-table-column>
      </template>
    </data-box>

    <!--申请弹框-->
    <el-dialog :title="`${applyType.name}申请`" width="800px" :visible.sync="dialog.apply" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <apply :caseIds="selectedCaseIds" :fromChannel="caseChannel" :applyType="applyType.value" @close="dialog.apply = false;refreshData()" ref="apply-circulation"></apply>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { SortService } from "~/utils/sort.service";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import NumberRange from "~/components/common/number-range.vue";
import { TelCaseManageService } from "~/services/domain-service/tel-case-manage.service";
import CaseMarker from "~/components/common/case-marker.vue";
import Apply from "~/components/visit-case/apply.vue";
import { ApplyType, CASE_CHANNEL } from "~/config/enum.config";
import { Getter, Mutation, namespace } from "vuex-class";
import { CaseInfoService } from '~/services/domain-service/case-info.service';
import { OpenExecutionData } from "~/config/types";
const CollectionExecutionModule = namespace("collection-execution");

@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    CaseMarker,
    Apply
  }
})
export default class TelPersonCaseManage extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(TelCaseManageService)
  private telCaseManageService: TelCaseManageService;
  @Dependencies(CaseInfoService)
  private caseInfoService: CaseInfoService;
  @Mutation
  private updateCollectionType;
  @CollectionExecutionModule.Action
  private openCollectionExecution;
  @Getter
  private callDepartmentData;

  private model: any = {
    caseNumber: "",
    personalName: "",
    mobileNo: "",
    idCard: "",
    deptId: "",
    deptIds: [],
    customerCategory: "",
    productCategory: "",
    productName: "",
    overdueAmount: {
      max: "",
      min: ""
    },
    overduePeriod: "",
    overdueDays: {
      max: "",
      min: ""
    },
    followInTime: '',
    area: [],
    caseMark: ""
  };
  private rules: any = {};
  private dataSet: any[] = [];
  private selectionList: any[] = [];
  private caseMark: any = "";
  private dialog: any = {
    apply: false
  };
  private applyType = ApplyType.turn;
  private caseChannel = CASE_CHANNEL.tel;
  private totalInfo: any = {}
  private mounted() {
    this.refreshData();
  }
  private activated() {
    this.refreshData();
  }

  /**
   * 查询统计信息
   */
  private queryTotalInfo() {
    this.telCaseManageService.personalCasePoolAmount(this.model).subscribe(data => this.totalInfo = data)
  }

  /**
   * 查询翻页信息
   */
  private queryPageInfo() {
    this.telCaseManageService
      .personalCasePool(this.model, this.pageService, this.sortService)
      .subscribe(data => { this.dataSet = data });
  }

  private refreshData() {
    this.queryTotalInfo()
    this.queryPageInfo()
  }

  /**
   * 表单范围输入框重置
   */
  private handleResetForm() {
    this.model.overdueAmount = { min: "", max: "" };
    this.model.overdueDays = { min: "", max: "" };
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(
      new OpenExecutionData(row.id, row.caseNumber, CASE_CHANNEL.tel)
    );
  }

  /**
   * 申请流转
   */
  private advanceCirculation() {
    if (this.selectionList.length === 0) {
      this.$message.info("请选择要流转的案件");
      return;
    }
    this.dialog.apply = true;
  }

  private get selectedCaseIds() {
    return this.selectionList.map(v => v.id);
  }

  /**
   * 获取机构id
   */
  private getcupoName() {
    this.model.deptId =
      this.model.deptIds.length > 0
        ? this.model.deptIds[this.model.deptIds.length - 1]
        : "";
  }

  private onColorChange(val) {
    const colorModel: any = {
      caseIds: this.selectionList.map(v => v.id),
      caseMark: val,
    };
    this.caseInfoService.caseInfoMarkColor(colorModel).subscribe(this.refreshData);
  }
}
</script>

<style lang="less" scoped>
</style>
