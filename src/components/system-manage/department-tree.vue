<template>
  <section class="component department-tree" style="display:inline-block;min-width:100%">
    <el-tree ref="department-tree" align="left" :data="departmentData" highlight-current auto-expand-parent :expand-on-click-node="false" node-key="id" :props="{label:'deptName',children:'children'}" @current-change="onCurrentChange"></el-tree>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { DepartmentService } from '~/services/management-service/department.service';
import { Model, Emit, Watch, Prop } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { Tree } from 'element-ui';
@Component({
  components: {},
})
export default class DepartmentTree extends Vue {
  @Dependencies(DepartmentService)
  private departmentService: DepartmentService;
  @Prop({ required: true })
  private departmentData;
  @Model("onCurrentChange") private currentDept;


  private departmentTree;
  private treeData: any = [];

  @Emit('onCurrentChange')
  private onCurrentChange(data, node) { }

  @Watch('departmentData')
  private ondepartmentDataChange() {
    this.reset();
  }

  private mounted() {
    this.departmentTree = this.$refs['department-tree'] as Tree;
    this.reset();
  }

  private reset() {
    this.treeData = [];
    this.$nextTick(() => {
      if (this.departmentData && this.departmentData.length) {
        this.treeData = this.departmentData;
        const [root] = this.treeData;
        this.departmentTree.setCurrentKey(
          this.currentDept ? this.currentDept.id : root.id,
        );
        this.onCurrentChange(this.currentDept || root, null);
      }
    });
  }

  private setCurrentKey(id) {
    this.departmentTree.setCurrentKey(id);
  }
}
</script>

<style lang="less" scoped>
</style>
