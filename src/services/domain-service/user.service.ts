import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class UserService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 增加用户
   */
  @Debounce()
  public createUser(data) {
    return this.netService.send({
      server: domainService.userController.createUser,
      data
    })
  }
  /**
   * 查询部门下的特定用户
   */
  @Debounce()
  public query(data, page) {
    return this.netService.send({
      server: domainService.userController.query,
      data,
      page
    })
  }
  /**
   * 查询角色下的用户
   */
  public getUserByRolePage(data, page) {
    return this.netService.send({
      server: domainService.userController.getUserByRolePage,
      data,
      page
    })
  }
  /**
   * 用户分配角色
   */
  public userAddRole(data) {
    return this.netService.send({
      server: domainService.userController.userAddRole,
      data
    })
  }
  /**
   * 用户批量分配角色
   */
  public manyUserAddRole(data) {
    return this.netService.send({
      server: domainService.userController.manyUserAddRole,
      data
    })
  }
  /**
   * 查询机构下用户
   */
  public getUserByType(data, page) {
    return this.netService.send({
      server: domainService.userController.getUserByType,
      data,
      page
    })
  }
  /**
   * 导出用户列表
   */
  public exportUserList(data) {
    return this.netService.send({
      server: domainService.userController.exportUserList,
      data
    })
  }
  /**
   * 查询部门下的用户
   * @param departmentId 部门ID
   * @param status 用户状态 0 启用, 1禁用 默认为0 
   */
  public queryNoPage(departmentId: string, status: number = 0) {
    return this.netService.send({
      server: domainService.userController.queryNoPage,
      data: {
        id: departmentId,
        state: status
      }
    })
  }
  public queryUserByDeptAndRole(data, page) {
    return this.netService.send({
      server: domainService.userController.queryUserByDeptAndRole,
      data: {
        deptCode: data.deptCode,
        userName: data.userName,
        realName: data.realName,
        roleId: data.roleId,
        roleName: data.roleName
      },
      page
    })
  }
  /**
   * 修改用户
   */
  public updateUser(data) {
    return this.netService.send({
      server: domainService.userController.updateUser,
      data
    })
  }
  /**
   * 手动刷新缓存
   */
  public flushCache() {
    return this.netService.send({
      server: domainService.userController.flushCache,
    })
  }
}

