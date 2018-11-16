<template>
  <!-- 催收执行页-历史信息模块-电催行动历史 -->
  <section class="component telephone-action-history">
    <!-- 搜索区域 -->
    <data-form :model="searchModel" @onSearch="refreshData" ref="form">
      <template slot="default-input">
        <el-form-item label="行动码:" prop="followupBack">
          <el-select placeholder="请选择" v-model="searchModel.followupBack" clearable>
            <el-option v-for="item in $dict.getDictData('FollowupBack')" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收员:" prop="operatorRealName">
          <el-input v-model="searchModel.operatorRealName" clearable></el-input>
        </el-form-item>
        <el-form-item label="逾期阶段" prop="overduePeriod">
          <el-select v-model="searchModel.overduePeriod" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('OverduePeriodStatus')" :key="index" :label="name" :value="code.replace(/M|\+/, '')"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </data-form>
    <!-- 数据列区域 -->
    <data-box @onPageChange="refreshData" :data="dataSet" :page="pageService" :height="200">
      <template slot="columns">
        <el-table-column prop="id" label="行动流水" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="overduePeriod" label="逾期阶段" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.overduePeriod">M{{scope.row.overduePeriod}}</span>
          </template>
        </el-table-column>
        <el-table-column label="行动码" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{scope.row.followupBack | dictConvert('FollowupBack')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="行动日期" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <span>{{scope.row.followTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operatorRealName" label="催收员" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="checkTime" label="复核时间" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <span>{{scope.row.checkTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="followContent" label="行动说明" :min-width="$helper.getColumnWidth(10)">
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Prop } from "vue-property-decorator";
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import DataBox from '~/components/common/data-box.vue';
import DataForm from '~/components/common/data-form.vue';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import { CASE_CHANNEL } from "~/config/enum.config";

@Component({
  components: {
    DataBox,
    DataForm,
  },
})
export default class TelephoneActionHistory extends Vue {
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

  private searchModel: any = {
    followupBack: '',
    operatorRealName: '',
    overduePeriod: '',
  };
  private dataSet: any[] = [];
  //重置搜索条件
  private resetSearchFelid() {
    const form: any = this.$refs['form'];
    form.resetForm();
  }
  //获取电催行动历史
  private refreshData() {
    this.searchModel.caseId = this.caseId;
    this.searchModel.followupType = CASE_CHANNEL.tel;
    this.caseOperatorPageService
      .caseFollowupRecord(this.searchModel, this.pageService, this.sortService)
      .subscribe((data) => {
        this.dataSet = data;
      });
  }

  private activated() {
    this.refreshData()
  }
}
</script>

<style lang="less" scoped>
</style>
