<template>
  <!-- 外访案件管理-外访监控-页面 -->
  <section class="page visit-monitor">
    <data-form :rules="rules" :model="model" :page="pageService">
      <template slot="default-input">
        <el-form-item label="机构" prop="">
          <el-input v-model="model.caseNumber"></el-input>
        </el-form-item>
        <el-form-item label="催收员" prop="">
          <el-input v-model="model.personalName"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="">
          <el-date-picker v-model="model.Time" type="datetimerange" placeholder="选择时间" :editable="false" range-separator="~">
          </el-date-picker>
        </el-form-item>
      </template>
    </data-form>
    <div class="db-map">
      <!-- <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker v-for="(marker, i) in markers" :key="'a'+i" :content="marker.content" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        <el-amap-info-window v-for="(window,i) in windows" :key="'b'+i" :position="window.position" :content="window.content" :visible="window.visible" :events="window.events"></el-amap-info-window>
      </el-amap> -->
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import NumberRange from '~/components/common/number-range.vue';
import Map from "~/components/common/map.vue";

@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    NumberRange,
    Map
  },
})
export default class VisitMonitor extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  private model: any = {};
  private rules: any = {};
  private dataSet: any[] = [];
  private selectionList: any[] = [];

}
</script>

<style lang="less" scoped>
.db-map {
  margin: 0px;
  width: 100%;
  height: 600px;
}

.amap-demo {
  height: 700px;
  width: auto;
}

.prompt {
  background: white;
  width: 100px;
  height: 30px;
  text-align: center;
}
</style>
