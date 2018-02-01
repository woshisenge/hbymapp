// pages/consult/consult.js
var util = require('../../utils/util.js');

var widthTimer = null;
var id;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    width:0,
    checked:false,
    isLoadingMore: false,//是否加载更多
    searchParam:{currentPage: 1},//搜索参数
    schools:[],//学校结果
    provinces: [],
    arrangments: [],
    subjecttypes: [],
    properties: [],
    showView:true,
    showView1: true,
    showView2: true,
    hot:null,
    grade:null
  },
  upper: function (e) {
  },
  lower: function (e) {
  },
  scroll: function (e) {
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
    this.setData({
      inputVal: e.detail.value
    });
  },
  setSearchStorage:function(){
    var that=this;
    
    that.clearCurPage();
    that.pullSchoolInfos(true);
  },
  compare:function (property){
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },
  openTm: function(){
    var that = this;
    this.setData({
      width: that.data.width + 4
    });
    if(that.data.width > 79) {
      clearInterval(widthTimer);
      widthTimer = null;
    }
    
  },
  closeTm: function () {
    var that = this;
    this.setData({
      width: that.data.width - 4
    });
    if (that.data.width <1) {
      clearInterval(widthTimer);
      widthTimer = null;
    }

  },
  toDto: function(list) {
    if(!list) return list;
    list.forEach(function(obj){
      if(obj.HEADURL){
        obj.HEADURL = util.setStaticUrl(obj.HEADURL);
      }
      if (obj.LHEADURL) {
        obj.LHEADURL = util.setStaticUrl(obj.LHEADURL);
      }
    });
    return list;
  },
  teacher:function(e){
    var a = e.currentTarget.dataset.id;
    util.navigateTo('../consult/consultlist/consultlist', { a: a })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.pullSchoolInfos();

    util.sendRequest('/wechat/applet/dictionary/get', { code: 'ARRANGMENT' }, 'POST', false, function (res) {
      that.setData({
        arrangments: res.data
      })
    });
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'SCPROPERTY' }, 'POST', false, function (res) {
      that.setData({
        properties: res.data
      })
    });
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'SUBJECTTYPE' }, 'POST', false, function (res) {
      that.setData({
        subjecttypes: res.data
      })
    });
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'PROVINCE' }, 'POST', false, function (res) {
      that.setData({
        provinces: res.data
      })
    }) 
    
  },
  changeArrow:function(){
    var that=this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  changeArrow1: function () {
    var that = this;
    that.setData({
      showView1: (!that.data.showView1)
    })
  },
  changeArrow2: function () {
    var that = this;
    that.setData({
      showView2: (!that.data.showView2)
    })
  },
  tap_ch:function(e){
    var that = this;
    if(widthTimer != null) {
      clearInterval(widthTimer);
      this.setData({
        width: 0
      });
    } 
    widthTimer = setInterval(this.openTm, 10)
    this.setData({
      hidden: !this.data.hidden
    })
  },
  close_ch:function(){
    widthTimer = setInterval(this.closeTm, 10)
    this.setData({
      hidden: !this.data.hidden,
    })
  },
  changeArrangment: function (e) {
    var that = this;
    var arrangments = that.data.arrangments;
    var checkArr = e.detail.value;
    for (var i = 0; i < arrangments.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        arrangments[i].checked = true;
      } else {
        arrangments[i].checked = false;
      }
    }
    that.setData({
      arrangments: arrangments
    });

    that.clearCurPage();
    that.pullSchoolInfos(true);
  }, 
  changeSubjecttype: function (e) {
    var that = this;
    var subjecttypes = that.data.subjecttypes;
    var checkArr = e.detail.value;
    for (var i = 0; i < subjecttypes.length; i++) {
        if (checkArr.indexOf(i + "") != -1) {
          subjecttypes[i].checked = true;
        } else {
          subjecttypes[i].checked = false;
        }
      }
    that.setData({
      subjecttypes: subjecttypes
    });

    that.clearCurPage();
    that.pullSchoolInfos(true);
  }, 
  changeProperty: function (e) {
    var that = this;
    var properties = that.data.properties;
    var checkArr = e.detail.value;
    for (var i = 0; i < properties.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        properties[i].checked = true;
      } else {
        properties[i].checked = false;
      }
    }
    that.setData({
      properties: properties
    });

    that.clearCurPage();
    that.pullSchoolInfos(true);
  },
  changeProvince: function (e) {
    var that = this;
    var provinces = that.data.provinces;
    var checkArr = e.detail.value;
    for (var i = 0; i < provinces.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        provinces[i].checked = true;
      } else {
        provinces[i].checked = false;
      }
    }
    that.setData({
      provinces: provinces
    });
    
    that.clearCurPage();
    that.pullSchoolInfos(true); 
  },  
  hot: function () {
    var that = this;
    if (that.data.hot == null) {
      that.setData({
        hot: true,
        grade: null
      })
    }
    else {
      that.setData({
        hot: !that.data.hot,
        grade: null
      })
    }
    that.clearCurPage();
    that.pullSchoolInfos(true);
  },
  grade: function () {
    var that = this;
    if (that.data.grade == null) {
      that.setData({
        grade: true,
        hot: null
      })
    }
    else {
      that.setData({
        grade: !that.data.grade,
        hot: null
      })
    }

    that.clearCurPage();
    that.pullSchoolInfos(true);
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
    if (!this.data.isLoadingMore){
      this.setData({
        isLoadingMore: true
      });

      this.pullSchoolInfos();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //将页码置0
  clearCurPage: function() {
    var that = this;
    var param = that.data.searchParam;
    param.currentPage = 0;

    that.setData({
      searchParam: param
    });
  },
  //页码翻页
  addCurPage: function() {
    var that = this;
    var param = that.data.searchParam;
    if (param.currentPage) {
      param.currentPage = parseInt(param.currentPage) + 1;
    }
    else {
      param.currentPage = 2;
    }
    that.setData({
      searchParam: param
    });
  },
  /**
   * 设置参数
   */
  setSearchParam: function() {
    var that = this;
    var param = this.data.searchParam;

    var province_search = "";
    that.data.provinces.forEach(function(element){
      if (element.checked) {
        province_search += element.DIC_ID + ",";
      }
    });
    if (province_search != "") province_search = province_search.substring(0, province_search.length - 1);
    param.PROVINCE = province_search;

    var subjecttype_search = "";
    that.data.subjecttypes.forEach(function (element) {
      if (element.checked) {
        subjecttype_search += element.DIC_ID + ",";
      }
    });
    if (subjecttype_search != "") subjecttype_search = subjecttype_search.substring(0, subjecttype_search.length - 1);
    param.SUBJECTTYPE = subjecttype_search;

    var arrangment_search = "";
    that.data.arrangments.forEach(function (element) {
      if (element.checked) {
        arrangment_search += element.DIC_ID + ",";
      }
    });
    if (arrangment_search != "") arrangment_search = arrangment_search.substring(0, arrangment_search.length - 1);
    param.ARRANGMENT = arrangment_search;

    var property_search = "";
    that.data.properties.forEach(function (element) {
      if (element.checked) {
        property_search += element.DIC_ID + ",";
      }
    });
    if (property_search != "") property_search = property_search.substring(0, property_search.length - 1);
    param.PROPERTY = property_search;
    if (that.data.inputVal)
      param.NAME = that.data.inputVal;

    if (that.data.hot != null)
      param.HOT = that.data.hot;
    else
      delete param.HOT;

    if (that.data.grade != null)
      param.GRADE = that.data.grade;
    else
      delete param.GRADE;

    that.setData({
      searchParam: param
    });
  },
  /**
   * 更新参数
   */
  reloadSearchParam: function(param) {
      var that = this;
      var paramObj = that.data.searchParam;
      console.log(param)
      if (!paramObj.currentPage) paramObj.currentPage = 1;

      if (paramObj.currentPage <= param.totalPage){
        that.addCurPage();//后台页码从0开始，前台页码从1开始

        that.setData({
          searchParam: paramObj
        });
      }
        
  },
  setResults(list, isClear){
    var that = this;
    var oldList = isClear? [] : that.data.schools;
    var newList = that.toDto(list);
    newList.forEach(function(index, element){
      oldList.push(index);
    });
    
    return oldList;
  },
  /**
   * 拉取新数据
   */
  pullSchoolInfos: function(isClear) {
    var that = this;

    that.setSearchParam();
    console.log(that.data.searchParam)
    util.sendRequest('/wechat/applet/school/gethasteachers', that.data.searchParam, 'POST', false, function (res) {
    
      that.setData({
        schools: that.setResults(res.data.results, isClear),
        num: res.data.totalRecord
      });

      that.reloadSearchParam(res.data);

      that.setData({
        isLoadingMore: false
      });
    });
  },
  //重置搜索参数
  reset_search: function() {
    var that = this;
    var provinces = that.data.provinces
    provinces.forEach(function(element){
      element.checked = false;
    });

    var subjecttypes = that.data.subjecttypes;
    subjecttypes.forEach(function(element){
      element.checked = false;
    });

    var arrangments = that.data.arrangments;
    arrangments.forEach(function(element){
      element.checked = false;
    });

    var properties = that.data.properties;
    properties.forEach(function(element){
      element.checked = false;
    });

    that.setData({
      provinces: provinces,
      subjecttypes: subjecttypes,
      arrangments: arrangments,
      properties: properties,
      checked:false
    });

    that.clearCurPage();
    that.pullSchoolInfos(true);
  }
})