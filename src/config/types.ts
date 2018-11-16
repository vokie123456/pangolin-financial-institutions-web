import { CASE_CHANNEL } from "./enum.config";


/**
 * 催收执行页面打开后子模块用到的数据
 * @param mCaseId 案件ID
 * @param mCaseNo 案件编号
 * @param mCaseChannel 业务操作来源
 * @param isOnlyView 是否查看模式，默认为false
 */
export class OpenExecutionData {
  constructor(private mCaseId: string, private mCaseNo: string, private mCaseChannel: string, private isOnlyView?: boolean) { }

  /**
   * 案件ID
   */
  public get caseId() {
    return this.mCaseId
  }

  /**
   * 案件编号
   */
  public get caseNo() {
    return this.mCaseNo
  }

  /**
   * 业务操作来源
   */
  public get caseChannel() {
    return this.mCaseChannel
  }

  /**
   * 是否查看模式
   */
  public get onlyView() {
    return this.isOnlyView || false
  }

  /**
   * 是否案件导入
   */
  public get isImport() {
    return this.mCaseChannel === CASE_CHANNEL.import
  }

  /**
   * 是否案件导入待分配
   */
  public get isUndistributed() {
    return this.mCaseChannel === CASE_CHANNEL.undistributed
  }
}