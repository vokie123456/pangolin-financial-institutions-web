<template>
  <!--委外对账-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" :buttonWrap="true" @onSearch="refreshData" autoSearch>
      <!--输入区域-->
      <template slot="default-input">
        <el-form-item label="批次号" prop="batchNumber">
          <el-input v-model="queryModel.batchNumber"></el-input>
        </el-form-item>
        <el-form-item label="申请号" prop="caseNumber">
          <el-input v-model="queryModel.caseNumber"></el-input>
        </el-form-item>
        <el-form-item label="账单状态" prop="checkStatus">
          <!-- <el-input v-model="queryModel.checkStatus"></el-input> -->
          <el-select v-model="queryModel.checkStatus" placeholder="请选择" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('CheckStatus')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入账时间" prop="entryTime">
            <el-date-picker
            v-model="queryModel.entryTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="受托方" prop="outsName">
          <el-select v-model="queryModel.outsName" placeholder="请选择" clearable>
            <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template slot="default-button">
        <el-button @click="exportBill">对账单导出</el-button>
        <el-button @click="dialog.selectCheck = true">对账单核对</el-button>
        <el-button @click="dialog.selectCreatbill = true">生成账单</el-button>
        <el-button @click="dialog.uploadFile = true">导入还款记录</el-button>
        <el-button type="text" >下载还款模版</el-button>
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="listData" :selectionList.sync="selectionList" :page="pageService">
      <template slot="columns">
         <el-table-column label="操作" :min-width="$helper.getOperateWidth(1)">
          <template slot-scope="scope">
            <el-button @click="clickCheck(scope.row)" :disabled="scope.row.checkStatus!=='CHECK_FAILURE'"  type="text">调账</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="outsName" label="受托方" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="loanType" label="贷款类型" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="overduePeroid" label="逾期期数" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="" label="分案时期数" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="outAmount" label="分案金额" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="repaymentAmount" label="还款金额" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="repaymentTime" label="还款时间" :min-width="$helper.getColumnWidth(5)">
           <template slot-scope="scope">
            <span>{{scope.row.repaymentTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterAmount" label="入账金额" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="entryTime" label="入账时间" :min-width="$helper.getColumnWidth(5)">
           <template slot-scope="scope">
            <span>{{scope.row.entryTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="outConfirmAmount" label="委托方确认金额" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="checkStatus" label="账单状态" :formatter="(row) => $filter.dictConvert(row.checkStatus,'CheckStatus')" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="adjustStatus" label="调账状态" :formatter="(row) => $filter.dictConvert(row.adjustStatus,'AdjustStatus')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>

    <!--对账单核对-->
    <el-dialog title="对账单核对" @open="selectCheck" @close="dialog.selectCheck = false" :visible.sync="dialog.selectCheck" :close-on-click-modal="false" :show-close="true">
      <check @close="dialog.selectCheck=false" @refreshList="refreshData" ref="selectCheck" :checkModel="checkModel"></check>
    </el-dialog>
    <!--调账审核-->
    <el-dialog title="调账审核"  @close="dialog.selectRecCheck = false" :visible.sync="dialog.selectRecCheck" :close-on-click-modal="false" :show-close="true">
      <rec-check @close="closeRecCheck" @refreshList="refreshData" ref="selectRecCheck" :caseRow="caseRow"></rec-check>
    </el-dialog>
    <!--生成账单-->
    <el-dialog title="生成账单" @open="selectCreatbill" @close="dialog.selectCreatbill = false" :visible.sync="dialog.selectCreatbill" :close-on-click-modal="false" :show-close="true">
      <creat-bill @close="dialog.selectCreatbill=false" @refreshList="refreshData" ref="selectCreatbill"></creat-bill>
    </el-dialog>
    <el-dialog title="导入还款记录" @close="dialog.uploadFile = false" :visible.sync="dialog.uploadFile" :close-on-click-modal="false" :show-close="false">
      <file-upload ref="upload_case_import" :fileList.sync="fileList" :fileNumberLimit="1" :AllowExtension="['xlsx','xls']"></file-upload>
      <div class="btn-group">
        <el-button @click="commit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import Check from "~/components/outsource-manage/outsource-reconciliation-manage/check.vue";
import CreatBill from "~/components/outsource-manage/outsource-reconciliation-manage/creat-bill.vue";
import RecCheck from "~/components/outsource-manage/outsource-reconciliation-manage/rec-check.vue";
import FileUpload from "~/components/common/file-upload.vue";
import { PageService } from "~/utils/page.service";
import { SortService } from '~/utils/sort.service';
import { OutsourceReconciliationService } from "~/services/domain-service/outsource-reconciliation-manage.service";
import { OutsourceSettleService } from "~/services/domain-service/outsource-settle-manage.service";
import { OpenExecutionData } from "~/config/types";
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY, } from '~/config/enum.config';
import { Mutation, Getter, namespace, State } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

// @Auth(15)
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    Check,
    CreatBill,
    RecCheck,
    FileUpload
  },
})
export default class OutsourceReconciliationManageIndex extends Vue {
  @Dependencies(OutsourceReconciliationService)
  private outsourceReconciliationService: OutsourceReconciliationService;

  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService;

  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @CollectionExecutionModule.Action private openCollectionExecution;

