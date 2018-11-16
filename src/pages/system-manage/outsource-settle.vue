<template>
  <!--待分配案件管理-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" :buttonWrap="true" @onSearch="refreshData" autoSearch>
      <!--输入区域-->
      <template slot="default-input">
        <el-form-item label="策略名称" prop="strategyName">
          <el-input v-model="queryModel.strategyName"></el-input>
        </el-form-item>
        <el-form-item label="受托方" prop="outsourceId">
          <el-select v-model="queryModel.outsourceId" placeholder="请选择" clearable>
            <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
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
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(2)">
          <template slot-scope="scope">
            <el-button @click="checkRow(scope.row.id)" type="text">查看</el-button>
            <el-button @click="editRow(scope.row.id)" type="text">编辑</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column prop="id" label="编号" :min-width="$helper.getColumnWidth(6)">-->
        <!--</el-table-column>-->
        <el-table-column type="index" label="编号" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="strategyName" label="策略名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="outsourceName" label="受托方" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column label="佣金类型" :formatter="(row) => $filter.dictConvert(row.commissionStrategyType,'CommissionStrategyType')" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column  label="状态" :formatter="(row) => $filter.dictConvert(row.commonState,'CommonState')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="创建人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column  label="创建时间" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dateTimeFormat(row.createTime)">
        </el-table-column>
        <el-table-column prop="updateOperatorRealName" label="编辑人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column label="编辑时间" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dateTimeFormat(row.updateTime)">
        </el-table-column>
      </template>
    </data-box>

    <!--弹框-->
    <el-dialog :title="title"   @close="dialog.addSettle = false" :visible.sync="dialog.addSettle" :close-on-click-modal="false" :show-close="false">
        <add-settle @close="dialog.addSettle=false" @refreshList="refreshData" ref="addSettle" :state="state"></add-settle>
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
import AddSettle from "~/components/system-manage/outsource-settle-manage/add-settle.vue"; // 弹框组件

import { State, Getter } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { SystemParamService } from "~/services/management-service/system-param.service";
import { OutsourceService } from "~/services/management-service/outsource-settle.service";
import { PrincipalService } from "~/services/domain-service/principal.service";
import { OutsourceSettleService } from "~/services/domain-service/outsource-settle-manage.service";

// @Auth(1002)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    AddSettle
  }
})
export default class OutSourceSettle extends Vue {
  @Dependencies(SystemParamService) private sysParamService: SystemParamService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(OutsourceService) private OutsourceService: OutsourceService;
  @Dependencies(PrincipalService) private PrincipalService: PrincipalService;
  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService; 
  @State
  private principalList: any;
  private title: any = '新建委外结算策略'
  private state: any = false

  private dialog: any = {
    addSettle: false,
  };
  private jgData: any[] = [
    { value: "1", label: "委外方A" },
    { value: "2", label: "委外方B" }
  ];
  private queryModel: any = {
    'strategyName': '',
    'outsourceId': '',
    'commonState': '',

  };
  private stayDataList: any[] = [];//数据列表
  private selectionList: any[] = [];//选中数据
  private clientList: any[] = [];//选中数据
  private outsNames: any[] = [];//受托方列表

  private mounted() {
    this.refreshData();
    // this.getPrincipalList()
    this.getOutName();

  }

  private getCommissionStrategyType() {}

  private refreshData() {
    const params = {}
    //默认加载列表
    this.OutsourceService.getSettlementStrategyPageList(this.queryModel, this.pageService).subscribe(
      data => {
        this.stayDataList = data;
      }
    );
  }
  // private getPrincipalList() {
  //   const params = {}
  //   this.PrincipalService.getPrincipalList(params).subscribe(
  //     data => {
  //       this.clientList = data.content
  //     }
  //   );
  // }
  /**
   * 受托方列表 
   */
  private getOutName(){
      this.outsourceSettleService.getOutSourceList()
        .subscribe( data => {
            this.outsNames = data;
          }
      ) 
  }
  //查看
  private checkRow(id){
    this.title = '委外结算策略详情'
    this.state = 'check'
    this.dialog.addSettle = true
    this.$nextTick(() => {
      const ref: any = this.$refs['addSettle']
      ref.getSettlementStrategyById(id)
    })
  }

  //编辑
  private editRow(id){
    this.title = '编辑委外结算策略'
    this.state = 'edit'
    this.dialog.addSettle = true
    this.$nextTick(() => {
      const ref: any = this.$refs['addSettle']
      ref.getSettlementStrategyById(id)
    })
  }
  // 新增
  private addRow() {
    this.title = '新增委外结算策略'
    this.state = 'add'
    this.dialog.addSettle = true
  }

}
</script>

<style lang="less" >

</style>
