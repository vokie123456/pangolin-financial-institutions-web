const cityData = require('~/assets/json/city.json');

export class CityService {
  /**
   * 获取城市信息
   * @param level
   * @param id
   */
  public static getCityData({ level = 3, id = 1 } = {}) {
    const fun = (id, currentLevel = 1) => {
      const items = new Array();

      cityData.filter((x) => x.pid === id).forEach((x) => {
        // 生成城市对象
        const item: any = {
          value: x.id,
          label: x.name,
        };

        // 检测获取级别
        if (currentLevel < level) {
          const children = fun(x.id, currentLevel + 1);
          if (children && children.length > 0) {
            item.children = children;
          }
        }

        items.push(item);
      });

      return items;
    };

    return fun(id);
  }

  /**
   * 获取城市节点父元素
   * @param id
   */
  public static getCityParent(id): number[] {
    const result: number[] = [];

    // 向根节点遍历
    const fun = (itemId) => {
      const item: any = cityData.find((x) => x.id === itemId);
      if (item && item.pid !== 1) {
        result.unshift(item.pid);
        fun(item.pid);
      }
    };

    fun(id);

    return result;
  }

  /**
   * 获取城市节点父元素
   * @param id
   */
  public static getCityParentId(id): number {
    let result: any = null;
    const item: any = cityData.find((x) => x.id === id);
    if (item && item.pid !== 1) {
      result = item.pid;
    }
    return result;
  }

  /**
   * 根据叶子节点获取整个地区路径
   * @param id
   */
  public static getCityIds(id): number[] {
    const result: number[] = [id];

    // 向根节点遍历
    const fun = (itemId) => {
      const item: any = cityData.find((x) => x.id === itemId);
      if (item && item.pid !== 1) {
        result.unshift(item.pid);
        fun(item.pid);
      }
    };

    fun(id);

    return result;
  }

  /**
   * 获取城市名称
   * @param id
   */
  public static getCityName(...ids): string {
    const results: string[] = [];
    if (!ids[0]) {
      return '';
    }
    ids.forEach((id) => results.push(CityService.getCityNameById(id)));
    return results.length === 1 ? results[0] : results.join();
  }

  /**
   * 根据id城市名称
   * @param id
   */
  public static getCityNameById(id: any): string {
    if (typeof id === 'string') {
      id = Number.parseInt(id);
    }
    const temp = cityData.find((c) => c.id === id) || {};
    return temp.name;
  }

  /**
   * 根据ID 获取城市关系继承名称
   * @param id
   */
  public static getInheritNames(id: number): string {
    const inherits = CityService.getCityParent(id);
    inherits.push(id);
    return CityService.getCityName(...inherits);
  }
}
