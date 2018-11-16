<template>
  <section class="page excel-template">
    <data-form :model="excelModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="模板名称" prop="templateDataName">
          <el-input v-model="excelModel.templateDataName"></el-input>
        </el-form-item>
        <el-form-item label="委托方" prop="principalId">
          <el-select placeholder="请选择" v-model="excelModel.principalId">
            <el-option v-for="item in principalList.content" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板类型" prop="templateType">
          <el-input v-model="excelModel.templateType"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="dialog.addTemplate = true">新增模板</el-button>
      </template>
    </data-form>
    <data-box :data='dataSet'>
      <template slot="columns">
        <el-table-column prop="name" label="模板名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="principalName" label="委托方" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="(row) => $filter.dateTimeFormat(row.createTime)" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="创建人" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(2)">
          <template slot-scope="scope">
            <el-button type="text" @click="updateTemplate(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteTemplate(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog title="新增模板" width="910px" :close-on-press-escape="false" :show-close="false" :visible.sync="dialog.addTemplate" :close-on-click-modal="false">
      <add-template ref='add-template' @close="dialog.addTemplate=false;refreshData()">
      </add-template>
    </el-dialog>
    <el-dialog title="修改模板" width="910px" :close-on-press-escape="false" :show-close="false" :visible.sync="dialog.updateTemplate" :close-on-click-modal="false">
      <add-template ref='add-template' :modifyData="modifyData" @close="dialog.updateTemplate=false;refreshData()">
      </add-template>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import AddTemplate from '~/components/templete-manage/excel-template/add-template.vue';
import { SortService } from '~/utils/sort.service';
import { ImportExcelConfigService } from '~/services/dataimp-service/import-excel-config.service';
import { State, Getter, Action, namespace } from 'vuex-class';

const accManageModule = namespace('acc-manage');

@Layout('workspace')
@Component({
  components: {
    DataBox,
    DataForm,
    AddTemplate,
  },
})
export default class ExcelTemplate extends Vue {
  @State
  private principalList: any;
  @Dependencies(ImportExcelConfigService)
  private importExcelConfigService: ImportExcelConfigService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(PageService)
  private pageService: PageService;
  private dataSet: any[] = [];
  private excelModel: any = {
    templateType: '',
    principalId: '',
    templateDataName: '',
  };
  private dialog = {
    addTemplate: false,
    updateTemplate: false,
  };

  private modifyData: any = {};

  private refreshData() {
    this.importExcelConfigService
      .templateDataQuery(this.excelModel, this.pageService, this.sortService)
      .subscribe((data) => {
        this.dataSet = data;
      });
  }
  private mounted() {
    this.refreshData();
  }
  //修改模板
  private updateTemplate(rowData) {
    this.modifyData = rowData;
    this.dialog.updateTemplate = true;
  }
  //删除模板
  private deleteTemplate(rowData) {
    this.$confirm(`您确定要删除该模板吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.importExcelConfigService
        .deleteExcelData({ id: rowData.id })
        .subscribe((data) => {
          this.$message.success('删除成功');
          this.refreshData();
        });
    });
  }
}
</script>

<style scoped lang="less">
</style>
