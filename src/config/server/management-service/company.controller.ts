import { requestType } from '~/config/enum.config'

const SERVICE = 'management-service'
const CONTROLLER = 'companyController'

export default {
  /**
   * 创建公司接口
   */
  createCompany: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createCompany',
    type: requestType.Post
  },
  /**
   * 获取所有公司接口
   */
  findAllCompany: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'findAllCompany',
    type: requestType.Get
  },
  /**
   * 获取公司分页接口
   */
  queryAllCompanyPage: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryAllCompanyPage',
    type: requestType.Get
  },
  /**
   * 修改公司接口
   */
  modify: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'modify',
    type: requestType.Post
  }
}
