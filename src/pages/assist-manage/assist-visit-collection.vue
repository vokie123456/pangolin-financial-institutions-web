<template>
  <!-- 协催管理-外访催收-页面 -->
  <section class="page assist-visit-collection">
    <data-form :model="searchModel" @onSearch="refreshData" @handleResetForm="follFeedback">
      <template slot="default-input">
        <el-form-item label="申请号" prop="caseNumber">
          <el-input v-model="searchModel.caseNumber"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="personalName">
          <el-input v-model="searchModel.personalName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobileNo">
          <el-input v-model="searchModel.mobileNo"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="searchModel.idCard"></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
        <el-form-item label="外访地区" prop="areaIds">
          <el-cascader v-model="searchModel.areaIds" @change="getAreaId" :options="$city.getCityData()" change-on-select clearable></el-cascader>
        </el-form-item>
        <el-form-item label="催收员" prop="assistCollectorName">
          <el-input v-model="searchModel.assistCollectorName"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDetail">
          <el-input v-model="searchModel.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="searchModel.customerCategory" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CustomerCategory')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件金额" prop="overdueAmount">
          <number-range v-model="searchModel.overdueAmount" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="逾期期数" prop="overduePeriod">
          <el-select v-model="searchModel.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <number-range v-model="searchModel.overdueDays" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="行动代码" prop="followupBack">
          <el-select placeholder="请选择" v-model="searchModel.followupBack">
            <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协催到期时间" prop="visitEndDate">
          <el-date-picker type="daterange" :editable="false" v-model="searchModel.visitEndDate" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="流转来源" prop="turnSource">
          <el-select placeholder="请选择" v-model="searchModel.turnSource">
            <el-option v-for="{index,name,code} in $dict.getDictData('TurnSource')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" prop="productCategory">
          <el-input v-model="searchModel.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="searchModel.productName"></el-input>
        </el-form-item>
        <el-form-item label="案件流入时间" prop="followInTime">
          <el-date-picker type="daterange" :editable="false" v-model="searchModel.followInTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="案件分配时间" prop="caseDistributeTime">
          <el-date-picker type="daterange" :editable="false" v-model="searchModel.caseDistributeTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进时间" prop="followTime">
          <el-date-picker type="daterange" :editable="false" v-model="searchModel.followTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="协催状态" prop="assistStatus">
          <el-select placeholder="请选择" v-model="searchModel.assistStatus">
            <el-option v-for="{index,name,code} in $dict.getDictData('AssistStatus')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件标记" prop="caseMark">
          <el-select v-model="searchModel.caseMark" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CaseMark')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="leaveApply">留案</el-button>
        <el-button @click="manualDivision">重新分配</el-button>
      </template>
      <template slot="append">
        <case-marker @change-color="onColorChange" :selectionList="selectionList"></case-marker>
      </template>
    </data-form>
    <data-box :data="dataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :page="pageService" showCaseMark>
      <template slot="columns">
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="addressType" label="地址类型" :formatter="(row) => $filter.dictConvert(row.addressType,'AddressType')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="areaId" label="外访地区" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $city.getInheritNames(row.areaId)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="addressDetail" label="外访详细地址" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="customerCategory" label="顾客类型" :formatter="(row) => $filter.dictConvert(row.customerCategory,'CustomerCategory')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="currentCollectorName" label="催收员" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="assistCollectorName" label="协催人员" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="visitEndDate" label="协催到期时间" :formatter="(row) => $filter.dateFormat(row.visitEndDate)" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="assistStatus" label="协催状态" :formatter="(row) => $filter.dictConvert(row.assistStatus,'AssistStatus')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="followInTime" label="案件流入时间" :formatter="(row) => $filter.dateFormat(row.followInTime)" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="caseDistributeTime" label="案件分配时间" :formatter="(row) => $filter.dateFormat(row.caseDistributeTime)" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="followTime" label="跟进时间" :formatter="(row) => $filter.dateTimeFormat(row.followTime)" :min-width="$helper.getColumnWidth(5)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="followupBack" label="行动代码" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="leaveCaseFlag" label="留案标识" :formatter="(row) => $filter.dictConvert(row.leaveCaseFlag,'CommonFlag')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="leaveEndDate" label="留案到期日期" :formatter="(row) => $filter.dateFormat(row.leaveEndDate)" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog :title="`${applyType.name}申请`" width="800px" :visible.sync="dialog.apply" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <apply :caseIds="selectedIds" :fromChannel="caseChannel" :applyType="applyType.value" @close="dialog.apply = false" ref="apply-circulation"></apply>
    </el-dialog>
    <el-dialog title="重新分配" :visible.sync="dialog.ManualDivision" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['user-case-allot'].refresh(visitDepartmentDataNoRoot,collectionType))">
      <user-case-allot :selectedCase="selectionList" @refreshList="refreshData" ref="user-case-allot" @close="dialog.ManualDivision=false;refreshData()"></user-case-allot>
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
import { Getter, Mutation, namespace } from "vuex-class";
import { CaseAssistService } from "~/services/domain-service/case-assist.service.ts";
import UserCaseAllot from "~/components/distribution-common/user-case-allot.vue";
import CaseMarker from "~/components/common/case-marker.vue";
import { CASE_CHANNEL, ApplyType } from "~/config/enum.config";
import { OpenExecutionData } from "~/config/types";
import Apply from "~/components/visit-case/apply.vue";
const CollectionExecutionModule = namespace("collection-execution");
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    UserCaseAllot,
    NumberRange,
    CaseMarker,
    Apply
  }
})
export default class AssistVisitCollection extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(CaseAssistService)
  private caseAssistService: CaseAssistService;
  @Getter
  private visitDepartmentDataNoRoot;
  @Mutation
  private updateCollectionType;
  @CollectionExecutionModule.Action
  private openCollectionExecution;
  private collectionType = "ASSIST_VISIT";
  private caseChannel: any = CASE_CHANNEL.assist;
  private applyType = ApplyType.assistLeave;
  // private caseMark: any = "";
  private searchModel: any = {
    areaIds: [],
    overdueAmount: {
      min: "",
      max: ""
    },
    areaId: "",
    assistCollectorName: "",
    addressDetail: "",
    overdueDays: {
      min: "",
      max: ""
    },
    followupBack: "",
    turnSource: "",
    productCategory: "",
    visitEndDate: [],
    followInTime: [],
    caseDistributeTime: [],
    followTime: [],
    productName: "",
    assistStatus: "",
    caseMark: "",
    customerCategory: ""
  };
  private dataSet: any[] = [];
  private selectionList: any[] = [];
  private dialog: any = {
    ManualDivision: false,
    apply: false
  };
  private mounted() {
    this.refreshData();
  }
  private activated() {
    this.refreshData();
  }
  private refreshData() {
    this.caseAssistService
      .getAllVisitCaseAssist(
        this.searchModel,
        this.pageService,
        this.sortService
      )
      .subscribe(data => {
        this.dataSet = data;
      });
  }

  /**
   * 留案申请
   */
  private leaveApply() {
    if (this.selectionList.length === 0) {
      this.$message.info("请选择要分配的案件");
      return;
    }
    this.dialog.apply = true;
  }
  /**
   * 重新分配
   */
  private manualDivision() {
    if (this.selectionList.length === 0) {
      this.$message.info("请选择要分配的案件");
      return;
    }
    this.dialog.ManualDivision = true;
  }
  /**
   * 获取地区id
   */
  private getAreaId() {
    this.searchModel.areaId =
      this.searchModel.areaIds.length > 0
        ? this.searchModel.areaIds[this.searchModel.areaIds.length - 1]
        : "";
  }

  /**
   * 进入编辑执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.caseId, row.caseNumber, CASE_CHANNEL.assist));
  }

  /**
   * 重置numberRange
   */
  private follFeedback() {
    this.searchModel.overdueAmount = { min: "", max: "" };
    this.searchModel.overdueDays = { min: "", max: "" };
  }

  private get selectedIds() {
    return this.selectionList.map(v => v.caseId);
  }


  private onColorChange(val) {
    const colorModel: any = {
      caseAssistIds: this.selectionList.map(v => v.id),
      caseMark: val,
    };
    this.caseAssistService.markCaseAssistColor(colorModel).subscribe(this.refreshData);
  }
}
</script>

<style lang="less">
</style>
