const AssistCisitWaitDistribution = () => import('~/pages/assist-manage/assist-visit-wait-distribution.vue');
const AssistVisitCollection = () => import('~/pages/assist-manage/assist-visit-collection.vue');
const AssistVisitStay = () => import('~/pages/assist-manage/assist-visit-stay.vue');
const AssistCase = () => import('~/pages/assist-manage/assist-case.vue');
const AssistAntiFraudSurveyCase = () => import('~/pages/assist-manage/assist-anti-fraud-survey-case.vue');
const AssistAntiFraudCaseStay = () => import('~/pages/assist-manage/assist-anti-fraud-case-stay.vue');

export default [
  {
    path: '/assist-manage/assist-visit-wait-distribution',
    name: 'assist-visit-wait-distribution',
    component: AssistCisitWaitDistribution,
  },
  {
    path: '/assist-manage/assist-visit-collection',
    name: 'assist-visit-collection',
    component: AssistVisitCollection,
  },
  {
    path: '/assist-manage/assist-visit-stay',
    name: 'assist-visit-stay',
    component: AssistVisitStay,
  },
  {
    path: '/assist-manage/assist-case',
    name: 'assist-case',
    component: AssistCase,
  },
  {
    path: '/assist-manage/assist-anti-fraud-case-stay',
    name: 'assist-anti-fraud-case-stay',
    component: AssistAntiFraudCaseStay,
  },
  {
    path: '/assist-manage/assist-anti-fraud-survey-case',
    name: 'assist-anti-fraud-survey-case',
    component: AssistAntiFraudSurveyCase,
  },

];
