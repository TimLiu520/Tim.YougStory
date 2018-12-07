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
      observer:'loadMore'
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
    loadMore()
    {
     if(!this.data.q)
     {
       return;
     }
     if(this._isLocked())
     {
       return;
     }
     if(this.hasMore())
     {
        this._Locked();
        bookModel.getBookList(this.getCurrentStart(),this.data.q).then(res=>{
        this.setMoreData(res.data.books);
        this._unLocked();
        },()=>{
          this._unLocked();
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
      this._showResult();
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
    },
    _showResult()
    {
      this.setData({
        finished:true
      });
    },
    _isLocked(){
      return this.data.lock?true:false;
    },
    _Locked(){
      return this.data.lock=true;
    },
    _unLocked(){
      return this.data.lock=false;
    }
  }
})
