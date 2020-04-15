// pages/cart/cart.js
const app = getApp()

Page({
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad() {
    
  },
  onShow() {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }

    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }

    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })

    this.changeData()
  },
  onSelectAll() {
    // 1.判断是否是全部选中
    if (this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false,
        totalPrice:0
      })
    } else { // 某些没选中
      let totalPrice = 0; //let 有个指向 const 没有指向
      this.data.cartList.forEach(item => {
        item.checked = true
        totalPrice += item.price * item.count
      })
      console.log(totalPrice)
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true,
        totalPrice: totalPrice
      })
    }
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;
    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }
    console.log(counter, totalPrice)
    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  },
  //下单购买
  orderItem(){
    //订单对象
    const obj = {}
    //装入已勾选对象
    obj.cartList = []
    //获取当前时间戳
    var timestamp = new Date().getTime() 
    //订单编号
    obj.orderNum = timestamp + this.randomString(6)
    //将已选的数组放进obj对象
    let cartList = this.data.cartList
    //创建空数组
    const cartListP = []
    for(let i=0;i<cartList.length;i++){
      if(cartList[i].checked) {
        obj.cartList.push(cartList[i])
      } else {
        //将没勾选放入另一个数组
        cartListP.push(cartList[i])
      }
    }
    //若是没有勾选对象时
    if(obj.cartList.length == 0){
      wx.showToast({
        title: '请勾选对象',
      })
      return false
    }
    obj.totalCounter = this.data.totalCounter
    obj.totalPrice = this.data.totalPrice
    app.globalData.orderList.push(obj)
    //将此订单对象加入全局对象

      //下单后 购物车只剩下没勾选
      this.setData({
        cartList: cartListP
      })
        wx.navigateTo({
          url: '/pages/order/add/order',
        })
    
  },






   //生成随机字符串
    randomString(len) {
      len = len || 32;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = '';
      for(let i = 0; i<len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));

  }
  return pwd;
  }
})


