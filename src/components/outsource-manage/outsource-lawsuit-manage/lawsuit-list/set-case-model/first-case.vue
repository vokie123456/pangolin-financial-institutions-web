<template>
  <section class="component add-company">
    <el-form :rules="caseRules" :model="caseModel" ref="form" label-width="120px" class="addCompany">
      <div v-if="type.lawsuitFollowType=='LAWSUIT_RECORD'">
        <el-row>
          <el-col :span="12">
            <el-form-item label="法院" prop="courtCase">
              <el-input type="input" v-model="caseModel.courtCase" :disabled="isCheck"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="立案时间" prop="caseTime">
              <el-date-picker v-model="caseModel.caseTime" type="date" placeholder="选择日期" :disabled="isCheck">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="诉讼案件号" prop="caseNumber">
              <el-input type="input" v-model="caseModel.caseNumber" :disabled="isCheck"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="诉讼立案标的" prop="lawsuitRecord">
              <el-input type="input" v-model="caseModel.lawsuitRecord" :disabled="isCheck"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="办理公告" prop="tranNotice">
              <el-radio-group v-model="caseModel.tranNotice" :disabled="isCheck">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办理公告时间" prop="tranNoticeTime">
              <el-date-picker v-model="caseModel.tranNoticeTime" type="date" placeholder="选择日期" :disabled="isCheck">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="诉讼保全" prop="lawsuitSave">
              <el-radio-group v-model="caseModel.lawsuitSave" :disabled="isCheck">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保全财产信息" prop="astateDetail">
              <el-input type="input" v-model="caseModel.astateDetail" :disabled="isCheck"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-if="type.lawsuitFollowType=='ENFORCE_RECORD'">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公证处" prop="courtCase">
              <el-input type="input" v-model="caseModel.courtCase" :disabled="isCheck"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-if="type.lawsuitFollowType=='ARBITRATE'">
        <el-row>
          <el-col :span="12">
            <el-form-item label="仲裁委" prop="courtCase">
              <el-input type="input" v-model="caseModel.courtCase"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="更新人" prop="courtUpdateName">
            <el-input type="input" v-model="caseModel.courtUpdateName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="跟进人" prop="courtFollowName">
            <el-input type="input" v-model="caseModel.courtFollowName" :disabled="isCheck" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="备注" prop="recordRemark">
            <el-input type="textarea" v-model="caseModel.recordRemark" :disabled="isCheck"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="附件">
            <!-- <file-upload @onUploadSuccess="onUploadSuccess" :disabled="isCheck"></file-upload> -->
            <file-upload ref="upload_case_import" :fileList.sync="fileList" :AllowExtension="['xlsx','xls','jpg','png']" :disabled="isCheck" :recordFildId="recordFildId"></file-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="recover" v-if="!isCheck">撤诉</el-button>
        <el-button @click="commit" v-if="!isCheck">保存</el-button>
        <el-button @click="nextStep" >下一步</el-button>
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
import fileUpload from "~/components/common/file-upload.vue";
import { StorageService } from "~/utils/storage.service";

@Component({
  components: {
    fileUpload
  }
})
export default class AddCost extends Vue {
  @Dependencies(OutsourceLawsuitService)
  private outsourceLawsuitService: OutsourceLawsuitService;

  @Prop()
  private type: any;
  @Prop({ default: false })
  private isCheck: any;
  // form表单
  private caseModel: any = {
    id: "",
    caseAssistId: "",
    createTime: "",
    operatorId: "",
    operatorRealName: "",
    courtCase: "",
    caseTime: "",
    caseNumber: "",
    recordFildId: "",
    step: ""
  };
  private fileList: any[] = [];
  // 立案附件id
  private recordFildId: any = '';
  private caseRules: any = {
    companyName: [
      { required: true, message: "请输入公司名称", trigger: "blur" }
    ],
    companyAddress: [
      { required: true, message: "请输入公司地址", trigger: "blur" }
    ],
    companyPhone: [
      { required: true, message: "请输入公司电话", trigger: "blur" }
    ],
    companyStatus: [
      { required: true, message: "请选择状态", trigger: "change" }
    ]
  };

  @Emit("refreshList")
  private refreshList() {}
  @Emit("close")
  private close() {}

  @Watch('type')
  private onTypeChange(){
    console.log('followObj=====>',this.type);
    this.refrech()
  }

  private mounted() {
    // const vuex = StorageService.getItem('vuex') || '';
    // this.caseModel.courtUpdateName = vuex.userData.realName;
    // this.caseModel.courtFollowName = vuex.userData.realName
    // console.log('vuex ====>',vuex)
    this.refrech();
  }

  private recover() {
    this.outsourceLawsuitService.withdraw({ caseId: this.type.id }).subscribe(
      data => {
        this.$message.success("操作成功!");
        this.$emit("goStep", "tag");
      },
      ({ msg }) => {
        this.$message.error(msg);
      }
    );
  }
  private refrech() {
    console.log(this.type);
    this.outsourceLawsuitService.getFollowInfo({ id: this.type.id }).subscribe(
      data => {
        if (data) {
          this.caseModel = data;
          this.recordFildId = data.recordFildId
        }
      },
      ({ msg }) => {
        this.$message.error(msg);
      }
    );
  }
  private nextStep() {
    if (this.isCheck === true) {
        this.$emit("goStep", "CHECK");
      if(this.type.lawsuitFollowType === 'ENFORCE_RECORD'){
        this.$emit("goStep", "COURT_EXECUTE");
      }
    } else {
      this.caseModel.lawerStatus = "CHECK";
      console.log("step ===>", this.caseModel.step);
      if (this.type.lawsuitFollowType === "ENFORCE_RECORD") {
        this.caseModel.lawerStatus = "COURT_EXECUTE";
        console.log("this.caseModel.step ===>", this.caseModel.step);
      }
      this.caseModel.caseAssistId = this.type.id;
      this.caseModel.LawsuitFollowType = this.type;
      this.caseModel.recordFildId = '';
      if (this.fileList.length) {
        this.fileList.map((v) =>{
            this.caseModel.recordFildId += v.response.id + ',';
        })
      }
      console.log('this.caseModel.recordFildId ====>',this.caseModel.recordFildId);
      this.outsourceLawsuitService.saveCourtInfo(this.caseModel).subscribe(
        data => {
          this.$message.success("操作成功!");
          if(this.type.lawsuitFollowType === "ENFORCE_RECORD"){
              this.$emit("goStep",'COURT_EXECUTE');
          }else {
              this.$emit("goStep",'CHECK');
          }
        },
        ({ msg }) => {
          this.$message.error(msg);
        }
      );
    }
  }
  private commit() {
    const form: any = this.$refs.form;
    form.validate(valid => {
      if (!valid) {
        return;
      }
      this.caseModel.lawerStatus = "COURT";
      this.caseModel.caseAssistId = this.type.id;
      this.caseModel.LawsuitFollowType = this.type;
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
.step-case {
  margin-bottom: 20px;
}
</style>

