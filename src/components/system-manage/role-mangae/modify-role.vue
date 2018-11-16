<template>
  <!--角色管理-新增/修改角色-->
  <section class="component modify-role">
    <el-form :model="addModel" :rules="rules" ref="form" label-width="90px" class="tableInput">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addModel.roleName" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyCode" v-show="isSupperAdmin">
        <el-select size="small" v-model="addModel.companyCode" :disabled="!isSupperAdmin">
          <el-option v-for="item in companyList" :label="item.companyName" :value="item.companyCode" :key="item.companyCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" align="left" prop="roleStatus">
        <el-select v-model="addModel.roleStatus">
          <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-col :span="18">
          <el-input type="textarea" v-model="addModel.description" :rows="3" :maxlength="500"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="close">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { State, Getter, Action } from "vuex-class";
import { RoleService } from "~/services/management-service/role.service";
import { Emit, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class ModifyRole extends Vue {
  @Getter
  private isSupperAdmin: boolean;
  @State
  private companyList: any;
  @State
  private userData: any;

  @Dependencies(RoleService)
  private RoleService: RoleService;

  @Prop({ type: Object })
  private roleData: any;

  private addModel: any = {
    roleName: "",
    roleStatus: "",
    description: "",
    companyCode: "",
    id: ""
  };
  private rules: any = {
    roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
  };
  @Emit("refreshList")
  public refreshList() { }
  @Emit("close")
  public close() { }

  @Watch("roleData", { immediate: true })
  private onRoleDataChange(val) {
    this.update(val)
  }

  private reset() {
    const from: any = this.$refs["form"];
    from.resetFields();
  }

  /**
   * 反显数据
   */
  private update(data: any) {
    this.$nextTick(() => {
      this.reset()
      if (!data) return
      this.addModel.id = data.id;
      this.addModel.roleName = data.roleName;
      this.addModel.roleStatus = data.roleStatus;
      this.addModel.companyCode = data.companyCode;
      this.addModel.description = data.description;
    })
  }

  /**
   * 提交验证并并与数据库交互
   */
  private commit() {
    const Form: any = this.$refs["form"];
    Form.validate(valid => {
      if (!valid) { return; }
      const result = this.addModel.id ? this.updateRole() : this.addRole();
      if (result) {
        this.close();
        this.addModel.id = "";
        this.addModel.roleName = "";
        this.addModel.roleStatus = "";
        this.addModel.companyCode = "";
        this.addModel.description = "";
      }
    });
  }

  /**
   * 新增角色
   */
  private addRole(): boolean {
    if (!this.isSupperAdmin) {
      this.addModel.companyCode = this.userData.companyCode;
    }
    this.RoleService.createRole(this.addModel).subscribe(
      (data) => {
        this.$message.success('新增成功!');
        this.refreshList();
        this.close();
      },
      ({ msg }) => {
        return false;
      },
    );
    return true;
  }

  /**
   * 修改角色
   */
  private updateRole(): boolean {
    this.RoleService.updateRole(this.addModel).subscribe(
      (data) => {
        this.$message.success('修改成功!');
        this.refreshList();
        this.close();
      },
      ({ msg }) => {
        return false;
      },
    );
    return true;
  }
}
</script>

<style lang="less" scoped>
</style>
