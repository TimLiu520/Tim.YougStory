// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
const Keyword=new KeywordModel();
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
    finished:false,
    historyKeys:[],
    hotKeys:[]
  },

  attached(){
    this.setData({
      historyKeys:Keyword.getHistory()
    }); 
    Keyword.getHot().then(res=>{
      this.setData({
        hotKeys:res.data.hot
      }); 
     });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event)
    {
      this.triggerEvent('cancel',{},{});
    },
    onConfirm(event)
    {
      const word=event.detail.value;
      Keyword.addToHistory(word);
      this.setData({
        historyKeys:Keyword.getHistory()
      }); 
    }
  }
})
