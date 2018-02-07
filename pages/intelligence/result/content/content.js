// pages/analog/analogs/result/content/content.js
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results:[],
    subject:"",
    checked:false,
    img:"chong",
    advice:"极大"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arrId = options.ARRANGMENT_ID;
    var style = "";
    if (arrId == "hjj4e5vr0c"){
      style = "本一"
    } 
    else{
      style = "本二"
    }
    if(options.major != null){
      options.major = options.major.split(",");
    }
    if (options.majorName != null) {
      options.majorName = options.majorName.split(",");
    }
    var major = options.major;
    for (var i = 0; i < major.length; i++){
      util.sendRequest("/wechat/applet/major/getmajorbyschool", { SCHOOL_ID: options.SCHOOL_ID, MAJOR_ID:major[i]},"POST",true,function(res){
        console.log(res)
        var results = that.data.results;
        res.data.forEach(function (element) {
          if (element.MINSCORETOTALCOUNT == null) {
            element.MINSCORETOTALCOUNT = ""
          }
          if (element.MAXSCORETOTALCOUNT == null) {
            element.MAXSCORETOTALCOUNT = ""
          }
        })
        if(res.data.length > 0) {
          var mjname = res.data[0].MJNAME;
          var majorObj = {MJNAME: mjname, scores: res.data};
          results.push(majorObj);
        }
        that.setData({
          results: results
        });
      })
    }
    util.sendRequest("/wechat/applet/school/getschoolinfo", { SCHOOL_ID: options.SCHOOL_ID}, "POST", true, function (res) {
      that.setData({
        logo: util.setStaticUrl(res.HEADURL),
        name:res.NAME,
        types: res.SCTYPE_VALUE,
        region: res.PROVINCE_VALUE,
        properties: res.properties,
        subjecttypes: res.subjecttypes
      });
    });
    util.sendRequest("/wechat/applet/school/getschoolscore", { SCHOOL_ID: options.SCHOOL_ID, MAJORTYPE_ID: options.MAJORTYPE},"POST",true,function(res){
      var result = res.data;
      result.forEach(function(obj){
        if (obj.ARRANGMENT_ID == arrId){
          obj.checked = false;
        }
        else{
          obj.checked = true;
        }
      })
       that.setData({
         grade: result
       })
    });
    that.setData({
      subject: options.MAJORTYPE_VALUE,
      style : style,
      img:options.img,
      advice:options.advice
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