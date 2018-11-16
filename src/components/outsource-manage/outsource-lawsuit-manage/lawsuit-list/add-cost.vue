<template>
  <section class="component add-company">
    <el-form :rules="companyRules" :model="form" ref="form" label-width="90px" class="addCompany">
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用类别" prop="costType">
            <el-select v-model="form.costType" placeholder="请选择" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('CostType')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用项" prop="costEvent">
            <el-select v-model="form.costEvent" placeholder="请选择" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('CostEvent')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用金额" prop="momey">
            <el-input type="input" v-model="form.momey" @keyup.native="proving1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="缴费时间" prop="payTime">
            <el-date-picker v-model="form.payTime" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="付款凭证">
            <file-upload ref="upload_case_import" :fileList.sync="form.fileList" :AllowExtension="['xlsx','xls','jpg','png']"></file-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="commit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { Emit, Prop, Watch } from "vue-property-decorator";
import FileUpload from "~/components/common/file-upload.vue";
import { Getter } from "vuex-class";

@Component({
  components: {
    FileUpload
  }
})
export default class AddCost extends Vue {
  @Dependencies(OutsourceLawsuitService) private outsourceLawsuitService: OutsourceLawsuitService;

  @Prop() private costMel: any;

  // 公司数据实体
  private form: any = {
    id: "",
    createTime: "",
    operatorId: "",
    operatorRealName: "",
    costType: "",
    costEvent: "",
    momey: "",
    payTime: "",
    payEvi: "",
    remark: "",
    operatorName: "",
    fileList: [],
    assistId:'',
  };
  private companyRules: any = {
    costType: [
      { required: true, message: '该项不能为空', trigger: 'blur' }
    ],
    costEvent: [
      { required: true, message: '该项不能为空', trigger: 'blur' }
    ],
    momey: [
      { required: true, message: '该项不能为空', trigger: 'blur' }
    ],
    payTime: [
      { required: true, message: '该项不能为空', trigger: 'blur' }
    ],
    payEvi: [
      { required: true, message: '该项不能为空', trigger: 'blur' }
    ],
    remark: [
      { required: true, message: '该项不能为空', trigger: 'blur' }
    ],

  };

  @Emit("refreshList")
  private refreshList() { }
  @Emit("close")
  private close() {
  }

  private cancel() {
    const upload: any = this.$refs['upload_case_import']
    upload.reset()
    this.refresh()
    this.close()
  }

  private mounted() {
  }
  @Watch('costMel')
  private onCostMelChange() {
    this.refresh(); //清除数据
  }
  private proving1(){
    this.form.momey=this.form.momey.replace(/[^\.\d]/g,'');
  }
  private setForm(form) {
    const upload: any = this.$refs['upload_case_import']
    upload.reset()
    this.form = { ...form }
    this.form.fileList = [...form.fileList]
  }
  private commit() {
    const form: any = this.$refs.form;
    form.validate(valid => {
      if (!valid) {
        return;
      }
      if (this.form.fileList.length === 0) {
        this.$message('请上传导入文件')
        return
      }
      const temp = this.form.fileList.map(val => val.response.id)
      this.form.payEvi = temp.join()
      this.form.assistId = this.costMel.assistId;
      console.log('this.form.assistId ====> ',this.form.assistId);
      this.outsourceLawsuitService.saveOrUpdateCostRecord(this.form).subscribe(
        data => {
          const upload: any = this.$refs['upload_case_import']
          upload.reset()
          this.$message.success("新增成功!");
          this.refreshList();
          this.refresh(); //清除数据
          this.close();
        }
      );
    });
  }

  private refresh() {
    const addForm: any = this.$refs['form'];
    addForm.resetFields();
    console.log('清除数据')
      this.form = {
      id: "",
      createTime: "",
      operatorId: "",
      operatorRealName: "",
      costType: "",
      costEvent: "",
      momey: "",
      payTime: "",
      payEvi: "",
      remark: "",
      operatorName: "",
      fileList: [],
      assistId:'',
    };
  }
}
</script>

<style lang="less" scoped>
</style>
