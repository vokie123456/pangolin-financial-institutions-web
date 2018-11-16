
<template>
  <!-- 催收执行页-案件信息模块 -->
  <section class="component collection-case-info">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane v-for="item of tabs" :key="item.name" :label="item.label" :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <div :class="showCaseInfoClass">
      <keep-alive>
        <component :is="activeName" :caseChannel="collectonData.caseChannel" :caseId="collectonData.caseId"></component>
      </keep-alive>
    </div>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { components, tabs } from './collection-case-info/';
import { namespace } from 'vuex-class';

const CollectionExecutionModule = namespace('collection-execution');

@Component({
  components: {
    ...components
  },
})
export default class CollectionCaseInfo extends Vue {
  @CollectionExecutionModule.Getter private collectonData;
  @CollectionExecutionModule.State private caseInfoActiveName;
  @CollectionExecutionModule.Mutation private updateCaseInfoActiveName;

  private tabs: any[] = tabs

  private get activeName() {
    return this.caseInfoActiveName
  }

  private set activeName(val) {
    this.updateCaseInfoActiveName(val)
  }

  private get showCaseInfoClass() {
    return { 'case-info': !this.collectonData.isImport && !this.collectonData.isUndistributed }
  }

}
</script>

<style lang="less">
.component.collection-case-info {
  .case-info {
    height: 400px;
    overflow-y: auto;
  }
}
</style>