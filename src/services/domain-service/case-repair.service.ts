import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class CaseRepairService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 待修复案件查询
   */
  @Debounce()
  public getAllRepairingCase(data?, page?) {
    return this.netService.send({
      server: domainService.caseRepairController.getAllRepairingCase,
      data: {
        companyCode: data.companyCode,
        "caseId.personalInfo.name": data.personalName, // 客户姓名
        "caseId.principalId.name": data.principalName, // 委托方
        "caseId.overdueAmount": [data.overdueAmount.min, data.overdueAmount.max], // 修复案件金额-
        repairStatus: data.repairStatus, // 状态
        "caseId.payStatus": data.payStatus, // 逾期期数
        "caseId.overdueDays": [data.overdueDays.min, data.overdueDays.max]//逾期天数

      },
      page
    })
  }
  /**
   * 修复附件查看
   */
  public viewCaseRepairRecord(data) {
    return this.netService.send({
      server: domainService.caseRepairController.viewCaseRepairRecord,
      data
    })
  }
  /**
   * 查看已修复案件信息
   */
  public viewCaseRepair({ id }) {
    return this.netService.send({
      server: domainService.caseRepairController.viewCaseRepair,
      data: {
        id
      }
    })
  }
  /**
   * 修复案件状态
   */
  public toRepair(data) {
    return this.netService.send({
      server: domainService.caseRepairController.toRepair,
      data
    })
  }
  /**
   * 修复分配
   */
  public distributeRepairCase(data) {
    return this.netService.send({
      server: domainService.caseRepairController.distributeRepairCase,
      data
    })
  }
}

