import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
import { requestType } from "~/config/enum.config";
import { Service } from "~/core/service"

export class AccTelPoolService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 电催页面新增联系人电话或邮箱地址
   */
  @Debounce()
  public savePersonalContactPhone(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.savePersonalContactPhone,
      data
    })
  }
  /**
   * 分配前判断是否有协催案件或协催标识
   */
  public checkCaseAssist(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.checkCaseAssist,
      data
    })
  }
  /**
   * 电催案件留案操作
   */
  public leaveTelCase(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.leaveTelCase,
      data
    })
  }
  /**
   * 取消留案操作
   */
  public cancelLeaveCase(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.cancelLeaveCase,
      data
    })
  }
  /**
   * 电催申请提前流转
   */
  public telAdvanceCirculation(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.telAdvanceCirculation,
      data
    })
  }
  /**
   * 电催页面查看电话录音列表
   */
  public getPhoneRecord(data, page) {
    return this.netService.send({
      server: domainService.accTelPoolController.getPhoneRecord,
      data,
      page
    })
  }
  /**
   * 电催案件颜色打标
   */
  public telCaseMarkColor(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.telCaseMarkColor,
      data
    })
  }
  @Debounce()
  public saveRepairInfo(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.saveRepairInfo,
      data
    })
  }
  /**
   * 查看凭证
   */

  public getPayProof(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.getPayProof,
      data
    })
  }
  /**
   * 电催页面获取分配信息
   */
  public getBatchInfo() {
    return this.netService.send({
      server: domainService.accTelPoolController.getBatchInfo
    })
  }
  /**
   * 电催页面批量分配
   */
  public batchTelCase(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.batchTelCase,
      data
    })
  }
  /**
   * 案件再分配
   */
  public distributeTurnCeaseAgain(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.distributeTurnCeaseAgain,
      data
    })
  }

  /**
   * 获取案件信息
   * @param id
   */
  public getCaseInfoByCaseId(id) {
    return this.netService.send({
      server: domainService.accTelPoolController.getCaseInfoByCaseId,
      data: {
        caseId: id
      }
    })
  }
  /**
   * 电催相关联系人信息（电话本）
   */
  public getTelPersonalContact(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.getTelPersonalContact,
      data
    })
  }
  /**
   * 修改联系人电话状态
   */
  public modifyPhoneStatus(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.modifyPhoneStatus,
      data
    })
  }
  /**
   * 电催跟进记录列表查询
   */
  public getFollowupRecord(caseNumber, data, page, sort) {
    return this.netService.send({
      server: domainService.accTelPoolController.getFollowupRecord,
      append: caseNumber,
      data,
      page,
      sort
    })
  }
  /**
   * 电催页面多条件查询协催记录
   */
  public getAllAssistApplyRecord(data, page, sort) {
    return this.netService.send({
      server: domainService.accTelPoolController.getAllAssistApplyRecord,
      data,
      page,
      sort
    })
  }
  /**
   * 电催页面多条件查询短信记录
   */
  public getAllSendMessageRecord(data, page) {
    return this.netService.send({
      server: domainService.accTelPoolController.getAllSendMessageRecord,
      data,
      page
    })
  }
  /**
   * 电催页面多条件查询申请外访记录
   */
  public getAllCaseOutApplyRecord(data, page, sort) {
    return this.netService.send({
      server: domainService.accTelPoolController.getAllCaseOutApplyRecord,
      data: {
        caseId: data.caseId,
        applyDateMin: FilterService.dateRanageFormat(data.applyDate).start,
        applyDateMax: FilterService.dateRanageFormat(data.applyDate).end,
        approveStatus: data.approveStatus
      },
      page,
      sort
    })
  }
  /**
   * 电催添加跟进记录
   */
  @Debounce()
  public saveFollowupRecord(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.saveFollowupRecord,
      data
    })
  }
  /**
   * 申请协催
   */
  public assistApply(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.assistApply,
      data
    })
  }
  /**
   * 申请外访
   */
  public visitApply(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.visitApply,
      data
    })
  }
  /**
   * 电催页面还款操作
   */
  public doTelPay(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.doTelPay,
      data
    })
  }
  /**
   * 电催审批小流转案件
   */
  public approvalTelCirculation(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.approvalTelCirculation,
      data
    })
  }
  /**
   * 多条件查询电催小流转待审批案件
   */
  public getTelPendingCase(data, page?, sort?) {
    return this.netService.send({
      server: domainService.accTelPoolController.getTelPendingCase,
      data,
      page,
      sort
    })
  }
  public syncPersonalContact(personalId, cardId) {
    return this.netService.send({
      server: domainService.accTelPoolController.syncPersonalContact,
      data: {
        personalId,
        idCard: cardId
      }
    })
  }
  /**
   * 电催页面多条件查询还款记录
   */
  public getPaymentRecord(data, page, sort) {
    return this.netService.send({
      server: domainService.accTelPoolController.getPaymentRecord,
      data,
      page,
      sort
    })
  }
  /**
   * 电催页面还款撤回
   */
  public telWithdraw(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.telWithdraw,
      data
    })
  }
  /**
   * 电催案件结案
   */
  public endTelCase(data) {
    return this.netService.send({
      server: domainService.accTelPoolController.endTelCase,
      data
    })
  }
}
