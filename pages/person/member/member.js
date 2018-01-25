// pages/person/member/member.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that =this;
     console.log(options)
     that.setData({
       vipname:options.vipname
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
  
  },
  formSubmitForReg: function (e) {
    util.sendRequest("/wechat/applet/user/vip", e.detail.value, "POST", true, function (res) {
      // console.log(res)
      // var vip = res.CARD_PURPOSE;
      // var vipname = "";
      // if (vip == "UA") {
      //   vipname = "白银会员"
      // }
      // else if (vip == "UB"){
      //   vipname = "黄金会员"
      // }
      // else if(vip == "UC"){
      //   vipname = "黑钻会员"
      // }
      // console.log(vip)
      // var pages = getCurrentPages();
      // var prevPage = pages[pages.length - 2];  //上一个页面
      // prevPage.data[vipname] = vipname;
      // prevPage.data[vip] = vip;
      // prevPage.setData(prevPage.data);
      util.showSuccess();
      wx.navigateBack({
        delta: 1
      })
    });
  }

})