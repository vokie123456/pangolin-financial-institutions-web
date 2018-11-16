import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class SystemBackUpService {

    @Inject(NetService)
    private netService: NetService

    /**
     * 查询部门下的特定用户
     * @companyCode 公司编码
     */
    @Debounce()
    public queryBackupList(companyCode: string) {
        return this.netService.send({
            server: domainService.systemBackupController.querySystemBackup,
            data: {
                companyCode
            }
        })
    }
  /**
   * 增加系统数据库备份
   */
  @Debounce()
  public createSystemBackup(data) {
    return this.netService.send({
      server: domainService.systemBackupController.createSystemBackup,
      data
    })
  }
  /**
   * 删除系统数据库备份
   */
  @Debounce()
  public deleteSystemBackup(data) {
    return this.netService.send({
      server: domainService.systemBackupController.deleteSystemBackup,
      data
    })
  }
  /**
   * 查询系统备份
   */
  @Debounce()
  public querySystemBackup(data,page) {
    return this.netService.send({
      server: domainService.systemBackupController.querySystemBackup,
      data,
      page
    })
  }
  /**
   * 恢复系统数据库备份
   */
  @Debounce()
  public recoverSystemBackup(data) {
    return this.netService.send({
      server: domainService.systemBackupController.recoverSystemBackup,
      data
    })
  }
}

