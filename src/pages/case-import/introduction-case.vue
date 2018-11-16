<template>
  <!--案件导入-案件上传导入-->
  <section class="page introduction-case">
    <data-form :model="introductionModel" @onSearch="refreshData" :rules="introductionRule" :page="pageService" @handleResetForm="follFeedback">
      <template slot="default-input">
        <el-form-item label="批次号" prop="batchNumber">
          <el-input v-model="introductionModel.batchNumber"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobileNo">
          <el-input v-model="introductionModel.mobileNo"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="personalName">
          <el-input v-model="introductionModel.personalName"></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
        <el-form-item label="逾期天数" prop="dayRange">
          <number-range v-model="introductionModel.dayRange" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="逾期总金额" prop="amountRange">
          <number-range v-model="introductionModel.amountRange"></number-range>
        </el-form-item>
        <el-form-item label="委托方" prop="principalId">
          <el-select v-model="introductionModel.principalId" placeholder="请选择" clearable>
            <el-option v-for="item in principalList.content" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="default-button">
        <!--按钮区域-->
        <el-button @click="dialog.caseExcelImport = true">案件导入</el-button>
        <el-button :disabled="!isImported" @click="checkCaseFile">案件确认</el-button>
        <el-button :disabled="!isImported" @click="dialog.deleteExcelImport = true,deleteImport.batchNumber=''">案件删除</el-button>
      </template>
    </data-form>
    <data-box :data="introductionDataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column prop="caseInfo.caseNumber" label="案件编号" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text" @click="openExecutionPage(scope.row)">{{scope.row.caseNumber}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="principalName" label="委托方" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="mobileNo" label="手机号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期期数" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="overdueAmount" label="逾期金额(元)" :min-width="$helper.getColumnWidth(6)" :formatter="(row) => $filter.toThousands(row.overdueAmount)">
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.createTime)">
        </el-table-column>
      </template>
    </data-box>

    <!--案件导入弹出框-->
    <el-dialog title="案件导入" width="500px" :visible.sync="dialog.caseExcelImport" @close="importClose" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <CaseExcelImport ref="case-excel-import" @close="dialog.caseExcelImport = false;refreshData();" @success="importSucc"></CaseExcelImport>
    </el-dialog>
    <!--选择案件批次-->
    <el-dialog title="选择案件批次" width="600px" :visible.sync="dialog.chooseBatchNumber" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-width="100px" class="text-left" :model="deleteImport">
        <el-form-item label="批次号" prop="batchNumber" class="batchInput">
          <el-select placeholder="请选择" v-model="deleteImport.batchNumber">
            <el-option v-for="item in batchList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="operate-buttons">
        <el-button @click="dialog.chooseBatchNumber = false">取消</el-button>
        <el-button @click="chooseBatchNumberConfirm(deleteImport.batchNumber)">确定</el-button>
      </div>
    </el-dialog>
    <!--案件删除弹出框-->
    <el-dialog title="案件删除" width="600px" :visible.sync="dialog.deleteExcelImport" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-width="100px" class="text-left">
        <el-form-item label="批次号" prop="batchNumber" class="batchInput">
          <el-select placeholder="请选择" v-model="deleteImport.batchNumber">
            <el-option v-for="item in batchList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0" class="text-center">
          <span>确定要删除此批次案件吗?</span>
        </el-form-item>
      </el-form>
      <div class="operate-buttons">
        <el-button @click="dialog.deleteExcelImport = false">取消</el-button>
        <el-button @click="deleteCase">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { State, Action, namespace, Getter } from 'vuex-class';
import NumberRange from '~/components/common/number-range.vue';
import CaseExcelImport from '~/components/case-import/case-ecxel-import.vue';
import { PageService } from '~/utils/page.service';
import { CaseInfoService } from '~/services/domain-service/case-info.service';
import { DataImportExcelInfoService } from '~/services/dataimp-service/data-import-excel-info.service';
import { CommonService } from '~/utils/common.service';
import { OpenExecutionData } from "~/config/types";
import { CASE_CHANNEL } from '~/config/enum.config';
const CollectionExecutionModule = namespace('collection-execution');

