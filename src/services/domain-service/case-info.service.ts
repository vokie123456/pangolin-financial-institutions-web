import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';
import { Service } from '~/core/service';
export class CaseInfoService extends Service {
  @Inject(NetService)
  private netService: NetService;
  /**
   * 案件颜色打标
   */
  @Debounce()
  public caseInfoMarkColor(data) {
    return this.netService.send({
      server: domainService.caseInfoController.caseInfoMarkColor,
      data,
    });
  }
  /**
   * 查看材料
   */
  public getFollowupFile(data) {
    return this.netService.send({
      server: domainService.caseInfoController.getFollowupFile,
      data,
    });
  }
  /**
   * 查看附件
   */
  public findUpload(caseNumber, companyCode = '') {
    return this.netService.send({
      server: domainService.caseInfoController.findUpload,
      data: {
        caseNumber,
        companyCode,
      },
    });
  }
  /**
   * 案件查找
   */
  public findCaseInfo(data, page) {
    return this.netService.send({
      server: domainService.caseInfoController.findCaseInfo,
      data: {
        'personalInfo.mobileNo': data.mobileNo,
        'personalInfo.name': data.personName,
        'principalId.id': data.principalId,
        'area.parent.id': data.parentAreaId,
        'area.id': data.areaId,
      },
      page,
    });
  }
  /**
   * 修改备注
   */
  public modifyCaseMemo(data) {
    return this.netService.send({
      server: domainService.caseInfoController.modifyCaseMemo,
      data,
    });
  }
  /**
   * 分页查询内催待分配案件
   */
  public getInnerWaitCollectCase(data, page) {
    return this.netService.send({
      server: domainService.caseInfoController.getInnerWaitCollectCase,
      data: {
        'personalInfo.name': data.name,
        'personalInfo.mobileNo': data.mobileNo,
        'personalInfo.idCard': data.idCard,
        'principalId.id': data.principalId,
        batchNumber: data.batchNumber,
        'area.parent.id': data.parentAreaId,
        'area.id': data.areaId,
        commissionRate: [data.commissionRate.min, data.commissionRate.max],
        overdueAmount: [data.overdueAmount.min, data.overdueAmount.max],
        payStatus: data.payStatus,
        overdueDays: [data.overdueDays.min, data.overdueDays.max],
        delegationDate: [
          FilterService.dateRanageFormat(data.delegationDate).start,
          FilterService.dateRanageFormat(data.delegationDate).end,
        ],
        closeDate: [
          FilterService.dateRanageFormat(data.closeDate).start,
          FilterService.dateRanageFormat(data.closeDate).end,
        ],
      },
      page,
    });
  }
  /**
   * 内催待分配预览
   */
  public distributePreview(data) {
    return this.netService.send({
      server: domainService.caseInfoController.distributePreview,
      data,
    });
  }
  /**
   * 内催待分配案件分配
   */
  // distributeCaseInfo(data) {
  //   return this.netService.send({
  //     server: domainService.caseInfoController.distributeCaseInfo,
  //     data: data
  //   })
  // }
  /**
   * 案件跟进记录
   */
  public getCaseInfoFollowRecord(data, page, sort?) {
    return this.netService.send({
      server: domainService.caseInfoController.getCaseInfoFollowRecord,
      data: {
        operatorTime: [
          FilterService.dateRanageFormat(data.operatorTime).start,
          FilterService.dateRanageFormat(data.operatorTime).end,
        ],
        caseNumber: data.caseNumber,
        type: data.type,
        collectionFeedback: data.collectionFeedback,
      },
      page,
      sort,
    });
  }
  /**
   * 导出跟进记录(单案件)
   */
  public exportFollowRecord(caseNumber) {
    return this.netService.send({
      server: domainService.caseInfoController.exportFollowRecord,
      data: {
        caseNumber,
      },
    });
  }
  /**
   */
  public innerStrategyDistribute(data) {
    return this.netService.send({
      server: domainService.caseInfoController.innerStrategyDistribute,
      data: {
        caseIds: data,
      },
    });
  }
  /**
   * 撤销案件(单条)
   */
  public revertCaseInfoDistribute(batchNumber) {
    return this.netService.send({
      server: domainService.caseInfoController.revertCaseInfoDistribute,
      data: {
        batchNumber,
      },
    });
  }
  /**
   * 撤销案件(多条)
   */
  public revertCaseInfoDistributeByCaseId(data) {
    return this.netService.send({
      server: domainService.caseInfoController.revertCaseInfoDistributeByCaseId,
      data: {
        ids: data,
      },
    });
  }
  /**
   * 提醒已还款案件列表查询(内催已结案)
   */
  public getInnerOverCase(data, page) {
    return this.netService.send({
      server: domainService.caseInfoController.getInnerOverCase,
      data: {
        'personalInfo.name': data.name,
        'personalInfo.mobileNo': data.mobileNo,
        'personalInfo.idCard': data.idCard,
        principalId: data.principalId,
        batchNumber: data.batchNumber,
        overdueAmount: [data.overdueAmount.min, data.overdueAmount.max],
        payStatus: data.payStatus,
        overdueDays: [data.overdueDays.min, data.overdueDays.max],
        delegationDate: [
          FilterService.dateRanageFormat(data.delegationDate).start,
          FilterService.dateRanageFormat(data.delegationDate).end,
        ],
        closeDate: [
          FilterService.dateRanageFormat(data.closeDate).start,
          FilterService.dateRanageFormat(data.closeDate).end,
        ],
      },
      page,
    });
  }
  /**
   * 内催回收案件
   */
  public findAllCaseInfoReturn(data, page) {
    return this.netService.send({
      server: domainService.caseInfoController.findAllCaseInfoReturn,
      data: {
        'caseId.personalInfo.name': data.name,
        'caseId.personalInfo.mobileNo': data.mobileNo,
        'personalInfo.idCard': data.idCard,
        'caseId.batchNumber': data.batchNumber,
        'caseId.overdueAmount': [
          data.overdueAmount.min,
          data.overdueAmount.max,
        ],
        'caseId.payStatus': data.payStatus,
        'caseId.overdueDays': [data.overdueDays.min, data.overdueDays.max],
        operatorTime: [
          FilterService.dateRanageFormat(data.operatorTime).start,
          FilterService.dateRanageFormat(data.operatorTime).end,
        ],
      },
      page,
    });
  }
  /**
   * 案件再分配
   */
  public distributeCeaseInfoAgain(data) {
    return this.netService.send({
      server: domainService.caseInfoController.distributeCeaseInfoAgain,
      data,
    });
  }

