<template>
  <!--委外诉讼案件-->
  <section class="page company-manage">
    <data-form :model="queryModel" @onSearch="refreshData" @handleResetForm="follFeedback" :page="pageService">
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
        <!-- <el-form-item label="顾客类型" prop="companyName">
          <el-select v-model="queryModel.paramStatus" placeholder="请选择" clearable>
            <el-option value="0" label="承诺还款"></el-option>
          </el-select>
        </el-form-item> -->
      </template>
      <template slot="collapse-input">
        <el-form-item label="案件金额" prop="outAmount">
          <number-range v-model="queryModel.outAmount"></number-range>
        </el-form-item>
        <el-form-item label="逾期期数" prop="overduePeriod">
          <el-select v-model="queryModel.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <number-range v-model="queryModel.overdueDays"></number-range>
        </el-form-item>
        <el-form-item label="产品类型" prop="productCategory">
          <el-input v-model="queryModel.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="queryModel.productName"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="moveToStay">移入诉讼待分配</el-button>
      </template>
    </data-form>
    <data-box @onPageChange="refreshData"  :selectionList.sync="selectionList" :data="dataList" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button  @click="litigationFollow(scope.row)" type="text">查看诉讼跟进</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="deptName" label="律所" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户名称" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="addressType" :formatter="(row) => $filter.dictConvert(row.addressType,'AddressType')" label="地址类型" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="customerCategory" label="顾客类型" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="currentCollectorName" label="电催催收员" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="案件创建时间" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="collectionStatus" label="诉讼状态" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
    <!--弹框-诉讼跟进详情-->
    <el-dialog title="诉讼跟进详情"  @close="dialog.setCaseDetail = false" :visible.sync="dialog.setCaseDetail" :close-on-click-modal="false" :show-close="true">
        <set-case-detail :active='active' @close="dialog.setCaseDetail=false" :followObj="followType"  @refresh="refreshData" ref="case" :isCheck="isCheck"></set-case-detail>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import { CompanyService } from "~/services/management-service/company.service";
import { PageService } from "~/utils/page.service";
import { SortService } from '~/utils/sort.service';
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import NumberRange from "~/components/common/number-range.vue";
import { OutsourceLawsuitBackService } from "~/services/domain-service/outsource-lawsuit-back-manage.service";
import setCaseDetail from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-detail.vue'
import { OpenExecutionData } from "~/config/types";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
import { Mutation, Getter, namespace, State } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(1012)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    setCaseDetail
  }
})
export default class OutsourceLawsuitBackManageIndex extends Vue {
  @Dependencies(OutsourceLawsuitBackService)
  private outsourceLawsuitBackService: OutsourceLawsuitBackService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(OutsourceLawsuitService)
  private outsourceLawsuitService: OutsourceLawsuitService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  private isCheck: any = false;
  private dataList: any[] = [];
  private selectionList: any[] = [];
  private caseIds: any[] = [];
  private lawsuitId: any={}
   private dialog: any = {
    setCaseDetail: false
  };
  // form 查询表单参数
  private queryModel: any = {
    batchNumber: "",
    caseNumber: "",
    personalName: "",
    mobileNo: "",
    idCard: "",
    localAddress: "",
    currentCollector: "",
    overduePeriod: "",
    turnSource: "",
    productCategory: "",
    productName: "",
    followInTime: "",
    outAmount: {
      max: "",
      min: ""
    },
    overdueDays: {
      max: "",
      min: ""
    }
  };
  private active: number = 0;
  private lawsuitObj: any={}
  private stepDate: any = [
    {step:'LAWSUIT_TPYE', active: -1}, //添加诉讼类型
    {step:'COURT', active: 0}, //立案
    {step:'CHECK', active: 1}, // 庭审
    {step:'COURT_EXECUTE', active: 2}, // 执行立案
    {step:'EXECUTION', active: 3}, // 案件执行中
    {step:'END', active: 4}, // 执行终结
    {step:'TAKE', active: 5}, // 参与分配
  ]
  private followType: any = {}
  private stepType: any = {
    lawsuitFollowType: "",
    lawsuitObj: this.lawsuitObj,
  };

  private mounted() {
    this.refreshData();
  }
  /**
   * 查询列表
   */
  private refreshData() {
    this.outsourceLawsuitBackService
      .searchLawsuitRecoveryList(this.queryModel, this.pageService, this.sortService)
      .subscribe(data => {
          this.dataList = data;
      });
  }
  private moveToStay(){
  if (this.selectionList.length === 0) {
      this.$message.info('请选择要回收的案件');
      return;
    }
    this.caseIds = [];
    this.selectionList.map(v => {
        this.caseIds.push(v.id)
    })
      this.outsourceLawsuitBackService
      .moveLawsuitWait({'caseIds':this.caseIds})
      .subscribe(data => {
        this.$message.success('案件分配成功');
        this.refreshData();
      });
  }
  private checkFllow(){

  }

    private litigationFollow(row){
        this.lawsuitObj = row;
        // this.dialog.litigationFollow = true;
        this.getStep(); //查询步骤
    }
    /**
     * 获取步骤
     */
    private getStep(){
      console.log('this.lawsuitObj.id} ===>',this.lawsuitObj.id)
      this.outsourceLawsuitService.getCourtInfoStep({'id':this.lawsuitObj.id}).subscribe(
        data => {
          this.active = -1;
          console.log('data ====>',data);
          this.stepDate.map((v) =>{
            if(v.step === data){
                this.active = v.active
                console.log('active ----=>',this.active);
            }
          })
          console.log('active ===>',this.active);
          if(this.active !== -1 ){
            console.log('查询到有步骤了')
              this.getFllowInfo();
              this.dialog.setCaseDetail = true;
              this.isCheck = true;
          }else {
              console.log('从零开始')

          }
        }
      );
    }
    private getFllowInfo(){
      this.outsourceLawsuitService.getFollowInfo({id:this.lawsuitObj.id}).subscribe(
        data => {
          if(data){
            // this.dialog.setUpForce = true
            this.followType = this.lawsuitObj;
            this.followType.lawsuitFollowType = data.lawsuitFollowType
          }
        },
        ({ msg }) => {
        }
      );
    }
  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.caseId, row.caseNumber, CASE_CHANNEL.OUTER, true))
  }
   /**
    * 重置numberRange
    */
  private follFeedback() {
    this.queryModel.overdueAmount = { max: '', min: '' };
    this.queryModel.overdueDays = { max: '', min: '' };
  }
}
</script>

<style lang="less">
</style>


