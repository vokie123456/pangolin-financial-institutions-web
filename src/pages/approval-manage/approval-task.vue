<template>
  <!-- 审批管理-审批类型设置-页面 -->
  <section class="page approval-task">
    <data-form :model="searchModel" @onSearch="refreshData" :page="pageService">
      <template slot="default-input">
        <el-form-item label="审批流程名称" prop="taskName">
          <el-input v-model="searchModel.taskName"></el-input>
        </el-form-item>
        <el-form-item label="审批类型" prop="applyCategory">
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
      <template slot="default-button">
        <el-button @click="addTaskClick">新增流程</el-button>
      </template>
    </data-form>
    <data-box :data="dataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyFlowTask(scope.row)">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="审批流程名称" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="applyCategory" label="审批类型" :formatter="(row) => $filter.dictConvert(row.applyCategory,'ApplyCategory')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="commonState" label="状态" :formatter="(row) => $filter.dictConvert(row.commonState,'CommonState')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operatorRealName" label="编辑人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog :title="modifyData.id?'修改流程配置':'新增流程配置'" :visible.sync="dialog.processConfigCommon" width="750px" :close-on-click-modal="false" :close-on-press-escape="false" @close="$refs['process-config-common'].reset()">
      <process-config-common ref="process-config-common" :modifyData="modifyData" @close="closeProcessConfig"></process-config-common>
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
import ProcessConfigCommon from '~/components/process-config/process-config-common.vue';

@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    ProcessConfigCommon,
  },
})
export default class ApprovalTask extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(FlowTaskService)
  private flowTaskService: FlowTaskService;
  private modifyData: any = {};
  private searchModel: any = {
    taskName: '',
    applyCategory: '',
    commonState: '',
  };
  private dataSet: any[] = [];
  private dialog: any = {
    processConfigCommon: false,
  };
  /**
   * 点击修改按钮
   */
  private modifyFlowTask(row) {
    this.modifyData = row;
    this.dialog.processConfigCommon = true;
  }
  private created() {
    this.refreshData();
  }
  private refreshData() {
    this.flowTaskService
      .queryFlowTask(this.searchModel, this.pageService, this.sortService)
      .subscribe((data) => {
        this.dataSet = data;
      });
  }
  /**
   * 点击新增流程按钮
   */
  private addTaskClick() {
    this.modifyData = {};
    this.dialog.processConfigCommon = true;
  }
  /**
   * 关闭流程配置
   */
  private closeProcessConfig() {
    this.dialog.processConfigCommon = false;
    this.refreshData();
  }
}
</script>

<style lang="less">
</style>
