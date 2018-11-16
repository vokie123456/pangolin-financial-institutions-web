import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';

export class VisitCaseManageService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 外访个人案件池查询列表
   */
  public visitPersonalCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitPersonalCasePool,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate)
          .start,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate)
          .end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
        caseMark: data.caseMark,
      },
      page,
      sort,
    });
  }

  /**
   * 外访待分配案件池查询列表
   */
  public visitWaitDistribution(data, page?, sort?) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitWaitDistribution,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate)
          .start,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate)
          .end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
      },
      page,
      sort,
    });
  }

  /**
   * 外访停催案件池查询列表
   */
  public visitPauseCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitPauseCasePool,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate)
          .start,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate)
          .end,
        distributeTimeMax: FilterService.dateRanageFormat(data.distributeTime)
          .start,
        distributeTimeMin: FilterService.dateRanageFormat(data.distributeTime)
          .end,
        followupTimeMax: FilterService.dateRanageFormat(data.followupTime)
          .start,
        followupTimeMin: FilterService.dateRanageFormat(data.followupTime).end,
        pauseTimeMax: FilterService.dateRanageFormat(data.pauseTime).start,
        pauseTimeMin: FilterService.dateRanageFormat(data.pauseTime).end,
        currentCollectorRealName: data.currentCollectorRealName,
        turnSource: data.turnSource,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
        followupBack: data.followupBack,
        caseMark: data.caseMark,
      },
      page,
      sort,
    });
  }

  /**
   * 外访回收案件池查询列表
   */
  public visitRecoverCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitRecoverCasePool,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate)
          .start,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate)
          .end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
      },
      page,
      sort,
    });
  }

  /**
   * 外访归c案件池查询列表
   */
  public visitReturnCCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitReturnCCasePool,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime).start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        distributeTimeMin: FilterService.dateRanageFormat(data.latelyPayDate).start,
        distributeTimeMax: FilterService.dateRanageFormat(data.latelyPayDate).end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
        currentCollectorRealName: data.currentCollectorRealName,
        followupTimeMin: FilterService.dateRanageFormat(data.followupTime).start,
        followupTimeMax: FilterService.dateRanageFormat(data.followupTime).end,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate).start,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate).end,
      },
      page,
      sort,
    });
  }

  /**
   * 外访结清案件池查询列表
   */
  public visitSettleCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitSettleCasePool,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        followupBack: data.followupBack,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime).start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate).start,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate).end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
        distributeTimeMin: FilterService.dateRanageFormat(data.latelyPayDate).start,
        distributeTimeMax: FilterService.dateRanageFormat(data.latelyPayDate).end,
        followupTimeMin: FilterService.dateRanageFormat(data.followupTime).start,
        followupTimeMax: FilterService.dateRanageFormat(data.followupTime).end,
      },
      page,
      sort,
    });
  }

  /**
   * 外访团队案件池查询列表
   */
  public visitTeamCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitTeamCasePool,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate)
          .start,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate)
          .end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
        caseMark: data.caseMark,
      },
      page,
      sort,
    });
  }

  /**
   * 外访个人案件池申请流转
   */
  public visitPersonalTurn(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitPersonalTurn,
      data,
    });
  }
  /**
   * 外访停催申请
   */
  public visitPauseCase(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitPauseCase,
      data,
    });
  }
  /**
   * 外访留案申请
   */
  public visitCaseStay(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitCaseStay,
      data,
    });
  }

  /**
   * 外访案件手动分案预览
   */
  public reviewDistributeCase(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.reviewDistributeCase,
      data,
    });
  }

  /**
   * 外访案件手动分案确认
   * @param data
   */
  public confirmDistributeCase(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.confirmDistributeCase,
      data,
    });
  }

  /**
   * 外访案件手动分案确认
   * @param data
   */
  public returnCase(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.returnCase,
      data,
    });
  }

  /**
   * 回收案件移入待分配
   * @param caseIds
   */
  public moveToWaitDistribution(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.moveToWaitDistribution,
      data,
    });
  }

  /**
   * 外访个人案件池查询列表逾期总金额
   */
  public visitPersonalCasePoolAmount(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitPersonalCasePoolAmount,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate)
          .start,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate)
          .end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
        caseMark: data.caseMark,
      }
    });
  }

  /**
   * 外访团队案件池查询列表逾期总金额
   */
  public visitTeamCasePoolAmount(data) {
    return this.netService.send({
      server: domainService.visitCaseManageController.visitTeamCasePoolAmount,
      data: {
        caseNumber: data.caseNumber,
        personalName: data.personalName,
        mobileNo: data.mobileNo,
        idCard: data.idCard,
        deptId: data.deptId,
        customerCategory: data.customerCategory,
        productCategory: data.productCategory,
        productName: data.productName,
        overdueAmountMax: data.overdueAmount.max,
        overdueAmountMin: data.overdueAmount.min,
        overduePeriod: data.overduePeriod,
        overdueDaysMax: data.overdueDays.max,
        overdueDaysMin: data.overdueDays.min,
        followInTimeMin: FilterService.dateRanageFormat(data.followInTime)
          .start,
        followInTimeMax: FilterService.dateRanageFormat(data.followInTime).end,
        latelyPayDateMax: FilterService.dateRanageFormat(data.latelyPayDate)
          .start,
        latelyPayDateMin: FilterService.dateRanageFormat(data.latelyPayDate)
          .end,
        area: data.area[data.area.length - 1],
        companyCode: data.companyCode,
        caseMark: data.caseMark,
      }
    });
  }
}
