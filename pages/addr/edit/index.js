// pages/addr/edit/index.js
import {
  getCargoById,
  updateCargoById
} from '../../../service/address.js'
import {
  checkPhone,
  checkName
} from '../../../service/tool.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cargo:[],
    switch2Checked: false,
    radioItems: [
      { name: '女', value: '0' ,checked : false},
      { name: '男', value: '1' ,checked : false }
    ],
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const id = options.id
    getCargoById({id:id}).then(res => {
      console.log(res)
      if (res.statu == 1){
        const cargo = res.cargo
        const radioItems = this.data.radioItems
        for (var i=0;i<radioItems.length;i++){
          if (radioItems[i].name == cargo[0].sex) {
            radioItems[i].checked = true
          }
        }
        this.setData({
          cargo: cargo[0],
          switch2Checked: cargo[0].sort,
          radioItems:radioItems,
          id:id,
          address:cargo[0].address
        })
      } else {
        wx.showToast({
          title: '地址数据获取失败',
        })
      }
    })
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
  chooseLocation() {
    wx.chooseLocation({
      success: res => {
        this.setData({
          address: res.address
        })
      },
    })
  },
  //设为默认
  switch2Change(e) {
    console.log(e)
    this.setData({
      switch2Checked: e.detail.value
    })
  },
  //表单提交
  submitForm(e) {
    const Nbool = checkName(e.detail.value.name)
    if (Nbool) {
      const Pbool = checkPhone(e.detail.value.phone)
      if (Pbool) {
        const Abool = checkAddress(e.detail.value.address)
        if (Abool) {
          const data = e.detail.value
          data.id = this.data.id
          updateCargoById(e.detail.value).then(res => {
            if (res.statu == 1) {
              wx.showToast({
                title: '地址更新成功',
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/addr/list/index',
                })
              }, 1000)
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