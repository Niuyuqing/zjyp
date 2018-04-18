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
			choseLabelArr: [{ name: '北京' }, { name: '深圳' }, { name: '不限' }],
			cityLabelArr: [{ name: '北京' }, { name: '韩国' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }, { name: '北京' }, { name: '韩国' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }, { name: '北京' }, { name: '韩国' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }, { name: '北京' }, { name: '韩国' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }],
			showCityLabel: false,
			showStyleLabel: false
		},
		mounted: function mounted() {},
		methods: {
			closeLabel: function closeLabel(e) {
				// 删除当前选中的小标签
				$(e.target).parent().remove();
			},
			addLabel: function addLabel(e) {
				// 添加筛选项
				this.choseLabelArr.push({
					'name': $(e.target).text()
				});
			},
			showCityLabelClick: function showCityLabelClick() {
				this.showCityLabel = !this.showCityLabel;
				console.log(this.showCityLabel);
				if (this.showCityLabel) {
					$('.chooseArea .city').css({
						'overflow': 'inherit',
						'height': 'auto'
					});
				} else {
					$('.chooseArea .city').css({
						'overflow': 'hidden',
						'height': '2.666666rem'
					});
				}
			},
			showStyleLabelClick: function showStyleLabelClick() {
				this.showStyleLabel = !this.showStyleLabel;
				if (this.showStyleLabel) {
					$('.chooseArea .styles').css({
						'overflow': 'inherit',
						'height': 'auto'
					});
				} else {
					$('.chooseArea .styles').css({
						'overflow': 'hidden',
						'height': '2.666666rem'
					});
				}
			}
		}
	});
	
	$(function () {
		// 配套方案
		$('.toPage a').css('color', '#333');
		$('.toPage .zjh a').css('color', '#cd2f1d');
	
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
				console.log(api.getCurrent());
			}
		});
	
		// 设置翻页距左边距离
		$('.pagingWrap .paging').css({
			'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=zjh.js.map