<template>
  <!-- 审批管理-我的审核-页面 -->
  <section class="page own-approval">
    <data-form :model="ownModel" @onSearch="refreshData" :page="pageService">
      <template slot="default-input">
        <el-form-item label="申请号" prop="caseNumber">
          <el-input v-model="ownModel.caseNumber"></el-input>
        </el-form-item>
        <el-form-item label="审核类型" prop="applyCategory">
          <el-select v-model="ownModel.applyCategory" size="small">
            <el-option v-for="{index,name,code} in $dict.getDictData('ApplyCategory')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人" prop="applyRealName">
          <el-input v-model="ownModel.applyRealName"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="checkRealName">
          <el-input v-model="ownModel.checkRealName"></el-input>
        </el-form-item>
      </template>
    </data-form>

    <data-box :data="ownDataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="approvalClick(scope)">{{scope.row.applyStatus==='PENDING'?'审批':'查看'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="caseNumber" label="申请号" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="personalName" label="客户姓名" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="applyCategory" label="审核类型" :formatter="(row) => $filter.dictConvert(row.applyCategory,'ApplyCategory')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="applyRealName" label="申请人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" :formatter="(row) => $filter.dateTimeFormat(row.applyTime)" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="applyStatus" label="审核状态" :formatter="(row) => $filter.dictConvert(row.applyStatus,'ApplyStatus')" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="checkUserRealNameLinked" label="审核人" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
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
import { CaseApplyRecordService } from '~/services/domain-service/case-apply-record.service';
import CaseApprovalCommon from '~/components/approval-manage/own-approval/case-approval-common.vue';

@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    CaseApprovalCommon,
  },
})
export default class OwnApproval extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(CaseApplyRecordService)
  private caseApplyRecordService: CaseApplyRecordService;

  private ownModel: any = {
    caseNumber: '',
    applyCategory: '',
    applyRealName: '',
    checkRealName: '',
    applyStatus: '',
  };
  private rowData: string = '';
  private ownDataSet: any[] = [];
  private dialog: any = {
    leaveApproval: false,
  };

  private approvalClick(scope) {
    this.rowData = scope.row;
    this.dialog.leaveApproval = true;
  }
  private mounted() {
    this.refreshData();
  }
  private refreshData() {
    this.caseApplyRecordService
      .getAllCaseApplyRecords(this.ownModel, this.pageService, {
        applyTime: 'desc',
      })
      .subscribe((data) => {
        this.ownDataSet = data;
      });
  }
}
</script>

<style lang="less">
</style>
