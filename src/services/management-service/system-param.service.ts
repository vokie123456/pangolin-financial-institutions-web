import { managementService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';

export class SystemParamService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 系统参数带条件的查询
   */
  @Debounce()
  public getSystemParams(data, page) {
    return this.netService.send({
      server: managementService.systemParamController.getSystemParams,
      data,
      page,
    });
  }
  /**
   * 修改系统参数
   */
  @Debounce()
  public modifySystemParam(data) {
    return this.netService.send({
      server: managementService.systemParamController.modifySystemParam,
      data,
    });
  }
}
