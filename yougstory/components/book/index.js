// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    href:String
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

    onTab(event)
    {
        const bid=this.properties.book.id;
        wx.navigateTo({
            url:this.properties.href
        });
    }
  }
})
