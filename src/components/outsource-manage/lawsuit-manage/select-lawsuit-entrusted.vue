<template>
  <!--选择受托方-->
  <div class="page">
    <data-box :data="selectEntrustedDataList" :selectionList.sync="selectionList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="outsName" label="委外方" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="casesMember" label="案件数量" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="settleMember" label="结清数量" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="successRate" label="历史催收成功率" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="sumAmt" label="结清总金额" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="nextCommit" :disabled="selectionList.length === 0">下一步</el-button>
      <el-button @click="nextCancel">取 消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import { Dependencies } from '~/core/decorator';
import { namespace } from 'vuex-class';
import { OutsourceStayService } from "~/services/domain-service/outsource-stay-manage.service";

const systemManageModule = namespace('system-manage');

@Component({
  components: {
    DataBox,
  },
})
export default class AddUser extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(OutsourceStayService) private OutsourceStayService: OutsourceStayService;
  @Dependencies(OutsourceStayService)
  private outsourceStayService: OutsourceStayService;
  private selectionList: any[] = []; //选中的数据
  private selectEntrustedDataList: any[] = []; //受托方列表数据

  private refresh() {
    // 默认加载列表
    this.OutsourceStayService.searchOutsourcePreview(this.pageService).subscribe(
      data => {
        this.selectEntrustedDataList = data.filter(val => val.outSourceType === 'LAW_OFFICE')
      }
    );
  }

  private mounted() {
    this.refresh();
  }

  /**
   * 下一步确认
   */
  private nextCommit() {
    //   关闭dialog
    this.$emit('goNext', this.selectionList);
  }

  /**
   * 下一步取消
   */
  private nextCancel() {
    //   关闭dialog
    this.$emit('close');
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.data-grid {
  margin-bottom: 10px;
}

.header {
  border: solid 1px #dee1e5;
  border-bottom: 0px;
  height: 40px;
  line-height: 40px;
}
</style>
