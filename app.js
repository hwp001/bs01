//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  //1、购物车判断商品是否已经添加进来
  addToCart(obj){
    const oldInfo = this.globalData.cartList.find((item) => item.id === obj.id);
    if (oldInfo) {
      oldInfo.count += 1;
    } else {
      obj.count = 1;
      obj.checked = true;
      this.globalData.cartList.push(obj);
    }
   },

  globalData: {
    userInfo: null,
    cartList: [],
    orderList: []
  },

})