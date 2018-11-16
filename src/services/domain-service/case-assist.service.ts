import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';

export class CaseAssistService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 获取协催管理-外访待分配-数据显示
   */
  public getAllWaitVisitCaseAssist(data, page, sort) {
    return this.netService.send({
      server: domainService.caseAssistController.getAllWaitVisitCaseAssist,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        areaId: data.areaId,
        addressDetail: data.addressDetail,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        turnSource: data.turnSource,
        productCategory: data.productCategory,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime).start,
        productName: data.productName,
        customerCategory: data.customerCategory,
        overdueAmountMin: data.overdueAmount.min,
        overdueAmountMax: data.overdueAmount.max,
        overduePeriod: data.overduePeriod,
      },
      page,
      sort,
    });
  }

  /**
   * 协催管理-外访催收-数据显示
   */
  public getAllVisitCaseAssist(data, page, sort) {
    return this.netService.send({
      server: domainService.caseAssistController.getAllVisitCaseAssist,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        idCard: data.idCard,
        areaId: data.areaId,
        addressDetail: data.addressDetail,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followupBack: data.followupBack,
        turnSource: data.turnSource,
        productCategory: data.productCategory,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        visitEndDateMax: FilterService.dateRanageFormat(data.visitEndDate).end,
        visitEndDateMin: FilterService.dateRanageFormat(data.visitEndDate)
          .start,
        productName: data.productName,
        caseMark: data.caseMark,
        assistStatus: data.assistStatus,
        followTimeMax: FilterService.dateRanageFormat(data.followTime).end,
        followTimeMin: FilterService.dateRanageFormat(data.followTime).start,
        caseDistributeTimeMax: FilterService.dateRanageFormat(
          data.caseDistributeTime,
        ).end,
        caseDistributeTimeMin: FilterService.dateRanageFormat(
          data.caseDistributeTime,
        ).start,
        assistCollectorName: data.assistCollectorName,
      },
      page,
      sort,
    });
  }

  /**
   * 协催管理-外访待分配-分案
   */
  public distributeCaseAssist(data) {
    return this.netService.send({
      server: domainService.caseAssistController.distributeCaseAssist,
      data,
    });
  }

  /**
   * 协催管理-案件标色
   */
  public markCaseAssistColor(data) {
    return this.netService.send({
      server: domainService.caseAssistController.markCaseAssistColor,
      data,
    });
  }
}
