<template>
  <section class="component">
    <el-form :model="queryModel" ref="form" label-width="260px" class="addleaveCase">
      <el-row>
        <el-col :span="18">
          <el-form-item label="调查结果" prop="result">
            <el-select v-model="queryModel.result" placeholder="请选择" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('SurveyResults')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="queryModel.result === 'Fraud'">
        <el-col :span="20">
          <el-form-item label="欺诈类型" prop="type">
            <el-select v-model="queryModel.type" placeholder="请选择" clearable @change="selectSubType">
              <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="queryModel.subType" placeholder="请选择" clearable v-if="subType.length !== 0">
              <el-option v-for="item in subType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="调查原因" prop="remark">
            <el-input v-model="queryModel.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="上传附件">
          <file-upload ref="upload_case_import" :fileList.sync="fileList" :AllowExtension="['xlsx','xls','jpg','png']"></file-upload>
        </el-form-item>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="commit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import FileUpload from '~/components/common/file-upload.vue';
import { DataDictService } from '~/services/common-service/data-dict.service';
import { CaseAssistAntiFraudSurveyCaseService } from '~/services/domain-service/case-assist-anti-fraud-survey-case.service.ts';

@Component({
  components: {
    FileUpload,
  },
})
export default class AntiFraudResult extends Vue {
  @Prop({ required: true })
  private caseRow: any;

  @Dependencies(DataDictService)
  private dataDictService: DataDictService;

  @Dependencies(CaseAssistAntiFraudSurveyCaseService)
  private caseAssistAntiFraudSurveyCaseService: CaseAssistAntiFraudSurveyCaseService;

  private queryModel: any = {
    result: '',
    type: '',
    subType: '',
    remark: '',
    recordFiledIds: '',
  };
  private recordFiledIds: string;
  private type: any[] = [];//欺诈类型
  private subType: any[] = []; //二级欺诈类型
  private fileList: any[] = []; //文件上传
  private allType: any[] = []; //所有类型
  private categoryName: string ;
  public refresh() {
    //   重置form表单xr
    const addForm: any = this.$refs['form'];
    addForm.resetFields();
  }
  @Emit('refreshList')
  private refreshList() { }
  @Emit('close')
  private close() {
    this.refresh();
    this.clearForm();
  }
  private clearForm (){
    const addForm: any = this.$refs['form'];
      addForm.resetFields();
      const upload: any = this.$refs['upload_case_import'];
      upload.reset();
      this.queryModel = {
        result: '',
        type: '',
        subType: '',
        remark: '',
        recordFiledIds: '',
      }
  }
  private mounted() {
    this.getDataPools();
  }
  @Watch('caseRow')
  private onCaseRowChange() {
    this.clearForm();
    this.getDataPools();
  }
  private getDataPools() {
    this.dataDictService.getDataPools().subscribe(
      (data) => {
        this.allType = data
        // this.type = data;
        data.map(v => {
          if (v.parentId == null) {
            this.type.push(v);
          }
        })
      },
    );
  }

  private selectSubType(id) {
    console.log('id =====>', id);
    this.subType = [];
    this.queryModel.subType = '';
    this.allType.map(v => {
      if (v.parentId === id) {
        this.subType.push(v);
      }
    })
  }

  private commit() {
    const addForm: any = this.$refs['form'];
    addForm.validate((valid) => {
      if (!valid) {
        return;
      }
      if (this.fileList.length) {
        this.fileList.map((v) =>{
            this.queryModel.recordFiledIds += v.response.id + ',';
        })
      }
      console.log('recordFiledIds ===>',this.queryModel.recordFiledIds);
      this.subType.map((v) =>{
          if(this.queryModel.subType === v.id){
              this.categoryName = v.name
          }
      })
      const param = {
        id: this.caseRow.id,
        caseAssistId: this.caseRow.id,
        categoryName: this.categoryName,
        dataPoolId: this.queryModel.subType,
        surveyResults: this.queryModel.result,
        recordFiledIds:this.queryModel.recordFiledIds,
        description: this.queryModel.remark,
      }
      this.caseAssistAntiFraudSurveyCaseService
        .setAntiFraudCaseByCaseId(param).subscribe(
          (data) => {
            this.$message.success('设置成功')
            this.close();
            this.refreshList()
          },
      );
    });
  }

}
</script>

<style lang="less" scoped>
</style>
