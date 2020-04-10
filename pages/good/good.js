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
    recommends:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goodId = { goodId: options.goodId} 
    this._getDetail(goodId);
    this._getData();
  },

  //获取商品数据
  _getDetail(goodId){
    getDetail(goodId).then(res => {
      //获取商品基本信息
      const goodDetail = res.goodDetail.map(item => {
        for (var i = 0; i < item.img.length; i++) {
          item.img[i] = headURL + item.img[i];
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
      })
    })
  },
  //获取推荐数据
  _getData() {
    getData().then(res => {
      console.log(res);
        const recommends = res['pop'].map(item => {
          item.img = headURL + item.img[0]
          return item;
        })
      console.log(recommends)
      this.setData({
        recommends: res.pop,
      })
    })
  },
})