import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';
//诉讼待分配
export class OutsourceLawsuitStayService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外管理-诉讼待分配-列表
   */
  public searchPendingList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceLawsuitManageController.searchPendingList,
      data:{
        caseNumber:data.caseNumber,
        personalName:data.personalName,
        mobileNo:data.mobileNo,
        idCard:data.idCard,
        departmentType:data.departmentType,
        overdueAmountStart:data.outAmount.min,
        overdueAmountEnd:data.outAmount.max,
        overduePeriod:data.overduePeriod,
        overdueDaysStart:data.overdueDays.min,
        overdueDaysEnd:data.overdueDays.max,
        turnSource:data.turnSource,
        productCategory:data.productCategory,
        createTimeStart:FilterService.dateRanageFormat(data.creatTime).start,
        createTimeEnd:FilterService.dateRanageFormat(data.creatTime).end,
        lawNumber:data.lawNumber,
      },
      page,
      sort,
    })
  }


  /**
   * 委外管理-诉讼待分配-分案确认
   */

  public confirmDistributeCase(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitManageController.confirmDistributeCase,
      data,
    })
  }

  /**
   * 委外管理-诉讼待分配-待分配手动分案预览
   */
  public searchSplitPreview(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitManageController.searchSplitPreview,
      data,
    })
  }

}
