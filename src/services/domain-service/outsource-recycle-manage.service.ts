import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceRecycleService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外回收案件查询
   */
  public caseOutRecoveryList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceRecycleManageController.caseOutRecoveryList,
      data:{
        batchNumber:data.batchNumber,
        caseNumber:data.caseNumber,
        personalName:data.personalName,
        mobileNo:data.mobileNo,
        idCard:data.idCard,
        localAddress:data.localAddress,
        currentCollector:data.currentCollector,
        overduePeriod:data.overduePeriod,
        turnSource:data.turnSource,
        followupBack:data.followupBack,
        productCategory:data.productCategory,
        productName:data.productName,
        followInTimeStart: FilterService.dateRanageFormat(data.followInTime).start,
        followInTimeEnd: FilterService.dateRanageFormat(data.followInTime).end,
        area:data.area,
        overdueDaysStart: data.overdueDays.min,
        overdueDaysEnd: data.overdueDays.max,
        overdueAmountStart:data.outAmount.min,
        overdueAmountEnd:data.outAmount.max,
      },
      page,
      sort,
    })
  }
  /**
   * 申请流转
   */
  public applyCirculation(data) {
    return this.netService.send({
      server: domainService.outsourceRecycleManageController.applyCirculation,
      data
    })
  }
  /**
   * 移入委外待分配
   */
  public caseMoveAllocation(data) {
    return this.netService.send({
      server: domainService.outsourceRecycleManageController.caseMoveAllocation,
      data
    })
  }

}