  private queryModel: any = {
    batchNumber:'',
    caseNumber:'',
    personalName:'',
    mobileNo:'',
    idCard:'',
    localAddress:'',
    currentCollector:'',
    overduePeriod:'',
    turnSource:'',
    productCategory:'',
    productName:'',
    followInTime:'',
    outAmount:{
        max:"",
        min:""
    },
    overdueDays:{
        max:"",
        min:""
    },
    outsName:'',
    checkStatus:'',
    entryTime:[],

  }
  private checkModel: any = {};
  private outsNames: any[] = [];//受托方列表
  private dialog: any = {
    selectCheck: false, //对账单弹框
    selectCreatbill: false, //生成账单弹框
    selectRecCheck: false, //调账弹框
    uploadFile: false,
  };
  private fileList: any = []

  private listData: any[] = [];
  private selectionList: any[] = [];
  private check: any = {};
  private caseRow: any = {}; //选择的某一行
  private recCheckData: any = {}; //调账的参数

  private mounted() {
    this.refreshData();
    this.getOutName();//受托方下拉列表
  }

  private selectCheck() {
    this.$nextTick(() => {
      this.check = this.$refs['selectCheck'];
      // check.refresh();
    });
  }

  // private selectRecCheck() {
  //   this.$nextTick(() => {
  //     this.check = this.$refs['selectRecCheck'];
  //     this.check.refresh();
  //   });
  // }

  /**
   * 调账弹框
   */
  private clickCheck(row){
    this.dialog.selectRecCheck = true;
    this.caseRow = row;
  }

  private closeRecCheck(){
    this.dialog.selectRecCheck = false
  }

  /**
   * 生成账单
   */
  private selectCreatbill() {
    this.$nextTick(() => {
      this.check = this.$refs['selectCreatbill'];
      this.check.refresh();
    });
  }
  /**
   * 列表
   */
  private refreshData() {
    this.outsourceReconciliationService.caseOutContrastList(this.queryModel,this.pageService,this.sortService).subscribe(
      data => {
        this.listData = data;
      }
    );
  }

  /**
   * 受托方列表
   */
  private getOutName(){
      this.outsourceSettleService.getOutSourceList()
        .subscribe( data => {
            this.outsNames = data;
          }
      )
  }

  /**
   * 对账单导出
   */
  private exportBill(){
    const ids: any[] = [];
    this.selectionList.map((v) => {
        ids.push(v.id)
    });
    const param = {
        caseIds:ids,
        batchNumber:this.queryModel.batchNumber,
        checkStatus:this.queryModel.checkStatus,
        entryTimeStart:this.queryModel.entryTime[0],
        entryTimeEnd:this.queryModel.entryTime[1],
        outId:this.queryModel.outsName
    }
    this.outsourceReconciliationService.exportBills(param).subscribe(
      data => {
          console.log(data.url);
          this.refreshData();
          window.open(data.url);
      }
    );
  }

  /**
   * 导入还款记录
   */
  private  commit() {
    if (this.fileList.length === 0) {
      this.$message('请上传导入文件');
      return;
    }
    console.log('this.fileList[0].response.id 呃呃呃呃 ===>',this.fileList[0].response.id);
      const query = {
          fileId: this.fileList[0].response.id
      }
      // 导入电催跟进
      this.outsourceReconciliationService.importRepaymentRecord(query).subscribe(
        data => {
          console.log(data)
          this.dialog.uploadFile = false
          this.refreshData();
          const upload: any = this.$refs['upload_case_import'];
          upload.reset();
        }
      );

  }

  // 关闭弹框
  private close() {
    const upload: any = this.$refs['upload_case_import'];
    upload.reset();
    this.dialog.uploadFile = false
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.id, row.caseNumber, CASE_CHANNEL.OUTER, true))
  }

}
</script>

<style lang="less" >
  .btn-group{
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
</style>
