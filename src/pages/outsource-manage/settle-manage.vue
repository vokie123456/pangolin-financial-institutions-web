<template>
  <!--结清案件池-->
  <section class="page company-manage">
    <data-form :model="queryModel" @onSearch="refreshData" :page="pageService" @handleResetForm="follFeedback">
      <template slot="default-input">
        <el-form-item label="批次号" prop="outBatch">
            <el-input v-model="queryModel.outBatch"></el-input>
        </el-form-item>
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
            <el-input v-model="queryModel.idCard  "></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
       <el-form-item label="地区" prop="proinviceCode">
            <el-col :span="12">
              <el-select size="small" v-model="queryModel.proinviceCode" class='address' @change="getCitys">
                <el-option v-for="item in proinviceList" :label="item.label" :value="item.value" :key="item.value" ref="proinviceList"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-select size="small" v-model="queryModel.cityCode" class='address' >
                <el-option v-for="item in cityList" :label="item.label" :value="item.value" :key="item.value" ref="cityList"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        <el-form-item label="催收员" prop="currentCollector">
            <el-input v-model="queryModel.currentCollector"></el-input>
        </el-form-item>
         <el-form-item label="受托方" prop="outsName">
          <el-select v-model="queryModel.outsName" placeholder="请选择" clearable>
            <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件金额" prop="outAmount">
            <!-- <el-input v-model="queryModel.ajje"></el-input> -->
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
        <el-form-item label="行动代码" prop="followupBack">
          <el-select v-model="queryModel.followupBack" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流转来源" prop="turnSource">
          <el-select v-model="queryModel.turnSource" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('TurnSource')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" prop="productCategory">
            <el-input v-model="queryModel.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
            <el-input v-model="queryModel.productName"></el-input>
        </el-form-item>
        <el-form-item label="案件流入时间" prop="followInTime">
         <el-date-picker
                v-model="queryModel.followInTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
      </template>
    </data-form>
    <data-box @onPageChange="refreshData" :selectionList.sync="selectionList"  :data="dataList" :page="pageService">
      <template slot="columns">
        <el-table-column label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(7)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip :formatter="(row) => $city.getCityName(Number(row.area))">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额（元）" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
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
        <!-- <el-table-column prop="" label="顾客类型" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="turnSource" label="流转来源" :formatter="(row) => $filter.dictConvert(row.turnSource,'TurnSource')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="followInTime" label="案件流入时间" :formatter="(row) => $filter.dateTimeFormat(row.followInTime)" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
          <el-table-column prop="followupBack" label="行动代码" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import { OutsourceSettleService } from "~/services/domain-service/outsource-settle-manage.service";
import { PageService } from "~/utils/page.service";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import NumberRange from "~/components/common/number-range.vue";
import { CityService } from "~/utils/city.service";
import { SortService } from '~/utils/sort.service';
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
import { Mutation, Getter, namespace, State } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(1005)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange
  }
})
export default class SellteManageIndex extends Vue {
  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  private selectionList: any[] = [];
  private proinviceList: any[] = []; // 省
  private cityList: any[] = []; //市
  private outsNames: any[] = [];//受托方列表
  // form 查询表单参数
   private queryModel: any = {
    batchNumber: '',
    caseNumber: '',
    personalName: '',
    mobileNo: '',
    idCard: '',
    localAddress: '',
    currentCollector: '',
    overduePeriod: '',
    turnSource: '',
    FollowupBack:'',
    productCategory: '',
    productName: '',
    area:'',
    followupBack:'',
    outAmount: {
      outAmountMax: '',
      outAmountMin: '',
    },
    overdueDays: {
      overdueDaysMax: '',
      overdueDaysMin: '',
    },
    followInTime: [], //案件流入时间
    outsName:'',
  };
  private dataList: any[] = [];
  private mounted() {
    this.refreshData();
    this.getOutName();//受托方下拉列表
    this.getProvinces();

  }
  //获取省数据
  private getProvinces(){
    this.proinviceList = CityService.getCityData({ level: 1 });
  }

  //获取市
  private getCitys(provinceId){
    if(this.queryModel.cityCode){
      this.queryModel.cityCode=''
    }
    this.cityList = this.$city.getCityData({ level: 1, id: provinceId }); // 城市列表
  }
  /**
   * 查询列表
   */
  private refreshData() {
    this.outsourceSettleService.
    getCaseSettlePoolPageList(this.queryModel,this.pageService,this.sortService)
    .subscribe( data => {
        this.dataList = data;
      }
    )
  }
  private getOutName(){
      this.outsourceSettleService.
        getOutSourceList()
          .subscribe( data => {
              this.outsNames = data;
            }
      )
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.id, row.caseNumber, CASE_CHANNEL.OUTER, true))
  }

  /**
   * 重置numberRange
   */
  private follFeedback() {
    this.queryModel.outAmount = { min: '', max: '' };
    this.queryModel.overdueDays = { min: '', max: '' };
    this.queryModel.proinviceCode = '';
    this.queryModel.cityCode = '';
  }
}
</script>

<style lang="less">

</style>


