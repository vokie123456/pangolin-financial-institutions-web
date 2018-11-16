import { requestType } from '~/config/enum.config';

const SERVICE = 'dataimp-service';
const CONTROLLER = 'dataImportExcelInfoController';

export default {
  /**
   * 案件导入确定
   */
  importExcelData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'importExcelData',
    type: requestType.Post,
  },
  /**
   * 获取所有批次号信息
   */
  getAllBatchNumbers: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllBatchNumbers',
    type: requestType.Post,
  },
  /**
   * 获取导入案件信息
   */
  getAllImportExcelInfos: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllImportExcelInfos',
    type: requestType.Get,
  },
  /**
   * 案件按批次删除
   */
  deleteDataExcelInfoByBatch: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteDataExcelInfoByBatch',
    type: requestType.Get,
  },

  /**
   * 根据PrincipalId查找模板
   */
  findTempletByPrincipalId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findTempletByPrincipalId',
    type: requestType.Get,
  },

  /**
   * 根据导入案件Id获取导入信息
   */
  getImportDataInfoById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportDataInfoById',
    type: requestType.Get,
  },
  /**
   * 客户信息查询
   */
  getImportPersonalInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportPersonalInfo',
    type: requestType.Get,
  },
  /**
   * 客户产品信息查询
   */
  getImportProduct: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportProduct',
    type: requestType.Get,
  },
  /**
   * 客户收支状况查询
   */
  getImportPersonalIncome: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportPersonalIncome',
    type: requestType.Get,
  },
  /**
   * 客户房产信息查询
   */
  getImportPersonalHouse: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportPersonalHouse',
    type: requestType.Get,
  },
  /**
   * 客户联系人信息查询
   */
  getImportPersonalContacts: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportPersonalContacts',
    type: requestType.Get,
  },
  /**
   * 客户联系人地址信息查询
   */
  getPersonalAddresses: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getPersonalAddresses',
    type: requestType.Get,
  },
  /**
   * 案件信息查询
   */
  getImportCaseInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportCaseInfo',
    type: requestType.Get,
  },
  /**
   * 客户开户信息查询
   */
  getImportPersonalBank: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportPersonalBank',
    type: requestType.Get,
  },
  /**
   * 查询导入的案件的共债案件
   */
  getImportDebtCaseInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getImportDebtCaseInfo',
    type: requestType.Get,
  }
};
