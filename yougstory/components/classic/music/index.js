// components/classic/music/index.js
import {classicBehavior} from '../classic-beh.js'
const eMgr=wx.getBackgroundAudioManager()
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
     isPlay:true,
     pauseSrc:"images/player@playing.png",
     playSrc:"images/player@waitting.png",
    tagUrl: "images/music@tag.png"
  },
  attached:function(){
eMgr.stop();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onPlay:function()
    {
      console.log("play");
      let isPlay=this.data.isPlay;
      if(isPlay)
      {
        this.setData({
          isPlay:false
        });
        eMgr.src=this.properties.src;
        console.log(this.properties.src);
      }else
      {
        this.setData({
          isPlay:true
        });
        eMgr.pause();
      }
    }
  }
})
