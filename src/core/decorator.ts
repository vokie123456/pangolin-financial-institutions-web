// delete 反射用于车贷项目
// import "reflect-metadata";
// delete end
import { createDecorator } from 'vue-class-component'
import injector from 'vue-inject';
import { Observable } from "rxjs";

/**
 * 组件内依赖注入 测试
 * @param target
 */
export function Dependencies(target?: any) {
  return createDecorator((componentOptions, key) => {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target);
    }

    if (typeof componentOptions['dependencies'] === 'undefined') {
      componentOptions['dependencies'] = []
    }

    if (Array.isArray(componentOptions['dependencies'])) {
      componentOptions['dependencies'].push(key)
    }
  })
}


/**
 * 直接依赖注入
 */
export function Inject(target?): PropertyDecorator {
  return function (container, key) {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target);
    }

    try {
      container[key] = injector.get(key);
    }
    catch (ex) {
      console.warn(ex)
    }
  }
}

/**
 * 函数去抖动
 * @param time
 */
export function Debounce(time: number = 500) {
  return function (target, name, descriptor) {
    const oldValue = descriptor.value;
    let flag
    descriptor.value = function () {
      if (flag) {
        return Observable.empty()
      } else {
        flag = setTimeout(() => {
          flag = null
        }, time)
      }
      return oldValue.apply(target, arguments);
    };

    return descriptor;
  }
}

/**
 * 设置布局
 * @param target
 */
export function Layout(layout: string) {
  return function (target) {
    target.$layout = layout;
    return target;
  }
}

/**
 * 权限码中间件
 * @param target
 */
export function Auth(code: number) {
  return function (target) {
    target.$auth = code;
    return target;
  }
}


/**
 * 设置扩展属性
 * @param extend
 */
export function Extend(data: any) {
  return function (target) {
    Object.entries(data).forEach(([key, value]) => {
      target[key] = value;
    })

    return target;
  }
}