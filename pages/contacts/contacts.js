// pages/contacts/contacts.js
var sliderWidth = 96; 
var util=require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["老师", "专家"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    role: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = util.setStaticUrl(obj.HEADURL);
      }
      if (obj.LHEADURL) {
        obj.LHEADURL = util.setStaticUrl(obj.LHEADURL);
      }
      if (obj.TEAHEADURL) {
        obj.TEAHEADURL = util.setStaticUrl(obj.TEAHEADURL);
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    util.sendRequest("/wechat/applet/user/getrole",{},"POST",true,function(role){
      util.sendRequest("/wechat/applet/chat/getcontactors", {}, "POST", true, function (res) {
        console.log(res.students)
        that.setData({
          teacher:that.toDto(res.teachers),
          student: that.toDto(res.students),
          expecter: that.toDto(res.expecters)
        })
      })
      that.setData({
        role: role.data
      });
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
  
  },
  toChat: function(e) {
    var id = e.currentTarget.id;
    util.navigateTo("/pages/chatroom/chatroom", {user_id: id});
  }
})