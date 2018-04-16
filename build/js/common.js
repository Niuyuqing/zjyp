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
	
	var pageCommon = new Vue({
		el: '.pageCommon',
		data: {},
		mounted: function mounted() {},
		methods: {}
	});
	
	//日期格式化，精确到年月日
	Vue.filter('dateFormat', function (value) {
		//value为13位的时间戳
		function add0(m) {
			return m < 10 ? '0' + m : m;
		}
		var time = new Date(parseInt(value));
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
	
		return y + '.' + add0(m) + '.' + add0(d);
	});
	
	//日期格式化，精确到年月日时分秒
	Vue.filter('timestampToTime', function (value) {
		var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		Y = date.getFullYear() + '-';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		D = date.getDate() + ' ';
		h = date.getHours() + ':';
		m = date.getMinutes() + ':';
		s = date.getSeconds();
		return Y + M + D + h + m + s;
	});
	
	(function (doc) {
		function changeSize() {
			var size = doc.documentElement.clientWidth / 128;
			doc.querySelector('html').style.fontSize = size + 'px';
		}
		//用户缩放浏览器窗口大小时
		window.onresize = changeSize;
		changeSize();
	})(document);

/***/ })
/******/ ]);
//# sourceMappingURL=common.js.map