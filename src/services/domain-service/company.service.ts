import { domainService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { Service } from '~/core/service'

export class CompanyService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 查询公司
   * @param 查询条件
   * @page 页码信息
   */
  public queryCompanyList(params, page) {
    return this.netService.send({
      server: domainService.companyController.queryCompany,
      data: {
        chinaName: params.chinaName,
        engName: params.engName,
        state: params.state,
        code: params.code,
        legPerson: params.legPerson,
        address: params.address,
        city: params.city,
        phone: params.phone,
        fax: params.fax,
        contactPerson: params.contactPerson
      },
      page
    })
  }
  /**
   * 创建公司
   * @param params
   */
  public createCompany(data) {
    return this.netService.send({
      server: domainService.companyController.createCompany,
      data
    })
  }
  /**
   * 修改注册公司
   * @param params
   */
  public updateCompany(data) {
    return this.netService.send({
      server: domainService.companyController.updateCompany,
      data
    })
  }
  /**
   * 获取所有公司
   * @param params
   */
  public getAllCompany() {
    return this.netService.send({
      server: domainService.companyController.getAllCompany
    })
  }
  /**
   * 获取公司通过code
   * @param params
   */
  public getCompanyByCode({ code }) {
    return this.netService.send({
      server: domainService.companyController.getCompanyByCode,
      code
    })
  }
}

