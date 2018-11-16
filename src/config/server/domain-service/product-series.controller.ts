import { requestType } from '~/config/enum.config'

const SERVICE = 'domain-service'
const CONTROLLER = 'productSeriesController'

export default {
  /**
   * 获取所有的产品名称
   */
  getAllProductSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllProductSeries',
    type: requestType.Get
  }
}
