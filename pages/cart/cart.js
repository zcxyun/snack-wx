import { num2money } from '../../utils/util.js'
import cartModel from '../../models/cart.js'

Component({

  properties: {
    // products: Array,
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
    // products: [{
    //   id: 1,
    //   name: 'zcx',
    //   price_str: '1.12',
    //   count: 2,
    //   image: "http://127.0.0.1:5000/assets/2019/11/15/4f1311ac-075b-11ea-a447-3c15c2c48de4.png",
    //   selected: true,
    // }, {
    //   id: 2,
    //   name: 'zcx',
    //   price_str: '1.12',
    //   count: 2,
    //   image: "http://127.0.0.1:5000/assets/2019/11/15/4f1311ac-075b-11ea-a447-3c15c2c48de4.png",
    //   selected: true,
    // }],
    products: [],
  },

  methods: {

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad () {

    },

    async init() {
      const products = await cartModel.getProducts()
      if (products) {
        this.data.products = products
        const { totalPrice, totalCount } = this._recount()
        this.setData({ totalPrice, totalCount, products })
      }
    },

    _recount() {
      let products = this.data.products
      if (products.length === 0) {
        return
      }
      products = products.filter((item) => item.selected)
      const totalCount = products.reduce((a, b) => {return a + b.count}, 0)
      let totalPrice = products.reduce((a, b) => {
        const bTotalPrice = parseFloat(b.price_str) * b.count
        return  a + bTotalPrice
      }, 0)
      totalPrice = num2money(totalPrice)
      return { totalCount, totalPrice }
    },

    onSelect(e) {
      const products = this.data.products
      const { id } = e.currentTarget.dataset
      const product = products.find((item) => item.id === id)
      product.selected = !product.selected
      const allSelected = products.every((item) => item.selected)
      const { totalPrice, totalCount } = this._recount()
      this.setData({ products, allSelected, totalPrice, totalCount })
    },

    onAllSelect() {
      const allSelected = !this.data.allSelected
      const products = this.data.products
      if (allSelected) {
        products.forEach(item => item.selected = true )
      } else {
        products.forEach((item) => item.selected = false)
      }
      const { totalPrice, totalCount } = this._recount()
      this.setData({ products, allSelected, totalCount, totalPrice })
    },

    onCounter(e) {
      const { count } = e.detail
      const { id } = e.currentTarget.dataset
      const product = this.data.products.find((item) => item.id === id)
      product.count = count
      const { totalPrice, totalCount } = this._recount()
      this.setData({ totalCount, totalPrice })
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
