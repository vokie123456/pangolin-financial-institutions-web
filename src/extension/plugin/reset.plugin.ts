import Vue from 'vue'

export default {
  install() {
    Vue.prototype.$reset = () => null
  }
}
