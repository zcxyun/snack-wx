// components/order-foot-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalPrice: String,
    commitText: String,
    commitBtnDisabled: {
      type: Boolean,
      value: false,
    },
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
    submit() {
      if (!this.properties.commitBtnDisabled) {
        this.triggerEvent('submit')
      }
    }
  }
})
