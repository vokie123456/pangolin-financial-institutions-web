<template>
  <!--待分配案件管理-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" :buttonWrap="true" @onSearch="refreshData" autoSearch :page="pageService">
      <!--输入区域-->
      <template slot="default-input">
        <el-form-item label="策略名称" prop="strategyName">
          <el-input v-model="queryModel.strategyName"></el-input>
        </el-form-item>
        <el-form-item label="佣金类型" prop="commissionStrategyType">
          <el-select v-model="queryModel.commissionStrategyType" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommissionStrategyType')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="commonState">
          <el-select v-model="queryModel.commonState" placeholder="所有" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="addRow">新增</el-button>
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="stayDataList" :selectionList.sync="selectionList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button @click="checkRow(scope.row)" type="text">查看</el-button>
            <el-button @click="editRow(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column type="index" label="编号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="strategyName" label="佣金策略名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column  :formatter="(row) => $filter.dictConvert(row.commissionStrategyType,'CommissionStrategyType')" label="佣金类型" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column :formatter="(row) => $filter.dictConvert(row.commonState,'CommonState')" label="状态" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="创建人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="createTime" :formatter="(row) => $filter.dateTimeFormat(row.createTime)" label="创建时间" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="updateOperatorRealName" label="编辑人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="updateTime" :formatter="(row) => $filter.dateTimeFormat(row.updateTime)" label="编辑时间" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
      </template>
    </data-box>

    <!--弹框-->
    <el-dialog title="案件分配"  @close="dialog.addSettle = false" :visible.sync="dialog.addSettle" :close-on-click-modal="false" :show-close="false" width="1000px">
        <add-strategy @close="dialog.addSettle=false" @refreshList="refreshData" ref="addSettle" :state="state"></add-strategy>
    </el-dialog>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import NumberRange from "~/components/common/number-range.vue";
import AddStrategy from "~/components/system-manage/outsource-settle-manage/add-strategy.vue"; // 弹框组件

import { State, Getter } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { SystemParamService } from "~/services/management-service/system-param.service";
import { OutsourceCommissionService } from "~/services/management-service/outsource-commission.service";
import { SortService } from '~/utils/sort.service';

// @Auth(1002)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    AddStrategy

  }
})
export default class OutSourceSettle extends Vue {
  @Dependencies(SystemParamService) private sysParamService: SystemParamService;
  @Dependencies(OutsourceCommissionService) private OutsourceCommissionService: OutsourceCommissionService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;

  private  state: any = ''
  private dialog: any = {
    addSettle: false,
  };

  private queryModel: any = {
    strategyName: '',
    commissionStrategyType: '',
    commonState: ''
  };
  private stayDataList: any[] = [];//数据列表
  private selectionList: any[] = [];//选中数据
  private detailList: any[] = [];//策略详情

  private mounted() {
    this.refreshData();
  }
  private refreshData() {
    // 默认加载列表
    this.OutsourceCommissionService.getCommissionStrategyList(this.queryModel, this.pageService).subscribe(
      data => {
        this.stayDataList = data
      }
    );
  }

  private selectProductList() {
    // 委外产品下拉列表
    this.OutsourceCommissionService.selectProductList().subscribe(
      data => {
      }
    );
  }

  //查看
  private checkRow(row){
    this.dialog.addSettle = true
    const params = {
      commissionStrategyType: row.commissionStrategyType,
      commonState: row.commonState,
      strategyName: row.strategyName
    }
    this.$nextTick(() => {
      this.state = 'check'
      const ref: any = this.$refs['addSettle']
      ref.delCommissionStrategy(params)
    })
  }
  //编辑
  private editRow(row){
    this.dialog.addSettle = true
    const params = {
      commissionStrategyType: row.commissionStrategyType,
      commonState: row.commonState,
      strategyName: row.strategyName
    }
    this.$nextTick(() => {
      this.state = 'edit'
      const ref: any = this.$refs['addSettle']
      ref.delCommissionStrategy(params)
    })
  }
  // 新增
private addRow() {
  this.dialog.addSettle = true
  this.$nextTick(() => {
    this.state = 'add'
    const refs: any = this.$refs['addSettle']
    refs.initModalState()
  })
}
}
</script>

<style lang="less" >

</style>
