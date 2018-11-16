import { requestType } from '~/config/enum.config'

const SERVICE = 'management-service'
const CONTROLLER = 'loginController'

export default {
  /**
   * 通过角色Id获取所有资源信息
   */
  getAllResourcesByRoleId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllResourcesByRoleId',
    type: requestType.Post
  },
  /**
   * 通过userToken获取用户信息
   */
  getUserByToken: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getUserByToken',
    type: requestType.Get
  },
  /**
   * 用户登录
   */
  login: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'login',
    type: requestType.Post
  },
  /**
   * 更新用户密码
   */
  updatePassword: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updatePassword',
    type: requestType.Post
  },


}
