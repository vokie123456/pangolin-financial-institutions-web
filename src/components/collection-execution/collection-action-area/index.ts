import TelephoneActionArea from './telephone-action-area.vue';
import VisitActionArea from './visit-action-area.vue';
import { CASE_CHANNEL } from '~/config/enum.config';

/**
 * 组件
 */
export const components = {
  TelephoneActionArea,
  VisitActionArea,
}

/**
 * 催收行动区业务组合
 */
export const tabs = [
  {
    name: "telephone-action-area",
    label: "电催行动区",
    channel: [CASE_CHANNEL.tel],
    // 对应历史信息业务组件设置
    historyPanel: "telephone-action-history"
  },
  {
    name: "visit-action-area",
    label: "外访行动区",
    channel: [CASE_CHANNEL.visit, CASE_CHANNEL.assist],
    // 对应历史信息业务组件设置
    historyPanel: "visit-action-history"
  }
]