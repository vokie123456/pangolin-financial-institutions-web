import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class OperatorCallRecordController {

    @Inject(NetService)
    private netService: NetService

    /**
     * 发送邮件催收
     */
    @Debounce()
    public getRecordByPersonId(data, page, sort) {
        return this.netService.send({
            server: domainService.operatorCallRecordController.getRecordByPersonId,
            data,
            page,
            sort
        })
    }
}
