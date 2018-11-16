import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate';

// 引入模块
import Workspace from './modules/workspace.store';
import Message from './modules/message.store';
import SystemManage from './modules/system-manage.store';
import CaseManage from './modules/case-manage.store';
import CaseAllot from './modules/case-allot.store';
import CollectionExecution from './modules/collection-execution.store';

Vue.use(Vuex);

const filterList = ['ready', 'layout'];

const store = new Vuex.Store({
  // 子模块
  modules: {
    workspace: Workspace,
    message: Message,
    'system-manage': SystemManage,
    'case-manage': CaseManage,
    'case-allot': CaseAllot,
    'collection-execution': CollectionExecution,
  },
  state,
  getters,
  mutations,
  actions,
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: 'vuex',
      reducer: (state, paths) => {
        return { ...state, ready: false, layout: 'default' };
      },
      storage: localStorage,
      filter: ({ type, payload }) => {
        return !filterList.includes(type);
      },
    }),
  ],
});

export default store;
