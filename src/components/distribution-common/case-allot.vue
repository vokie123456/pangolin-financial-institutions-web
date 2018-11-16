<template>
  <!-- 手动分案-公共组件 -->
  <section class="component case-allot">
    <el-row style="margin-bottom:15px">
      <span>分配方式：</span>
      <el-radio-group v-model="allotType" size="small">
        <el-radio border label="TO_COLLECTOR">按催收员分配</el-radio>
        <el-radio border label="TO_DEPARTMENT">按机构分配</el-radio>
      </el-radio-group>
    </el-row>
    <el-row type="flex">
      <el-col :span="6" style="height:400px;margin-top:4px;border:1px solid #d1dbe5;overflow:auto">
        <department-tree v-model="currentDept" :departmentData="DepartmentData" ref="department-tree"></department-tree>
      </el-col>
      <el-col :span="18">
        <data-box :page="pageService" :selectionList.sync="display" :data="userDataSet" @onPageChange="refreshData" ref="data-box">
          <template slot="columns">
            <el-table-column prop="userName" label="用户名" :min-width="$helper.getColumnWidth(3)">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" :min-width="$helper.getColumnWidth(3)">
            </el-table-column>
            <el-table-column prop="roleName" label="角色" :min-width="$helper.getColumnWidth(3)">
            </el-table-column>
            <el-table-column prop="deptName" label="所属机构" :min-width="$helper.getColumnWidth(3)">
            </el-table-column>
          </template>
        </data-box>
      </el-col>
    </el-row>
    <div style="text-align:center;margin-top:30px;">
      <el-button @click="close">取消</el-button>
      <el-button @click="next" v-if="allotType === 'TO_COLLECTOR'" :disabled="!selectionList.length">下一步</el-button>
      <el-button @click="submit" v-else>确定</el-button>
    </div>

    <el-dialog title="确认分案" :visible.sync="dialog" width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" @open="$nextTick(()=>$refs['distribution'].refreshData())" append-to-body>
      <distribution :fromChannel="fromChannel" @success="success" @back="dialog=false" @close="close" ref="distribution"> </distribution>
    </el-dialog>

  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import DepartmentTree from '~/components/system-manage/department-tree.vue';
import { Prop, Emit } from 'vue-property-decorator';
import { Dependencies } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import { UserService } from '~/services/management-service/user.service';
import { VisitCaseManageService } from '~/services/domain-service/visit-case-manage.service.ts';
import { TelCaseManageService } from '~/services/domain-service/tel-case-manage.service';
import Distribution from "~/components/distribution-common/distribution.vue";
import { namespace, Getter } from "vuex-class";
import { CASE_CHANNEL } from "~/config/enum.config";

const AllotModule = namespace("case-allot")

@Component({
  components: {
    DataBox,
    DepartmentTree,
    Distribution
  },
})
export default class UserCaseAllot extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(TelCaseManageService)
  private telCaseManageService: TelCaseManageService;
  @Dependencies(VisitCaseManageService)
  private visitCaseManageService: VisitCaseManageService;

  @Getter private callDepartmentData;
  @Getter private visitDepartmentData;

  @AllotModule.State private category;
  @AllotModule.Mutation private updateCategory;
  @AllotModule.Mutation private updateDeptIds;
  @AllotModule.Mutation private updateUserIds;
  @AllotModule.Mutation private updateCaseIds;
  @AllotModule.Getter private distributeModel;

  private selectionList: any[] = [];
  private userDataSet: any[] = [];
  private nowNode: any = null;
  private distributionData: any = {};
  private submitLoading: boolean = false;


  private collectionType = '';
  private dialog = false;


  /**
   * 数据业务来源
   */
  @Prop({ type: String, required: true })
  private fromChannel

  @Emit('refreshList')
  private emitRefreshList() { }
  @Emit('close')
  private emitClose() { }


  private get display() {
    return this.allotType === "TO_DEPARTMENT" ? '' : this.selectionList;
  }

  private set display(v: any) {
    this.selectionList = v;
  }

  private get allotType() {
    return this.category
  }

  private set allotType(val) {
    this.updateCategory(val)
    this.display = []
  }

  private get currentDept() {
    return this.distributeModel.deptIds[0]
  }

  private set currentDept(val) {
    this.updateDeptIds(val.id)
    this.refreshData(val.deptCode)
  }

  private get DepartmentData() {
    if (this.fromChannel === CASE_CHANNEL.tel) {
      return this.callDepartmentData
    }
    if (this.fromChannel === CASE_CHANNEL.visit) {
      return this.visitDepartmentData
    }
    return []
  }


  //按机构分配
  private submit() {
    if (this.fromChannel === CASE_CHANNEL.tel) {
      this.telCaseManageService.confirmDistributeCase(this.distributeModel).subscribe(this.success);
    }
    if (this.fromChannel === CASE_CHANNEL.visit) {
      this.visitCaseManageService.confirmDistributeCase(this.distributeModel).subscribe(this.success);
    }
  }


  private refreshData(code: string) {
    const model = {
      deptCode: code,
      caseSwitch: 'ENABLED'
    }
    this.userService.getAllUsers(model, this.pageService).subscribe(
      data => this.userDataSet = data
    );
  }

  private next() {
    const userIds = this.selectionList.map(v => v.id)
    this.updateUserIds(userIds)
    this.dialog = true
  }

  private success() {
    this.$message.success('分配成功');
    this.close()
    this.emitRefreshList()
  }

  private close() {
    this.dialog = false;
    this.updateDeptIds("")
    this.updateUserIds([])
    this.emitClose()
  }
}
</script>
<style lang="less" scoped>
</style>
