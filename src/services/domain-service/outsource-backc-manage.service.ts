import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceBackCService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 归C案件池列表
   */
  public getCaseBackCPoolPageList(params,page,sort) {
    return this.netService.send({
      server: domainService.outsourceBackCManageController.getCaseSettlePoolPageList,
      data: {
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
        outId: params.outId,
        collectionStatus: 'OUTER_BANKC',
      },
      page,
      sort,
    })
  }
}
