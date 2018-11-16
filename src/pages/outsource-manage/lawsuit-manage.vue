<template>
  <!--诉讼管理-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" :buttonWrap="true" @onSearch="refreshData" autoSearch @handleResetForm="follFeedback">
      <!--输入区域-->
      <template slot="default-input">
        <el-form-item label="申请号" prop="caseNumber">
          <el-input v-model="queryModel.caseNumber"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="personalName">
          <el-input v-model="queryModel.personalName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobileNo">
          <el-input v-model="queryModel.mobileNo"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="queryModel.idCard"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="departmentType">
          <el-select v-model="queryModel.departmentType" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template slot="collapse-input">
        <!-- <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="queryModel.customerCategory" placeholder="所有" clearable>
            <el-option v-for="item in gklxData" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="案件金额">
          <number-range v-model="queryModel.outAmount"></number-range>
        </el-form-item>
        <el-form-item label="逾期期数" prop="overduePeriod">
           <el-select v-model="queryModel.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
          </el-form-item>
        <el-form-item label="逾期天数">
          <number-range v-model="queryModel.overdueDays"></number-range>
        </el-form-item>
        <!--<el-form-item label="行动代码" prop="followupBack">-->
          <!--<el-select v-model="queryModel.followupBack" placeholder="请选择" clearable>-->
            <!--<el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="流转来源" prop="turnSource">-->
          <!--<el-select v-model="queryModel.turnSource" placeholder="请选择" clearable>-->
            <!--<el-option v-for="{index,name,code} in $dict.getDictData('TurnSource')" :key="index" :label="name" :value="code"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="产品类型" prop="productCategory">
            <el-input v-model="queryModel.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="queryModel.productName"></el-input>
        </el-form-item>
        <el-form-item label="诉讼编号" prop="lawNumber">
          <el-input v-model="queryModel.lawNumber"></el-input>
        </el-form-item>
        <el-form-item label="案件创建时间" prop="creatTime">
          <el-date-picker v-model="queryModel.creatTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </template>

      <template slot="default-button">
        <el-button @click="selectCase">分案</el-button>
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="stayDataList" :selectionList.sync="selectionList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column  label="申请号" :min-width="$helper.getColumnWidth(8)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="lawNumber" label="诉讼编号" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(8)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型"  :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="customerCategory" label="顾客类型"  :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dictConvert(row.customerCategory, 'CustomerCategory')">
        </el-table-column>
        <el-table-column prop="assistCollectorName" label="电催催收员" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="createTime" label="案件创建时间" :formatter="(row) => $filter.dateTimeFormat(row.createTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
      </template>
    </data-box>

    <!--弹框-分案-->
    <el-dialog title="选择受托方"  @close="dialog.selectEntrusted = false" :visible.sync="dialog.selectEntrusted" :close-on-click-modal="false" :show-close="false">
        <select-lawsuitEntrusted @close="dialog.selectEntrusted=false" @goNext="goNext" @refresh="refreshData" ref="dept" ></select-lawsuitEntrusted>
    </el-dialog>

    <!--弹框-按键分配-->
    <el-dialog title="案件分配"  @close="dialog.caseDistribution = false" :visible.sync="dialog.caseDistribution" :close-on-click-modal="false" :show-close="false">
        <case-lawsuitDistribution
        @close="dialog.caseDistribution=false"
        @refresh="refreshData" ref="dept"
        :caseDistributionDataList.sync="temp"
        @nextCommit="nextCommit"
        @goPreviou="goPreviou"
        @modalChange="modalChange"
        :selectionList="selectionList"
        ></case-lawsuitDistribution>
    </el-dialog>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import NumberRange from "~/components/common/number-range.vue";
import selectLawsuitEntrusted from "~/components/outsource-manage/lawsuit-manage/select-lawsuit-entrusted.vue"; // 选择受托方
import caseLawsuitDistribution from "~/components/outsource-manage/lawsuit-manage/case-lawsuit-distribution.vue"; // 案件分配
import { Mutation, Getter, namespace, State } from 'vuex-class';
import { PageService } from "~/utils/page.service";
import { SortService } from '~/utils/sort.service';

