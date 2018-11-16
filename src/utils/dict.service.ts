import store from '~/store'

const { state } = store

interface IDictType {
  name: string;
  code: string;
}

export class DictService {
  /**
   * 获取字典数据
   * @param codes
   */
  public static getDictData(...keys): IDictType[] {
    const results: IDictType[] = []
    // 获取字典项
    keys.forEach(key => {
      const items = state.dictData[key];
      if (items && items.length) {
        results.push(...items)
      }
    })

    return results
  }

  /**
   * 过滤器：获取字典名称
   * @param code 字典键值
   */
  public static getDictName(code: string, key: string) {
    let result = ''
    if (code && key) {
      const values = state.dictData[key]
      if (!values) return result
      const find = values.find(x => x.code === code) || {}
      result = find.name
    }
    return result
  }

  /**
   * 格式化拼接的字典项名称
   * @param value 拼接的字典ID字符串
   * @param split 拼接符
   */
  public static getDictNameForAppendStr(value, split?: string) {
    value = value || "";
    split = split || ",";
    const arr = value.split(split) as string[];
    return DictService.getDictData(arr).map(x => x.name).join(split)
  }
}
