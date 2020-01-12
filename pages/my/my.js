import { promisic } from "../../utils/util.js"
import memberModel from '../../models/member.js'
import addressModel from "../../models/address.js"

Component({
  data: {
    authorized: false,
    memberInfo: {},
    showSettingDialog: false,
    orderMenu: [{
      name: '待付款',
      key: 'UNPAID',
    }, {
      name: '待发货',
      key: 'UNDELIVERED',
    }, {
      name: '待收货',
      key: 'UNRECEIPTED',
    }, {
      name: '已完成',
      key: 'DONE',
    }]
  },
  methods: {
    onLoad: function () {
    },

    async userAuthorized() {
      try {
        const res = await promisic(wx.getSetting)()
        if (res.authSetting['scope.userInfo']) {
          let loginStatus = false
          let { userInfo } = await promisic(wx.getUserInfo)()
          // 启动时检测更新后端头像
          const memberInfo = await memberModel.getInfo()
          if (memberInfo instanceof Object) {
            memberModel.updateInfo(memberInfo, userInfo)
            loginStatus = true
          } else {
            memberInfo = {}
          }
          this.setData({
            memberInfo,
            authorized: loginStatus
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    onOrderMenu(e) {
      const { key } = e.currentTarget.dataset
      wx.navigateTo({
        url:`/pages/order-list/order-list?activeKey=${key}`
      })
    },

    onAllOrder() {
      wx.navigateTo({
        url: "/pages/order-list/order-list"
      })
    },

    async onAddress() {
      const that = this
      promisic(wx.authorize)({scope: 'scope.address'}).then(async () => {
        const address = await promisic(wx.chooseAddress)().catch(() => {})
        if (address) {
          const res = await addressModel.edit(address).catch(() => {})
          if (res) {
            that._showToast('收货地址更新成功')
          }
        }
      }).catch(() => {
        that.setData({showSettingDialog: true})
      })
    },

    login() {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    },

    onConfirm() {
      this.setData({showSettingDialog: false})
      wx.openSetting()
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
      this.userAuthorized()
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
