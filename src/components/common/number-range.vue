<template>
  <section class="component number-range">
    <el-input v-model.lazy.number="minValue" :min="0" type="number" :placeholder="minPlaceholder"></el-input>
    <span>-</span>
    <el-input v-model.lazy.number="maxValue" :min="0" type="number" :placeholder="maxPlaceholder"></el-input>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop, Emit, Model } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class NumberRange extends Vue {
  @Prop()
  private minPlaceholder;
  @Prop()
  private maxPlaceholder;
  @Prop({
    type: Boolean,
    default: false,
  })
  private isInteger;

  @Model('numberRangeChange')
  private numberRange: { min: number; max: number };

  public validate(rule, value, callback) {
    if (this.numberRange.min > this.numberRange.max) {
      callback(new Error('输入数字范围有误'));
    }
  }

  @Emit('numberRangeChange')
  private updateNumberRange(value) {
    this.numberRange.min = value.min;
    this.numberRange.max = value.max;
  }

  private get minValue() {
    return this.numberRange.min;
  }

  private set minValue(value) {
    value = value ? this.parseInt(value) : '';
    this.updateNumberRange({
      min: value,
      max: this.numberRange.max,
    });
  }
  private get maxValue() {
    return this.numberRange.max;
  }

  private set maxValue(value) {
    value = value ? this.parseInt(value) : '';
    this.updateNumberRange({
      min: this.numberRange.min,
      max: value,
    });
  }

  private parseInt(value) {
    if (this.isInteger) {
      return Math.round(Number.parseFloat(value));
    }
    return value;
  }
}
</script>

<style lang="less" scoped>
</style>
<style lang="less">
.component.number-range {
  .el-input {
    width: 100px !important;
    .el-input--inner {
      width: 80px !important;
    }
  }
}
</style>
