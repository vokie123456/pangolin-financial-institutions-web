import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from '~/utils/filter.service';

export class OutsourceReconciliationService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 委外对账列表
   */
  public caseOutContrastList(data,page,sort) {
    return this.netService.send({
      server: domainService.outsourceReconciliationManageController.caseOutContrastList,
      data:{
        batchNumber:data.batchNumber,
        caseNumber:data.caseNumber,
        checkStatus: data.checkStatus,
        entryTimeStart: FilterService.dateRanageFormat(data.entryTime).start,
        entryTimeEnd: FilterService.dateRanageFormat(data.entryTime).end,
        outId:data.outsName,
      },
      page,
      sort,
    })
  }
  /**
   * 调账
   */
  public accountAdjustment(data) {
    return this.netService.send({
      server: domainService.outsourceApplyRecordReconciliationController.accountAdjustment,
      data
    })
  }
  /**
   * 案件统计
   */
  public caseStatistics(data) {
    return this.netService.send({
      server: domainService.outsourceReconciliationManageController.caseStatistics,
      data
    })
  }
  /**
   * 对账单核对
   */
  public checkBill(data) {
    return this.netService.send({
      server: domainService.outsourceReconciliationManageController.checkBill,
      data
    })
  }

  /**
   * 根据受托方查询批次号下拉列表
   */
  public selectBatchNumberList(data) {
    return this.netService.send({
      server: domainService.outsourceReconciliationManageController.selectBatchNumberList,
      data
    })
  }

  /**
   * 根据受托方查询批次号下拉列表
   */
  public generatingBill(data) {
    return this.netService.send({
      server: domainService.outsourceReconciliationManageController.generatingBill,
      data
    })
  }

  /**
   * 委外管理-委外对账-对账单导出
   */
  public exportBills(data) {
    return this.netService.send({
      server: domainService.outsourceReconciliationManageController.exportBills,
      data
    })
  }

  /*
   * 委外管理-委外对账-导入还款记录
   */
  public importRepaymentRecord(data) {
    return this.netService.send({
      server: domainService.outsourceReconciliationManageController.importRepaymentRecord,
      data
    })
  }


}
