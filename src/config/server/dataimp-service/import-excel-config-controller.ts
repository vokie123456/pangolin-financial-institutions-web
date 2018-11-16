import { requestType } from '~/config/enum.config';

const SERVICE = 'dataimp-service';
const CONTROLLER = 'importExcelConfigController';

export default {
  /**
   * 查询模板
   */
  templateDataQuery: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'templateDataQuery',
    type: requestType.Get,
  },

  /**
   * 获取映射字段
   */
  getExcelList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getExcelList',
    type: requestType.Get,
  },

  /**
   * 新增Excel导入模板
   */
  createExcelExportConfig: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createExcelExportConfig',
    type: requestType.Post,
  },

  /**
   * 修改Excel导入模板
   */
  updateExcelExportConfig: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'updateExcelExportConfig',
    type: requestType.Put,
  },

  /**
   * Excel解析头部信息
   */
  parserTemplateHeader: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'parserTemplateHeader',
    type: requestType.Post,
  },

  /**
   * 删除Excel模板
   */
  deleteExcelData: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteExcelData',
    type: requestType.Delete,
  },
};
