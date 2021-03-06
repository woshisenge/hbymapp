// pages/video/play/play.js
var util = require("../../../utils/util")
Page({
  
  inputValue: '',
  /**
   * 页面的初始数据
   */
  data: {
    autoplay:false,
    video:"",
    showView: true,
    open:true
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.IMGURL) {
        obj.IMGURL = util.setStaticUrl(obj.IMGURL);
      }
      if (obj.MODIFYTIME) {
        obj.MODIFYTIME = util.formatDate(new Date(obj.MODIFYTIME));
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;

    util.sendRequest_s("/wechat/applet/news/expertvideoplaybyid", { NEWS_ID:id, SUBTITLE: "专家视频" }, "POST", true, function (res) {
			console.log(res)
      for(var i= 0; i<res.data.length;i++) {
				var srcReg = /(src[=]["])(.+)(["]\s{1}type)/gi;
				var src = srcReg.exec(res.data[0].CONTENT);
        var title = res.data[0].TITLE;
        var count = res.data[0].VIEWCOUNT
        that.setData({
          src: util.setStaticUrl(src[2]),
          count:count,
          title:title
        })
      }  
    });
		util.sendRequest("/plant/news/api/details/video", { NEWS_ID: id }, "POST", true, (res) => {
      that.setData({
				video: that.toDto(res.RECOMMEND_VIDEO)
      })
    })
  },
  play:function(e){
		if (e.currentTarget.dataset.free == 1) {
			var userInfo = wx.getStorageSync('userInfo')
			if (!userInfo.VIP) {
				wx.showModal({
					content: '该视频仅限会员观看',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							util.navigateTo("/pages/person/improve/improve", { id: '3', user_id: userInfo.USER_ID })
						}
					}
				})
				return false
			}
		}
    var that = this;
    var id = e.currentTarget.id;
    util.sendRequest_s("/wechat/applet/news/expertvideoplaybyid", { NEWS_ID: id, SUBTITLE: "专家视频" }, "POST", true, function (res) {
      for (var i = 0; i < res.data.length; i++) {
        var article = res.data[0].CONTENT;
        var videoReg = /<video.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = videoReg.exec(article);
        var src = srcReg.exec(arr);
        var title = res.data[0].TITLE;
        var count = res.data[0].VIEWCOUNT;
        var ABSTRACT = res.data[0].ABSTRACT
        that.setData({
          src: util.setStaticUrl(src[1]),
          count: count,
          title: title,
          autoplay:true,
          ABSTRACT: ABSTRACT
        })
      }
    });
  },
  checkMore:function(){
    var that = this;
    that.setData({
      showView: !that.data.showView,
      open:!that.data.open
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
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
  onShareAppMessage: util.gdForward,
})