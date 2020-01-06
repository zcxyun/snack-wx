// pages/home/home.js
import bannerModel from "../../models/banner.js";
import themeModel from "../../models/theme.js";
import productModel from '../../models/product.js'
import paginate from '../../behaviors/paginate.js'
import categoryModel from '../../models/category.js'

Component({
  behaviors: [paginate],
  data: {
    bannerItems: [],
    categories: [],
    themes: [],
    themeTitle: '精选主题',
    recentProductTitle: '产品列表',
    loading: false,
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.init()
    },

    async init () {
      this._loading(true)
      const bannerItemsPromise = bannerModel.get(bannerModel.idMap['首页置顶'])
      const categoriesPromise = categoryModel.getAllWithMiniImg()
      const themesPromise = themeModel.getAll()
      const productsPromise = productModel.getPaginate(0)

      const bannerItems = await bannerItemsPromise
      const categories = await categoriesPromise
      const themes = await themesPromise
      const res = await productsPromise
      this._setMoreData(res.models)
      this._setTotal(res.total)
      wx.lin.renderWaterFlow(res.models, false)
      this.setData({
        bannerItems,
        categories,
        themes,
      })
      this._loading(false)
    },

    onTapBannerItem(e) {
      const {type, id} = e.detail
      if (type === 2) {
        wx.navigateTo({
          url: `/pages/product/product?id=${id}`
        })
      } else if (type === 3) {
        wx.navigateTo({
          url: `/pages/products/products?type=theme&id=${id}`
        })
      }
    },

    onCategoryItem(e) {
      const { cell:{id} } = e.detail
      wx.navigateTo({
        url: `/pages/products/products?id=${id}`
      })
    },

    onThemeClick(e) {
      const {id} = e.detail
      wx.navigateTo({
        url: `/pages/products-h/products-h?id=${id}`
      })
    },

    onTapSearchBar() {
      wx.navigateTo({
        url: '/pages/product-search/product-search'
      })
    },

    _loading(loading) {
      this.setData({loading})
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
    async onReachBottom() {
      if (this._isLocked()) {
        return
      }
      if (this._hasMore()) {
        this._lock(true)
        const res = await productModel.getPaginate(this._getCurrentStart())
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
