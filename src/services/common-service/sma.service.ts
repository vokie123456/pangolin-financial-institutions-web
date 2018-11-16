import {commonService} from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class SmaService {

  @Inject(NetService)
  private netService: NetService

  /**
   * 开始电话呼叫
   */
  @Debounce()
  public addTaskRecorder(data) {
    return this.netService.send({
      server: commonService.smaController.addTaskRecorder,
      data
    })
  }
  /**
   * 验证呼叫来源
   */
  public checkCall(data) {
    return this.netService.send({
      server: commonService.smaController.checkCall,
      data
    })
  }
  /**
   * 绑定呼叫ID(绑定主叫号码)
   */
  public bindTaskDataByCallerId(data) {
    return this.netService.send({
      server: commonService.smaController.bindTaskDataByCallerId,
      data
    })
  }
  /**
   * 签入
   */
  public signIn(data) {
    return this.netService.send({
      server: commonService.smaController.signIn,
      data
    })
  }
  /**
   * 签入
   */
  public validateTaskIdInEmpId() {
    return this.netService.send({
      server: commonService.smaController.validateTaskIdInEmpId,
    })
  }
}
