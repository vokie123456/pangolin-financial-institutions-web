import { fileService, commonService } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { Service } from '~/core/service'
import uploadFileController from "~/config/server/common-service/upload-file.controller";

export class FileUploadService extends Service {
  @Inject(NetService)
  private netService: NetService

  /**
   * 文件在线查看
   */
  public view() {
    return this.netService.send({
      server: fileService.fileUploadController.view
    })
  }
  /**
   * 上传压缩文件，后台进行解压缩
   */
  public unZipCaseFile(data) {
    return this.netService.send({
      server: fileService.fileUploadController.unZipCaseFile,
      data
    })
  }
  /**
   * 根据id查看文件
   */
  public getUploadFile(data) {
    return this.netService.send({
      server: commonService.uploadFileController.getUploadFile,
      append: data
    })
  }
}
