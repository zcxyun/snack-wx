import orderModel from "../../models/order.js"
import { num2money } from "../../utils/util.js"

Component({
  properties: {
    id: Number, // 订单id
  },

  data: {
    order: null,
    commitText: '',
    orderStatus: {
      UNPAID: orderModel.UNPAID,
      UNDELIVERED: orderModel.UNDELIVERED,
      UNRECEIPTED: orderModel.UNRECEIPTED,
      DONE: orderModel.DONE,
      CANCEL: orderModel.CANCEL,
    },
    commitBtnDisabled: false,
    currentOrderStatus: '',
  },

  methods: {
    onLoad: function () {
      this.init()
    },

    async init() {
      const id = this.properties.id
      if (!id) { return }
      const order = await orderModel.get(id).catch(() => {})
      if (order) {
        const currentOrderStatus = order.order_status_desc
        order.snap_address = JSON.parse(order.snap_address)
        order.snap_products = JSON.parse(order.snap_products)
        order.discountPrice = num2money(parseFloat(order.total_price_str) - parseFloat(order.old_total_price_str))
        let commitText = ''
        const orderStatus = this.data.orderStatus
        if (order.order_status === orderStatus.UNPAID) {
          commitText = '立即支付'
        } else if (order.order_status === orderStatus.UNRECEIPTED) {
          commitText = '确认收货'
        }
        this.setData({ order, commitText, currentOrderStatus })
      }
    },

    async submit() {
      const order = this.data.order
      const orderStatus = this.data.orderStatus
      if (order.order_status === orderStatus.UNPAID) {
        this._showToast('此小程序用于测试, 不能支付')
        // const res = await orderModel.pay(order.id).catch(() => { })
        // if (res) {
        //   this.setData({
        //     commitBtnDisabled: true,
        //     commitText: '已付款',
        //     currentOrderStatus: '待发货',
        //   })
        //   wx.navigateTo({
        //     url: '/pages/pay-result/pay-result'
        //   })
        // }
      } else if (order.order_status === orderStatus.UNRECEIPTED) {
        wx.lin.showDialog({
          type: "confirm",
          title: "提示",
          content: "确认商品已收到吗?",
          success: async (res) => {
            if (res.confirm) {
              const res = await orderModel.confirm(order.id).catch(() => {})
              if (res && res.msg) {
                this._showToast('确认收货成功')
                this.setData({
                  commitBtnDisabled: true,
                  commitText: '已确认收货',
                  currentOrderStatus: '已完成',
                })
              }
            }
          }
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
  },
})
