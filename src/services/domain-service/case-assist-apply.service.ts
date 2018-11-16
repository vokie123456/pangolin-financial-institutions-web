import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class CaseAssistApplyService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 协催申请电催审批
   */
  @Debounce()
  public assistApplyTelApprove(data, id) {
    return this.netService.send({
      server: domainService.caseAssistApplyController.assistApplyTelApprove,
      data,
      append: id
    })
  }
  /**
   * 协催申请外访审批
   */
  @Debounce()
  public assistApplyVisitApprove(data, id) {
    return this.netService.send({
      server: domainService.caseAssistApplyController.assistApplyVisitApprove,
      data,
      append: id
    })
  }
  /**
   * 电催审批协催申请页面条件查询
   */
  @Debounce()
  public findAllApply(data, page?, sort?) {
    return this.netService.send({
      server: domainService.caseAssistApplyController.findAllApply,
      data: {
        companyCode: data.companyCode,
        personalName: data.personalName,
        applyRealName: data.applyRealName,
        personalPhone: data.personalPhone,
        batchNumber: data.batchNumber,
        overdueAmount: [data.amtRange.min, data.amtRange.max],
        principalId: data.principalId
      },
      page,
      sort
    })
  }
  /**
   * 协催申请外访审批
   */
  @Debounce()
  public findAllTelPassedApply(data, page?, sort?) {
    return this.netService.send({
      server: domainService.caseAssistApplyController.findAllTelPassedApply,
      data: {
        companyCode: data.companyCode,
        personalName: data.personalName,
        applyRealName: data.applyRealName,
        personalPhone: data.personalPhone,
        batchNumber: data.batchNumber,
        overdueAmount: [data.amtRange.min, data.amtRange.max],
        principalId: data.principalId
      },
      page,
      sort
    })
  }
}
