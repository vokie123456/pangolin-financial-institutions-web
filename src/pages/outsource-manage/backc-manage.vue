<template>
  <!--系统参数管理-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" @onSearch="refreshData" @handleResetForm="follFeedback" autoSearch>
      <!--输入区域-->
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
          <el-input v-model="queryModel.idCard"></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
        <el-form-item label="地区" prop="area">
          <el-col :span="12">
            <el-select size="small" v-model="queryModel.proinviceCode" class='address' @change="getCitys">
              <el-option v-for="item in proinviceList" :label="item.label" :value="item.value" :key="item.value" ref="proinviceList"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select size="small" v-model="queryModel.cityCode" class='address'>
              <el-option v-for="item in cityList" :label="item.label" :value="item.value" :key="item.value" ref="cityList"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="催收员" prop="currentCollector">
          <el-input v-model="queryModel.currentCollector"></el-input>
        </el-form-item>
        <!-- <el-form-item label="顾客类型" prop="organizationType">
          <el-select v-model="queryModel.organizationType" placeholder="请选择" clearable>
                <el-option v-for="item in companyType" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item> -->
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
        <el-form-item label="行动代码" prop="FollowupBack">
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
          <el-date-picker v-model="queryModel.followInTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="dataList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(7)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(2)" :formatter="(row) => $city.getCityName(Number(row.area))">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <!-- <el-table-column prop="" label="顾客类型" :min-width="$helper.getColumnWidth(4)">
        </el-table-column> -->
        <el-table-column prop="turnSource" label="流转来源" :formatter="(row) => $filter.dictConvert(row.turnSource,'TurnSource')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="followInTime" label="案件流入时间"  :min-width="$helper.getColumnWidth(4)  ">
          <template slot-scope="scope">
            <span>{{scope.row.followInTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="followupBack" label="行动代码" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>

    <el-dialog title="修改" :visible.sync="dialog.modifysysparamterDialog" @open="getmodifyData" :close-on-click-modal="false" :close-on-press-escape="false" :center="true">
      <modify-parameter ref="refresh" @close="dialog.modifysysparamterDialog=false" @refreshList="refreshData"></modify-parameter>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import NumberRange from '~/components/common/number-range.vue';

import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';

import { OutsourceBackCService } from '~/services/domain-service/outsource-backc-manage.service';
import ModifyParameter from '~/components/system-manage/param-manage/modify-parameter.vue';
import { CityService } from '~/utils/city.service';
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
import { Mutation, Getter, namespace, State } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(1004)
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    ModifyParameter,
  },
})
export default class BackCManageIndex extends Vue {
  @Dependencies(OutsourceBackCService)
  private outsourceBackCService: OutsourceBackCService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService) private sortService: SortService;
  @CollectionExecutionModule.Action private openCollectionExecution;

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
      max: '',
      min: '',
    },
    overdueDays: {
      max: '',
      min: '',
    },
    followInTime: [], //案件流入时间
  };
  private proinviceList: any[] = []; // 省
  private cityList: any[] = []; //市

  private dataList: any[] = [];
  private dialog: any = {
    modifysysparamterDialog: false,
  };
  private modifyData: any = {};
  private refresh: any = {};

  private mounted() {
    this.refreshData();
    this.getProvinces();
  }

  //获取省数据
  private getProvinces() {
    this.proinviceList = CityService.getCityData({ level: 1 });
  }

  //获取市
  private getCitys(provinceId) {
    if(this.queryModel.cityCode){
      this.queryModel.cityCode=''
    }
    this.cityList = this.$city.getCityData({ level: 1, id: provinceId }); // 城市列表
  }
  private refreshData() {
    this.outsourceBackCService
      .getCaseBackCPoolPageList(this.queryModel,this.pageService,this.sortService)
      .subscribe(
        (data) => {
          this.dataList = data;
        }
      );
  }

  /**
   * 修改
   */
  private editDetail(scope) {}

  /**
   * 查看
   */
  private checkDetail(scope) {}

  /**
   * 修改open事件 ，获取要修改的当前行数据
   */
  private getmodifyData() {
    this.$nextTick(() => {
      this.refresh = this.$refs['refresh'];
      this.refresh.refresh(this.modifyData);
    });
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
