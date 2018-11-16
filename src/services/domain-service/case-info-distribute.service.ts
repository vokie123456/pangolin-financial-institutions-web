import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service'
export class CaseInfoDistributeService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 案件分配手动分案
   */
  @Debounce()
  public manualAllocation(data) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.manualAllocation,
      data: {
        caseNumberList: data.caseNumberList,
        type: data.type,
        closeDate: data.closeDate
      }
    })
  }
  /**
   * 策略分配情况统计
   */
  public countStrategyAllocation(data, caseIds?) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.countStrategyAllocation,
      data: {
        batchNumber: data.batchNumber,
        caseIds: data.caseIds || caseIds,
        cityId: data.cityId,
        companyCode: data.companyCode,
        handNumberEnd: data.handNumberEnd,
        handNumberStart: data.handNumberStart,
        mobileNo: data.mobileNo,
        operator: '',
        overdueDaysStart: data.dayRange.min,
        overdueDaysEnd: data.dayRange.max,
        overDueAmountStart: data.amountRange.min,
        overDueAmountEnd: data.amountRange.max,
        commissionRateStart: data.rateRange.min,
        commissionRateEnd: data.rateRange.max,
        personalName: data.personalName,
        principalId: data.principalId,
        provinceId: data.provinceId,
        size: 0
      }
    })
  }
  /**
   * 案件导入分配策略分案
   */
  @Debounce()
  public strategyAllocation(modelList) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.strategyAllocation,
      data: {
        modelList
      }
    })
  }

  /**
   * 案件详情查询操作
   */
  @Debounce()
  public getCaseInfoDistributedDetails(id) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.getCaseInfoDistributedDetails,
      data: {
        id
      }
    })
  }

  /**
   * 查找用户的案件数
   */
  @Debounce()
  public getUserInfoByUserId(data) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.getUserInfoByUserId,
      data: {
        userIds: data
      }
    })
  }
  /**
   * 查找部门下的案件数
   */
  public getCaseCountOnDept(data) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.getCaseCountOnDept,
      data: {
        deptCode: data
      }
    })
  }
  /**
   * 案件分配策略预览
   */
  public previewResult(data, page?) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.previewResult,
      data: {
        personalName: data.personalName,
        phone: data.phone,
        idCard: data.idCard,
        batchNumber: data.batchNumber,
        jsonString: data.jsonString,
        type: data.type,
        startAmount: data.amtRange.min,
        endAmount: data.amtRange.max,
        seriesIds: data.seriesIds,
        productIds: data.productIds,
        shops: data.shops
      },
      page
    })
  }
  /**
   * 案件分配(机构时传入机构的ID)
   */
  public distributeCeaseInfo(data) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.distributeCeaseInfo,
      data: {
        caseIdList: data.caseIdList,
        depIdList: data.depIdList,
        disType: data.disType,
        caseNumList: data.caseNumList
      }
    })
  }
  /**
   * 案件评分
   */
  public importCaseScore(data) {
    return this.netService.send({
      server: domainService.caseInfoDistributeController.importCaseScore,
      data: {
        ids: data
      }
    })
  }
}
