import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceCommissionedService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外管理-受托方管理-受托方列表
   */
  public searchCutsourceList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceCommissionedManageController.searchCutsourceList,
      data,
      page,
      sort,
    })
  }

  /**
   * 修改受托方
   *
   */
  public modifyCutsource(data) {
    return this.netService.send({
      server: domainService.outsourceCommissionedManageController.modifyCutsource,
      data
    })
  }

}
