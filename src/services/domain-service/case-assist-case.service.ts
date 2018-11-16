import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';

export class CaseAssitCaseService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 协催管理-诉讼案件
   */
  public queryCaseAssistlist(data, page, sort) {
    return this.netService.send({
      server: domainService.caseAssistCasecontroller.queryCaseAssistlist,
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
        creatTimeStart: FilterService.dateRanageFormat(data.creatTime).start,
        creatTimeEnd: FilterService.dateRanageFormat(data.creatTime).end,
        productName: data.productName,
        lawNumber:data.lawNumber,
      },
      page,
      sort,
    });
  }
  
  /**
   * 协催管理-协催管理-重新分配
   */
  public newDistributeCaseAssist(data) {
    return this.netService.send({
      server: domainService.caseAssistCasecontroller.newDistributeCaseAssist,
      data,
    });
  }

  /**
   * 协催管理-外访待分配-预览
   */
  public previewCaseAssist(data) {
    return this.netService.send({
      server: domainService.caseAssistCasecontroller.previewCaseAssist,
      data,
    });
  }

}
