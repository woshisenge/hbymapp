// pages/teacher/content/content.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  bindName:function(e){
    this.setData({
      CUSTOMER_NAME:e.detail.value
    })
  },
  bindPhone:function(e){
    this.setData({
      CUSTOMER_PHONE:e.detail.value
    })
  },
  blurPhone:function(e){
    var phone = e.detail.value
    var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(phone.length == 0){
      util.showError("手机号不能为空！")
      return false;
    }
    if (!reg.test(phone)) { //如果手机号码的格式与正则的不符合，就提醒
      util.showError("手机号格式有误！")
      return false;
    }
  },
  bindSchool:function(e){
    this.setData({
      CUSTOMER_SCHOOL: e.detail.value
    })
    
  },
  bindAddress:function(e){
    this.setData({
      CUSTOMER_ADDRESS: e.detail.value
    })
    
  },
  order:function(){
    var that = this;
    var param = {}
    param.CUSTOMER_NAME = that.data.CUSTOMER_NAME;
    param.CUSTOMER_PHONE = that.data.CUSTOMER_PHONE;
    param.CUSTOMER_SCHOOL = that.data.CUSTOMER_SCHOOL;
    param.CUSTOMER_ADDRESS = that.data.CUSTOMER_ADDRESS;
    param.EXPERT_ID = that.data.id;
    util.sendRequest("wechat/applet/expert/api/order_expert",param,"POST",true,function(res){
      wx.showModal({
        title: '提示',
        content: res.data,
        showCancel:false,
        success: function (res) {
          
        }
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