// pages/analog/analogs/result/content/content.js
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
		data: [],
    results:[],
    subject:"",
    checked:false,
    img:"chong",
    collection:1,
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
		var datause = wx.getStorageSync('datause')
		// console.log(datause)
		datause.SCHOOL_ID = options.SCHOOL_ID
		datause.TYPE = options.TYPE
		if (options.MAJOR == 'null') {
			options.MAJOR = []
		}
		datause.MAJOR = options.MAJOR
		console.log('0', datause)
		util.sendRequest("/wechat/applet/report/report_fitmajor", datause, "POST", true, function (res) {
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			console.log('1', res)
			that.setData({
				data: res.data
			})
			console.log(res.data)
		})
    if(options.img == "chong"){
      that.setData({
        advice:"风险较大，请慎重考虑！"
      })
    }
    if (options.img == "wen") {
      that.setData({
        advice: "风险较小，综合考虑！"
      })
    }
    if (options.img == "bao") {
      that.setData({
        advice: "建议填报，综合考虑！"
      })
    }
    if (options.img == "dian") {
      that.setData({
        advice: "建议参考填报！"
      })
    }
    var arrId = options.ARRANGMENT_ID;
    var style = "";
    if (arrId == "hjj4e5vr0c"){
      style = "本一"
    }
    else{
      style = "本二"
    }
    // if(options.major != null){
    //   options.major = options.major.split(",");
    // }
    // if (options.majorName != null) {
    //   options.majorName = options.majorName.split(",");
    // }
    // var major = options.major;
    // for (var i = 0; i < major.length; i++){
    //   util.sendRequest("/wechat/applet/major/getmajorbyschool", { SCHOOL_ID: options.SCHOOL_ID, MAJOR_ID:major[i]},"POST",true,function(res){
    //     var results = that.data.results;
    //     res.data.forEach(function (element) {
    //       if (element.MINSCORETOTALCOUNT == null) {
    //         element.MINSCORETOTALCOUNT = "---"
    //       }
    //       if (element.MAXSCORETOTALCOUNT == null) {
    //         element.MAXSCORETOTALCOUNT = "---"
    //       }
    //     })
    //     if(res.data.length > 0) {
    //       var mjname = res.data[0].MJNAME;
    //       var mj_id = res.data[0].MAJOR_ID;
    //       var majorObj = {MJNAME: mjname,MAJORID:mj_id, scores: res.data};
    //       results.push(majorObj);
    //     }
    //     that.setData({
    //       results: results
    //     });
    //   })
    // }
    util.sendRequest("/wechat/applet/school/getschoolinfo", { SCHOOL_ID: options.SCHOOL_ID}, "POST", true, function (res) {
      // console.log(res)
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
      result.forEach(function (element) {
        if (element.MinPM == null) {
          element.MinPM = "---"
        }
        if (element.MaxPM == null) {
          element.MaxPM = "---"
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
      school_id:options.SCHOOL_ID,
      arrangment_id: options.ARRANGMENT_ID
    })
  },
  collection:function(e){
    var that = this;
    var param={};
    param.SCHOOL_ID = that.data.school_id;
    param.SCHOOLNAME = that.data.name;
    param.MAJORID = e.currentTarget.id;
    param.PROVINCE = that.data.region;
    param.COLL_TYPE = that.data.img;
    param.MJNAME = e.currentTarget.dataset.id;
    param.ARR = that.data.arrangment_id;
    util.sendRequest("/wechat/applet/report/collection_zntj",param,"POST",false,function(res){
      util.showSuccess()
      var result = that.data.results;
      result.forEach(function (element) {
        if (element.MAJORID == param.MAJORID) {
          element.hidden = true
        }
      })
      that.setData({
        results: result
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

  }
})