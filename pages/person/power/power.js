// pages/person/power/power.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { src: '/images/quanxian01.png', title: '模拟填报', url: "/pages/imitate/imitate" },
      { src: '/images/quanxian02.png', title: '智能推荐',url:"/pages/intelligence/intelligence" },
      { src: '/images/quanxian03.png', title: '院校咨询',url:"/pages/consult/consult" },
      { src: '/images/quanxian4.png', title: '专家咨询', url:""},
      { src: '/images/quanxian6.png', title: '性格测试', url: "" }, 
      { src: '/images/quanxian7.png', title: '名师大讲堂', url: "" },
    ],
    vipname: "普通会员",
    checked:false,
    vip:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },
  power:function(e){
    var that = this;
    var grid = that.data.grids;
    var url = e.currentTarget.id;
    if (url != ""){
      util.navigateTo(url)
    }
    else{
      util.showError("您暂无权限使用该功能！")
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that =this;
    util.sendRequest("/wechat/applet/user/getbelongitems", {}, "POST", true, function (res) {
      var vip = that.data.vip;
      var grid = that.data.grids;
      for (var i = 0; i < grid.length; i++) {
        if (res.mntbk == 0 && vip != "UC") {
          grid[0].src = "/images/quanxian1.png";
          grid[0].url = ""
        }
        if (res.zntjk == 0 && vip != "UC") {
          grid[1].src = "/images/quanxian.png";
          grid[1].url = ""
        }
        if (res.yxzxk == 0 && vip != "UC") {
          grid[2].src = "/images/quanxian3.png";
          grid[2].url = ""
        }
      }
      that.setData({
        grids: grid
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    util.sendRequest("/wechat/applet/user/getvip", {}, "POST", false, function (obj) {
      console.log(obj)
    if (obj.data == "UA") {
      that.setData({
        vipname: "白银会员",
        checked: false
      })
    }
    else if (obj.data == "UB") {
      that.setData({
        vipname: "黄金会员",
        checked: false
      })
    }
    else if (obj.data == "UC") {
      that.setData({
        vipname: "黑钻会员",
        checked: true
      })
    }
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
  pay:function(e){
    var vipname = e.currentTarget.id;
    util.navigateTo("/pages/person/member/member",{vipname:vipname})
  },
  formSubmitForReg: function(e) {
    util.sendRequest("/wechat/applet/user/vip", e.detail.value, "POST", true, function(res){
      util.showSuccess();
      wx.navigateBack({
        delta: 1
      })
    });
  }
})