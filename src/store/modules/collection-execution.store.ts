import router from '~/router';
import { OpenExecutionData } from "~/config/types";

export default {
  namespaced: true,
  state: {
    caseId: '',
    //是否仅查看 1.可操作 2.仅查看
    isOnlyView: true,
    //执行页类型 1.电催 TEL 2.外访 VISIT 3.委外 OUT 4.协催 ASSIST
    caseChannel: '',
    // 案件编号
    caseNo: "",
    //下个账单日
    perDueDate: '',
    //案件信息默认页面
    caseInfoActiveName: 'cust-info',
    //通讯录默认页面
    addListActiveName: 'telephone-book',
    //历史信息默认页面
    historyInfoActiveName: 'telephone-action-history',
  },
  mutations: {
    updateCaseId(state, data) {
      state.caseId = data;
    },
    updateIsOnlyView(state, data) {
      state.isOnlyView = data;
    },
    updatePerDueDate(state, data) {
      state.perDueDate = data;
    },
    updateCaseChannel(state, data) {
      state.caseChannel = data;
    },
    updateCaseNo(state, data) {
      state.caseNo = data
    },
    resetActiveName(state) {
      state.caseInfoActiveName = 'cust-info';
      state.addListActiveName = 'telephone-book';
      state.historyInfoActiveName = 'telephone-action-history';
    },
    updateHistoryInfoActive(state, data) {
      state.historyInfoActiveName = data;
    },
    updateCaseInfoActiveName(state, data) {
      state.caseInfoActiveName = data;
    }
  },
  getters: {
    /**
     * 获取催收执行页面子模块需要的数据
     * @param state 
     */
    collectonData(state): OpenExecutionData {
      return new OpenExecutionData(state.caseId, state.caseNo, state.caseChannel, state.isOnlyView)
    }
  },
  actions: {
    /**
     * 打开执行页
     */
    openCollectionExecution(
      { state, dispatch, commit },
      collectonData: OpenExecutionData,
    ) {
      //重置活动区域
      commit('resetActiveName');
      //设置caseId
      commit('updateCaseId', collectonData.caseId);
      // 更新CaseNo
      commit("updateCaseNo", collectonData.caseNo);
      //设置执行页类型
      commit('updateCaseChannel', collectonData.caseChannel);
      //设置是否仅查看
      commit('updateIsOnlyView', collectonData.onlyView);
      router.push(`/collection-execution`)
    },
    openNewCollectionExecution(
      { state, dispatch, commit },
      collectonData: OpenExecutionData,
    ) {
      //重置活动区域
      commit('resetActiveName');
      //设置caseId
      commit('updateCaseId', collectonData.caseId);
      // 更新CaseNo
      commit("updateCaseNo", collectonData.caseNo);
      //设置执行页类型
      commit('updateCaseChannel', collectonData.caseChannel);
      //设置是否仅查看
      commit('updateIsOnlyView', true);
      window.open(`/collection-execution/debt`, collectonData.caseNo)
    }
  }
};
