// pages/person/improve/improve.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:"",
    OUT_TRADE_NO:"",
    PHONE1:"",
    PHONE2:"",
    banner: util.setStaticUrl("/static/ymplant/img/sye/banner/15.png"),
    single: util.setStaticUrl("/static/ymplant/img/sye/banner/banner-vip.jpg")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.setData({
        user_id:options.user_id,
        id:options.id,
      });
     
  },
  pay:function(e){
    var that = this;
    var a = e.currentTarget.id
    wx.showModal({
      title: '提示',
      content: '本系统付费功能仅供河北考生使用，请确认是否为河北考生？（虚拟商品一经售出概不退换）',
      success: function (res) {
        if (res.confirm) {
          util.sendRequest("/plant/wxrecharge/addUnPayOrder", { TOTAL: a }, "POST", true, function (res) {
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
                util.sendRequest("/wechat/applet/user/activate", { USER_ID: that.data.user_id, OUT_TRADE_NO: OUT_TRADE_NO }, "POST", false, function (obj) {
                  wx.showModal({
                    content: '支付完成',
                    showCancel: false,
                    confirmText: "确定",
                    success: function (res) {
                      if (res.confirm) {
                        wx.navigateBack({
                          delta: 1,
                        })
                      }
                    }
                  })
                });

              },
              fail: function (obj) {
                util.showError("发起支付失败");
              }
            })
          })  
        }
      }
    })
  },
  bindPhone1:function(e){
    this.setData({
      PHONE1:e.detail.value
    })
  },
  bindPhone2:function(e){
    this.setData({
      PHONE2: e.detail.value
    })
  },
  bindSubmit:function(e){
    var that = this;
    var a = e.currentTarget.id;
    console.log(that.data.PHONE1)
    console.log(that.data.PHONE2)
    console.log(that.data.user_id)
    if (that.data.PHONE1 == "" || that.data.PHONE2 == ""){
      util.showError("手机号不能为空！")
    } 
    else{
      wx.showModal({
        title: '提示',
        content: '本系统付费功能仅供河北考生使用，请确认是否为河北考生？（虚拟商品一经售出概不退换）',
        success: function (res) {
          if (res.confirm) {
            util.sendRequest("/plant/wxrecharge/preferentialActivitie_CheckPhone", {PHONE1:that.data.PHONE1,PHONE2:that.data.PHONE2},"POST",true,function(res){
      wx.showModal({
        title: '提示',
        content: res.data,
        success: function (res) {
          if (res.confirm) {
            util.sendRequest("/plant/wxrecharge/addUnPayOrder_ForTwo", { TOTAL: a }, "POST", true, function (res) {
              var OUT_TRADE_NO = res.OUT_TRADE_NO;
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
                  util.sendRequest("/wechat/applet/user/activate_fortwo", { PHONE1: that.data.PHONE1,PHONE2:that.data.PHONE2, OUT_TRADE_NO: OUT_TRADE_NO,USER_ID:that.data.user_id }, "POST", false, function (obj) {
                    wx.showModal({
                      content: '支付完成',
                      showCancel: false,
                      confirmText: "确定",
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateBack({
                            delta: 1,
                          })
                        }
                      }
                    })
                })
                }
            })
          
        });
        }
        },
        fail:function(obj){
          util.showError("发起支付失败");
        }
      })
    })
          }
        }
      })
    }
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