import {
  addCargo
} from '../../../service/address.js'
import {
  checkPhone,
  checkName
} from '../../../service/tool.js'

const App = getApp();
Page({
  data: {
    radioItems: [
      { name: '女', value: '0' },
      { name: '男', value: '1', checked: true }
    ],
    address: '',
    switch2Checked: false,
    name: '',
    tel: '',
  },
  onLoad(){
    
  },
  //按钮
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  //获取地理位置信息
  chooseLocation(){
    wx.chooseLocation({
      success: res => {
        this.setData({
          address: res.address
        })
      },
    })
  },
  //设为默认
  switch2Change(e){
    console.log(e)
    this.setData({
      switch2Checked: e.detail.value
    })
  },
  //表单提交
  submitForm(e){
    const Nbool = checkName(e.detail.value.name)
    if (Nbool) {
      const Pbool = checkPhone(e.detail.value.phone)
      if (Pbool){
        const Abool = checkAddress(e.detail.value.address)
        if (Abool){
          const data = e.detail.value
          data.openId = wx.getStorageSync('openId')
          addCargo(e.detail.value).then(res => {
            console.log(res)
            if (res.statu == 1){
              wx.showToast({
                title: '新增地址数据成功',
              }) 
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/addr/list/index',
                })
              },1000)
            } else {
              wx.showToast({
                title: res.err,
              })
            }
          })
        }
      }
    }
  },

});