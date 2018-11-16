import { requestType } from '~/config/enum.config';

const SERVICE = 'management-service';
const CONTROLLER = 'roleController';

export default {
  /**
   * 新建角色接口
   */
  createRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createRole',
    type: requestType.Post,
  },
  /**
   * 角色分配资源权限接口
   */
  roleAttachResource: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'roleAttachResource',
    type: requestType.Post,
  },
  /**
   * 获取所有资源控件信息接口
   */
  getAllResources: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllResources',
    type: requestType.Get,
  },
  /**
   * 查询角色信息
   */
  getAllRoles: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllRoles',
    type: requestType.Get,
  },
  /**
   * 获取角色资源信息
   */
  getSelfResources: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSelfResources',
    type: requestType.Get,
  },
  /**
   * 修改角色
   */
  updateRole: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateRole',
    type: requestType.Put,
  },

  /**
   * 查询所有的角色信息不分页
   */
  getAllRolesList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllRolesList',
    type: requestType.Get,
  },
};
