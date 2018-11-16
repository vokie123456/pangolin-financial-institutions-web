import { dataimpService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { Service } from '~/core/service';

export class DataInfoExcelService extends Service {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 案件导入数据
   */
  @Debounce()
  public getDataInfoExcelList(data, page) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.getDataInfoExcelList,
      data: {
        custName: data.custName,
        caseAmt: data.caseAmt,
        overDueDays: [data.overDueDays.min, data.overDueDays.max], // 逾期天数
        overdueAmount: [data.overdueAmount.min, data.overdueAmount.max], // 案件金额
        batchNumber: data.batchNumber,
        prinName: data.prinName,
        cupoName: data.cupoName,
        cupoStatus: data.cupoStatus,
        cupoGettime: data.cupoGettime,
        companyCode: data.companyCode,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        color: data.color,
        dayRange: data.dayRange,
        caseMoney: data.caseMoney,
        caseMark: data.caseMark,
      },
      page,
    });
  }
  /**
   * 案件导入确定
   */
  @Debounce()
  public importExcelData(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.importExcelData,
      data,
    });
  }
  /**
   * 获取批次号列表
   */
  @Debounce()
  public queryBatchNumGroup(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.queryBatchNumGroup,
      data,
    });
  }
  @Debounce()
  public checkCasesFile(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.checkCasesFile,
      data,
    });
  }
  @Debounce()
  public casesConfirmByBatchNum(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.casesConfirmByBatchNum,
      data,
    });
  }
  @Debounce()
  public deleteCasesByBatchNum(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.deleteCasesByBatchNum,
      data,
    });
  }
  @Debounce()
  public exportError(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.exportError,
      data,
    });
  }
  @Debounce()
  public findUpload(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.findUpload,
      data,
    });
  }
  @Debounce()
  public getDataInfoExcelDetails(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.getDataInfoExcelDetails,
      data,
    });
  }
  @Debounce()
  public loadTemplate() {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.loadTemplate,
    });
  }
  @Debounce()
  public uploadCaseFileSingle(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.uploadCaseFileSingle,
      data,
    });
  }
  @Debounce()
  public findError(data) {
    return this.netService.send({
      server: dataimpService.dataInfoExcelController.findError,
      data,
    });
  }
}
