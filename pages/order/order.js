// pages/order/order.js
import {
  getCargo
} from '../../service/address.js'
import {
  addOrder
} from '../../service/order.js'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cargoList:[],
    cargoIndex:0,
    //存cargoId
    cargoId:[],
    orderList:[],
    gainWay:[
      {value:1,name:"上门自提",checked:true},
      {value:0,name:"送货上门"}
    ],
    payWay:[
      {value:1,name:"微信支付",checked:true},
      { value: 0, name: "支付宝支付" }
    ],
    gainStatu: true,
    date: "2020-04-15",
    time: "12:01",
  },
  onLoad(){
    const orderList = app.globalData.orderList
    this.setData({
      orderList: orderList[orderList.length - 1]
    })
    const openId = wx.getStorageSync('openId')
    this._getCargo({openId:openId})
  },
  addressItem(e){
    console.log(e)
    const statu = e.detail.value
    let gainStatu = false;
    if (statu == 1) {
      gainStatu = true
    }
    this.setData({
      gainStatu: gainStatu
    })
  },
  //日期时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //获取商品数据
  _getCargo(data){
    getCargo(data).then(res => {
      if (res.statu == 1) {
        const data = res.data
        const cargoId = []
        const cargoList = []
        for (let i = 0; i < data.length; i++){
          cargoId[i] = data[i].id
          cargoList[i] = data[i].name + '   ' + data[i].phone + '   ' + data[i].address
        }
        this.setData({
          cargoList: cargoList,
          cargoId: cargoId
        })
      }
    })
  },
  //picker选择器
  pickChange(e){
    this.setData({
      cargoIndex: e.detail.value
    });
  },
  //表单提交数据
  submitForm(e){
    const data = e.detail.value
    //1、查看 收货方式 
    //快递收货 取出 cargoId;自提则 直接发送
    if (data.address == "0") {
      const cargoId = this.data.cargoId[data.addressL]
      data.cargoId = cargoId
      console.log(cargoId)
    }
    data.openId = wx.getStorageSync('openId')
    data.cartList = this.data.orderList.cartList
    addOrder(data).then(res => {
      console.log(res)
    })

  }

})