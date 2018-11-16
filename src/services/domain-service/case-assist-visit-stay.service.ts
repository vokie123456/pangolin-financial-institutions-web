import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';

export class CaseAssitVisitStayService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 协催管理-诉讼待分配-待分配列表
   */
  public searchPendingList(data, page, sort) {
    return this.netService.send({
      server: domainService.caseAssistVisitStayCotroller.searchPendingList,
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
        createTimeStart: FilterService.dateRanageFormat(data.creatTime).start,
        createTimeEnd: FilterService.dateRanageFormat(data.creatTime).end,
        productName: data.productName,
        lawNumber:data.lawNumber,
      },
      page,
      sort,
    });
  }

  /**
   * 协催管理-诉讼待分配--待分配手动分案预览
   */
  public synergisticDistribution(data) {
    return this.netService.send({
      server: domainService.caseAssistVisitStayCotroller.synergisticDistribution,
      data,
    });
  }

  /**
   * 协催管理-诉讼待分配-手动分案确认
   */
  public confirmDistributeCase(data) {
    return this.netService.send({
      server: domainService.caseAssistVisitStayCotroller.confirmDistributeCase,
      data,
    });
  }

  /**
   * 协催管理-诉讼待分配-委外分配案件
   */
  public confirmDistributeCaseOut(data) {
    return this.netService.send({
      server: domainService.caseAssistVisitStayCotroller.confirmDistributeCaseOut,
      data,
    });
  }

  /**
   * 协催管理-诉讼待分配-委外机构分案
   */
  public outsourcingCases(data) {
    return this.netService.send({
      server: domainService.caseAssistVisitStayCotroller.outsourcingCases,
      data,
    });
  }

}
