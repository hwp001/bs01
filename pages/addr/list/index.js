import {
  getCargo,
  updateCargo
} from '../../../service/address.js'

Page({
  data:{
    cargo:[],
    //是否有数据
    statu:true
  },
  onLoad: function () {
    const openId = wx.getStorageSync('openId');
    this._getCargo({openId:openId}); 
  },
  _getCargo(data){
    getCargo(data).then(res => {
      console.log(res)
      if (res.statu == 1) {
        res.data.map(item => {
          if (item.sort == 'false'){
            item.sort = false
          } else {
            item.sort = true
          }
          return item
        })
        this.setData({
          cargo: res.data
        })
      } else {
        wx.showToast({
          title: res.err,
        })
        this.setData({
          statu: false
        })
      }
    })
  },
  //按钮状态改变
  itemChange(e){
    const id = e.detail.value;
    updateCargo({id:id}).then(res => {
      console.log(res)
    })
  },
  //新增地址
  addItem(){
    wx.navigateTo({
      url: '/pages/addr/add/index',
    })
  },
  //编辑地址
  editItem(e){
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/addr/edit/index?id='+id
    })
  }
});