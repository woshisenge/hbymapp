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
    hidden:false,
		schoolId: '',
		typec: '',
		major: [],
    ARRANGMENT_ID:'hjj4e5vr0c',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
		var datause = wx.getStorageSync('datause')
		console.log(2563,options)
		datause.SCHOOL_ID = options.SCHOOL_ID
		datause.TYPE = options.TYPE
		if (options.MAJOR == 'null') {
			options.MAJOR = []
		}
		datause.MAJOR = options.MAJOR
		// console.log('0', datause)
		util.sendRequest("/wechat/applet/report/report_fitmajor", datause, "POST", true, function (res) {
			if (res.hasErrors) {
				console.log(res.errorMessage);
				return false;
			}
			// console.log(8362, res)
			that.setData({
				data: res.data,
				schoolId: datause.SCHOOL_ID,
				typec: datause.TYPE,
				datause: datause
			})
			// console.log(res.data)
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
    var arrId = options.ARRANGMENT_ID;
    var style = "";
    if (arrId == 'bdhsl11qtb') {
      this.setData({
        ARRANGMENT_ID: arrId
      })
    }
    if (arrId == "hjj4e5vr0c"){
      style = "本一"
    }
    else{
      style = "本二"
    }
    util.sendRequest("/wechat/applet/school/getschoolinfo", { SCHOOL_ID: options.SCHOOL_ID}, "POST", true, function (res) {
      console.log('aaaa:',res)
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
      console.log("ccc",res)
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
	addSchool: function () {
    var that = this;
    console.log(this.data.ARRANGMENT_ID)
		util.sendRequest("/wechat/applet/report/checkcollection", {}, "POST", true, (res) => {
      console.log("gaoda:",res)
			if (res.hasErrors) {
				console.log(res)
				return false
			}
      console.log(591, this.data.ARRANGMENT_ID)
      if (this.data.ARRANGMENT_ID =='hjj4e5vr0c') {
        if (res.B1.C.length + res.B1.W.length + res.B1.B.length >= 20) {
          wx.showModal({
            content: '您最多收藏20个院校',
            showCancel: false,
            success: function (res) { }
          })
          return false
        }
        for (var i = 0; i < res.B1.C.length; i++) {
          res.B1.C[i].type = 'C'
        }
        for (var i = 0; i < res.B1.W.length; i++) {
          res.B1.W[i].type = 'W'
        }
        for (var i = 0; i < res.B1.B.length; i++) {
          res.B1.B[i].type = 'B'
        }
        var arr = res.B1.C.concat(res.B1.W, res.B1.B)
        for (var i = 0; i < arr.length; i++) {
          var it = arr[i]
          console.log(this.data.typec)
          if (this.data.schoolId == it.SCHOOL_ID && this.data.typec == it.type) {
            console.log(it.type)
            wx.showModal({
              content: '您已收藏过本院校',
              showCancel: false,
              success: function (res) { }
            })
            return false
          }
        }
      } else if (this.data.ARRANGMENT_ID == 'bdhsl11qtb'){
        if (res.B2.C.length + res.B2.W.length + res.B2.B.length >= 20) {
          wx.showModal({
            content: '您最多收藏20个本科二批院校',
            showCancel: false,
            success: function (res) { }
          })
          return false
        }
        for (var i = 0; i < res.B2.C.length; i++) {
          res.B2.C[i].type = 'C'
        }
        for (var i = 0; i < res.B2.W.length; i++) {
          res.B2.W[i].type = 'W'
        }
        for (var i = 0; i < res.B2.B.length; i++) {
          res.B2.B[i].type = 'B'
        }
        var arr = res.B2.C.concat(res.B2.W, res.B2.B)
        for (var i = 0; i < arr.length; i++) {
          var it = arr[i]
          console.log(this.data.typec)
          if (this.data.schoolId == it.SCHOOL_ID && this.data.typec == it.type) {
            console.log(it.type)
            wx.showModal({
              content: '您已收藏过本院校',
              showCancel: false,
              success: function (res) { }
            })
            return false
          }
        }
      }
			if (!this.data.datause.ARRANGMENT_ID) {
				return false
			}
			var data = {
				ARRANGMENT_ID: this.data.datause.ARRANGMENT_ID,
				CHANGESCORE: this.data.datause.CHANGESCORE,
				EXAMSCORE: this.data.datause.EXAMSCORE,
				MAJORTYPE_ID: this.data.datause.MAJORTYPE_ID,
				PROVINCE_NAME: this.data.region,
				REPORT_TYPE: this.data.typec,
				SCHOOLNAME: this.data.name,
				SCHOOL_ID: this.data.schoolId,
				MAJOR_NAME: [],
				MAJOR_ID: [],
			}
			var params = this.data.datause
			util.sendRequest("/wechat/applet/report/report_fitmajor", params, "POST", true, (res) => {
				if (res.hasErrors) {
					console.log(res.errorMessage);
					return false;
				}
				for (it of res.data) {
					data.MAJOR_NAME.push(it.MAJORNAME)
					data.MAJOR_ID.push(it.MAJOR_ID)
				}
				util.sendRequest("/wechat/applet/report/onekeyreport_collect", data, "POST", true, (res) => {
					if (res.hasErrors) {
						console.log(res.errorMessage);
						return false;
					}
					wx.showModal({
						content: '收藏成功',
						showCancel: false,
						success: function (res) { }
					})
					return false
				})
			})
		})
	},
  collection:function (e) {
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