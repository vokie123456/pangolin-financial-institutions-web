# 贷后催收管理系统
## [pangolin-web 4.0.0](http://114.116.34.94:3000/pangolin/pangolin-financial-institutions-web.git)
  > A Vue.js project

---
## 代码编写规范

#### 项目业务框架分为页面部分和组件部分。
1. 页面（菜单可见）放在page文件夹中
2. 组件（子页面）放在component文件夹中
3. data-box 中定义column的时候，如果使用宽度计算。
``` html
    <!--内容列请使用-->
    :min-width="$helper.getColumnWidth(5)"
    <!--操作列请使用 有几个按钮就写几-->
    :min-width="$helper.getOperateWidth(4)"
```
#### 页面编写风格，遵循Vue组件[生命周期](https://segmentfault.com/a/1190000008570622)，外部组件模块引用写在外面

``` javascript
import moudle from 'vue'
// ... 其他引用
export default class AccFlowApproval extends Vue
```

#### 变量声明,初始化

只声明，在created方法中进行初始化，特殊对象可以声明和赋值在一起

``` TypeScript
// bad
private assistModel: any = {
  companyCode: "",
  personalName: "",
  approveState: ""
};

// great
private assistModel: any = {};

created() {
  this.assistModel = {
    aa:'',
    bb:['x','y']
  }
}

```

#### 项目辅助资源说明

* ~/src/config 本目录下面的资源内容全部为与后端服务相关的接口名称 action 定义

``` javascript
import { requestType } from '~/config/enum.config'

// 服务名称 ， 此名称与后端对应
const SERVICE = 'business-service'
const CONTROLLER = 'appRegisterResource'

export default {
  /**
   * 新增app注册服务
   */
  addAppRegister: {
    service: SERVICE,
    controller: CONTROLLER,
    type: requestType.Post
  }
}
```
>[swagger-ui](https://swagger.io/)

* ~/src/services 接口的调用 request 定义

``` javascript
// 引用定义的接口模块
import { businessService } from '~/config/server'
// axios调用接口的底层类
import { NetService } from '~/utils/net.service'
// 依赖注入，去抖动模块
import { Inject, Debounce } from "~/core/decorator";
// 过滤器服务，用于时间，数据等的处理
import { FilterService } from "~/utils/filter.service";
// 核心服务
import { Service } from "~/core/service"

// 导出这个业务类，名称与Swagger-ui上的控制器名称一致
export class AccTelPoolService extends Service {

  // 依赖注入模式。
  @Inject(NetService)
  private netService: NetService

  /**
   * 电催页面新增联系人电话或邮箱地址
   */
  @Debounce()
  savePersonalContactPhone(data) { 
    // 参数根据action 的实际情况定义
    return this.netService.send({
      server: businessService.accTelPoolController.savePersonalContactPhone,
      data: data,
      loading: true //如果添加loading 则再后台通讯的时候 会添加已给loading动画
    })
  }
}
```

> [inject](https://www.npmjs.com/package/gulp-inject)

#### 工具类全局使用

 全局可供ts/js内部全局使用的VUE附加属性。
 |标识|名称|文件|
 |----|:----|:----|
 |$city|城市服务|~/utils/city.service|
 |$common|公共方法|~/utils/common.service|
 |$dict|字典服务|~/utils/dict.service|
 |$filter|过滤器服务|~/utils/filter.service|
 |$helper|帮助服务（目前仅有列宽方法）|~/utils/helper.service|
 |$validator|自定义验证器服务|~/utils/validator.service|
 |$coordinate|地图辅助服务|~/utils/coordinate.service|
 |...|其他待添加....|

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
test
# pangolin-financial-institutions-web
