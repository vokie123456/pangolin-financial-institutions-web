<template>
  <!--执行页 快捷键 -->
  <section class="component collection-hotkey">
    <!-- 按钮区域 -->
    <el-row>
      <el-button v-if="isView" type="text" size="mini" class="list-button" @click="leaveClick">留案申请</el-button>
    </el-row>
    <el-row>
      <el-button v-if="isView" type="text" size="mini" class="list-button" @click="assistClick">协催申请</el-button>
    </el-row>
    <el-row>
      <el-button type="text" size="mini" class="list-button" @click="derateClick">减免申请</el-button>
    </el-row>
    <el-row>
      <el-button v-if="isView" type="text" size="mini" class="list-button" @click="stopClick">停催申请</el-button>
    </el-row>
    <el-row>
      <el-button v-if="isView" type="text" size="mini" class="list-button" @click="advanceClick">提前流转</el-button>
    </el-row>
    <el-row>
      <el-button type="text" size="mini" class="list-button" @click="artificialClick">人工划扣</el-button>
    </el-row>
    <!-- 弹出窗口 -->
    <el-dialog :title="`${applyType.name}申请`" width="800px" :visible.sync="dialog.apply" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <apply :caseIds="[collectonData.caseId]" :fromChannel="collectonData.caseChannel" :otherData="otherModel" :applyType="applyType.value" @close="dialog.apply = false" ref="apply-circulation"></apply>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout, Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import Apply from "~/components/visit-case/apply.vue";
import { ApplyType, CASE_HALT_CATEGORY, CASE_CHANNEL } from "~/config/enum.config";

const CollectionExecutionModule = namespace('collection-execution');

@Component({
  components: {
    Apply
  },
})
export default class CollectionHotkey extends Vue {
  @CollectionExecutionModule.Getter private collectonData;

  private dialog: any = {
    apply: false,
  };

  private applyType: any = {};

  private otherModel = {
    caseHaltCategory: CASE_HALT_CATEGORY.CASE_HALT,
  }
  public created() { }

  public mounted() { }

  private advanceClick() {
    this.applyType = ApplyType.turn;
    this.dialog.apply = true;
  }

  private stopClick() {
    this.applyType = ApplyType.pause;
    this.dialog.apply = true;
  }

  private leaveClick() {
    this.applyType = ApplyType.leave;
    this.dialog.apply = true;
  }

  private artificialClick() {
    this.applyType = ApplyType.repay;
    this.dialog.apply = true;
  }

  private assistClick() {
    this.applyType = ApplyType.assist
    this.dialog.apply = true;
  }

  private derateClick() {
    this.applyType = ApplyType.derate
    this.dialog.apply = true;
  }

  private get isView() {
    return this.collectonData.caseChannel !== CASE_CHANNEL.assist;
  }
}
</script>

<style lang="less" scoped>
.component.collection-hotkey {
  border: 1px solid #dee1e5;
  .list-button {
    border-color: #1a7cd6;
    background: #ffffff;
    color: #1a7cd6;
    margin: 5px;
    width: 105px;
  }
}
</style>