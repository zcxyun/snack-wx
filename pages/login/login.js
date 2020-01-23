import tokenModel from '../../models/token.js'
import { promisic } from "../../utils/util.js";

Component({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
  },

  methods: {

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

    },

    async getUserInfo(e) {
      try {
        const userInfo = e.detail.userInfo
        if (userInfo) {
          const { code } = await promisic(wx.login)()
          if (code) {
            this._loading(true)
            const res = await tokenModel.getTokens({ code, ...userInfo })
            if (res) {
              wx.navigateBack()
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    _loading(loading) {
      this.setData({ loading })
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
