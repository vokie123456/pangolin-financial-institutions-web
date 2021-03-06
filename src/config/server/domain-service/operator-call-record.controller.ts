import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'operatorCallRecordController'

export default {
    /**
     * 通话记录
     */
    getRecordByPersonId: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getRecordByPersonId',
        type: requestType.Get
    }
}
