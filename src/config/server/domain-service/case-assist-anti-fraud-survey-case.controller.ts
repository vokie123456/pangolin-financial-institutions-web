import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'antiFraudCaseController';

export default {
  /**
   * 协催管理-反欺诈调查案-列表数据
   */
  queryAntiFraudCaseList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryAntiFraudCaseList',
    type: requestType.Get,
  },

  /**
   * 协催管理-反欺诈调查案件-设置调查结果
   */
  setAntiFraudCaseByCaseId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'setAntiFraudCaseByCaseId',
    type: requestType.Post,
  },

};
