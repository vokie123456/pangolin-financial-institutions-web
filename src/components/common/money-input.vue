<template>
  <section class="component money-input" @keyup="onInput">
    <el-input readonly v-model="inputValue"></el-input>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";

@Component({
  components: {}
})
export default class MoneyInput extends Vue {
  @Prop({ default: "" })
  private value;
  private valueList: any[] = [];

  private get inputValue() {
    return this.valueList.join("");
  }

  private onInput({ key, keyCode }) {
    if (keyCode >= 48 && keyCode <= 57) {
      this.inputHandle(key);
      return;
    }

    if (!this.valueList.includes(".") && (keyCode === 190 || keyCode === 110)) {
      this.inputHandle(key);
      return;
    }

    if (keyCode === 8) {
      this.deleteHandle();
    }
  }

  private inputHandle(key) {
    this.valueList.push(key);
  }

  private deleteHandle() { }
}
</script>

<style lang="less" scoped>
</style>
<style lang="less">
.component.number-range {
  .el-input {
    width: 70px !important;
    .el-input--inner {
      width: 50px !important;
    }
    // input::-webkit-outer-spin-button,
    // input::-webkit-inner-spin-button {
    //   -webkit-appearance: none !important;
    //   margin: 0;
    // }
  }
}
</style>
