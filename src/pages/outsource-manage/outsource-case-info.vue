
<template>
  <!-- 催收执行页-案件信息模块 -->
  <section class="component collection-case-info">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="客户信息" name="cust-info">
        <cust-info></cust-info>
      </el-tab-pane>
      <el-tab-pane label="案件信息" name="case-info">
       <case-info></case-info> 
      </el-tab-pane>
      <el-tab-pane label="产品信息" name="product-info">
        <product-info></product-info>
      </el-tab-pane>
      <el-tab-pane label="还款明细" name="pay-info">
        还款明细
      </el-tab-pane>
      <el-tab-pane label="申请材料信息" name="apply-datum-info">
        <apply-datum-info></apply-datum-info>
      </el-tab-pane>
      <!-- <el-tab-pane label="征信报告" name="credit-report">
        <credit-report></credit-report>
      </el-tab-pane>
      <el-tab-pane label="共债信息" name="public-debt-info">
        <public-debt-info></public-debt-info>
      </el-tab-pane>
      <el-tab-pane label="修复信息" name="fix-info">
        <fix-info></fix-info>
      </el-tab-pane> -->
    </el-tabs>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CustInfo from '~/components/collection-execution/collection-case-info/cust-info.vue';
import ProductInfo from '~/components/collection-execution/collection-case-info/product-info.vue';
import ApplyDatumInfo from '~/components/collection-execution/collection-case-info/apply-datum-info.vue';
import CreditReport from '~/components/collection-execution/collection-case-info/credit-report.vue';
import PublicDebtInfo from '~/components/collection-execution/collection-case-info/public-debt-info.vue';
import FixInfo from '~/components/collection-execution/collection-case-info/fix-info.vue';
import CaseInfo from '~/components/collection-execution/collection-case-info/case-info.vue';

@Component({
  components: {
    CustInfo,
    ProductInfo,
    ApplyDatumInfo,
    CreditReport,
    PublicDebtInfo,
    FixInfo,
    CaseInfo
  },
})
export default class CollectionCaseInfo extends Vue {
  // 默认激活页面
  private activeName: string = 'cust-info';
}
</script>

<style lang="less" scoped>
</style>