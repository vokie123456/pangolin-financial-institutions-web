
<template>
  <!-- 催收执行页-通讯录模块 -->
  <section class="component collection-add-list">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane v-for="item of tabs" :key="item.name" :label="item.label" :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component :is="activeName" :caseChannel="collectonData.caseChannel" :caseId="collectonData.caseId" :ref="activeName"></component>
    </keep-alive>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { components, tabs } from './collection-add-list/';
import { namespace } from 'vuex-class';
const CollectionExecutionModule = namespace('collection-execution');

@Component({
  components: {
    ...components
  },
})
export default class CollectionAddList extends Vue {

  @CollectionExecutionModule.Getter private collectonData;

  private tabs: any[] = tabs

  // 默认激活页面
  private activeName: string = 'telephone-book';
}
</script>

<style lang="less" scoped>
</style>