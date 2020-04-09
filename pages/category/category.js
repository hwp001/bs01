// pages/category/category.js
import {
  getGoodCategory,
  getGoodDetail,
  getAll
} from '../../service/category.js';
import {
  headURL
} from '../../service/tool.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    categories: [],
    childCategories: [],
    // subcategories: [],
    subDetails: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getGoodCategory(),
    this._getAll()
  },
  //获取商品种类
  _getGoodCategory(){
    getGoodCategory().then(res => {
      this.setData({
        categories: res
      })
    })
  },
  //获取默认数据
  _getAll(){
    getAll().then(res => {
      const subDetails = res.map(item => {
        item.img = headURL + item.img[0]
        return item
      })
      this.setData({
        subDetails: subDetails
      })
    })
  },
  //根据商品种类id 获取商品详细数据
    kinditem(e){
      const kindId = e.detail
      getGoodDetail(kindId).then(res => {
        const subDetails = res.map(item => {
          item.img = headURL + item.img[0]
          return item
        })
        this.setData({
          subDetails : subDetails
        })
      })
    },

  // 列表点击
  onItemClick(options) {
    const index = options.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  },
})