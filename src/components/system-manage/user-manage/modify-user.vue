<template>
  <!-- 修改用户 -->
  <section class="component modify-user">
    <el-form :rules="rules" :model="modifyModel" ref="modifyUser-form" label-width="100px" align="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="modifyModel.realName" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号" prop="userName">
            <el-input v-model="modifyModel.userName" size="small" :maxlength="25" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属机构">
            <el-cascader v-model="deptIds" :options="departmentData" :props="{value:'id',label:'deptName'}" change-on-select :show-all-levels="false" @change="orgChange"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构类型" prop="deptType">
            <el-select v-model="modifyModel.deptType" placeholder="请选择" size="small" disabled>
              <el-option v-for="{code,name,index} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分案开关" prop="caseSwitch">
            <el-select v-model="modifyModel.caseSwitch" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="userStatus">
            <el-select v-model="modifyModel.userStatus" size="small">
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="催收员等级" min-width="140px">
            <el-select v-model="modifyModel.userLevel" placeholder="请选择" size="small">
              <el-option v-for="{code,name,index} in $dict.getDictData('UserLevel')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="modifyModel.phone" size="small" :maxlength="13"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="modifyModel.userEmail" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item scope="scope" label-width="0px" align="center">
        <el-button @click="modifyUserCancel">取消</el-button>
        <el-button @click="commit">确定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { State, Getter } from 'vuex-class';
import { UserService } from '~/services/management-service/user.service';
import { Emit, Prop } from 'vue-property-decorator';
import clone from 'clone';

@Component({
  components: {},
})
export default class ModifyUser extends Vue {
  @Dependencies(UserService)
  private userService: UserService;
  @Prop()
  private deptId: any;
  @Prop()
  private user: any;
  @State
  private companyList: any;
  @State
  private departmentList: any;
  @Getter
  private departmentData;

  private modifyModel: any = {
    userEmail: '',
    userLevel: '',
    userStatus: '',
    caseSwitch: '',
    userName: '',
    realName: '',
    companyCode: '',
    deptId: '',
    password: '888888',
    id: '',
    deptType: '',
  };
  private rules: any = {
    realName: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      {
        message: '请输入汉字或英文字母',
        trigger: 'blur',
        pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/,
      },
    ],
    userName: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      {
        message: '用户名只能包含数字、字母、下划线',
        trigger: 'blur',
        pattern: /^([A-Za-z0-9_-]+)$/,
      },
      { min: 6, message: '请输入6位以上数字、字母、下划线', trigger: 'blur' },
    ],
    phone: [
      {
        message: '请输入正确的电话号码',
        trigger: 'blur',
        pattern: /^[-0-9()（）]{7,18}$/,
      },
    ],
    userEmail: [
      { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
      { min: 1, max: 50, message: '邮箱长度不能超过50位', trigger: 'blur' },
    ],
  };

  private deptIds: any = [];
  @Emit('refreshList')
  public refreshList() {}
  @Emit('close')
  public close() {}

  public reset() {
    const modifyForm: any = this.$refs['modifyUser-form'];
    modifyForm.resetFields();
  }

  public refresh(obj) {
    this.modifyModel = clone(obj);
    this.modifyModel.deptType = obj.deptType;
    this.deptIds = [];
    this.getDeptIds(this.user.deptId);
  }

  /**
   * 机构改变
   */
  private orgChange() {
    if (this.deptIds.length < 1) {
      return;
    }
    const deptId = this.deptIds[this.deptIds.length - 1];
    const deptModel: any = this.departmentList.find((x) => x.id === deptId);
    // this.modifyModel.department = deptModel;
    this.modifyModel.deptId = deptModel.id;
    this.modifyModel.deptName = deptModel.deptName;
    this.modifyModel.deptType = deptModel.deptType;
  }

  private getDeptIds(id: string) {
    const dept = this.departmentList.find((x) => x.id === id);
    if (dept) {
      this.deptIds.unshift(id);
      this.getDeptIds(dept.parentId);
    }
  }

  /**
   * 新增用户取消
   */
  private modifyUserCancel() {
    //   重置form表单
    const addForm: any = this.$refs['modifyUser-form'];
    addForm.resetFields();
    this.deptIds = [];
    //   关闭dialog
    this.$emit('close');
  }

  private commit() {
    const modifyForm: any = this.$refs['modifyUser-form'];
    modifyForm.validate((valid) => {
      if (!valid) return false;
      this.userService.modifyUser(this.modifyModel).subscribe(
        (data) => {
          this.reset();
          this.$emit('close');
          this.$message.success('修改成功!');
          this.deptIds = [];
          //   刷新databox
          this.$emit('refresh');
        }
      );
    });
  }
}
</script>

<style lang="less" scoped>
</style>
