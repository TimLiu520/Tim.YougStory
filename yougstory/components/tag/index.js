// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    content:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  
onPost(event)
{
    const text=this.properties.content;
     this.triggerEvent('subComment',{text},{});
}
  }
})
