<template>
  <!-- 催收执行页-案件信息模块-修复信息 -->
  <section class="component fix-info">
    <data-box :height="390" :data="dataSet">
      <template slot="columns">
        <el-table-column prop="xiufuren" label="修复人" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="shijian" label="修复时间" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="shuoming" label="修复说明" :min-width="$helper.getColumnWidth(8)">
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <el-button type="text">查看附件</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';

@Component({
  components: {
    DataBox,
  },
})
export default class FixInfo extends Vue {
  private dataSet: any[] = [
    {
      xiufuren: '张三',
      shijian: '2018-9-19 18:08:27',
      shuoming: '修复说明说明,修复说明说明',
    },
  ];
}
</script>

<style lang="less" scoped>
</style>
