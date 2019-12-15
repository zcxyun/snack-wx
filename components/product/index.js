// components/product/product.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
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
    onProduct(e) {
      const {id} = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    }
  }
})
