<template>
  <!-- 外访案件管理-停催案件池-页面 -->
  <section class="page visit-stop-case-manage">
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
        <el-form-item label="永久催收员" prop="currentCollectorRealName">
          <el-input v-model="model.currentCollectorRealName"></el-input>
        </el-form-item>
        <el-form-item label="催收反馈" prop="followupBack">
          <el-select v-model="model.followupBack" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流转来源" prop="turnSource">
          <el-select v-model="model.turnSource" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('TurnSource')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件金额" prop="overdueAmount">
          <number-range v-model="model.overdueAmount" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <number-range v-model="model.overdueDays" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="行动码" prop="followupBack">
          <el-select v-model="model.followupBack" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件流入时间" prop="followInTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.followInTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最近还款日" prop="latelyPayDate">
          <el-date-picker type="daterange" :editable="false" v-model="model.latelyPayDate" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="案件分配时间" prop="distributeTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.distributeTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最新跟进时间" prop="followupTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.followupTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="停催时间" prop="pauseTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.pauseTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>

      </template>
      <template slot="default-button">
        <el-button @click="manualDivision">重新分配</el-button>
        <el-button @click="activeClick">停催激活</el-button>
      </template>
    </data-form>
    <data-box :data="dataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :sort="sortService" :page="pageService" ref="data-box">
      <template slot="columns">
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)"></el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(3)"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(5)"></el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $city.getCityName(row.area)"></el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.toThousands(row.overdueAmount)"></el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)"></el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(3)"></el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(3)"></el-table-column>
        <el-table-column prop="customerCategory" label="顾客类型" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.customerCategory, 'CustomerCategory')"></el-table-column>
        <el-table-column prop="currentCollectorRealName" label="永久催收员" :min-width="$helper.getColumnWidth(4)"></el-table-column>
        <el-table-column prop="turnSource" label="流转来源" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.roleStatus,'TurnSource')"></el-table-column>
        <el-table-column prop="pauseDueTime" label="停催到期时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.pauseDueTime)"></el-table-column>
        <el-table-column prop="recordFollowInTime" label="案件流入时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.recordFollowInTime)"></el-table-column>
        <el-table-column prop="distributeTime" label="案件分配时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.distributeTime)"></el-table-column>
        <el-table-column prop="followupTime" label="最新跟进时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.followupTime)"></el-table-column>
        <el-table-column prop="followupBack" label="行动代码" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')"></el-table-column>
        <el-table-column prop="lawPhase" label="诉讼状态" :min-width="$helper.getColumnWidth(3)"></el-table-column>
        <el-table-column prop="unCheatResult" label="反欺诈结果" :min-width="$helper.getColumnWidth(4)"></el-table-column>
      </template>
    </data-box>
    <el-dialog title="重新分案" :visible.sync="dialog.ManualDivision" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['user-case-allot'].refresh(visitDepartmentData,'VISIT'))">
      <user-case-allot @refreshList="refreshData" :selectedCase="selectionList" ref="user-case-allot" @close="dialog.ManualDivision=false"></user-case-allot>
    </el-dialog>
    <!--申请弹框-->
    <el-dialog :title="`${applyType.name}申请`" width="800px" :visible.sync="dialog.apply" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <apply :caseIds="selectedCaseIds" :applyType="applyType.value" @close="dialog.apply = false;refreshData()" ref="apply-circulation"></apply>
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
import { State, Action, Getter, namespace } from 'vuex-class';
import NumberRange from '~/components/common/number-range.vue';
import { VisitCaseManageService } from '~/services/domain-service/visit-case-manage.service';
import UserCaseAllot from '~/components/distribution-common/user-case-allot.vue';
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
    UserCaseAllot,
    Apply,
  },
})
export default class VisitStopCaseManage extends Vue {
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
    currentCollectorRealName: '',
    followupBack: '',
    turnSource: '',
    distributeTime: [],
    followupTime: [],
    pauseTime: [],
  };
  private dialog = {
    ManualDivision: false,
    apply: false,
  };
  private applyType = ApplyType.active;
  private rules: any = {};
  private dataSet: any[] = [];
  private selectionList: any[] = [];

  /**
   * 查询案件
   */
  private refreshData() {
    this.visitCaseManageService
      .visitPauseCasePool(this.model, this.pageService)
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

  private activeClick() {
    if (this.selectionList.length === 0) {
      this.$message(`请选择要${this.applyType.name}的案件`);
      return;
    }
    this.dialog.apply = true;
  }

  /**
   * 手动分案
   */
  private manualDivision() {
    if (this.selectionList.length === 0) {
      this.$message.info('请选择要分配的案件');
      return;
    }
    const currentDate: any = new Date();
    if (
      this.selectionList.find(
        (v) => v.pauseDueTime && v.pauseDueTime > currentDate,
      )
    ) {
      this.$message('您选择的案件中含有未到期案件，不能重新分配');
      return;
    }
    this.dialog.ManualDivision = true;
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
