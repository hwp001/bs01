import {
  getCargo,
  updateCargo,
  delCargoById
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
  },
  //删除地址
  delItem(e){
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除此快递地址',
      success(res) {
        if (res.confirm) {
          delCargoById({id:id}).then(res => {
            if (res.statu == 1) {
              wx.showToast({
                title: '删除成功',
              })
              setTimeout(function(){
                wx.reLaunch({
                  url: '/pages/addr/list/index'
                })
              },1000)
            } else {
              wx.showToast({
                title: '删除失败',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
});