// pages/person/goods/payment/payment.js
var util=require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      grid: [{ title: '10', money: '100' },
              { title: '50', money: '500' },
              { title: '100', money: '1000' },
              { title: '200', money: '2000' },
              { title: '500', money: '5000' },
              { title: '1000', money: '10000' },],
      grid2: [{ title: '1', money: '5' },
              { title: '5', money: '25' },
              { title: '10', money: '50' },
              { title: '20', money: '100' },
              { title: '50', money: '250' },
              { title: '100', money: '500' },],
      nonceStr:"",
      packageStr:"",
      paySign:"",
      signType:"",
      timeStamp:"",
      id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.setData({
        id:options.id
      })
      // console.log(that.data.id)
  },
  payment:function(e){
    var that=this;
    var a=e.currentTarget.id
    util.sendRequest("/plant/wxrecharge/addUnPayOrder", { TOTAL:a},"POST",true,function(res){
      console.log(res)
        var nonceStr = res.data.nonceStr;
        var packageStr = res.data.packageStr;
        var paySign = res.data.paySign;
        var signType = res.data.signType;
        var timeStamp = res.data.timeStamp;
        wx.requestPayment({
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: packageStr,
          signType: signType,
          paySign: paySign,
          success: function (obj) {
            util.showSuccess();
          },
          fail: function (obj) {
            util.showError("发起支付失败");
          }
        })
    })
    
  },
  payment1:function(e){
    var a = e.currentTarget.id;
    var id = e.currentTarget.dataset.id;
    util.sendRequest("/wechat/applet/user/buycard", { count:a,itemType:id,price:"-5" }, "POST", true, function (res) {
      console.log(res)
        util.showSuccess()
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