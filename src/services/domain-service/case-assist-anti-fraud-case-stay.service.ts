import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';

export class CaseAssistAntiFraudCaseStayService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 协催管理-反欺诈待分配
   */
  public queryAntiFraudList(data, page, sort) {
    return this.netService.send({
      server: domainService.caseAssistAntiFraudCaseStayCase.queryAntiFraudList,
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
      },
      page,
      sort,
    });
  }

  /**
   * 协催管理-反欺诈待分配-预览
   */
  public previewCaseAssist(data) {
    return this.netService.send({
      server: domainService.caseAssistAntiFraudCaseStayCase.previewCaseAssist,
      data,
    });
  }

  /**
   * 协催管理-反欺诈待分配-确定
   */
  public distributeCaseAssist(data) {
    return this.netService.send({
      server: domainService.caseAssistAntiFraudCaseStayCase.distributeCaseAssist,
      data,
    });
  }

}
