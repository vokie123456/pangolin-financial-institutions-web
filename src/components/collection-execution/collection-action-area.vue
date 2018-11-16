
<template>
  <!-- 催收执行页-行动区模块 -->
  <section class="component collection-action-area">
    <el-tabs :value="initComponent.name" stretch>
      <el-tab-pane :label="initComponent.label" :name="initComponent.name">
      </el-tab-pane>
    </el-tabs>
    <component :is="initComponent.name" :caseId="collectonData.caseId" @success="onFollowSuccess"></component>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { components, tabs } from './collection-action-area/';
import { namespace } from 'vuex-class';
import { CASE_CHANNEL } from "~/config/enum.config";
const CollectionExecutionModule = namespace('collection-execution');
@Component({
  components: {
    ...components
  },
})
export default class CollectionActionArea extends Vue {
  @CollectionExecutionModule.Getter private collectonData;
  @CollectionExecutionModule.Mutation private updateHistoryInfoActive;

  /**
   * 获取要展示的行动面板
   */
  private get initComponent(): any {
    const tab = tabs.find(v => v.channel.includes(this.collectonData.caseChannel)) || {}
    return tab
  }

  /**
   * 成功后更新历史纪录面板
   */
  private onFollowSuccess() {
    this.updateHistoryInfoActive("")
    this.$nextTick(() => {
      this.updateHistoryInfoActive(this.initComponent.historyPanel)
    })
  }
}
</script>

<style lang="less" scoped>
.component.collection-action-area {
  height: 440px;
  background-color: #fff;
}
</style>