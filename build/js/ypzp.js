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
	
	var ypzpMain = new Vue({
		el: '.ypzpMain',
		data: {
			bedRoomList: [], // 卧室家具
			livingRoomList: [], // 客厅家具
			diningRoomList: [], // 餐厅家具
			studyRoomList: [], // 书房家具
			childrenRoomList: [] },
		// 儿童房家具
		mounted: function mounted() {
			this.showYoupinList('1');
			this.showYoupinList('2');
			this.showYoupinList('3');
			this.showYoupinList('4');
			this.showYoupinList('5');
		},
		methods: {
			// 展示优品宅配
			showYoupinList: function showYoupinList(id) {
				this.$http.post('http://localhost:8083/zujahome-main/youpin/showYoupinList', {
					youpinCatId: id
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					if (id == '1') {
						// 卧室家具
						this.bedRoomList = data.body.data.data;
						console.log(this.bedRoomList);
					} else if (id == '2') {
						// 客厅家具
						this.livingRoomList = data.body.data.data;
					} else if (id == '3') {
						// 餐厅家具
						this.diningRoomList = data.body.data.data;
					} else if (id == '4') {
						// 书房家具
						this.studyRoomList = data.body.data.data;
					} else if (id == '5') {
						// 儿童房家具
						this.childrenRoomList = data.body.data.data;
					}
				}, function (a) {
					console.log('请求错误 ');
				});
			}
		}
	});
	
	$(function () {
		$('.toPage a').css('color', '#333');
		$('.toPage .ypzp a').css('color', '#cd2f1d');
	});

/***/ })
/******/ ]);
//# sourceMappingURL=ypzp.js.map