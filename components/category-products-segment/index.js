// components/category-products-segment/index.js
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
    currentTab: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTabs(e) {
      const { currentIndex } = e.detail
      this._switchTab(currentIndex)
      this.triggerEvent('change-tabs', e.detail)
    },
    onProduct(e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('tap-product', { id })
    },
    onMore(e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('tap-more', { id })
    },
    _switchTab(currentTab) {
      this.setData({currentTab})
    },
  }
})
