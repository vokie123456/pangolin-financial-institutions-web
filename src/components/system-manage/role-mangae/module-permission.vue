<template>
  <section class="component module-permission">
    <div style="display:flex">
      <el-col class="module">
        <el-row class="title">模块</el-row>
        <div class="module-tree">
          <el-tree align="left" :data="treeData" show-checkbox highlight-current :default-expanded-keys="[0]" node-key="id" :props="{label:'name'}" :default-checked-keys="treeDefaultSelection" ref="tree" @node-click="getCheckedNodes" @check-change="handleCheckChange"></el-tree>
        </div>
      </el-col>
      <el-col style="width:300px;flex-grow:1">
        <el-row class="title">对应模块功能</el-row>
        <data-box :data="tableData" show-checkbox :selectionList.sync="selectionList" ref="table" height="400">
          <template slot="columns">
            <el-table-column prop="name" label="功能名称" :min-width="$helper.getColumnWidth(4)" align="center">
            </el-table-column>
            <el-table-column prop="remark" label="描述" :min-width="$helper.getColumnWidth(3)" align="center">
            </el-table-column>
          </template>
        </data-box>
        <el-row class="btn-box">
          <el-button @click="saveModule">保存</el-button>
        </el-row>
      </el-col>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Tree } from "element-ui";
import Component from "vue-class-component";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import { Dependencies } from "~/core/decorator";
import { RoleService } from "~/services/management-service/role.service";
import { Emit, Watch } from "vue-property-decorator";
import { Getter, State, namespace } from "vuex-class";
import { CommonService } from "~/utils/common.service";

const systemManage = namespace("system-manage")

@Component({
  components: {
    DataForm,
    DataBox
  }
})
export default class ModulePermission extends Vue {
  @Dependencies(RoleService)
  private rolesService: RoleService;
  @systemManage.State("resource") 
  private allData;

  private tableDefaultSelection: any = [];
  private treeExpanded: any = [];
  private treeDefaultSelection: any = [];
  private selectionList: any = [];
  private moduleData: any = [];

  private treeData: any = [];
  private tableData: any = [];
  private changeFlag: any = false;
  private nowResoId: any = "";
  private roleInfo: any;
  private rloeModles: any = {
    roleId: ""
  };
  private roleInfoModles: any = {
    resourceIds: [],
    roleId: ""
  }
 
  @Emit("close")
  public close() { }
  @Emit("refreshList")
  public refreshList() { }

  public refresh(roleInfo) {
      this.tableData = [];
      this.nowResoId = "";
      this.roleInfo = roleInfo;
      this.rloeModles.roleId = roleInfo.id;
      this.roleInfoModles.roleId = roleInfo.id;
      // 获取该角色所拥有的资源;
      this.rolesService.getSelfResources(this.rloeModles).subscribe(data => {
        const tree = this.$refs["tree"] as Tree;
        tree.setCheckedKeys([]);
        this.treeDefaultSelection = data
          .filter(v => this.allData.find(tree =>tree.parent != null && tree.id === v.id))
          .map(v => v.id);
      });
  }

  /**
   * 实例创建完成时创建一次机构树
   */
  private created() {
    this.getTreeData();
    this.setDefaultSelection();
  }

  /**
   * 保存点击
   */
  private saveModule() {
    if (this.nowResoId) {
      this.moduleData[this.nowResoId] = this.selectionList.map(v => {
        return v.id;
      });
    }
    const tree: any = this.$refs.tree;

    this.roleInfoModles.resourceIds = tree
      .getHalfCheckedKeys()
      .filter(v => v !== 0)
      .concat(tree.getCheckedKeys());

    this.rolesService.roleAttachResource(this.roleInfoModles).subscribe(
      data => {
        this.$message.success("操作成功!");
        this.refreshList();
        this.close();
      }
    );
  }

  /**
   * 构造资源树形列表
   */
  private getTreeData() {
    // 设置显示在树节点的文字
    // this.allData.forEach(v => v.label = v.name)
    const treeDataTmp = CommonService.generateTreeData(this.allData, { keyName: "id", parentKeyName: "parent", sortKey: "resoSort" })

    treeDataTmp.forEach(e => e.parent = 0)
    const arr = [
      {
        id: -1,
        name: "贷后催收系统",
        parent: 0,
        children: treeDataTmp
      }
    ];
    this.treeData = arr
  }

  /**
   * 选择改变事件
   */
  private handleCheckChange(data, checked, indeterminate) {
    if (this.changeFlag && data.function) {
      if (checked) {
        this.moduleData[data.id] = data.function.map(v => v.id);
        if (data.id === this.nowResoId) {
          this.setDefaultSelection();
        }
      } else {
        this.moduleData[data.id] = [];
        if (data.id === this.nowResoId) {
          const table: any = this.$refs.table;
          table.clearSelection();
        }
      }
    }
  }

  /**
   * 获取当前树选择项
   */
  private getCheckedNodes(item) {
    if (item.id === this.nowResoId) {
      return;
    }
    if (item.function) {
      if (this.nowResoId) {
        this.moduleData[this.nowResoId] = this.selectionList.map(v => {
          return v.id;
        });
      }
      this.tableData = item.function;
      this.nowResoId = item.id;
      this.setDefaultSelection();
    }
  }

  /**
   * 设置table默认选中
   */
  private setDefaultSelection() {
    if (
      this.moduleData[this.nowResoId] &&
      this.moduleData[this.nowResoId].length
    ) {
      this.$nextTick(() => {
        this.selectionList = this.tableData.filter(d =>
          this.moduleData[this.nowResoId].find(v => v === d.id)
        );
      });
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  height: 40px;
  background: #e4e4e4;
  line-height: 40px;
  text-align: center;
  border: 1px solid #dddddd;
  font-size: 0.875rem;
  color: #333;
}
.btn-box {
  margin-top: 20px;
  text-align: center;
}
.module {
  flex-basis: 250px;
  border: 1px solid #e4e4e4;
  height: 500px;
  width: 250px;
}
.module-tree {
  height: 460px;
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

.module-tree::-webkit-scrollbar {
  width: 0px;
}
</style>
