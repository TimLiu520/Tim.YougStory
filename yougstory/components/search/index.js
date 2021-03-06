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
    lock:false,
    loadingCenter:false
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
     if(this.isLocked())
     {
       return;
     }
     if(this.hasMore())
     {
        this.Locked();
        bookModel.getBookList(this.getCurrentStart(),this.data.q).then(res=>{
        this.setMoreData(res.data.books);
        this.unLocked();
        },()=>{
          this.unLocked();
        });
     }
    },
    onCancel(event)
    {
      this.triggerEvent('cancel',{},{});
      this.initData();
    },
    onDelete(event)
    {
      this.initData();
      this._closeResult();
    },
    onConfirm(event)
    {
      this._showResult();
      this._showLoadingCenter();
      const q=event.detail.value||event.detail.text;
      bookModel.getBookList(0,q).then(res=>{
          console.log(res.data);
          this.setMoreData(res.data.books);
          this.setTotal(res.data.total);
          this.setData({
            q
          });
          Keyword.addToHistory(q);
          this._hideLoadingCenter();
      });
    },
    _showLoadingCenter()
    {
      this.setData({
        loadingCenter:true
      });
    },
    _hideLoadingCenter()
    {
      this.setData({
        loadingCenter:false
      });
    },
    _showResult()
    {
      this.setData({
        finished:true
      });
    },
    _closeResult()
    {
      this.setData({
        finished:false,
        q:''
      });
    }
  }
})
