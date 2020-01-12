import cartModel from "../../models/cart.js";
import orderModel from "../../models/order.js";
import productModel from "../../models/product.js"
import { num2money, isNotEmptyArray } from '../../utils/util.js'

Component({
  properties: {
    id: Number,
    count: Number,
  },

  data: {
    fromCart: false,
    products: [],
    oldTotalPrice: 0,
    totalPrice: 0,
    totalCount: 0,
    discountPrice: 0,
    commitText: '提交订单',
  },

  methods: {
    onLoad: function () {
      this.init()
    },

    async init () {
      let products = null
      const id = this.properties.id
      const count = this.properties.count
      this.data.fromCart = !id && !count
      if (this.data.fromCart) {
        products = await cartModel.getProducts().catch(() => {})
      } else {
        const product = await productModel.getForPreOrder(id).catch(() => {})
        if (product) {
          product.count = count
          products = [product]
        }
      }
      if (isNotEmptyArray(products)) {
        this.computeTotal(products)
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

    async submit() {
      const data = this.data.products.map(product => {
        return {
          product_id: product.id,
          count: product.count,
        }
      })
      const res = await orderModel.place(data).catch(() => {})
      if (res && res.msg) {
        this._showToast(res.msg)
        // 下单成功, 如果来自购物车就清空购物车
        if (this.data.fromCart) {
          cartModel.clear()
        }
        // 拉起微信支付
        // 如果支付失败跳转到订单列表页面待付款区,
        // 如果成功显示支付成功页面, 并显示跳转到首页或查看订单的按钮
        wx.redirectTo({
          url: '/pages/order-list/order-list'
        })
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
