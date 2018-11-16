<template>
  <!-- 手动分案-公共组件 -->
  <section class="component user-case-allot">
    <el-row style="margin-bottom:15px">
      <span>分配方式：</span>
      <el-radio-group v-model="allotType" size="small">
        <el-radio border :label="1">按催收员分配</el-radio>
        <el-radio border :label="0">按机构分配</el-radio>
      </el-radio-group>
    </el-row>
    <el-row type="flex">
      <el-col :span="6" style="height:400px;margin-top:4px;border:1px solid #d1dbe5;overflow:auto">
        <department-tree @onCurrentChange="getCheckedNodes" :currentDept="currentDept" :departmentData="DepartmentData" ref="department-tree"></department-tree>
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
      <el-button @click="cancle">取消</el-button>
      <el-button @click="next" v-if="allotType===1" :disabled="!selectionList.length" :loading="submitLoading">下一步</el-button>
      <el-button @click="submit" v-else :loading="submitLoading">确定</el-button>
    </div>
    <!-- 下一步-确认分案 -->
    <!-- 电催待分配 -->
    <el-dialog title="确认分案" :visible.sync="dialog.TelConfirmDistribution" width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body @close="$refs['tel-confirm-distribution'].reset()">
      <tel-confirm-distribution :again='again' :distributionData="distributionData" @refreshList="refreshList" ref="tel-confirm-distribution" @back="dialog.TelConfirmDistribution=false" @close="dialog.TelConfirmDistribution=false;cancle()"></tel-confirm-distribution>
    </el-dialog>
    <!-- 外访管理-外访待分配 -->
    <el-dialog title="确认分案" :visible.sync="dialog.VisitConfirmDistribution" width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <visit-confirm-distribution :distributionData="distributionData" @refreshList="refreshList" ref="visit-confirm-distribution" @back="dialog.VisitConfirmDistribution=false" @close="dialog.VisitConfirmDistribution=false;cancle()"></visit-confirm-distribution>
    </el-dialog>
    <!-- 协催管理-外访待分配 -->
    <el-dialog title="确认分案" :visible.sync="dialog.AssistVisitConfirmDistribution" width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <assist-visit-confirm-distribution :distributionData="distributionData" @refreshList="refreshList" ref="assist-visit-confirm-distribution" @back="dialog.AssistVisitConfirmDistribution=false" @close="dialog.AssistVisitConfirmDistribution=false;cancle()"></assist-visit-confirm-distribution>
    </el-dialog>
    <!-- 协催管理-诉讼待分配 or 反欺诈待分配 -->
    <el-dialog title="确认分案" :visible.sync="dialog.AssisLawsuittVisitConfirmDistribution" width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <assist-lawsuit-confirm-distribution :collectionType="collectionType" :distributionData="distributionData" @refreshList="refreshList" ref="assist-lawsuit-confirm-distribution" @back="dialog.AssisLawsuittVisitConfirmDistribution=false" @close="dialog.AssisLawsuittVisitConfirmDistribution=false;cancle()"></assist-lawsuit-confirm-distribution>
    </el-dialog>
    <!-- 协催管理-诉讼案件 -->
    <el-dialog title="确认分案" :visible.sync="dialog.AssisCaseConfirmDistribution" width="1000px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <assist-case-confirm-distribution :distributionData="distributionData" @refreshList="refreshList" ref="assist-lawsuit-confirm-distribution" @back="dialog.AssisCaseConfirmDistribution=false" @close="dialog.AssisCaseConfirmDistribution=false;cancle()"></assist-case-confirm-distribution>
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
import { DataGrid, DataGridItem } from '@zct1989/vue-component';
import { UserService } from '~/services/management-service/user.service';
import TelConfirmDistribution from '~/components/distribution-common/tel-confirm-distribution.vue';
import VisitConfirmDistribution from '~/components/distribution-common/visit-confirm-distribution.vue';
import AssistVisitConfirmDistribution from '~/components/distribution-common/assist-visit-confirm-distribution.vue';
import AssistLawsuitConfirmDistribution from '~/components/distribution-common/assist-lawsuit-confirm-distribution.vue';
import AssistCaseConfirmDistribution from '~/components/distribution-common/assist-case-confirm-distribution.vue';

