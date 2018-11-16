<template>
  <!-- 催收执行页-历史信息模块-申请历史 -->
  <section class="component apply-history">
    <!-- 搜索区域 -->
    <data-form :model="model" @onSearch="refreshData" ref="form">
      <template slot="default-input">
        <el-form-item label="申请类型:" prop="applyCategory">
          <el-select placeholder="请选择" v-model="model.applyCategory" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('ApplyCategory')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态:" prop="applyStatus">
          <el-select placeholder="请选择" v-model="model.applyStatus" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('ApplyStatus')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人:" prop="applyRealName">
          <el-input v-model="model.applyRealName" placeholder="请输入申请人" clearable></el-input>
        </el-form-item>
        <el-form-item label="审核人:" prop="approvalRealName">
          <el-input v-model="model.approvalRealName" placeholder="请输入审核人" clearable></el-input>
        </el-form-item>
      </template>
    </data-form>
    <!-- 数据列区域 -->
    <data-box @onPageChange="refreshData" :data="dataSet" :page="pageService" :height="200">
      <template slot="columns">
        <el-table-column prop="applyCategory" label="申请类型" :formatter="(row) => $filter.dictConvert(row.applyCategory,'ApplyCategory')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="applyRealName" label="申请人" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" :formatter="(row) => $filter.dateTimeFormat(row.applyTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="applyStatus" label="审核状态" :formatter="(row) => $filter.dictConvert(row.applyStatus,'ApplyStatus')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="approvalRealName" label="审核人" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="approvalTime" label="审核时间" :formatter="(row) => $filter.dateTimeFormat(row.approvalTime)" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(6)">
          <!-- <template slot-scope="scope">
            <el-button type="text">查看</el-button>
            <el-button type="text">上传附件</el-button>
            <el-button type="text">通过</el-button>
            <el-button type="text">拒绝</el-button>
          </template> -->
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import DataBox from '~/components/common/data-box.vue';
import DataForm from '~/components/common/data-form.vue';
import { PageService } from '~/utils/page.service';

@Component({
  components: {
    DataBox,
    DataForm,
  },
})
export default class ApplyHistory extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;

  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  private model: any = {
    applyCategory: '',
    applyStatus: '',
    applyRealName: '',
    approvalRealName: '',
  };
  private dataSet: any[] = [];

  // 刷新数据
  public refreshData() {
    this.model.caseId = this.caseId;
    this.caseOperatorPageService
      .caseApplyHistory(this.model, this.pageService)
      .subscribe(
        (data) => {
          this.dataSet = data;
        }
      );
  }

  private activated() {
    this.refreshData()
  }
}
</script>

<style lang="less" scoped>
</style>
