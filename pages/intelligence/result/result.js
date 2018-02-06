// pages/intelligence/content/content.js
var util = require('../../../utils/util.js');
// var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listChong: [],
    listWen: [],
    listBao: [],
    listDian: [],
    MAJORTYPE:"",
    ARRANGMENT_ID:"",
    MAJORTYPE_VALUE:"",
    buttonClicked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      MAJORTYPE: options.MAJORTYPE,
      ARRANGMENT_ID: options.ARRANGMENT_ID,
      MAJORTYPE_VALUE: options.MAJORTYPE_VALUE
    })
    util.sendRequest("/wechat/applet/report/reporting", options, "POST", true, function(res){
      console.log(res)
      var listChong = res.listChong;
      var listWen = res.listWen;
      var listBao = res.listBao;
      var listDian = res.listDian;
      if (listChong == "" && listWen == "" && listBao == "" && listDian == "") {
        util.showError("根据您选择的条件查询，暂无数据！")
    }
    else{
        var listChongOut = that.groupBySchool(listChong);
        var listWenOut = that.groupBySchool(listWen);
        var listBaoOut = that.groupBySchool(listBao);
        var listDianOut = that.groupBySchool(listDian);

        that.setData({
          listChong: listChongOut,
          listWen: listWenOut,
          listBao: listBaoOut,
          listDian: listDianOut
        });
    }
    });
  },
  groupBySchool: function(list) {
    var listOut = [];
    var setObj = new Set();
    list.forEach(function (element) {
      setObj.add(element.SCHOOL_ID);
    });

    setObj.forEach(function (element) {
      var school = {};
      school.NAME = element.NAME;
      school.SCHOOL_ID = element;
      school.majors = [];
      list.forEach(function (arrObj) {
        if (element == arrObj.SCHOOL_ID) {
          if(!school.NAME) {
            school.NAME = arrObj.NAME;
          }
          var major = {};
          major.MJNAME = arrObj.MJNAME;
          major.MAJOR_ID = arrObj.MAJOR_ID;
          school.majors.push(major);
        }
      });

      listOut.push(school);
    });

    return listOut;
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
  toDail:function(e){
    var that = this;
    var curId = e.currentTarget.id;
    var major = e.currentTarget.dataset.id;
    var img = e.currentTarget.dataset.name;
    var advice = e.currentTarget.dataset.class;
    var majors= "";
    var majorName = "";
    for(var i=0;i<major.length;i++){
      majors += major[i].MAJOR_ID + ',';
      majorName += major[i].MJNAME +','
    }
    if (majors != "") {
      majors = majors.substring(0, majors.length - 1);
      majorName = majorName.substring(0, majorName.length - 1);
    }
    if (!that.data.buttonClicked) {
      util.buttonClicked(that);
    util.navigateTo("/pages/intelligence/result/content/content", { SCHOOL_ID: curId, MAJORTYPE: that.data.MAJORTYPE, major: majors, majorName: majorName, ARRANGMENT_ID: that.data.ARRANGMENT_ID,MAJORTYPE_VALUE:that.data.MAJORTYPE_VALUE,img:img,advice:advice});
  }
  }
})