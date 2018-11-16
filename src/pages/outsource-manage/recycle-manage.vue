<template>
  <!--回收案件池-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" :buttonWrap="true" @onSearch="refreshData" @handleResetForm="follFeedback" autoSearch>
      <!--输入区域-->
      <template slot="default-input">
        <el-form-item label="批次号" prop="batchNumber">
          <el-input v-model="queryModel.batchNumber"></el-input>
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
        <el-form-item label="行动代码" prop="followupBack">
          <el-select v-model="queryModel.followupBack" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流转来源" prop="turnSource">
          <el-select v-model="queryModel.turnSource" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('TurnSource')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" prop="productCategory">
          <el-input v-model="queryModel.productCategory"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="queryModel.productName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="顾客类型" prop="customerCategory">
          <el-select v-model="queryModel.customerCategory" placeholder="所有" clearable>
            <el-option v-for="item in gklxData" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="案件流入时间" prop="followInTime">
          <el-date-picker v-model="queryModel.followInTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

      </template>

      <template slot="default-button">
        <el-button @click="moveIntoAllocated" >移入委外待分配</el-button>
        <el-button @click="applyTurn">申请流转</el-button>
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="dataList" :selectionList.sync="selectionList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="outsName" label="受托方" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $city.getCityName(Number(row.area))">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="productCategory" label="产品类型" :min-width="$helper.getColumnWidth(3)">
          <!-- <template slot-scope="scope">
                <span v-if="scope.row.cplx === '1'">耐消</span>
                <span v-if="scope.row.cplx === '2'">抵押</span>
                <span v-if="scope.row.cplx === '3'">信用</span>
                <span v-else></span>
            </template> -->

        </el-table-column>
        <el-table-column prop="productName" label="产品名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <!-- <el-table-column prop="customerCategory" label="顾客类型" :min-width="$helper.getColumnWidth(3)">

        </el-table-column> -->
        <el-table-column prop="turnSource" label="流转来源" :formatter="(row) => $filter.dictConvert(row.turnSource,'TurnSource')" :min-width="$helper.getColumnWidth(3)">
          <!-- <template slot-scope="scope">
                <span v-if="scope.row.lzly === '1'">导入</span>
                <span v-if="scope.row.lzly === '2'">API</span>
                <span v-if="scope.row.lzly === '3'">电催</span>
                <span v-if="scope.row.lzly === '4'">外访</span>
                <span v-if="scope.row.lzly === '5'">委外</span>
                <span v-else></span>
            </template> -->
        </el-table-column>
        <el-table-column prop="followInTime" label="案件流入时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.followInTime)">
        </el-table-column>
        <el-table-column prop="caseAllocationTime" label="案件分配时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.caseAllocationTime)">
        </el-table-column>
        <el-table-column prop="followupTime" label="跟进时间" :formatter="(row) => $filter.dateTimeFormat(row.followupTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followupBack" label="行动代码" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="" label="诉讼状态" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="unCheatResult" label="反欺诈结果" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>

    <!--弹框-申请流转-->
    <el-dialog title="流转申请" @close="dialog.applyFlow = false" :visible.sync="dialog.applyFlow" :close-on-click-modal="false" :show-close="false">
      <apply-flow :fromChannel="caseChannel"  @close="dialog.applyFlow=false" @refreshList="refreshData" ref="applyFlow" :selectionList="selectionList"></apply-flow>
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
import ApplyFlow from '~/components/outsource-manage/recycle-manage/apply-flow.vue'; // 案件分配

import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import { OutsourceRecycleService } from '~/services/domain-service/outsource-recycle-manage.service';
import { CityService } from '~/utils/city.service';
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
import { Mutation, Getter, namespace, State } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(1006)
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    ApplyFlow,
  },
})
export default class RecycleManageIndex extends Vue {
  @Dependencies(OutsourceRecycleService)
  private outsourceRecycleService: OutsourceRecycleService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  private caseChannel = CASE_CHANNEL.OUTER;

  private dialog: any = {
    applyFlow: false,
  };
  private proinviceList: any[] = []; // 省
  private cityList: any[] = []; //市

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
    followupBack:'',
    productCategory: '',
    productName: '',
    followInTime: [],
    area:'',
    outAmount: {
      max: '',
      min: '',
    },
    overdueDays: {
      max: '',
      min: '',
    },
  };
  private dataList: any[] = []; //数据列表
  private selectionList: any[] = []; //选中数据

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
      this.queryModel.cityCode = ''
    }
    this.cityList = this.$city.getCityData({ level: 1, id: provinceId }); // 城市列表
  }

  /**
   * 移入委外待分配
   */
  private moveIntoAllocated() {

    if (this.selectionList.length === 0) {
      this.$message.info('请选择需要移入委外待分配的案件');
      return;
    }

    const temp: any[] = [];
    this.selectionList.map((value) => {
      temp.push(value.id);
    });
    const query = {
      caseIds: temp,
    };
    //移入委外待分配
    this.outsourceRecycleService.caseMoveAllocation(query).subscribe(
      (data) => {
        this.refreshData();
        this.$message.success('移入待分配案件成功!');
      }
    );
  }

  /**
   * 申请流转
   */
  private applyTurn(){
      if (this.selectionList.length === 0) {
        this.$message.info('请选择需要移入委外待分配的案件');
        return;
      }
      this.dialog.applyFlow = true;
    }

  private refreshData() {
    //默认加载列表
    this.outsourceRecycleService.caseOutRecoveryList(this.queryModel,this.pageService,this.sortService).subscribe(
      (data) => {
        this.dataList = data;
      }
    );
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

<style lang="less" >
</style>
