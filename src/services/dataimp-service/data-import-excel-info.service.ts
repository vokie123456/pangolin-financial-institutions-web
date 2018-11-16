import { dataimpService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { Service } from '~/core/service';

export class DataImportExcelInfoService extends Service {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 获取所有批次号信息
   */
  @Debounce()
  public getAllBatchNumbers() {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getAllBatchNumbers,
    });
  }
  /**
   * 案件按批次号删除
   */
  @Debounce()
  public deleteDataExcelInfoByBatch(data) {
    return this.netService.send({
      server:
        dataimpService.dataImportExcelInfoController.deleteDataExcelInfoByBatch,
      data,
    });
  }
  /**
   * 案件导入确定
   */
  @Debounce()
  public importExcelData(data) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.importExcelData,
      data,
    });
  }
  /**
   * 获取案件导入信息
   */
  @Debounce()
  public getAllImportExcelInfos(data, page) {
    return this.netService.send({
      server:
        dataimpService.dataImportExcelInfoController.getAllImportExcelInfos,
      data: {
        batchNumber: data.batchNumber,
        mobileNo: data.mobileNo,
        personalName: data.personalName,
        overdueDaysStart: data.dayRange.min, // 逾期天数开始
        overdueDaysEnd: data.dayRange.max, //// 逾期天数结束
        overdueAmountStart: data.amountRange.min, //逾期总金额开始
        overdueAmountEnd: data.amountRange.max, //逾期总金额结束
        principalId: data.principalId,
      },
      page,
    });
  }

  /**
   * 根据PrincipalId查找模板
   */
  public findTempletByPrincipalId(data) {
    return this.netService.send({
      server:
        dataimpService.dataImportExcelInfoController.findTempletByPrincipalId,
      data,
    });
  }

  /**
   * 根据导入案件Id获取导入信息
   */
  public getImportDataInfoById(data) {
    return this.netService.send({
      server:
        dataimpService.dataImportExcelInfoController.getImportDataInfoById,
      data,
    });
  }
  /**
   * 客户信息查询
   */
  public getImportPersonalInfo(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportPersonalInfo,
      data: {
        id: caseId
      }
    });
  }
  /**
   * 客户产品信息查询
   */
  public getImportProduct(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportProduct,
      data: {
        id: caseId
      }
    });
  }
  /**
   * 客户收支状况查询
   */
  public getImportPersonalIncome(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportPersonalIncome,
      data: {
        id: caseId
      }
    });
  }
  /**
   * 客户房产信息查询
   */
  public getImportPersonalHouse(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportPersonalHouse,
      data: {
        id: caseId
      }
    });
  }
  /**
   * 客户联系人信息查询
   */
  public getImportPersonalContacts(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportPersonalContacts,
      data: {
        id: caseId
      }
    });
  }
  /**
   * 客户联系人地址信息查询
   */
  public getPersonalAddresses(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getPersonalAddresses,
      data: {
        id: caseId
      }
    });
  }
  /**
   * 案件信息查询
   */
  public getImportCaseInfo(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportCaseInfo,
      data: {
        id: caseId
      }
    });
  }
  /**
   * 客户开户信息查询
   */
  public getImportPersonalBank(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportPersonalBank,
      data: {
        id: caseId
      }
    });
  }

  /**
   * 查询导入案件共债案件
   */
  public getImportDebtCaseInfo(caseId: string) {
    return this.netService.send({
      server: dataimpService.dataImportExcelInfoController.getImportDebtCaseInfo,
      data: {
        id: caseId
      }
    });
  }
}
