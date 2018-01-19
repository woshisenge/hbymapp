 // pages/major/major.js
var util=require("../../utils/util")
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    tabs: ["本科", "专科"],
    activeIndex: 0,
    checked:false,
    major:[],
    zmajor:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    util.sendRequest("/wechat/applet/major/getmajorlibrary", { CODE:"BMAJOR"},"POST",true,function(res){
      that.setData({
        major:res.data
      })
    })
    util.sendRequest("/wechat/applet/major/getmajorlibrary", { CODE: "ZMAJOR" }, "POST", true, function (res) {
      that.setData({
        zmajor: res.data
      })
    })
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
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
  show: function (e) {
    var that = this;
    var curId = e.currentTarget.dataset.id;
    var results = that.data.major;
    results.forEach(function (element) {
      if (element.DIC_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      major: results
    })
  },
  zshow: function (e) {
    var that = this;
    var curId = e.currentTarget.dataset.id;
    var results = that.data.zmajor;
    results.forEach(function (element) {
      if (element.DIC_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      zmajor: results
    })
  },
  toDetails: function (e) {
    var that = this
    var curId = e.currentTarget.id;
    var name = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.name;
    var parentName = that.data.major[index].NAME;
    util.navigateTo("/pages/major/majorcontent/majorcontent", { a: curId, name: name, parentName: parentName});
  },
  toDetail: function (e) {
    var that=this;
    var curId = e.currentTarget.id;
    var name = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.name;
    var parentName = that.data.zmajor[index].NAME;
    util.navigateTo("/pages/major/majorcontent/majorcontent", { a: curId, name: name, parentName: parentName });
  }
})