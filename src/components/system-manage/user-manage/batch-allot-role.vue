<template>
  <!-- 批量分配角色 -->
  <section class="component batch-allot-role">
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
export default class BatchAllotRole extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(RoleService)
  private roleService: RoleService;
  @Prop()
  private userList: any;
  @Prop()
  private companyCode: any;
  private model: any = {
    roleName: '',
    companyCode: this.companyCode,
    roleStatus: 'ENABLED',
  };
  private selectionRow: any = [];
  private dataSet = null;
  @Emit('refreshList')
  public refreshList() {}
  @Emit('close')
  public close() {}

  public refresh() {
    this.model.roleName = '';
    this.refreshData();
    this.selectionRow = [];
  }
  public confirm() {
    const roleIds = this.selectionRow.map((row) => row.id);
    const userIds = this.userList.map((v) => v.id);
    this.userService.batchAllotRole({ roleIds, userIds }).subscribe(
      (data) => {
        this.$message.success('分配成功');
        this.close();
        this.refreshList();
      }
    );
  }
  public refreshData() {
    this.roleService.getAllRoles(this.model, this.pageService).subscribe(
      (data) => {
        this.dataSet = data;
      }
    );
  }
}
</script>

<style lang="less" scoped>
</style>
