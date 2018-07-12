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
	
	var ptfaPage = new Vue({
		el: '.ptfaPage',
		data: {
			allRoom: true, // 全部空间
			diningRoom: false, // 客餐厅
			bedRoom: false, // 卧房
			childrenRoom: false, // 儿童房
			studyRoom: false, // 书房
			nowPageNum: 1, // 当前页页码
			taocanList: [], // 优品套餐
			totalPages: 0 },
		// 总页数
		mounted: function mounted() {
			this.showTaocanList('1'); // 默认全部空间
		},
		methods: {
			// 优品套餐
			showTaocanList: function showTaocanList(id) {
				this.$http.post('http://localhost:8083/zujahome-main/taocan/showTaocanList', {
					taocanCatId: id,
					pageNum: this.nowPageNum
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.taocanList = data.body.data.data;
					this.totalPages = data.body.data.totalPages;
	
					// 翻页器
					$('.paging').pagination({
						pageCount: ptfaPage.totalPages,
						coping: true,
						mode: 'fixed',
						activeCls: 'activeCls',
						homePage: '首页',
						endPage: '尾页',
						prevContent: '<img src="../build/images/prevPage.png"/>',
						nextContent: '<img src="../build/images/nextPage.png"/>',
						callback: function callback(api) {
							ptfaPage.nowPageNum = api.getCurrent();
	
							ptfaPage.$http.post('http://localhost:8083/zujahome-main/taocan/showTaocanList', {
								taocanCatId: id,
								pageNum: ptfaPage.nowPageNum
							}, {
								headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								emulateJSON: true
							}).then(function (data) {
								ptfaPage.taocanList = data.body.data.data;
								ptfaPage.totalPages = data.body.data.totalPages;
							}, function (a) {
								console.log('请求错误 ');
							});
						}
					});
	
					// 设置翻页距左边距离
					$('.pagingWrap .paging').css({
						'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
					});
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			allRoomClick: function allRoomClick() {
				// 全部空间点击
				this.allRoom = true;
				this.diningRoom = false;
				this.bedRoom = false;
				this.childrenRoom = false;
				this.studyRoom = false;
	
				this.nowPageNum = 1;
				this.showTaocanList('1');
			},
			diningRoomClick: function diningRoomClick() {
				// 客厅点击
				this.allRoom = false;
				this.diningRoom = true;
				this.bedRoom = false;
				this.childrenRoom = false;
				this.studyRoom = false;
	
				this.nowPageNum = 1;
				this.showTaocanList('2');
			},
			bedRoomClick: function bedRoomClick() {
				// 卧房点击
				this.allRoom = false;
				this.diningRoom = false;
				this.bedRoom = true;
				this.childrenRoom = false;
				this.studyRoom = false;
	
				this.nowPageNum = 1;
				this.showTaocanList('3');
			},
			childrenRoomClick: function childrenRoomClick() {
				// 儿童房点击
				this.allRoom = false;
				this.diningRoom = false;
				this.bedRoom = false;
				this.childrenRoom = true;
				this.studyRoom = false;
	
				this.nowPageNum = 1;
				this.showTaocanList('4');
			},
			studyRoomClick: function studyRoomClick() {
				// 书房点击
				this.allRoom = false;
				this.diningRoom = false;
				this.bedRoom = false;
				this.childrenRoom = false;
				this.studyRoom = true;
	
				this.nowPageNum = 1;
				this.showTaocanList('5');
			}
		}
	});
	
	$(function () {
		// 配套方案
		$('.toPage a').css('color', '#333');
		$('.toPage .yptc a').css('color', '#cd2f1d');
	});

/***/ })
/******/ ]);
//# sourceMappingURL=yptc.js.map