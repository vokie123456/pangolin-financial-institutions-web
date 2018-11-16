<template>
  <!-- 催收执行页-案件信息模块-客户信息 -->
  <section class="component cust-info">
    <!-- 客户信息 -->
    <el-row>
      <div class="circle"></div>
      <span class="circle-title">客户信息</span>
    </el-row>
    <data-grid :totalSpan="12" :labelWidth="125" labelAlign="center" contentAlign="left" style="margin:10px;">
      <data-grid-item label="学历" :span="3">{{personalInfo.education}}</data-grid-item>
      <data-grid-item label="证件类型" :span="3">{{personalInfo.idType | dictConvert('PersonalIdType')}}</data-grid-item>
      <data-grid-item label="身份证地址" :span="3">{{personalInfo.idCardAddress}}</data-grid-item>
      <data-grid-item label="房屋居住所有权" :span="3">{{personalInfo.localHomePower}}</data-grid-item>
      <data-grid-item label="手机号码" :span="3">{{personalInfo.mobileNo}}</data-grid-item>
      <data-grid-item label="证件号码" :span="3">{{personalInfo.idCard}}</data-grid-item>
      <data-grid-item label="家庭地址" :span="3">{{personalInfo.localAddress}}</data-grid-item>
      <data-grid-item label="车牌号码" :span="3">{{personalInfo.carNo}}</data-grid-item>
      <data-grid-item label="电子邮件" :span="3">{{personalInfo.personalEmail}}</data-grid-item>
      <data-grid-item label="发证机关所在地" :span="3">{{personalInfo.idLicence}}</data-grid-item>
      <data-grid-item label="家庭座机" :span="3">{{personalInfo.localPhone}}</data-grid-item>
      <data-grid-item label="驾照号码" :span="3">{{personalInfo.licenseNo}}</data-grid-item>
      <data-grid-item label="国籍" :span="3">{{personalInfo.nationality}}</data-grid-item>
      <data-grid-item label="身份证到期日期" :span="3">{{personalInfo.idCardExpirationDate}}</data-grid-item>
      <data-grid-item label="现居住迁入时间" :span="3">{{personalInfo.currentLocalDate}}</data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
    </data-grid>
    <!-- 客户开户信息及来源 -->
    <el-row>
      <div class="circle"></div>
      <span class="circle-title">客户开户信息及来源</span>
    </el-row>
    <data-grid :totalSpan="12" :labelWidth="125" labelAlign="center" contentAlign="left" style="margin:10px;">
      <data-grid-item label="约定还款扣款账户姓名" :span="3">{{personalBankInfo.deductionName}}</data-grid-item>
      <data-grid-item label="约定还款扣款账号" :span="3">{{personalBankInfo.cardNumber}}</data-grid-item>
      <data-grid-item label="开户行名称" :span="3">{{personalBankInfo.depositBank}}</data-grid-item>
      <data-grid-item label="客户来源" :span="3">{{personalBankInfo.personalSource}}</data-grid-item>
      <data-grid-item label="来源渠道" :span="3">{{personalBankInfo.channel}}</data-grid-item>
      <data-grid-item label="推荐人" :span="3">{{personalBankInfo.referrer}}</data-grid-item>
      <data-grid-item label="推荐支行" :span="3">{{personalBankInfo.recommendBranch}}</data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
    </data-grid>
    <!-- 联系人信息 -->
    <el-row>
      <div class="circle"></div>
      <span class="circle-title">联系人信息</span>
    </el-row>
    <data-box :maxHeight="115" :data="personalContacts">
      <template slot="columns">
        <el-table-column prop="relation" label="关系" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.relation,'Relationship')">
        </el-table-column>
        <el-table-column prop="contName" label="姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column label="性别" :min-width="$helper.getColumnWidth(2)" :formatter="(row) => $filter.dictConvert(row.contSex,'Sex')">
        </el-table-column>
        <el-table-column prop="contIdCard" label="身份证号" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="contAddress" label="住宅地址" :min-width="$helper.getColumnWidth(8)">
        </el-table-column>
        <el-table-column prop="contCity" label="城市" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="phone" label="住宅电话" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="contEmployer" label="工作单位" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="contWorkPhone" label="单位电话" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>
    <!-- 房产信息 -->
    <el-row>
      <div class="circle"></div>
      <span class="circle-title">房产信息</span>
    </el-row>
    <data-grid :totalSpan="12" :labelWidth="125" labelAlign="center" contentAlign="left" style="margin:10px;">
      <data-grid-item label="房屋购置价" :span="3">{{personalHouse.housePurchasePrice}}</data-grid-item>
      <data-grid-item label="房屋评估价" :span="3">{{personalHouse.houseEvaluatePrice}}</data-grid-item>
      <data-grid-item label="首付金额" :span="3">{{personalHouse.downPayment}}</data-grid-item>
      <data-grid-item label="房贷余额" :span="3">{{personalHouse.loanBalance}}</data-grid-item>
      <data-grid-item label="房贷总期数" :span="3">{{personalHouse.houseLoanPeriod}}</data-grid-item>
      <data-grid-item label="房贷已还款期数" :span="3">{{personalHouse.repayPeriod}}</data-grid-item>
      <data-grid-item label="房贷月均还款额" :span="3">{{personalHouse.monthRepayment}}</data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
      <data-grid-item label="其他房产地址1" :span="6">{{personalHouse.otherHouseAddr1}}</data-grid-item>
      <data-grid-item label="其他房产地址2" :span="6">{{personalHouse.otherHouseAddr2}}</data-grid-item>
      <data-grid-item label="其他房产地址3" :span="6">{{personalHouse.otherHouseAddr3}}</data-grid-item>
      <data-grid-item label="其他房产地址4" :span="6">{{personalHouse.otherHouseAddr4}}</data-grid-item>
    </data-grid>
    <!-- 收支状况 -->
    <el-row>
      <div class="circle"></div>
      <span class="circle-title">收支状况</span>
    </el-row>
    <data-grid :totalSpan="12" :labelWidth="125" labelAlign="center" contentAlign="left" style="margin:10px;">
      <data-grid-item label="月均薪资(税后)" :span="3">{{personalIncome.deductionName}}</data-grid-item>
      <data-grid-item label="公积金缴存单位" :span="3">{{personalIncome.cardNumber}}</data-grid-item>
      <data-grid-item label="缴存基数" :span="3">{{personalIncome.depositBank}}</data-grid-item>
      <data-grid-item label="公积金个人缴存额度" :span="3">{{personalIncome.personalSource}}</data-grid-item>
      <data-grid-item label="个人社保月均缴存额度" :span="3">{{personalIncome.channel}}</data-grid-item>
      <data-grid-item label="社保缴存比例" :span="3">{{personalIncome.referrer}}</data-grid-item>
      <data-grid-item label="月固定补助" :span="3">{{personalIncome.recommendBranch}}</data-grid-item>
      <data-grid-item label="年收入" :span="3"></data-grid-item>
      <data-grid-item label="家庭月收入" :span="3"></data-grid-item>
      <data-grid-item label="每月租房/房贷费用" :span="3"></data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { CaseOperatorPageService } from "~/services/domain-service/case-operator-page.service";
