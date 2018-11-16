<template>
  <!--机构与用户管理-->
  <section class="page user-manage">
    <el-row type="flex">
      <el-col class="tree">
        <el-col class="text-right tree-header">
          <el-button @click="onAdd">添加机构</el-button>
        </el-col>
        <origanize-tree @edit="onEdit" @add="onAdd" @remove="onRemove" @change="onChange" isIcon="true" ref="orgTree" :dataList="orgInfo"></origanize-tree>
      </el-col>
      <el-col class="manage-header">
        <data-form :model="userModel" @onSearch="refreshData" :page="pageService">
          <template slot="default-input">
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="userModel.realName"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="userModel.userName"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="userStatus">
              <el-select v-model="userModel.userStatus" size="small" clearable="">
                <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <template slot="default-button">
            <el-button @click="dialog.addUser = true">新增用户</el-button>
            <el-button @click="batchRoleClick">批量分配角色</el-button>
            <el-button @click="batchOpenClick">开启分案</el-button>
            <el-button @click="batchCloseClick">关闭分案</el-button>
            <el-button @click="batchLevelClick">催收员等级</el-button>
            <!-- <el-button @click="batchDeviceManage">批量设备管理</el-button> -->
          </template>
        </data-form>
        <data-box :data="userDataSet" :selectionList.sync="selectionList" @onPageChange="refreshData" :page="pageService" ref="data-box">
          <template slot="columns">
            <el-table-column label="操作" :min-width="$helper.getOperateWidth(4)">
              <template slot-scope="scope">
                <el-button type="text" @click="dialog.modify=true,userObj=scope.row">修改用户</el-button>
                <el-button type="text" @click="dialog.roleAllot=true,userObj=scope.row">分配角色</el-button>
                <el-button type="text" size="small" @click="resetClick(scope)">重置密码</el-button>
                <el-button type="text" size="small" @click="dialog.facility=true,userObj=scope.row">设备管理</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="realName" label="姓名" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="userName" label="用户名" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="userLevel" label="催收员等级" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.userLevel,'UserLevel')" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="deptName" label="机构" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="deptType" label="催收类型" :formatter="(row) => $filter.dictConvert(row.deptType,'DepartmentType')" :min-width="$helper.getColumnWidth(4)">
            </el-table-column>
            <el-table-column prop="userStatus" label="状态" :formatter="(row) => $filter.dictConvert(row.userStatus,'CommonState')" :min-width="$helper.getColumnWidth(3)">
            </el-table-column>
            <el-table-column prop="caseSwitch" label="分案开关" :formatter="(row) => $filter.dictConvert(row.caseSwitch,'CommonState')" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phone" label="电话" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="userEmail" label="邮箱" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="operatorRealName" label="创建人" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
            </el-table-column>
          </template>
        </data-box>
        <!--批量分配角色-->
        <el-dialog title="批量分配角色" :center="true" :visible.sync="dialog.batchRole" width="600px" @open="$nextTick(()=>$refs['batch-allot-role'].refresh())" :close-on-click-modal="false" :close-on-press-escape="false">
          <batch-allot-role :companyCode="companyCode" :userList="selectionList" ref="batch-allot-role" @refreshList="refreshData" @close="dialog.batchRole = false"></batch-allot-role>
        </el-dialog>
        <!--分配角色-->
        <el-dialog title="分配角色" :center="true" :visible.sync="dialog.roleAllot" width="600px" @open="$nextTick(()=>$refs['allot-role'].refreshData())" :close-on-click-modal="false" :close-on-press-escape="false">
          <allot-role ref="allot-role" :companyCode="companyCode" :user="userObj" @refreshList="refreshData" @close="dialog.roleAllot = false"></allot-role>
        </el-dialog>
        <!--设备管理-->
        <el-dialog title="设备管理" :center="true" :visible.sync="dialog.facility" width="60%" @open="$nextTick(()=>$refs['facility-manage'].refresh(userObj))" :close-on-click-modal="false" :close-on-press-escape="false">
          <facility-manage ref="facility-manage"></facility-manage>
        </el-dialog>
        <!-- 批量设备管理 -->
        <el-dialog title="批量设备管理" :center="true" :visible.sync="dialog.batchFacility" width="700px" @open="$nextTick(()=>$refs['batch-facility'].refresh(selectionList))">
          <batch-facility ref="batch-facility" @refreshList="refreshData"></batch-facility>
        </el-dialog>
        <!--批量设置催收员等级-->
        <el-dialog title="批量设置催收员等级" :center="true" :visible.sync="dialog.batchLevel" width="20%" @open="$nextTick(()=>$refs['batch-collector-level'].refresh())" :close-on-click-modal="false" :close-on-press-escape="false">
          <batch-collector-level :userList="selectionList" @refreshList="refreshData" ref="batch-collector-level" @close="dialog.batchLevel = false"></batch-collector-level>
        </el-dialog>
        <!--修改用户-->
        <el-dialog title="修改用户" :center="true" :visible.sync="dialog.modify" width="50%" @open="$nextTick(()=>$refs['modify-user'].refresh(userObj))" :close-on-click-modal="false" :close-on-press-escape="false">
          <modify-user ref="modify-user" @refreshList="refreshData" @close="dialog.modify = false" :user="userObj" :deptId="deptId" @refresh="refreshData"></modify-user>
        </el-dialog>
        <!--新增用户-->
        <el-dialog title="新增用户" @open="getdeptId" @close="dialog.addUser = false" :visible.sync="dialog.addUser" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
          <add-user @close="dialog.addUser=false" @refresh="refreshData" ref="dept" :deptId="deptId" :password="userObj.password"></add-user>
        </el-dialog>
        <!--添加机构-->
        <el-dialog title="添加机构" @open="dialogOpen" @close="dialog.addOrganizeFlag = false" :visible.sync="dialog.addOrganizeFlag" width="450px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <add-organize @close="dialog.addOrganizeFlag=false" @refresh="updateOrgNameInfo()" :deptId="deptId" ref="add-dept"></add-organize>
        </el-dialog>
        <!--修改机构-->
        <el-dialog title="修改机构" @open="getOragnize" @close="dialog.editOrganizeFlag = false" :visible.sync="dialog.editOrganizeFlag" width="450px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <modify-organize @refresh="updateOrgNameInfo()" ref="edit" :editData="editdata" @close="dialog.editOrganizeFlag=false"></modify-organize>
        </el-dialog>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { Action, State, Mutation, Getter, namespace } from 'vuex-class';
