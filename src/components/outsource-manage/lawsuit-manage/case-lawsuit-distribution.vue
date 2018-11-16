<template>
  <!--案件分配-->
  <div class="page">
    <div class="head">
      <el-radio-group v-model="modal">
        <!--<el-radio :label="item.code" v-for="(item, index) in $dict.getDictData('DistributeMode')" :key="index">{{item.name}}</el-radio>-->
        <el-radio label="BY_MONEY">按金额平均分配</el-radio>
        <el-radio label="BY_NUMBER">按数量平均分配</el-radio>
      </el-radio-group>
    </div>
    <div class="tip">
      <!-- <span>当前已选择{{selectionListCopy.length}}个案件</span> -->
      <el-checkbox :checked="true">共债案件优先分配给同意催债员</el-checkbox>
    </div>
    <data-box :data="caseDistributionDataListCopy.resDistModel" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="outsourceName" label="受托方" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="currentNum" label="当前案件数" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="currentAmt" label="当前案件总金额" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column label="确认分配案件数/金额" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <div class="input-control">
              <el-input v-model="scope.row.num"></el-input>
              /
              <el-input v-model="scope.row.amt"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="caseCapital" label="案件本金总额" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="amt" label="案件总金额" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="num" label="案件总数量" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="prevCommit">上一步</el-button>
      <el-button @click="nextCancel">取 消</el-button>
      <el-button @click="nextCommit">确定</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { PageService } from '~/utils/page.service';
import { Dependencies } from '~/core/decorator';
import { State, Mutation, Getter, namespace } from 'vuex-class';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { OutsourceStayService } from "~/services/domain-service/outsource-stay-manage.service";
import clone from 'clone';
const systemManageModule = namespace('system-manage');

@Component({
  components: {
    DataBox,
  },
})
export default class AddUser extends Vue {
  @Dependencies(OutsourceStayService) private OutsourceStayService: OutsourceStayService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Prop() private caseDistributionDataList: any; //列表数据
  @Prop() private selectionList: any; //列表数据

  get selectionListCopy() {
    return this.selectionList
  }
  private date: any = ''

  get caseDistributionDataListCopy () {
    return this.caseDistributionDataList
  }

  private modal = 'BY_MONEY'
  @Watch('modal')
  private modalChange() {
    this.$emit('modalChange', this.modal);
  }

  /**
   * 上一步确认
   */
  private prevCommit() {
    //   关闭dialog
    this.$emit('goPreviou');
  }
  /**
   * 下一步确认
   */
  private nextCommit() {
    this.$emit('nextCommit');
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
  .head{padding: 20px 5px;background-color: #f5f5f5;border: 1px solid #ebeef5;border-radius: 3px;}
  .tip{
    padding: 10px 5px 5px;
    &>span:nth-child(1){
      margin-right: 15px;
    }
  }
  .time-select{
    margin-bottom: 15px;
  }
  .input-control{
    .el-input{
      width: 40%;
    }
  }
</style>
