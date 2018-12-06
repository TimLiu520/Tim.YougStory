// pages/book-detail/book-detail.js
import {BookModel} from '../../models/book.js'
import {LikeModel} from '../../models/like.js'
const model=new BookModel()
var likeModel=new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comentsData:[],
    detailData:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid=options.bid;
    const detail=model.getDetail(bid);
    const coments=model.getComments(bid);
    const likeStatusData=model.getLikeStatus(bid);
    detail.then(res=>{
      this.setData({
        detailData:res.data
      });
    });

    coments.then(res=>{
      this.setData({
        comentsData:res.data.comments
      });
    });

    likeStatusData.then(res=>{
      console.log(res);
      this.setData({
        likeStatus:res.data.like_status,
        likeCount:res.data.fav_nums
      });
    });
  },

  onLike:function(event)
  {
     console.log(event);
     let behavior=event.detail.behavior;
     console.log(this.data.detailData);
     likeModel.like(behavior,this.data.detailData.id,400);
  },
  onFakePost(event)
  {
    this.setData({
      posting:true
    });
  },
  onCancel(event)
  {
    this.setData({
      posting:false
    });
  },
  onSubComment(event)
  {
    const text=event.detail.text;
    console.log(text);
    if(text.length>12)
    {
      wx.showToast({
        title:'短评最多12个字',
        icon:'none'
      });
      return;
    }

    model.postComment(this.data.detailData.id,text).then(res=>{
      wx.showToast({
        title:'+ 1',
        icon:'none'
      });
      this.data.comentsData.unshift({
          content:text,
          nums:1
        });
      this.setData({
        comentsData:this.data.comentsData,
        posting:false
      });
    });


  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})