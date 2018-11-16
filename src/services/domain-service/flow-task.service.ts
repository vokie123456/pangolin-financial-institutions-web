import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';

export class FlowTaskService {
  @Inject(NetService)
  private netService: NetService;
  /**
   * 查看审批流
   */
  public getFlowTask(data) {
    return this.netService.send({
      server: domainService.flowTaskController.getFlowTask,
      data,
    });
  }
  /**
   * 增加审批流
   */
  @Debounce()
  public addFlowTask(data) {
    return this.netService.send({
      server: domainService.flowTaskController.addFlowTask,
      data,
    });
  }
  /**
   * 修改审批流状态
   */
  @Debounce()
  public modifyFlowTask(data) {
    return this.netService.send({
      server: domainService.flowTaskController.putFlowTask,
      append: 'status',
      data,
    });
  }
  /**
   * 更新审批流
   */
  @Debounce()
  public updateFlowTask(data) {
    return this.netService.send({
      server: domainService.flowTaskController.putFlowTask,
      append: 'update',
      data,
    });
  }
  /**
   * 审批流列表
   */
  public queryFlowTask(data, page, sort) {
    return this.netService.send({
      server: domainService.flowTaskController.queryFlowTask,
      data,
      page,
      sort,
    });
  }

  /**
   * 审批类型设置列表
   */
  public queryApplyCategory(data, page, sort) {
    return this.netService.send({
      server: domainService.flowTaskController.queryApplyCategory,
      data,
      page,
      sort,
    });
  }

  /**
   * 修改审批类型设置状态
   */
  @Debounce()
  public applyCategory(data) {
    return this.netService.send({
      server: domainService.flowTaskController.applyCategory,
      append: 'status',
      data,
    });
  }

  /**
   * 审批类型设置列表
   */
  public checkApplyCategory(data) {
    return this.netService.send({
      server: domainService.flowTaskController.checkApplyCategory,
      data,
    });
  }


}
