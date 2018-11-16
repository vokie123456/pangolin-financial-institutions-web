<template>
  <!--委外结算单-->
  <section class="page company-manage">
    <data-form :model="queryModel" @onSearch="refreshData" :page="pageService">
      <template slot="default-input">
        <el-form-item label="受托方" prop="outsName">
          <el-select v-model="queryModel.outsName" placeholder="请选择" clearable>
            <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次号" prop="outBatch">
            <el-input v-model="queryModel.outBatch"></el-input>
        </el-form-item>
        <el-form-item label="委外时间起止" prop="date" >
             <el-date-picker
                v-model="queryModel.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="clickExport">导出对账单</el-button>
      </template>
    </data-form>
    <data-box @onPageChange="refreshData" :selectionList.sync="selectionList" :data="dataList" :page="pageService">
      <template slot="columns">
        <el-table-column prop="outsourceName" label="受托方" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="delegateDate" label="委外开始时间" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{scope.row.delegateDate | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="委外到期时间" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{scope.row.endDate | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commissionAmount" label="佣金金额" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <el-button @click="checkDetail(scope)" type="text">查看明细</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog title="查看明细" :center="true"  width="1500px"  :visible.sync="dialog.modifyManage">
      <modify-manage ref="modify-manage" @close="dialog.modifyManage = false" @refreshList="refreshData" :caseRow.sync="caseRow"></modify-manage>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import { State, Getter } from "vuex-class";
import { OutsourceSettlevOucherService } from "~/services/domain-service/outsource-settle-manage-index.service";
import { OutsourceSettleService } from "~/services/domain-service/outsource-settle-manage.service";

import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import modifyManage from '~/components/outsource-manage/outsource-settle-manage/modify-manage.vue'


// @Auth(1008)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    modifyManage
  }
})
export default class OutsourceSettleManageIndex extends Vue {
  @Dependencies(OutsourceSettlevOucherService)
  private outsourceSettlevOucherService: OutsourceSettlevOucherService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(SortService) private sortService: SortService;
  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService;

  private dialog: any = {
    modifyManage: false
  };
  private selectionList: any[] = [];
  // form 查询表单参数
   private queryModel: any = {
    outsName:'',
    outBatch:'',
    date:[], //委外时间起止
  }
  private outsNames: any[] = [];//受托方列表

  private dataList: any[] = [];
  private caseRow:any = {}; //查看或编辑某一条row
  private mounted() {
    this.refreshData();
    this.getOutName();
  }
  /**
   * 查询列表
   */
  private refreshData() {
    this.outsourceSettlevOucherService.
    getCaseSettlementSheetPageList(this.queryModel,this.pageService,this.sortService)
    .subscribe( data => {
        this.dataList = data;
      }
    )
  }

  /**
   * 导出委外对账单
   */
  private clickExport(){
    //需要导出的列表 ids
    const ids = this.selectionList.map((v) => v.id);
    if (ids.length === 0) {
      this.$message.info('请选择要导出的结算单')
      return
    }
    this.outsourceSettlevOucherService.
    exportSettlementSheet({ids})
    .subscribe( data => {
          this.$message.success("导出成功!");
          window.open(data.url);
      }
    )
  }

  private checkDetail(scope){
    this.dialog.modifyManage = true;
    this.caseRow = scope.row;
  }


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
}
</script>

<style lang="less">

</style>




