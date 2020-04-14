// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      { icon: 'cart.png', info: '我的购物车', addr:'/pages/cart/cart' },
      { icon: 'app.png', info: '我的订单', addr: '/pages/order/order' },
      { icon: 'shouhuodizhi.png', info: '收货地址', addr: '/pages/addr/list/index' },
      { icon: 'kefu.png', info: '联系客服', addr:'0'},
      { icon: 'wenti.png', info: '常见问题', addr: '/pages/help/help'}
    ],
    serviceList: [
      { icon: 'qingchu.png', info: '清楚缓存', addr:'1' },
      { icon: 'we.png', info: '关于我们',addr:'/pages/about/about' },
    ],
  }
})