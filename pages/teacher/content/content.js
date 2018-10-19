// pages/teacher/content/content.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PHONE_STU: '无',
    ISBRANCHE: '无',
    LEARNING_TEND: '无',
    REGIONAL_TEND: '无',
    PROFESSIONAL_TEND: '无',
    HUMEN_RELATIONS: '无',
    ATTRACT_SCHOOL: '无',
    PARENTS_OPINION: '无',
    ADDITIONAL_ITEMS: '无',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
      headurl: options.headurl,
      nickname: options.nickname
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
  order:function(e){
    var userInfo = wx.getStorageSync('userInfo')
    var that = this;
    const data = {
      PHONE_STU: this.data.PHONE_STU,
      ISBRANCHE: this.data.ISBRANCHE,
      LEARNING_TEND: this.data.LEARNING_TEND,
      REGIONAL_TEND: this.data.REGIONAL_TEND,
      PROFESSIONAL_TEND: this.data.PROFESSIONAL_TEND,
      HUMEN_RELATIONS: this.data.HUMEN_RELATIONS,
      ATTRACT_SCHOOL: this.data.ATTRACT_SCHOOL,
      PARENTS_OPINION: this.data.PARENTS_OPINION,
      ADDITIONAL_ITEMS: this.data.ADDITIONAL_ITEMS,
    }
    data.PRO_ID = that.data.id
    data.NICKNAME_PRO = that.data.nickname
    data.HEADURL_PRO = that.data.headurl
    console.log(data)
    util.sendRequest("wechat/applet/expert/api/appointment_expert",data,"POST",true,function(res){
      if (res.data == 10000) {
        if (userInfo.VIP == '高级会员') {
          wx.showModal({
            content: '预约成功, 请等待专家联系您',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        } else {
          console.log(123)
        }
      }
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