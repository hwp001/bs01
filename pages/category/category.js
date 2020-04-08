// pages/category/category.js
import {
  getGoodCategory
} from '../../service/category.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    categories: [],
    subcategories: [],
    maitKey: 3627,
    type: 'new',
    miniWallkey: 10062603,
    subDetails: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载列表数据
    wx.request({
      url: 'http://123.207.32.32:8000/api/wh/category',
      success: res => {
        console.log('列表数据加载成功');
        const list = res.data.data.category.list;
        this.setData({
          categories: list
        })
      }
    });
    //加载子列表数据
    wx.request({
      url: 'http://123.207.32.32:8000/api/wh/subcategory',
      data: {
        maitKey: this.data.maitKey
      },
      success: res => {
        console.log('加载子列表数据');
        const list = res.data.data.list;
        this.setData({
          subcategories: list
        })
      }
    }),
    //加载子列表详细数据
    wx.request({
      url: 'http://123.207.32.32:8000/api/wh/subcategory/detail',
      data: {
        miniWallkey: this.data.miniWallkey,
        type: this.data.type
      },
      success: res => {
        console.log('加载子列表详细数据');
        const list = res.data;
        console.log(list);
        this.setData({
          subDetails: list
        });
      }
    })

  },
  // 列表点击
  onItemClick(options) {
    // console.log(options);
    const index = options.currentTarget.dataset.index;
    this.setData({
      currentIndex: index
    })
  }
})