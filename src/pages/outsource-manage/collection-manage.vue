<template>
  <!--委外催收案件管理-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" :buttonWrap="true" @handleResetForm="follFeedback" @onSearch="refreshData" autoSearch>
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
        <el-form-item label="催收员" prop="collectorRealName">
          <el-input v-model="queryModel.collectorRealName"></el-input>
        </el-form-item>
        <el-form-item label="受托方" prop="outsName">
          <el-select v-model="queryModel.outsourceId" placeholder="请选择" clearable>
            <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件金额" prop="overdueAmount">
          <number-range v-model="queryModel.overdueAmount">
          </number-range>
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
          <el-select v-model="queryModel.followupBack" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code"></el-option>
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
        <el-form-item label="委外时间" prop="outTimeDate">
          <!-- <el-date-picker v-model="queryModel.outTime" type="date" placeholder="请选择日期">
          </el-date-picker> -->
          <el-date-picker v-model="queryModel.outTimeDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="委外到期时间" prop="outEndDate">
          <!-- <el-date-picker v-model="queryModel.outEndDate" type="date" placeholder="请选择日期">
          </el-date-picker> -->
          <el-date-picker v-model="queryModel.outEndDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="跟进时间" prop="followUpTime">
          <el-date-picker v-model="queryModel.followUpTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="顾客类型" prop="customerCategory">
           <el-select v-model="queryModel.customerCategory" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CustomerCategory')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留案标志" prop="leaveCaseFlag">
          <el-select v-model="queryModel.leaveCaseFlag" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommonFlag')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留案审核状态" prop="leaveStatue">
          <el-select v-model="queryModel.leaveStatue" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('ApplyStatus')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>

      </template>

      <template slot="default-button">
        <el-button @click="caseRecoveryClick" >回收案件</el-button>
        <el-button @click="caseStayClick" >留案</el-button>
        <el-button @click="unCaseStayClick" >取消留案</el-button>
        <el-button @click="importMobileUrgeClick">导入电催跟进</el-button>
        <el-button @click="importOutVisitClick">导入外访跟进</el-button>
        <!-- <el-button @click="importOutVisitEnclosureClick">导入外访附件</el-button> -->
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="collectionDataList" :selectionList.sync="selectionList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="outsName" label="受托方" :min-width="$helper.getColumnWidth(3)">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.stf === '1'">默认</span>
            <span v-else></span>
          </template> -->
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="area" label="地区" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $city.getCityName(Number(row.area))">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="案件金额(元)" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span>{{scope.row.overduePeriod}}</span>
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
        <el-table-column prop="customerCategory" label="顾客类型" :formatter="(row) => $filter.dictConvert(row.customerCategory,'CustomerCategory')" :min-width="$helper.getColumnWidth(3)">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.gklx === '1'">默认</span>
            <span v-else></span>
          </template> -->
        </el-table-column>
        <el-table-column prop="userName" label="催收员" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="followInTime" label="案件流入时间" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <span>{{scope.row.followInTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="caseAllocationTime" label="委外分配时间" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <span>{{scope.row.caseAllocationTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="outEndDate" label="委外到期时间" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <span>{{scope.row.outEndDate | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="followupTime" label="跟进时间"  :formatter="(row) => $filter.dateTimeFormat(row.followupTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="followupBack" label="行动代码" :formatter="(row) => $filter.dictConvert(row.followupBack,'FollowupBack')"  :min-width="$helper.getColumnWidth(3)">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.xddm === '1'">承诺还款</span>
            <span v-else></span>
          </template> -->
        </el-table-column>
        <el-table-column prop="leaveCaseFlag" label="留案标识" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            {{scope.row.leaveCaseFlag =='YES'?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="leaveDate" label="留案到期日期" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <span>{{scope.row.leaveDate | dateFormat}}</span>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--弹框-留案-->
    <el-dialog title="留案" @close="dialog.leaveCase = false" :visible.sync="dialog.leaveCase" :close-on-click-modal="false" :show-close="false">
      <leave-case @close="dialog.leaveCase=false" @refreshList="refreshData" :selectionList.sync="selectionList"></leave-case>
    </el-dialog>
    <el-dialog title="上传文件" @close="dialog.uploadFile = false" :visible.sync="dialog.uploadFile" :close-on-click-modal="false" :show-close="false">
      <file-upload ref="upload_case_import" :fileList.sync="fileList" :fileNumberLimit="1" :AllowExtension="['xlsx','xls']"></file-upload>
      <div class="btn-group">
        <el-button @click="commit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
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
import leaveCase from '~/components/outsource-manage/collection-manage/leave-case.vue'; // 留案
import { Mutation, Getter, namespace, State } from 'vuex-class';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';

import { OutsourceCollectionService } from '~/services/domain-service/outsource-collection-manage.service';
import FileUpload from '~/components/common/file-upload.vue';
import { CityService } from '~/utils/city.service';
import { OutsourceSettleService } from '~/services/domain-service/outsource-settle-manage.service';

import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(1003)
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    leaveCase,
    FileUpload,
  },
})
export default class CollectionManageIndex extends Vue {
  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService;
  @Dependencies(OutsourceCollectionService)
  private outsourceCollectionService: OutsourceCollectionService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(SortService) private sortService: SortService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  private dialog: any = {
    leaveCase: false,
    uploadFile: false,
  };
  private fileList: any = [];

  private proinviceList: any[] = []; // 省
  private cityList: any[] = []; //市
  private outsNames: any[] = []; //受托方列表

    private queryModel: any = {
    batchNumber: '',
    caseNumber: '',
    personalName: '',
    area: '',
    mobileNo: '',
    idCard: '',
    localAddress: '',
    currentCollector: '',
    outsourceId:'',
    overduePeriod: '',
    turnSource: '',
    productCategory: '',
    productName: '',
    proinviceCode: '',
    cityCode: '',
    followupBack:'',
    overdueAmount: {
      max: '',
      min: '',
    },
    overdueDays: {
      max: '',
      min: '',
    },
    collectorRealName:'',
    customerCategory: '',
    leaveCaseFlag: '',
    followInTime: [],
    outEndDate:[],
    outTimeDate:[],
    followUpTime:[],
    leaveStatue:''
  };

  private collectionDataList: any[] = []; //数据列表
  private selectionList: any[] = []; //选中数据
  private caseIds: any[] = []; //选择的案件号数组
  private importFlag: any = ''; //选择导入标识

  private mounted() {
    this.refreshData();
    this.getProvinces();
    this.getOutName(); //受托方下拉列表
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

  //获取受托方列表
  private getOutName() {
    this.outsourceSettleService.getOutSourceList().subscribe(
      (data) => {
        this.outsNames = data;
      }
    );
  }
  private refreshData() {
    // 默认加载列表
    console.log('queryModel =====>',this.queryModel);
    this.outsourceCollectionService.earchCaseOutList(this.queryModel,this.pageService,this.sortService).subscribe(
      (data) => {
        this.collectionDataList = data;
      }
    );
  }
  // 关闭弹框
  private close() {
    const upload: any = this.$refs['upload_case_import'];
    upload.reset();
    this.dialog.uploadFile = false;
  }
  // 导入电催跟进
  private commit() {
    if (this.fileList.length === 0) {
      this.$message('请上传导入文件');
      return;
    }
    const query = {
      fileId: this.fileList[0].response.id,
    };
    if (this.importFlag === 'importMobileUrge') {
      // 导入电催跟进
      this.outsourceCollectionService.importMobileUrge(query).subscribe(
        (data) => {
//          this.dialog.uploadFile = false;
          this.close();
          this.refreshData();
          if(data.length !== 0){
              this.$message.info('存在导入失败的案件号');
          }else {
              this.$message.success('导入成功');
          }
        }
      );
    } else if (this.importFlag === 'importOutVisit') {
      // 导入外访跟进
      this.outsourceCollectionService.importOutVisit(query).subscribe(
        (data) => {
//          this.dialog.uploadFile = false;
          this.close();
          this.refreshData();
          if(data.length !== 0){
              this.$message.info('存在导入失败的案件号');
          }else {
              this.$message.success('导入成功');
          }
        }
      );
    } else if (this.importFlag === 'importOutVisitEnclosure') {
      // 导入外访附件
      this.outsourceCollectionService.importOutVisitEnclosure(query).subscribe(
        (data) => {
          this.dialog.uploadFile = false;
          this.refreshData();
        }
      );
    }
  }
  //回收案件
  private caseRecoveryClick() {
    if (this.selectionList.length === 0) {
      this.$message.info('请选择要回收的案件');
      return;
    }

    const caseIds: any[] = this.selectionList.map((v) => v.id);
    const query = {
      caseIds,
    };
    this.outsourceCollectionService.caseRecovery(query).subscribe(
      (data) => {
        this.$message.success('回收案件成功!');
        this.refreshData();
      }
    );
  }
  //留案
  private caseStayClick() {
    if (this.selectionList.length === 0) {
      this.$message.info('请选择需要留案的案件');
      return;
    }
    this.dialog.leaveCase = true;
  }
  //取消留案
  private unCaseStayClick() {
    if (this.selectionList.length === 0) {
      this.$message.info('请选择需要取消留案的案件');
      return;
    }
    const caseIds: any[] = this.selectionList.map((v) => v.id);
    const query = {
      caseIds,
    };
    this.outsourceCollectionService.unCaseStay(query).subscribe(
      (data) => {
        this.$message.success('取消留案成功!');
        this.refreshData();
      }
    );
  }
  //导入电催跟进
  private importMobileUrgeClick() {
    this.dialog.uploadFile = true;
    this.importFlag = 'importMobileUrge';
  }
  //导入外访跟进
  private importOutVisitClick() {
    this.dialog.uploadFile = true;
    this.importFlag = 'importOutVisit';
  }
  //导入外访附件
  private importOutVisitEnclosureClick() {
    this.dialog.uploadFile = true;
    this.importFlag = 'importOutVisitEnclosure';
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
    this.queryModel.overdueAmount = { min: '', max: '' };
    this.queryModel.overdueDays = { min: '', max: '' };
    this.queryModel.proinviceCode = '';
    this.queryModel.cityCode = '';
    this.queryModel.outsourceId='';
  }
}
</script>

<style lang="less" >
.btn-group {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
</style>
