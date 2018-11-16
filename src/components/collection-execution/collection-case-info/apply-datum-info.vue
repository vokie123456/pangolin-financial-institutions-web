<template>
  <!-- 催收执行页-案件信息模块-申请材料信息 -->
  <section class="component apply-datum-info">
    <div class="data-title">
      <svg-icon iconName="jinjiancailiao"></svg-icon>
      <span>进件材料</span>
    </div>
    <data-box :data="attachDataSet.inputFile">
      <template slot="columns">
        <el-table-column prop="name" label="材料名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-col class="item" v-for="(v,i) in scope.row.customerPapers" :key="i">
              <el-button v-if="fileTypeCheck(v.pictureName)" @click="orgPreStep(scope,i)" type="text" size="small">{{v.pictureName}}</el-button>
              <span v-else>{{v.pictureName}}</span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column prop="uploadDate" label="上传时间" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="下载" label="操作" :min-width="$helper.getColumnWidth(2)">
          <template slot-scope="scope">
            <el-col class="item" v-for="(v,i) in scope.row.customerPapers" :key="i">
              <el-button v-show="scope.row.filePath" @click="downloadFile(scope.row.filePath,scope.row.fileName)" type="text" size="small">下载</el-button>
            </el-col>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <div class="data-title">
      <svg-icon iconName="xianshanghetongxiazai"></svg-icon>
      <span>线上合同下载</span>
    </div>
    <data-box :data="attachDataSet.inputFile">
      <template slot="columns">
        <el-table-column prop="name" label="材料名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-col class="item" v-for="(v,i) in scope.row.customerPapers" :key="i">
              <el-button v-if="fileTypeCheck(v.pictureName)" @click="orgPreStep(scope,i)" type="text" size="small">{{v.pictureName}}</el-button>
              <span v-else>{{v.pictureName}}</span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column prop="uploadDate" label="上传时间" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="下载" label="操作" :min-width="$helper.getColumnWidth(2)">
          <template slot-scope="scope">
            <el-col class="item" v-for="(v,i) in scope.row.customerPapers" :key="i">
              <el-button v-show="scope.row.filePath" @click="downloadFile(scope.row.filePath,scope.row.fileName)" type="text" size="small">下载</el-button>
            </el-col>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <div class="data-title">
      <svg-icon iconName="qitaxinxi"></svg-icon>
      <span>其他材料</span>
    </div>
    <data-box :data="attachDataSet.inputFile">
      <template slot="columns">
        <el-table-column prop="name" label="材料名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-col class="item" v-for="(v,i) in scope.row.customerPapers" :key="i">
              <el-button v-if="fileTypeCheck(v.pictureName)" @click="orgPreStep(scope,i)" type="text" size="small">{{v.pictureName}}</el-button>
              <span v-else>{{v.pictureName}}</span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column prop="uploadDate" label="上传时间" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="下载" label="操作" :min-width="$helper.getColumnWidth(2)">
          <template slot-scope="scope">
            <el-col class="item" v-for="(v,i) in scope.row.customerPapers" :key="i">
              <el-button v-show="scope.row.filePath" @click="downloadFile(scope.row.filePath,scope.row.fileName)" type="text" size="small">下载</el-button>
            </el-col>
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
import SvgIcon from '~/components/common/svg-icon.vue';
import { Prop } from "vue-property-decorator";
import { CASE_CHANNEL } from "~/config/enum.config"

@Component({
  components: {
    DataBox,
    SvgIcon,
  },
})
export default class ApplyDatumInfo extends Vue {


  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  /**
   * caseChannel
   */
  @Prop({ type: String, required: true })
  private caseChannel: string;


  private attachDataSet: any = {
    inputFile: [],
  };
}
</script>

<style lang="less" scoped>
.page.apply-datum-info {
  .data-title {
    padding-left: 10px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 600;
    color: #00bbca;
  }
}
</style>