import { DataImportExcelInfoService } from "~/services/dataimp-service/data-import-excel-info.service.ts";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import DataBox from "~/components/common/data-box.vue";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Prop } from "vue-property-decorator";
import { CASE_CHANNEL } from "~/config/enum.config";

@Component({
  components: {
    DataBox,
    DataGrid,
    DataGridItem
  }
})
export default class CustInfo extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  @Dependencies(DataImportExcelInfoService)
  private dataImportExcelInfoService: DataImportExcelInfoService;

  private personalInfo: any = {};
  private personalBankInfo: any = {};
  private personalContacts: any[] = [];
  private personalHouse: any = {};
  private personalIncome: any = {};

  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  /**
   * caseChannel
   */
  @Prop({ type: String, required: true })
  private caseChannel: string;

  /**
   * 是否导入
   */
  private get isImport() {
    return this.caseChannel === CASE_CHANNEL.import;
  }

  private activated() {
    this.refreshData();
  }

  private refreshData() {
    this.getPersonalInfo();
    this.getBankInfo();
    this.getContacts();
    this.getHouseInfo();
    this.getIncome();
  }

  /**
   * 获取客户信息
   */
  private getPersonalInfo() {
    if (this.isImport) {
      this.dataImportExcelInfoService
        .getImportPersonalInfo(this.caseId)
        .subscribe(data => (this.personalInfo = data));
    } else {
      this.caseOperatorPageService
        .personalInfo(this.caseId)
        .subscribe(data => (this.personalInfo = data));
    }
  }

  /**
   * 获取客户开户信息
   */
  private getBankInfo() {
    if (this.isImport) {
      this.dataImportExcelInfoService
        .getImportPersonalBank(this.caseId)
        .subscribe(data => (this.personalBankInfo = data));
    } else {
      this.caseOperatorPageService
        .personalBankInfo(this.caseId)
        .subscribe(data => (this.personalBankInfo = data));
    }
  }

  /**
   * 获取联系人信息
   */
  private getContacts() {
    if (this.isImport) {
      this.dataImportExcelInfoService
        .getImportPersonalContacts(this.caseId)
        .subscribe(data => {
          this.personalContacts = data;
        });
    } else {
      this.caseOperatorPageService
        .personalContacts(this.caseId)
        .subscribe(data => (this.personalContacts = data));
    }
  }

  /**
   * 获取客户房产信息
   */
  private getHouseInfo() {
    if (this.isImport) {
      this.dataImportExcelInfoService
        .getImportPersonalHouse(this.caseId)
        .subscribe(data => (this.personalHouse = data));
    } else {
      this.caseOperatorPageService
        .queryPersonalHouse(this.caseId)
        .subscribe(data => (this.personalHouse = data));
    }
  }

  /**
   * 获取客户收支状况
   */
  private getIncome() {
    if (this.isImport) {
      this.dataImportExcelInfoService
        .getImportPersonalIncome(this.caseId)
        .subscribe(data => (this.personalIncome = data));
    } else {
      this.caseOperatorPageService
        .queryPersonalIncome(this.caseId)
        .subscribe(data => (this.personalIncome = data));
    }
  }
}
</script>

<style lang="less" scoped>
.component.cust-info {
  .circle {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-left: 15px;
    margin-right: 5px;
    background-color: #28313e;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    vertical-align: middle;
  }

  .circle-title {
    font-size: 14px;
    line-height: 13px;
    color: #28313e;
  }
}
</style>
