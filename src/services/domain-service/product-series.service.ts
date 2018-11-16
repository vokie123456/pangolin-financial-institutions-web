import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ProductSeriesService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取所有的产品名称
   */
  public getAllProductSeries() {
    return this.netService.send({
      server: domainService.productSeriesController.getAllProductSeries
    })
  }
}
