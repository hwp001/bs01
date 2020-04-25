// pages/good/good.js
import {
  getDetail,
  GoodsBaseInfo
} from '../../service/good.js'
import {
  headURL
} from '../../service/tool.js'
import {
  getData
} from '../../service/home.js'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodDetail:[],
    topImages:[],
    statu: false,
    baseInfo:{},
    commentInfo:{},
    recommends:{},
    buyState:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const goodId = { goodId: options.goodId} 
    this._getDetail(goodId);
    this._getData();
  },

  //获取商品数据
  _getDetail(goodId){
    getDetail(goodId).then(res => {
      console.log(res)
      //获取商品基本信息
      const goodDetail = res.goodDetail.map(item => {
        for (var i = 0; i < item.img.length; i++) {
          item.img[i] = headURL + item.img[i]
        }
        if(item.buy_state == 1){
          item.buy_state = '预订'
        } else {
          item.buy_state = '购买'
        }
        return item;
      })
      //创建baseInfo对象
      const baseInfo = new GoodsBaseInfo(goodDetail[0]);
      //获取商品评论
      const statu = res.statu;
      //false 无评论 true 有评论
      if (statu) {
        const goodComment = res.goodComment.map(item => {
          for (var i = 0; i < item.img.length; i++) {
            item.img[i] = headURL + item.img[i];
          }
          item.avatar = headURL + item.avatar;
          return item;
        })
        this.setData({
          commentInfo: goodComment[0]
        })
      }
      this.setData({
        statu: res.statu,
        goodDetail: goodDetail[0],
        topImages: goodDetail[0].img,
        baseInfo: baseInfo,
        // buyState: buyState
      })
    })
  },
  //获取推荐数据
  _getData() {
    getData().then(res => {
        const recommends = res['pop'].map(item => {
          item.img = headURL + item.img[0]
          return item;
        })
      this.setData({
        recommends: res.pop,
      })
    })
  },
  //加入购物车
  //1、获取商品对象
  onAddCart(){
    const obj = {}
    obj.id = this.data.goodDetail.id
    obj.imageURL = this.data.goodDetail.img[0]
    obj.title = this.data.goodDetail.title
    obj.desc = this.data.goodDetail.description
    obj.price = this.data.goodDetail.price

    //2、将对象加入购物车
    app.addToCart(obj)

    //3、加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})