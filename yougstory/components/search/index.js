// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
const Keyword=new KeywordModel();
import {BookModel} from '../../models/book'
const bookModel=new BookModel();
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
    q:'',
    historyKeys:[],
    hotKeys:[],
    bookData:[]
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
      const q=event.detail.value||event.detail.text;
      bookModel.getBookList(0,q).then(res=>{
          console.log(res.data.books);
          this.setData({
            bookData:res.data.books,
            q
          });
          Keyword.addToHistory(q);
      });
    }
  }
})
