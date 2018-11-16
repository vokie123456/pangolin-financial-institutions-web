<template>
  <!--新增用户-->
  <div class="page">
    <el-form :rules="rules" :model="addParams" ref="add-form" label-width="100px" align="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="addParams.realName" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号" prop="userName">
            <el-input v-model="addParams.userName" size="small" :maxlength="25"></el-input>
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
            <el-select v-model="addParams.deptType" placeholder="请选择" size="small" disabled>
              <el-option v-for="{code,name,index} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分案开关" prop="caseSwitch">
            <el-select v-model="addParams.caseSwitch" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="userStatus">
            <el-select v-model="addParams.userStatus" size="small">
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="催收员等级" min-width="140px">
            <el-select v-model="addParams.userLevel" placeholder="请选择" size="small">
              <el-option v-for="{code,name,index} in $dict.getDictData('UserLevel')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="addParams.phone" size="small" :maxlength="13"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="addParams.userEmail" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div class="confirm-button">
      <el-button @click="addUserCancel">取消</el-button>
      <el-button @click="addUserCommit">确定</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { State, Mutation, Getter, namespace } from 'vuex-class';
import { UserService } from '~/services/management-service/user.service';
import { DepartmentService } from '~/services/management-service/department.service';
import { Emit, Prop } from 'vue-property-decorator';
const systemManageModule = namespace('system-manage');

@Component({
  components: {},
})
export default class AddUser extends Vue {
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(DepartmentService)
  private departmentService: DepartmentService;
  @Prop()
  private deptId: any;
  @Prop()
  private password: any;
  @State
  private companyList: any;
  @State
  private departmentList: any;
  @systemManageModule.State
  private orgInfo;
  @Getter
  private departmentData;
  @State
  private userData;

  private addParams: any = {
    userEmail: '',
    userLevel: 'C',
    userStatus: 'ENABLED',
    caseSwitch: 'ENABLED',
    userName: '',
    realName: '',
    companyCode: '',
    deptId: '',
    password: '',
    deptType: '',
  };
  private typeList: any = [];
  private userDatas: any = '';
  private companyNames: any = [];
  private deptIds: any = [];
  private isIcon: boolean = false;
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
    phone: { validator: this.$validator.phoneNumber, trigger: 'blur' },
    userEmail: [
      { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
      { min: 1, max: 50, message: '邮箱长度不能超过50位', trigger: 'blur' },
    ],
  };

  public refresh(dept) {
    this.addParams.companyCode = dept.companyCode;
    this.addParams.deptType = dept.deptType;
    this.addParams.deptId = dept.id;
    this.addParams.department = dept;
    this.deptIds = [];
    this.getDeptIds(dept.id);
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
    this.addParams.department = deptModel;
    this.addParams.deptType = deptModel.deptType;
  }

  private getDeptIds(id: string) {
    const dept = this.departmentList.find((x) => x.id === id);
    if (dept) {
      this.deptIds.unshift(id);
      if (dept.parentId) {
        this.getDeptIds(dept.parentId);
      }
    }
  }

  /**
   * 新增用户确认
   */
  private addUserCommit() {
    const addForm: any = this.$refs['add-form'];
    addForm.validate((valid) => {
      if (!valid) return false;
      this.addParams.password = this.password;
      this.userService.createUser(this.addParams).subscribe(
        (data) => {
          //   重置form表单xr
          const addForm: any = this.$refs['add-form'];
          addForm.resetFields();
          this.addParams.deptId = '';
          this.deptIds = [];
          //   关闭dialog
          this.$emit('close');
          this.$message.success('新增用户成功!');
          //   刷新databox
          this.$emit('refresh');
        },
        ({ msg }) => {
          this.$message(msg);
        },
      );
    });
  }
  /**
   * 新增用户取消
   */
  private addUserCancel() {
    //   重置form表单
    const addForm: any = this.$refs['add-form'];
    addForm.resetFields();
    this.addParams.deptId = '';
    this.deptIds = [];
    //   关闭dialog
    this.$emit('close');
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
