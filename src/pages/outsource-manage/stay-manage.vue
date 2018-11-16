<template>
  <!--待分配案件管理-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" :buttonWrap="true" @handleResetForm="follFeedback" @onSearch="refreshData" autoSearch>
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
        <el-form-item label="机构" prop="outSourceType">
          <el-select v-model="queryModel.outSourceType" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OutSourceType')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
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
            <el-select size="small" v-model="queryModel.cityCode" class='address'>
              <el-option v-for="item in cityList" :label="item.label" :value="item.value" :key="item.value" ref="cityList"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="queryModel.customerCategory" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CustomerCategory')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件金额" prop="outAmount">
          <number-range v-model="queryModel.outAmount">
          </number-range>
        </el-form-item>
        <el-form-item label="逾期期数" prop="overduePeriod">
          <el-select v-model="queryModel.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overdueDays">
          <number-range v-model="queryModel.overdueDays">
          </number-range>
        </el-form-item>
        <!-- <el-form-item label="行动代码" prop="followupBack">
          <el-select v-model="queryModel.followupBack" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流转来源" prop="turnSource">
          <el-select v-model="queryModel.turnSource" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('TurnSource')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item> -->
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

      <template slot="default-button">
        <el-button @click="division" >分案</el-button>
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="stayDataList" :selectionList.sync="selectionList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $city.getCityName(Number(row.area))">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="customerCategory" label="顾客类型" :formatter="(row) => $filter.dictConvert(row.customerCategory,'CustomerCategory')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="turnSource" label="流转来源" :formatter="(row) => $filter.dictConvert(row.turnSource,'TurnSource')" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="caseAllocationTime" label="案件流入时间" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            {{scope.row.caseAllocationTime|dateTimeFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="followupBack" label="行动代码" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="collectionStatus" label="诉讼状态" :formatter="(row) => $filter.dictConvert(row.collectionStatus,'CollectionStatus')" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="unCheatResult" label="反欺诈结果" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>
    <!--弹框-分案-->
    <el-dialog title="选择受托方" @close="dialog.selectEntrusted = false" :visible.sync="dialog.selectEntrusted" :close-on-click-modal="false" :show-close="false">
      <select-entrusted @close="dialog.selectEntrusted=false" @refresh="refreshData" ref="dept" @goNext="goNext"></select-entrusted>
    </el-dialog>
    <!--弹框-按键分配-->
    <el-dialog title="案件分配" @close="dialog.caseDistribution = false" :visible.sync="dialog.caseDistribution" :close-on-click-modal="false" :show-close="false">
      <case-distribution @close="dialog.caseDistribution=false" @refresh="refreshData" ref="case" @goPreviou="goPreviou" :caseDistributionDataList.sync="temp" @nextCommit="nextCommit" @modalChange="modalChange" :selectionList="selectionList"></case-distribution>
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
import selectEntrusted from '~/components/outsource-manage/stay-manage/select-entrusted.vue'; // 选择受托方
import caseDistribution from '~/components/outsource-manage/stay-manage/case-distribution.vue'; // 案件分配
import { Mutation, Getter, namespace, State } from 'vuex-class';
import { PageService } from '~/utils/page.service';
import { SystemParamService } from '~/services/management-service/system-param.service';
import { CityService } from '~/utils/city.service';
import { FilterService } from '~/utils/filter.service';
import { OutsourceStayService } from '~/services/domain-service/outsource-stay-manage.service';
import { SortService } from '~/utils/sort.service';
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(1002)
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    selectEntrusted,
    caseDistribution,
  },
})
export default class StayManageIndex extends Vue {
  @Dependencies(SystemParamService)
  private sysParamService: SystemParamService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(OutsourceStayService)
  private outsourceStayService: OutsourceStayService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  private dialog: any = {
    selectEntrusted: false,
    caseDistribution: false,
  };
  private proinviceList: any[] = []; // 省
  private cityList: any[] = []; //市
  private queryModel: any = {
    batchNumber: '',
    caseNumber: '',
    personalName: '',
    area: '',
    mobileNo: '',
    idCard: '',
    localAddress: '',
    currentCollector: '',
    overduePeriod: '',
    turnSource: '',
    productCategory: '',
    productName: '',
    proinviceCode: '',
    cityCode: '',
    followInTime: [],
    followupBack:'',
    outAmount: {
      max: '',
      min: '',
    },
    overdueDays: {
      max: '',
      min: '',
    },
  };
  private stayDataList: any[] = []; //数据列表
  private selectionList: any[] = []; //选中数据
  private caseDistributionDataList: any = {}; //选中数据
  private temp: any = {}; //选中数据
  private tempData: any = [];

