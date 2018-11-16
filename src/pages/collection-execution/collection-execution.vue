<template>
  <!-- 催收执行页 -->
  <section class="page collection-execution">
    <!-- 顶部信息 -->
    <el-row style="background-color:#000;color:#FA824D;height:37px" v-if="!debt">
      <svg-icon iconName="xiaoxitixing" style="vertical-align: middle;" iconSize="30"></svg-icon>
      <span style="line-height:37px;font-size:14px;">催员反馈客户态度蛮横，请注意！！！</span>
      <div class="flexCenter" style="height:100%;float:right;margin-right:10px;">
        <!-- <el-button v-if="!collectonData.isImport && !collectonData.isUndistributed">话术</el-button> -->
        <el-button @click="$router.back()">返回</el-button>
      </div>
    </el-row>
    <!-- 案件信息汇总 -->
    <el-row style="background-color:#000;color:#fff;height:34px;margin-top:1px;font-size:14px;" class="flexCenter">
      <el-col :span='5'>
        <span style="padding-left:10px;">案件编号：</span>
        <span>{{topInfo.caseNumber}}</span>
      </el-col>
      <el-col :span='3'>
        <span style="padding-left:10px;">姓名：</span>
        <span>{{topInfo.personalName}}</span>
      </el-col>
      <el-col :span='2'>
        <span>性别：</span>
        <span>{{topInfo.sex || '未知'}}</span>
      </el-col>
      <el-col :span='2'>
        <span>年龄：</span>
        <span>{{topInfo.age || '未知'}}</span>
      </el-col>
      <el-col :span='3'>
        <span>婚姻状况：</span>
        <span>{{topInfo.marital || '未知'}}</span>
      </el-col>
      <el-col :span='5'>
        <span>身份证号：</span>
        <span>{{topInfo.idCard}}</span>
      </el-col>
      <el-col :span='2'>
        <span>共债案件：</span>
        <span style="color:#FA824D">{{topInfo.commonDebtNum}}</span>
      </el-col>
      <el-col :span='4'>
        <span>共债案件总金额：</span>
        <span style="color:#FA824D">{{topInfo.commonDebtAmt}}元</span>
      </el-col>
    </el-row>
    <!-- 案件信息模块 -->
    <el-row style="margin:10px;background-color: #fff;">
      <collection-case-info></collection-case-info>
    </el-row>
    <!-- 通讯录行动区模块 -->
    <el-row style="height:440px;margin:10px;background-color: #fff;" v-if="!collectonData.onlyView">
      <!-- 通讯录模块 -->
      <el-col :span="16">
        <collection-add-list></collection-add-list>
      </el-col>
      <!-- 行动区模块 -->
      <el-col :span="8" style="padding-left:10px;background-color: #dde6ef;">
        <collection-action-area></collection-action-area>
      </el-col>
    </el-row>
    <!-- 历史信息模块 -->
    <el-row style="height:380px;margin:10px;background-color: #fff;" v-if="!collectonData.isImport && !collectonData.isUndistributed">
      <collection-history-info></collection-history-info>
    </el-row>
    <!-- 快捷菜单 -->
    <div id="divHotKey" class="case-list-container col nowrap" v-if="!collectonData.onlyView">
      <div class="col-span middle-span case-list-header" @click="showCaseList=!showCaseList">
        <svg-icon iconName="zhankaianjian" iconSize="24" :class="[showCaseList ? 'arrow-right':'arrow-left']" style="vertical-align: middle;"></svg-icon>
      </div>
      <collection-hotkey class="col-span" v-show="showCaseList"></collection-hotkey>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SvgIcon from '~/components/common/svg-icon.vue';
import { Dependencies } from '~/core/decorator';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import CollectionCaseInfo from '~/components/collection-execution/collection-case-info.vue';
import CollectionAddList from '~/components/collection-execution/collection-add-list.vue';
import CollectionActionArea from '~/components/collection-execution/collection-action-area.vue';
import CollectionHistoryInfo from '~/components/collection-execution/collection-history-info.vue';
import CollectionHotkey from '~/components/collection-execution/collection-hotkey.vue';
import { Watch, Prop } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { DataImportExcelInfoService } from '~/services/dataimp-service/data-import-excel-info.service.ts';
import { OpenExecutionData } from "~/config/types";
import { CASE_CHANNEL } from "~/config/enum.config"

const CollectionExecutionModule = namespace('collection-execution');

@Component({
  components: {
    SvgIcon,
    CollectionCaseInfo,
    CollectionAddList,
    CollectionActionArea,
    CollectionHistoryInfo,
    CollectionHotkey,
  },
})
export default class CollectionExecution extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  @Dependencies(DataImportExcelInfoService)
  private dataImportExcelInfoService: DataImportExcelInfoService;

  @CollectionExecutionModule.Getter private collectonData: OpenExecutionData;
  /**
   * 是否公债查看页面
   */
  @Prop({ type: String })
  private debt: string

  private showCaseList: boolean = false;
  private topInfo: any = {
    caseNumber: '',
    commonDebtNum: 0,
    commonDebtAmt: 0,
    sex: '',
    personalName: '',
    age: '',
    marital: '',
    idCard: '',
  };


  /**
   * 初始化
   */
  public ready() {
    // 注册点击事件
    document.addEventListener('click', (event: Event) => {
      const target = event.target as Node;
      const hotKeyElement = document.getElementById('divHotKey');
      if (hotKeyElement && !hotKeyElement.contains(target)) {
        this.showCaseList = false;
      }
    });
  }

  @Watch("collectonData.caseId", { immediate: true })
  private onCaseIdChange() {
    this.refreshData();
  }


  private refreshData() {
    if (this.collectonData.isImport) {
      this.getImportTopInfo()
    } else {
      this.getNormalTopInfo()
    }
  }

  private getImportTopInfo() {
    this.dataImportExcelInfoService
      .getImportPersonalInfo(this.collectonData.caseId)
      .subscribe((data) => {
        this.topInfo.caseNumber = this.collectonData.caseNo;
        this.topInfo.commonDebtNum = 0;
        this.topInfo.commonDebtAmt = 0;
        this.topInfo.sex = data.sex;
        this.topInfo.personalName = data.personalName;
        this.topInfo.age = data.age;
        this.topInfo.marital = data.marital;
        this.topInfo.idCard = data.idCard;
      });
  }

  private getNormalTopInfo() {
    this.caseOperatorPageService
      .topInfo({ caseId: this.collectonData.caseId })
      .subscribe((data) => {
        this.topInfo = data;
      });
  }

}
</script>

<style lang="less">
.page.collection-execution {
  padding-left: 0;
  background-color: #dde6ef;
  overflow-y: hidden;

  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: Center;
  }
  .case-list-container {
    .case-list-header {
      padding: 4px;
      min-width: 34px;
      font-size: 14px;
      color: #fff;
      font-weight: bold;
      background: #1a7cd6;
      text-align: left;
      cursor: pointer;
    }
    top: 120px;
    position: fixed;
    right: 18px;
    z-index: 1000;
    background-color: #fff;
    border-radius: 5px 0 0 5px;
  }
  .arrow-right {
    transform: rotate(0deg);
  }
  .arrow-left {
    transform: rotate(180deg);
  }
}
</style>



