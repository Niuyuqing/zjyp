/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	var zjshjDetailMain = new Vue({
		el: '.zjshjDetailMain',
		data: {
			lifeHomeId: '',
			lifeMsg: '',
			lng: '',
			lat: '',
			mapTitle: '',
			mapAddress: ''
		},
		mounted: function mounted() {
			this.lifeHomeId = this.getUrlParam('id');
	
			// 筑家生活家详细信息
			this.$http.post('http://localhost:8083/zujahome-main/lifeHome/showLifeHomeDetail', {
				lifeHomeId: this.lifeHomeId
			}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				this.lifeMsg = data.body;
	
				this.mapAddress = this.lifeMsg.address;
				this.getMapPos(this.mapAddress, this.mapTitle);
			}, function (a) {
				console.log('请求错误 ');
			});
		},
		methods: {
			showMap: function showMap() {
				// 百度地图API功能
				var map = new BMap.Map("allmap");
				var point = new BMap.Point(this.lng, this.lat);
				var marker = new BMap.Marker(point); // 创建标注
				map.addOverlay(marker); // 将标注添加到地图中
				map.centerAndZoom(point, 15);
				var opts = {
					width: 200, // 信息窗口宽度
					height: 100, // 信息窗口高度
					title: this.mapTitle, // 信息窗口标题
					enableMessage: true, //设置允许信息窗发送短息
					message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
				};
				/*var infoWindow = new BMap.InfoWindow("地址：" + this.mapAddress, opts); // 创建信息窗口对象 
	   marker.addEventListener("click", function() {
	   	map.openInfoWindow(infoWindow, point); //开启信息窗口
	   });*/
	
				/*var top_left_control = new BMap.ScaleControl({
	   	anchor: BMAP_ANCHOR_TOP_LEFT
	   }); // 左上角，添加比例尺
	   var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
	   var top_right_navigation = new BMap.NavigationControl({
	   	anchor: BMAP_ANCHOR_TOP_RIGHT,
	   	type: BMAP_NAVIGATION_CONTROL_SMALL
	   }); //右上角，仅包含平移和缩放按钮*/
	
				map.setCurrentCity("沈阳"); // 设置地图显示的城市 此项是必须设置的
				map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
				//map.addControl(top_left_control);
				//map.addControl(top_left_navigation);
				//map.addControl(top_right_navigation);
			},
			getMapPos: function getMapPos(address, name) {
				// 获取经纬度
				this.mapTitle = name;
				this.mapAddress = address;
	
				this.$http.post('http://localhost:8083/zujahome-main/experience/changeAddressToPos', {
					address: address
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.lng = data.body.data.result.location.lng;
					this.lat = data.body.data.result.location.lat;
	
					this.showMap(); // 调用百度地图
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			getUrlParam: function getUrlParam(key) {
				// 获取参数
				var url = window.location.search;
				// 正则筛选地址栏
				var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
				// 匹配目标参数
				var result = url.substr(1).match(reg);
				//返回参数值
				return result ? decodeURIComponent(result[2]) : null;
			}
		}
	});

/***/ })
/******/ ]);
//# sourceMappingURL=zjshjDetail.js.map