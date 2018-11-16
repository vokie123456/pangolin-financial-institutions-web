<template>
  <section class="component case-marker">
    <el-radio-group v-model="caseMark">
      <el-radio @change="caseInfoMarkColor" v-for="item of caseMarkerList" :key="item.value" :label="item.value" :class="{'case-marker-border':item.color}" :style="`border-color:${item.color}`">{{item.name}}</el-radio>
    </el-radio-group>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Model, Emit, Prop } from 'vue-property-decorator';
import { CaseMarkColor } from '~/config/enum.config.ts';
@Component({
  components: {},
})
export default class CaseMarker extends Vue {
  private caseMarkerList = CaseMarkColor;
  // 选择列表
  @Prop({ required: true })
  private selectionList: any;

  @Model('change-color')
  private caseColor;
  @Emit('change-color')
  private emitColor(val) { }
  /**
   * 案件标色
   */
  private caseInfoMarkColor() {
    if (!this.selectionList.length) {
      this.$message('请选择要标记的案件');
      return;
    }
  }
  private get caseMark() {
    return this.caseColor;
  }
  private set caseMark(val) {
    this.emitColor(val);
  }
}
</script>

<style lang="less" scoped>
.case-marker.component {
  .el-radio {
    margin: 0px 10px;
  }
  .case-marker-border {
    border-bottom: solid 4px;
  }
}
</style>
