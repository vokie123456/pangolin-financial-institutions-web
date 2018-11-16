const ExcelTemplate = () =>
  import('~/pages/templete-manage/excel-template.vue');

export default [
  {
    path: '/templete-manage/import-template',
    name: 'excel-template',
    component: ExcelTemplate,
  },
];
