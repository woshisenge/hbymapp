// pages/teacher/introduce/introduce.js
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    hid:true,
    check:true,
    checked:true
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = utils.setStaticUrl(obj.HEADURL);
      }
      if (obj.CREATETIME) {
        obj.CREATETIME = utils.formatDate(new Date(obj.CREATETIME));
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    utils.sendRequest("/wechat/applet/expert/api/expert_introduct", { USER_ID:options.id},"POST",true,function(res){
      that.setData({
        expert: that.toDto(res.expert),
        successanli: res.successanli
      })
    })
    that.setData({
      id:options.id,
      headurl: options.headurl,
      nickname: options.nickname
    })
  },
  order:function(){
    var that = this;
    var id = that.data.id;
    utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res) {
      if(res.data != 1){
        utils.showError("仅有学生才能预约专家！")
      }
      else{
        utils.navigateTo("/pages/teacher/content/content", { id: id, nickname: that.data.nickname, headurl: that.data.headurl })
      }
    })
  },
  introduceMore:function(){
    var that = this;
    that.setData({
      check:!that.data.check,
      hidden:!that.data.hidden
    })
  },
  successMore: function () {
    var that = this;
    that.setData({
      hid: !that.data.hid,
      checked: !that.data.checked
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