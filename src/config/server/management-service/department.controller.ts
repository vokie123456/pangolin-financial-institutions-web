import { requestType } from '~/config/enum.config'

const SERVICE = 'management-service'
const CONTROLLER = 'departmentController'

export default {
  /**
   * 获取本级及以下机构
   */
  querySubDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'querySubDepartment',
    type: requestType.Get
  },
  /**
   * 移动组织机构
   */
  moveDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'moveDepartment',
    type: requestType.Get
  },
  /**
   * 删除部门
   */
  deleteDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: '',
    type: requestType.Delete
  },
  /**
   * 修改部门
   */
  updateDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateDepartment',
    type: requestType.Put
  },
  /**
   * 增加部门
   */
  createDepartment: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createDepartment',
    type: requestType.Post
  }
}
