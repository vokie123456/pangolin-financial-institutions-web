<template>
  <!--通讯录 添加联系人 -->
  <section class="component add-contact">
    <el-form ref='form' :rules="rules" label-width="120px" :model="model" inline>
      <el-form-item label="与客户关系" prop="relation">
        <el-select placeholder="请选择" v-model="model.relation">
          <el-option v-for="{index,name,code} in $dict.getDictData('Relationship')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="contName">
        <el-input v-model="model.contName"></el-input>
      </el-form-item>
      <el-form-item label="电话类型" prop="phoneType">
        <el-select placeholder="请选择" v-model="model.phoneType">
          <el-option v-for="{index,name,code} in $dict.getDictData('PhoneType')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入号码" prop="phone">
        <el-input v-model="model.phone"></el-input>
      </el-form-item>
      <el-form-item label="号码来源" prop="dataSource">
        <el-select placeholder="请选择" v-model="model.dataSource">
          <el-option v-for="{index,name,code} in $dict.getDictData('DataSource').filter(v => !disabledDataSource.includes(v.code))" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="confirm-button">
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Form } from 'element-ui';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop } from 'vue-property-decorator';
import { CaseOperatorPageService } from "~/services/domain-service/case-operator-page.service";

@Component({
  components: {
  }
})
export default class AddContact extends Vue {
  @Dependencies(CaseOperatorPageService) private caseOperatorPageService: CaseOperatorPageService;
  @Prop({ type: String, required: true })
  private caseId
  private disabledDataSource = ["IMPORT", "INTERFACE"]
  private model: any = {}
  private rules: any = {}

  @Emit("close")
  private emitClose() { }


  private created() {
    this.model = {
      contName: "",
      dataSource: "",
      caseId: "",
      phone: "",
      phoneType: "",
      relation: ""
    }
    this.rules = {
      contName: { required: true, message: "请输入联系人姓名" },
      dataSource: { required: true, message: "请选择号码来源" },
      phone: { required: true, message: "请输入联系人号码" },
      phoneType: { required: true, message: "请选择号码类型" },
      relation: { required: true, message: "请选择客户关系" }
    }
  }

  private submit() {
    const form = this.$refs.form as Form;
    form.validate(v => {
      if (!v) return
      this.model.caseId = this.caseId
      this.caseOperatorPageService.addPersonalContact(this.model).subscribe(
        data => {
          this.$message.success("操作成功")
          form.resetFields()
          this.emitClose()
        }
      )
    })
  }

}
</script>

<style scoped lang="less">
</style>
