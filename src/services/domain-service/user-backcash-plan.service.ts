import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";


export class UserBackcashPlanService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 月度回款金额管理列表
   */
  @Debounce()
  public query(data, page) {
    return this.netService.send({
      server: domainService.userBackcashPlanController.query,
      data,
      page
    })
  }
  @Debounce()
  public importBackAmtGoalExcel(data) {
    return this.netService.send({
      server: domainService.userBackcashPlanController.importBackAmtGoalExcel,
      data
    })
  }
  /**
   * 批量删除
   */
  @Debounce()
  public deleteManyUserBackcashPlan(data) {
    return this.netService.send({
      server: domainService.userBackcashPlanController.deleteManyUserBackcashPlan,
      data
    })
  }
  /**
   * 删除
   */
  @Debounce()
  public deleteUserBackcashPlan(data) {
    return this.netService.send({
      server: domainService.userBackcashPlanController.deleteUserBackcashPlan,
      data
    })
  }
  /**
   * 下载月度回款目标Excel模版
   */
  @Debounce()
  public downloadUserBackcashPlanExcelTemplate(data) {
    return this.netService.send({
      server: domainService.userBackcashPlanController.downloadUserBackcashPlanExcelTemplate,
      data
    })
  }
  /**
   * 更新用户计划回款
   */
  @Debounce()
  public updateUserBackcashPlan(data) {
    return this.netService.send({
      server: domainService.userBackcashPlanController.updateUserBackcashPlan,
      data
    })
  }
}
