import { dataimpService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class CaseStrategyService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 生成案件分配策略
   */
  @Debounce()
  public addCaseStrategy(data) {
    return this.netService.send({
      server: dataimpService.caseStrategyController.addCaseStrategy,
      data
    })
  }
  /**
   * 分配策略按条件分页查询
   */
  @Debounce()
  public getCaseStrategy(data, page?) {
    return this.netService.send({
      server: dataimpService.caseStrategyController.getCaseStrategy,
      data,
      page
    })
  }
  /**
   * 预览案件生成规则
   */
  @Debounce()
  public queryCaseInfoByCondition() {
    return this.netService.send({
      server: dataimpService.caseStrategyController.queryCaseInfoByCondition
    })
  }
  /**
   * 策略分配案件
   */
  @Debounce()
  public smartDistribute() {
    return this.netService.send({
      server: dataimpService.caseStrategyController.smartDistribute
    })
  }
  /**
   * 检查策略名称是否重复
   */
  public findCaseStrategy(data) {
    return this.netService.send({
      server: dataimpService.caseStrategyController.findCaseStrategy,
      data
    })
  }
  /**
   * 删除策略
   */
  public deleteCaseStrategy(ruleId) {
    return this.netService.send({
      server: dataimpService.caseStrategyController.deleteCaseStrategy,
      data: {
        ruleId
      }
    })
  }
}
