import userController from './user.controller';
import companyController from './company.controller';
import principalController from './principal.controller';
import systemBackupController from './system-backup.controller';
import systemLogController from './system-log.controller';
import bindPhoneController from './bind-phone.controller';
import resourceController from './resource.controller';
import sysParamController from './sys-param-controller';
import batchManageController from './batch-manage.controller';
import caseIntelligentCollectionController from './case-intelligent-collection.controller';
import accTelPoolController from './acc-tel-pool.controller';
import accVisitPoolController from './acc-visit-pool.controller';
import appRegisterController from './app-register.controller';
import appRegisterResourceController from './app-register-resource.controller';
import caseAssistApplyController from './case-assist-apply.controller';
import caseAssistController from './case-assist.controller';
import templateController from './template.controller';
import sMSMessageController from './sms-message.controller';
import caseFollowupAppController from './case-followup-app.controller';
import caseInfoAppController from './case-info-app.controller';
import caseInfoController from './case-info.controller';
import caseInfoRecordController from './case-info-record.controller';
import caseInfoDistributeController from './case-info-distribute.controller';
import caseInfoJudicialController from './case-info-judicial.controller';
import caseInfoHistoryController from './case-info-history.controller';
import caseRepairController from './case-repair.controller';
import caseReturnController from './case-return.controller';
import exportItemResourceController from './export-item-resource.controller';
import exportItemsController from './export-items.controller';
import letterController from './letter.controller';
import mailMessageController from './mail-message.controller';
import outbackSourceController from './out-back-source.controller';
import outSourceCommssionController from './out-source-commssion.controller';
import outsourceController from './outsource.controller';
import outsourcePoolController from './outsource-pool.controller';
import paymentController from './payment.controller';
import personalController from './personal.controller';
import productSeriesController from './product-series.controller';
import caseInfoExceptionController from './case-info-exception.controller';
import caseInfoVerificationController from './case-info-verification.controller';
import customerRepaymentPlanController from './customer-repayment-plan.controller';
import operatorCallRecordController from './operator-call-record.controller';
import caseOutboundApplyController from './case-outbound-apply.controller';
import freeMoneyResultController from './free-money-result-controller';
import taskBoxController from './task-box.controller';
import userBackcashPlanController from './user-backcash-plan.controller';
import callReportController from './call-report-controller';
import telCaseManageController from './tel-case-manage.controller';
import visitCaseManageController from './visit-case-manage.controller';
import flowTaskController from './flow-task.controller';

//委外模块
import outsourceLawsuitManageController from './outsource-lawsuit-manage.controller';
import outsourceBackCManageController from '~/config/server/domain-service/outsource-backc-manage.controller';
import outsourceSettleManageController from './outsource-settle-manage.controller';
import outsourceCommissionedManageController from './outsource-commissioned-manage.controller';
import outsourceRecycleManageController from './outsource-recycle-manage.controller';
import outsourceReconciliationManageController from './outsource-reconciliation-manage.controller';
import outsourceApplyRecordReconciliationController from './outsource-apply-record-reconciliation.controller';
import outsourceCollectionManageController from './outsource-collection-manage.controller';
import outsourceLawsuitBackManageController from './outsource-lawsuit-back-manage.controller';
import outsourceLawsuitIndexManageController from './outsource-lawsuit-manage-index.controller';
import outsourcePerformanceManageController from './outsource-performance-manage.controller';
import outsourceSettleIndexManageController from './outsource-settle-manage-index.controller';
import outsourceStayManageController from './outsource-stay-manage.controller';

//协催模块

import caseAssistVisitStayCotroller from './case-assist-visit-stay.controller';
import caseAssistCasecontroller from './case-assist-case.controller';
import caseAssistAntiFraudSurveyCase from './case-assist-anti-fraud-survey-case.controller';
import caseAssistAntiFraudCaseStayCase from './case-assist-anti-fraud-case-stay.controller';


//执行页接口
import caseOperatorPageController from './case-operator-page.controller';
import caseApplyRecordController from './case-apply-record.controller';

export const domainService = {
  caseOutboundApplyController,
  caseInfoExceptionController,
  resourceController,
  userController,
  companyController,
  principalController,
  systemBackupController,
  systemLogController,
  bindPhoneController,
  batchManageController,
  sysParamController,
  caseIntelligentCollectionController,
  accTelPoolController,
  accVisitPoolController,
  appRegisterController,
  appRegisterResourceController,
  caseAssistApplyController,
  caseAssistController,
  templateController,
  sMSMessageController,
  caseFollowupAppController,
  caseInfoAppController,
  caseInfoController,
  caseInfoDistributeController,
  caseInfoJudicialController,
  caseInfoHistoryController,
  caseRepairController,
  caseReturnController,
  exportItemResourceController,
  exportItemsController,
  letterController,
  mailMessageController,
  outbackSourceController,
  outSourceCommssionController,
  outsourceController,
  outsourcePoolController,
  paymentController,
  personalController,
  productSeriesController,
  caseInfoVerificationController,
  customerRepaymentPlanController,
  operatorCallRecordController,
  freeMoneyResultController,
  taskBoxController,
  userBackcashPlanController,
  callReportController,
  telCaseManageController,
  visitCaseManageController,
  caseInfoRecordController,
  //委外模块
  outsourceLawsuitManageController,
  outsourceBackCManageController,
  outsourceSettleManageController,
  outsourceCommissionedManageController,
  outsourceRecycleManageController,
  outsourceReconciliationManageController,
  outsourceApplyRecordReconciliationController,
  outsourceCollectionManageController,
  outsourceLawsuitBackManageController,
  outsourceLawsuitIndexManageController,
  outsourcePerformanceManageController,
  outsourceSettleIndexManageController,
  outsourceStayManageController,
  //协催接口
  caseAssistVisitStayCotroller,
  caseAssistCasecontroller,
  caseAssistAntiFraudSurveyCase,
  caseAssistAntiFraudCaseStayCase,

  //执行页接口
  caseOperatorPageController,
  caseApplyRecordController,
  flowTaskController,
};
