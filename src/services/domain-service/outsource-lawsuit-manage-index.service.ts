// <!--诉讼待分配-->
import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceLawsuitService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外诉讼案件查询
   */
  public getCaseOutLawsuitList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.getCaseOutLawsuitList,
      data:{
        caseNumber:data.caseNumber,
        personalName:data.personalName,
        mobileNo:data.mobileNo,
        idCard:data.idCard,
        overdueAmountMax:data.overdueAmount.max,
        overdueAmountMin:data.overdueAmount.min,
        overduePeriod:data.overduePeriod,
        overdueDaysMax:data.overdueDays.max,
        overdueDaysMin:data.overdueDays.min,
        productCategory:data.productCategory,
        productName:data.productName,
      },
      page,
      sort,
    })
  }
  /**
   * 委外诉讼案-撤诉
   */
  public caseRecover(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.caseRecover,
      data,
    })
  }

  /**
   * 委外诉讼案-结案
   */
  public closingCase(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.closingCase,
      data,
    })
  }

  /**
   * 委外诉讼案-费用维护-删除
   */
  public deleteCostRecord(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.deleteCostRecord,
      data
    })
  }
  /**
   * 委外诉讼案-费用维护-查询
   */
  public getCostRecord(params, page) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.getCostRecord,
      page,
      data: {
        costEvent:params.costEvent,
        costType: params.costType,
        assistId:params.assistId,
      }
    })
  }
  /**
   * 委外诉讼案-诉讼跟进-返回上一步
   */
  public getFollowInfo(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.getFollowInfo,
      data,
    })
  }
  /**
   * 委外诉讼案-查询步骤
   */
  public getCourtInfoStep(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.getCourtInfoStep,
      data,
    })
  }
  /**
   * 委外诉讼案-诉讼跟进-保存跟进信息
   */
  public saveCourtInfo(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.saveCourtInfo,
      data
    })
  }
  /**
   * 委外诉讼案-撤诉
   */
  public withdraw(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.withdraw,
      data
    })
  }
  /**
   * 委外诉讼案-费用维护-新增or修改
   */
  public saveOrUpdateCostRecord(params) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.saveOrUpdateCostRecord,
      data:{
        id: params.id,
        createTime: params.createTime,
        operatorId: params.operatorId,
        operatorRealName: params.operatorRealName,
        costType: params.costType,
        costEvent: params.costEvent,
        momey: params.momey,
        payTime: params.payTime,
        payEvi: params.payEvi,
        remark: params.remark,
        operatorName: params.operatorName,
        assistId:params.assistId,
      },
    })
  }
  /**
   * 委外诉讼案-诉讼跟进-修改诉讼状态
   */
  public updateLawsuitState(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitIndexManageController.updateLawsuitState,
      data,
    })
  }
}
