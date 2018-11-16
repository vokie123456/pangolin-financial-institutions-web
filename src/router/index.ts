import Vue from 'vue';
import Router from 'vue-router';
import store from '~/store';
import storeInit from '~/core/bootstrap/store.init';
import SystemManageRoute from '~/router/system-manage.route';
import OutsourceManageRoute from '~/router/outsource-manage.route';
import CancellationManagement from '~/router/cancellation-management.route';
import CoUrgingManagement from '~/router/co-urging-management.route';
import DashboardRoute from './dashboard.route';
import { Message } from 'element-ui';
const Login = () => import('~/pages/login.vue');
const NotFound = () => import('~/pages/not-found.vue');

import TelephoneCollectionManageRoute from '~/router/telephone-collection-manage.route';
import VisitCollectionManageRoute from '~/router/visit-collection-manage.route';
import CaseImportRoute from '~/router/case-import.route';
import TempleteManage from '~/router/templete-manage.route';
import ApprovalManage from '~/router/approval-manage.route';
import AssistManage from '~/router/assist-manage.route.ts';

//2018-09-26 催收执行页测试路由，用完删除
const CollectionExecution = () =>
  import('~/pages/collection-execution/collection-execution.vue');

Vue.use(Router);

// 生成路由配置
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  //2018-09-26 催收执行页测试路由，用完删除
  {
    path: '/collection-execution/:debt?',
    name: 'collection-execution',
    component: CollectionExecution,
    props: true
  },
  ...CaseImportRoute,
  ...SystemManageRoute,
  ...DashboardRoute,
  ...OutsourceManageRoute,
  ...CancellationManagement,
  ...CoUrgingManagement,
  ...TelephoneCollectionManageRoute,
  ...VisitCollectionManageRoute,
  ...TempleteManage,
  ...ApprovalManage,
  ...AssistManage,
  // 有路由在这里添加
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

// 生成路由实体
const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path === '/') {
    await store.dispatch('clearUserLoginData');
  }

  if (store.state.tokenExpire && to.path !== '/') {
    // 重置用户过期状态
    store.commit('updateTokenExpire', false);
    Message.info('用户登录过期,请重新登录');
    next('/');
  }

  if (!store.state.ready) {
    await storeInit({
      store,
      router,
    });
  }

  next();
});

/**
 * 路由前置守卫
 * 权限检测
 */
router.beforeResolve(({ matched, path }, from, next) => {
  const component = getComponent(matched);

  if (component && authCheck(component)) {
    next('/404');
  } else {
    next();
  }
});

/**
 * 路由后置守卫
 * 布局检测
 */
router.afterEach((to, from) => {
  //  布局检测
  layoutCheck(to.matched);
  // Tab更新检测
  tabsCheck(to.path, from.path);
});

function authCheck(component) {
  const auth = component['$auth'];
  if (auth) {
    const target = store.state.menuResource.find(
      (x) => x.id === auth || auth < 0,
    );
    return !target;
  }
}

// 布局监测
function layoutCheck(matched) {
  const component = getComponent(matched);
  if (component) {
    const targetLayout = component['$layout'] || 'default';
    if (store.state.layout !== targetLayout) {
      store.commit('updateLayout', targetLayout);
    }
  }
}

function getComponent(matched) {
  if (matched && matched.length > 0) {
    const [{ components }] = matched;
    return components.default;
  }
}

/**
 * Tabs更新检测
 * @param toPath
 * @param fromPath
 */
function tabsCheck(toPath, fromPath) {
  if (!toPath || toPath === '/') {
    return;
  }

  const toItem: any = store.state.menuResource.find(
    (x: any) => x.url === toPath,
  );
  const fromItem: any = store.state.menuResource.find(
    (x: any) => x.url === fromPath,
  );

  if (!toItem) {
    return;
  }
  if (store.state.workspace.currentTabs.length === 0 || !fromItem) {
    store.dispatch('workspace/updateTabs', toItem.parentId);
  }

  if (toItem.url !== store.state.workspace.currentTab) {
    // 更新当前选中tab
    store.commit('workspace/updateCurrentTab', toItem.url);
  }
}

export default router;
