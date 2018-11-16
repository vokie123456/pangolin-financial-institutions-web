<template>
  <section class="component date-select">
    <el-radio-group v-if="!hiddenDateType" v-model="dateType" @change="onDateTypeChange"  size="mini">
      <el-radio-button :label="0">年</el-radio-button>
      <el-radio-button :label="1">月</el-radio-button>
      <el-radio-button :label="2">周</el-radio-button>
    </el-radio-group>
    <el-date-picker  name="test1" v-if="!hiddenDate" @change="onDateChange" v-show="dateType==0" type="year" placeholder="选择年" v-model="dateValue" format="yyyy 年"></el-date-picker>
    <el-date-picker name="test12"  v-if="!hiddenDate" @change="onDateChange" v-show="dateType==1" type="month" placeholder="选择月" v-model="dateValue" format="yyyy 年 MM 月" ></el-date-picker>
    <el-date-picker name="test13" v-if="!hiddenDate" @change="onDateChange" v-show="dateType==2" type="week" placeholder="选择周" v-model="dateValue" format="yyyy 第 WW 周"></el-date-picker>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Layout, Dependencies } from "~/core/decorator";
import { Watch, Prop, Emit, Model } from "vue-property-decorator";

@Layout("workspace")
@Component({
  components: {}
})
export default class DateSelect extends Vue {
  @Prop({ default: "month" })
 private currentDateType;
  @Prop({ default: "" })
 private currentDate;
  @Prop({type:Boolean}) private hiddenDateType;
  @Prop({type:Boolean}) private hiddenDate;
  @Emit("update:currentDateType")
private  updateCurrentDateType(type) {}
  @Emit("update:currentDate")
private  updateCurrentDate(date) {}
  @Emit("onDateTypeChange")
 private emitDateTypeChange(type) {}
  @Emit("onDateChange")
 private emitDateChange(date) {}

 private get dateType() {
    return this.currentDateType;
  }

 private set dateType(val) {
    this.updateCurrentDateType(val);
  }

 private get dateValue() {
    return this.currentDate;
  }

 private set dateValue(val) {
    this.updateCurrentDate(val);
  }

 private onDateTypeChange() {
    if (!this.hiddenDateType) {
      this.emitDateTypeChange(this.dateType);
    }
  }

 private onDateChange(){
    this.emitDateChange(this.dateValue);
  }
}
</script>

<style lang="less">

</style>
