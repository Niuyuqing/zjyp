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
	
	var qwdzMain = new Vue({
		el: '.qwdzMain',
		data: {
			firTitle: true,
			secTitle: false,
			thrTitle: false,
			firSubTitle: true,
			secSubTtile: false,
			thiSubTitle: false,
			fouSubTitle: false,
			fiveSubTitle: false,
			sixSubTitle: false,
			name: '',
			phone: ''
		},
		mounted: function mounted() {},
		methods: {
			firTitleClick: function firTitleClick() {
				this.firTitle = true;
				this.secTitle = false;
				this.thrTitle = false;
			},
			secTitleClick: function secTitleClick() {
				this.firTitle = false;
				this.secTitle = true;
				this.thrTitle = false;
			},
			thrTitleClick: function thrTitleClick() {
				this.firTitle = false;
				this.secTitle = false;
				this.thrTitle = true;
			},
			firSubTitleClick: function firSubTitleClick() {
				this.firSubTitle = true;
				this.secSubTtile = false;
				this.thiSubTitle = false;
				this.fouSubTitle = false;
				this.fiveSubTitle = false;
				this.sixSubTitle = false;
			},
			secSubTtileClick: function secSubTtileClick() {
				this.firSubTitle = false;
				this.secSubTtile = true;
				this.thiSubTitle = false;
				this.fouSubTitle = false;
				this.fiveSubTitle = false;
				this.sixSubTitle = false;
			},
			thiSubTitleClick: function thiSubTitleClick() {
				this.firSubTitle = false;
				this.secSubTtile = false;
				this.thiSubTitle = true;
				this.fouSubTitle = false;
				this.fiveSubTitle = false;
				this.sixSubTitle = false;
			},
			fouSubTitleClick: function fouSubTitleClick() {
				this.firSubTitle = false;
				this.secSubTtile = false;
				this.thiSubTitle = false;
				this.fouSubTitle = true;
				this.fiveSubTitle = false;
				this.sixSubTitle = false;
			},
			fiveSubTitleClick: function fiveSubTitleClick() {
				this.firSubTitle = false;
				this.secSubTtile = false;
				this.thiSubTitle = false;
				this.fouSubTitle = false;
				this.fiveSubTitle = true;
				this.sixSubTitle = false;
			},
			sixSubTitleClick: function sixSubTitleClick() {
				this.firSubTitle = false;
				this.secSubTtile = false;
				this.thiSubTitle = false;
				this.fouSubTitle = false;
				this.fiveSubTitle = false;
				this.sixSubTitle = true;
			},
			addCustomizationInfo: function addCustomizationInfo() {
				// 保存定制信息
				this.$http.post('http://localhost:8083/zujahome-main/custom/addCustomizationInfo', {
					name: this.name,
					phone: this.phone
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					alert(data.body.data);
					// 保存成功清除信息
					if (data.body.status == '200') {
						this.name = '';
						this.phone = '';
					}
				}, function (a) {
					console.log('请求错误 ');
				});
			}
		}
	});
	
	$(function () {
		// 全屋定制
		$('.toPage a').css('color', '#333');
		$('.toPage .qwdz a').css('color', '#cd2f1d');
	
		// 首页banner轮播
		var mySwiper = new Swiper('.swiper-container', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=qwdz.js.map