import { managementService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
import { PageService } from "~/utils/page.service";
import { SortService } from "~/utils/sort.service";
import { Service } from "~/core/service"
import outsourceSettleController from "~/config/server/management-service/outsource-settle.controller";

export class OutsourceService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 新增委外結算策略
   */
  @Debounce()
  public addSettlementStrategy(data: any) {
    return this.netService.send({
      server: managementService.outsourceSettleController.addSettlementStrategy,
      data,
      loading: true
    })
  }

  /**
   * 委外結算策略查看
   */
  public getSettlementStrategyById(data: any) {
    return this.netService.send({
      server: managementService.outsourceSettleController.getSettlementStrategyById,
      data
    })
  }

  /**
   * 委外結算策略列表
   */
  public getSettlementStrategyPageList(data: any, page) {
    return this.netService.send({
      server: managementService.outsourceSettleController.getSettlementStrategyPageList,
      data,
      page
    })
  }

  /**
   * 修改委外結算策略
   */
  public updateSettlementStrategy(data: any) {
    return this.netService.send({
      server: managementService.outsourceSettleController.updateSettlementStrategy,
      data,
      loading: true
    })
  }





}
