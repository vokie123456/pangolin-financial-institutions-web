<template>
  <section class="component add-company">
    <el-form :rules="caseRules" :model="caseModel" ref="form" label-width="120px" class="addCompany">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法院" prop="courtCheck">
            <el-input type="input" v-model="caseModel.courtExe" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法官" prop="judgeCheck">
             <el-input type="input" v-model="caseModel.judgeCheck" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法官电话" prop="mobileCheck">
            <el-input type="input" v-model="caseModel.mobileCheck" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="庭审时间" prop="courtTime">
           <el-date-picker v-model="caseModel.courtTime" type="date" placeholder="选择日期" :disabled="isCheck">
             </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="庭审结果" prop="courtResult">
            <el-radio-group v-model="caseModel.courtResult" :disabled="isCheck">
              <el-radio :label="0">判决</el-radio>
              <el-radio :label="1">调解</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="庭审/调解时间" prop="mediateTime">
            <el-date-picker v-model="caseModel.mediateTime" type="date" placeholder="选择日期" :disabled="isCheck">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="更新人" prop="checkUpdateName">
            <el-input type="input" v-model="caseModel.checkUpdateName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="跟进人" prop="checkFollowName">
            <el-input type="input" v-model="caseModel.checkFollowName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="备注" prop="courtRemark">
            <el-input type="textarea" v-model="caseModel.courtRemark" :disabled="isCheck"></el-input>
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
        <el-button @click="recover" v-if="!isCheck">撤诉</el-button>
        <el-button @click="commit('CHECK')" v-if="!isCheck">保存</el-button>
        <el-button @click="nextStep('COURT_EXECUTE')" v-if="type.lawerStatus !== 'WITHDRAWAL_PROSECUTION'" >下一步</el-button>
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
    mobileCheck:'',
    courtResult: '',
    mediateTime: '',
    checkUpdateName: '',
    checkFollowName: '',
    courtRemark: '',
    courtCheck: '',
    judgeCheck: '',
    step: ''
  };
  private fileList: any = [];
  private recordFildId: any = ''
  private active:any = 1
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

    private recover(){
    this.outsourceLawsuitService.withdraw({caseId:this.type.id}).subscribe(
      data => {
        this.$message.success("操作成功!");
          // this.refreshList();
          // this.close();
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
            this.recordFildId = data.courtFildId
          }
        },
        ({ msg }) => {
          this.$message.error(msg);
        }
      );
  }
  private upStep(){
    if(this.isCheck === true){
        this.$emit('goStep','COURT');
    }else {
        this.nextStep('COURT')
    }
  }
  private nextStep(val){
    if(this.isCheck === true){
      this.$emit('goStep',val);
    }else {
      this.caseModel.lawerStatus = val
      this.caseModel.caseAssistId = this.type.id
      this.caseModel.LawsuitFollowType = this.type
      this.caseModel.courtFildId = '';
      if (this.fileList.length) {
        this.fileList.map((v) =>{
            this.caseModel.courtFildId += v.response.id + ',';
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
      this.caseModel.LawsuitFollowType = this.type
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
    this.caseModel.courtFildId = id
  }
}
</script>

<style lang="less" scoped>
.step-case{
  margin-bottom: 20px;
}
</style>

