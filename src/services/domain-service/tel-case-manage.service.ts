import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { FilterService } from '~/utils/filter.service';

export class TelCaseManageService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 电催待分配查询列表
   */
  public waitDistribution(data, page?, sort?) {
    return this.netService.send({
      server: domainService.telCaseManageController.waitDistribution,
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
        area: data.area[data.area.length - 1]
      },
      page,
      sort,
    });
  }

  /**
   * 电催个人案件池查询列表
   */
  public personalCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.telCaseManageController.personalCasePool,
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
        followupBack: data.followupBack,
        area: data.area[data.area.length - 1],
        caseMark: data.caseMark,
      },
      page,
      sort,
    });
  }

  /**
   * 电催团队案件池查询列表
   */
  public teamCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.telCaseManageController.teamCasePool,
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
        followupBack: data.followupBack,
        areaId: data.areaId,
        caseMark: data.caseMark,
      },
      page,
      sort,
    });
  }

  /**
   * 回收案件池查询列表
   */
  public recoverCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.telCaseManageController.recoverCasePool,
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
        followupBack: data.followupBack,
        area: data.area[data.area.length - 1],
      },
      page,
      sort,
    });
  }

  /**
   * 结清案件池查询列表
   */
  public settleCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.telCaseManageController.settleCasePool,
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
        followupBack: data.followupBack,
        area: data.area[data.area.length - 1],
      },
      page,
      sort,
    });
  }

  /**
   * 结清案件池查询列表
   */
  public pauseCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.telCaseManageController.pauseCasePool,
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
        followupBack: data.followupBack,
        area: data.area[data.area.length - 1],
      },
      page,
      sort,
    });
  }

  /**
   * 归C案件池查询列表
   */
  public returnCCasePool(data, page?, sort?) {
    return this.netService.send({
      server: domainService.telCaseManageController.returnCCasePool,
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
        followupBack: data.followupBack,
        area: data.area[data.area.length - 1],
      },
      page,
      sort,
    });
  }

  /**
   * 电催案件待分配手动分案预览
   */
  public telCaseManualDistribution(data) {
    return this.netService.send({
      server: domainService.telCaseManageController.telCaseManualDistribution,
      data,
    });
  }
  /**
   * 电催案件待分配手动分案确定分案
   */
  public confirmDistributeCase(data) {
    return this.netService.send({
      server: domainService.telCaseManageController.confirmDistributeCase,
      data,
    });
  }

  /**
   * 电催案件手动分案预览
   */
  public reviewDistributeCase(data) {
    return this.netService.send({
      server: domainService.telCaseManageController.reviewDistributeCase,
      data,
    });
  }

  /**
   * 案件回收
   */
  public returnCase(data) {
    return this.netService.send({
      server: domainService.telCaseManageController.returnCase,
      data,
    });
  }

  /**
   * 移入电催待分配
   */
  public moveToWaitDistribution(data) {
    return this.netService.send({
      server: domainService.telCaseManageController.moveToWaitDistribution,
      data,
    });
  }

  /**
   * 个人案件池查询列表逾期总金额
   */
  public personalCasePoolAmount(data) {
    return this.netService.send({
      server: domainService.telCaseManageController.personalCasePoolAmount,
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
        followupBack: data.followupBack,
        area: data.area[data.area.length - 1],
        caseMark: data.caseMark,
      }
    });
  }
  /**
   * 团队案件池查询列表逾期总金额
   * @param data 
   */
  public teamCasePoolAmount(data) {
    return this.netService.send({
      server: domainService.telCaseManageController.teamCasePoolAmount,
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
        followupBack: data.followupBack,
        areaId: data.areaId,
        caseMark: data.caseMark,
      }
    });
  }
}
