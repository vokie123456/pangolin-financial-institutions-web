import { commonService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { Service } from "~/core/service"

export class DataDictService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 获取数据字典HASH
   */
  @Debounce()
  public getDictHash() {
    return this.netService.send({
      server: commonService.dataDictController.getHashCode,
    })
  }

  /**
   * 获取数据字典数据
   */
  @Debounce()
  public getDictData() {
    return this.netService.send({
      server: commonService.dataDictController.getAll
    })
  }
  
  /**
   * 获取特殊数据字典数据
   */
  @Debounce()
  public getDataPools() {
    return this.netService.send({
      server: commonService.dataDictController.getDataPools
    })
  }
}

