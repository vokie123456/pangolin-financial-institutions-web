import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';

export class CaseAssistAntiFraudSurveyCaseService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 协催管理-反欺诈调查案件
   */
  public queryAntiFraudCaseList(data, page, sort) {
    return this.netService.send({
      server: domainService.caseAssistAntiFraudSurveyCase.queryAntiFraudCaseList,
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
        surveyResults:data.surveyResults,
      },
      page,
      sort,
    });
  }

  /**
   * 协催管理-反欺诈调查案件-设置调查结果
   */
  public setAntiFraudCaseByCaseId(data) {
    return this.netService.send({
      server: domainService.caseAssistAntiFraudSurveyCase.setAntiFraudCaseByCaseId,
      data,
    });
  }
}
