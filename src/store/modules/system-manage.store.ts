
const createDepartmentService = () => import("~/services/management-service/department.service")
const createRoleService = () => import("~/services/management-service/role.service")


export default {
  namespaced: true,
  state: {
    modulePermissRoleId: '', // 用户角色Id
    modulePermissDialog: false,
    modulePermissRoleCode: '',
    orgInfo: [], // 组织名称信息
    companyName: [], // 公司名称
    resource: [], // 所有资源
  },
  getters: {},
  mutations: {
    // 用户角色Id
    updateModuleRoleId(state, val) {
      state.modulePermissRoleId = val
    },
    updateModuleRoleCode(state, val) {
      state.modulePermissRoleCode = val
    },
    updateModuleDialog(state, val) {
      state.modulePermissDialog = val
    },
    /**
     * 更新组织名称信息
     * @param {*} state
     * @param {*} value
     */
    OrgNameInfo(state, value) {
      state.orgInfo = value
    },
    /**
     * 更新公司名称信息
     */
    // companyNameInfo(state, value) {
    //   state.companyName = value
    // },
    updateResource(state, value) {
      state.resource = value
    },
  },
  actions: {
    /**
     * 更新组织名称信息
     */

    async updateOrgNameInfo({ state, commit }) {
      const { DepartmentService } = await createDepartmentService()
      DepartmentService
        .getInstance()
        .querySubDepartment().subscribe(data => {
          commit("OrgNameInfo", data)
          // 调用根节点的mutation
          commit("updateDepartmentList", data, { root: true })
        })
    },
    // /**
    //  * 更新公司名称信息
    //  */
    //  async getAllCompany({ state, commit }) {
    //   let { companyService } = await createCompanyService()
    //   companyService
    //   .getInstance()
    //   .getAllCompany().subscribe(data => {
    //     commit('companyNameInfo', companyName)
    //   })
    // }

    /**
     * 所有资源
     * @param param0 
     */
    async updateResource({state, commit}) {
      const { RoleService } = await createRoleService()
      RoleService.getInstance().getAllResources().subscribe(data => {
          commit("updateResource", data)
        })
    },
  }
}
