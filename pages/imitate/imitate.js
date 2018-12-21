var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util')
Page({
  data: {
		list1_1: [],
		list2_1: [],
    list1_2: [],
    list2_2: [],
    tabs: ["本一志愿表", "本二志愿表"],
		b1school_name: '',
		activeIndex: 0,
		school_b1_nameA: '请选择',
		school_b1_nameB: '请选择',
		school_b1_nameC: '请选择',
		school_b1_nameD: '请选择',
		school_b1_nameE: '请选择',
		school_b2_nameA: '请选择',
		school_b2_nameB: '请选择',
		school_b2_nameC: '请选择',
		school_b2_nameD: '请选择',
		school_b2_nameE: '请选择',
		school_b2_nameF: '请选择',
		school_b2_nameG: '请选择',
		school_b2_nameH: '请选择',
		school_b2_nameI: '请选择',
		school_b2_nameJ: '请选择',
		ARRANGMENT_ID: '',
		SCHOOLNAME: [],
		SCHOOLS_ID: [],
		MJA_NAME: [],
		MJA_ID: [],
		MJB_NAME: [],
		MJB_ID: [],
		MJC_NAME: [],
		MJC_ID: [],
		MJD_NAME: [],
		MJD_ID: [],
		MJE_NAME: [],
		MJE_ID: [],
		MJF_NAME: [],
		MJF_ID: [],
		MJG_NAME: [],
		MJG_ID: [],
		MJH_NAME: [],
		MJH_ID: [],
		MJI_NAME: [],
		MJI_ID: [],
		MJJ_NAME: [],
		MJJ_ID: [],
    //banner图
    consultation: util.setStaticUrl("/static/ymplant/ldq-img/wx_zyb.jpg"),
  },
  onLoad: function () {
    util.ldqCheckLogin()
    var userInfo = wx.getStorageSync('userInfo')
		util.sendRequest("/wechat/applet/report/getvolunteer", {}, "POST", true, (res) => {
      console.log("gaoda:",res)
			if (res.hasErrors) {
				console.log(res.errorMessage)
				return false
			}
			var list1_1 = []
			var list2_1 = []
      var list1_2 = []
      var list2_2 = []
			// 数据不合适, 写if过滤一下
      if (res.data[0].VOLUNTEER_B1_1.length != 0) {
				res.data[0].VOLUNTEER_B1_1.forEach(school => {
					var arr = {
						SCHOOLNAME: school.SCHOOLNAME,
						SCHOOL_ID: school.SCHOOL_ID,
						USER_ID: school.USER_ID,
						VOLUNTEER_ID: school.VOLUNTEER_ID,
						ZY_CODE: school.ZY_CODE,
						MAJORS: [],
            EXAMSCORE: school.EXAMSCORE,
            CREATETIME: school.CREATETIME,
					}
					if (school.MJ_NAME1 && school.MJ_ID1) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID1, MAJOR_NAME: school.MJ_NAME1
						})
					}
					if (school.MJ_NAME2 && school.MJ_ID2) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID2, MAJOR_NAME: school.MJ_NAME2
						})
					}
					if (school.MJ_NAME3 && school.MJ_ID3) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID3, MAJOR_NAME: school.MJ_NAME3
						})
					}
					if (school.MJ_NAME4 && school.MJ_ID4) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID4, MAJOR_NAME: school.MJ_NAME4
						})
					}
					if (school.MJ_NAME5 && school.MJ_ID5) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID5, MAJOR_NAME: school.MJ_NAME5
						})
					}
					if (school.MJ_NAME6 && school.MJ_ID6) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID6, MAJOR_NAME: school.MJ_NAME6
						})
					}
          arr.CREATETIME = new Date(arr.CREATETIME);
          arr.year = arr.CREATETIME.getFullYear();
          arr.month = arr.CREATETIME.getMonth() + 1;
          arr.date = arr.CREATETIME.getDate();
          arr.hours = arr.CREATETIME.getHours()
          if (arr.CREATETIME.getHours() < 10) {
            arr.hours = '0' + arr.CREATETIME.getHours()
          }
          arr.minutes = arr.CREATETIME.getMinutes()
          if (arr.CREATETIME.getMinutes() < 10) {
            arr.minutes = '0' + arr.CREATETIME.getMinutes()
          }
					list1_1.push(arr)
				})
				this.setData({
					list1_1: list1_1
				})
			}
      if (res.data[0].VOLUNTEER_B1_2.length != 0) {
        res.data[0].VOLUNTEER_B1_2.forEach(school => {
          var arr = {
            SCHOOLNAME: school.SCHOOLNAME,
            SCHOOL_ID: school.SCHOOL_ID,
            USER_ID: school.USER_ID,
            VOLUNTEER_ID: school.VOLUNTEER_ID,
            ZY_CODE: school.ZY_CODE,
            EXAMSCORE: school.EXAMSCORE,
            CREATETIME: school.CREATETIME,
            MAJORS: []
          }
          if (school.MJ_NAME1 && school.MJ_ID1) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID1, MAJOR_NAME: school.MJ_NAME1
            })
          }
          if (school.MJ_NAME2 && school.MJ_ID2) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID2, MAJOR_NAME: school.MJ_NAME2
            })
          }
          if (school.MJ_NAME3 && school.MJ_ID3) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID3, MAJOR_NAME: school.MJ_NAME3
            })
          }
          if (school.MJ_NAME4 && school.MJ_ID4) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID4, MAJOR_NAME: school.MJ_NAME4
            })
          }
          if (school.MJ_NAME5 && school.MJ_ID5) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID5, MAJOR_NAME: school.MJ_NAME5
            })
          }
          if (school.MJ_NAME6 && school.MJ_ID6) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID6, MAJOR_NAME: school.MJ_NAME6
            })
          }
          arr.CREATETIME = new Date(arr.CREATETIME);
          arr.year = arr.CREATETIME.getFullYear();
          arr.month = arr.CREATETIME.getMonth() + 1;
          arr.date = arr.CREATETIME.getDate();
          arr.hours = arr.CREATETIME.getHours()
          if (arr.CREATETIME.getHours() < 10) {
            arr.hours = '0' + arr.CREATETIME.getHours()
          }
          arr.minutes = arr.CREATETIME.getMinutes()
          if (arr.CREATETIME.getMinutes() < 10) {
            arr.minutes = '0' + arr.CREATETIME.getMinutes()
          }
          list1_2.push(arr)
        })
        this.setData({
          list1_2: list1_2
        })
      }
      if (res.data[0].VOLUNTEER_B2_1.length != 0) {
        res.data[0].VOLUNTEER_B2_1.forEach(school => {
					var arr = {
						SCHOOLNAME: school.SCHOOLNAME,
						SCHOOL_ID: school.SCHOOL_ID,
						USER_ID: school.USER_ID,
						VOLUNTEER_ID: school.VOLUNTEER_ID,
						ZY_CODE: school.ZY_CODE,
            EXAMSCORE: school.EXAMSCORE,
            CREATETIME: school.CREATETIME,
						MAJORS: []
					}
					if (school.MJ_NAME1 && school.MJ_ID1) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID1, MAJOR_NAME: school.MJ_NAME1
						})
					}
					if (school.MJ_NAME2 && school.MJ_ID2) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID2, MAJOR_NAME: school.MJ_NAME2
						})
					}
					if (school.MJ_NAME3 && school.MJ_ID3) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID3, MAJOR_NAME: school.MJ_NAME3
						})
					}
					if (school.MJ_NAME4 && school.MJ_ID4) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID4, MAJOR_NAME: school.MJ_NAME4
						})
					}
					if (school.MJ_NAME5 && school.MJ_ID5) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID5, MAJOR_NAME: school.MJ_NAME5
						})
					}
					if (school.MJ_NAME6 && school.MJ_ID6) {
						arr.MAJORS.push({
							MAJOR_ID: school.MJ_ID6, MAJOR_NAME: school.MJ_NAME6
						})
					}
          arr.CREATETIME = new Date(arr.CREATETIME);
          arr.year = arr.CREATETIME.getFullYear();
          arr.month = arr.CREATETIME.getMonth() + 1;
          arr.date = arr.CREATETIME.getDate();
          arr.hours = arr.CREATETIME.getHours()
          if (arr.CREATETIME.getHours() < 10) {
            arr.hours = '0' + arr.CREATETIME.getHours()
          }
          arr.minutes = arr.CREATETIME.getMinutes()
          if (arr.CREATETIME.getMinutes() < 10) {
            arr.minutes = '0' + arr.CREATETIME.getMinutes()
          }
          list2_1.push(arr)
				})
				this.setData({
          list2_1: list2_1
				})
			}
      if (res.data[0].VOLUNTEER_B2_2.length != 0) {
        res.data[0].VOLUNTEER_B2_2.forEach(school => {
          var arr = {
            SCHOOLNAME: school.SCHOOLNAME,
            SCHOOL_ID: school.SCHOOL_ID,
            USER_ID: school.USER_ID,
            VOLUNTEER_ID: school.VOLUNTEER_ID,
            ZY_CODE: school.ZY_CODE,
            EXAMSCORE: school.EXAMSCORE,
            CREATETIME: school.CREATETIME,
            MAJORS: []
          }
          if (school.MJ_NAME1 && school.MJ_ID1) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID1, MAJOR_NAME: school.MJ_NAME1
            })
          }
          if (school.MJ_NAME2 && school.MJ_ID2) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID2, MAJOR_NAME: school.MJ_NAME2
            })
          }
          if (school.MJ_NAME3 && school.MJ_ID3) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID3, MAJOR_NAME: school.MJ_NAME3
            })
          }
          if (school.MJ_NAME4 && school.MJ_ID4) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID4, MAJOR_NAME: school.MJ_NAME4
            })
          }
          if (school.MJ_NAME5 && school.MJ_ID5) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID5, MAJOR_NAME: school.MJ_NAME5
            })
          }
          if (school.MJ_NAME6 && school.MJ_ID6) {
            arr.MAJORS.push({
              MAJOR_ID: school.MJ_ID6, MAJOR_NAME: school.MJ_NAME6
            })
          }
          arr.CREATETIME = new Date(arr.CREATETIME);
          arr.year = arr.CREATETIME.getFullYear();
          arr.month = arr.CREATETIME.getMonth() + 1;
          arr.date = arr.CREATETIME.getDate();
          arr.hours = arr.CREATETIME.getHours()
          if (arr.CREATETIME.getHours() < 10) {
            arr.hours = '0' + arr.CREATETIME.getHours()
          }
          arr.minutes = arr.CREATETIME.getMinutes()
          if (arr.CREATETIME.getMinutes() < 10) {
            arr.minutes = '0' + arr.CREATETIME.getMinutes()
          }
          list2_2.push(arr)
        })
        this.setData({
          list2_2: list2_2
        })
      }
		})
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
	submit:function () {
		if (this.data.activeIndex == 0) {
			var data = {
				ARRANGMENT_ID: 'B1',
				SCHOOLNAME: [this.data.school_b1_nameA, this.data.school_b1_nameB, this.data.school_b1_nameC, this.data.school_b1_nameD, this.data.school_b1_nameE],
				SCHOOLS_ID: [this.data.school_b1_idA, this.data.school_b1_idB, this.data.school_b1_idC, this.data.school_b1_idD, this.data.school_b1_idE],
				MJA_NAME: this.data.MJA_NAME,
				MJA_ID: this.data.MJA_ID,
				MJB_NAME: this.data.MJB_NAME,
				MJB_ID: this.data.MJB_ID,
				MJC_NAME: this.data.MJC_NAME,
				MJC_ID: this.data.MJC_ID,
				MJD_NAME: this.data.MJD_NAME,
				MJD_ID: this.data.MJD_ID,
				MJE_NAME: this.data.MJE_NAME,
				MJE_ID: this.data.MJE_ID
			}
			console.log(data)
			data.SCHOOLNAME.forEach(sn => {
				if (sn == '请选择') {
					wx.showModal({
						content: '本一志愿请选满5个学校',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								return false
							}
						}
					})
					return false
				}
			})
			util.sendRequest("/wechat/applet/report/make_volunteerB1", data, "POST", true, (res) => {
				if (res.hasErrors) {
					console.log(res.errorMessage)
					return false
				}
				if (res.data == 10007 || res.data == 10008) {
					wx.showModal({
						content: '对不起, 本一志愿表已存在, 您可以删除后再进行操作!',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								return false
							}
						}
					})
					return false
				}
				if (res.data == 10006) {
					wx.showModal({
						content: '恭喜您, 生成志愿表1张!',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								return false
							}
						}
					})
				}
			})
		} else if (this.data.activeIndex == 1) {
			var data = {
				ARRANGMENT_ID: 'B2',
				SCHOOLNAME: [this.data.school_b2_nameA, this.data.school_b2_nameB, this.data.school_b2_nameC, this.data.school_b2_nameD, this.data.school_b2_nameE, this.data.school_b2_nameF, this.data.school_b2_nameG, this.data.school_b2_nameH, this.data.school_b2_nameI, this.data.school_b2_nameJ],
				SCHOOLS_ID: [this.data.school_b2_idA, this.data.school_b2_idB, this.data.school_b2_idC, this.data.school_b2_idD, this.data.school_b2_idE, this.data.school_b2_idF, this.data.school_b2_idG, this.data.school_b2_idH, this.data.school_b2_idI, this.data.school_b2_idJ],
				MJA_NAME: this.data.MJA_NAME,
				MJA_ID: this.data.MJA_ID,
				MJB_NAME: this.data.MJB_NAME,
				MJB_ID: this.data.MJB_ID,
				MJC_NAME: this.data.MJC_NAME,
				MJC_ID: this.data.MJC_ID,
				MJD_NAME: this.data.MJD_NAME,
				MJD_ID: this.data.MJD_ID,
				MJE_NAME: this.data.MJE_NAME,
				MJE_ID: this.data.MJE_ID,
				MJF_NAME: this.data.MJF_NAME,
				MJF_ID: this.data.MJF_ID,
				MJG_NAME: this.data.MJG_NAME,
				MJG_ID: this.data.MJG_ID,
				MJH_NAME: this.data.MJH_NAME,
				MJH_ID: this.data.MJH_ID,
				MJI_NAME: this.data.MJI_NAME,
				MJI_ID: this.data.MJI_ID,
				MJJ_NAME: this.data.MJJ_NAME,
				MJJ_ID: this.data.MJJ_ID,
			}
			console.log(data)
			data.SCHOOLNAME.forEach(sn => {
				if (sn == '请选择') {
					wx.showModal({
						content: '本二志愿请选满10个学校',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								return false
							}
						}
					})
					return false
				}
			})
			util.sendRequest("/wechat/applet/report/make_volunteerB2", data, "POST", true, (res) => {
				if (res.hasErrors) {
					console.log(res.errorMessage)
					return false
				}
				if (res.data == 10007 || res.data == 10008) {
					wx.showModal({
						content: '对不起, 本二志愿表已存在, 您可以删除后再进行操作!',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								return false
							}
						}
					})
					return false
				}
				if (res.data == 10006) {
					wx.showModal({
						content: '恭喜您, 生成志愿表1张!',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								return false
							}
						}
					})
				}
			})
		}
	},
	selSchool: function (e) {
		if (this.data.activeIndex == 0) {
			var tempSchools = [this.data.school_b1_nameA, this.data.school_b1_nameB, this.data.school_b1_nameC, this.data.school_b1_nameD, this.data.school_b1_nameE]
		} else if (this.data.activeIndex == 1) {
			var tempSchools = [this.data.school_b2_nameA, this.data.school_b2_nameB, this.data.school_b2_nameC, this.data.school_b2_nameD, this.data.school_b2_nameE, this.data.school_b2_nameF, this.data.school_b2_nameG, this.data.school_b2_nameH, this.data.school_b2_nameI, this.data.school_b2_nameJ]
		}
		var data = {
			index: this.data.activeIndex,
			schoolIndex: e.currentTarget.id,
			tempSchools: tempSchools
		}
		util.navigateTo("/pages/imitate/school/school", data)
	},
  toExaminee:function(){
    util.navigateTo("/pages/person/information/information")
  },
  school:function(e){
    var that = this;
    var index = that.data.activeIndex;
		console.log('index:', index)
    var school_id = e.currentTarget.id;
    var id = that.data[school_id + "_id"];
    var num = school_id.substr(1,1)
    var param = "";
    if(num == 1){
      for(var i = 1; i < 6; i++){
        if (that.data["b1Schools_" + i + "_id"] != ""){
          param += that.data["b1Schools_" + i + "_id"] + ",";
        }
      }
    }
    else{
      for (var i = 1; i < 11; i++) {
        if (that.data["b2Schools_" + i + "_id"] != "") {
          param += that.data["b2Schools_" + i + "_id"] + ",";
        }
      }
    }
		console.log('param:', param)
    var major_id = school_id.replace("Schools","Schools_major");
      util.navigateTo("/pages/imitate/school/school", { index: index, school_id: school_id, major_id: major_id,param:param, id:id}) 
    },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //删除本科一批志愿表（表一）
	delB1_1: function () {
		var that = this
    util.sendRequest("/wechat/applet/report/delete_volunteer", { ARRANGMENT_ID: 'B1', COUNT: 1}, "POST", true, (res) => {
			if (res.hasErrors) {
				console.log(res.errorMessage)
				return false
			}
			console.log(res)
			if (res.data == 10009) {
				wx.showModal({
          content: '删除成功，如需重新添加请登录官网操作',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							that.setData({
                list1_1: []
							})
						}
					}
				})
			}
		})
	},
  //删除本科一批志愿表（表一）
  delB1_2: function () {
    var that = this
    util.sendRequest("/wechat/applet/report/delete_volunteer", { ARRANGMENT_ID: 'B1', COUNT: 2}, "POST", true, (res) => {
      if (res.hasErrors) {
        console.log(res.errorMessage)
        return false
      }
      console.log(res)
      if (res.data == 10009) {
        wx.showModal({
          content: '删除成功，如需重新添加请登录官网操作',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.setData({
                list1_2: []
              })
            }
          }
        })
      }
    })
  },
  //删除本科二批志愿表（表二）
	delB2_1: function () {
		var that = this
    util.sendRequest("/wechat/applet/report/delete_volunteer", { ARRANGMENT_ID: 'B2', COUNT:1 }, "POST", true, (res) => {
			if (res.hasErrors) {
				console.log(res.errorMessage)
				return false
			}
			console.log(res)
			if (res.data == 10009) {
				wx.showModal({
          content: '删除成功，如需重新添加请登录官网操作',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							that.setData({
                list2_1: []
							})
						}
					}
				})
			}
		})
	},
  //删除本科二批志愿表（表二）
  delB2_2: function () {
    var that = this
    util.sendRequest("/wechat/applet/report/delete_volunteer", { ARRANGMENT_ID: 'B2', COUNT: 2 }, "POST", true, (res) => {
      if (res.hasErrors) {
        console.log(res.errorMessage)
        return false
      }
      console.log(res)
      if (res.data == 10009) {
        wx.showModal({
          content: '删除成功，如需重新添加请登录官网操作',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.setData({
                list2_2: []
              })
            }
          }
        })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  b1Submit: function () {
    var that = this;
    if (that.data.b1Schools_1_id == ""
      || that.data.b1Schools_2_id == ""
      || that.data.b1Schools_3_id == ""
      || that.data.b1Schools_4_id == ""
      || that.data.b1Schools_5_id == "") {
      util.showError("院校选项不能为空");
      return false;
    }
    // else{
    //   if(that.data.vip != "UC"){
    //     util.confirm({
    //       content: "确定要进行模拟填报？您将使用一次模拟填报",
    //       confirmFn: function () {
    //         var b1Schools_1_id = that.data.b1Schools_1_id;
    //         var b1Schools_2_id = that.data.b1Schools_2_id;
    //         var b1Schools_3_id = that.data.b1Schools_3_id;
    //         var b1Schools_4_id = that.data.b1Schools_4_id;
    //         var b1Schools_5_id = that.data.b1Schools_5_id;
    //         var b1Schools = that.data.b1Schools;

    //         var b1Schools_major_1_id = that.data.b1Schools_major_1_id;
    //         var b1Schools_major_2_id = that.data.b1Schools_major_2_id;
    //         var b1Schools_major_3_id = that.data.b1Schools_major_3_id;
    //         var b1Schools_major_4_id = that.data.b1Schools_major_4_id;
    //         var b1Schools_major_5_id = that.data.b1Schools_major_5_id;

            
    //         var param = {};
    //         param.school1 = b1Schools_1_id;
    //         param.zye1 = b1Schools_major_1_id;

    //         param.school2 = b1Schools_2_id;
    //         param.zye2 = b1Schools_major_2_id;

    //         param.school3 = b1Schools_3_id;
    //         param.zye3 = b1Schools_major_3_id;

    //         param.school4 = b1Schools_4_id;
    //         param.zye4 = b1Schools_major_4_id;

    //         param.school5 = b1Schools_5_id;
    //         param.zye5 = b1Schools_major_5_id;
    //         param.flag = 1;
    //         param.handleFlag = 1;//1为模拟填报,2为智能推荐
    //         param.index = that.data.activeIndex;
    //         param.subject = that.data.subject;
    //         param.MAJORTYPE = that.data.MAJORTYPE;

    //         util.navigateTo("/pages/analog/result/result", param);
    //       }
    //     });
    //   }
    //   else{
    //     var b1Schools_1_id = that.data.b1Schools_1_id;
    //     var b1Schools_2_id = that.data.b1Schools_2_id;
    //     var b1Schools_3_id = that.data.b1Schools_3_id;
    //     var b1Schools_4_id = that.data.b1Schools_4_id;
    //     var b1Schools_5_id = that.data.b1Schools_5_id;
    //     var b1Schools = that.data.b1Schools;

    //     var b1Schools_major_1_id = that.data.b1Schools_major_1_id;
    //     var b1Schools_major_2_id = that.data.b1Schools_major_2_id;
    //     var b1Schools_major_3_id = that.data.b1Schools_major_3_id;
    //     var b1Schools_major_4_id = that.data.b1Schools_major_4_id;
    //     var b1Schools_major_5_id = that.data.b1Schools_major_5_id;


    //     var param = {};
    //     param.school1 = b1Schools_1_id;
    //     param.zye1 = b1Schools_major_1_id;

    //     param.school2 = b1Schools_2_id;
    //     param.zye2 = b1Schools_major_2_id;

    //     param.school3 = b1Schools_3_id;
    //     param.zye3 = b1Schools_major_3_id;

    //     param.school4 = b1Schools_4_id;
    //     param.zye4 = b1Schools_major_4_id;

    //     param.school5 = b1Schools_5_id;
    //     param.zye5 = b1Schools_major_5_id;
    //     param.flag = 1;
    //     param.handleFlag = 1;//1为模拟填报,2为智能推荐
    //     param.index = that.data.activeIndex;
    //     param.subject = that.data.subject;
    //     param.MAJORTYPE = that.data.MAJORTYPE;
    //     util.navigateTo("/pages/analog/result/result", param);
    //   }
    // }
  },
  b2Submit: function () {
    var that = this;
    if (that.data.b2Schools_1_id == ""
      || that.data.b2Schools_2_id == ""
      || that.data.b2Schools_3_id == ""
      || that.data.b2Schools_4_id == ""
      || that.data.b2Schools_5_id == ""
      || that.data.b2Schools_6_id == ""
      || that.data.b2Schools_7_id == ""
      || that.data.b2Schools_8_id == ""
      || that.data.b2Schools_9_id == ""
      || that.data.b2Schools_10_id == "") {
      util.showError("院校选项不能为空");
      return false;
    }
    // else{
    //   if(that.data.vip != "UC"){
    //     util.confirm({
    //       content: "确定要进行模拟填报？您将使用一次模拟填报",
    //       confirmFn: function () {
    //         var b2Schools_1_id = that.data.b2Schools_1_id;
    //         var b2Schools_2_id = that.data.b2Schools_2_id;
    //         var b2Schools_3_id = that.data.b2Schools_3_id;
    //         var b2Schools_4_id = that.data.b2Schools_4_id;
    //         var b2Schools_5_id = that.data.b2Schools_5_id;
    //         var b2Schools_6_id = that.data.b2Schools_6_id;
    //         var b2Schools_7_id = that.data.b2Schools_7_id;
    //         var b2Schools_8_id = that.data.b2Schools_8_id;
    //         var b2Schools_9_id = that.data.b2Schools_9_id;
    //         var b2Schools_10_id = that.data.b2Schools_10_id;
    //         var b2Schools = that.data.b2Schools;

    //         var b2Schools_major_1_id = that.data.b2Schools_major_1_id;
    //         var b2Schools_major_2_id = that.data.b2Schools_major_2_id;
    //         var b2Schools_major_3_id = that.data.b2Schools_major_3_id;
    //         var b2Schools_major_4_id = that.data.b2Schools_major_4_id;
    //         var b2Schools_major_5_id = that.data.b2Schools_major_5_id;
    //         var b2Schools_major_6_id = that.data.b2Schools_major_6_id;
    //         var b2Schools_major_7_id = that.data.b2Schools_major_7_id;
    //         var b2Schools_major_8_id = that.data.b2Schools_major_8_id;
    //         var b2Schools_major_9_id = that.data.b2Schools_major_9_id;
    //         var b2Schools_major_10_id = that.data.b2Schools_major_10_id;
    //         var param = {};
    //         param.school1 = b2Schools_1_id;
    //         param.zye1 = b2Schools_major_1_id;

    //         param.school2 = b2Schools_2_id;
    //         param.zye2 = b2Schools_major_2_id;

    //         param.school3 = b2Schools_3_id;
    //         param.zye3 = b2Schools_major_3_id;

    //         param.school4 = b2Schools_4_id;
    //         param.zye4 = b2Schools_major_4_id;

    //         param.school5 = b2Schools_5_id;
    //         param.zye5 = b2Schools_major_5_id;

    //         param.school6 = b2Schools_6_id;
    //         param.zye6 = b2Schools_major_6_id;

    //         param.school7 = b2Schools_7_id;
    //         param.zye7 = b2Schools_major_7_id;

    //         param.school8 = b2Schools_8_id;
    //         param.zye8 = b2Schools_major_8_id;

    //         param.school9 = b2Schools_9_id;
    //         param.zye9 = b2Schools_major_9_id;

    //         param.school10 = b2Schools_10_id;
    //         param.zye10 = b2Schools_major_10_id;
            
            
    //         param.flag = 2;
    //         param.handleFlag = 1;//1为模拟填报,2为智能推荐
    //         param.index = that.data.activeIndex;
    //         param.subject = that.data.subject;
    //         param.MAJORTYPE = that.data.MAJORTYPE;
    //         util.navigateTo("/pages/analog/result/result", param);
    //       }
    //     });
    //   }
    //   else{
    //     var b2Schools_1_id = that.data.b2Schools_1_id;
    //     var b2Schools_2_id = that.data.b2Schools_2_id;
    //     var b2Schools_3_id = that.data.b2Schools_3_id;
    //     var b2Schools_4_id = that.data.b2Schools_4_id;
    //     var b2Schools_5_id = that.data.b2Schools_5_id;
    //     var b2Schools_6_id = that.data.b2Schools_6_id;
    //     var b2Schools_7_id = that.data.b2Schools_7_id;
    //     var b2Schools_8_id = that.data.b2Schools_8_id;
    //     var b2Schools_9_id = that.data.b2Schools_9_id;
    //     var b2Schools_10_id = that.data.b2Schools_10_id;
    //     var b2Schools = that.data.b2Schools;

    //     var b2Schools_major_1_id = that.data.b2Schools_major_1_id;
    //     var b2Schools_major_2_id = that.data.b2Schools_major_2_id;
    //     var b2Schools_major_3_id = that.data.b2Schools_major_3_id;
    //     var b2Schools_major_4_id = that.data.b2Schools_major_4_id;
    //     var b2Schools_major_5_id = that.data.b2Schools_major_5_id;
    //     var b2Schools_major_6_id = that.data.b2Schools_major_6_id;
    //     var b2Schools_major_7_id = that.data.b2Schools_major_7_id;
    //     var b2Schools_major_8_id = that.data.b2Schools_major_8_id;
    //     var b2Schools_major_9_id = that.data.b2Schools_major_9_id;
    //     var b2Schools_major_10_id = that.data.b2Schools_major_10_id;
    //     var param = {};
    //     param.school1 = b2Schools_1_id;
    //     param.zye1 = b2Schools_major_1_id;

    //     param.school2 = b2Schools_2_id;
    //     param.zye2 = b2Schools_major_2_id;

    //     param.school3 = b2Schools_3_id;
    //     param.zye3 = b2Schools_major_3_id;

    //     param.school4 = b2Schools_4_id;
    //     param.zye4 = b2Schools_major_4_id;

    //     param.school5 = b2Schools_5_id;
    //     param.zye5 = b2Schools_major_5_id;

    //     param.school6 = b2Schools_6_id;
    //     param.zye6 = b2Schools_major_6_id;

    //     param.school7 = b2Schools_7_id;
    //     param.zye7 = b2Schools_major_7_id;

    //     param.school8 = b2Schools_8_id;
    //     param.zye8 = b2Schools_major_8_id;

    //     param.school9 = b2Schools_9_id;
    //     param.zye9 = b2Schools_major_9_id;

    //     param.school10 = b2Schools_10_id;
    //     param.zye10 = b2Schools_major_10_id;

    //     param.flag = 2;
    //     param.handleFlag = 1;//1为模拟填报,2为智能推荐
    //     param.index = that.data.activeIndex;
    //     param.subject = that.data.subject;
    //     param.MAJORTYPE = that.data.MAJORTYPE;
    //     util.navigateTo("/pages/analog/result/result", param);
    //   }
    // }
  },
})