import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class MailMessageService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 发送邮件催收
   */
  @Debounce()
  public sendMail(data) {
    return this.netService.send({
      server: domainService.mailMessageController.sendMail,
      data
    })
  }
}

