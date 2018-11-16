import Vue from 'vue'
import AMap from 'vue-amap';
import ElementUI from 'element-ui'
import VueImg from 'v-img';
import 'element-ui/lib/theme-chalk/index.css'

export default async function ({ store }) {
  // 安装AMap
  //TODO: 实施时应由客户提供搞得地图开发者账号
  AMap.initAMapApiLoader({
    key: '0240ff10dd31d192c04ae9e0d4c76561',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
  });
  Vue.use(AMap);
  Vue.use(VueImg);
  // 安装ElementUI
  Vue.use(ElementUI)
}
