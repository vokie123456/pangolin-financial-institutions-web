import router from '~/router'
import { ReminderService } from "~/utils/reminder.service"

const createCompanyService = () => import("~/services/management-service/company.service")
const createPrincipalService = () => import('~/services/domain-service/principal.service')
const createDepartmentService = () => import('~/services/management-service/department.service')
const createOutsourceService = () => import('~/services/domain-service/outsource.service')

export default {
  /**
   * 更新公司列表
   */
  async getCompanyList({ getters, dispatch, commit }) {
    const { CompanyService } = await createCompanyService()
    CompanyService.getInstance()
      .findAllCompany()
      .subscribe(data => {
        commit('updateCompanyList', data)
      })
  },
  /**
   * 更新委托方列表
   */
  async getPrincipalList({ state, commit }) {
    const { PrincipalService } = await createPrincipalService()

    PrincipalService.getInstance()
      .getPrincipalList(state.userData.companyCode)
      .subscribe(data => {
        commit('updatePrincipalList', data)
      })
  },
  // /**
  //  * 更新门店列表
  //  */
  // async getStoreList({ state, commit }) {
  //   const { DepartmentService } = await createDepartmentService()

  //   DepartmentService.getInstance()
  //     .queryShopDept(state.userData.companyCode)
  //     .subscribe(data => {
  //       commit('updateStoreList', data)
  //     })
  // },
  /**
   * 获取部门数据
   * @param param0
   */
  async getDepartmentList({ commit }) {
    const { DepartmentService } = await createDepartmentService()

    DepartmentService.getInstance()
      .querySubDepartment()
      .subscribe(data => {
        commit('updateDepartmentList', data)
      });
  },
  /**
   * 更新受托方列表
   */
  async getAllOutsource({ state, commit }) {
    const { OutsourceService } = await createOutsourceService()

    OutsourceService.getInstance()
      .getAllOutsource(state.userData.companyCode)
      .subscribe(data => {
        commit('updateOutSourceList', data)
      });
  },

  /**
   * 更新用户登录数据
   * @param param0 
   * @param user 用户登录数据
   */
  updateUserLoginData({ state, commit, dispatch }, user) {
    // 更新用户token
    if (!!user.token) {
      commit('updateUserToken', user.token);
    }
    // 哈希编码
    commit('updateHashCode', user.hashCode);

    // 更新公司编号
    commit('updateCompanyCode', user.companyCode);

    // 更新用户数据
    commit('updateUserData', {
      id: user.userId,
      companyCode: user.companyCode,
      deptId: user.deptId,
      realName: user.realName,
      userName: user.userName,
      manager: user.manager,
      loginAddress: user.loginAddress,
      loginDevice: user.loginDevice,
      signature: user.signature,
      messagePushId: user.messagePushId,
      roleIds: user.roleIds,
    });

    // 更新机构数据
    dispatch('getDepartmentList')
    // 更新委托方数据
    dispatch('getPrincipalList')
    // 更新门店数据
    // dispatch('getStoreList')
    // 更新部门数据
    dispatch('getDepartmentList')
    // 更新受托方数据
    dispatch('getAllOutsource')
    // 连接消息推送
    ReminderService.connect()
  },
  /**
   * 更新用户资源信息
   * @param param0 
   * @param resources 资源信息
   */
  updateResourcesData({ state, commit, dispatch }, resources) {
    // 更新用户控件资源
    commit('updateUserControlResource', resources.controlResourceResponses);

    // 更新用户菜单资源
    commit('updateUserMenuResource', resources.menuResourceResponses);
  },
  /**
   * 清除登录数据
   */
  clearUserLoginData({ commit }) {
    // 重置用户token
    commit('updateUserToken', "");
    // 重置哈希编码
    commit('updateHashCode', "");
    // 更新用户菜单资源
    commit('updateUserMenuResource', []);
    // 重置用户控件资源
    commit('updateUserControlResource', []);
    // 重置用户数据
    commit('updateUserData', {})
    // 重置受托方列表
    commit('updateOutSourceList', [])
    // 重置委托方列表
    commit("updatePrincipalList", [])
    // 重置门店列表
    commit("updateStoreList", [])
    // 更新公司编号
    commit('updateCompanyCode', "");
    //重置token过期标识
    commit('updateTokenExpire', false);
  }
}
