import * as enumData from '~/config/enum.config'
import appConfig from "~/config/app.config"
import { DictService } from "~/utils/dict.service";
import { endOfDay as DateFnsEndOfDay, startOfDay as DateFnsStartOfDay, format as DateFnsFormat } from "date-fns";
import { LodashService } from '~/utils/lodash.service'

export class FilterService {
  /**
   * 转换枚举数据
   * @param value
   * @param key
   */
  public static enumConvert(value: number | string, key) {
    // 排除空字典或者空key
    if (!enumData || !key || !enumData[key]) {
      return ''
    }

    const data = enumData[key] instanceof Array ? enumData[key] : Object.values(enumData[key])

    const target = data.find(x => x.value === value)

    return target ? target.name : ""
  }

  /**
   * 转换字典数据
   * @param 字典code
   */
  public static dictConvert(code: string, key: string) {
    if (!code || !key) {
      return "";
    }
    return DictService.getDictName(code, key)
  }

  /**
   * 日期范围转换
   * @param dateRange
   * @param fmt
   */
  public static dateRanageFormat(dateRange, fmt = "YYYY-MM-DD HH:mm:ss") {
    const target: any = {
      start: '',
      end: ''
    }
    // 检测非法输入
    if (!dateRange || dateRange.length === 0 || !(dateRange instanceof Array)) {
      return target
    }

    // 获取开始时间
    let tmpDate = DateFnsStartOfDay(dateRange[0])
    target.start = FilterService.dateFormat(tmpDate, fmt)

    // 获取当前的最后时间点
    tmpDate = DateFnsEndOfDay(dateRange[1])
    target.end = FilterService.dateFormat(tmpDate, fmt)

    return target
  }

  /**
   * 日期格式化
   * @param date
   */
  public static dateMonthFormat(date, fmt = "YYYY-MM"): string {
    // 空数据处理
    if (date === null || date === undefined || date === '') {
      return ''
    }
    return DateFnsFormat(date, fmt)
  }

  /**
   * 日期时间格式化
   * @param date
   * @param fmt
   */
  public static dateTimeFormat(date, fmt = "YYYY-MM-DD HH:mm:ss"): string {
    return FilterService.dateFormat(date, fmt)
  }

  /**
   * 日期格式化
   * @param date
   */
  public static dateFormat(date, fmt = "YYYY-MM-DD"): string {
    // 空数据处理
    if (date === null || date === undefined || date === '') {
      return ''
    }
    return DateFnsFormat(date, fmt)
  }

  /**
   * 千分位转换
   * @param value
   */
  public static toThousands(value, fixed: number = 2): string {
    let num: any = ''
    if (value === null || value === '') {
      num = value
    } else {
      num = Number(value).toFixed(fixed)
      if (isNaN(num) || num === '' || num === undefined || num === null) {
        return ''
      }
      num = num + ''
      if (/^.*\..*$/.test(num)) {
        const pointIndex = num.lastIndexOf('.')
        let intPart = num.substring(0, pointIndex)
        const pointPart = num.substring(pointIndex + 1, num.length)
        intPart = intPart + ''
        const re = /(-?\d+)(\d{3})/
        while (re.test(intPart)) {
          intPart = intPart.replace(re, '$1,$2')
        }
        num = intPart + '.' + pointPart
      } else {
        num = num + ''
        const re = /(-?\d+)(\d{3})/
        while (re.test(num)) {
          num = num.replace(re, '$1,$2')
        }
      }
    }
    return num
  }

  /**
   * 手机号脱敏显示转换器
   */
  public static encryptPhone(value) {
    if (!appConfig.encryptSwitch) return ''
    if (!value || value === '') return ''

    if (value.length < 4) return value;
    return value.substr(0, 3) + '****' + value.substr(-4)
  }

  /**
   * 身份证脱敏显示转换器
   */
  public static encryptIDCardFour(value) {
    if (!appConfig.encryptSwitch) return ''
    if (!value || value === '') return ''
    // return value.substr(0, 3).padEnd(value.length - 4, '*') + value.substr(-4)
    if (value.length < 4) return value;
    return value.substr(0, 3) + '****' + value.substr(-4)
  }

  /**
   * 长度过长省略显示
   */
  public static ellipsis(value, length) {
    if (!value) {
      return ''
    }
    const data = String(value).trim()
    if (data.length <= length) {
      return data
    } else {
      return data.substr(0, length) + '...'
    }
  }

  /**
   * 小数转换为百分比
   * @param point 要转换的小数
   */
  public static toPercent(point?: number) {
    let str = '--'
    if (point !== undefined) {
      point *= 100
      str = (point > 0 ? point.toFixed(2) : 0) + '%'
    }
    return str
  }

  /**
   * 字符串截取
   * @param str 要截取的字符串
   * @param subIndex 截取长度,默认6位
   */
  public static subString(str: string, subIndex: number = 6) {
    if (!str) { return '' }
    return str.length > subIndex ? str.substring(0, subIndex) + '...' : str
  }

  /**
   * 对字符串进行格式化
   * @param str 要格式化的字符串
   * @param length 每行字符长度
   * @param appendStr 要插入的字符串
   */
  public static strSplit(str: string, length: number = 4, appendStr: string = '-') {
    if (!str) return ''
    const r = new RegExp(`.{${length}}`, 'g')
    const s = new RegExp(`${appendStr}\$`, 'g')
    return str.replace(r, $0 => $0 + appendStr).replace(s, '')
  }

  /**
   * 格式化显示金额追加百分比符号
   * @param value 要格式化的金额
   */
  public static percentFormat(value) {
    if (!value && value !== 0) return null
    const result = LodashService.round(value as number, 4)
    return `${result}%`
  }

  /**
   * 
   * @param value 要格式化的金额字符串
   * @param roundPre 精度 默认为2
   */
  public static moneyFormat(value: number, roundPre: number = 2) {
    const result = LodashService.round(value as number, roundPre)
    return `${result}`.replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
  }

  /**
   * 
   * @param value 要格式化的金额或字符串
   * @param d 要保留的小数位数
   */
  public static decimalToPrecent(value, d: number = 2) {
    if (!value) {
      return '0'
    }
    let f = 0
    let result = ''
    f = parseFloat(value) || f
    result = LodashService.round(f * 100, d)
    return FilterService.percentFormat(result)
  }

  /**
   * 格式化万元
   * @param val 
   */
  public static toTenThousands(val: number): string {
    if (!val) return ""
    return FilterService.toThousands(val / 10000);
  }

  /**
   * 数组去重
   * @param val 
   */
  public static arrayUniq(val: any): any {
    if (!val) return {}
    return LodashService.uniq(val);
  }
}
