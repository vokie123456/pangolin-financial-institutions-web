<template>
  <section class="page case-excel-import" v-loading:body="importLoading">
    <el-form ref="data-form" :model="importModel" label-width="100px" class="text-left" :rules="rules">
      <el-form-item label="上传文件">
        <file-upload ref="upload_case_import" :fileList.sync="fileList" :fileNumberLimit="1" :AllowExtension="['xlsx','xls']"></file-upload>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button @click="close">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import { State, Getter, Action, namespace } from "vuex-class";
import FileUpload from "~/components/common/file-upload.vue";
import { DataImportExcelInfoService } from "~/services/dataimp-service/data-import-excel-info.service";
import { PageService } from "~/utils/page.service";
import { OutsourceReconciliationService } from "~/services/domain-service/outsource-reconciliation-manage.service";
import { Emit, Prop } from 'vue-property-decorator';

const accManageModule = namespace("acc-manage");

// @Auth(414)
@Layout('workspace')
@Component({
  components: {
    FileUpload
  }
})
export default class Check extends Vue {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(DataImportExcelInfoService) private DataImportExcelInfoService: DataImportExcelInfoService;
  @Dependencies(OutsourceReconciliationService)
  private outsourceReconciliationService: OutsourceReconciliationService;

  private importModel: any = {
    id: '', // 委托方ID
    delegationDate: '', // 委案日期
    closeDate: '', // 结案日期
    fileId: '', // 文件id
    templateId: '1040524575590608896',
    memo: '', // 备注
    companyCode: '',
    principalId: '',
    principalName: '',
    recoverWay: 0
  }
  private importLoading: any = false
  private rules: any = {}
  private fileList: any = []

  @Emit('refreshList')
  private refreshList() { }
  @Emit('close')
  private close() {
    const upload: any = this.$refs['upload_case_import']
    upload.reset()
    this.$emit('close')
    const dataform: any = this.$refs['data-form']
    dataform.resetFields()
  }

  private created() { }


  private submit() {
    if (this.fileList.length === 0) {
      this.$message('请上传导入文件')
      return
    }
    this.importLoading = true
    // 存储文件ID
    const dataForm: any = this.$refs['data-form']
    dataForm.validate(valid => {
      if (!valid) {
        return
      }
      const query = {
        fileId: this.fileList[0].response.id
      }
      this.$message.success('案件正在导入,导入结果请关注消息列表');
      // 导入电催跟进
      this.outsourceReconciliationService.checkBill(query).subscribe(
        data => {
          this.importLoading = false;
          this.refreshList();
          this.close();
        }
      );

    })
  }
}
</script>

<style scoped>
.group {
  margin-bottom: 0px !important;
  margin-top: 5px;
}
</style>
