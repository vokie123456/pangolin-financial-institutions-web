import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class AccVisitPoolService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 是否挂起
   */
  @Debounce()
  public handUp(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.handUp,
      data
    })
  }
  /**
   * 外访取消留案
   */
  @Debounce()
  public cancelLeaveCase(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.cancelLeaveCase,
      data
    })
  }
  /**
   * 外访页面批量分配
   */
  public batchVisitCase(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.batchVisitCase,
      data
    })
  }
  /**
   * 外访案件留案操作
   */
  public leaveVisitCase(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.leaveVisitCase,
      data
    })
  }
  /**
   * 外访申请提前流转
   */
  public visitAdvanceCirculation(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.visitAdvanceCirculation,
      data
    })
  }
  /**
   * 外访案件颜色打标
   */
  public visitCaseMarkColor(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.visitCaseMarkColor,
      data
    })
  }
  public getVisitPersonalAddress(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.getVisitPersonalAddress,
      data
    })
  }
  /**
   * 多条件查询外访小流转待审批案件
   */
  public getVisitPendingCase(data, page?, sort?) {
    return this.netService.send({
      server: domainService.accVisitPoolController.getVisitPendingCase,
      data,
      page,
      sort
    })
  }
  /**
   * 外访审批小流转案件
   */
  public approvalVisitCirculation(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.approvalVisitCirculation,
      data
    })
  }
  /**
   * 外访页面添加修复信息
   */
  public saveRepairInfo(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.saveRepairInfo,
      data
    })
  }
  /**
   * 外访页面还款操作
   */
  public doVisitPay(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.doVisitPay,
      data
    })
  }
  /**
   * 外访页面添加跟进记录
   */
  @Debounce()
  public saveFollowupRecord(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.saveFollowupRecord,
      data
    })
  }
  /**
   * 外访页面多条件查询还款记录
   */
  public getPaymentRecord(data,page,sort) {
    return this.netService.send({
      server: domainService.accVisitPoolController.getPaymentRecord,
      data,
      page,
      sort
    })
  }
  /**
   * 外访页面还款撤回
   */
  public visitWithdraw(data) {
    return this.netService.send({
      server: domainService.accVisitPoolController.visitWithdraw,
      data
    })
  }
  /**
   * 外访页面获取分配信息
   */
  public getBatchInfo(){
    return this.netService.send({
      server: domainService.accVisitPoolController.getBatchInfo
    })
  }
}
