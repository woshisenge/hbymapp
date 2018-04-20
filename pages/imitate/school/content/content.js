// pages/imitate/school/content/content.js
var util=require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  school:[],
  index:"",
  inputVal:"",
  checked:false,
  id:""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {

    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    var school = that.data.school;
    for (var i = 0; i < school.length; i++) {
      if (school[i].NAME.indexOf(that.data.inputVal) >= 0) {
        school[i].checked = false;
      }
      else {
        school[i].checked = true;
      }
    }

    that.setData({
      school: school
    });
  },
  setSearchStorage:function(){
    var that = this;
    var school = that.data.school;
    school.forEach(function(element){
      element.checked = false;
    })
    that.setData({
      school:school,
      inputVal:"",
      inputShowed:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var schools = "";
    var bschools;
    if(options.schools != ""){
      schools = options.schools.substring(0, options.schools.lastIndexOf(','))
      bschools = schools.split(",");
    }
    util.sendRequest("/wechat/applet/report/getschools", {}, "POST", true, function (res) {
      if (options.index == 0) {
        for (var value in bschools) {
          for (var i = 0; i < res.b1schools.length; i++) {
            if (bschools[value] == res.b1schools[i].SCHOOL_ID) {
              res.b1schools[i].check = true;
            }
          }
        }
        that.setData({
          school: res.b1schools,
          index: options.index,
          id: options.id
        })
      }
      if (options.index == 1) {
        for (var value in bschools) {
          for (var i = 0; i < res.b2schools.length; i++) {
            if (bschools[value] == res.b2schools[i].SCHOOL_ID) {
              res.b2schools[i].check = true;
            }
          }
        }
        that.setData({
          school: res.b2schools,
          index: options.index,
          id:options.id
        })
      }
    })
    
  },
  school:function(e){
    var that = this;
    var curId = e.currentTarget.id;
    var valueStr = "";
    var school = that.data.school;
    school.forEach(function (element) {
      var valurIdStr = curId;
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      if (element.SCHOOL_ID == curId) {
        if (element.SCHOOL_ID == prevPage.data.school_1_id){
          element.check = false;
          prevPage.data.school_1= "请选择学校";
          prevPage.data.school_1_id = "";
          prevPage.setData(prevPage.data);
        }
      
      else if (element.SCHOOL_ID != that.data.id && element.check == true){
        util.showError("院校不能重复！")
      }
      else{
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面
        valueStr = element.NAME;
        prevPage.data.school_1 = valueStr;
        prevPage.data.school_1_id = valurIdStr;
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData(prevPage.data);
          wx.navigateBack({
            delta: 1
          });
      }
      }
    });
    that.setData({
      school:school
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