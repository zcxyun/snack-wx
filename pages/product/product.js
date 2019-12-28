import productModel from "../../models/product.js";
import commentModel from "../../models/comment.js"
import likeModel from "../../models/like.js"
import cartModel from "../../models/cart.js"

Component({

  properties: {
    id: Number,
  },

  data: {
    product: null,
    cartTotalCount: 0,
    // 评论相关
    comments: [],
    tapComments: [],
    // 点赞相关
    likeStatus: false,
    likeCount: 0,
    loading: false,
    // 底部工具栏
    showOptionPanel: false, // 是否显示详细选项
    // tab 相关
    currentTab: 'detail',
    tabs: [{
      tab: '商品详情',
      key: 'detail',
    }, {
      tab: '产品参数',
      key: 'params',
    }, {
      tab: '一些短评',
      key: 'comments',
    }]
  },

  methods: {

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      this.init()
    },

    async init() {
      this._loading(true)
      const id = this.properties.id

      const cartTotalCountPromise = cartModel.getTotalCount()
      const productPromise = productModel.get(id)
      const commentsPromise = commentModel.getByProduct(id)
      const likePromise = likeModel.getFavor(id)

      const cartTotalCount = await cartTotalCountPromise
      const product = await productPromise
      const comments = await commentsPromise
      const like = await likePromise

      if (product.desc_imgs && Array.isArray(product.desc_imgs)) {
        product.desc_imgs.sort((a, b) => a.order - b.order)
      }
      this.setData({
        cartTotalCount: cartTotalCount.total_count,
        product,
        comments,
        tapComments: comments.slice(0, 3),
        likeStatus: like.like_status,
        likeCount: like.like_count,
      })
      this._loading(false)
    },

    async onLike(e) {
      const { isLike } = e.detail
      const id = this.data.product.id
      let res = null
      if (isLike) {
        res = await likeModel.like(id)
      } else {
        res = await likeModel.unlike(id)
      }
      if (res) {
        this._showToast(res.msg)
      }
    },

    onTapHome() {
      wx.switchTab({
        url: '/pages/home/home'
      })
    },

    onTapCart() {
      wx.switchTab({
        url: '/pages/cart/cart'
      })
    },

    async onAddToCart(e) {
      const { id, count } = e.detail
      const res = await cartModel.edit(id, count)
      if (res && res.msg) {
        this._showToast(res.msg)
        this._showOptionPanel(false)
        const cartTotalCount = await cartModel.getTotalCount()
        this.setData({cartTotalCount: cartTotalCount.total_count})
      }
    },

    onNowBuy(e) {
      const { id, count } = e.detail
      console.log(id, count)
    },

    changeTabs(e) {
      const { activeKey } = e.detail
      this._setCurrentTab(activeKey)
    },

    onHeadImg() {
      wx.previewImage({
        urls: [this.data.product.image]
      })
    },

    async postComment(e) {
      const content = e.detail.name || e.detail.value
      if (!content) {
        this._showToast('评论内容不能为空')
        return
      }
      const res = await commentModel.add(this.data.product.id, content)
      if (res) {
        this._showToast(res.msg)
        this.data.comments.unshift({ content, nums: 1 })
        this.setData({
          comments: this.data.comments
        })
      }
    },

    _setCurrentTab(currentTab) {
      this.setData({currentTab})
    },

    _loading(loading) {
      this.setData({loading})
    },

    _showOptionPanel(showOptionPanel) {
      this.setData({showOptionPanel})
    },

    _showToast(msg) {
      wx.showToast({
        title: msg,
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