// pages/person/collect/collect.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    b1: false,
    b2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;

		util.sendRequest("/wechat/applet/report/getonekey_collection", {}, "POST", true, (res) => {
			if (res.hasErrors) {
				console.log(res.errorMessage);
				if (res.errorMessage == 'relogin') {
					wx.showModal({
						content: '请重新登录',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								wx.redirectTo({
									url: '/pages/login/login'
								})
							}
						}
					})
					return false
				}
				return false
			}
			for (var i = 0; i < res.data[0].RESULT_C.length; i++) {
				var cwb = res.data[0].RESULT_C[i]
				if (cwb.ARRANGMENT_ID == "hjj4e5vr0c") {
					this.setData({
						b1: true
					})
				}
				if (cwb.ARRANGMENT_ID == "bdhsl11qtb") {
					this.setData({
						b2: true
					})
				}
			}
			for (var i = 0; i < res.data[0].RESULT_W.length; i++) {
				var cwb = res.data[0].RESULT_W[i]
				if (cwb.ARRANGMENT_ID == "hjj4e5vr0c") {
					this.setData({
						b1: true
					})
				}
				if (cwb.ARRANGMENT_ID == "bdhsl11qtb") {
					this.setData({
						b2: true
					})
				}
			}
			for (var i = 0; i < res.data[0].RESULT_B.length; i++) {
				var cwb = res.data[0].RESULT_B[i]
				if (cwb.ARRANGMENT_ID == "hjj4e5vr0c") {
					this.setData({
						b1: true
					})
				}
				if (cwb.ARRANGMENT_ID == "bdhsl11qtb") {
					this.setData({
						b2: true
					})
				}
			}
			console.log(this.data.b1, this.data.b2)
			this.setData({
				listchong: res.data[0].RESULT_C,
				listwen: res.data[0].RESULT_W,
				listbao: res.data[0].RESULT_B
			})
		})
		return false
    util.sendRequest("/wechat/applet/report/wxgetcollection_zn",{},"POST",true,function(res){
      for(var i = 0; i < res.data.length; i++){
        var listchong = res.data[0];
        var listwen = res.data[1];
        var listbao = res.data[2];
        var listdian = res.data[3];
      }
      var results = [];
      res.data.forEach(function(element){
        element.forEach(function(obj){
          results.push(obj)
        })
      })
      that.setData({
        results:results,
        listchong: that.toDto(listchong),
        listwen:that.toDto(listwen),
        listbao:that.toDto(listbao),
        listdian:that.toDto(listdian)
      })
    });

    util.sendRequest("/wechat/applet/report/wxgetcollection_mn",{},"POST",true,function(res){
      var result = res.data
      for(var i = 0; i < result.length; i++){
        if(i % 4 == 0){
          result[i].style = "Bgcolor1"
        }
        if (i % 4 == 1) {
          result[i].style = "Bgcolor2"
        }
        if (i % 4 == 2) {
          result[i].style = "Bgcolor3"
        }
        if (i % 4 == 3) {
          result[i].style = "Bgcolor4"
        }

      }
      that.setData({
        result:that.toDto(result)
      })
    })
  },
	addB1: function (e) {
		wx.setStorageSync('thisMajors', e.target.dataset.item)
		wx.navigateTo({
			url: "/pages/person/collect/lists/lists"
		})
	},
	addB2: function (e) {
		wx.setStorageSync('thisMajors', e.target.dataset.item)
		wx.navigateTo({
			url: "/pages/person/collect/lists/lists"
		})
	},
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.COLLECTION_DATE) {
        obj.COLLECTION_DATE = util.formatDate(new Date(obj.COLLECTION_DATE));
      }
    });
    return list;
  },
  // b1
  showMn:function(e){
    var that= this;
    var result = that.data.result;
    var curId = e.currentTarget.id
    result.forEach(function (element) {
      if (element.MNCOLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      result: result
    })
  },
  deleteMn:function(e){
    var that = this;
    var id = e.currentTarget.id; 
    wx.showModal({
      title: '提示',
      content: '是否确定删除？',
      success: function (res) {
        if (res.confirm) {
          util.sendRequest("/wechat/applet/report/delet_mntbcollection", { MNCOLL_ID: id }, "POST", true, function (res) {
            util.showSuccess();
            var options = {};
            options.id = that.data.id;
            that.onLoad(options)
          })
        }
      }
    })
  },
  showChong:function(e){
    var that = this;
    var result = that.data.listchong;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listchong: result
    })
  },
  showWen:function(e){
    var that = this;
    var result = that.data.listwen;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listwen: result
    })
  },
  showBao: function (e) {
    var that = this;
    var result = that.data.listbao;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listbao: result
    })
  },
  showDian: function (e) {
    var that = this;
    var result = that.data.listdian;
    var curId = e.currentTarget.id;
    result.forEach(function (element) {
      if (element.COLL_ID == curId) {
        if (element.checked)
          element.checked = false;
        else
          element.checked = true;
      }
    });
    that.setData({
      listdian: result
    })
  },
  delet:function(e){
    var that =this;
    var id = e.currentTarget.id;
    wx.showModal({
      title: '提示',
      content: '是否确定删除？',
      success: function (res) {
        if (res.confirm) {
          util.sendRequest("/wechat/applet/report/delet_zntjcollection", { COLL_ID: id }, "POST", false, function (res) {
            util.showSuccess();
            var options = {};
            options.id = that.data.id;
            that.onLoad(options)
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
  onShareAppMessage: util.gdForward,

	  data: {
		x: 0,
		y: 0
	},
	tap: function (e) {
		var x = this.data.x + 30
		this.setData({
			x: x,
			y: 30
		});
	},
})