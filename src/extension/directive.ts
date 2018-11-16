import Vue from 'vue'

export default ({ store }): any => ({
  /**
   * 资源认证
   */
  auth: {
    bind(el, binding, vnode) {
      // 获取权限编码
      const authCode = Number(binding.expression)
      // 验证权限码
      if (!authCode) {
        console.error('未传入权限')
        return
      }

      const hasAuth: boolean = (store.state.controlResource || []).includes(authCode)

      // 验证权限
      // TODO 开发期间，去掉权限认证
      if (!hasAuth) {
        el.style.display = 'none'
      }
    }
  }
})
