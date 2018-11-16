<template>
  <section class="component modify-company">
    <el-form :rules="companyRules" :model="companyModel" ref="form" label-width="90px" class="tableInput">
      <el-form-item label="公司名称" prop="companyName">
        <el-input type="input" v-model="companyModel.companyName"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input type="input" v-model="companyModel.companyAddress"></el-input>
      </el-form-item>
      <el-form-item label="公司电话" prop="companyPhone">
        <el-input type="input" v-model="companyModel.companyPhone"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="companyStatus">
        <el-select v-model="companyModel.companyStatus" placeholder="请选择" clearable>
          <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="close">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CompanyService } from '~/services/management-service/company.service';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';


@Component({
  components: {},
})
export default class ModifyCompany extends Vue {
  @Dependencies(CompanyService)
  private companyService: CompanyService;

  // 公司数据实体
  private companyModel: any = {
    companyAddress: '',
    companyName: '',
    companyPhone: '',
    companyStatus: '',
    id:'',
  };
  private companyRules: any = {
    companyName: [
      { required: true, message: '请输入公司名称', trigger: 'blur' },
    ],
    companyAddress: [
      { required: true, message: '请输入公司地址', trigger: 'blur' },
    ],
    companyPhone: [
      { required: true, message: '请输入公司电话', trigger: 'blur' },
    ],
    companyStatus: [{ required: true, message: '请选择状态', trigger: 'blur' }],
  };

  @Emit('refreshList')
  private refreshList() {}

  @Emit('close')
  private close() {
    this.reset()
  }

  /**
   * 重置form
   */
  private reset() {
    const Form: any = this.$refs["form"];
    Form.resetFields();
  }

  /**
   * 反显数据
   */
  private update(data: any) {
    if(!data.id) return
    this.companyModel = {...data}
  }

  /**
   * 提交验证并并与数据库交互
   */
  private commit() {
    const form: any = this.$refs.form;
    form.validate((valid) => {
      if (!valid) {
        return;
      }
      const result = this.companyModel.id ? this.updateCompany() : this.addCompany();
      if (result) {
        this.close(); 
        this.companyModel = {};     
      }
    });
  }

  /**
   * 新增公司
   */
  private addCompany(): boolean {
    this.companyService.createCompany(this.companyModel).subscribe(
      (data) => {
        this.$message.success('新增成功!');
        this.refreshList();
      },
      ({ msg }) => {
        return false;
      },
    );
    return true;
  }

  /**
   * 修改公司
   */
  private updateCompany(): boolean {
    this.companyService.modify(this.companyModel).subscribe(
      (data) => {
        this.$message.success('修改成功!')
        this.refreshList();
      },
      (err) => {
        return false;
      },
    );
    return true;
  }
}
</script>

<style lang="less" scoped>

</style>
