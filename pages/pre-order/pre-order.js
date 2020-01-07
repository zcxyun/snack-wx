import addressModel from "../../models/address.js"
import cartModel from "../../models/cart.js";
import orderModel from "../../models/order.js";
import {
  num2money, isEmptyArray, isNotEmptyArray, promisic,
} from '../../utils/util.js'

Component({
  properties: {

  },

  data: {
    products: [],
    oldTotalPrice: 0,
    totalPrice: 0,
    totalCount: 0,
    discountPrice: 0,
    address: null,
    showSettingDialog: false,
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      this.init()
    },

    async init () {
      const products = cartModel.getCartOfStorage()
      if (isNotEmptyArray(products)) {
        this.computeTotal(products)
      }
      const address = await addressModel.get()
      if (address) {
        this.setData({ address })
      }
    },

    computeTotal(products) {
      let totalPrice = products.reduce((a, b) => {
        const bTotalPrice = parseFloat(b.price_str) * b.count
        return a + bTotalPrice
      }, 0)
      let oldTotalPrice = products.reduce((a, b) => {
        const bOldTotalPrice = parseFloat(b.old_price_str) * b.count
        return a + bOldTotalPrice
      }, 0)
      const discountPrice = num2money(totalPrice - oldTotalPrice)
      totalPrice = num2money(totalPrice)
      oldTotalPrice = num2money(oldTotalPrice)
      const totalCount = products.reduce((a, b) => a + b.count, 0)
      this.setData({ products, totalPrice, oldTotalPrice, discountPrice, totalCount })
    },

    onAddress() {
      const that = this
      promisic(wx.authorize)({scope: 'scope.address'}).then(async () => {
        const address = await promisic(wx.chooseAddress)().catch(() => {})
        if (address) {
          const res = await addressModel.edit(address)
          if (res) {
            that.setData({ address })
          }
        }
      }).catch(() => {
        this.setData({ showSettingDialog: true })
      })
    },

    onConfirm() {
      this.setData({ showSettingDialog: false })
      wx.openSetting()
    },

    async submit() {
      const data = this.products.map(product => {
        return {
          product_id: product.id,
          count: product.count,
        }
      })
      const res = await orderModel.place(data)
      if (res && res.msg) {
        this._showToast(res.msg)
        // 下单成功, 清空购物车
        cartModel.clear()
        // 拉起微信支付

      }
    },

    _showToast(text) {
      wx.showToast({
        title: text,
        icon: 'none',
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  }
})
