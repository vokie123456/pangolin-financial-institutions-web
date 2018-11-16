import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class CaseInfoExceptionService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 检查异常案件
   */
  @Debounce()
  public checkExceptionCase(data?) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.checkExceptionCase,
      data
    })
  }

  /**
   * 获取所有异常案件
   */
  @Debounce()
  public findAllCaseInfoException(data?, page?) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.findAllCaseInfoException,
      data: {
        companyCode: data.companyCode,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        batchNumber: data.batchNumber,
        overDueDays: [data.overDueDays.min, data.overDueDays.max],
        overdueAmount: [data.overdueAmount.min, data.overdueAmount.max],
        prinName: data.prinName
      },
      page
    })
  }

  /**
   * 添加案件
   */
  @Debounce()
  public addCaseInfoException(data) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.addCaseInfoException,
      data: {
        caseInfoExceptionId: data
      }
    })
  }

  /**
   * 获取所有重复案件
   */
  @Debounce()
  public findAllRepeatCaseInfo(data) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.findAllRepeatCaseInfo,
      data: {
        caseInfoExceptionId: data
      }
    })
  }

  /**
   * 更新案件
   */
  @Debounce()
  public updateExceptionCase(data) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.updateExceptionCase,
      data: {
        caseInfoExceptionId: data.caseInfoExceptionId,
        caseInfoIds: data.caseInfoIds
      }
    })
  }

  /**
   * 删除异常案件
   */
  @Debounce()
  public deleteCaseInfoException(data) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.deleteCaseInfoException,
      data: {
        caseInfoExceptionId: data
      }
    })
  }

  /**
   * 获取所有重复案件
   */
  @Debounce()
  public getAllRepeatCaseInfo(data) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.getAllRepeatCaseInfo,
      data: {
        caseInfoExceptionId: data
      }
    })
  }

  /**
   * 批量删除异常池案件
   */
  @Debounce()
  public batchDeleteCaseInfoException(data) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.batchDeleteCaseInfoException,
      data: {
        ids: data
      }
    })
  }
  /**
   * 批量新增
   */
  @Debounce()
  public batchAddCaseInfo(data) {
    return this.netService.send({
      server: domainService.caseInfoExceptionController.batchAddCaseInfo,
      data: {
        ids: data
      }
    })
  }
}
