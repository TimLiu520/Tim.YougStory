// components/classic/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgurl: String,
    content: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    tagUrl: "images/movie@tag.png"
  },
  ready: function() {
    let imgurl = this.properties.imgurl = "" ? "images/《饮食男女》@2x.png" : this.properties.imgurl;
    this.properties.imgurl = imgurl;
  },
  /**
   * 组件的方法列表
   */
  methods: {}
})