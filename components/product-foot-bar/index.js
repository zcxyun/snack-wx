// components/product-foot-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartTotalCount: Number,
    product: Object,
    showOptionPanel: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartCount: 1,
    optionType: '',
    maxCount: 10,
    noStockText: '已经没库存了, 不能再点了',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onHome() {
      this.triggerEvent('to-home')
    },
    onCart() {
      this.triggerEvent('to-cart')
    },
    onAddCart() {
      this._showOptionPanel(true, 'addToCart')
    },
    onBuy() {
      this._showOptionPanel(true, 'nowBuy')
    },
    onMask() {
      this._showOptionPanel(false)
    },
    addToCart() {
      const id = this.properties.product.id
      const count = this.data.cartCount
      const stock = this.properties.product.stock
      if (stock > 0) {
        this.triggerEvent('add-to-cart', {id, count})
      } else {
        this._showToast(this.data.noStockText)
      }
    },
    nowBuy(e) {
      const id = this.properties.product.id
      const count = this.data.cartCount
      const stock = this.properties.product.stock
      if (stock > 0) {
        this.triggerEvent('now-buy', { id, count })
      } else {
        this._showToast(this.data.noStockText)
      }
    },
    _showOptionPanel(showOptionPanel, optionType = '') {
      this.setData({showOptionPanel, optionType})
    },
    onCounter(e) {
      const { count } = e.detail
      this.data.cartCount = count
    },
    onCounterOverflow(e) {
      const { type } = e.detail
      if (type === 'overflow_min') {
        this._showToast('至少选择一个商品')
      } else if (type === 'overflow_max') {
        const max = this.data.maxCount
        this._showToast(`一次最多选择${max}个商品`)
      }
    },
    _showToast(text) {
      wx.showToast({
        title: text,
        icon: 'none',
      })
    },
  }
})
