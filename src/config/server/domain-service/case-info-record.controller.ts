import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'caseInfoRecordController';

export default {
  /**
   * 回收案件
   */
  returnCase: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'returnCase',
    type: requestType.Post,
  },
};
