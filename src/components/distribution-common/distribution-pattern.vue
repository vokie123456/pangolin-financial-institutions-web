<template>
  <!-- 案件分配，分配模式 -->
  <section class="component distribution-pattern">
    <el-select v-model="parrentType" class="types">
      <el-option v-for="(item,index) of patternCollection" :key="index" :label="item.name" :value="index"></el-option>
    </el-select>
    <el-radio-group v-model="selectedType" class="patterns">
      <el-radio v-for="(parrent,index) of patternCollection[parrentType].patterns" :key="index" :label="parrent.value">{{parrent.name}}</el-radio>
    </el-radio-group>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit, Watch, Model } from 'vue-property-decorator';

const PATTERN_COLLECTION = [
  {
    name: '新增均分',
    patterns: [
      { name: '按金额平均分配', value: 'BY_MONEY' },
      { name: '按数量平均分配', value: 'BY_NUMBER' },
      // { name: "综合分配", value: "BY_INTEGRATE" },
      // { name: "按催收员配比", value: "BY_COLLECTOR_PERCENT" }
    ],
  },
  // {
  //   name: "累计均分",
  //   patterns: [
  //     { name: "按金额", value: "BY_TOTAL_MONEY" },
  //     { name: "按户数", value: "BY_TOTAL_ACCOUNT" }
  //   ]
  // }
];

@Component({
  components: {},
})
export default class DistributionPattern extends Vue {
  @Model('on-select-change')
  private sType;

  private patternCollection = PATTERN_COLLECTION;
  // 分配模式 默认为第一种方式 否则加载不出来任何数据
  private parrentType = 0;

  @Emit('on-select-change')
  private emitOnSelectChange(val) {}

  private get selectedType() {
    return this.sType;
  }
  private set selectedType(val) {
    this.emitOnSelectChange(val);
  }
}
</script>
<style lang="less" scoped>
.component.distribution-pattern {
  padding-left: 10px;
  margin-bottom: 10px;
  .types {
    width: 140px;
  }
  .patterns {
    padding-left: 40px;
    line-height: 0;
  }
}
</style>
