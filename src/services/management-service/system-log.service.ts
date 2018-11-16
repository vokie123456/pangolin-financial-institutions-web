import { managementService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class SystemLogService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 系统日志多条件的查询
   */
  public getAllSystemLogs(data,page) {
    return this.netService.send({
      server: managementService.systemLogController.getAllSystemLogs,
      data:{
        userRealName:data.userRealName,
        operatorTimeStart:FilterService.dateRanageFormat(data.operatorTime).start,
        operatorTimeEnd:FilterService.dateRanageFormat(data.operatorTime).end
      },
      page
    })
  }
}
