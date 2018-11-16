<template>
    <!--委外催收案件管理-->
    <el-tabs class="marginLeft" v-model="activeName">
        <el-tab-pane label="委外批次业绩" name="1">
            <section class="page system-parameter-manage">
                <data-form :model="queryModelOne" :buttonWrap="true" @onSearch="refreshData" @handleResetForm="follFeedback" autoSearch>
                    <!--输入区域-->
                    <template slot="default-input">
                        <el-form-item label="批次" prop="pc">
                            <el-select v-model="queryModelOne.batchNumber" placeholder="所有" clearable>
                                <el-option v-for="item in batchList" :key="item.batchNumber" :value="item.batchNumber" :label="item.batchNumber"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </data-form>

                <data-box @onPageChange="refreshData" :data="performanceDataListOne" :page="pageService" :hiddenIndex="true" >
                    <template slot="columns">
                        <!--数据列区域-->
                        <el-table-column prop="batchNumber" label="批次" :min-width="$helper.getColumnWidth(5)">
                        </el-table-column>
                        <el-table-column prop="outsourceName" label="受托方" :min-width="$helper.getColumnWidth(3)">
                        </el-table-column>
                        <el-table-column prop="returnRate" label="回收率" :min-width="$helper.getColumnWidth(3)">
                        </el-table-column>
                        <el-table-column prop="rank" label="排名" :min-width="$helper.getColumnWidth(2)">
                        </el-table-column>
                    </template>
                </data-box>
            </section>
        </el-tab-pane>
        <el-tab-pane label="委外产品业绩" name="2">
            <section class="page system-parameter-manage">
                <data-form :model="queryModelTwo" :buttonWrap="true" @onSearch="refreshData" @handleResetForm="follFeedback" autoSearch>
                    <!--输入区域-->
                    <template slot="default-input">
                        <el-form-item label="产品类型" prop="pc">
                            <el-select v-model="queryModelTwo.productName" placeholder="所有" clearable>
                                <el-option v-for="item in productType" :key="item.productName" :value="item.productName" :label="item.productName"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </data-form>

                <data-box @onPageChange="refreshData" :data="performanceDataListTwo" :page="pageService" :hiddenIndex="true" >
                    <template slot="columns">
                        <!--数据列区域-->
                        <el-table-column prop="productName" label="产品类型" :min-width="$helper.getColumnWidth(5)">
                        </el-table-column>
                        <el-table-column prop='outsourceName' label="受托方" :min-width="$helper.getColumnWidth(3)">
                        </el-table-column>
                        <el-table-column prop="returnRate" label="回收率" :min-width="$helper.getColumnWidth(3)">
                        </el-table-column>
                        <el-table-column prop="rank" label="排名" :min-width="$helper.getColumnWidth(2)">
                        </el-table-column>
                    </template>
                </data-box>
            </section>
        </el-tab-pane>
        <el-tab-pane label="委外金额业绩" name="3">
            <section class="page system-parameter-manage">
                <data-form :model="queryModelThree" :buttonWrap="true" @onSearch="refreshData" @handleResetForm="follFeedback" autoSearch>
                    <!--输入区域-->
                    <template slot="default-input">
                        <el-form-item label="受托方" prop="pc">
                            <el-select v-model="queryModelThree.outsourceName" placeholder="请选择" clearable>
                              <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </data-form>
                <data-box @onPageChange="refreshData" :data="performanceDataListThree" :page="pageService" :hiddenIndex="true">
                    <template slot="columns">
                        <!--数据列区域-->
                        <el-table-column prop="outsourceName" label="受托方" :min-width="$helper.getColumnWidth(5)">
                        </el-table-column>
                        <el-table-column prop="outTotalAmount" label="委外金额(万)" :min-width="$helper.getColumnWidth(3)">
                        </el-table-column>
                        <el-table-column prop="returnRate" label="回收率" :min-width="$helper.getColumnWidth(3)">
                        </el-table-column>
                        <el-table-column prop="rank" label="排名" :min-width="$helper.getColumnWidth(2)">
                        </el-table-column>
                    </template>
                </data-box>
            </section>
        </el-tab-pane>
        <!--<el-tab-pane label="投诉及质检查询" name="4">-->
            <!--<section class="page system-parameter-manage">-->
                <!--<data-form :model="queryModelFour" :buttonWrap="true" @onSearch="refreshData" autoSearch>-->
                    <!--&lt;!&ndash;输入区域&ndash;&gt;-->
                    <!--<template slot="default-input">-->
                        <!--<el-form-item label="日期" prop="pc">-->
                            <!--<el-date-picker v-model="queryModelFour.date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">-->
                            <!--</el-date-picker>-->
                        <!--</el-form-item>-->
                    <!--</template>-->
                <!--</data-form>-->

                <!--<data-box @onPageChange="refreshData" :data="performanceDataListFour" :page="pageService" :hiddenIndex="true">-->
                    <!--<template slot="columns">-->
                        <!--&lt;!&ndash;数据列区域&ndash;&gt;-->
                        <!--<el-table-column prop="pc" label="批次" :min-width="$helper.getColumnWidth(5)">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column label="受托方" :min-width="$helper.getColumnWidth(3)">-->
                            <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.stf === '1'">受托方A</span>-->
                                <!--<span v-else>受托方B</span>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="hsl" label="回收率" :min-width="$helper.getColumnWidth(3)">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="pm" label="排名" :min-width="$helper.getColumnWidth(2)">-->
                        <!--</el-table-column>-->
                    <!--</template>-->
                <!--</data-box>-->
            <!--</section>-->
        <!--</el-tab-pane>-->
    </el-tabs>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import NumberRange from '~/components/common/number-range.vue';
