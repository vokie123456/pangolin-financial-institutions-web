<template>
  <!--修改机构-->
  <section class="component modify-organize">
    <el-form :rules="editOrganizeRules" :model="editOrgModel" ref="editOrg" label-width="130px">
      <el-form-item label="机构名称" prop="deptName">
        <el-input v-model="editOrgModel.deptName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="组织机构类型" prop="deptType">
        <el-select v-model="editOrgModel.deptType" placeholder="请选择" size="small" disabled>
          <el-option v-for="{code,name,index} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="deptStatus">
        <el-select v-model="editOrgModel.deptStatus" placeholder="请选择" disabled>
          <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="isSupperAdmin" label="公司名称" prop="companyCode">
        <el-select size="small" v-model="editOrgModel.companyCode" disabled>
          <el-option v-for="(item, index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input type="textarea" v-model="editOrgModel.description" :autosize="{ minRows:2, maxRows:4}" :maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row type="flex" justify="center">
          <el-button @click="close()">取消</el-button>
          <el-button @click="editOrganizeCommit()">确定</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { State, Mutation, Getter, namespace } from "vuex-class";
import { DepartmentService } from "~/services/management-service/department.service";
import { Emit, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class ModifyOrganize extends Vue {
  @Dependencies(DepartmentService)
  private departmentService: DepartmentService;

  @State
  private companyList;
  @Getter
  private isSupperAdmin: boolean;

  @Prop()
  private editData: any;

  // 修改机构参数
  private editOrgModel: any = {
    deptField: "123",
    companyCode: "",
    deptName: "",
    deptStatus: "",
    description: "",
    id: 0,
    parentId: 0,
    deptType: ""
  };
  /**
   * 添加机构信息校验规则
   */
  private editOrganizeRules: any = {
    deptName: [{ required: true, message: "请输入机构名称", trigger: "blur" }]
  };

  private disabled: boolean = false;

  /**
   * 获取要修改的当前行数据
   */
  public refresh() {
    Object.keys(this.editOrgModel).forEach(x => {
      if (this.editData[x] !== undefined) {
        this.editOrgModel[x] = this.editData[x];
      }
    });
    this.disabled = this.editData.level > 8;
  }

  /**
   * 关闭窗口
   */
  public close() {
    const form: any = this.$refs["editOrg"];
    form.resetFields();
    this.$emit("close");
  }

  /**
   * 修改机构确认
   */
  private editOrganizeCommit() {
    const form: any = this.$refs["editOrg"];
    form.validate(valid => {
      if (valid) {
        this.editOrgModel.deptField = "123";
        this.departmentService.updateDepartment(this.editOrgModel).subscribe(
          data => {
            this.$message.success("修改机构成功!");
            // 刷新机构数
            this.$emit("refresh");
            //   关闭dialog
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