const caseManageModule = namespace('case-manage');

@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    CaseExcelImport,
  },
})
export default class IntroductionCase extends Vue {
  @State
  public principalList: any;
  @caseManageModule.State
  private batchList;
  @caseManageModule.State
  private importSuccess;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(CaseInfoService)
  private CaseInfoService: CaseInfoService;
  @Dependencies(DataImportExcelInfoService)
  private DataImportExcelInfoService: DataImportExcelInfoService;
  @caseManageModule.Action private getBatchList;
  @CollectionExecutionModule.Action private openCollectionExecution;
  private dialog: any = {
    caseExcelImport: false,
    chooseBatchNumber: false,
    deleteExcelImport: false,
  };

  private caseDetail: any = '';
  private introductionModel: any = {
    batchNumber: '',
    mobileNo: '',
    personalName: '',
    dayRange: { min: '', max: '' },
    amountRange: { min: '', max: '' },
    principalId: '',
  };
  private deleteImport: any = {
    batchNumber: '',
  };
  private introductionDataSet = null;
  private introductionRule = {};
  //判断是否有批次号
  get isImported() {
    return this.batchList.length > 0;
  }
  // @CollectionExecutionModule.Mutation('updateViewType')
  // private updateViewType;


  @Watch('importSuccess')
  public onImportSuccess() {
    this.refreshData();
  }

  public importSucc() {
    setTimeout(() => {
      this.refreshData();
    }, 1000);
  }
  //获取案件列表
  public refreshData() {
    this.DataImportExcelInfoService.getAllImportExcelInfos(
      this.introductionModel,
      this.pageService,
    ).subscribe(
      (data) => {
        this.introductionDataSet = data;
      }
    );
    this.getBatchList();
  }
  private mounted() {
    this.refreshData();
  }

  private importClose() {
    this.refreshData();
  }

  /**
   * 打开案件确认弹框
   */
  private checkCaseFile() {
    this.dialog.chooseBatchNumber = true;
    this.deleteImport.batchNumber = '';
  }

  /**
   * 选择批次号
   */
  private chooseBatchNumberConfirm(batchNumber) {
    if (!this.deleteImport.batchNumber) {
      this.$message('请选择批次号！');
    } else {
      this.caseConfirm(batchNumber);
    }
  }

  /**
   * 案件确认选择批次号确认
   */
  private caseConfirm(batchNumber) {
    this.CaseInfoService.confirmCaseInfo({
      batchNumber: this.deleteImport.batchNumber,
    }).subscribe(
      (data) => {
        this.$message.success('案件正在后台确认，请稍后查看待分配案件...');
        this.dialog.chooseBatchNumber = false;
        this.refreshData();
      }
    );
  }

  /**
   * 案件选择批次号删除
   */
  private deleteCase() {
    if (this.deleteImport.batchNumber === '') {
      this.$message('请选择要删除的案件批次号！');
    } else {
      this.DataImportExcelInfoService.deleteDataExcelInfoByBatch(
        this.deleteImport,
      ).subscribe(
        (data) => {
          this.$message.success('案件删除成功');
          this.refreshData();
          this.dialog.deleteExcelImport = false;
        }
      );
    }
  }
  /**
   * 重置numberRange
   */
  private follFeedback() {
    this.introductionModel.dayRange = { min: '', max: '' };
    this.introductionModel.amountRange = { min: '', max: '' };
  }

  /**
   * 进入查看执行页
   */
  private openExecutionPage(row) {
    this.openCollectionExecution(new OpenExecutionData(row.id, row.caseNumber, CASE_CHANNEL.import, true))
  }
}
</script>

<style lang="less">
.page.introduction-case {
  .data-box {
    .error-row > td {
      color: #ff9813 !important;
      span {
        color: #ff9813 !important;
      }
    }
  }
  .batchInput {
    width: 350px !important;
    margin: auto !important;
  }
}
</style>
