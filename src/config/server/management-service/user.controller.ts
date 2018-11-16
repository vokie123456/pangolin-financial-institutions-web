import { requestType } from '~/config/enum.config';

const SERVICE = 'management-service';
const CONTROLLER = 'userController';

export default {
  /**
   * 增加用户
   */
  createUser: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createUser',
    type: requestType.Post,
  },
  /**
   * 查询部门下的特定用户
   */
  getAllUsers: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllUsers',
    type: requestType.Get,
  },
  /**
   * 用户批量分配角色
   */
  batchAllotRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'batchAllotRole',
    type: requestType.Post,
  },
  /**
   * 修改用户
   */
  modifyUser: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modifyUser',
    type: requestType.Post,
  },
  /**
   * 重置密码
   */
  modifyUserPassword: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modifyUserPassword',
    type: requestType.Post,
  },
  /**
   * 批量设置催收员等级
   */
  batchUpdateUserLevel: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'batchUpdateUserLevel',
    type: requestType.Post,
  },
  /**
   * 批量开启关闭分案
   */
  batchCaseSwitch: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'batchCaseSwitch',
    type: requestType.Post,
  },
  /**
   * 根据查询所有用户不分页
   */
  getAllUsersList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllUsersList',
    type: requestType.Get,
  },
};
