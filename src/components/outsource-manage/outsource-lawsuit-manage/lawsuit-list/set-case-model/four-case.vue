<template>
  <section class="component add-company">
    <el-form :rules="caseRules" :model="caseModel" ref="form" label-width="120px" class="addCompany">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法院" prop="courtPro">
            <el-input type="input" v-model="caseModel.courtPro" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法官" prop="judgePro">
            <el-input type="input" v-model="caseModel.judgePro" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法官电话" prop="mobilePro">
            <el-input type="input" v-model="caseModel.mobilePro" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评估价格" prop="evalPrice">
           <el-input type="number" v-model="caseModel.evalPrice" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="成交价格" prop="agreePrice">
            <el-input type="number" v-model="caseModel.agreePrice" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新人" prop="proUpdateName">
            <el-input type="input" v-model="caseModel.proUpdateName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="跟进人" prop="proFollowName">
            <el-input type="input" v-model="caseModel.proFollowName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="备注" prop="exeRemark">
            <el-input type="textarea" v-model="caseModel.exeRemark" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附件">
            <file-upload ref="upload_case_import" :fileList.sync="fileList" :AllowExtension="['xlsx','xls','jpg','png']" :disabled="isCheck" :recordFildId="recordFildId"></file-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="upStep" >上一步</el-button>
        <el-button @click="commit('EXECUTION')" v-if="!isCheck">保存</el-button>
        <el-button @click="nextStep('END')" >执行终结</el-button>
        <el-button @click="nextStep('TAKE')" >参与分配</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { Emit, Prop ,Watch} from "vue-property-decorator";
import fileUpload from '~/components/common/file-upload.vue'

@Component({
  components: {
    fileUpload
  }
})
export default class AddCost extends Vue {
  @Dependencies(OutsourceLawsuitService) private outsourceLawsuitService: OutsourceLawsuitService;

  @Prop() private type:any
  @Prop({default: false}) private isCheck: any
  private fileList: any = [];
  private recordFildId: any = ''
  // form表单
  private caseModel: any = {
    caseAssistId:'',
    courtPro:'',
    judgePro:'',
    evalPrice:'',
    agreePrice:'',
    proRemark:'',
    proFildId:'',
    step: ''
  };
  private active:any
  private caseRules: any = {
    courtExe: [
      { required: true, message: '请输入', trigger: 'blur' }
    ],
    judgeExe: [
      { required: true, message: '请输入', trigger: 'blur' }
    ],
  };

  @Emit("refreshList")
  private refreshList() { }
  @Emit("close")
  private close() { }

  @Watch('type')
  private onTypeChange(){
    console.log('followObj=====>',this.type);
    this.refrech()
  }
  private mounted() {
    this.refrech()
  }

  private refrech(){
      this.outsourceLawsuitService.getFollowInfo({id:this.type.id}).subscribe(
        data => {
          if(data){
            this.caseModel = data
            this.recordFildId = data.proFildId
          }
        },
        ({ msg }) => {
          this.$message.error(msg);
        }
      );
  }
  private upStep(){
    if(this.isCheck === true){
      this.$emit('goStep','COURT_EXECUTE');
    }else {
      this.nextStep('COURT_EXECUTE')
    }
  }
  private nextStep(val){
     if(this.isCheck === true){
       this.$emit('goStep',val);
     }else {
        this.caseModel.lawerStatus = val
        this.caseModel.caseAssistId = this.type.id
        this.caseModel.LawsuitFollowType = this.type
        this.caseModel.proFildId = '';
        if (this.fileList.length) {
          this.fileList.map((v) =>{
              this.caseModel.proFildId += v.response.id + ',';
          })
        }
        this.outsourceLawsuitService.saveCourtInfo(this.caseModel).subscribe(
          data => {
            this.$message.success("操作成功!");
            this.$emit('goStep')
          },
          ({ msg }) => {
            this.$message.error(msg);
          }
        );
     }

  }
  private commit(val) {
    const form: any = this.$refs.form;
    form.validate(valid => {
      if (!valid) {
        return;
      }
      this.caseModel.lawerStatus = val
      this.caseModel.caseAssistId = this.type.id
      this.caseModel.LawsuitFollowType = this.type
      this.caseModel.recordFildId = '';
      if (this.fileList.length) {
        this.fileList.map((v) =>{
            this.caseModel.recordFildId += v.response.id + ',';
        })
      }
      this.outsourceLawsuitService.saveCourtInfo(this.caseModel).subscribe(
        data => {
          this.$message.success("保存成功!");
        },
        ({ msg }) => {
          this.$message.error(msg);
        }
      );
    });
  }
}
</script>

<style lang="less" scoped>
.step-case{
  margin-bottom: 20px;
}
</style>

