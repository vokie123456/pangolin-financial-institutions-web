
const VerificationManage = () => import('~/pages/verification-manage/verification-manage.vue')
const CaseDownloadRecord = () => import('~/pages/verification-manage/case-download-record.vue')

export default [
  {
    //核销管理 
    path: '/verification-manage/verification-manage',
    name: 'verification-manage',
    component: VerificationManage
  }, {
    //案件下载记录
    path: '/verification-manage/case-download-record',
    name: 'case-download-record',
    component: CaseDownloadRecord
  }
]
