import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourcePerformanceService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外管理-委外业绩查询-委外批次业绩
   */
  public queryCaseOutBathList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourcePerformanceManageController.queryCaseOutBathList,
      data,
      page,
      sort,
    })
  }
   /**
    * 委外管理-委外业绩查询-money
    */
  public queryCaseOutMoneyList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourcePerformanceManageController.queryCaseOutMoneyList,
      data,
      page,
      sort,
    })
  }
   /**
    * 委外管理-委外业绩查询-委外产品业绩
    */
   public queryCaseOutProductList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourcePerformanceManageController.queryCaseOutProductList,
      data,
      page,
      sort,
    })
  }

   /**
    * 委外管理-委外业绩查询-批次号
    */
   public queryOutBatchList(data) {
    return this.netService.send({
      server: domainService.outsourcePerformanceManageController.queryOutBatchList,
      data,
    })
  }  


}