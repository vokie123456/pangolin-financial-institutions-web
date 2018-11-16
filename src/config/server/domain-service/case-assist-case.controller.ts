import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'caseAssistController';

export default {
  /**
   * 协催管理-诉讼案件-列表数据
   */
  queryCaseAssistlist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryCaseAssistlist',
    type: requestType.Get,
  },

  /**
   * 协催管理-协催管理-重新分配
   */
  newDistributeCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'newDistributeCaseAssist',
    type: requestType.Get,
  },

  /***
   * 协催管理-外访待分配-预览
  */
  previewCaseAssist: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'previewCaseAssist',
    type: requestType.Post,
  },
};
