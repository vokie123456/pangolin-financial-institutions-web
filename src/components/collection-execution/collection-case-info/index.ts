import CustInfo from './cust-info.vue';
import ProductInfo from './product-info.vue';
import ApplyDatumInfo from './apply-datum-info.vue';
import CreditReport from './credit-report.vue';
import PublicDebtInfo from './public-debt-info.vue';
import FixInfo from './fix-info.vue';
import CaseInfo from './case-info.vue';

/**
 * 组件
 */
export const components = {
  CustInfo,
  ProductInfo,
  ApplyDatumInfo,
  CreditReport,
  PublicDebtInfo,
  FixInfo,
  CaseInfo,
}

/**
 * 案件信息业务组合
 */
export const tabs = [
  { name: "cust-info", label: "客户信息" },
  { name: "case-info", label: "案件信息" },
  { name: "product-info", label: "产品信息" },
  // { name: "pay-info", label: "还款明细" },
  { name: "apply-datum-info", label: "申请材料信息" },
  { name: "credit-report", label: "征信报告" },
  { name: "public-debt-info", label: "共债信息" },
  { name: "fix-info", label: "修复信息" }
]