<template>
  <section class="component work-menu row nowrap" :class="[{collapse:menuCollapse}]">
    <el-menu class="menu" unique-opened :default-active="$route.fullPath" @select="selectMenuItem" :collapse="menuCollapse">
      <work-menu-item v-for="item in menuList" :data="item" :key="item.id"></work-menu-item>
    </el-menu>
    <div class="collapse-icon" @click="menuCollapse=!menuCollapse">
      <el-icon :class="menuCollapse ? 'el-icon-caret-right':'el-icon-caret-left'"></el-icon>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import WorkMenuItem from '~/components/workspace/work-menu-item.vue';
import { State, Mutation, Action, namespace } from 'vuex-class';
const workspaceModule = namespace('workspace');
@Component({
  components: {
    WorkMenuItem,
  },
})
export default class WorkMenu extends Vue {
  @State private menuResource;
  @State('menuCollapse') private mMenuCollapse;
  @Mutation private updateMenuCollapse;
  @workspaceModule.Action private updateTabs;

  private get menuCollapse() {
    return this.mMenuCollapse;
  }

  private set menuCollapse(value) {
    this.updateMenuCollapse(value);
  }

  /**
   * 菜单列表
   * DIRECTORY - 一级菜单
   * MENU - 二级菜单
   * CONTROL - 三级菜单
   */
  private get menuList() {
    const rescource = this.menuResource.filter(
      (x) => ['DIRECTORY', 'MENU'].includes(x.type) && x.url,
    );

    const menus = rescource
      .filter((x) => x.type === 'DIRECTORY')
      .map((item) => {
        const children = rescource
          .filter((x) => x.parent === item.id && x.type === 'MENU' && x.url)
          .sort((x: any, y: any) => x.resoSort - y.resoSort);

        if (children && children.length) {
          return { ...item, children }
        } else {
          return item;
        }
      })
      .sort((x: any, y: any) => x.resoSort - y.resoSort);

    return menus;
  }

  /**
   * 选择菜单项
   * 生成缓存项
   */
  private selectMenuItem(path, pathArray) {
    // 防止重复点击
    if (this.$route.path === path) {
      return;
    }

    // 路径长度验证
    if (pathArray.length !== 2) {
      return;
    }

    // 获取一级,二级路径
    const [path1, path2] = pathArray;

    // 非统计菜单需要更新tabs
    if (!this.$route.path.startsWith(path1)) {
      const target = this.menuResource.find((x) => x.url === path1);
      if (target) {
        this.updateTabs(target.id);
      }
    }

    this.$nextTick(() => {
      this.$router.push(path);
    });
  }
}
</script>

<style lang="less" scoped>
.component.work-menu {
  .menu {
    width: 200px;
  }
  &.collapse {
    > .menu {
      width: 60px;
    }
    .collapse-icon {
      left: 60px;
    }
  }
  .collapse-icon {
    position: fixed;
    top: 50%;
    left: 200px;
    height: 100px;
    line-height: 100px;
    border-radius: 0 15px 15px 0;
    font-size: 10px;
    width: 10px;
    &:hover {
      cursor: pointer;
      color: white;
    }
  }
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>

<style lang="less">
.component.work-menu {
  // .el-menu {
  //   border-right: 0; // 消除菜单左侧突出边距
  // }
  &.collapse .el-submenu__icon-arrow {
    display: none;
  }
}
</style>

