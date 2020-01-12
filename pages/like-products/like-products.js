import paginate from "../../behaviors/paginate.js";
import likeModel from "../../models/like.js"

Component({
  behaviors: [paginate],

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
  },

  methods: {
    onLoad: function () {
      this.init()
    },

    async init () {
      this._loading(true)
      const res = await likeModel.getLikeProducts().catch(() => {})
      if (res && res.models) {
        this._setMoreDataBack(res.models)
        this._setTotal(res.total)
        wx.lin.renderWaterFlow(res.models, false)
      } else {
        this._setNoResult(true)
      }
      this._loading(false)
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
    async onReachBottom () {
      if (this._isLocked()) {
        return
      }
      if (this._hasMore()) {
        this._lock(true)
        const start = this._getCurrentStart()
        const res = await likeModel.getLikeProducts(start).catch(() => {})
        if (res && res.models) {
          this._setMoreDataBack(res.models)
          wx.lin.renderWaterFlow(res.models, false)
        }
        this._lock(false)
      } else {
        this._noMoreData()
      }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  },
})
