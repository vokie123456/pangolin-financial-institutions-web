import { dataimpService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ScoreStrategyService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 保存评分策略
   */
  @Debounce()
  public saveScoreStrategy(data) {
    return this.netService.send({
      server: dataimpService.scoreStrategyController.saveScoreStrategy,
      data
    })
  }
  /**
   * 获取评分规则
   */
  @Debounce()
  public query(data) {
    return this.netService.send({
      server: dataimpService.scoreStrategyController.query,
      data
    })
  }
  /**
   * 删除评分规则
   */
  @Debounce()
  public deleteScoreStrategy(data) {
    return this.netService.send({
      server: dataimpService.scoreStrategyController.deleteScoreStrategy,
      data
    })
  }
}
