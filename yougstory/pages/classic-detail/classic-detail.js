// pages/classic-detail/classic-detail.js
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
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id=options.cid;
    const type=options.type;
    console.log(id);
    model.getClassicById(id,type,res=>{
      console.log(res);
      this.setData({
        classicData:res
      });
    });
    this._getLikeStatus(id,type);
  },
  onLike:function(event)
  {
     console.log(event);
     let behavior=event.detail.behavior;
     likeModel.like(behavior,this.data.classicData.id,this.data.classicData.type);
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