// components/classic/music/index.js
import {classicBehavior} from '../classic-beh.js'
Component({

  /**
   * 组件的属性列表
   */
  behaviors:[classicBehavior],
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
     pauseSrc:"images/player@playing.png",
     playSrc:"images/player@waitting.png",
    tagUrl: "images/music@tag.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