import { TelCaseManageService } from '~/services/domain-service/tel-case-manage.service';

@Component({
  components: {
    DataBox,
    DepartmentTree,
    TelConfirmDistribution,
    VisitConfirmDistribution,
    AssistVisitConfirmDistribution,
    AssistLawsuitConfirmDistribution,
    AssistCaseConfirmDistribution,
  },
})
export default class UserCaseAllot extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(TelCaseManageService)
  private telCaseManageService: TelCaseManageService;
  private allotType: any = 1;
  private selectionList: any[] = [];
  private userDataSet: any[] = [];
  private currentDept: any = null;
  private nowNode: any = null;
  private distributionData: any = {};
  private submitLoading: boolean = false;
  private model: any = {
    state: 0,
    deptCode: '',
    caseSwitch: 'ENABLED'
  };
  private dialog: any = {
    TelConfirmDistribution: false,
    VisitConfirmDistribution: false,
    AssistVisitConfirmDistribution: false,
    AssisLawsuittVisitConfirmDistribution: false,
    AssisCaseConfirmDistribution: false,
  };
  private DepartmentData = null;
  private collectionType = '';
  @Prop({ default: false, type: Boolean })
  private again: boolean;
  @Prop({ required: true })
  private selectedCase: any[];
  @Emit('refreshList')
  public refreshList() { }
  @Emit('close')
  private cancle() {
    //close
  }

  private get display() {
    return this.allotType === 0 ? '' : this.selectionList;
  }

  private set display(v: any) {
    this.selectionList = v;
  }

  private refresh(data, collectionType) {
    this.DepartmentData = data;
    this.collectionType = collectionType;
  }

  //下一步
  private next() {
    // 给子组件发送的数据
    this.distributionData = {
      selectedUser: this.selectionList,
      selectedCase: this.selectedCase,
    };
    switch (this.collectionType) {
      case 'TEL':
        this.dialog.TelConfirmDistribution = true;
        break;
      case 'VISIT':
        this.dialog.VisitConfirmDistribution = true;
        break;
      case 'ASSIST_VISIT':
        this.dialog.AssistVisitConfirmDistribution = true;
        break;
      case 'LAW_STAY':
        this.dialog.AssisLawsuittVisitConfirmDistribution = true;
        break;
      case 'LAW_STAY_OUTSOURCE':
        this.dialog.AssisLawsuittVisitConfirmDistribution = true;
        break;
      case 'CHEAT_STAY':
        this.dialog.AssisLawsuittVisitConfirmDistribution = true;
        break;
      case 'CHEAT_SURVEY':
        this.dialog.AssisLawsuittVisitConfirmDistribution = true;
        break;
      case 'LAW_CASE':
        this.dialog.AssisCaseConfirmDistribution = true;
        break;
      default:
        break;
    }
  }
  //按机构分配
  private submit() {
    const model: any = {
      caseIds: this.selectedCase.map((v) => v.id),
      commonFlag: 'YES',
      deptIds: [this.nowNode.id],
      distributeCategory: 'TO_DEPARTMENT',
    };
    this.submitLoading = true;
    this.telCaseManageService.confirmDistributeCase(model).subscribe(
      (data) => {
        this.submitLoading = false;
        this.$message.success('分配成功');
        this.cancle();
      }
    );
  }
  /**
   * 获取当前树选择项
   */
  private getCheckedNodes(item) {
    if (item.deptCode === this.model.deptCode) {
      return false;
    }
    this.model.deptCode = item.deptCode;
    this.nowNode = item;
    this.refreshData();
  }

  private refreshData() {
    this.userService
      .getAllUsers(this.model, this.pageService)
      .subscribe((data) => {
        this.userDataSet = data;
      });
  }
}
</script>
<style lang="less" scoped>
</style>
