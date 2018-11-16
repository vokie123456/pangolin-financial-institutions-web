import { dashboardQueryType, dashboardTimeType, monthList, weekList } from "~/config/enum.config";
import moment from "moment";
import appConfig from "~/config/app.config"

/**
 * 公共函数
 */
export class CommonService {
  /**
   * 获取日期列表
   */
  public static getDateList(date, type) {
    let result: any[] = [];
    switch (type) {
      case dashboardTimeType.year:
        result = monthList
        break;
      case dashboardTimeType.month:
        const days = moment(date).daysInMonth();
        for (let i = 1; i <= days; i++) {
          result.push(`${i.toString().padStart(2, "0")}日`);
        }
        break;
      case dashboardTimeType.week:
        result = weekList
        break;
      default:
        break;
    }

    return result;
  }
  /**
   * 返回此时系统的年月日数组
   */
  public static getDate() {
    const myDate = new Date()
    return [myDate.getFullYear(), myDate.getMonth() + 1, myDate.getDate()]
  }

  /**
   * 获取以某时间偏移之后的日期数组
   * @param offset 偏移量 (天)
   * @param currentDate 基准日期,不传则为当前日期
   */
  public static getDateArrayOnOffset(offset: number = 0, currentDate?: Date): Date[] {
    currentDate = currentDate || new Date()
    const beforeDate = moment(currentDate).add('days', offset).toDate()
    return [beforeDate, currentDate]
  }

  public static base64ConvertBlob(dataURI, mimeString?): Blob {
    const byteString = atob(dataURI.split(",")[1]);

    if (!mimeString) {
      mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
    } else {
      mimeString =
        mimeString + "/" + dataURI
          .split(",")[0]
          .split(":")[1]
          .split(";")[0]
          .split("/")[1];
    }

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  /**
   * 下载文件
   */
  public static downloadFile(url, filename: string = '') {
    const a = document.createElement('a')
    a.href = url
    a.click()
  }
  /**
   * 批量下载文件
   * @param pathList 需要下载的文件列表，需要包含 url,filename
   */
  public static downloadAll(pathList) {
    const download = async () => {
      for (const path of pathList) {
        await new Promise((reslove) => {
          CommonService.downloadFile(path.url, path.filename)
          setTimeout(() => {
            reslove()
          }, 100);
        })
      }
    }
    download()
  }
  /**
   * 下载文件
   */
  public static downloadImage(url, filename: string = '') {
    return new Promise((reslove, reject) => {
      const img = new Image();
      img.onload = () => {
        // 创建接受image的canvas
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        // 获取canvas
        const ctx: any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // 得到图片的base64编码数据
        const base64 = canvas.toDataURL("application/png");
        const blob = CommonService.base64ConvertBlob(base64, "application");
        const aTag = document.createElement("a");

        const objectURL = URL.createObjectURL(blob);
        aTag.href = objectURL;
        aTag.click();
        URL.revokeObjectURL(objectURL);
      };

      const appUrl: any = appConfig.url

      if (appUrl.image) {
        img.setAttribute("crossOrigin", appUrl.image);
      }

      img.src = url
    })
  }

  /**
   * 浏览器类型判断
   */
  public static _mime(option, value) {
    const mimeTypes = navigator.mimeTypes
    for (const mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true
      }
    }
    return false
  }
  public static getBrowserType() {
    const ua = navigator.userAgent.toLowerCase()
    const is360 = CommonService._mime('type', 'application/vnd.chromium.remoting-viewer');
    const isOpera = ua.indexOf("Opera") > -1;
    if (isOpera) {
      return 'opera'
    } else if (ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1 && !isOpera) {
      return 'ie'
    } else if (ua.indexOf('firefox') !== -1) {
      return 'firefox'
    } else if (ua.indexOf('safari') !== -1 && ua.indexOf('Version') !== -1) {
      return 'safari'
    } else if (ua.indexOf('chrome') > 1 && is360) {
      return '360'
    } else if (ua.indexOf('chrome') > 1) {
      return 'chrome'
    }
  }

  /**
   * 生成树型结构数据
   * @param sourceList 包含id 和 pid 的线性数据
   * @param options 数据项配置 配置 keyName: 主键名称,parentKeyName: 父级键名称
   */
  public static generateTreeData(sourceList, options?: { keyName: string; parentKeyName: string; sortKey: string }): any[] {
    if (!sourceList) {
      return []
    }

    // key
    const keyName = options ? options.keyName : 'id';
    // parentKey
    const parentKeyName = options ? options.parentKeyName : 'pid';
    // sort
    const sortKeyName = options ? options.sortKey : undefined;
    /**
     * 用当前节点去生成他的children节点
     * @param any node 
     */
    const fun = (node: any) => {
      // 用找到的孩子节点去递归查找孙子节点
      let children = sourceList.filter(x => x[parentKeyName] === node[keyName])
      if (sortKeyName) {
        children = children.sort((e1, e2) => e1[sortKeyName] - e2[sortKeyName])
      }
      children.map(fun);

      // 如果当前节点有孩子节点
      if (children && children.length) {
        // 就返回当包含孩子节点的对象
        return { ...node, children }
      } else {
        // 否则就返回当前对象
        return node
      }
    };

    // 如果有排序则根据排序键进行排序
    let rootList = CommonService.findRoot(sourceList, keyName, parentKeyName);
    if (sortKeyName) {
      rootList = rootList.sort((e1, e2) => e1[sortKeyName] - e2[sortKeyName])
    }
    const treeData = rootList.map(fun)
    return treeData;
  }



  /**
   * 字符串左补零
   */
  public static padLeft(num: number | string, length: number, ch: string = "0"): string {
    let str: string = (num || "").toString();
    for (let index: number = str.length; index < length; index++) {
      str = ch + str;
    }
    return str;
  }

  /**
   * 字符串左补零
   */
  public static padRight(num: number | string, length: number, ch: string = "0"): string {
    let str: string = (num || "").toString();
    for (let index: number = str.length; index < length; index++) {
      str += "0";
    }
    return str;
  }

  /**
   * datePick控件日期限制 默认小于当前日期
   * @param type 大于当前日期: 0,小于当前日期:< 0
   */
  public static datePickDisabledDate(type: number = -1) {
    const disabledDate = (date: Date) => {
      if (type) {
        if (type > 0) {
          const yesterDay: number = new Date().setHours(-24);
          return date < new Date(yesterDay)
        } else {
          return date > new Date
        }
      } else {
        return false
      }
    }
    return { disabledDate }
  }

  /**
   * datePick控件日期限制 默认小于当前日期
   * @param endDate 自定义结束日期
   * @param type 大于当前日期: 0,小于当前日期:< 0
   */
  public static datePickDisabledDateCustomer(endDate: Date, type: number = -1) {
    const disabledDate = (date: Date) => {
      if (!endDate) endDate = new Date
      if (type) {
        return type > 0 ? date < endDate : date > endDate
      } else {
        return false
      }
    }
    return { disabledDate }
  }

  /**
   * 查找数据源的所有根节点
   * @param dataList 要查找的数据
   * @param keyName 节点ID 标识
   * @param parentKey 节点父ID 标识
   */
  private static findRoot(dataList: any[], keyName: string, parentKey: string): any[] {
    const roots: any[] = [];
    for (const e of dataList) {
      if (!e[parentKey]) {
        roots.push(e)
      } else {
        const parents = dataList.find(item => item[keyName] === e[parentKey])
        roots.push(...this.findRoot(parents, keyName, parentKey))
      }
    }
    return roots
  }
}
