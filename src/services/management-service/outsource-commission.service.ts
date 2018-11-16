import { managementService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
import { PageService } from "~/utils/page.service";
import { SortService } from "~/utils/sort.service";
import { Service } from "~/core/service"
import outsourceCommissionController from "~/config/server/management-service/outsource-commission.controller";

export class OutsourceCommissionService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 委外佣金策略列表
   */
  @Debounce()
  public getCommissionStrategyList(data: any, page) {
    return this.netService.send({
      server: managementService.outsourceCommissionController.getCommissionStrategyList,
      data,
      page
    })
  }

  /**
   * 委外佣金策略删除
   */
  public delCommissionStrategy(data: any) {
    return this.netService.send({
      server: managementService.outsourceCommissionController.delCommissionStrategy,
      data,
      loading: true
    })
  }

  /**
   * 委外佣金策略详情
   */
  public getCommissionStrategyDetail(data: any) {
    return this.netService.send({
      server: managementService.outsourceCommissionController.getCommissionStrategyDetail,
      data
    })
  }

  /**
   * 委外佣金策略新增
   */
  public insertCommissionStrategy(data: any) {
    return this.netService.send({
      server: managementService.outsourceCommissionController.insertCommissionStrategy,
      data,
      loading: true
    })
  }

  /**
   * 委外产品下拉列表
   */
  public selectProductList() {
    return this.netService.send({
      server: managementService.outsourceCommissionController.selectProductList
    })
  }

  /**
   * 委外佣金策略下拉列表
   */
  public selectCommissionStrategyList() {
    return this.netService.send({
      server: managementService.outsourceCommissionController.selectCommissionStrategyList
    })
  }

  /**
   * 委外佣金策略编辑
   */
  public editCommissionStrategy(data: any) {
    return this.netService.send({
      server: managementService.outsourceCommissionController.editCommissionStrategy,
      data
    })
  }



}
