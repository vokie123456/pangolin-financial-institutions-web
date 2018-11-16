<template>
  <!-- 分配角色 -->
  <section class="component allot-role">
    <data-form :model="model" @onSearch="refreshData" ref="data-form" :page="pageService">
      <template slot="default-input">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="model.roleName"></el-input>
        </el-form-item>
      </template>
    </data-form>
    <data-box :data="dataSet" @onPageChange="refreshData" :page="pageService" :selectionList.sync="selectionRow" ref="data-box">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="roleName" label="角色名称" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="角色描述" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
      </template>
    </data-box>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-button @click="close">取消</el-button>
      <el-button @click="confirm">确定</el-button>
    </el-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { UserService } from '~/services/management-service/user.service';
import { RoleService } from '~/services/management-service/role.service';
import { Emit, Prop } from 'vue-property-decorator';

@Component({
  components: {
    DataForm,
    DataBox,
  },
})
export default class AllotRole extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(RoleService)
  private roleService: RoleService;
  @Prop()
  private user: any;
  @Prop()
  private companyCode: any;
  private model: any = {
    roleName: '',
    companyCode: this.companyCode,
    roleStatus: 'ENABLED',
  };
  private selectionRow: any = [];
  // 设置角色对象
  private roleSetModel: any = {
    roleIds: [],
    userId: '',
    caseSwitch: '',
    userIds: [],
    userLevel: 'A',
  };
  private dataSet: any = null;

  @Emit('refreshList')
  public refreshList() {}
  @Emit('close')
  public close() {
    const databox: any = this.$refs['data-box'];
    databox.clearSelection();
    this.model.roleName = '';
  }
  // 刷新数据
  public refreshData() {
    this.selectionRow = [];
    this.roleService.getAllRoles(this.model, this.pageService).subscribe(
      (data) => {
        this.dataSet = data;
        this.user.roleIds.forEach((v, index) => {
          this.selectionRow.push(data.find((value) => value.id === v));
        });
      }
    );
  }

  private confirm() {
    if (this.selectionRow.length === 0) {
      this.$message.info('请选择角色');
      return;
    }
    this.roleSetModel.userId = this.user.id;
    this.roleSetModel.roleIds = this.selectionRow.map((x) => x.id);
    this.roleSetModel.userIds = [this.user.id];
    this.roleSetModel.caseSwitch = this.user.caseSwitch;
    this.userService.batchAllotRole(this.roleSetModel).subscribe(
      (data) => {
        this.$message.success('分配成功');
        this.close();
        this.refreshList();
      }
    );
  }
}
</script>

<style lang="less" scoped>
</style>
