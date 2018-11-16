export default {
  namespaced: true,
  state: {
    caseIds: [], // 分配的案件ID
    userIds: [], // 分配的用户
    deptIds: [],  // 分配的机构
    mode: "BY_CUSTOMIZE", // 分配模式
    category: "TO_DEPARTMENT" // 分配类型
  },
  getters: {
    perviewModel(state) {
      return {
        caseIds: state.caseIds,
        userIds: state.userIds,
        distributeCategory: 'TO_COLLECTOR',
        commonFlag: 'YES',
        distributeMode: state.mode,
      }
    },
    distributeModel(state) {
      return {
        caseIds: state.caseIds,
        deptIds: state.deptIds,
        commonFlag: 'YES',
        distributeCategory: state.category,
        distributeMode: state.mode,
        analyseId: "",
        distributeNumber: [],
        userIds: state.userIds
      }
    }
  },
  mutations: {
    /**
     * 更新分配类型
     * @param state 
     * @param category 分配类型
     */
    updateCategory(state, allotType: string) {
      state.category = allotType
    },
    updateMode(state, mode: string) {
      state.mode = mode
    },
    updateDeptIds(state, deptId: string) {
      state.deptIds = [deptId]
    },
    updateUserIds(state, userIds: string[]) {
      state.userIds = userIds
    },
    updateCaseIds(state, caseIds: string[]) {
      state.caseIds = caseIds
    }
  }
}
