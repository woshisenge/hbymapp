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
    city: [],
    thisCity: { DIC_ID: '', NAME: '清选择城市' },
    county: [],
    thisCounty: { DIC_ID: '', NAME: '清选择区域' },
    school: [],
    thisSchool: { DIC_ID: '', NAME: '清选择学校' },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.sendRequest("/wechat/applet/api/toregist_two", { DIC_ID: 'province3' }, "POST", true, function (res) {
      // console.log(res)
      that.setData({
        city: res.datas
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
  
  },
  bindCountryChange1: function (e) {
    var that = this
    this.setData({
      thisCity: { DIC_ID: this.data.city[e.detail.value].DIC_ID, NAME: this.data.city[e.detail.value].NAME}
    })
    var data = {
      DIC_ID: this.data.city[e.detail.value].DIC_ID
    }
    util.sendRequest("/wechat/applet/api/toregist_two", data, "POST", true, function (res) {
      if (res.hasErrors) {
        console.log(res.errorMessage);
        return false;
      }
      that.setData({
        county: res.datas
      })
      // console.log(that.data.county)
    })
  },
  bindCountryChange2: function (e) {
    var that = this
    that.setData({
      thisCounty: { DIC_ID: this.data.county[e.detail.value].DIC_ID, NAME: this.data.county[e.detail.value].NAME }
    })
    var data = {
      DIC_ID: that.data.county[e.detail.value].DIC_ID
    }
    util.sendRequest("/wechat/applet/api/toregist_two", data, "POST", true, function (res) {
      if (res.hasErrors) {
        console.log(res.errorMessage);
        return false;
      }
      that.setData({
        school: res.datas
      })
      // console.log(that.data.school)
    })
  },
  bindCountryChange3: function (e) {
    var that = this
    that.setData({
      thisSchool: { DIC_ID: this.data.school[e.detail.value].DIC_ID, NAME: this.data.school[e.detail.value].NAME }
    })
    var data = {
      DIC_ID: that.data.school[e.detail.value].DIC_ID
    }
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
    param.CITY = that.data.thisCity.DIC_ID
    param.COUNTY = that.data.thisCounty.DIC_ID
    param.SCHOOL_BELONG = that.data.thisSchool.DIC_ID
    param.SCHOOL_NAME = that.data.thisSchool.NAME
    console.log(param)
    util.sendRequest("/wechat/applet/api/toregist_third", param, "POST", true, function(res){
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

  getCity: function () {
    var that = this
    // var _city = this.city[1].NAME
    // console.log(this.data.city)
    
    // console.log(that.data.c)
  },

  //获取短信验证码
  getSMSCode: function () {
    var that = this;
    if (!that.data.phone || that.data.phone == null || that.data.phone == "") {
      util.showError("手机号码不能为空！");
      return false;
    }
    var data = {
      PHONE: that.data.phone
    }
    util.sendRequest("/wechat/applet/user/getsmscode", data, "POST", true, function (res) {
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