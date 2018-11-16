<template>
  <!-- 外访案件管理-回收案件池-页面 -->
  <section class="page visit-recover-case-manage">
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
        <el-button @click="moveToPoolClick">移入外访待分配</el-button>
        <el-button @click="applyFlowClick">申请流转</el-button>
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
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(5)" :formatter="row => $city.getCityName(row.area)">
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
        <el-table-column prop="distributeType" label="案件类型" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="recordFollowInTime" label="案件流入时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.recordFollowInTime)">
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
import Apply from '~/components/visit-case/apply.vue';
import { ApplyType, CASE_CHANNEL } from '~/config/enum.config';
import { OpenExecutionData } from "~/config/types";
const CollectionExecutionModule = namespace('collection-execution');
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    Apply,
  },
})
export default class VisitRecoverCaseManage extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(VisitCaseManageService)
  private visitCaseManageService: VisitCaseManageService;
  @Getter
  private visitDepartmentData;
  @CollectionExecutionModule.Action private openCollectionExecution;
  private model: any = {
    caseNumber: '',
    personalName: '',
    mobileNo: '',
    idCard: '',
    deptId: '',
    deptIds: [], //机构
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
    latelyPayDate: [],
    area: [],
    caseMark: '',
  };
  private rules: any = {};
  private dataSet: any[] = [];
  private selectionList: any[] = [];
  private dialog = {
    apply: false,
  };
  private caseChannel = CASE_CHANNEL.visit;
  private applyType: any = {};

  /**
   * 查询案件
   */
  private refreshData() {
    this.visitCaseManageService
      .visitRecoverCasePool(this.model, this.pageService)
      .subscribe(
        (data) => {
          this.dataSet = data;
        },
        ({ msg }) => { },
    );
  }

  private created() {
    this.refreshData();
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
   * 重置dataRange
   */
  private follFeedback() {
    this.model.overdueAmount = { min: '', max: '' };
    this.model.overdueDays = { min: '', max: '' };
  }

  /**
   * 申请流转
   */
  private async applyFlowClick() {
    this.applyType = ApplyType.turn;
    this.verifySelection();
  }

  private verifySelection() {
    if (this.selectionList.length === 0) {
      this.$message(`请选择要${this.applyType.name}的案件`);
      return;
    }
    this.dialog.apply = true;
  }

  /**
   * 移动到待催收中
   */
  private moveToPoolClick() {
    if (this.selectionList.length === 0) {
      this.$message(`请选择要操作的案件`);
      return;
    }
    const ids: any = { ids: this.selectedCaseIds };
    this.visitCaseManageService.moveToWaitDistribution(ids).subscribe(
      (data) => {
        this.$message.success('操作成功');
        this.refreshData();
      }
    );
  }

  private get selectedCaseIds() {
    return this.selectionList.map((v) => v.id);
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
