import { dataimpService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { Service } from '~/core/service';

export class ImportExcelConfigService extends Service {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 获取映射字段
   */
  @Debounce()
  public templateDataQuery(data?, page?, sort?) {
    return this.netService.send({
      server: dataimpService.importExcelConfigController.templateDataQuery,
      data,
      page,
      sort,
    });
  }

  /**
   * 获取映射字段
   */
  @Debounce()
  public getExcelList() {
    return this.netService.send({
      server: dataimpService.importExcelConfigController.getExcelList,
    });
  }

  /**
   * Excel解析头部信息
   */
  @Debounce()
  public parserTemplateHeader(data) {
    return this.netService.send({
      server: dataimpService.importExcelConfigController.parserTemplateHeader,
      data,
    });
  }

  /**
   * 新增Excel导入摸板
   */
  @Debounce()
  public createExcelExportConfig(data) {
    return this.netService.send({
      server:dataimpService.importExcelConfigController.createExcelExportConfig,
      data,
      loading: true
    });
  }

  /**
   * 修改Excel导入摸板
   */
  @Debounce()
  public updateExcelExportConfig(data) {
    return this.netService.send({
      server: dataimpService.importExcelConfigController.updateExcelExportConfig,
      data,
      loading: true
    });
  }

  /**
   * 删除Excel模板
   */
  @Debounce()
  public deleteExcelData(data) {
    return this.netService.send({
      server: dataimpService.importExcelConfigController.deleteExcelData,
      data,
    });
  }
}
