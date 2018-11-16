import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceCollectionService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外催收列表
   */
  public earchCaseOutList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceCollectionManageController.searchCaseOutList,
      data:{
        overdueAmountStart: data.overdueAmount.min,
        overdueAmountEnd: data.overdueAmount.max,
        overdueDaysStart: data.overdueDays.min,
        overdueDaysEnd: data.overdueDays.max,
        followInTimeStart: FilterService.dateRanageFormat(data.followInTime).start,
        followInTimeEnd: FilterService.dateRanageFormat(data.followInTime).end,
        outTimeStart:FilterService.dateRanageFormat(data.outTimeDate).start,
        outTimeEnd:FilterService.dateRanageFormat(data.outTimeDate).end,
        outEndDateStart:FilterService.dateRanageFormat(data.outEndDate).start,
        outEndDateEnd:FilterService.dateRanageFormat(data.outEndDate).end,
        followUpTimeStart:FilterService.dateRanageFormat(data.followUpTime).start,
        followUpTimeEnd:FilterService.dateRanageFormat(data.followUpTime).end,
        applyStatus:data.applyStatus,
        leaveCaseFlag:data.leaveCaseFlag,
        customerCategory:data.customerCategory,
        outsourceId:data.outsourceId,
        collectorRealName:data.collectorRealName,
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
   * 委外管理-委外催收案件-回收案件
   */
  public caseRecovery(data) {
    return this.netService.send({
      server: domainService.outsourceCollectionManageController.caseRecovery,
      data
    })
  }
  /**
   * 委外管理-委外催收案件-留案
   */
  public caseStay(data) {
    return this.netService.send({
      server: domainService.outsourceCollectionManageController.caseStay,
      data
    })
  }

  /**
   * 委外管理-委外催收案件-导入电催跟进
   */
  public importMobileUrge(data) {
    return this.netService.send({
      server: domainService.outsourceCollectionManageController.importMobileUrge,
      data
    })
  }

  /**
   * 委外管理-委外催收案件-导入外访跟进
   */
  public importOutVisit(data) {
    return this.netService.send({
      server: domainService.outsourceCollectionManageController.importOutVisit,
      data
    })
  }  

  /**
   * 委外管理-委外催收案件-导入外访附件
   */
  public importOutVisitEnclosure(data) {
    return this.netService.send({
      server: domainService.outsourceCollectionManageController.importOutVisitEnclosure,
      data
    })
  }  
 
  /**
   * 委外管理-委外催收案件-取消留案
   */
  public unCaseStay(data) {
    return this.netService.send({
      server: domainService.outsourceCollectionManageController.unCaseStay,
      data
    })
  }   
}
