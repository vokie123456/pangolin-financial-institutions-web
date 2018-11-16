import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourcePoolService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 委外案件管理全部案件案件明细查看旁边增加撤销分配
   */
  @Debounce()
  public revertOutCaseInfoDistribute(batchNumber) {
    return this.netService.send({
      server: domainService.outsourcePoolController.revertOutCaseInfoDistribute,
      data: {
        batchNumber
      }
    })
  }
  /**
   * 退案
   */
  public backOutsourcePool() {
    return this.netService.send({
      server: domainService.outsourcePoolController.backOutsourcePool
    })
  }
  /**
   * 财务数据确认操作
   */
  public affirmReconciliation(idList) {
    return this.netService.send({
      server: domainService.outsourcePoolController.affirmReconciliation,
      data: {
        idList
      }
    })
  }
  /**
   * 移入待分配
   */
  public changeToBeAssigned() {
    return this.netService.send({
      server: domainService.outsourcePoolController.changeToBeAssigned
    })
  }
  /**
   * 委外结案
   */
  public closeOutsourcePool(outCaseIds) {
    return this.netService.send({
      server: domainService.outsourcePoolController.closeOutsourcePool,
      data: {
        outCaseIds
      }
    })
  }
  /**
   * 委外案件导出
   */
  public exportAccOutsourcePool() {
    return this.netService.send({
      server: domainService.outsourcePoolController.exportAccOutsourcePool
    })
  }
  /**
   * 导出委外财务对账数据
   */
  public exportOutsideFinanceData(data) {
    return this.netService.send({
      server: domainService.outsourcePoolController.exportOutsideFinanceData,
      data
    })
  }
  /**
   * 查询已确认的数据
   */
  public findConfirmFinanceData(data, page?) {
    return this.netService.send({
      server: domainService.outsourcePoolController.findConfirmFinanceData,
      data,
      page
    })
  }
  /**
   * 查询未确认的数据
   */
  public findFinanceData(data, page?) {
    return this.netService.send({
      server: domainService.outsourcePoolController.findFinanceData,
      data,
      page
    })
  }
  /**
   * 查询可委外案件
   */
  public getAllOutCase() {
    return this.netService.send({
      server: domainService.outsourcePoolController.getAllOutCase
    })
  }
  /**
   * 查询委外分配信息
   */
  @Debounce()
  public getOutDistributeInfo(data, page) {
    return this.netService.send({
      server: domainService.outsourcePoolController.getOutDistributeInfo,
      data,
      page
    })
  }
  /**
   * 查询委外记录
   */
  public getOutRecored() {
    return this.netService.send({
      server: domainService.outsourcePoolController.getOutRecored
    })
  }
  /**
   * 按批次号查看委外案件详情
   */
  public getOutSourceCaseByBatchnum(data, page?) {
    return this.netService.send({
      server: domainService.outsourcePoolController.getOutSourceCaseByBatchnum,
      data: {
        outsId: data.outsId,
        'caseInfo.personalInfo.name': data['caseInfo.personalInfo.name'],
        'caseInfo.personalInfo.mobileNo': data['caseInfo.personalInfo.mobileNo'],
        batchNumber: data.batchNumber,
        contractAmt: [data.amtRange.min, data.amtRange.max],
      },
      page
    })
  }
  /**
   * 按批次号和委外名称查看委外案件详情
   */
  public getOutSourceCaseByOutName(data, page?) {
    return this.netService.send({
      server: domainService.outsourcePoolController.getOutSourceCaseByOutName,
      data: {
        companyCode: data.companyCode,
        outsId: data.outsId,
        type: data.type,
        outsIdList: data.outsIdList,
        ourBatchList: data.ourBatchList,
        outTimeStart: FilterService.dateRanageFormat(data.outTime).start,
        outTimeEnd: FilterService.dateRanageFormat(data.outTime).end
      },
      page
    })
  }
  /**
   * 查看委外案件跟进记录
   */
  public getOutSourceCaseFollowRecord(data, page?, sort?) {
    return this.netService.send({
      server: domainService.outsourcePoolController.getOutSourceCaseFollowRecord,
      data: {
        operatorTime: [FilterService.dateRanageFormat(data.operatorTime).start, FilterService.dateRanageFormat(data.operatorTime).end],
        caseNumber: data.caseNumber,
        type: data.type,
        collectionFeedback: data.collectionFeedback
      },
      page,
      sort
    })
  }
  /**
   * 多条件查询回收案件
   */
  public getReturnCaseByConditions(data, page) {
    return this.netService.send({
      server: domainService.outsourcePoolController.getReturnCaseByConditions,
      data: {
        outBatch: data.outBatch, // 批次号
        'caseId.personalInfo.name': data['caseId.personalInfo.name'],
        'caseId.personalInfo.mobileNo': data['caseId.personalInfo.mobileNo'],
        'caseId.personalInfo.idCard': data['caseId.personalInfo.idCard'],
        'caseId.overdueAmount': [data.overdueAmount.min, data.overdueAmount.max],
        'caseId.overdueDays': [data.overdueDays.min, data.overdueDays.max],
        overOutsourceTime: [FilterService.dateRanageFormat(data.overOutsourceTime).start, FilterService.dateRanageFormat(data.overOutsourceTime).end],

      },
      page
    })
  }
  /**
   * 账目导入/委外跟进记录导入
   */
  public importFinancData(data) {
    return this.netService.send({
      server: domainService.outsourcePoolController.importFinancData,
      data
    })
  }
  /**
   * 下载模板
   */
  @Debounce()
  public loadTemplate(type) {
    return this.netService.send({
      server: domainService.outsourcePoolController.loadTemplate,
      data: {
        type
      }
    })
  }
  /**
   * 待委外案件评分(手动)
   * @param 公司编码 可为空
   */
  @Debounce(2000)
  public outCaseScore(companyCode: string) {
    return this.netService.send({
      server: domainService.outsourcePoolController.outCaseScore,
      data: { companyCode }
    })
  }
  /**
   * 委外中案件评分(手动)
   */
  public outCurrentCaseScore() {
    return this.netService.send({
      server: domainService.outsourcePoolController.outCurrentCaseScore
    })
  }
  /**
   * 委外案件 待分配案件 策略分配
   */
  
  public outerStrategyDistribute(data) {
    return this.netService.send({
      server: domainService.outsourcePoolController.outerStrategyDistribute,
      data:{
        caseIds: data
      }
    })
  }
  /**
   * 委外待分配案件分配
   */
  public outsourceDistributeCeaseInfo(data) {
    return this.netService.send({
      server: domainService.outsourcePoolController.outsourceDistributeCeaseInfo,
      data
    })
  }
  /**
   * 委外待分配按数量平均分配预览
   */
  public outsourceDistributePreview(data) {
    return this.netService.send({
      server: domainService.outsourcePoolController.outsourceDistributePreview,
      data
    })
  }
  /**
   * 查询待分配委外案件
   */
  @Debounce()
  public query(data, page) {
    return this.netService.send({
      server: domainService.outsourcePoolController.query,
      data,
      page
    })
  }
  /**
   * 撤回
   */
  public recallOutCase(ids) {
    return this.netService.send({
      server: domainService.outsourcePoolController.recallOutCase,
      data: {
        ids
      }
    })
  }
  /**
   * 回收委外案件
   */
  public returnOutsourceCase(outCaseIds, returnReason) {
    return this.netService.send({
      server: domainService.outsourcePoolController.returnOutsourceCase,
      data: {
        outCaseIds,
        returnReason
      }
    })
  }
  /**
   * 核销申请
   */
  public verificationApply() {
    return this.netService.send({
      server: domainService.outsourcePoolController.verificationApply
    })
  }
  /**
   * 财务数据删除操作
   */
  @Debounce()
  public deleteFinanceData(idList) {
    return this.netService.send({
      server: domainService.outsourcePoolController.deleteFinanceData,
      data: {
        idList
      }
    })
  }
}
