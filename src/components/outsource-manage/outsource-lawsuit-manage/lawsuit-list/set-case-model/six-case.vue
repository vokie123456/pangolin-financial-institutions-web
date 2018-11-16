<template>
  <section class="component add-company">
    <el-form :rules="caseRules" :model="caseModel" ref="form" label-width="120px" class="addCompany">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法院" prop="courtTake">
            <el-input type="input" v-model="caseModel.courtTake" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法官" prop="judgeTake">
            <el-input type="input" v-model="caseModel.judgeTake" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法官电话" prop="mobileTake">
            <el-input type="input" v-model="caseModel.mobileTake" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参与分配时间" prop="evalPrice">
            <el-date-picker v-model="caseModel.takeTime" type="date" placeholder="选择日期" :disabled="isCheck">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="参与分配金额" prop="takeMoney">
            <el-input type="number" v-model="caseModel.takeMoney" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否全额清收" prop="settle">
            <el-radio-group v-model="caseModel.settle" :disabled="isCheck">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="更新人" prop="takeUpdateName">
            <el-input type="input" v-model="caseModel.takeUpdateName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="跟进人" prop="takeFollowName">
            <el-input type="input" v-model="caseModel.takeFollowName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="备注" prop="takeRemark">
            <el-input type="textarea" v-model="caseModel.takeRemark" :disabled="isCheck"></el-input>
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
        <el-button @click="commit('TAKE')" v-if="!isCheck">保存</el-button>
        <el-button @click="nextStep('TAKE')" v-if="!isCheck">完成</el-button>
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
    courtTake:'',
    judgeTake:'',
    mobileTake:'',
    takeTime:'',
    takeMoney:'',
    settle:'',
    takeUpdateName:'',
    takeFollowName:'',
    takeRemark:'',
    takeFildId:'',
    step: ''
  };
  private fileList: any = [];
  private recordFildId: any = ''
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
  private close() {}

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
            this.recordFildId = data.takeFildId
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
      this.caseModel.takeFildId = '';
      if (this.fileList.length) {
          this.fileList.map((v) =>{
              this.caseModel.takeFildId += v.response.id + ',';
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
          this.$emit('goStep', 'tag')
        },
        ({ msg }) => {
          this.$message.error(msg);
        }
      );
    });
  }
  private onUploadSuccess(id, data) {
    this.caseModel.proFildId = id
  }
}
</script>

<style lang="less" scoped>
.step-case{
  margin-bottom: 20px;
}
</style>

