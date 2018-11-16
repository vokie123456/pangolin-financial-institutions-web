import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class PaymentService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 多条件查询减免审批记录
   */
  @Debounce()
  public getAllDerate(data, page?, sort?) {
    return this.netService.send({
      server: domainService.paymentController.getAllDerate,
      data: {
        companyCode: data.companyCode,
        orderId: data.orderId,
        personalName: data.personalName,
        personalPhone: data.personalPhone,
        batchNumber: data.batchNumber,
        applyDerateAmt: [data.amtRange.min, data.amtRange.max],
        principalId: data.principalId
      },
      page,
      sort
    })
  }
  /**
   * 还款信息展示
   */
  public getPaymentInfo(casePayApplyId) {
    return this.netService.send({
      server: domainService.paymentController.getPaymentInfo,
      data: {
        casePayApplyId
      }
    })
  }
  /**
   * 还款审批
   */
  public approvalPayment({ opinion, result, casePayApplyId, flag }) {
    return this.netService.send({
      server: domainService.paymentController.approvalPayment,
      data: {
        opinion,
        result,
        casePayApplyId,
        flag
      }
    })
  }
  /**
   * 多条件查询还款审批记录
   */
  @Debounce()
  public getAllPayment(data, page?, sort?) {
    return this.netService.send({
      server: domainService.paymentController.getAllPayment,
      data: {
        companyCode: data.companyCode,
        personalName: data.personalName,
        personalPhone: data.personalPhone,
        batchNumber: data.batchNumber,
        orderId: data.orderId,
        applyDerateAmt: [data.amtRange.min, data.amtRange.max],
        principalId: data.principalId,
        payType: data.payType,
        applyRealName: data.applyRealName,
        payWay: data.payWay
      },
      page,
      sort
    })
  }
  /**
   * 导出还款记录
   */
  public exportCasePayApply(data){
    return this.netService.send({
      server: domainService.paymentController.exportCasePayApply,
      data: {
        companyCode: data.companyCode,
        personalName: data.personalName,
        personalPhone: data.personalPhone,
        batchNumber: data.batchNumber,
        applyDerateAmt: [data.amtRange.min, data.amtRange.max],
        // principalId: data.principalId,
        payType: data.payType,
        applyRealName: data.applyRealName,
        payWay: data.payWay
      }
    })
  }
  /**
   * 同步ERP
   */
  @Debounce()
  public getPaymentRemind(orderNumber){
    return this.netService.send({
      server: domainService.paymentController.getPaymentRemind,
      data: {
        orderNumber
      }
    })
  }
}
