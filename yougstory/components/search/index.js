// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
const Keyword=new KeywordModel();
import {BookModel} from '../../models/book'
const bookModel=new BookModel();

import {paginationBev} from '../behaviors/pagination.js'

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more:{
      type:String,
      observer:'_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    finished:false,
    q:'',
    historyKeys:[],
    hotKeys:[],
    lock:false
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
    _load_more()
    {
     console.log(123123);
     if(!this.data.q)
     {
       return;
     }
     if(this.data.lock)
     {
       return;
     }
     if(this.hasMore())
     {
      this.data.lock=true;
      bookModel.getBookList(this.getCurrentStart(),this.data.q).then(res=>{
        this.setMoreData(res.data.books);
        this.data.lock=false;
    });
     }
    },
    onCancel(event)
    {
      this.triggerEvent('cancel',{},{});
    },
    onDelete(event)
    {
      this.setData({
        finished:false
      });
    },
    onConfirm(event)
    {
      this.setData({
        finished:true
      });
      this.initData();
      const q=event.detail.value||event.detail.text;
      bookModel.getBookList(0,q).then(res=>{
          console.log(res.data);
          this.setMoreData(res.data.books);
          this.setTotal(res.data.total);
          this.setData({
            q
          });
          Keyword.addToHistory(q);
      });
    }
  }
})
