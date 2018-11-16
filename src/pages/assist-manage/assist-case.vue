<template>
  <!-- 协催管理-诉讼案件-页面 -->
  <section class="page assist-visit-wait-distribution">
    <data-form :model="searchModel" @onSearch="refreshData">
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
        <!-- <el-form-item label="详细地址" prop="addressDetail">
          <el-input v-model="searchModel.addressDetail"></el-input>
        </el-form-item> -->

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
        <!-- <el-form-item label="流转来源" prop="turnSource">
          <el-select placeholder="请选择" v-model="searchModel.turnSource">
            <el-option v-for="{index,name,code} in $dict.getDictData('TurnSource')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="产品类型" prop="productCategory">
          <el-input v-model="searchModel.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="searchModel.productName"></el-input>
        </el-form-item>
        <el-form-item label="诉讼编号" prop="lawNumber">
          <el-input v-model="searchModel.lawNumber"></el-input>
        </el-form-item>
        <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="searchModel.customerCategory" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CustomerCategory')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="creatTime">
          <el-date-picker type="daterange" :editable="false" v-model="searchModel.creatTime" placeholder="选择日期时间" clearable>
          </el-date-picker>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="manualDivision">重新分配</el-button>
      </template>
    </data-form>
    <data-box :data="dataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button v-if="scope.row.lawerStatus === 'WITHDRAWAL_PROSECUTION' || scope.row.lawerStatus === 'CLOSING_CASE' || scope.row.lawerStatus === 'TAKE' || scope.row.lawerStatus === 'END' " @click="litigationFollowCheck(scope.row)" type="text">跟进查看</el-button>
            <el-button v-else @click="litigationFollow(scope.row)" type="text">诉讼跟进</el-button>
            <el-button @click="cost(scope.row)" type="text">费用维护</el-button>
          </template>
        </el-table-column>
        <el-table-column  label="申请号" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="lawNumber" label="诉讼编号" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="addressType" label="地址类型" :formatter="(row) => $filter.dictConvert(row.addressType,'AddressType')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="areaId" label="地区" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $city.getInheritNames(Number(row.areaId))" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="addressDetail" label="外访详细地址" :min-width="$helper.getColumnWidth(6)" show-overflow-tooltip>
        </el-table-column> -->
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
        <el-table-column prop="" label="诉讼跟进人" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="currentCollectorName" label="催收员" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="案件创建时间" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dateTimeFormat(row.createTime)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="lawerStatus" label="诉讼状态" :formatter="(row) => $filter.dictConvert(row.lawerStatus,'LawerStatus')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>

    <el-dialog title="诉讼分案" :visible.sync="dialog.ManualDivision" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['user-case-allot'].refresh(lawDepartmentDataNoRoot,collectionType))">
      <user-case-allot :selectedCase="selectionList" @refreshList="refreshData" ref="user-case-allot" @close="dialog.ManualDivision=false"></user-case-allot>
    </el-dialog>
      <el-dialog title="诉讼跟进"   :center="true"  :visible.sync="dialog.litigationFollow">
          <litigation-follow  ref="follow" :lawsuitObj='lawsuitObj' @close="dialog.litigationFollow = false" @refreshList="refreshData"></litigation-follow>
      </el-dialog>
      <el-dialog title="诉讼跟进"   :center="true"  :visible.sync="dialog.setUpForce">
        <set-upForce  :active='active' ref="setUpForce" :followObj="followType" @close="close" @refreshList="refreshData" ></set-upForce>
      </el-dialog>
    <el-dialog title="费用管理" :center="true" :visible.sync="dialog.costMaintenance">
      <cost-maintenance ref="cost" :lawsuitObj='lawsuitObj' @close="dialog.costMaintenance = false" @refreshList="refreshData" ></cost-maintenance>
    </el-dialog>
        <!--弹框-诉讼跟进详情-->
    <el-dialog title="诉讼跟进详情"  @close="dialog.setCaseDetail = false" :visible.sync="dialog.setCaseDetail" :close-on-click-modal="false" :show-close="true">
        <set-case-detail :active='active' @close="dialog.setCaseDetail=false" :followObj="followType"  @refresh="refreshData" ref="case" :isCheck="isCheck"></set-case-detail>
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
import UserCaseAllot from '~/components/distribution-common/user-case-allot.vue';
import NumberRange from '~/components/common/number-range.vue';
import { CaseAssitCaseService } from '~/services/domain-service/case-assist-case.service.ts';
import litigationFollow from "~/components/outsource-manage/outsource-lawsuit-manage/litigation-follow.vue";
import costMaintenance from "~/components/outsource-manage/outsource-lawsuit-manage/cost-maintenance.vue";
import setUpForce from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/setUpForce-modal.vue'
import setCaseDetail from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-detail.vue'
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
import { Mutation, Getter, namespace, State } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');


@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    UserCaseAllot,
    NumberRange,
    litigationFollow,
    costMaintenance,
    setUpForce,
    setCaseDetail,
  },
})
export default class AssistCisitWaitDistribution extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(CaseAssitCaseService)
  private caseAssitCaseService: CaseAssitCaseService;
  @Dependencies(OutsourceLawsuitService)
  private outsourceLawsuitService: OutsourceLawsuitService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  @Getter
  private lawDepartmentDataNoRoot;
  @Getter
  private lawDepartmentData;
  private collectionType = 'LAW_CASE';
  private searchModel: any = {
    areaIds: [],
    areaId: '',
    addressDetail: '',
    overdueDays: {
      max: '',
      min: '',
    },
    overdueAmount: {
      max: '',
      min: '',
    },
    turnSource: '',
    productCategory: '',
    creatTime: [],
    productName: '',
    lawNumber:'',
  };
  private dataSet: any[] = [];
  private selectionList: any[] = [];
  private dialog: any = {
    ManualDivision: false,
    litigationFollow: false,
    costMaintenance: false,
    setUpForce: false,
    setCaseDetail: false
  };
  private isCheck: any = false;
  private lawsuitObj: any = {}
  private active: number = 0;
  private followType: any = {}
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

  private created() {
    this.refreshData();
  }
  private refreshData() {
    this.caseAssitCaseService
      .queryCaseAssistlist(this.searchModel, this.pageService, this.sortService)
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
            console.log('this.lawsuitObj ===>',this.lawsuitObj);
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
    this.openCollectionExecution(new OpenExecutionData(row.caseId, row.caseNumber, CASE_CHANNEL.assist, true))
  }

  /**
   * 查看诉讼跟进
   */
  private litigationFollowCheck(row){
      this.lawsuitObj = {};
      this.lawsuitObj = row;
      this.dialog.setCaseDetail = true;
      this.isCheck = true;
      this.getStep(); //查询步骤
  }
  /***
  * 费用维护
  */
  private cost(row){
    this.lawsuitObj = {};
    this.lawsuitObj = row;
    this.dialog.costMaintenance = true;
    console.log('id ====>',this.lawsuitObj.id);
  }
}
</script>

<style lang="less">
</style>
