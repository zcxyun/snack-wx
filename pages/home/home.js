// pages/home/home.js
import bannerModel from "../../models/banner.js";
import themeModel from "../../models/theme.js";
import productModel from '../../models/product.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerItems: [],
    themes: [],
    recentProducts: [],
    themeTitle: '精选主题',
    recentProductTitle: '最新产品'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  async init () {
    const bannerItems = await bannerModel.get(bannerModel.idMap['首页置顶'])
    const themes = await themeModel.getAll()
    const recentProducts = await productModel.getRecent()
    wx.lin.renderWaterFlow(recentProducts, false)
    this.setData({
      bannerItems,
      themes,
    })
  },

  onTapBannerItem(e) {
    const {type, id} = e.detail
    if (type === 2) {
      wx.navigateTo({
        url: `/pages/product/product?id=${id}`
      })
    } else if (type === 3) {
      wx.navigateTo({
        url: `/pages/theme/theme?id=${id}`
      })
    }
  },

  onThemeClick(e) {
    const {id} = e.detail
    wx.navigateTo({
      url: `/pages/theme/theme?id=${id}`
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
})
