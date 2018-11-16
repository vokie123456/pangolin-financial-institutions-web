import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'antiFraudController';

export default {
  /**
   * 协催管理-反欺诈待分配-列表数据
   */
  queryAntiFraudList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryAntiFraudList',
    type: requestType.Get,
  },

  /**
   * 协催管理-反欺诈待分配-预览
   */
  previewCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'previewCaseAssist',
    type: requestType.Post,
  },
  
  /**
   * 协催管理-反欺诈待分配-分案
   */
  distributeCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'distributeCaseAssist',
    type: requestType.Post,
  },

};