import { OutsourceLawsuitStayService} from "~/services/domain-service/outsource-lawsuit-manage.service";
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
const CollectionExecutionModule = namespace('collection-execution');
import { FilterService } from '~/utils/filter.service';

// @Auth(1010)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    selectLawsuitEntrusted,
    caseLawsuitDistribution
  }
})
export default class LawsuitManageIndex extends Vue {
  @Dependencies(OutsourceLawsuitStayService) private outsourceLawsuitStayService: OutsourceLawsuitStayService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(SortService) private sortService: SortService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  private dialog: any = {
    selectEntrusted: false,
    caseDistribution: false
  };

  private queryModel: any = {
    caseNumber:'',
    personalName:'',
    mobileNo:'',
    idCard:'',
    departmentType:'',
    outAmount: {
      max: '',
      min: '',
    },
    overduePeriod:'',
    overdueDays: {
      max: '',
      min: '',
    },
    turnSource:'',
    productCategory:'',
    creatTime:[],
    lawNumber: ''
  }
  private stayDataList: any[] = [];//数据列表
  private selectionList: any[] = [];//选中数据
   private temp: any = {};//选中数据
  private tempData: any = []

  private mounted() {
    this.refreshData();
  }
  private goNext(data){
    this.tempData = data
    this.searchSplitPreview().then(() => {
      this.dialog.selectEntrusted=false
      this.dialog.caseDistribution = true
    })
  }

  private searchSplitPreview(distribute: string = 'BY_MONEY') {
    return new Promise((resolve, reject) => {
      const outsourceIds: any[] = this.tempData.map((v) => v.id);
      const caseIds: any[] = [];
      const distributeMode = distribute
      this.selectionList.map((v) => {
        caseIds.push(v.id);
       });
      const distModel: any[] = this.tempData.map(val => {
        return {
          "amt": 0,
          "caseCapital": 0,
          "currentAmt": 0,
          "currentNum": 0,
          "num": 0,
          "sumAmt": 0,
          "sumNum": 0,
          'outsourceId': val.id,
          'outsourceName': val.outsName
        }
      })
      const distributionData = {
        caseIds,
        distModel,
        distributeMode,
        outsourceIds,

      };

      // 分案预览列表
      this.outsourceLawsuitStayService.searchSplitPreview(distributionData).subscribe(
        data => {
          this.temp = data
          // this.caseDistributionDataList = data.resDistModel
          resolve()
        },
        ({ msg }) => {
          reject()
        }
      );
    })
  }
  private selectCase(){
    if (this.selectionList.length === 0) {
      this.$message.info('请选择需要分案的案件');
      return;
    }
    this.dialog.selectEntrusted = true;
  }

  private modalChange(modal) {
    this.searchSplitPreview(modal)
  }
  private goPreviou () {
    this.dialog.selectEntrusted=true
    this.dialog.caseDistribution = false
  }
  private nextCommit() {
    const refCase :any = this.$refs['dept']
    this.temp = refCase.caseDistributionDataListCopy
    this.temp.outsourceIds = this.tempData.map((v) => v.id);
    this.outsourceLawsuitStayService.confirmDistributeCase(this.temp).subscribe(
      data => {
        console.log(data)
        this.$message.success('分案成功')
        this.dialog.caseDistribution=false
        this.refreshData()
      }
    );
  }
  private refreshData() {
    //默认加载列表
    this.outsourceLawsuitStayService.searchPendingList(this.queryModel,this.pageService,this.sortService).subscribe(
      data => {
        this.stayDataList = data;
        console.log('data ===>',data);
      }
    );
  }
  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.caseId, row.caseNumber, CASE_CHANNEL.OUTER, true))
  }

  // 重置numberRange
  private follFeedback() {
    this.queryModel.outAmount = { min: '', max: '' };
    this.queryModel.overdueDays = { min: '', max: '' };

  }
}
</script>

<style lang="less" >

</style>