import leaveCase from '~/components/outsource-manage/collection-manage/leave-case.vue'; // 留案
import { State, Getter } from 'vuex-class';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';

import { OutsourcePerformanceService } from '~/services/domain-service/outsource-performance-manage.service';
import { OutsourceSettleService } from "~/services/domain-service/outsource-settle-manage.service";
import { FilterService } from "~/utils/filter.service";

// @Auth(1003)
@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    leaveCase,
  },
})
export default class OutsourcePerformanceManageIndex extends Vue {
  @Dependencies(OutsourcePerformanceService)
  private outsourcePerformanceService: OutsourcePerformanceService;
  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;

  private activeName: string = '1';
  private dialog: any = {
    leaveCase: false,
  };

  private tabPosition: string = 'top';
  private queryModelOne: any = {
      batchNumber :'',
  };
  private queryModelTwo: any = {
      productName:'',
  };
  private queryModelThree: any = {
      outsourceName:''
  };
  private queryModelFour: any = {};
  private batchList: any = [];//批次号
  private outsNames: any = [];//受托方
  private productType: any = [];//产品
  private performanceDataListOne: any[] = []; //数据列表
  private performanceDataListTwo: any[] = []; //数据列表
  private performanceDataListThree: any[] = []; //数据列表
  private performanceDataListFour: any[] = []; //数据列表
  private selectionList: any[] = []; //选中数据

  private mounted() {
    this.refreshData();
  }
  private refreshData() {
    //默认加载列表
    this.loadDataOne();
    this.loadDataTwo();
    this.loadDataThree();
    this.loadDataFour();
    this.loadDataOutBatchList();
    this.getOutNames();//获取受托方下拉列表
    this.getProductType();
  }
  //委外批次业绩
  private loadDataOne(){
      this.outsourcePerformanceService.queryCaseOutBathList(this.queryModelOne,this.pageService,this.sortService).subscribe(data =>{
        this.performanceDataListOne = data;
        })
  }
  //委外产品业绩
  private loadDataTwo(){
    this.outsourcePerformanceService.queryCaseOutProductList(this.queryModelTwo,this.pageService,this.sortService).subscribe(data =>{
        this.performanceDataListTwo = data;
        })
  }
  //委外金额业绩
  private loadDataThree(){
   this.outsourcePerformanceService.queryCaseOutMoneyList(this.queryModelThree,this.pageService,this.sortService).subscribe(data =>{
        this.performanceDataListThree = data;
        })
  }
  //投诉及质检查询
  private loadDataFour(){

  }
  //批次号列表
  private loadDataOutBatchList(){
    this.outsourcePerformanceService.queryOutBatchList({dataType:'batchNumber'}).subscribe(data =>{
        this.batchList = data;
        })
  }

  private getOutNames(){
      this.outsourceSettleService.
        getOutSourceList()
          .subscribe( data => {
              this.outsNames = data;
            }
      )
  }
  private getProductType(){
       this.outsourcePerformanceService.queryOutBatchList({dataType:'productName'}).subscribe(data =>{
        this.productType = data;
        })
  }


  private createLeaveCaseClick() {
    this.dialog.leaveCase = true;
  }

  /**
   * 重置numberRange
   */
  private follFeedback() {
    this.queryModelOne.batchNumber = "";
    this.queryModelTwo.productName = "";
    this.queryModelThree.outsourceName = "";
  }
}
</script>

<style lang="less" >
  .marginLeft{
    margin-left: 15px;
  }
</style>
