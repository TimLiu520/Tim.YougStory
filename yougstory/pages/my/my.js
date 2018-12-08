import {BookModel} from '../../models/book.js'
const bookModel=new BookModel();
import {ClassicModel} from '../../models/classic.js'
var classicModel=new ClassicModel();
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userInfo:null,
   hasUserInfo:false,
   bookCount:0,
   classics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.userAuthorized();
   this.getMyFavor();
   bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount:res.data.count
      })
   });
  },
  userAuthorized()
  {
    wx.getSetting({
       success:data=>{
         if(data.authSetting['scope.userInfo'])
         {
           wx.getUserInfo({
             success:data=>{
                this.setData({
                 userInfo:data.userInfo,
                 hasUserInfo:true
                });
             }
           });
         }
       }
    });
  },

  onGetUserInfo(event)
  {
    const userInfo=event.detail.userInfo;
    if(!userInfo)
    {
     return;
    }
    this.setData({
      userInfo,
      hasUserInfo:true
    });
    console.log(userInfo);
  },
  getMyFavor()
  {
    classicModel.getMyFavor(res=>{
      console.log(res);
      this.setData({
        classics:res
      })
    });
  },
  onJumpToAbout(event)
  {
    wx.navigateTo({
      url:'/pages/about/about'
    })
  },
  onPreviewTap: function(event) {
    wx.navigateTo({
      url: '/pages/classic-detail/classic-detail?cid=' + event.detail.cid + '&type=' + event.detail.type
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