<template>
  <!-- 电催待分配-个人分案-确认分案-组件 -->
  <section class="component tel-confirm-distribution">
    <el-row>
      <el-col :span="2" style="margin-left:20px;">
        <span>新增均分:</span>
      </el-col>
      <el-col :span="20">
        <el-radio-group v-model="model.distributeMode">
          <el-radio label="BY_MONEY">按金额平均分配</el-radio>
          <el-radio label="BY_NUMBER">按数量平均分配</el-radio>
          <!--<el-radio label="BY_INTEGRATE">综合分配</el-radio>
          <el-radio label="BY_COLLECTOR_PERCENT">按催收员配比</el-radio>-->
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- <el-row style="margin-top:10px;">
      <el-col :span="2" style="margin-left:20px;">
        <span>累计均分:</span>
      </el-col>
      <el-col :span="20">
        <el-radio-group v-model="model.distributeMode">
          <el-radio label="5">按金额</el-radio>
          <el-radio label="6">按户数</el-radio>
        </el-radio-group>
      </el-col>
    </el-row> -->
    <data-box :data="userDataSet" ref="data-box">
      <template slot="columns">
        <el-table-column prop="userName" label="用户名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="realName" label="催收员" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="currentNum" label="当前案件数" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="currentAmt" label="当前案件总金额" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column label="确认分配案件数" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-input :disabled="model.distributeMode!=='BY_CUSTOMIZE'" type="number" :maxlength="2" v-model="scope.row.num" :min="0" :max="inputMax()"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sumCapital" label="案件本金" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span>{{sumHidden ? '-' : scope.row.sumCapital}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sumAmt" label="案件总金额" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{sumHidden ? '-' : scope.row.sumAmt}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sumNum" label="案件总数量" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{sumHidden ? '-' : scope.row.sumNum}}</span>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <div style="text-align:center;margin-top:30px;">
      <el-button @click="back">上一步</el-button>
      <el-button @click="cancle">取消</el-button>
      <el-button @click="next">确定</el-button>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { Prop, Emit, Watch } from 'vue-property-decorator';
import { TelCaseManageService } from '~/services/domain-service/tel-case-manage.service';

@Component({
  components: {
    DataBox,
  },
})
export default class TelConfirmDistribution extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(TelCaseManageService)
  private telCaseManageService: TelCaseManageService;
  private model: any = {
    distributeCategory: 'TO_COLLECTOR',
    commonFlag: 'YES',
    distributeMode: 'BY_CUSTOMIZE',
    distributeNumber: [],
  };
  private radio: any = '';
  private userDataSet: any[] = [];
  @Prop({ required: true })
  private distributionData: any;
  @Prop({ required: false, type: Boolean })
  private again: boolean;
  @Emit('refreshList')
  private refreshList() { }

  @Watch('model.distributeMode')
  private distributeModeChange(value) {
    this.telCaseManageService.reviewDistributeCase(this.model).subscribe(
      (data) => {
        this.userDataSet = data.resDistModel;
        this.model.analyseId = data.analyseId;
      }
    );
  }

  @Watch('distributionData', { immediate: true })
  private distributionDataChange(value) {
    if (!value) return;
    this.userDataSet = value.selectedUser;
    this.model.userIds = value.selectedUser.map((v) => v.id);
    this.model.caseIds = value.selectedCase.map((v) => v.id);
    this.telCaseManageService.reviewDistributeCase(this.model).subscribe(
      (data) => {
        this.userDataSet = data.resDistModel;
      }
    );
  }

  private get sumHidden() {
    if (this.model.distributeMode === 'BY_CUSTOMIZE' || this.again) return true;
    return false;
  }

  private refresh(distributionData, collectionType) {
    this.userDataSet = distributionData.userData;
    this.model.caseIds = distributionData.caseIds;
    this.model.collectionType = collectionType;
  }
  //取消
  @Emit('close')
  private cancle() {
    //close
  }
  //上一步
  @Emit('back')
  private back() { }
  //重置分配方式
  private reset() {
    this.model.distributeMode = 'BY_CUSTOMIZE';
  }

  //下一步
  private next() {
    this.model.outsourceIds = this.userDataSet.map((v) => v.id)
    this.model.distributeNumber = this.userDataSet.map((v) => parseInt(v.num));
    this.telCaseManageService.confirmDistributeCase(this.model).subscribe(
      (data) => {
        this.$message.success('分配成功');
        this.cancle();
        this.refreshList();
      }
    );
  }


  /**
   * 输入框最大值
   */
  private inputMax() {
    const max = this.model.caseIds.length;
    return max;
  }

}
</script>
<style lang="less" scoped>
</style>