  /**
   * 电催小流转池
   */
  public electricSmallCirculation(page, data) {
    return this.netService.send({
      server: domainService.caseInfoController.electricSmallCirculation,
      data: {
        companyCode: data.companyCode,
        'personalInfo.name': data.personalName,
        'personalInfo.mobileNo': data.personalPhone,
        orderId: data.orderId,
        overdueAmount: [data.amtRange.min, data.amtRange.max],
        overdueDays: [data.overdueDays.min, data.overdueDays.max],
        'personalInfo.idCard': data.idCard,
        batchNumber: data.batchNumber,
        'principalId.id': data.principalId,
        collectionStatus: data.collectionStatus,
        caseType: data.caseType,
      },
      page,
    });
  }
  /**
   * 电催强制流转池
   */
  public electricForceCirculation(page, data) {
    return this.netService.send({
      server: domainService.caseInfoController.electricForceCirculation,
      data: {
        companyCode: data.companyCode,
        'personalInfo.name': data.personalName,
        'personalInfo.mobileNo': data.personalPhone,
        orderId: data.orderId,
        overdueAmount: [data.amtRange.min, data.amtRange.max],
        overdueDays: [data.overdueDays.min, data.overdueDays.max],
        'personalInfo.idCard': data.idCard,
        batchNumber: data.batchNumber,
        'principalId.id': data.principalId,
        collectionStatus: data.collectionStatus,
        caseType: data.caseType,
      },
      page,
    });
  }
  /**
   * 获取所有批次号
   */
  public getAllBatchNumber() {
    return this.netService.send({
      server: domainService.caseInfoController.getAllBatchNumber,
    });
  }
  /**
   * 外访小流转池
   */
  public outSmallCirculation(page, data) {
    return this.netService.send({
      server: domainService.caseInfoController.outSmallCirculation,
      data: {
        companyCode: data.companyCode,
        'personalInfo.name': data.personalName,
        'personalInfo.mobileNo': data.personalPhone,
        orderId: data.orderId,
        overdueAmount: [data.amtRange.min, data.amtRange.max],
        overdueDays: [data.overdueDays.min, data.overdueDays.max],
        'personalInfo.idCard': data.idCard,
        collectionStatus: data.collectionStatus,
        caseType: data.caseType,
        principalId: data.principalId,
        'area.id': data.areaId,
      },
      page,
    });
  }
  /**
   * 外访强制流转池
   */
  public outForceCirculation(page, data) {
    return this.netService.send({
      server: domainService.caseInfoController.outForceCirculation,
      data: {
        companyCode: data.companyCode,
        'personalInfo.name': data.personalName,
        'personalInfo.mobileNo': data.personalPhone,
        orderId: data.orderId,
        overdueAmount: [data.amtRange.min, data.amtRange.max],
        overdueDays: [data.overdueDays.min, data.overdueDays.max],
        'personalInfo.idCard': data.idCard,
        collectionStatus: data.collectionStatus,
        caseType: data.caseType,
        principalId: data.principalId,
        'area.id': data.areaId,
      },
      page,
    });
  }
  /**
   * 获取案件备注信息
   */
  public getCaseInfoRemark(data, page, sort) {
    return this.netService.send({
      server: domainService.caseInfoController.getCaseInfoRemark,
      data,
      page,
      sort,
    });
  }
  /**
   * 获取共债案件数量
   * @param data
   * @param page
   */
  public getCommonCaseCount(id) {
    return this.netService.send({
      server: domainService.caseInfoController.getCommonCaseCount,
      data: {
        caseId: id,
      },
    });
  }
  /**
   * 获取共债案件列表
   * @param data
   * @param page
   */
  public queryCaseInfoList(data, page) {
    return this.netService.send({
      server: domainService.caseInfoController.queryCaseInfoList,
      data: {
        id: data.id,
        companyCode: data.companyCode,
      },
      page,
    });
  }
  /**
   * 分配案件时判断所选用户是否有催收类型
   */
  public checkUser(data) {
    return this.netService.send({
      server: domainService.caseInfoController.checkUser,
      data: {
        userIds: data,
      },
    });
  }
  /**
   * 内催待分配案件评分
   */
  public updateInnerWaitCollScore() {
    return this.netService.send({
      server: domainService.caseInfoController.updateInnerWaitCollScore,
    });
  }

  /**
   * 案件确认
   */
  public confirmCaseInfo(data) {
    return this.netService.send({
      server: domainService.caseInfoController.confirmCaseInfo,
      data,
    });
  }
  /**
   * 案件导入 待分配 手动分配
   */
  public distributeCaseInfo(data) {
    return this.netService.send({
      server: domainService.caseInfoController.distributeCaseInfo,
      data,
    });
  }
  /**
   * 案件导入-查询所有待分配案件
   */
  public getAllDistributeCaseInfos(data, page) {
    return this.netService.send({
      server: domainService.caseInfoController.getAllDistributeCaseInfos,
      data: {
        batchNumber: data.batchNumber,
        mobileNo: data.mobileNo,
        personalName: data.personalName,
        overdueDaysStart: data.dayRange.min,
        overdueDaysEnd: data.dayRange.max,
        overdueAmountStart: data.amountRange.min,
        overdueAmountEnd: data.amountRange.max,
        commissionRateBegin: data.rateRange.min,
        commissionRateEnd: data.rateRange.max,
        handNumber: data.handNumber,
        overduePeriod: data.overduePeriod,
        areadId: data.areadId[data.areadId.length - 1],
        principalId: data.principalId,
      },
      page,
    });
  }
}
