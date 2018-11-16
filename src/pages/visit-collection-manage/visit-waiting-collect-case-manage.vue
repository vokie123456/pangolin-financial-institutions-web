<template>
  <!-- 外访案件管理-待催收-页面 -->
  <section class="page visit-waiting-collect-case-manage">
    <data-form :rules="rules" :model="model" @onSearch="refreshData" :page="pageService" @handleResetForm="follFeedback">
      <template slot="default-input">
        <el-form-item label="申请号" prop="caseNumber">
          <el-input v-model="model.caseNumber"></el-input>
        </el-form-item>
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
      </template>
      <template slot="collapse-input">
        <el-form-item label="机构" prop="deptIds">
          <el-cascader v-model="model.deptIds" :options="visitDepartmentData" @change="getcupoName" :props="{value:'id',label:'deptName'}" change-on-select :show-all-levels="false" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="model.productName"></el-input>
        </el-form-item>
        <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="model.customerCategory" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CustomerCategory')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期阶段" prop="overduePeriod">
          <el-select v-model="model.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-cascader v-model="model.area" :options="$city.getCityData()" change-on-select clearable></el-cascader>
        </el-form-item>
        <el-form-item label="案件金额" prop="overdueAmount">
          <number-range v-model="model.overdueAmount" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <number-range v-model="model.overdueDays" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="案件流入时间" prop="followInTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.followInTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最近还款日" prop="latelyPayDate">
          <el-date-picker type="daterange" :editable="false" v-model="model.latelyPayDate" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="manualDivision">手动分案</el-button>
        <!-- <el-button>策略分案</el-button> -->
      </template>
    </data-form>
    <data-box :data="dataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :sort="sortService" :page="pageService" ref="data-box">
      <template slot="columns">
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $city.getCityName(Number(row.area))">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.toThousands(row.overdueAmount)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="customerCategory" label="顾客类型" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.customerCategory, 'CustomerCategory')">
        </el-table-column>
        <el-table-column prop="turnSource" label="流转来源" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dictConvert(row.turnSource,'TurnSource')">
        </el-table-column>
        <el-table-column prop="followInTime" label="案件流入时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.followInTime)">
        </el-table-column>
      </template>
    </data-box>
    <el-dialog title="手动分案" :visible.sync="dialog.ManualDivision" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['user-case-allot'].refresh(visitDepartmentData,'VISIT'))">
      <user-case-allot @refreshList="refreshData" :selectedCase="selectionList" ref="user-case-allot" @close="dialog.ManualDivision=false"></user-case-allot>
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
import NumberRange from '~/components/common/number-range.vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { VisitCaseManageService } from '~/services/domain-service/visit-case-manage.service';
import UserCaseAllot from '~/components/distribution-common/user-case-allot.vue';
import { CASE_CHANNEL } from '~/config/enum.config';
import { OpenExecutionData } from "~/config/types";
const CollectionExecutionModule = namespace('collection-execution');
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    UserCaseAllot,
  },
})
export default class VisitWaitingCollectCaseManage extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(VisitCaseManageService)
  private VisitCaseManageService: VisitCaseManageService;
  @Getter
  private visitDepartmentData;
  @CollectionExecutionModule.Action private openCollectionExecution;
  private model: any = {
    caseNumber: '',
    personalName: '',
    mobileNo: '',
    idCard: '',
    deptIds: [],
    deptId: '', // 机构
    customerCategory: '',
    productCategory: '',
    productName: '',
    overdueAmount: {
      max: '',
      min: '',
    },
    overduePeriod: '',
    overdueDays: {
      max: '',
      min: '',
    },
    followInTime: [],
    area: [],
    latelyPayDate: [],
  };
  private dialog: any = {
    ManualDivision: false,
  };
  private rules: any = {};
  private dataSet: any[] = [];
  private selectionList: any[] = [];
  private created() {
    this.refreshData();
  }

  /**
   * 获取案件
   */
  private refreshData() {
    this.VisitCaseManageService.visitWaitDistribution(
      this.model,
      this.pageService,
      this.sortService,
    ).subscribe((data) => (this.dataSet = data));
  }

  /**
   * 获取机构id
   */
  private getcupoName() {
    this.model.deptId =
      this.model.deptIds.length > 0
        ? this.model.deptIds[this.model.deptIds.length - 1]
        : '';
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
   * 重置dataRange
   */
  private follFeedback() {
    this.model.overdueAmount = { min: '', max: '' };
    this.model.overdueDays = { min: '', max: '' };
    this.model.deptId = '';
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.id, row.caseNumber, CASE_CHANNEL.visit, true))
  }
}
</script>

<style lang="less" scoped>
</style>
