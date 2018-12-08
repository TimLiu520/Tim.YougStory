// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userInfo:null,
   hasUserInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.userAuthorized();
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