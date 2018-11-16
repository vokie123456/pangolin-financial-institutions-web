import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { Service } from '~/core/service';
export class CaseInfoRecordService extends Service {
  @Inject(NetService)
  private netService: NetService;
  /**
   * 回收案件
   */
  @Debounce()
  public returnCase(data) {
    return this.netService.send({
      server: domainService.caseInfoRecordController.returnCase,
      data,
    });
  }
}
