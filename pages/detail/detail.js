// pages/detail/detail.js
import {
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from '../../service/detail.js'

const iid = '1m7s9c4';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getGoodsData();
    this.getMuliData();
  },
  //请求推荐图数据
  getGoodsData() {
    wx.request({
      url: 'http://123.207.32.32:8000/api/wh/recommend',
      success: res => {
        const list = res.data.data.list;
        this.setData({
          recommends: list
        })
      },
      fail: error => {
        console.log('请求商品推荐函数失败'.error);
      }
    })
  },


  //请求轮播图数据函数
  getMuliData() {
    wx.request({
      url: 'http://123.207.32.32:8000/api/wh/detail',
      data: {
        'iid': iid
      },
      success: res => {
        const data = res.data.result;

        //1、取出顶部的图片
        const topImages = data.itemInfo.topImages;

        //2、创建BaseInfo对象
        const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services);

        //3、创建shopInfo对象
        const shopInfo = new ShopInfo(data.shopInfo);

        //4、获取detailInfo信息
        const detailInfo = data.detailInfo;

        //5、创建ParamInfo对象
        const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule);

        //6、获取评论信息
        let commentInfo = {};
        if (data.rate && data.rate.cRate > 0) {
          commentInfo = data.rate.list[0];
        }

        this.setData({
          topImages: topImages,
          baseInfo: baseInfo,
          shopInfo: shopInfo,
          detailInfo: detailInfo,
          paramInfo: paramInfo,
          commentInfo: commentInfo
        })

      },
      fail: error => {
        console.log('请求轮播图数据函数失败'.error);
      }
    });
  },
  onAddCart() {
    // 1、获取商品对象
    const obj = {};
    obj.iid = iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    //2、加入到购物车列表
    app.addToCart(obj);

    //3、加入成功提示
    wx.showToast({
      title: '加入购物车成功',

    });

  },
  //测试 购买=》 跳转页面
  onSwitchTab(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  }
})