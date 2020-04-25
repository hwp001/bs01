// components/w-good-search/w-good-search.js
import {
  searchGood
} from '../../service/home.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //搜索框
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    searchItem(e){
      const value = this.data.inputVal
      //首先判断输入是否为空
      if (value.length > 0) {
        searchGood({ value: value }).then(res => {
          console.log(res)
          if (res.statu == 1) {
            const goodId = res.data
            wx.navigateTo({
              url: '/pages/good/good?goodId=' + goodId,
            })
          } else {
            wx.showToast({
              title: res.err,
            })
          }
        })
      } else {
        wx.showToast({
          title: '请输入关键字',
        })
      }

    }
  }
})
