import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class SmsMessageService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 添加短信记录(发送短信)
   */
  public sendMessageSingle(data) {
    return this.netService.send({
      server: domainService.sMSMessageController.sendMessageSingle,
      data
    })
  }
  /**
   * 智能短信记录
   */
  public sendCapaMessageSingle(capaPersonals, sendType, tesmId) {
    return this.netService.send({
      server: domainService.sMSMessageController.sendCapaMessageSingle,
      data: {
        capaPersonals,
        sendType,
        tesmId
      }
    })
  }
}
