import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
export class PersonalService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 查询案件流转记录
   */
  public getCaseTurnRecord(caseNumber) {
    return this.netService.send({
      server: domainService.personalController.getCaseTurnRecord,
      data: {
        caseNumber
      }
    })
  }
  /**
   * 客户信息导出
   */
  public personalInfoExport(data) {
    return this.netService.send({
      server: domainService.personalController.personalInfoExport,
      data
    })
  }
  /**
   * 通讯录
   */
  public getPersonalPhones(data, page) {
    return this.netService.send({
      server: domainService.personalController.getPersonalPhones,
      data,
      page
    })
  }
  /**
   * 查询客户地图
   */
  @Debounce()
  public getMapInfo(address) {
    return this.netService.send({
      server: domainService.personalController.getMapInfo,
      data: {
        address
      }
    })
  }
}
