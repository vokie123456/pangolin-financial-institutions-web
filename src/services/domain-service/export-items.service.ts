import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ExportItemsService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 系统参数带条件的分页查询
   */
  @Debounce()
  public saveExportItems(paramData: any) {
    return this.netService.send({
      server: domainService.exportItemsController.saveExportItems,
      data: paramData
    })
  }

  @Debounce()
  public getExportItems(category: number) {
    return this.netService.send({
      server: domainService.exportItemsController.getExportItems,
      data: {
        category
      }
    })
  }
  /**
   * 查询委外导出项
   */
  public getOutsourceExportItems(category) {
    return this.netService.send({
      server: domainService.exportItemsController.getOutsourceExportItems,
      data: {
        category
      }
    })
  }
  /**
   * 设置委外导出项
   */
  public saveOutsourceExportItems(data) {
    return this.netService.send({
      server: domainService.exportItemsController.saveOutsourceExportItems,
      data
    })
  }
  /**
   * 查询更新项
   */
  public getUpdateItems(companyCode) {
    return this.netService.send({
      server: domainService.exportItemsController.getUpdateItems,
      data: {
        companyCode
      }
    })
  }
  /**
   * 设置更新项
   */
  public saveUpdateItems(data) {
    return this.netService.send({
      server: domainService.exportItemsController.saveUpdateItems,
      data: {
        bankItems: data.bankItems,
        personalItems: data.personalItems,
        jobItems: data.jobItems,
        caseItems: data.caseItems,
        followItems: data.followItems,
        connectItems: data.connectItems
      }
    })
  }
}
