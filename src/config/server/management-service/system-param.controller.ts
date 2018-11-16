import { requestType } from '~/config/enum.config';

const SERVICE = 'management-service';
const CONTROLLER = 'systemParamController';

export default {
  /**
   * 系统参数查询接口
   */
  getSystemParams: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getSystemParams',
    type: requestType.Get,
  },
  /**
   * 修改系统参数
   */
  modifySystemParam: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modifySystemParam',
    type: requestType.Post,
  },
};
