import TelephoneActionHistory from './telephone-action-history.vue';
import ApplyHistory from './apply-history.vue';
import CirculationHistory from './circulation-history.vue';
import RecordHistory from './record-history.vue';
import VisitActionHistory from './visit-action-history.vue';
import VisitAnnex from './visit-annex.vue';

/**
 * 组件
 */
export const components = {
  TelephoneActionHistory,
  ApplyHistory,
  CirculationHistory,
  RecordHistory,
  VisitActionHistory,
  VisitAnnex
}

/**
 * 历史纪录业务组合
 */
export const tabs = [
  {
    label: "电催行动历史",
    name: "telephone-action-history"
  },
  {
    label: "外访行动历史",
    name: "visit-action-history"
  },
  {
    label: "流转历史",
    name: "circulation-history"
  },
  {
    label: "录音历史",
    name: "record-history"
  },
  {
    label: "申请历史",
    name: "apply-history"
  },
  {
    label: "外访附件",
    name: "visit-annex"
  }
]