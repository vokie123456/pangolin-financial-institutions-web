<template>
  <!-- 协催管理-诉讼案件 -->
  <section class="page tel-waiting-collect-case-manage">
    <data-form :rules="rules" :model="model" @onSearch="refreshData" :page="pageService">
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
        <el-form-item label="机构" prop="deptId">
          <el-input></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
        <el-form-item label="案件状态" prop="customerCategory">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="附件是否已提交" prop="customerCategory">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="顾客类型" prop="customerCategory">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="案件金额" prop="customerCategory">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="逾期期数" prop="overduePeriod">
          <el-select v-model="model.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <number-range v-model="model.overdueDays" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="核销状态" prop="customerCategory">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="流转来源" prop="productCategory">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="productName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="案件流入时间" prop="followInTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.followInTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="案件分配时间" prop="followInTime">
          <el-date-picker type="daterange" :editable="false" v-model="model.followInTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="manualDivision">申请流转</el-button>
        <el-button>核销</el-button>
      </template>
    </data-form>
    <data-box :data="dataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :sort="sortService" :page="pageService" ref="data-box">
      <template slot="columns">
        <el-table-column prop="followInTime" label="操作" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
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
        <el-table-column prop="followInTime" label="还款日" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followInTime" label="附件是否提交" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followInTime" label="核销状态" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followInTime" label="流转来源" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followInTime" label="案件流入时间" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followInTime" label="案件分配时间" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
      </template>
    </data-box>

    <el-dialog title="手动分案" :visible.sync="dialog.ManualDivision" width="800px" :close-on-click-modal="false" :close-on-press-escape="false">
      <user-case-allot :selectionList.sync="selectionList" ref="user-case-allot" @close="dialog.ManualDivision=false"></user-case-allot>
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
import { TelCaseManageService } from '~/services/domain-service/tel-case-manage.service';
import UserCaseAllot from '~/components/distribution-common/user-case-allot.vue';

@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    UserCaseAllot,
  },
})
export default class TelWaitingCollectCaseManage extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(TelCaseManageService)
  private telCaseManageService: TelCaseManageService;
  private model: any = {
    caseNumber: '',
    personalName: '',
    mobileNo: '',
    idCard: '',
    deptId: '',
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
    area: '',
  };
  private rules: any = {};
  private dataSet: any[] = [];
  private selectionList: any[] = [];
  private dialog: any = {
    ManualDivision: false,
  };
  private created() {
    this.refreshData();
  }
  private refreshData() {
    this.telCaseManageService
      .waitDistribution(this.model, this.pageService, this.sortService)
      .subscribe((data) => (this.dataSet = data));
  }
  private manualDivision() {
    if (this.selectionList.length === 0) {
      this.$message.info('请选择要分配的案件');
      return;
    }
    this.dialog.ManualDivision = true;
  }
}
</script>

<style lang="less" scoped>
</style>
