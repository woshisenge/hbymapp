// pages/teacher/content/content.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PHONE_STU: '',
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
    var userInfo = wx.getStorageSync('userInfo')
    console.log(options)
    this.setData({
      id:options.id,
      headurl: options.headurl,
      nickname: options.nickname,
      PHONE_STU: userInfo.PHONE,
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
        if (userInfo.VIP == '高级会员' || userInfo.VIP == '高级体验会员') {
          wx.showModal({
            content: '预约成功, 请等待专家联系您',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        } else {
          util.sendRequest("/plant/wxrecharge/addUnPayOrder", { TOTAL: '39800' }, "POST", true, function (res) {
            console.log(res)
            if (res.errorMessage == "请君登录账号！") {
              wx.showModal({
                content: '请重新登录',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '/pages/login/login'
                    })
                  }
                }
              })
            }
            // return false
            var OUT_TRADE_NO = res.OUT_TRADE_NO
            var nonceStr = res.prePayReSign.nonceStr;
            var packageStr = res.prePayReSign.packageStr;
            var paySign = res.prePayReSign.paySign;
            var signType = res.prePayReSign.signType;
            var timeStamp = res.prePayReSign.timeStamp;
            wx.requestPayment({
              timeStamp: timeStamp,
              nonceStr: nonceStr,
              package: packageStr,
              signType: signType,
              paySign: paySign,
              success: function (obj) {
                util.sendRequest("/wechat/applet/user/activate_lsVSldq", {}, "POST", true, function (ldqRes) {
                  console.log(ldqRes)
                  if (ldqRes.hasErrors) {
                    wx.showModal({
                      content: ldqRes.errorMessage,
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                        }
                      }
                    })
                    return false;
                  }
                  if (ldqRes.data == '10004') {
                    wx.showModal({
                      content: '支付失败',
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                        }
                      }
                    })
                    return false
                  }
                  if (ldqRes.data == '10000') {
                    util.sendRequest("/wechat/applet/user/wechat_getsession", {}, "POST", true, function (res) {
                      if (res.hasErrors) {
                        console.log(res.errorMessage);
                        return false;
                      }
                      wx.setStorageSync('userInfo', res)
                    })
                    // 弹窗提示
                    wx.showModal({
                      content: '支付成功',
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                          wx.switchTab({
                            url: '/pages/index/index'
                          })
                        }
                      }
                    })
                  }
                })
              },
            })
          })
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
  onShareAppMessage: util.gdForward
})