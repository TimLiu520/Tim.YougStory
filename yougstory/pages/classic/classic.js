// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
var model=new ClassicModel();
var likeModel=new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:null,
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    model.getLatest((data)=>{
      console.log(data);
       this.setData({
           classicData:data,
           likeStatus:data.like_status,
           likeCount:data.fav_nums
       });
    });
  },
  /**
   * 点赞事件
   */
  onLike:function(event)
  {
     console.log(event);
     let behavior=event.detail.behavior;
     likeModel.like(behavior,this.data.classicData.id,this.data.classicData.type);
  },

  onPrevious:function(event)
  {
    let index=this.data.classicData.index;
    model.getClassic(index,"previous",(data)=>{
      this._getLikeStatus(data.id,data.type);
      this.setData({
        classicData:data,
        latest:model.isLatest(data.index),
        first:model.isFirst(data.index)
      });
    });
  },
  onNext:function(event)
  {
    console.log(event);
    let index=this.data.classicData.index;
    model.getClassic(index,"next",(data)=>{
      this._getLikeStatus(data.id,data.type);
      this.setData({
        classicData:data,
        latest:model.isLatest(data.index),
        first:model.isFirst(data.index)
      });
    });
  },
  _getLikeStatus: function (cid, type) {
    likeModel.getClassicLikeStatus(cid, type, (data) => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
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