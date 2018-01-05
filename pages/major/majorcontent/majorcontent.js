// pages/major/majorcontent/majorcontent.js
var util=require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id = options.a;
    var name=options.name;
    var parentName = options.parentName;
    console.log(name)
    util.sendRequest("/wechat/applet/major/getmajorbyfatherid", {MAJOR_ID:id},"POST",true,function(res){
      that.setData({
        major:res.data,
        parentName: parentName,
        name:name
      })
    })
  },
  content:function(e){
    var curId = e.currentTarget.dataset.id;
    util.navigateTo("/pages/major/majorcontent/content/content", { a: curId });
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