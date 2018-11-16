<template>
  <!--执行页-电话簿-电话流水 -->
  <section class="component tel-water">
    <data-form :model="searchModel" @onSearch="refreshData" ref="form">
      <template slot="default-input">
        <el-form-item label="与客户关系" prop="relationship">
          <el-select placeholder="请选择" v-model="searchModel.relationship">
            <el-option v-for="{index,name,code} in $dict.getDictData('Relationship')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="targetName">
          <el-input v-model="searchModel.targetName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="targetPhone">
          <el-input v-model="searchModel.targetPhone"></el-input>
        </el-form-item>
        <el-form-item label="电话码" prop="phoneStatus">
          <el-select placeholder="请选择" v-model="searchModel.phoneStatus">
            <el-option v-for="{index,name,code} in $dict.getDictData('PhoneStatus')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </data-form>
    <data-box :data="dataSet" @onPageChange="refreshData" :page="pageService" ref="data-box">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="relationship" label="与客户关系" :formatter="row => $filter.dictConvert(row.relationship,'Relationship')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="targetName" label="姓名" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="targetPhone" label="电话" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="phoneStatus" label="电话码" :formatter="row => $filter.dictConvert(row.phoneStatus,'PhoneStatus')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="phoneStatusDate" :formatter="(row) => $filter.dateTimeFormat(row.phoneStatusDate)" label="电话码时间" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="remark" label="电话码备注" :min-width="$helper.getColumnWidth(8)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import { PageService } from '~/utils/page.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';

@Component({
  components: {
    DataForm,
    DataBox,
  },
})
export default class TelWater extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Prop({required: true}) 
  private caseId: string;

  private searchModel: any = {
    caseId: '',
    relationship: '',
    targetName: '',
    targetPhone: '',
    phoneStatus: '',
  };
  private dataSet: any[] = [];
  // 刷新数据
  private refreshData() {
    this.searchModel.caseId = this.caseId
    this.caseOperatorPageService
      .findCaseTelRecord(this.searchModel, this.pageService)
      .subscribe(
        (data) => {
          this.dataSet = data;
        }
      );
  }
}
</script>

<style scoped lang="less">
</style>