import { DepartmentService } from '~/services/management-service/department.service';
import { UserService } from '~/services/management-service/user.service';
import { LoginService } from '~/services/management-service/login.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import BatchAllotRole from '~/components/system-manage/user-manage/batch-allot-role.vue';
import AllotRole from '~/components/system-manage/user-manage/allot-role.vue';
import FacilityManage from '~/components/system-manage/user-manage/facility-manage.vue';
import DepartmentTree from '~/components/system-manage/department-tree.vue';
import ModifyUser from '~/components/system-manage/user-manage/modify-user.vue';
import AddUser from '~/components/system-manage/user-manage/add-user.vue'; // 新增用户
import OriganizeTree from '~/components/system-manage/user-manage/origanize-tree.vue';
import AddOrganize from '~/components/system-manage/user-manage/add-organize.vue';
import ModifyOrganize from '~/components/system-manage/user-manage/modify-organize.vue';
import BatchCollectorLevel from '~/components/system-manage/user-manage/batch-collector-level.vue';
import BatchFacility from '~/components/system-manage/user-manage/batch-facility.vue';

import { CommonService } from '~/utils/common.service';
const systemManageModule = namespace('system-manage');

// @Auth(14)
@Layout('workspace')
@Component({
  components: {
    ModifyUser,
    DepartmentTree,
    FacilityManage,
    AllotRole,
    BatchAllotRole,
    DataForm,
    DataBox,
    AddUser,
    OriganizeTree,
    AddOrganize,
    ModifyOrganize,
    BatchCollectorLevel,
    BatchFacility,
  },
})
export default class UserManage extends Vue {
  @Dependencies(DepartmentService)
  private departmentService: DepartmentService;
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(LoginService)
  private loginService: LoginService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Action
  private getDepartmentList;
  @Action
  private getCompanyList;
  @systemManageModule.State
  private orgInfo;
  @systemManageModule.Action
  private updateOrgNameInfo;

  private userDataSet = null;
  private userModel: any = {
    userName: '',
    realName: '',
    userStatus: '',
    deptCode: '',
  };
  private userObj: any = {};
  private companyCode: any = '';
  private dialog: any = {
    modify: false,
    batchRole: false,
    roleAllot: false,
    facility: false,
    batchFacility: false,
    addUser: false,
    editOrganizeFlag: false,
    addOrganizeFlag: false,
    batchLevel: false,
  };
  private editdata: any = {};
  private selectionList: any[] = [];
  private userList: any = [];
  private status: any = 0;
  private deptId: string = '';
  private dept: any = '';
  private defaultParams: any = {
    deptCode: '',
  };
  private pid: any = '';
  private deptCode: any = '';
  private openModel: any = {
    userIds: [],
    caseSwitch: '',
  };

