// components/products/index.js
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

  observers: {
    data(newValue) {
      if (Array.isArray(newValue) && wx.lin) {
        wx.lin.renderWaterFlow(newValue, true)
      }
    }
  },

  lifetimes: {
    attached() {
      // if (Array.isArray(this.properties.data) && wx.lin) {
      //   wx.lin.renderWaterFlow(this.properties.data, true)
      // }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
