import { managementService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { Service } from '~/core/service'
import { PageService } from '~/utils/page.service';

export class CompanyService extends Service {
  @Inject(NetService)
  private netService: NetService

  /**
   * 创建公司接口
   * @param params
   */
  public createCompany(data) {
    return this.netService.send({
      server: managementService.companyController.createCompany,
      data: {
        companyAddress: data.companyAddress,
        companyName: data.companyName,
        companyPhone: data.companyPhone,
        companyStatus: data.companyStatus
      },
      loading: true
    })
  }
  /**
   * 获取所有公司接口
   * @param data 查询条件
   */
  public findAllCompany(data?: any) {
    return this.netService.send({
      server: managementService.companyController.findAllCompany,
      data
    })
  }

  /**
   * 获取所有公司接口
   * @param params 查询条件
   * @param page 分页参数
   */
  public queryAllCompanyPage(params: any, page: PageService) {
    return this.netService.send({
      server: managementService.companyController.queryAllCompanyPage,
      data: {
        companyName: params.companyName
      },
      page
    })
  }

  /**
   * 修改公司接口
   * @param params
   */
  public modify(data) {
    return this.netService.send({
      server: managementService.companyController.modify,
      data: {
        companyAddress: data.companyAddress,
        companyName: data.companyName,
        companyPhone: data.companyPhone,
        companyStatus: data.companyStatus,
        id: data.id
      },
      loading: true
    })
  }
}
