<template>
  <!-- 催收执行页-历史信息模块-流转历史 -->
  <section class="component circulation-history">
    <!-- 搜索区域 -->
    <data-form :model="model"  @onSearch="refreshData" ref="form">
      <template slot="default-input">
        <el-form-item label="流转方式:" prop="turnType">
           <el-select v-model="model.turnType" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('TurnType')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期阶段" prop="overduePeriod">
          <el-select v-model="model.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </data-form>
    <!-- 数据列区域 -->
    <data-box @onPageChange="refreshData" :data="dataSet" :page="pageService" :height="200">
      <template slot="columns">
        <el-table-column prop="caseNumber" label="编号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="caseTurnTime" label="流转日期" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{scope.row.caseTurnTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="turnSource" label="催收方式" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.turnSource, 'TurnSource')">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期阶段" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="currentCollectorName" label="催收员" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="turnType" label="流转方式" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.turnType, 'TurnType')">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="操作人" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <!-- <el-table-column prop="beizhu" label="备注" :min-width="$helper.getColumnWidth(10)">
        </el-table-column> -->
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Prop } from "vue-property-decorator";
import DataBox from '~/components/common/data-box.vue';
import DataForm from '~/components/common/data-form.vue';
import { PageService } from '~/utils/page.service';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';

@Component({
  components: {
    DataBox,
    DataForm,
  },
})
export default class CirculationHistory extends Vue {
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
    turnGoal: '',
    overduePeriod: '',
  };

  private selected: any = {};
  private dataSet: any[] = [];

  private refreshData() {
    this.model.caseId = this.caseId
    this.caseOperatorPageService.getAllCaseTurnRecords(this.model, this.pageService).subscribe(
      (data) => this.dataSet = data
    )
  }

  private activated() {
    this.refreshData()
  }
}
</script>

<style lang="less" scoped>
</style>
