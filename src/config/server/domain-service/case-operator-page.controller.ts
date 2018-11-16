import { requestType } from '~/config/enum.config';

const SERVICE = 'domain-service';
const CONTROLLER = 'caseOperatorPageController';

export default {
  /**
   * 分页查询跟进
   */
  caseFollowupRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseFollowupRecord',
    type: requestType.Get,
  },

  /**
   * 增加催收跟进
   */
  addCaseFollowupRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseFollowupRecord',
    type: requestType.Post,
  },

  /**
   * 电话录音查询列表
   */
  caseTelRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseTelRecord',
    type: requestType.Get,
  },

  /**
   * 增加催收总结
   */
  addCaseTelRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseTelRecord',
    type: requestType.Post,
  },

  /**
   * 客户开户信息查询
   */
  personalBankInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'personalBankInfo',
    type: requestType.Get,
  },

  /**
   * 客户联系人信息查询
   */
  personalContacts: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'personalContacts',
    type: requestType.Get,
  },

  /**
   * 客户信息查询
   */
  personalInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'personalInfo',
    type: requestType.Get,
  },

  /**
   * 执行页顶部信息
   */
  topInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'topInfo',
    type: requestType.Get,
  },

  /**
   * 客户房产信息
   */
  queryPersonalHouse: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryPersonalHouse',
    type: requestType.Get,
  },

  /**
   * 客户收支状况查询
   */
  queryPersonalIncome: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryPersonalIncome',
    type: requestType.Get,
  },

  /**
   * 产品信息查询
   */
  queryProduct: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryProduct',
    type: requestType.Get,
  },

  /**
   * 案件信息查询
   */
  queryCaseInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryCaseInfo',
    type: requestType.Get,
  },
  /**
   * 共债信息查询
   */
  queryDebtCaseInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryDebtCaseInfo',
    type: requestType.Get,
  },

  /**
   * 案件备注分页查询
   */
  caseRemark: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseRemark',
    type: requestType.Get,
  },

  /**
   * 添加案件备注
   */
  addCaseRemark: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseRemark',
    type: requestType.Post,
  },

  /**
   * 客户联系人地址信息查询
   */
  queryPersonalAddress: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryPersonalAddress',
    type: requestType.Get,
  },

  /**
   * 查询催收总结
   */
  findCaseTelRecord: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findCaseTelRecord',
    type: requestType.Get,
  },
  /**
   * 申请历史
   */
  caseApplyHistory: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'caseApplyHistory',
    type: requestType.Get,
  },
  /**
   * 执行页--通讯录 -- 添加联系人
   */
  addPersonalContact: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'addPersonalContact',
    type: requestType.Post,
  },
  /**
   * 执行页--通讯录 -- 删除联系人
   */
  deletePersonalContact: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deletePersonalContact',
    type: requestType.Delete,
  },
  /**
   * 执行页--行动区 -- 流转历史
   */
  getAllCaseTurnRecords: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllCaseTurnRecords',
    type: requestType.Get,
  }
};
