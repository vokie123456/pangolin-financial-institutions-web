<template>
  <!-- 催收执行页-通讯录模块-第三方通话记录 -->
  <section class="component third-call-record">
    <!-- 按钮区域 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="14" style="padding-left:10px;">
        <el-button type="primary" plain>短信</el-button>
        <el-button type="primary" plain>停催电话</el-button>
        <el-button type="primary" plain>移入电话簿</el-button>
        <el-button type="primary" plain>电话流水</el-button>
      </el-col>
      <el-col :span="10" style="min-width:360px;">
        <div style="float:right;padding-left:10px;padding-right:10px;">
          <el-button>拨号</el-button>
          <el-button>总结</el-button>
        </div>
        <el-input placeholder="请输入电话号码" style="width:120px;float:right;"></el-input>
      </el-col>
    </el-row>
    <!-- 数据区域 -->
    <data-box :height="340" :data="dataSet">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <el-button type="text">拨号</el-button>
            <el-button type="text">总结</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="数据来源" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="hujiaoleixing" label="呼叫类型" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="telphone" label="电话号码" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="cishu" label="通话次数" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="zuijinboda" label="最近拨打时间" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="name" label="姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="pinyin" label="拼音" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="genggairiqi" label="更改日期" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column label="接通次数/拨打次数" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <span>{{scope.row.connect}}/{{scope.row.dial}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="最近联系日期" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="zuijintel" label="最近电话号码" :min-width="$helper.getColumnWidth(4)">
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
export default class ThirdCallRecord extends Vue {
  private dataSet: any[] = [
    {
      source: '网查',
      relation: '好友',
      hujiaoleixing: '主叫',
      name: '苏健',
      pinyin: 'SuJian',
      telType: '手机',
      genggairiqi: '2018-07-09',
      telphone: '15702944066(西安)',
      email: '744929434@qq.com',
      cishu: 5,
      zuijinboda: '2018-07-09 12:35:57',
      connect: 1,
      dial: 10,
      date: '2018-07-09',
      zuijintel: 'PTP',
    },
    {
      source: '数据魔盒',
      relation: '好友',
      hujiaoleixing: '主叫',
      name: '苏健',
      pinyin: 'SuJian',
      telType: '手机',
      genggairiqi: '2018-07-09',
      telphone: '15702944066(西安)',
      email: '744929434@qq.com',
      cishu: 5,
      zuijinboda: '2018-07-09 12:35:57',
      connect: 1,
      dial: 10,
      date: '2018-07-09',
      zuijintel: 'PTP',
    },
  ];

  public refreshData(){}
}
</script>

<style lang="less" scoped>
</style>
