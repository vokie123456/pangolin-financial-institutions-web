<template>
  <section class="component work-task">
    <span @click="dialog.taskBox=true" class="icon" style="margin-right:20px">
      <el-badge :value="taskList.length" v-if="taskList.length" class="icon">
        <svg-icon iconName="renwuhezi" iconSize="32"></svg-icon>
      </el-badge>
      <svg-icon v-else iconName="renwuhezi" iconSize="32"></svg-icon>
    </span>
    <el-dialog :visible.sync="dialog.taskBox" title="任务中心" @open="updateTaskList([])">
      <task-box :visible.sync="dialog.taskBox" ref="task-box"></task-box>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action, namespace } from "vuex-class";
import TaskBox from "~/components/workspace/task/task-box.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";
const workspaceModule = namespace("workspace");

@Component({
  components: {
    TaskBox,
    SvgIcon
  }
})
export default class WorkTask extends Vue {
  @workspaceModule.Action private updateUnReadCount;
  @workspaceModule.State private unReadCount;
  @workspaceModule.State private taskList;
  @workspaceModule.Mutation private updateTaskList
  private dialog = {
    taskBox: false
  };

  private mounted() {
    this.$reminder
      .addTaskListener()
      .subscribe(data => {
        this.updateTaskList([...this.taskList, new Date])
      })
  }
}
</script>

<style lang="less" scoped>
.component.work-task {
  margin-right: 20px;
  .icon {
    color: white;
    cursor: pointer;
  }
}
</style>
