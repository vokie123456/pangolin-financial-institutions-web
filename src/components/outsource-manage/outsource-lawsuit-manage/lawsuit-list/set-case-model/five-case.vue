<template>
  <section class="component add-company">
    <el-form :rules="caseRules" :model="caseModel" ref="form" label-width="120px" class="addCompany">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法院" prop="courtEnd">
            <el-input type="input" v-model="caseModel.courtEnd" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法官" prop="judgeEnd">
            <el-input type="input" v-model="caseModel.judgeEnd" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法官电话" prop="mobileEnd">
            <el-input type="input" v-model="caseModel.mobileEnd" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="执行终结时间" prop="exeEndTime">
           <el-date-picker v-model="caseModel.exeEndTime" type="date" placeholder="选择日期" :disabled="isCheck">
           </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="更新人" prop="exeEndUpdateName">
            <el-input type="input" v-model="caseModel.exeEndUpdateName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="跟进人" prop="exeEndFollowName">
            <el-input type="input" v-model="caseModel.exeEndFollowName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="备注" prop="exeEndRemark">
            <el-input type="textarea" v-model="caseModel.exeEndRemark" :disabled="isCheck"></el-input>
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
        <el-button @click="commit('END')" v-if="!isCheck">保存</el-button>
        <el-button @click="nextStep('END')" v-if="!isCheck">完成</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import fileUpload from '~/components/common/file-upload.vue'
import { Emit, Prop ,Watch} from "vue-property-decorator";

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
    courtEnd:'',
    mobileEnd:'',
    judgeEnd:'',
    exeEndUpdateName:'',
    exeEndFollowName:'',
    exeEndRemark:'',
    exeEndFildId:'',
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

  private mounted() {
    this.refrech()
  }

  @Watch('type')
  private onTypeChange(){
    console.log('followObj=====>',this.type);
    this.refrech()
  }

  private refrech(){
      this.outsourceLawsuitService.getFollowInfo({id:this.type.id}).subscribe(
        data => {
          if(data){
            this.caseModel = data
            this.recordFildId = data.exeEndFildId
          }
        },
        ({ msg }) => {
          this.$message.error(msg);
        }
      );
  }
  private upStep(){
    if(this.isCheck === true){
      this.$emit('goStep','EXECUTION');
    }else {
      console.log('第五个页面的 上一步')
      this.nextStep('EXECUTION')
    }
  }
  private nextStep(val){
    if(this.isCheck === true){
      this.$emit('goStep','tag');
    }else {
        this.caseModel.lawerStatus = val
        this.caseModel.caseAssistId = this.type.id
        this.caseModel.LawsuitFollowType = this.type
        this.caseModel.exeEndFildId = '';
        if (this.fileList.length) {
          this.fileList.map((v) =>{
              this.caseModel.exeEndFildId += v.response.id + ',';
          })
        }
        this.outsourceLawsuitService.saveCourtInfo(this.caseModel).subscribe(
          data => {
            this.$message.success("操作成功!");
            if(val === 'EXECUTION'){
              this.$emit('goStep', 'EXECUTION')
            }else {
              this.$emit('goStep', 'tag')
            }
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
  private onUploadSuccess(id, data) {
    this.caseModel.exeEndFildId = id
  }
}
</script>

<style lang="less" scoped>
.step-case{
  margin-bottom: 20px;
}
</style>

