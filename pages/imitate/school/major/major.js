// pages/imitate/school/major/major.js
var util=require("../../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    checked:false,
    param:{},
		major: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// for (var i = 1; i <= 6; i++) {
		// 	console.log(options.tempArr)
		// }
    var that = this;
		var arrId = ''
		if (options.index == 0) {
			arrId = 'hjj4e5vr0c'
		} else if (options.index == 1) {
			arrId = 'bdhsl11qtb'
		}
		var data = {
			SCHOOL_ID: options.schoolId,
			ARRANGMENT_ID: arrId,
			REPORT_TYPE: options.schoolType
		}
		// console.log(data)
		util.sendRequest("/wechat/applet/report/getcollection_majors", data, "POST", true, (res) => {
			if (res.hasErrors) {
				console.log(res.errorMessage)
				return false;
			}
			// console.log(res)
			var major = res.data
			var temp = options.tempArr.split(',')
			console.log(major)
			for (var i = 0; i < major.length; i++) {
				for (var j = 0; j < temp.length; j++ ) {
					if (major[i].MAJOR_ID == temp[j]) {
						major[i].checked = true
					}
				}
			}
			this.setData({
				major: major,
				majorIndex: options.majorIndex
			})
		})
		return false
    that.setData({
      id:options.id,
    })
   var index = options.index;
   var arrId="";
   if(index == 0){
     arrId = "hjj4e5vr0c"
   }
   else{
     arrId = "bdhsl11qtb"
   }
	 util.sendRequest("/wechat/applet/report/getcollection_majors", { SCHOOL_ID: options.school_id, ARRANGMENT_ID: arrId}, "POST", true, function (res) {
      var results = res.majors;
      for (var value in options) {
        for (var i = 0; i < results.length;i++){
          if (options[value] == results[i].DIC_ID){
            results[i].checked= true;
          }
        }
      }
      that.setData({
        major: results
      })
    })
  },
	selMajor: function (e) {
		var curId = e.currentTarget.id
		this.data.major.forEach(item => {
			if (item.MAJOR_ID == curId) {
				// console.log(item)
				var majorIndex = this.data.majorIndex
				var pages = getCurrentPages()
				var prevPage = pages[pages.length - 2]
				prevPage.data[majorIndex + '_name'] = item.MAJORNAME
				prevPage.data[majorIndex + '_id'] = item.MAJOR_ID
				prevPage.setData(prevPage.data)
				wx.navigateBack({
					delta: 1
				})
			}
		})
	},
  major:function(e){
    var that = this;
    var curId = e.currentTarget.id;
    var id = that.data.id
    var major = that.data.major
    var valueStr = "";
    
    major.forEach(function (element) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
     if (element.DIC_ID == curId) {
       if (element.DIC_ID == prevPage.data[id+"_id"]) {
         element.checked = false;
         prevPage.data[id + "_name"] = "请选择专业";
         prevPage.data[id + "_id"] = "";
         prevPage.setData(prevPage.data);
       }
       else if (element.DIC_ID != prevPage.data[id + "_id"] && element.checked == true){
         util.showError("专业不能重复！")
       }
       else {
        valueStr = element.NAME;
        element.checked = true;
        var valurIdStr = curId;
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面

        prevPage.data[id + "_name"] = valueStr;
        prevPage.data[id + "_id"] = valurIdStr;
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData(prevPage.data);
          wx.navigateBack({
            delta: 1
          });
      }
     }
    });
    that.setData({
      major: major
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