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
	
	var zjshjMain = new Vue({
		el: '.zjshjMain',
		data: {
			province: '',
			city: '',
			district: '',
			nowPageNum: 1,
			lifeHomeList: []
		},
		mounted: function mounted() {
			this.showLifeHomeList(); // 筑家生活家列表
		},
		methods: {
			// 筑家生活家列表
			showLifeHomeList: function showLifeHomeList() {
				this.$http.post('http://localhost:8083/zujahome-main/lifeHome/showLifeHomeList', {
					province: this.province,
					city: this.city,
					district: this.district,
					pageNum: this.nowPageNum
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.lifeHomeList = data.body.data.data;
					console.log(this.lifeHomeList);
					// 翻页器
					$('.paging').pagination({
						pageCount: data.body.data.totalPages,
						coping: true,
						mode: 'fixed',
						activeCls: 'activeCls',
						homePage: '首页',
						endPage: '尾页',
						prevContent: '<img src="../build/images/prevPage.png"/>',
						nextContent: '<img src="../build/images/nextPage.png"/>',
						callback: function callback(api) {
							zjshjMain.nowPageNum = api.getCurrent();
	
							zjshjMain.$http.post('http://localhost:8083/zujahome-main/lifeHome/showLifeHomeList', {
								province: zjshjMain.province,
								city: zjshjMain.city,
								district: zjshjMain.district,
								pageNum: zjshjMain.nowPageNum
							}, {
								headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								emulateJSON: true
							}).then(function (data) {
								zjshjMain.lifeHomeList = data.body.data.data;
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
			toSHJDetail: function toSHJDetail(id) {
				window.location.href = 'zjshjDetail.html?id=' + id;
			}
		}
	});
	
	$(function () {
		$('#distpicker5').distpicker({
			province: '请选择',
			city: '请选择',
			district: '请选择',
			autoSelect: false
		});
	
		$('.toPage a').css('color', '#333');
		$('.toPage .zjshj a').css('color', '#cd2f1d');
	});

/***/ })
/******/ ]);
//# sourceMappingURL=zjshj.js.map