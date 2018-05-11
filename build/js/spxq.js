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
	
	var spxqMain = new Vue({
		el: '.spxqMain',
		data: {},
		mounted: function mounted() {
			// 翻页器
			$('.paging').pagination({
				pageCount: 50,
				coping: true,
				mode: 'fixed',
				activeCls: 'activeCls',
				homePage: '首页',
				endPage: '尾页',
				prevContent: '<img src="../build/images/prevPage.png"/>',
				nextContent: '<img src="../build/images/nextPage.png"/>',
				callback: function callback(api) {
					this.nowPageNum = api.getCurrent();
					console.log('bb:' + this.nowPageNum);
				}
			});
		},
		methods: {}
	});
	
	$(function () {
		// 配套方案
		$('.toPage a').css('color', '#333');
		$('.toPage .spxq a').css('color', '#cd2f1d');
	
		// 设置翻页距左边距离
		$('.pagingWrap .paging').css({
			'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
		});
	
		var magnifierConfig = {
			magnifier: "#magnifier1", //最外层的大容器
			width: 450, //承载容器宽
			height: 450, //承载容器高
			moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
			zoom: 5 //缩放比例
		};
	
		var _magnifier = magnifier(magnifierConfig);
	});

/***/ })
/******/ ]);
//# sourceMappingURL=spxq.js.map