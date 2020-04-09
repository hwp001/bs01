// pages/category/childCpn/w-menu/w-menu.js
import {
  getChildCategory
} from '../../../../service/category.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    childIndex: 0,
    childCategories: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      const data = { pid: e.currentTarget.dataset.pid} 
      // this.triggerEvent('menuclick', pid, {})
      //通过pid 获得商品子种类
      getChildCategory(data).then(res => {
        this.setData({
          childCategories : res
        })
      })
    },
    kinditem(e){
      const kindId = { kindId: e.detail.kindId }
      //根据kindId请求商品详细数据
      //必须 {} 再加一个括号传过去
      this.triggerEvent('kinditem', kindId, {})
    }
  }
})
