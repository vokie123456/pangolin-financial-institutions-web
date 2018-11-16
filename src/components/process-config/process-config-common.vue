<template>
  <!-- 审批管理-审批流程设置-审批流程设置公共组件 -->
  <section class="component process-config-common">
    <el-steps :active="flowNodeNameList.length + 2" align-center>
      <el-step title="发起人" description="催收员" icon="el-icon-d-arrow-right"></el-step>
      <el-step v-for="item of flowNodeNameList" :key="item.index" :title="`${stepChar(item.step)}级审批`" :description="item.name" icon="el-icon-edit-outline"></el-step>
    </el-steps>
    <el-row style="margin-top:30px">
      <el-form :model="saveModel" :rules="rules" label-width="130px" ref="form">
        <el-col :span="12">
          <el-form-item label="审批流程名称" prop="taskName">
            <el-input v-model="saveModel.taskName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批类型" prop="applyCategory">
            <el-select v-model="saveModel.applyCategory" placeholder="请选择" clearable>
              <el-option v-for="{code,name} in $dict.getDictData('ApplyCategory')" :key="code" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="commonState">
            <el-select v-model="saveModel.commonState" placeholder="请选择" clearable>
              <el-option v-for="{code,name} in $dict.getDictData('CommonState')" :key="code" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button @click="addTaskNode()">增加</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="taskNodeList">
      <el-table-column label="当前步骤">
        <template slot-scope="scope">
          {{scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-select v-model="scope.row.roleId" size="medium" placeholder="请选择角色名称" collapse-tags class="select-role" @change="roleChange(scope.row)">
            <el-option v-for="item in allRoleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="审批人">
        <template slot-scope="scope">
          <el-select v-model="scope.row.userIds" size="medium" placeholder="请选择审批人名称" multiple collapse-tags class="select-role">
            <el-option v-for="item in scope.row.userList" :key="item.id" :label="item.realName" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button :disabled="scope.$index === 0" type="text" @click="move(0,scope.$index)">上移</el-button>
          <el-button :disabled="scope.$index === taskNodeList.length - 1" type="text" @click="move(1,scope.$index)">下移</el-button>
          <el-button @click="deleteNode(scope.$index)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top:30px">
      <el-button @click="close">取消</el-button>
      <el-button @click="confirm" :loading="submitLoading">确定</el-button>
    </el-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { Emit, Watch, Prop } from 'vue-property-decorator';
import { RoleService } from '~/services/management-service/role.service';
import { UserService } from '~/services/management-service/user.service';
import { FlowTaskService } from '~/services/domain-service/flow-task.service';

enum option {
  // 操作选项
  UP = 0,
  DOWN = 1,
}

const numbreChars = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

@Component({
  components: {
    DataForm,
    DataBox,
  },
})
export default class ProcessConfigCommon1 extends Vue {
  @Dependencies(UserService)
  private userService: UserService;
  @Dependencies(RoleService)
  private roleService: RoleService;
  @Dependencies(FlowTaskService)
  private flowTaskService: FlowTaskService;
  @Prop()
  private modifyData: any;
  private allRoleList: any[] = [];
  private saveModel: any = {
    flowNodeModels: [],
    taskName: '',
    commonState: 'ENABLED',
    applyCategory: '',
  };
  private rules: any = {
    taskName: [{ required: true, message: '请输入审批流程名称' }],
    commonState: [{ required: true, message: '请选择状态' }],
    applyCategory: [{ required: true, message: '请选择审批类型' }],
  };
  private taskNodeList: any = [];
  private submitLoading: boolean = false;

  @Emit('close')
  private close() {
    this.reset();
  }
  private success() {
    this.close();
  }

  @Watch('modifyData', { immediate: true })
  private onIdChange(val) {
    if (!val.id) return;
    if (val) this.revertData(val);
  }

  private created() {
    this.getAllRoleList();
  }

  // 角色变化取审批人列表
  private roleChange(row) {
    row.userIds = [];
    this.userService
      .getAllUsersList({ roleId: row.roleId, userStatus: 'ENABLED' })
      .subscribe((data) => {
        row.userList = data;
      });
  }

  // 数据反显
  private revertData(val) {
    this.flowTaskService.getFlowTask({ id: val.id }).subscribe((data) => {
      if (data.flowNodes) {
        this.saveModel.taskName = data.taskName;
        this.saveModel.commonState = data.commonState;
        this.saveModel.applyCategory = data.applyCategory;
        this.saveModel.id = data.id;
        const a :any[] = data.flowNodes.map(
          (v, index) => {
            return {
              step: v.step - 1,
              userIds: v.userIds,
              userList: v.userIds.map((e, eIndex) => {
                return {
                  id: e,
                  realName: v.realNames[eIndex]
                };
              })
            };
          },
        );
        this.taskNodeList = a;
        this.sort(this.taskNodeList);
      }
    });
  }

  /**
   * 获取当前步数
   */
  private stepChar(step) {
    const index = Number(step).valueOf();
    return numbreChars[index];
  }
  /**
   * 获取所有角色
   */
  private getAllRoleList() {
    this.roleService.getAllRolesList().subscribe((data) => {
      this.allRoleList = data;
    });
  }

  // 节点移动
  private move(type, index) {
    if (type === option.UP) {
      this.taskNodeList[index].step = this.taskNodeList[index].step - 1;
      this.taskNodeList[index - 1].step = this.taskNodeList[index - 1].step + 1;
    } else {
      this.taskNodeList[index].step = this.taskNodeList[index].step + 1;
      this.taskNodeList[index + 1].step = this.taskNodeList[index + 1].step - 1;
    }
    this.sort(this.taskNodeList);
  }

  //sort on operate in up or down
  private sort(flowNodeModels: any[]) {
    this.taskNodeList = flowNodeModels.sort((a, b) => a.step - b.step);
  }

  /**
   * 删除节点
   */
  private deleteNode(index) {
    console.log("before", this.taskNodeList)
    this.taskNodeList.splice(index, 1);
    console.log("after", this.taskNodeList)
    this.taskNodeList.forEach((v, index) => {
      v.step = index
    })
  }

  // 增加节点
  private addTaskNode() {
    const newIndex = this.taskNodeList.length;
    if (newIndex > 4) {
      this.$message('最多增加五级审批');
      return;
    }
    this.taskNodeList.push({
      step: newIndex,
      userIds: [],
      userList: [],
    });
  }

  private get flowNodeNameList() {
    return this.taskNodeList.map((v) => {
      const role = this.allRoleList.find((x) => x.id === v.userIds[0]);
      const name = role ? role.name : '请配置';
      return {
        step: v.step,
        name,
      };
    });
  }
  /**
   * 提交表单
   */
  private confirm() {
    // form表单检测
    const dataForm: any = this.$refs['form'];
    dataForm.validate((val) => {
      if (!val) return;
      // 任务节中含有空数据或者表单验证不通过
      if (this.checkError()) {
        return;
      }
      this.submitLoading = true;
      const taskList: any = [];
      this.taskNodeList.forEach((v, index) => {
        taskList[index] = {
          step: v.step + 1,
          userIds: v.userIds,
        };
      });
      this.saveModel.flowNodeModels = taskList;

      // 如果saveModel存在id则为修改，不存则为新增
      if (!this.saveModel.id) {
        this.flowTaskService.addFlowTask(this.saveModel).subscribe((data) => {
          this.$message.success('新增成功');
          this.submitLoading = false;
          this.success();
        },() => {
          this.submitLoading = false;
        });
      } else {
        this.flowTaskService.updateFlowTask(this.saveModel).subscribe((data) => {
          this.$message.success('修改成功');
          this.submitLoading = false;
          this.success();
        },() => {
          this.submitLoading = false;
        });
      }
    });
  }
  // 检测错误
  private checkError() {
    let hasError = false;
    if (this.taskNodeList.length < 1) {
      this.$message('审批流程最少1步');
      return true;
    }
    for (let i = 0; i < this.taskNodeList.length; i++) {
      if (this.taskNodeList[i].userIds.length < 1) {
        this.$message(`请选择第${i + 1}步的审批人`);
        hasError = true;
        break;
      }
    }
    return hasError;
  }

  private reset() {
    this.taskNodeList = [];
    this.submitLoading = false;
    const form: any = this.$refs['form'];
    form.resetFields();
    this.saveModel = {
      flowNodeModels: [],
      taskName: '',
      commonState: 'ENABLED',
      applyCategory: '',
      id: '',
    };
  }
}
</script>

<style lang="less">
.component.process-config-common {
  .select-role .el-select__tags > span {
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    .el-tag {
      margin: 2px 0 2px 2px;
      padding: 0 5px;
    }
  }
}
</style>
