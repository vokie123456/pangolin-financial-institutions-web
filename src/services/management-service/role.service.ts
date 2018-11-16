import { managementService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { Service } from '~/core/service';

export class RoleService extends Service{
  @Inject(NetService)
  private netService: NetService;

  /**
   * 查询角色资源
   */
  @Debounce()
  public getAllRoles(data, page) {
    return this.netService.send({
      server: managementService.roleController.getAllRoles,
      data,
      page,
    });
  }
  /**
   * 新增角色
   */
  @Debounce()
  public createRole(data) {
    return this.netService.send({
      server: managementService.roleController.createRole,
      data,
      loading: true,
    });
  }

  /**
   * 修改角色
   */
  @Debounce()
  public updateRole(data) {
    return this.netService.send({
      server: managementService.roleController.updateRole,
      data,
      loading: true,
    });
  }

  /**
   * 角色分配资源权限
   */
  @Debounce()
  public roleAttachResource(data) {
    return this.netService.send({
      server: managementService.roleController.roleAttachResource,
      data,
      loading: true,
    });
  }
  /**
   * 获取所有资源控件信息接口
   */
  public getAllResources() {
    return this.netService.send({
      server: managementService.roleController.getAllResources,
    });
  }
  /**
   * 获取角色资源信息接口
   */
  public getSelfResources(data) {
    return this.netService.send({
      server: managementService.roleController.getSelfResources,
      data,
    });
  }

  /**
   * 查询所有的角色信息不分页
   */
  public getAllRolesList() {
    return this.netService.send({
      server: managementService.roleController.getAllRolesList,
    });
  }
}
