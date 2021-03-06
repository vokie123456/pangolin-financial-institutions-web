import { dataimpService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class AccImportExcelDataService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 通过委托方获取模板名
   */
  @Debounce()
  public getExcelTempleByPrincipalName(data) {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.getExcelTempleByPrincipalName,
      data
    })
  }
  /**
   * 获取Excel模板分页查询
   */
  @Debounce()
  public getExcelTemplateList(page, data?) {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.getExcelTemplateList,
      data: {
        companyCode: data.companyCode,
        templateName: data.templateName,
        principalName: data.principalName
      },
      page
    })
  }
  /**
   * 获取excel映射字段
   */
  @Debounce()
  public getExcelList() {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.getExcelList
    })
  }
  /**
   * 上传excel文件并解析
   */
  @Debounce()
  public importExcelTemplate(data) {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.importExcelTemplate,
      data: {
        id: data.id,
        rowNum: data.rowNum,
        colNum: data.colNum
      }
    })
  }
  /**
   * 检查模板名称是否存在重复
   */
  @Debounce()
  public checkTemplateName(data) {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.checkTemplateName,
      data: {
        templateName: data.templateName
      }
    })
  }
  /**
   * 新增Excel模板配置保存操作
   */
  @Debounce()
  public importExcelTemplateData(data) {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.importExcelTemplateData,
      data: {
        templateExcelInfoList: data.templateExcelInfoList,
        id: data.id,
        templateName: data.templateName,
        principalName: data.principalName,
        colNum: data.colNum,
        rowNum: data.rowNum,
        titleRowNum: data.rowNum,
        dataRowNum: data.dataRowNum,
        dataColNum: data.dataColNum
      }
    })
  }
  /**
   * 删除导入模板信息
   */
  @Debounce()
  public deleteExcelData(id) {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.deleteExcelData,
      data: {
        id,
      }
    })
  }
  /**
   * 导入模板配置:确认并下载
   */
  @Debounce()
  public createExcelTemplate(data) {
    return this.netService.send({
      server: dataimpService.accImportExcelDataController.createExcelTemplate,
      data
    })
  }
}
