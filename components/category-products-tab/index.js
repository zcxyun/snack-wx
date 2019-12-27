// components/category-products/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTabs(e) {
      // const {activeKey, currentIndex} = e.detail
      this.triggerEvent('change-tabs', e.detail)
    },
    onProduct(e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('tap-product', { id })
    },
    onMore(e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('tap-more', { id })
    }
  }
})
