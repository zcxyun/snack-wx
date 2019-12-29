import {
  promisic,
  getLoginStatusOfStorage,
  setLoginStatusToStorage
} from "../../utils/util.js"
import tokenModel from '../../models/token.js'
import memberModel from '../../models/member.js'

Component({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    showSettingBtn: false,
    showSettingDialog: false,
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    async userAuthorized() {
      try {
        const res = await promisic(wx.getSetting)()
        if (res.authSetting['scope.userInfo']) {
          let loginStatus = false
          let {userInfo} = await promisic(wx.getUserInfo)()
          // 启动时检测更新后端头像
          const memberInfo = await memberModel.getInfo()
          if (memberInfo instanceof Object) {
            const isNotSame = this.equalInfo(memberInfo, userInfo)
            if (isNotSame) {
              await memberModel.updateInfo(userInfo)
            }
            loginStatus = true
          } else {
            userInfo = {}
          }
          this.setData({
            userInfo,
            authorized: loginStatus
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    equalInfo(memberInfo, userInfo) {
      const res = Object.keys(memberInfo).some(key => memberInfo[key] !== userInfo[key])
      return res
    },

    async onGetUserInfo(e) {
      try {
        const userInfo = e.detail.userInfo
        if (userInfo) {
          const { code } = await promisic(wx.login)()
          if (code) {
            const res = await tokenModel.getTokens({ code, ...userInfo })
            if (res) {
              this.setData({
                userInfo,
                authorized: true
              })
              setLoginStatusToStorage(true)
              // this.getMyFavorCount()
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    onOrder() {

    },

    async onAddress() {
      const that = this
      promisic(wx.authorize)({scope: 'scope.address'}).then(async () => {
        const res = await promisic(wx.chooseAddress)().catch(() => {})
      }).catch(() => {
        that.setData({showSettingDialog: true})
      })
    },

    async onConfirm() {
      this.setData({showSettingDialog: false})
      wx.openSetting()
    },

    onComment() {

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
      // this.loadMore()
    },

    // async loadMore() {
    //   if(this._isLocked()) {
    //     return
    //   }
    //   if (this._hasMore()) {
    //     this._lock(true)
    //     const moreData = await classicModel.getMyFavor(this._getCurrentStart())
    //     if(moreData && moreData.models) {
    //       // this._setTotal(moreData.total)
    //       this._setMoreData(moreData.models)
    //     }
    //     this._lock(false)
    //   } else {
    //     this._noMoreData()
    //   }
    // },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  }
})