  private refresh(formName) {
    this.$nextTick(() => {
      const form: any = this.$refs[formName];
      form.refresh();
    });
  }
  /**
   * 修改机构open事件(获取机构)
   */
  private getOragnize() {
    this.$nextTick(() => {
      const edit: any = this.$refs['edit'];
      edit.refresh();
    });
  }
  /**
   * 新增用户open事件
   */
  private getdeptId() {
    this.$nextTick(() => {
      const dept: any = this.$refs['dept'];
      dept.refresh(this.dept);
    });
  }
  private dialogOpen() {
    this.$nextTick(() => {
      const addUser: any = this.$refs['add-dept'];
      addUser.refresh(this.dept);
    });
  }
  /**
   * 重置密码
   */
  private resetClick(scope) {
    this.$confirm(`您确定要对用户${scope.row.userName}重置密码吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.userService
          .modifyUserPassword({
            userId: scope.row.id,
          })
          .subscribe(
            (data) => {
              this.$message.success('重置密码成功');
            }
          );
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置',
        });
      });
  }
  /**
   * 批量分配角色
   */
  private batchRoleClick() {
    if (this.selectionList.length === 0) {
      this.$alert('请选择要分配角色的用户', '提示', {
        confirmButtonText: '确定',
      });
    } else {
      this.dialog.batchRole = true;
    }
  }
  /**
   * 批量设备管理
   */
  private batchDeviceManage() {
    if (this.selectionList.length === 0) {
      this.$message('请选择要操作的用户');
    } else {
      this.dialog.batchFacility = true;
    }
  }
  /**
   * 批量开启分案
   */
  private batchOpenClick() {
    if (this.selectionList.length === 0) {
      this.$alert('请选择要分配角色的用户', '提示', {
        confirmButtonText: '确定',
      });
    } else {
      this.openModel.userIds = this.selectionList.map((v) => v.id);
      this.openModel.caseSwitch = 'ENABLED';
      this.userService.batchCaseSwitch(this.openModel).subscribe((data) => {
        this.$message.success('开启成功!');
        this.refreshData();
      });
    }
  }
  /**
   * 批量开启分案
   */
  private batchCloseClick() {
    if (this.selectionList.length === 0) {
      this.$alert('请选择要分配角色的用户', '提示', {
        confirmButtonText: '确定',
      });
    } else {
      this.openModel.userIds = this.selectionList.map((v) => v.id);
      this.openModel.caseSwitch = 'DISABLED';
      this.userService.batchCaseSwitch(this.openModel).subscribe((data) => {
        this.$message.success('关闭成功!');
        this.refreshData();
      });
    }
  }
  /**
   * 批量更改催收员等级
   */
  private batchLevelClick() {
    if (this.selectionList.length === 0) {
      this.$alert('请选择要分配角色的用户', '提示', {
        confirmButtonText: '确定',
      });
    } else {
      this.dialog.batchLevel = true;
    }
  }
  private refreshData() {
    this.userService.getAllUsers(this.userModel, this.pageService).subscribe(
      (data) => {
        this.userDataSet = data;
        this.companyCode = data[0] ? data[0].companyCode : '';
      }
    );
  }

  /**
   * 点击获取机构id
   */
  private onChange(value) {
    this.userModel.deptCode = value.deptCode;
    this.deptId = value.id;
    this.dept = value;
    this.refreshData();
  }

  private onEdit(value) {
    this.dialog.editOrganizeFlag = true;
    this.editdata = value;
  }
  private onAdd(value) {
    this.dialog.addOrganizeFlag = true;
  }
  /**
   * 移除机构
   */
  private onRemove(value) {
    this.$confirm('此操作将永久删除该组织机构, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.departmentService.deleteDepartment(value.id).subscribe(
          (data) => {
            this.updateOrgNameInfo();
            this.$message.success('删除成功!');
          }
        );
      })
  }

  private mounted() {
    this.updateOrgNameInfo();
    this.getCompanyList();
  }
}
</script>

<style lang="less" scoped>
.page.user-manage {
  .tree-header {
    padding: 10px 20px;
    border-bottom: 1px solid #e4e4e4;
  }
  .manage-header {
    margin-left: 20px;
    width: 500px;
    flex-grow: 2;
  }
  .tree {
    flex-basis: 250px;
    border: 1px solid #e4e4e4;
    min-height: 595px;
    overflow: atuo;
  }
}
</style>
