import { num2money, isEmptyArray, isNotEmptyArray } from '../../utils/util.js'
import cartModel from '../../models/cart.js'

Component({

  properties: {

  },

  /**
   * 页面的初始数据
   */
  data: {
    maxCount: 10,
    selectedImg: '/images/icon/circle@selected.png',
    noSelectedImg: '/images/icon/circle@noselected.png',
    allSelected: true,
    totalCount: 0,
    totalPrice: '0.00',
    products: [],
    loading: false,
  },

  methods: {

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad () {

    },

    async init() {
      const products = await cartModel.getProducts()
      if (isNotEmptyArray(products)) {
        products.forEach((product) => { product.slideClose = true })
        this.data.products = products
        this._recount()
      }
    },

    _recount() {
      let products = this.data.products
      if (isEmptyArray(products)) {
        this.setData({ products })
        return
      }
      const allSelected = products.every((item) => item.selected)
      const productsOfRecount = products.filter((item) => item.selected)
      const totalCount = productsOfRecount.reduce((a, b) => a + b.count, 0)
      let totalPrice = productsOfRecount.reduce((a, b) => {
        const bTotalPrice = parseFloat(b.price_str) * b.count
        return  a + bTotalPrice
      }, 0)
      totalPrice = num2money(totalPrice)
      this.setData({ products, allSelected, totalPrice, totalCount })
    },

    onSelect(e) {
      const products = this.data.products
      const { id } = e.currentTarget.dataset
      const product = products.find((item) => item.id === id)
      product.selected = !product.selected
      this._recount()
    },

    onAllSelect() {
      const allSelected = !this.data.allSelected
      if (allSelected) {
        this.data.products.forEach(item => item.selected = true )
      } else {
        this.data.products.forEach((item) => item.selected = false)
      }
      this._recount()
    },

    onCounter(e) {
      const { count } = e.detail
      const { id } = e.currentTarget.dataset
      const product = this.data.products.find((item) => item.id === id)
      product.count = count
      this._recount()
    },

    onCounterOverflow(e) {
      const { type } = e.detail
      const { id } = e.currentTarget.dataset
      const product = this.data.products.find((item) => item.id === id)
      if (product.selected) {
        if (type === 'overflow_min') {
          this._showToast('至少选择一个商品')
        } else if (type === 'overflow_max') {
          const max = this.data.maxCount
          this._showToast(`一次最多选择${max}个商品`)
        }
      }
    },

    async removeNoSelected() {
      if (this.data.loading) {
        return
      }
      this._loading(true)
      const products = this.data.products.filter((item) => item.selected)
      const res = await cartModel.editAll(products)
      if (res) {
        this.setData({products, allSelected: true})
      }
      this._loading(false)
    },

    async clear() {
      if (this.data.loading) {
        return
      }
      this._loading(true)
      const res = await cartModel.clear()
      if (res && res.msg) {
        this._showToast(res.msg)
        this.setData({products: []})
      }
      this._loading(false)
    },

    async deleteItem(e) {
      if (this.data.loading) {
        return
      }
      this._loading(true)
      const { id } = e.currentTarget.dataset
      const products = this.data.products.filter((item) => item.id !== id)
      const res = await cartModel.editAll(products)
      if (res) {
        this.data.products = products
        this._recount()
      }
      this._loading(false)
    },

    slideopen(e) {
      const { id } = e.currentTarget.dataset
      const products = this.data.products
      products.forEach((product) => {
        if (product.id === id) {
          product.slideClose = false
        } else {
          product.slideClose = true
        }
      })
      this.setData({products})
    },

    async settleAccount() {
      const res = await cartModel.editAll(this.data.products)
      if (res) {
        wx.navigateTo({
          url: '/pages/pre-order/pre-order'
        })
      }
    },

    goShopping() {
      wx.switchTab({ url: '/pages/home/home' })
    },

    _showToast(text) {
      wx.showToast({
        title: text,
        icon: 'none',
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
      this.init()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    async onHide() {
      cartModel.editAll(this.data.products)
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
