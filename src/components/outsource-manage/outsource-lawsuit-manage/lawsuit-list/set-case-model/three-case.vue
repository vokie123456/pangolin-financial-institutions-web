<template>
  <section class="component add-company">
    <el-form :rules="caseRules" :model="caseModel" ref="form" label-width="120px" class="addCompany">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法院" prop="courtExe">
            <el-input type="input" v-model="caseModel.courtExe" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法官" prop="judgeExe">
            <el-input type="input" v-model="caseModel.judgeExe" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法官电话" prop="mobileExe">
            <el-input type="input" v-model="caseModel.mobileExe" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="执行案件号" prop="exeNumber">
           <el-input type="input" v-model="caseModel.exeNumber" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="执行立案标的" prop="exeRecord">
            <el-input type="input" v-model="caseModel.exeRecord" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新人" prop="exeUpdateName">
            <el-input type="input" v-model="caseModel.exeUpdateName" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="跟进人" prop="exeFollowName">
            <el-input type="input" v-model="caseModel.exeFollowName" :disabled="isCheck"></el-input>
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
        <el-button @click="closeCase" v-if="!isCheck">结案</el-button>
        <el-button @click="upStep" >上一步</el-button>
        <el-button @click="commit('COURT_EXECUTE')" v-if="!isCheck">保存</el-button>
        <el-button @click="nextStep('EXECUTION')" v-if="type.lawerStatus !== 'CLOSING_CASE'" >下一步</el-button>
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

  // form表单
  private caseModel: any = {
    caseAssistId:'',
    courtFildId:'',
    courtTime: '',
    courtResult: '',
    mediateTime: '',
    exeUpdateName: '',
    exeRecord:'',
    exeNumber:'',
    checkFollowName: '',
    exeRemark: '',
    courtExe: '',
    judgeExe: '',
    exeFollowName:'',
    mobileExe: '',
    step: ''
  };
  private fileList: any = [];
  // 查询出来的form
  private followModel:any
  private  recordFildId: any = ''
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

  private closeCase(){
    this.outsourceLawsuitService.closingCase({caseId:this.type.id}).subscribe(
      data => {
        this.$message.success("操作成功!");
          // this.refreshList();
          this.$emit('goStep', 'tag')
      },
      ({ msg }) => {
        this.$message.error(msg);
      }
    );

  }
  private refrech(){
      this.outsourceLawsuitService.getFollowInfo({id:this.type.id}).subscribe(
        data => {
          if(data){
            this.caseModel = data
            this.recordFildId = data.exeFildId
          }
        },
        ({ msg }) => {
          this.$message.error(msg);
        }
      );
  }
  private upStep(){
    if(this.isCheck === true){
        this.$emit('goStep','CHECK');
      if(this.type.lawsuitFollowType === 'ENFORCE_RECORD'){
          this.nextStep('COURT');
      }
    }else {
      if(this.type.lawsuitFollowType === 'ENFORCE_RECORD'){
          this.nextStep('COURT');
      }else {
        this.nextStep('CHECK')
      }
    }
  }
  private nextStep(val){
    if(this.isCheck === true){
      this.$emit('goStep',val);
    }else {
      this.caseModel.lawerStatus = val
      this.caseModel.caseAssistId = this.type.id
      this.caseModel.LawsuitFollowType = this.type
      this.caseModel.exeFildId = '';
      if (this.fileList.length) {
        this.fileList.map((v) =>{
            this.caseModel.exeFildId += v.response.id + ',';
        })
      }
      this.outsourceLawsuitService.saveCourtInfo(this.caseModel).subscribe(
        data => {
          this.$message.success("操作成功!");
          this.$emit('goStep');
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
      this.caseModel.LawsuitFollowType = this.type.lawsuitFollowType
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

