<template>
  <section class="component modify-company">
    <data-box @onPageChange="refreshData" :data="queryCompanyDataSet" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button @click="dialog.modifyLawsuit = true, companyObj = scope.row" type="text">诉讼跟进</el-button>
            <el-button @click="dialog.modifyLawsuit = true, companyObj = scope.row" type="text">费用维护</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="诉讼编号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="companyStatus" label="诉讼类型" :min-width="$helper.getColumnWidth(2)">
        </el-table-column>
        <el-table-column prop="companyName" label="诉讼状态" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="companyPhone" label="创建人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operator" label="创建时间" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import DataBox from "~/components/common/data-box.vue";
import { PageService } from "~/utils/page.service";

@Component({
  components: {
    DataBox
  }
})

export default class ModifyLawsuit extends Vue {
  @Dependencies(OutsourceLawsuitService) private outsourceLawsuitService: OutsourceLawsuitService;
  @Dependencies(PageService)
  private pageService: PageService;
  // 公司数据实体
  private companyModel: any = {
    companyAddress: "",
    companyName: "",
    companyPhone: "",
    companyStatus: "",
    id: 0
  }
  private queryCompanyDataSet:any=[]
  /**
   * 页面激活
   */
  private mounted() {

  }
  private refresh() {
    this.outsourceLawsuitService.getCostRecord(this.companyModel, this.pageService)
      .subscribe(data => {
        this.queryCompanyDataSet = data;
      });
  }
}

</script>
