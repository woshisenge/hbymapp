// pages/teacher/issue_content/issue_content.js
var utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true
  },
  introduce:function(e){
    var id = e.currentTarget.id;
    utils.navigateTo("/pages/teacher/introduce/introduce",{id:id})
  },
  answer:function(){
    utils.navigateTo("/pages/teacher/answer/answer",{id:this.data.id})
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
    utils.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res) {
      var hidden = that.data.hidden;
      if (res.data == 3) {
        hidden = false
      }
      that.setData({
        hidden: hidden
      })
    })
    utils.sendRequest("/wechat/applet/expert/api/forumbyid",{ASK_ID:options.id},"POST",false,function(res){
      that.setData({
        ask:that.toDto(res.ask),
        answer:that.toDto(res.answers)
      })
    })
    that.setData({
      id:options.id,
      options:options
    })
  },
  answerDelete:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var options = that.data.options;
    wx.showModal({
      title: '提示',
      content: '确认是否删除？',
      success: function (res) {
        if (res.confirm) {
          utils.sendRequest("wechat/applet/expert/api/del_answer", { ANSWER_ID: id }, "POST", false, function (res) {
            if (res.data == "删除成功") {
              utils.showSuccess();
              that.onShow()
            }
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
     this.onLoad(this.data.options)
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