import { managementService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';

export class UserService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 增加用户
   */
  @Debounce()
  public createUser(data) {
    return this.netService.send({
      server: managementService.userController.createUser,
      data,
      loading: true,
    });
  }
  /**
   * 查询部门下的特定用户
   */
  @Debounce()
  public getAllUsers(data, page) {
    return this.netService.send({
      server: managementService.userController.getAllUsers,
      data,
      page,
    });
  }
  /**
   * 用户批量分配角色
   */
  @Debounce()
  public batchAllotRole(data) {
    return this.netService.send({
      server: managementService.userController.batchAllotRole,
      data,
      loading: true,
    });
  }
  /**
   * 修改用户
   */
  @Debounce()
  public modifyUser(data) {
    return this.netService.send({
      server: managementService.userController.modifyUser,
      data,
      loading: true,
    });
  }

  /**
   * 重置密码
   */
  @Debounce()
  public modifyUserPassword({ userId }) {
    return this.netService.send({
      server: managementService.userController.modifyUserPassword,
      data: {
        userId,
      },
    });
  }

  /**
   * 批量设置催收员等级
   */
  @Debounce()
  public batchUpdateUserLevel(data) {
    return this.netService.send({
      server: managementService.userController.batchUpdateUserLevel,
      data,
    });
  }

  /**
   * 批量开启关闭分案
   */
  @Debounce()
  public batchCaseSwitch(data) {
    return this.netService.send({
      server: managementService.userController.batchCaseSwitch,
      data,
    });
  }

  /**
   * 根据查询所有用户不分页
   */
  public getAllUsersList(data) {
    return this.netService.send({
      server: managementService.userController.getAllUsersList,
      data,
    });
  }
}
