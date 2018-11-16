import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceSettleService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 结清案件池
   */
  public getCaseSettlePoolPageList(params,page,sort) {
    return this.netService.send({
      server: domainService.outsourceSettleManageController.getCaseSettlePoolPageList,
      data:{
        outBatch: params.outBatch,
        caseNumber: params.caseNumber,
        personalName: params.personalName,
        mobileNo: params.mobileNo,
        idCard: params.idCard,
        areaId: params.areaId,
        customerCategory: params.customerCategory,

        outAmountMax: params.outAmount.max,
        outAmountMin: params.outAmount.min,
        overduePeriod: params.overduePeriod,
        overdueDaysMax: params.overdueDays.max,
        overdueDaysMin: params.overdueDays.min,
        
        currentCollector: params.currentCollector,
        followupBack: params.followupBack,
        turnSource: params.turnSource,
        productCategory: params.productCategory,
        productName: params.productName,
        followInTimeMax:  FilterService.dateRanageFormat(params.followInTime).end,
        followInTimeMin:  FilterService.dateRanageFormat(params.followInTime).start,
        outId: params.outName,
        collectionStatus: 'OUTER_PAYOFF',
      },
      page,
      sort,
    })
  }

  /**
   * 受托方列表 
   */
  public getOutSourceList() {
    return this.netService.send({
      server: domainService.outsourceSettleManageController.getOutSourceList,
    })
  }  

}

