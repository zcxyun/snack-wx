// pages/category/category.js
import categoryModel from "../../models/category.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
  },

  async _init() {
    this._loading(true)
    const categories = await categoryModel.getAll()
    this._setProduct2Categories(categories, categories[0].id)
    this._loading(false)
  },

  async _setProduct2Categories(categories, cid) {
    if (categories.find(item => item.id == cid && item.products)) {
      return
    }
    const res = await categoryModel.getWithProducts(cid)
    categories.forEach(category => {
      if (category.id === res.id) {
        category.products = res.products
        category.image = res.image
      }
    })
    this.setData({
      categories,
    })
  },

  onChangeTabs(e) {
    const {activeKey} = e.detail
    this._setProduct2Categories(this.data.categories, activeKey)
  },

  onTapProduct(e) {
    const { id } = e.detail
    wx.navigateTo({
      url: `/pages/product/product?id=${id}`
    })
  },

  onTapMore(e) {
    const { id } = e.detail
    wx.navigateTo({
      url: `/pages/products/products?id=${id}`
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
