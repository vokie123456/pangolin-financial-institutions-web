<template>
  <!-- 协催管理-外访待分配-页面 -->
  <section class="page assist-visit-wait-distribution">
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
      </template>
      <template slot="default-button">
        <el-button @click="manualDivision">手动分案</el-button>
      </template>
    </data-form>
    <data-box :data="dataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :page="pageService">
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
        <el-table-column prop="areaId" label="外访地区" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $city.getInheritNames(Number(row.areaId))" show-overflow-tooltip>
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
        <el-table-column prop="currentCollectorName" label="电催催收员" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="flowInTime" label="案件流入时间" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dateFormat(row.flowInTime)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>

    <el-dialog title="手动分案" :visible.sync="dialog.ManualDivision" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['user-case-allot'].refresh(visitDepartmentDataNoRoot,collectionType))">
      <user-case-allot :selectedCase="selectionList" @refreshList="refreshData" ref="user-case-allot" @close="dialog.ManualDivision=false"></user-case-allot>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { Getter, namespace } from 'vuex-class';
import { CaseAssistService } from '~/services/domain-service/case-assist.service.ts';
import UserCaseAllot from '~/components/distribution-common/user-case-allot.vue';
import NumberRange from '~/components/common/number-range.vue';
import { CASE_CHANNEL } from '~/config/enum.config';
import { OpenExecutionData } from "~/config/types";
const CollectionExecutionModule = namespace('collection-execution');
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    UserCaseAllot,
    NumberRange,
  },
})
export default class AssistCisitWaitDistribution extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(CaseAssistService)
  private caseAssistService: CaseAssistService;
  @Getter
  private visitDepartmentDataNoRoot;
  @Getter
  private visitDepartmentData;
  @CollectionExecutionModule.Action private openCollectionExecution;
  private collectionType = 'ASSIST_VISIT';
  private searchModel: any = {
    caseNumber: '',
    personalName: '',
    mobileNo: '',
    idCard: '',
    areaIds: [],
    get areaId() {
      return this.areaIds.length === 0 ? '' : this.areaIds[this.areaIds.length -1]
    },
    addressDetail: '',
    overdueDays: {
      max: '',
      min: '',
    },
    overdueAmount: {
      max: '',
      min: '',
    },
    productCategory: '',
    followInTime: [],
    productName: '',
    customerCategory: '',
    overduePeriod: '',
  };
  private dataSet: any[] = [];
  private selectionList: any[] = [];
  private dialog: any = {
    ManualDivision: false,
  };

  private created() {
    this.refreshData();
  }
  private refreshData() {
    this.caseAssistService
      .getAllWaitVisitCaseAssist(
        this.searchModel,
        this.pageService,
        this.sortService,
    )
      .subscribe(
        (data) => (this.dataSet = data)
    );
  }

  /**
   * 手动分案
   */
  private manualDivision() {
    if (this.selectionList.length === 0) {
      this.$message.info('请选择要分配的案件');
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
        : '';
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.caseId, row.caseNumber, CASE_CHANNEL.assist, true))
  }

  /**
   * 重置numberRange
   */
  private follFeedback() {
    this.searchModel.overdueAmount = { min: '', max: '' };
    this.searchModel.overdueDays = { min: '', max: '' };
  }
}
</script>

<style lang="less">
</style>
