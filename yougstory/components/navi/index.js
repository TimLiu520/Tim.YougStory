// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
    latest:Boolean,
    first:Boolean
  },
  /**
   * 组件的初始数据
   */
  data: {
    lefticon: "images/triangle@left.png",
    disLeftIcon:"images/triangle.dis@left.png",
    righticon: "images/triangle@right.png",
    disRightIcon:"images/triangle.dis@right.png"
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(){
      if(!this.properties.latest)
      {
        this.triggerEvent('left',{},{})
      }
    },
    onRight:function(){
      if(!this.properties.first)
      {
        this.triggerEvent('right',{},{})
      }
    }
  }
})