
<template>
  <!-- 催收执行页-历史信息模块 -->
  <section class="component collection-history-info">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane v-for="item of tabs" :key="item.name" :label="item.label" :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component :is="activeName" :ref="activeName" :caseId="collectonData.caseId"></component>
    </keep-alive>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { components, tabs } from "./collection-history-info/"
import { namespace } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

@Component({
  components: {
    ...components
  }
})
export default class CollectionHistoryInfo extends Vue {

  @CollectionExecutionModule.Getter private collectonData;
  @CollectionExecutionModule.State private historyInfoActiveName;
  @CollectionExecutionModule.Mutation private updateHistoryInfoActive;

  /**
   * 历史数据查询tabs
   */
  private tabs: any[] = tabs

  private get activeName(){
    return this.historyInfoActiveName
  }

  private set activeName(val){
    this.updateHistoryInfoActive(val)
  }

}
</script>

<style lang="less" scoped>
</style>