// pages/products/products.js
import productModel from "../../models/product.js";
import paginate from '../../behaviors/paginate.js'
import themeModel from "../../models/theme.js";
import categoryModel from "../../models/category.js";

Component({
  behaviors: [paginate],
  properties: {
    id: Number,
    type: String,
  },
  /**
   * 页面的初始数据
   */
  data: {
    headerImg: "",
    loading: false,
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      this.init()
    },

    async init () {
      this._loading(true)
      const productsPromise = this._getProductsByType()
      const headerImgPromise = this._getHeaderImgByType()
      const res = await productsPromise
      if (res) {
        this._setMoreData(res.models)
        this._setTotal(res.total)
        wx.lin.renderWaterFlow(res.models, false)
      } else {
        this._setNoResult(true)
      }
      const headerImg = await headerImgPromise
      if (headerImg) {
        this.setData({
          headerImg,
        })
      }
      this._loading(false)
    },

    async _getProductsByType(start = 0) {
      const id = this.data.id
      const type = this.data.type
      let res = null
      if (type === 'theme') {
        res = await productModel.getPaginateByTheme(id, start)
      } else if (type === 'category') {
        res = await productModel.getPaginateByCategory(id, start)
      }
      return res
    },

    async _getHeaderImgByType() {
      const id = this.data.id
      const type = this.data.type
      let res = null
      if (type === 'theme') {
        res = await themeModel.get(id)
        if (res) {
          res = res.head_img
        }
      } else if (type === 'category') {
        res = await categoryModel.get(id)
        if (res) {
          res = res.image
        }
      }
      return res
    },

    _loading(loading) {
      this.setData({
        loading,
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
    async onReachBottom () {
      if (this._isLocked()) {
        return
      }
      if (this._hasMore()) {
        this._lock(true)
        const res = await this._getProductsByType(this._getCurrentStart())
        if (res && res.models) {
          this._setMoreData(res.models)
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
  }
})
