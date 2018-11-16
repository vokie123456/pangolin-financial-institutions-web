import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service'
import { Service } from "~/core/service"
export class CaseInfoVerificationService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 查看附件
   */
  @Debounce()
  public saveCaseInfoVerification(data) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.saveCaseInfoVerification,
      data
    })
  }
  /**
   * 案件按催收类型查询
   */
  public getCaseInfoVerification(data, page) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.getCaseInfoVerification,
      data: {
        companyCode: data.companyCode,
        'caseInfo.batchNumber': data['caseInfo.batchNumber'], // 批次号
        'caseInfo.personalInfo.name': data['caseInfo.personalInfo.name'],
        'caseInfo.personalInfo.mobileNo': data['caseInfo.personalInfo.mobileNo'],
        'caseInfo.overdueAmount': [data.overdueAmount.min, data.overdueAmount.max],
        'caseInfo.commissionRate': [data.commissionRate.min, data.commissionRate.max],
        'caseInfo.delegationDate': [FilterService.dateRanageFormat(data['caseInfo.delegationDate']).start, FilterService.dateRanageFormat(data['caseInfo.delegationDate']).end],
        'caseInfo.closeDate': [FilterService.dateRanageFormat(data['caseInfo.closeDate']).start, FilterService.dateRanageFormat(data['caseInfo.closeDate']).end],
        'caseInfo.principalId.name': data['caseInfo.principalId.name']
      },
      page
    })
  }
  /**
   * 核销管理导出
   */
  public exportVerification(data) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.exportVerification,
      data
    })
  }
  /**
   * 案件下载记录查询
   */
  public getCaseInfoVerificationPackaging(data, page) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.getCaseInfoVerificationPackaging,
      data: {
        packagingTime: [FilterService.dateRanageFormat(data.packagingTime).start, FilterService.dateRanageFormat(data.packagingTime).end],
        totalAmount: [data.totalAmount.min, data.totalAmount.max],
      },
      page
    })
  }
  /**
   * 案件下载记录单个下载
   */
  public download(data) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.download,
      data
    })
  }
  /**
   * 案件下载记录批量下载
   */
  public batchDownload(data) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.batchDownload,
      data
    })
  }
  /**
   * 获取核销申请系统参数
   */
  public getSysparm() {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.getSysparm
    })
  }
  /**
   * 核销案件审批查询
   */
  @Debounce()
  public getCaseInfoVerificationApproval(data, page) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.getCaseInfoVerificationApproval,
      data: {
        overdueAmountMin: data.overdueAmount.min,
        overdueAmountMax: data.overdueAmount.max,
        overdueDaysMin: data.overdueDays.min,
        overdueDaysMax: data.overdueDays.max,
        applicationDateMin: FilterService.dateRanageFormat(data.applicationDate).start,
        applicationDateMax: FilterService.dateRanageFormat(data.applicationDate).end,
        companyCode: data.companyCode,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        batchNumber: data.batchNumber,
        principalName: data.principalName,
        approvalStatus: data.approvalStatus
      },
      page
    })
  }
  /**
   * 核销单个案件查询
   */
  public caseInfoVerification(data) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.caseInfoVerification,
      data
    })
  }
  /**
   * 案件申请审批通过
   */
  public caseInfoVerificationApply(data) {
    return this.netService.send({
      server: domainService.caseInfoVerificationController.caseInfoVerificationApply,
      data
    })
  }
}
