<template>
  <!-- 催收执行页-历史信息模块-外访附件 -->
  <section class="component visit-annex">
    <!-- 搜索区域 -->
    <data-form :model="model">
      <template slot="default-input">
        <el-form-item label="上传人" prop="uploader">
          <el-input v-model="model.uploader" placeholder="上传人" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker v-model="model.uploadTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
      </template>
    </data-form>
    <!-- 数据列区域 -->
    <data-box @onPageChange="refreshData" :data="dataSet" :page="pageService" :height="200">
      <template slot="columns">
        <el-table-column prop="liushui" label="行动流水" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="shangchuanren" label="上传人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="shangchuanshijian" label="上传时间" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-button type="text">试听</el-button>
            <el-button type="text">下载</el-button>
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
import { Dependencies } from '~/core/decorator';
import { Prop } from "vue-property-decorator";
import DataBox from '~/components/common/data-box.vue';
import DataForm from '~/components/common/data-form.vue';
import { PageService } from '~/utils/page.service';

@Component({
  components: {
    DataBox,
    DataForm,
  },
})
export default class VisitAnnex extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  private model: any = {
    uploader: '',
    uploadTime: []
  };
  private dataSet: any[] = [];

  private refreshData() {
    
  }
}
</script>

<style lang="less" scoped>
</style>
