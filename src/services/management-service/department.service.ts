import { managementService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
import { PageService } from "~/utils/page.service";
import { SortService } from "~/utils/sort.service";
import { Service } from "~/core/service"

export class DepartmentService extends Service {

  @Inject(NetService)
  private netService: NetService

  /**
   * 获取本级及以下机构
   * 
   */
  public querySubDepartment(): any {
    return this.netService.send({
      server: managementService.departmentController.querySubDepartment
    })
  }

  /**
   * 移动组织结构
   */
  public moveDepartment(data) {
    return this.netService.send({
      server: managementService.departmentController.moveDepartment,
      data
    })
  }

  /**
   * 移动组织结构
   */
  public deleteDepartment(id: string) {
    return this.netService.send({
      server: managementService.departmentController.deleteDepartment,
      append: id
    })
  }
  /**
   * 修改部门
   */
  public updateDepartment(data) {
    return this.netService.send({
      server: managementService.departmentController.updateDepartment,
      data,
      loading: true
    })
  }

  /**
   * 增加部门
   */
  public createDepartment(data) {
    return this.netService.send({
      server: managementService.departmentController.createDepartment,
      data,
      loading: true
    })
  }
}
