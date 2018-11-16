<template>
  <!--委外诉讼案件-->
  <section class="page company-manage">
    <data-form :model="queryModel" @onSearch="refreshData" :page="pageService" @handleResetForm="follFeedback">
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
        <!-- <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="queryModel.customerCategory" placeholder="请选择" clearable>
            <el-option value="0" label="承诺还款"></el-option>
          </el-select>
        </el-form-item> -->
      </template>
      <template slot="collapse-input">
        <el-form-item label="案件金额" prop="overdueAmount">
          <number-range v-model="queryModel.overdueAmount">
          </number-range>
        </el-form-item>
        <el-form-item label="逾期期数" prop="overduePeriod" >
          <el-select v-model="queryModel.overduePeriod" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
          <!--<el-input v-model="queryModel.productCategory"></el-input>-->
        </el-form-item>
        <el-form-item label="逾期天数" prop='overdueDays'>
          <number-range v-model="queryModel.overdueDays"></number-range>
        </el-form-item>
        <el-form-item label="产品类型" prop='productCategory'>
            <el-input v-model="queryModel.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop='productName'>
          <el-input v-model="queryModel.productName"></el-input>
        </el-form-item>
      </template>
      <!--<template slot="default-button">-->
        <!--<el-button @click="recycleCase">回收案件</el-button>-->
      <!--</template>-->
    </data-form>
    <!--<p>{{companyObj}}</p>-->
    <data-box @onPageChange="refreshData" :selectionList.sync="selectionList" :dataList.sync="dataList" :data="dataList" :page="pageService" >
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button v-if="scope.row.lawerStatus === 'WITHDRAWAL_PROSECUTION' || scope.row.lawerStatus === 'CLOSING_CASE' || scope.row.lawerStatus === 'TAKE' || scope.row.lawerStatus === 'END' " @click="litigationFollowCheck(scope.row)" type="text">跟进查看</el-button>
            <el-button v-else @click="litigationFollow(scope.row)" type="text">诉讼跟进</el-button>
            <el-button @click="cost(scope.row)" type="text">费用维护</el-button>
          </template>
        </el-table-column>
        <el-table-column  label="申请号" :min-width="$helper.getColumnWidth(8)">
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
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(8)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="localAddress" label="地区" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="customerCategory" label="顾客类型" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.customerCategory, 'CustomerCategory')">
        </el-table-column>
        <el-table-column prop="currentCollectorRealName" label="跟进人员" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="案件创建时间" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lawerStatus" label="诉讼状态" :formatter="(row) => $filter.dictConvert(row.lawerStatus,'LawerStatus')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>

    <el-dialog title="诉讼跟进"   :center="true"  :visible.sync="dialog.litigationFollow">
      <litigation-follow  ref="follow" :lawsuitObj='lawsuitObj' @close="dialog.litigationFollow = false" @refreshList="refreshData" :isCheck="isCheck" ></litigation-follow>
    </el-dialog>
    <el-dialog title="诉讼跟进"   :center="true"  :visible.sync="dialog.setUpForce">
      <set-upForce  :active='active' ref="setUpForce" :followObj="followType" @close="close" :isCheck="isCheck" @refreshList="refreshData"></set-upForce>
    </el-dialog>
    <el-dialog title="费用管理" :center="true"  :visible.sync="dialog.costMaintenance" >
      <cost-maintenance ref="cost" :lawsuitObj='lawsuitObj' @close="dialog.costMaintenance = false" @refreshList="refreshData" ></cost-maintenance>
    </el-dialog>

    <!--弹框-诉讼跟进详情-->
    <el-dialog title="诉讼跟进详情"  @close="dialog.setCaseDetail = false" :visible.sync="dialog.setCaseDetail" :close-on-click-modal="false" :show-close="true">
        <set-case-detail :active='active' @close="dialog.setCaseDetail=false" :followObj="followType"  @refreshList="refreshData" ref="case" :isCheck="isCheck"></set-case-detail>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { PageService } from "~/utils/page.service";
