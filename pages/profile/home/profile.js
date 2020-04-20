// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      { icon: 'cart.png', info: '我的购物车', addr:'/pages/cart/cart' },
      { icon: 'app.png', info: '我的订单', addr: '/pages/order/list/order' },
      { icon: 'vip.png', info: '我的评论', addr: '/pages/comment/home/comment' },
      { icon: 'shouhuodizhi.png', info: '收货地址', addr: '/pages/addr/list/index' },
    ],
    serviceList: [
      { icon: 'kefu.png', info: '联系客服', addr: '0' },
      { icon: 'wenti.png', info: '常见问题', addr: '/pages/help/help' },
      { icon: 'we.png', info: '关于我们',addr:'/pages/about/about' },
    ],
    userInfo:{
      avatar: "/assets/images/profile/avatar.png",
      nickname: '未登录'
    }
  },
  onLoad(){
    const userInfo = app.globalData.userInfo
    if (userInfo){
      this.setData({
        userInfo: userInfo
      })
    } else {
      wx.showToast({
        title: '用户未登录',
      })
    }
  },
})