<template>
  <!--角色管理-->
  <section class="page role-manage">
    <data-form :model="roleModel" @onSearch="refreshData" :page="pageService">
      <template slot="default-input">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleModel.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="roleStatus">
          <el-select v-model="roleModel.roleStatus" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="dialog.modify = true,roleObj = null;">新增角色</el-button>
      </template>
    </data-form>
    <data-box :data="roleDataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(2)">
          <template slot-scope="scope">
            <el-button type="text" @click="dialog.modify = true, roleObj = Object.assign({},scope.row)">修改</el-button>
            <el-button type="text" @click="dialog.module = true, roleObj = scope.row">设置权限</el-button>
            <el-button type="text" @click="dialog.list = true, roleObj = scope.row">用户列表</el-button>
            <el-button type="text" @click="deleteClick(scope)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="角色描述" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="roleStatus" label="状态" :formatter="(row) => $filter.dictConvert(row.roleStatus,'CommonState')" :min-width="$helper.getColumnWidth(2)">
        </el-table-column>
        <el-table-column prop="createTime" label="更新时间" :formatter="(row) => $filter.dateFormat(row.createTime)" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="operatorRealName" label="操作人" :min-width="$helper.getColumnWidth(2)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
    <!--用户列表弹框-->
    <el-dialog title="用户列表" :center="true" :visible.sync="dialog.list" width="55%" @open="$nextTick(()=>$refs['user-list'].refresh(roleObj.id))">
      <user-list ref="user-list"></user-list>
    </el-dialog>

    <!--新增/修改角色弹出框-->
    <el-dialog :title="roleObj?'修改角色':'新增角色'" :center="true" :visible.sync="dialog.modify" width="30%">
      <modify-role :roleData="roleObj" @close="dialog.modify = false" @refreshList="refreshData" ref="modify-role"></modify-role>
    </el-dialog>

    <!--角色模块权限弹出框-->
    <el-dialog title="角色模块权限" :center="true" :visible.sync="dialog.module" width="60%" @open="$nextTick(()=>$refs['module-permission'].refresh(roleObj))">
      <module-permission ref="module-permission" @close="dialog.module = false" @refreshList="refreshData"></module-permission>
    </el-dialog>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { RoleService } from '~/services/management-service/role.service';
import { PageService } from '~/utils/page.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import ModifyRole from '~/components/system-manage/role-mangae/modify-role.vue';
import ModulePermission from '~/components/system-manage/role-mangae/module-permission.vue';
import UserList from '~/components/system-manage/role-mangae/user-list.vue';
import { State, Getter, Action, namespace } from 'vuex-class';

const systemManage = namespace("system-manage")

// @Auth(854)
@Layout('workspace')
@Component({
  components: {
    ModulePermission,
    ModifyRole,
    UserList,
    DataForm,
    DataBox,
  },
})
export default class RoleManage extends Vue {
  @Dependencies(RoleService)
  private roleService: RoleService;
  @Dependencies(PageService)
  private pageService: PageService;
  @systemManage.Action 
  private updateResource;
  private roleModel: any = {
    roleName: '',
    roleStatus: '',
  };
  private roleDataSet = null;
  private roleObj: any = {};
  private dialog: any = {
    modify: false,
    module: false,
    list: false,
  };

  /**
   * 获取角色列表
   */
  public refreshData() {
    this.roleService.getAllRoles(this.roleModel, this.pageService).subscribe(
      (data) => {
        this.roleDataSet = data;
      }
    );
  }

  private mounted() {
    this.refreshData();
    this.updateResource()
  }
}
</script>

<style lang="less">
</style>
