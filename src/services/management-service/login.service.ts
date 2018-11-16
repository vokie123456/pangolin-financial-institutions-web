import { managementService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
import { PageService } from "~/utils/page.service";
import { SortService } from "~/utils/sort.service";
import { Service } from "~/core/service"

export class LoginService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 通过角色Id获取所有资源信息
   * @param data 查询参数实体
   */
  public getAllResourcesByRoleId(data: any): any {
    return this.netService.send({
      server: managementService.loginController.getAllResourcesByRoleId,
      data: {
        // 用户拥有的角色列表
        roleIds: data.roleIds,
        // 用户名-登录名
        userName: data.userName,
        //
        realName: data.realName,
        // 用户Id
        userId: data.userId,
        // token
        token: data.token,
        // 公司编码
        companyCode: data.companyCode,
        // 机构id
        deptId: data.deptId,
        //
        hashCode: data.hashCode
      }
    })
  }

  /**
   * 通过userToken获取用户信息
   * @param userToken  登陆token
   */
  public getUserByToken(userToken: string): any {
    return this.netService.send({
      server: managementService.loginController.getUserByToken,
      data: {
        // 用户token
        userToken
      }
    })
  }

  /**
   * 用户登录
   * @param data 登陆参数实体
   */
  @Debounce()
  public login(data: any): any {
    return this.netService.send({
      server: managementService.loginController.login,
      data: {
        password: data.password,
        userName: data.userName
      },
      loading: true
    })
  }

  /**
   * 更新用户密码
   * @param data 用户实体
   */
  @Debounce()
  public updatePassword(data: any): any {
    return this.netService.send({
      server: managementService.loginController.updatePassword,
      data: {
        password: data.password,
        userName: data.userName
      },
      loading: true
    })
  }


}
