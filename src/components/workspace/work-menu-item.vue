<template>
  <div class="component work-menu-item" @click.capture="onSubmenuClick">
    <el-submenu :index="data.url" class="submenu">
      <el-row slot="title">
        <el-col class="submenu-icon" :span="iconSpan">
          <svg-icon :iconName="data.icon"></svg-icon>
        </el-col>
        <el-col v-if="!menuCollapse" class="submenu-title" :span="18">{{data.name}}</el-col>
      </el-row>
      <template v-if="data.children">
        <el-menu-item class="menu-item" v-for="item in data.children" :key="item.id" :index="item.url">
          <el-row>
            <el-col class="menu-icon" :span="6">
              <svg-icon iconName="right"></svg-icon>
            </el-col>
            <el-col class="menu-title" :span="18">{{item.name}}</el-col>
          </el-row>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import { State, namespace } from 'vuex-class';
import SvgIcon from '~/components/common/svg-icon.vue';

const workspaceModule = namespace('workspace');

@Component({
  components: {
    SvgIcon,
  },
})
export default class WorkMenu extends Vue {
  @Prop()
  private data: any;
  @State
  private menuCollapse;
  @workspaceModule.State
  private currentTab;
  @Emit('select')
  private onSelectSubmenu(path, pathArray) { }

  private get iconSpan() {
    return !this.menuCollapse ? 6 : 24;
  }

  /**
   * 目录菜单点击处理
   */
  private onSubmenuClick(event) {
    // 仅在菜单折叠状态有效
    // if (!this.menuCollapse || !this.data) {
    //   return;
    // } else {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // 如果打开为同一个submenu则不处理
    if (this.currentTab.startsWith(this.data.url)) {
      return;
    }

    // 如果不含有子路由则不处理
    if (!this.data.children || this.data.children.length === 0) {
      return;
    }

    // 获取目标路由
    const [target] = this.data.children;

    if (target) {
      this.onSelectSubmenu(target.url, [this.data.url, target.url]);
    }
  }
}
</script>

<style lang="less" scoped>
.work-menu-item.component {
  flex-basis: 60px;
  min-width: 60px;
  max-height: 100%;

  .submenu {
    .submenu-icon,
    .menu-icon {
      text-align: center;
      // border-right: 1px solid;
    }
    .submenu-title,
    .menu-title {
      text-align: left;
      padding-left: 10px;
      font-weight: lighter;
    }
  }
}
</style>

<style lang="less">
.work-menu-item.component {
  .el-menu-item,
  .el-submenu__title {
    padding: 0 !important;
  }
}
</style>
