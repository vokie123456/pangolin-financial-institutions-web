<template>
  <section class="page case-excel-import" v-loading:body="importLoading">
    <el-form ref="data-form" :model="importModel" label-width="150px" class="tableInput" :rules="rules">
      <el-form-item label="委托方" prop="principalId">
        <el-select placeholder="请选择" v-model="importModel.principalId" @change="getTemplate">
          <el-option v-for="item in principalList.content" :label="item.name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateId">
        <el-select placeholder="请选择" v-model="importModel.templateId">
          <el-option v-for="item in templateList" :label="item.name" :value="item.templetId" :key="item.templetId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传文件">
        <file-upload ref="upload_case_import" :fileList.sync="fileList" :fileNumberLimit="1" :AllowExtension="['xlsx','xls']"></file-upload>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="close">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import FileUpload from '~/components/common/file-upload.vue';
import { DataImportExcelInfoService } from '~/services/dataimp-service/data-import-excel-info.service';
import { PageService } from '~/utils/page.service';

const accManageModule = namespace('acc-manage');

// @Auth(414)
@Layout('workspace')
@Component({
  components: {
    FileUpload,
  },
})
export default class CaseExcelImport extends Vue {
  @State
  public principalList: any;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(DataImportExcelInfoService)
  private DataImportExcelInfoService: DataImportExcelInfoService;

  private importModel: any = {
    id: '', // 委托方ID
    delegationDate: '', // 委案日期
    closeDate: '', // 结案日期
    fileId: '', // 文件id
    templateId: '',
    memo: '', // 备注
    companyCode: '',
    principalId: '',
    principalName: '',
    recoverWay: 0,
  };
  private templateList: any[] = [];
  private importLoading: any = false;
  private rules: any = {
    principalId: [{ required: true, message: '请选择委托方' }],
    templateId: [{ required: true, message: '请选择模板名称' }],
  };
  private fileList: any = [];
  public close() {
    const upload: any = this.$refs['upload_case_import'];
    upload.reset();
    this.$emit('close');
    const dataform: any = this.$refs['data-form'];
    dataform.resetFields();
  }

  // 获取模板
  private getTemplate() {
    this.importModel.templateId = '';
    this.DataImportExcelInfoService.findTempletByPrincipalId({
      principalId: this.importModel.principalId,
    }).subscribe((data) => {
      this.templateList = data;
    });
  }

  private submit() {
    if (this.fileList.length === 0) {
      this.$message('请上传导入文件');
      return;
    }
    // 存储文件ID
    this.importModel.fileId = this.fileList[0].response.id;
    // 委托方名称
    const principal = this.principalList.content.find(
      (v) => v.id === this.importModel.principalId,
    );
    this.importModel.principalName = principal ? principal.name : '';
    const dataForm: any = this.$refs['data-form'];
    dataForm.validate((valid) => {
      if (!valid) {
        return;
      }
      this.importLoading = true;
      this.$message.success('案件正在导入,导入结果请关注消息列表');
      this.DataImportExcelInfoService.importExcelData(
        this.importModel,
      ).subscribe(
        (data) => {
          if (data.rowErrorList && data.rowErrorList.length) {
            this.$message('案件导入失败');
            this.$emit('errSeriousMsg', data);
            return;
          }
          this.importLoading = false;
          this.$emit('success');
          this.close();
        },
        (err) => {
          this.importLoading = false;
        },
      );
    });
  }
}
</script>

<style scoped>
.group {
  margin-bottom: 0px !important;
  margin-top: 5px;
}
</style>
