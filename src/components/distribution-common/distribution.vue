<template>
  <!-- 个人分配 -->
  <section class="component distribution">
    <distribution-pattern v-model="distributionMode"> </distribution-pattern>
    <data-box :data="dataSet" ref="data-box">
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
            <el-input :disabled="!isCustomerDistribution" type="number" :maxlength="2" v-model="scope.row.num" :min="0" :max="inputMax"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sumCapital" label="案件本金" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => this.isCustomerDistribution? '-':row.sumCapital">
        </el-table-column>
        <el-table-column prop="sumAmt" label="案件总金额" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => this.isCustomerDistribution? '-':row.sumAmt">
        </el-table-column>
        <el-table-column prop="sumNum" label="案件总数量" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => this.isCustomerDistribution? '-':row.sumNum">
        </el-table-column>
      </template>
    </data-box>
    <div style="text-align:center;margin-top:30px;">
      <el-button @click="emitBack">上一步</el-button>
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="submit">确定</el-button>
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
import DistributionPattern from '~/components/distribution-common/distribution-pattern.vue';
import { namespace } from "vuex-class";
import { CASE_CHANNEL } from "~/config/enum.config";
import { VisitCaseManageService } from '~/services/domain-service/visit-case-manage.service.ts';
import { TelCaseManageService } from '~/services/domain-service/tel-case-manage.service';

const AllotModule = namespace("case-allot")

@Component({
  components: {
    DataBox,
    DistributionPattern,
  },
})
export default class Distribution extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(VisitCaseManageService)
  private visitCaseManageService: VisitCaseManageService;
  @Dependencies(TelCaseManageService)
  private telCaseManageService: TelCaseManageService;
  // 模式
  @AllotModule.State private mode;
  @AllotModule.Mutation private updateMode;
  @AllotModule.Getter private perviewModel;
  @AllotModule.Getter private distributeModel;

  /**
   * 数据业务来源
   */
  @Prop({ type: String, required: true })
  private fromChannel

  /**
   * table数据源
   */
  private dataSet: any[] = [];

  /**
   * 获取预览数据
   */
  public refreshData() {
    if (this.fromChannel === CASE_CHANNEL.tel) {
      this.telCaseManageService.reviewDistributeCase(this.perviewModel).subscribe(
        this.updatePreViewData
      );
    }
    if (this.fromChannel === CASE_CHANNEL.visit) {
      this.visitCaseManageService.reviewDistributeCase(this.perviewModel).subscribe(
        this.updatePreViewData
      );
    }
  }

  @Emit("success")
  private emitSuccess() {
    this.dataSet = []
    this.updateMode("BY_CUSTOMIZE")
  }

  @Emit("back")
  private emitBack() {
    this.updateMode("BY_CUSTOMIZE")
  }

  @Emit("close")
  private emitClose() {
    this.updateMode("BY_CUSTOMIZE")
  }

  /**
   * 是否自定义分配
   */
  private get isCustomerDistribution() {
    return this.distributionMode === 'BY_CUSTOMIZE';
  }

  private get distributionMode() {
    return this.mode
  }

  private set distributionMode(val) {
    this.updateMode(val)
    this.refreshData()
  }

  /**
   * 输入框最大值
   */
  private get inputMax() {
    return this.perviewModel.caseIds.length;
  }



  /**
   * 更新预览数据
   */
  private updatePreViewData(data: any) {
    this.dataSet = data.resDistModel;
    this.distributeModel.analyseId = data.analyseId;
  }

  /**
   * 确定分配
   */
  private submit() {
    this.distributeModel.distributeNumber = this.dataSet.map(v => v.num)
    if (this.fromChannel === CASE_CHANNEL.tel) {
      this.telCaseManageService.confirmDistributeCase(this.distributeModel).subscribe(
        this.emitSuccess
      );
    }
    if (this.fromChannel === CASE_CHANNEL.visit) {
      this.visitCaseManageService.confirmDistributeCase(this.distributeModel).subscribe(
        this.emitSuccess
      );
    }
  }
}
</script>
<style lang="less" scoped>
</style>
