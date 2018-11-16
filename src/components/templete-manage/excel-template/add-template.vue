<template>
  <section class="page">
    <el-form :rules="rules" :model="excelModel" ref="form" :inline="true" label-width="100px" align="left">
      <el-row>
        <el-form-item label="委托方" prop="principalId">
          <el-select placeholder="请选择" v-model="excelModel.principalId" @change="getPrincipalName">
            <el-option v-for="item in principalList.content" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="excelModel.name"></el-input>
        </el-form-item>
        <el-form-item label="标题起始行" prop="titleStartRow">
          <el-input v-model="excelModel.titleStartRow"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="标题起始列" prop="titleStartCol">
          <el-input v-model="excelModel.titleStartCol"></el-input>
        </el-form-item>
        <el-form-item label="数据起始行" prop="dataStartRow">
          <el-input v-model="excelModel.dataStartRow"></el-input>
        </el-form-item>
        <el-form-item label="数据起始列" prop="dataStartCol">
          <el-input v-model="excelModel.dataStartCol"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <file-upload ref="upload_template" :fileList.sync="fileList" @onUploadSuccess="onUploadSuccess" :fileNumberLimit="1">
          </file-upload>
        </el-form-item>
      </el-row>
    </el-form>

    <data-box :data="dataSet" height='300'>
      <template slot="columns">
        <el-table-column prop="titleName" label="标题名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="sheetNum" label="sheet编码" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="remark" label="备注" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="col" label="对应列" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="relationName" label="映射字段" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-button v-if="scope.row.relationName===''" type="text" size="small" @click="relateOpen(scope)">查看</el-button>
            <span v-if="scope.row.relationName!==''">{{scope.row.relationName}}</span>
            <span @click="relateOpen(scope)" v-if="scope.row.relationName!==''">
              <svg-icon iconName="xitongshezhi"></svg-icon>
            </span>
            <span @click="reSetClick(scope)" v-if="scope.row.relationName!==''">
              <svg-icon iconName="guanbi"></svg-icon>
            </span>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog :show-close="false" :close-on-press-escape="false" title="请选择映射字段" :visible.sync="dialog.relationName" append-to-body>
      <relation-name ref="relationName" @close="dialog.relationName=false" @save="save" :disabledStr="disabledStr" :rowData="rowData">
      </relation-name>
    </el-dialog>
    <div class="text-center">
      <el-button @click="close">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import clone from 'clone';
import Component from 'vue-class-component';
import SvgIcon from '~/components/common/svg-icon.vue';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import DataBox from '~/components/common/data-box.vue';
import FileUpload from '~/components/common/file-upload.vue';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { ImportExcelConfigService } from '~/services/dataimp-service/import-excel-config.service';
import RelationName from '~/components/templete-manage/excel-template/relation-name.vue';

const accManageModule = namespace('acc-manage');
@Component({
  components: {
    DataBox,
    FileUpload,
    RelationName,
    SvgIcon,
  },
})
export default class Name extends Vue {
  @State
  private principalList: any;
  @Dependencies(ImportExcelConfigService)
  private importExcelConfigService: ImportExcelConfigService;

  @Prop({})
  private modifyData: any;
  private fileList: any[] = [];
  private dataSet: any[] = [];
  private rowData: any = {};
  private disabledStr: any[] = [];
  private dialog: any = {
    relationName: false,
  };
  private excelModel: any = {
    dataStartCol: 'A',
    dataStartRow: 2,
    importExcelConfigItems: [],
    principalId: '',
    principalName: '',
    templateType: 'IMPORT_CASE',
    titleStartCol: 'A',
    titleStartRow: 1,
    name: '',
  };
  private rules: any = {
    principalId: [
      {
        required: true,
        message: '请选择',
      },
    ],
    name: [
      {
        required: true,
        message: '请输入模板名称',
      },
    ],
    titleStartRow: [
      {
        required: true,
        message: '请输入标题起始行',
      },
      {
        pattern: /^[0-9]*[1-9][0-9]*$/,
        message: '行号只能为正整数',
      },
    ],
    titleStartCol: [
      {
        required: true,
        message: '请输入标题起始列',
      },
      {
        pattern: /^[A-Z0-9]+$/,
        message: '列号只能为大写字母',
      },
    ],
    dataStartRow: [
      {
        required: true,
        message: '请输入数据起始行',
      },
      {
        pattern: /^[1-9]|[1-9]\d+$/,
        message: '行号只能为大于1的正整数',
      },
    ],
    dataStartCol: [
      {
        required: true,
        message: '请输入数据起始列',
      },
    ],
  };

  @Watch('modifyData', { immediate: true })
  private modifyDataChange(value) {
    if (!value) return;
    this.excelModel.id = value.id;
    this.dataSet = value.importExcelConfigItems;
    this.excelModel.dataStartCol = value.dataStartCol;
    this.excelModel.dataStartRow = value.dataStartRow;
    this.excelModel.titleStartCol = value.titleStartCol;
    this.excelModel.titleStartRow = value.titleStartRow;
    this.excelModel.principalId = value.principalId;
    this.excelModel.principalName = value.principalName;
    this.excelModel.name = value.name;
  }

  @Emit('close')
  private close() {
    const form: any = this.$refs['form'];
    form.resetFields();
    const upload: any = this.$refs['upload_template'];
    upload.reset();
    this.dataSet = [];
  }
  private relateOpen(scope) {
    this.rowData = scope;
    this.disabledStr = scope.store.table.data
      .filter((v) => {
        return v.relationName !== '';
      })
      .map((item) => {
        return item.relationName;
      });
    this.dialog.relationName = true;
  }

  private reSetClick(scope) {
    this.dataSet[scope.$index]['relationName'] = '';
    this.$set(this.dataSet, scope.$index, this.dataSet[scope.$index]);
  }
  /**
   * 提交
   */
  private commit() {
    const form: any = this.$refs['form']
    form.validate((result) => {
      if (!result) return
      this.excelModel.importExcelConfigItems = clone(this.dataSet);
      if (this.excelModel.id) {
        this.importExcelConfigService
          .updateExcelExportConfig(this.excelModel)
          .subscribe((data) => {
            this.close();
          });
      } else {
        this.importExcelConfigService
          .createExcelExportConfig(this.excelModel)
          .subscribe((data) => {
            this.close();
          });
      }
    })
  }
  /**
   * 上传成功回调
   */
  private onUploadSuccess(id, data) {
    const headerModel = {
      fileId: data.id,
      sheetTotals: '1',
      titleStartCol: this.excelModel.titleStartCol,
      titleStartRow: this.excelModel.titleStartRow,
    };
    this.importExcelConfigService
      .parserTemplateHeader(headerModel)
      .subscribe((data) => {
        this.$message.success('Excel导入成功');
        this.dataSet = data;
        this.dataSet.map((v) => {
          v.relationName = '';
        });
      });
  }

  private save(relate, row, index) {
    this.dataSet[index].relationName = relate.cellName;
    this.dataSet[index].attribute = relate.cellCode;
    this.dataSet[index].propertyType = relate.propertyType;
    this.$set(this.dataSet, index, this.dataSet[index]);
  }
  private getPrincipalName() {
    const principal: any = this.principalList.content.find(
      (v) => v.id === this.excelModel.principalId,
    );
    if (principal) {
      this.excelModel.principalName = principal.name;
    }
  }
}
</script>

<style scoped lang="less">

</style>