import { SortService } from '~/utils/sort.service';
import NumberRange from '~/components/common/number-range.vue';
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import litigationFollow from "~/components/outsource-manage/outsource-lawsuit-manage/litigation-follow.vue";
import costMaintenance from "~/components/outsource-manage/outsource-lawsuit-manage/cost-maintenance.vue";
import setUpForce from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/setUpForce-modal.vue'
import setCaseDetail from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-detail.vue'
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
import { Mutation, Getter, namespace, State } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(1011)
@Layout("workspace")
@Component({
  components: {
    NumberRange,
    DataForm,
    DataBox,
    litigationFollow,
    costMaintenance,
    setUpForce,
    setCaseDetail,
  }
})
export default class OutsourceLawsuitManageIndex extends Vue {
  @Dependencies(OutsourceLawsuitService)
  private outsourceLawsuitService: OutsourceLawsuitService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(SortService) private sortService: SortService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  @State private userData: any;
  private isCheck: any = false;
  private lawsuitObj: any={}
  private dataList: any[] = [];
  private selectionList: any[] = [];
  private caseIds: any[] = [];
  // form 查询表单参数
   private queryModel: any = {
      caseNumber:'',
      personalName:'',
      mobileNo:'',
      idCard:'',
      overdueAmount:{
        max: '',
        min: '',
      },
      overduePeriod:'',
      overdueDays: {
        max: '',
        min: '',
      },
      productCategory:'',
      productName:'',
  }
  private dialog: any = {
    litigationFollow: false,
    costMaintenance: false,
    setUpForce: false,
    setCaseDetail: false
  };
  private active: number = 0;

  private stepDate: any = [
    {step:'LAWSUIT_TPYE', active: -1}, //添加诉讼类型
    {step:'COURT', active: 0}, //立案
    {step:'CHECK', active: 1}, // 庭审
    {step:'COURT_EXECUTE', active: 2}, // 执行立案
    {step:'WITHDRAWAL_PROSECUTION', active: 2}, //撤诉
    {step:'CLOSING_CASE', active: 3}, //结案
    {step:'EXECUTION', active: 3}, // 案件执行中
    {step:'END', active: 4}, // 执行终结
    {step:'TAKE', active: 5}, // 参与分配
  ]
  private followType: any = {}

  private mounted() {
    this.refreshData();
  }


  private refreshData() {
    console.log('刷新数据 ------～-------');
    this.outsourceLawsuitService.
    getCaseOutLawsuitList(this.queryModel,this.pageService,this.sortService)
      .subscribe(data => {
        this.dataList = data;
      });
  }

  private recycleCase(){
    if (this.selectionList.length === 0) {
      this.$message.info('请选择要回收的案件');
      return;
    }
    const ids = this.selectionList.map(v => v.id)
    this.outsourceLawsuitService.
      caseRecover({ids})
        .subscribe(data => {
          // this.$message.info(data)
          this.$message.success(data);
          this.refreshData();
        },
         ({ msg }) => {
          this.$message.error(msg);
        });
    }

    private litigationFollow(row){
        this.lawsuitObj = row;
        this.isCheck = false;
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
          if(this.isCheck === false){
            console.log('编辑 ===');
            if(this.active !== -1 ){
            console.log('查询到有步骤了')
              this.getFllowInfo();
              this.dialog.setUpForce = true;
              this.dialog.litigationFollow = false;
          }else {
              console.log('从零开始')
              this.dialog.litigationFollow = true;
              this.dialog.setUpForce = false;
          }
         }else {
            this.getFllowInfo();

        }

        }
      );
    }

    private getFllowInfo(){
      this.outsourceLawsuitService.getFollowInfo({id:this.lawsuitObj.id}).subscribe(
        data => {
          if(data){
            if(this.isCheck === false){
              this.dialog.setUpForce = true
            }
            this.followType = this.lawsuitObj;
            this.followType.lawsuitFollowType = data.lawsuitFollowType
          }
        },
        ({ msg }) => {
        }
      );
    }
    private close(){
      this.dialog.setUpForce = false
      this.active = 0;
    }
  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.caseId, row.caseNumber, CASE_CHANNEL.OUTER, true))
  }

  /**
   * 查看诉讼跟进
   */
  private litigationFollowCheck(row){
      this.lawsuitObj = row;
      this.dialog.setCaseDetail = true;
      this.isCheck = true;
      this.getStep(); //查询步骤
  }
  /***
  * 费用维护 
  */
  private cost(row){
    this.dialog.costMaintenance = true;
    this.lawsuitObj = row;
    console.log('id ====>',this.lawsuitObj.id);
  }
    // 重置numberRange
  private follFeedback() {
    this.queryModel.outAmount = { min: '', max: '' };
    this.queryModel.overdueDays = { min: '', max: '' };
  }

}
</script>

<style lang="less">
</style>


