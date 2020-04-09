// pages/category/childCpn/w-menu-child/w-menu-child.js
import {
  getGoodDetail
} from '../../../../service/category.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    childCategories:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    childItemClick(e){
      const index = e.currentTarget.dataset.index
      this.setData({
         currentIndex: index
       })
      const kindId = { kindId: e.currentTarget.dataset.id }
      //根据kindId请求商品详细数据
      //必须 {} 再加一个括号传过去
      this.triggerEvent('kinditem', kindId, {})
    }
  }
})
