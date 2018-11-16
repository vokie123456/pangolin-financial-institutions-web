import TelephoneBook from './telephone-book.vue';
import ThirdTelephoneBook from './third-telephone-book.vue';
import ThirdCallRecord from './third-call-record.vue';
import AddressList from './address-list.vue';
import CaseRemark from './case-remark.vue';

/**
 * 组件
 */
export const components = {
  TelephoneBook,
  ThirdTelephoneBook,
  ThirdCallRecord,
  AddressList,
  CaseRemark,
}

/**
 * 通讯录模块业务组合
 */
export const tabs = [
  { name: "telephone-book", label: "电话簿" },
  { name: "third-telephone-book", label: "第三方通讯录" },
  { name: "third-call-record", label: "第三方通话记录" },
  { name: "address-list", label: "地址簿" },
  { name: "case-remark", label: "案件备注" }
]