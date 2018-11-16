<template>
  <!-- 催收执行页-案件信息模块-征信报告 -->
  <section class="component credit-report">
    <el-collapse v-model="activeName" accordion style="width:98%;">
      <el-collapse-item title="个人身份信息" name="1">
        <div>个人身份信息</div>
      </el-collapse-item>
      <el-collapse-item title="联系人信息" name="2">
        <div>联系人信息</div>
      </el-collapse-item>
      <el-collapse-item title="居住信息" name="3">
        <div>居住信息</div>
      </el-collapse-item>
      <el-collapse-item title="职业信息" name="4">
        <div>职业信息</div>
      </el-collapse-item>
      <el-collapse-item title="信用卡汇总信息" name="5">
        <div>信用卡汇总信息</div>
      </el-collapse-item>
      <el-collapse-item title="贷款汇总信息" name="6">
        <div>贷款汇总信息</div>
      </el-collapse-item>
      <el-collapse-item title="信用卡明细信息" name="7">
        <div>信用卡明细信息</div>
      </el-collapse-item>
      <el-collapse-item title="信用卡最近24个月每个月的还款" name="8">
        <div>信用卡最近24个月每个月的还款</div>
      </el-collapse-item>
      <el-collapse-item title="贷款明细信息" name="9">
        <div>贷款明细信息</div>
      </el-collapse-item>
      <el-collapse-item title="贷款最近24个月每个月的还款状态记录" name="10">
        <div>贷款最近24个月每个月的还款状态记录</div>
      </el-collapse-item>
      <el-collapse-item title="个人住房公积金信息" name="11">
        <div>个人住房公积金信息</div>
      </el-collapse-item>
      <el-collapse-item title="查询记录" name="12">
        <div>查询记录</div>
      </el-collapse-item>
      <el-collapse-item title="逾期记录明细" name="13">
        <div>逾期记录明细</div>
      </el-collapse-item>
      <el-collapse-item title="最近24个月缴交记录" name="14">
        <div>最近24个月缴交记录</div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { CASE_CHANNEL } from "~/config/enum.config"

@Component({
  components: {},
})
export default class CreditReport extends Vue {

  private activeName:string = "1"

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


}
</script>

<style lang="less" scoped>
.page.credit-report {
  max-height: 400px;
  overflow-y: auto;
  padding-left: 20px;
}
</style>
