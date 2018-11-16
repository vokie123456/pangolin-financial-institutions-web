import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
export class CaseApplyRecordService {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 获取所有审核记录
   */
  public getAllCaseApplyRecords(data, page, sort) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.getAllCaseApplyRecords,
      data,
      page,
      sort,
    });
  }
  /**
   * 协催申请
   */
  @Debounce()
  public applyCaseAssist(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyCaseAssist,
      data
    });
  }

  /**
   * 留案申请
   */
  @Debounce()
  public applyLeaveCase(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyLeaveCase,
      data,
    });
  }

  /**
   * 协催留案申请
   */
  @Debounce()
  public applyAssistLeaveCase(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyAssistLeaveCase,
      data,
    });
  }

  /**
   * 减免申请
   */
  @Debounce()
  public applyDerate(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyDerate,
      data,
    });
  }

  /**
   * 留案申请
   */
  @Debounce()
  public dealApply(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.dealApply,
      data,
    });
  }

  /**
   * 审批记录
   */
  public recordHistory(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.recordHistory,
      data,
    });
  }

  /**
   * 停催申请
   */
  @Debounce()
  public applyPauseCase(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyPauseCase,
      data,
    });
  }

  /**
   * 提前流转申请
   */
  @Debounce()
  public applyTurnCase(model: any) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyTurnCase,
      data: {
        applyCategory: 'TURN_CASE',
        caseIds: model.caseIds,
        turnGoal: model.turnSource,
        applyDescription: model.applyDescription,
      },
    });
  }

  /**
   * 委外回收-申请流转申请
   */
  @Debounce()
  public applyCirculationCase(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyCirculationCase,
      data,
    });
  }
  /**
   * 人工划扣
   */
  @Debounce()
  public applyRepay(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyRepay,
      data,
    });
  }

  /**
   * 停催激活
   */
  @Debounce()
  public applyPauseCaseActive(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.applyPauseCaseActive,
      data,
    });
  }

  /**
   * 审批类型设置列表
   */
  public checkApplyCategory(data) {
    return this.netService.send({
      server: domainService.caseApplyRecordController.checkApplyCategory,
      data,
    });
  }
}
