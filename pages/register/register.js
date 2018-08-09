// pages/register/register.js
var util = require('../../utils/util.js');
var codeTimer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeHidden: true,
    timerNumber: 60,
    phone: "",
    countries: ['石家庄', '保定', '张家口']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    sendRequest("/plant/api/toregist_two", { DIC_ID: 'province3' }, "POST", function (res) {
      console.log(res)
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
  bindCountryChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAgreeChange: function(e) {
    var that = this;
    
    if(e.detail.value.length > 0) {
      that.setData({
        isAgree: true
      });
    }
    else{
      that.setData({
        isAgree: false
      });
    }
  },
 
  radioChange:function(e){
    
    var that = this;
    that.setData({
      style: e.detail.value
    })
  }
  ,
  formSubmit: function(e) {
    var that = this;
    
    if(!that.data.isAgree){
      util.showError("未同意遵守服务条款不可注册账号");
      return false;
    }
    var param = e.detail.value;
    
    param.MAJORTYPE = that.data.style;
    
    if(param.USERNAME == ""){
      util.showError("用户名不能为空");
      return false;
    }

    if (param.EXAMSCORE == "") {
      util.showError("预估分数不能为空");
      return false;
    }

    if (param.EXAMSCORE < "200"){
      util.showError("考试分数范围不正确");
      return false;
    }

    if (param.EXAMSCORE > "750") {
      util.showError("考试分数范围不正确");
      return false;
    }


    if (param.PHONE == "") {
      util.showError("手机号不能为空");
      return false;
    }

    if (param.CODE == "") {
      util.showError("验证码不能为空");
      return false;
    }

    if (param.PASSWORD == "") {
      util.showError("密码不能为空");
      return false;
    }

    if (param.REPASSWORD == "") {
      showError("确认密码不能为空");
      return false;
    }

    util.sendRequest("/wechat/applet/api/toregist", param, "POST", true, function(res){


      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },4000)
        }
      })
// wz : 2018-6-4  添加立即注册 注册成功弹框。
      // wx.showToast({
      //   title: '注册成功',
      //   icon: 'success',
      //   duration: 1000
      // });

      // wx.navigateBack({
      //   delta: 1
      // });
    });
  },

  //获取短信验证码
  getSMSCode: function () {
    var that = this;
    if (!that.data.phone || that.data.phone == null || that.data.phone == "") {
      util.showError("手机号码不能为空！");
      return false;
    }
    util.sendRequest("/wechat/applet/user/getsmscode", { PHONE: that.data.phone }, "POST", true, function (res) {
      that.setData({
        codeHidden: !that.data.codeHidden,  
        timerNumber: 60
        
      });

      codeTimer = setInterval(that.codeTimerFn, 1000)
    });


  },
  codeTimerFn: function () {
    var that = this;
    that.setData({
      timerNumber: that.data.timerNumber - 1
    });

    if (that.data.timerNumber == 0) {
      clearInterval(codeTimer);
      codeTimer = null;

      that.setData({
        codeHidden: !that.data.codeHidden
      });
    }
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  }
})