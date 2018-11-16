<template>
  <!-- 催收执行页-通讯录模块-案件备注 -->
  <section class="component case-remark">
    <!-- 按钮区域 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="14" style="padding-left:10px;">
      </el-col>
      <el-col :span="10" style="min-width:360px;">
        <div style="float:right;padding-left:10px;padding-right:10px;">
          <el-button @click="dialog.addCaseRemark = true">添加备注</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 数据区域 -->
    <data-box :height="280" :data="dataSet" :page="pageService">
      <template slot="columns">
        <el-table-column prop="createTime" label="时间" :min-width="$helper.getColumnWidth(5)" :formatter="(row) => $filter.dateTimeFormat(row.createTime)">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="操作人" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="content" label="备注内容" :min-width="$helper.getColumnWidth(10)">
        </el-table-column>
      </template>
    </data-box>
    <el-dialog title="添加备注" width="500px" :visible.sync="dialog.addCaseRemark" :close-on-press-escape="false" :close-on-click-modal="false" :append-to-body="true">
      <add-case-remark @close="dialog.addCaseRemark=false;refreshData()" :caseId="caseId" ref="add-case-remark"></add-case-remark>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service.ts';
import AddCaseRemark from '~/components/collection-execution/operate-components/add-case-remark.vue';

@Component({
  components: {
    DataBox,
    AddCaseRemark,
  },
})
export default class CaseRemark extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;

  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  private searchModel: any = {};
  private dataSet: any[] = [];
  private dialog: any = {
    addCaseRemark: false,
  };

  private refreshData() {
    this.searchModel.caseId = this.caseId;
    this.caseOperatorPageService
      .caseRemark(this.searchModel, this.pageService, this.sortService)
      .subscribe((data) => {
        this.dataSet = data;
      });
  }


  private activated() {
    this.refreshData();
  }
}
</script>

<style lang="less" scoped>
</style>
