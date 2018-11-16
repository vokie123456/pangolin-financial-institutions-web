<template>
  <!-- 催收执行页-案件信息模块-产品信息 -->
  <section class="component product-info">
    <!-- 贷款商品类型 -->
    <el-row>
      <div class="circle"></div>
      <span class="circle-title">贷款商品类型</span>
    </el-row>
    <data-grid :totalSpan="12" :labelWidth="125" labelAlign="center" contentAlign="left" style="margin:10px;">
      <data-grid-item label="产品名称" :span="3">{{productInfo.productName}}</data-grid-item>
      <data-grid-item label="产品品牌" :span="3">{{productInfo.productBrand}}</data-grid-item>
      <data-grid-item label="产品类型" :span="3">{{productInfo.productCategory}}</data-grid-item>
      <data-grid-item label="产品型号" :span="3">{{productInfo.productModel}}</data-grid-item>
      <data-grid-item label="产品价格" :span="3">{{productInfo.productPrice}}</data-grid-item>
      <data-grid-item label="活动项目编号" :span="3">{{productInfo.productSeriesActiveNumber}}</data-grid-item>
      <data-grid-item label="申请渠道代码" :span="3">{{productInfo.productSeriesApplyChannelNo}}</data-grid-item>
      <data-grid-item label="产品系列类型" :span="3">{{productInfo.productSeriesSeriesCategory }}</data-grid-item>
      <data-grid-item label="产品系列名称" :span="3">{{productInfo.productSeriesSeriesName}}</data-grid-item>
      <data-grid-item label="商品总价" :span="3">{{productInfo.productSeriesSeriesTotalAmount}}</data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
      <data-grid-item label="" :span="3"></data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { DataGrid, DataGridItem } from '@zct1989/vue-component';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import { DataImportExcelInfoService } from '~/services/dataimp-service/data-import-excel-info.service.ts';
import { Prop } from "vue-property-decorator";
import { CASE_CHANNEL } from "~/config/enum.config"

@Component({
  components: {
    DataBox,
    DataGrid,
    DataGridItem,
  },
})
export default class ProductInfo extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  @Dependencies(DataImportExcelInfoService)
  private dataImportExcelInfoService: DataImportExcelInfoService;
  private productInfo: any[] = [];


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

  private activated(){
    this.refreshData()
  }

  /**
   * 是否导入
   */
  private get isImport() {
    return this.caseChannel === CASE_CHANNEL.import
  }


  private refreshData() {
    if (this.isImport) {
      this.dataImportExcelInfoService.getImportProduct(this.caseId).subscribe(
        data => this.productInfo = data
      )
    } else {
      // 获取产品信息
      this.caseOperatorPageService.queryProduct(this.caseId).subscribe(
        (data) => this.productInfo = data
      );
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
