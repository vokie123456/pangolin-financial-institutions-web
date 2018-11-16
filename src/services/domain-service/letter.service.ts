import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class LetterService {

    @Inject(NetService)
    private netService: NetService

    /**
     * 打印信函申请
     */
    @Debounce()
    public applyLetter(data) {
        return this.netService.send({
            server: domainService.letterController.applyLetter,
            data
        })
    }
}

