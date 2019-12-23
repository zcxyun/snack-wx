import productModel from '../../models/product.js'
import keywordModel from '../../models/keyword.js'
import paginateBeh from '../../behaviors/paginate.js'

Component({
  behaviors: [paginateBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    more: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotKeys: [],
    historyKeys: [],
    searching: false,
    searchKeys: '',
    loadingSearch: false,
    loadmoreType: 'loading',
    searchPlaceHolder: '请输入要搜索的商品名'
  },

  observers: {
    async more () {
      if(!this.data.searchKeys) {
        return
      }
      if (this._isLocked()) {
        return
      }
      if (this._hasMore()) {
        this._lock(true)
        const res = await productModel.search(
          this.data.searchKeys, this._getCurrentStart())
        if (res && res.models) {
          this._setMoreData(res.models)
          wx.lin.renderWaterFlow(res.models, false)
        }
        this._lock(false)
      } else {
        this._noMoreData()
      }
    }
  },

  lifetimes: {
    async attached() {
      this._getHotKeys()
      this._getHistoryKeys()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async _getHotKeys() {
      const hotKeys = await keywordModel.getHotKeys()
      this.setData({hotKeys})
    },
    _getHistoryKeys() {
      const historyKeys = keywordModel.getHistoryKeys()
      this.setData({historyKeys})
    },
    onCancel() {
      this._initPaginate()
      this._searching(false)
      this._showLoadingSearch(false)
      this._setInputValue('')
    },
    async onConfirm(e) {
      const text = e.detail.value || e.detail.name
      if (!text) {
        this._showToast(this.data.searchPlaceHolder)
        return
      }
      this._initPaginate()
      this._showLoadingSearch(true)
      this._searching(true)
      this._setInputValue(text)
      const res = await productModel.search(text)
      if (res) {
        this._setKeys(text)
        this._setTotal(res.total)
        this._setMoreData(res.models)
        wx.lin.renderWaterFlow(res.models, false)
      } else {
        this._setNoResult(true)
      }
      this._showLoadingSearch(false)
    },
    async _setKeys(text) {
      const hotKeys = await keywordModel.setHotKey(text)
      this.setData({
        hotKeys,
        historyKeys: keywordModel.setHistoryKey(text)
      })

    },
    _searching(searching) {
      this.setData({
        searching
      })
    },
    _showLoadingSearch(loadingSearch) {
      this.setData({
        loadingSearch
      })
    },
    _setInputValue(searchKeys) {
      this.setData({
        searchKeys
      })
    },
    _showToast(text) {
      wx.showToast({
        title: text,
        icon: 'none'
      })
    },
  }
})
