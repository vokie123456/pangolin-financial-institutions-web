<template>
  <!-- 审批管理-审批流程设置-页面 -->
  <section class="page approval-node">
    <data-form :model="searchModel" @onSearch="refreshData" :page="pageService">
      <template slot="default-input">
        <el-form-item label="节点名称" prop="applyCategory">
          <el-select v-model="searchModel.applyCategory" size="small">
            <el-option v-for="{index,name,code} in $dict.getDictData('ApplyCategory')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="commonState">
          <el-select v-model="searchModel.commonState" size="small">
            <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </data-form>
    <data-box :data="dataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <el-button type="text" @click="applyCategory(scope.row)">{{scope.row.commonState==='DISABLED'?'启用':'禁用'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="applyCategory" label="类型名称" :formatter="(row) => $filter.dictConvert(row.applyCategory,'ApplyCategory')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="commonState" label="状态" :formatter="(row) => $filter.dictConvert(row.commonState,'CommonState')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorRealName" label="操作人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" :formatter="(row) => $filter.dateTimeFormat(row.createTime)" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog :title="$dict.getDictName(rowData.applyCategory,'ApplyCategory') + (rowData.applyStatus === 'PENDING'?'审批':'查看')" :visible.sync="dialog.leaveApproval" width="600px" :close-on-click-modal="false" @close="$refs['case-approval-common'].reset()">
      <case-approval-common ref='case-approval-common' :rowData="rowData" @close="dialog.leaveApproval=false;refreshData()"></case-approval-common>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { State, Getter } from 'vuex-class';
import { FlowTaskService } from '~/services/domain-service/flow-task.service';
import CaseApprovalCommon from '~/components/approval-manage/own-approval/case-approval-common.vue';

@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    CaseApprovalCommon,
  },
})
export default class ApprovalNode extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(FlowTaskService)
  private flowTaskService: FlowTaskService;

  private searchModel: any = {
    commonState: '',
    applyCategory: '',
  };
  private rowData: string = '';
  private dataSet: any[] = [];
  private dialog: any = {
    leaveApproval: false,
  };

  /**
   * 修改审批类型设置状态
   */
  private applyCategory(row) {
    this.flowTaskService
      .applyCategory({
        commonState: row.commonState === 'DISABLED' ? 'ENABLED' : 'DISABLED',
        id: row.id,
      })
      .subscribe(
        (data) => {
          this.refreshData();
        }
      );
  }
  private mounted() {
    this.refreshData();
  }
  private refreshData() {
    this.flowTaskService
      .queryApplyCategory(this.searchModel, this.pageService, this.sortService)
      .subscribe((data) => {
        this.dataSet = data;
      });
  }
}
</script>

<style lang="less">
</style>
