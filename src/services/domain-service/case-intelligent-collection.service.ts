import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class CaseIntelligentCollectionService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 短信群发及语音群呼操作
   */
  @Debounce()
  public handleBatchSend(cupoIdList, selected, selRelationsList) {
    return this.netService.send({
      server: domainService.caseIntelligentCollectionController.handleBatchSend,
      data: {
        cupoIdList,
        selected,
        selRelationsList
      }
    })
  }
  /**
   * 电子邮件群发操作
   */
  public handleEmailSend(emailBatchSendList) {
    return this.netService.send({
      server: domainService.caseIntelligentCollectionController.handleEmailSend,
      data: {
        emailBatchSendList
      }
    })
  }
}
