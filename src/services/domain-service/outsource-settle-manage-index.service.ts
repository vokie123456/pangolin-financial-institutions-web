
import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';


export class OutsourceSettlevOucherService {
  @Inject(NetService)
  private netService: NetService
  /**
   *  委外结算单列表
   */
  public getCaseSettlementSheetPageList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceSettleIndexManageController.getCaseSettlementSheetPageList,
      data:{
        outBatch:data.outBatch,
        delegateDate:FilterService.dateRanageFormat(data.date).start,
        endDate:FilterService.dateRanageFormat(data.date).end,
        outId:data.outName
      },
      page,
      sort,
    })
  }  

  /**
   *  委外结算单明细列表
   */
  public getSettlementSheetDetailPageList(data) {
    return this.netService.send({
      server: domainService.outsourceSettleIndexManageController.getSettlementSheetDetailPageList,
      data
    })
  }  

  /**
   *  导出对账单
   */
  public exportSettlementSheet(data) {
    return this.netService.send({
      server: domainService.outsourceSettleIndexManageController.exportSettlementSheet,
      data
    })
  } 

  /**
   *  导出对账单明细
   */
  public exportSettlementSheetDetail(data) {
    return this.netService.send({
      server: domainService.outsourceSettleIndexManageController.exportSettlementSheetDetail,
      data
    })
  } 
}