  private mounted() {
    this.refreshData();
    this.getProvinces();
  }
  private division() {
    if(this.selectionList.length === 0) {
      this.$message.info('请选择待分配案件')
      return
    }
    this.dialog.selectEntrusted = true
  }
  //获取省数据
  private getProvinces() {
    this.proinviceList = CityService.getCityData({ level: 1 });
  }
  //获取市
  private getCitys(provinceId) {
    if (this.queryModel.cityCode) {
      this.queryModel.cityCode = '';
    }
    this.cityList = this.$city.getCityData({ level: 1, id: provinceId }); // 城市列表
  }
  private refreshData() {
    // 默认加载列表
    console.log('this.queryModel ===>',this.queryModel);
    this.outsourceStayService
      .searchPendingList(this.queryModel, this.pageService, this.sortService)
      .subscribe(
      (data) => {
        this.stayDataList = data;
      }
    );
  }
  private goNext(data) {
    this.tempData = data;
    this.searchSplitPreview().then(() => {
      this.dialog.selectEntrusted = false;
      this.dialog.caseDistribution = true;
    });
  }
  private searchSplitPreview(distribute: string = 'BY_MONEY') {
    return new Promise((resolve, reject) => {
      const outsourceIds: any[] = this.tempData.map((v) => v.id);
      const caseIds: any[] = this.selectionList.map((v) => v.id);
      const distributeMode = distribute
      const distModel: any[] = this.tempData.map((val) => {
        return {
          amt: 0,
          caseCapital: 0,
          currentAmt: 0,
          currentNum: 0,
          num: 0,
          sumAmt: 0,
          sumNum: 0,
          outsourceId: val.id,
          outsourceName: val.outsName,
        };
      });
      const distributionData = {
        caseIds,
        distModel,
        distributeMode,
        outsourceIds,

      };
      // 分案预览列表
      this.outsourceStayService.searchSplitPreview(distributionData,this.pageService,this.sortService).subscribe(
        (data) => {
          this.temp = data;
          resolve();
        },
        ({ msg }) => {
          reject();
        },
      );
    });
  }
  private modalChange(modal) {
    console.log('modal --->',modal);
    this.searchSplitPreview(modal);
  }

  private goPreviou() {
    this.dialog.selectEntrusted = true;
    this.dialog.caseDistribution = false;
  }
  /**
   * 下一步确认
   */
  private nextCommit() {
    const refCase: any = this.$refs['case'];
    this.temp = refCase.caseDistributionDataListCopy;
    this.temp.outsourceIds = this.tempData.map((v) => v.id)
    this.outsourceStayService.confirmDistributeCase(this.temp).subscribe(
      (data) => {
        this.$message.success('分案成功');
        this.dialog.caseDistribution = false;
        this.refreshData();
      }
    );
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.id, row.caseNumber, CASE_CHANNEL.OUTER, true))
  }

  // 重置numberRange
  private follFeedback() {
    this.queryModel.outAmount = { min: '', max: '' };
    this.queryModel.overdueDays = { min: '', max: '' };
    this.queryModel.proinviceCode = '';
    this.queryModel.cityCode = '';
  }
}
</script>

<style lang="less" >

</style>
