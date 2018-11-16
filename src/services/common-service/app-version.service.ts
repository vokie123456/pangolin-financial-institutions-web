import {commonService} from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service'

export class AppVersionService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 添加app版本
   */
  @Debounce()
  public createAppVersion(data) {
    return this.netService.send({
      server: commonService.appVersionController.createAppVersion,
      data
    })
  }
  /**
   * 删除app版本
   */
  public deleteAppVersion(data) {
    return this.netService.send({
      server: commonService.appVersionController.deleteAppVersion,
      data
    })
  }
  /**
   * 发布新版本
   */
  public publishAppVersion() {
    return this.netService.send({
      server: commonService.appVersionController.publishAppVersion,
    })
  }
  /**
   * 分页查询app版本控制
   */
  public queryAppVersion(data, page,sort) {
    return this.netService.send({
      server: commonService.appVersionController.queryAppVersion,
      data:{
        id: data.id,
        os: data.os,
        versionId: data.versionId,
        mobileVersion: data.mobileVersion,
        companyCode: data.companyCode,
        pubDateBegin: data.operatorTime[0],
        pubDateEnd: data.operatorTime[1]
      },
      page,
      sort
    })
  }
}
