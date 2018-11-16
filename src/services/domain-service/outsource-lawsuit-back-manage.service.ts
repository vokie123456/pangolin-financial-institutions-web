// <!--诉讼待分配-->
import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceLawsuitBackService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外管理-委外诉讼回收案件-列表
   */
  public searchLawsuitRecoveryList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceLawsuitBackManageController.searchLawsuitRecoveryList,
      data,
      page,
      sort,
    })
  }

  /**
   * 委外管理-委外诉讼回收案件-移入诉讼待分配
   */
  public moveLawsuitWait(data) {
    return this.netService.send({
      server: domainService.outsourceLawsuitBackManageController.moveLawsuitWait,
      data,
    })
  }
}
