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
	
	var spsxMain = new Vue({
		el: '.spsxMain',
		data: {
			choseLabelArr: [{ name: '北京' }, { name: '深圳' }, { name: '不限' }],
			cityLabelArr: [{ name: '北京' }, { name: '韩国' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }, { name: '北京' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }, { name: '北京' }, { name: '韩国' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }, { name: '北京' }, { name: '韩国' }, { name: '日本' }, { name: '天津' }, { name: '深圳' }, { name: '广东' }],
			showCityLabel: false,
			showStyleLabel: false,
			colligate: true, // 综合
			salesVolume: false, // 销量
			priceBtn: false, // 价格
			popularity: false },
		// 人气
		mounted: function mounted() {
			// 展示商品详情
			/*this.$http.post('http://localhost:8092/item/showItem/'+this.getUrlParam('cid'), {} ,{   // 没有参数也要放空的大括号
	            headers: {   // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
	                'Content-Type': 'application/x-www-form-urlencoded'
	            },
	            emulateJSON: true
	        }).then(function(data) {
	        	console.log(JSON.parse(data.body.msg).rows[0]);
	            console.log(JSON.parse(JSON.parse(data.body.msg).rows[0].attr));
	            console.log(JSON.parse(JSON.parse(data.body.msg).rows[0].attr_detail));
	        }, function(a) {
	            console.log('请求错误 ')
	        });*/
	
			this.$http.post('http://localhost:8092/item/showItemFilterList', {
				inputStr: this.getUrlParam('cid')
			}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				console.log(JSON.parse(data.body.msg).rows[0]);
				console.log(JSON.parse(JSON.parse(data.body.msg).rows[0].attr));
				console.log(JSON.parse(JSON.parse(data.body.msg).rows[0].attr_detail));
			}, function (a) {
				console.log('请求错误 ');
			});
		},
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
			},
			colligateClick: function colligateClick() {
				// 点击综合
				this.colligate = true; // 综合
				this.salesVolume = false; // 销量
				this.priceBtn = false; // 价格
				this.popularity = false; // 人气
			},
			salesVolumeClick: function salesVolumeClick() {
				// 点击销量
				this.colligate = false; // 综合
				this.salesVolume = true; // 销量
				this.priceBtn = false; // 价格
				this.popularity = false; // 人气
			},
			priceBtnClick: function priceBtnClick() {
				// 点击价格
				this.colligate = false; // 综合
				this.salesVolume = false; // 销量
				this.priceBtn = true; // 价格
				this.popularity = false; // 人气
			},
			popularityClick: function popularityClick() {
				// 点击人气
				this.colligate = false; // 综合
				this.salesVolume = false; // 销量
				this.priceBtn = false; // 价格
				this.popularity = true; // 人气
			},
			getUrlParam: function getUrlParam(key) {
				// 地址栏中文也可以正常获取
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
	
	$(function () {
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
//# sourceMappingURL=spsx.js.map