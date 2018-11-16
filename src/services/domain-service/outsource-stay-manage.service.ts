import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';
export class OutsourceStayService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 分案确认
   */
  public confirmDistributeCase(data) {
    return this.netService.send({
      server: domainService.outsourceStayManageController.confirmDistributeCase,
      data
    })
  }
  /**
   * 委外方列表
   */
  public searchOutsourcePreview(page) {
    return this.netService.send({
      server: domainService.outsourceStayManageController.searchOutsourcePreview,
      page
    })
  }
  /**
   * 待分配列表
   */
  public searchPendingList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceStayManageController.searchPendingList,
      data:{
        overdueAmountStart: data.outAmount.min,
        overdueAmountEnd: data.outAmount.max,
        overdueDaysStart: data.overdueDays.min,
        overdueDaysEnd: data.overdueDays.max,
        followInTimeStart: FilterService.dateRanageFormat(data.followInTime).start,
        followInTimeEnd: FilterService.dateRanageFormat(data.followInTime).end,
        area: data.cityCode === '' ? data.proinviceCode:data.cityCode,
        personalName: data.personalName,
        turnSource: data.turnSource,
        productName: data.productName,
        productCategory: data.productCategory,
        overduePeriod: data.overduePeriod,
        outAmount: data.outAmount,
        mobileNo: data.mobileNo,
        localAddress: data.localAddress,
        idCard: data.idCard,
        currentCollector: data.currentCollector,
        batchNumber: data.batchNumber,
        caseNumber: data.caseNumber,
        cityCode: data.cityCode,
        followupBack: data.followupBack,
        outSourceType: data.outSourceType,
      },
      page,
      sort,
    })
  }
  /**
   * 分案预览列表
   */
  public searchSplitPreview(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceStayManageController.searchSplitPreview,
      data,
      page,
      sort,
    })
  }
}
