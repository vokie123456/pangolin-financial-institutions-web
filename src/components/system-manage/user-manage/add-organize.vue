<template>
  <!--添加机构-->
  <section class="component add-organize">
    <el-form :rules="addOrganizeRules" :model="addOrgModel" ref="addOrg" label-width="130px">
      <el-form-item label="机构名称" prop="deptName">
        <el-input v-model="addOrgModel.deptName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="组织机构类型" prop="deptType">
        <el-select v-model="addOrgModel.deptType" placeholder="请选择" size="small">
          <el-option v-for="{code,name,index} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="状态 " prop="">
        <el-select v-model="addOrgModel.deptStatus" size="small">
          <el-option v-for="{code,name,index} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item v-if="isSupperAdmin" label="公司名称" prop="companyCode">
        <el-select size="small" v-model="addOrgModel.companyCode">
          <el-option v-for="(item, index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input type="textarea" v-model="addOrgModel.description" :autosize="{ minRows:2, maxRows:4}" :maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row type="flex" justify="center">
          <el-button @click="close()">取消</el-button>
          <el-button @click="addOrganizeCommit">确定</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { State, Getter } from 'vuex-class';
import { DepartmentService } from '~/services/management-service/department.service';
import { CompanyService } from '~/services/management-service/company.service';
@Component({
  components: {},
})
export default class AddOrganize extends Vue {
  @Dependencies(DepartmentService)
  private departmentService: DepartmentService;
  @Dependencies(CompanyService)
  private companyService: CompanyService;
  @State
  private companyList: any;
  @Getter
  private isSupperAdmin: boolean;

  private addOrgModel: any = {
    companyCode: '',
    deptField: '123',
    deptName: '',
    deptType: '',
    description: '',
    parentId: '1',
    deptStatus: 'ENABLED',
  };

  /**
   * 添加机构信息校验规则
   */
  private addOrganizeRules: any = {
    deptName: { required: true, message: '请输入机构名称', trigger: 'blur' },
    deptType: { required: true, message: '请选择组织机构', trigger: 'change' },
    companyName: {
      required: true,
      message: '请选择公司名称',
      trigger: 'change',
    },
  };

  /**
   * 关闭窗口
   */
  public close() {
    const form: any = this.$refs['addOrg'];
    form.resetFields();
    this.$emit('close');
  }

  public refresh(adddata) {
    if (!adddata) {
      return;
    }

    this.addOrgModel.parentId = adddata.id;
    this.addOrgModel.companyCode = adddata.companyCode;
    this.addOrgModel.deptType = adddata.deptType;
  }
  private mounted() {}
  /**
   * 添加机构确认
   */
  private addOrganizeCommit() {
    const form: any = this.$refs['addOrg'];
    form.validate((valid) => {
      if (valid) {
        this.departmentService.createDepartment(this.addOrgModel).subscribe(
          (data) => {
            this.$message.success('添加机构成功');
            this.$emit('refresh');
            this.close();
          }
        );
      }
    });
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.data-grid {
  margin-bottom: 10px;
}

.header {
  border: solid 1px #dee1e5;
  border-bottom: 0px;
  height: 40px;
  line-height: 40px;
}
</style>
