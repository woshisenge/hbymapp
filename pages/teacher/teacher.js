// pages/teacher/teacher.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    hidden:true,
    role:"",
    tabs: ["查看问题", "查看专家"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //banner图
    consultation: util.setStaticUrl("/static/ymplant/img/sye/banner/expert_banner.jpg"),
  },

  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = util.setStaticUrl(obj.HEADURL);
      }
      if (obj.CREATETIME) {
        obj.CREATETIME = util.formatDate(new Date(obj.CREATETIME));
      }
    });
    return list;
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res){
      var hidden = that.data.hidden;
      if(res.data == 3){
        hidden = false
      }
      that.setData({
        hidden:hidden,
        role:res.data
      })
    })
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
    //       sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
    //     });
    //   }
    // });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    var that = this;
    var result = that.data.result;
    result.forEach(function (element) {
      element.checked = false;
    })
    that.setData({
      result: result,
      inputVal: "",
      inputShowed: false
    })
  },
  clearInput: function () {
    var that = this;
    var result = that.data.result;
    result.forEach(function (element) {
      element.checked = false;
    })
    that.setData({
      result: result,
      inputVal: "",
      inputShowed: false
    })
  },
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    var result = that.data.result;
    for (var i = 0; i < result.length; i++) {
      if (result[i].CONTENT.indexOf(that.data.inputVal) >= 0) {
        result[i].checked = false;
      }
      else {
        result[i].checked = true;
      }
    }

    that.setData({
      result: result
    });
  },
  // order:function(){
  //   utils.navigateTo("/pages/teacher/content/content")
  // },
  issue:function(e){
    var id = e.currentTarget.id;
     util.navigateTo("/pages/teacher/issue_content/issue_content",{id:id})
  },
  quiz:function(){
      if(this.data.role != 1){
        util.showError("仅有学生身份才能提问！")
      }else{
        util.navigateTo("/pages/teacher/ask/ask")
      }
      
  },
  expertContent:function(e){
    var id = e.currentTarget.id;
    util.navigateTo("/pages/teacher/introduce/introduce",{id:id})
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
    var that = this;
    util.sendRequest("/wechat/applet/expert/api/expert_home", {}, "POST", false, function (res) {
      that.setData({
        result: that.toDto(res.data)
      })
    });
    util.sendRequest("wechat/applet/expert/api/all_experts", {}, "POST", false, function (res) {
      that.setData({
        experts:that.toDto(res.data)
      })
    })
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