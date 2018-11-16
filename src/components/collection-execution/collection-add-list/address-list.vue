<template>
  <!-- 催收执行页-通讯录模块-地址簿 -->
  <section class="component address-list">
    <!-- 数据区域 -->
    <data-box :height="368" :data="dataSet">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <el-button type="text" @click="rowData=scope.row,dialog.apply = true" v-if="!scope.row.applyStatus">外访</el-button>
            <el-button type="text" v-else>撤回</el-button>
            <el-button type="text">信函</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="addressStatus" label="状态" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.addressStatus,'AddressStatus')">
        </el-table-column>
        <el-table-column prop="contName" label="姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="relation" label="关系" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.relation,'Relationship')">
        </el-table-column>
        <el-table-column prop="detail" label="地址" :min-width="$helper.getColumnWidth(8)">
        </el-table-column>
        <el-table-column prop="addressType" label="地址类型" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.addressType,'AddressType')">
        </el-table-column>
        <el-table-column prop="dataSource" label="来源" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.dataSource,'DataSource')">
        </el-table-column>
      </template>
    </data-box>
    <!--申请弹框-->
    <el-dialog :title="`${applyType.name}申请`" width="800px" :visible.sync="dialog.apply" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <apply :caseIds="[caseId]" :fromChannel="caseChannel" :applyType="applyType.value" :otherData="{assistType:'SELF_VISIT', personalAddressId: rowData.id}" @close="dialog.apply = false;refreshData()" ref="apply-circulation"></apply>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service.ts';
import { ApplyType } from "~/config/enum.config";
import Apply from "~/components/visit-case/apply.vue";

@Component({
  components: {
    DataBox,
    Apply
  },
})
export default class AddressList extends Vue {
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

  /**
   * caseChannel
   */
  @Prop({type:String})
  private caseChannel:string

  private applyType = ApplyType.assist
  private searchModel: any = {};
  private dataSet: any[] = [];
  private dialog: any = {
    apply: false,
  };
  private rowData: any = {};
  //获取电催行动历史
  private refreshData() {
    this.searchModel.caseId = this.caseId;
    this.caseOperatorPageService
      .queryPersonalAddress(
        this.searchModel,
        this.pageService,
        this.sortService,
    )
      .subscribe((data) => {
        this.dataSet = data;
      });
  }

  private activated() {
    this.refreshData();
  }
}
</script>

<style lang="less" scoped>
</style>
