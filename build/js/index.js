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
	
	var indexPage = new Vue({
		el: '.indexPage',
		data: {
			accordingLayout: true, // 按户型
			accordingStyles: false, // 按风格
			accordingFunctions: false, // 按功能
			hotSellersGoods: [// 热卖推荐
			{
				imgUrl: 'https://gd2.alicdn.com/imgextra/i2/2433295359/TB2ZA7xb21TBuNjy0FjXXajyXXa_!!2433295359.jpg_400x400.jpg_.webp'
			}, {
				imgUrl: 'https://gd3.alicdn.com/imgextra/i3/2275377373/TB2xjjLaBsmBKNjSZFsXXaXSVXa_!!2275377373.jpg_400x400.jpg_.webp'
			}],
			freeDecorationPlan: false, // 装修方案弹框
			freeName: '',
			freePhone: '',
			hotGoodsCat: [], // 热门商品分类
			hotGoods: [], // 热门商品
			ypzpGoodsList: [], // 优品宅配列表
			tcGoodsList: [], // 套餐列表
			zjLifeList: [] },
		// 筑家生活家列表
		mounted: function mounted() {
			// 商品分类接口
			/*this.$http.post('http://localhost:8083/zujahome-main/item/showItemClassifyList', {}, {
	  	headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
	  		'Content-Type': 'application/x-www-form-urlencoded'
	  	},
	  	emulateJSON: true
	  }).then(function(data) {
	  	console.log(JSON.parse(JSON.parse(data.body.data).rows[0].cat_info));
	  }, function(a) {
	  	console.log('请求错误 ')
	  });*/
	
			// 展示热门推荐分类列表
			this.$http.post('http://localhost:8083/zujahome-main/index/showHotGoodsCat', {}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				this.hotGoodsCat = data.body.data; // 热门商品
	
				this.showHotGoods(this.hotGoodsCat[0].id); // 请求热卖商品列表，默认请求第一个热卖商品推荐
			}, function (a) {
				console.log('请求错误 ');
			});
	
			// 展示优品宅配
			this.$http.post('http://localhost:8083/zujahome-main/index/showIndexZujaYoupin', {}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				this.ypzpGoodsList = data.body.data;
			}, function (a) {
				console.log('请求错误 ');
			});
	
			// 展示套餐列表
			this.$http.post('http://localhost:8083/zujahome-main/index/showIndexZujaTaocan', {}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				this.tcGoodsList = data.body.data;
			}, function (a) {
				console.log('请求错误 ');
			});
	
			// 展示筑家生活家
			this.$http.post('http://localhost:8083/zujahome-main/index/showIndexLifeHome', {}, {
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				this.zjLifeList = data.body.data;
			}, function (a) {
				console.log('请求错误 ');
			});
		},
		methods: {
			showHotGoods: function showHotGoods(id) {
				// 展示热门商品
				this.$http.post('http://localhost:8083/zujahome-main/index/showHotGoods', {
					hotCatId: id
				}, {
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.hotGoods = data.body.data; // 热门商品
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			layoutClick: function layoutClick() {
				// 按户型点击
				this.accordingLayout = true;
				this.accordingStyles = false;
				this.accordingFunctions = false;
			},
			stylesClick: function stylesClick() {
				// 按风格点击
				this.accordingLayout = false;
				this.accordingStyles = true;
				this.accordingFunctions = false;
			},
			funsClick: function funsClick() {
				// 按功能点击
				this.accordingLayout = false;
				this.accordingStyles = false;
				this.accordingFunctions = true;
			},
			receivePlan: function receivePlan(val, who) {
				// 装修方案点击领取
				// 设置遮罩层高度
				setTimeout(function () {
					$('.mask').css({
						'width': $(document).width() + 'px',
						'height': document.body.scrollHeight + 'px'
					});
				}, 10);
	
				if (who == '1') {
					// 点击立即领取按钮
					this.$http.post('http://localhost:8083/zujahome-main/other/drawFree', {
						name: this.freeName,
						phone: this.freePhone,
						typeId: '2' // 1 预约免费设计 2 领取装修方案 3 体验馆预约 4 筑家优品活动报名
					}, {
						headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						emulateJSON: true
					}).then(function (data) {
						if (data.body.status == '200') {
							alert('领取成功');
							this.freeDecorationPlan = false;
						} else {
							alert(data.body.msg);
						}
					}, function (a) {
						console.log('请求错误 ');
					});
				} else if (who == '0') {
					this.freeDecorationPlan = val;
					this.freeName = '';
					this.freePhone = '';
				} else {
					this.freeDecorationPlan = val;
				}
			}
		}
	});
	
	Vue.http.options.emulateJSON = true;
	
	$(function () {
		// 首页banner轮播
		var swiper = new Swiper('.swiper-container', {
			autoplay: { // 自动播放设置
				delay: 1500,
				stopOnLastSlide: true
			},
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true }
		});
	
		// 首页
		//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
		$('.toPage a').css('color', '#333');
		$('.toPage .index a').css('color', '#cd2f1d');
	
		// 热卖推荐默认选中第一个
		$('.hotChoseBtn li').first().css({
			'background': '#cd2f1d',
			'border-radius': '1rem',
			'color': '#fff'
		});
	
		// 热卖推荐点击样式切换
		$('.hotChoseBtn li').on('click', function () {
			$('.hotChoseBtn li').css({
				'background': '#fff',
				'color': '#333'
			});
			$(this).css({
				'background': '#cd2f1d',
				'border-radius': '1rem',
				'color': '#fff'
			});
		});
	});

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map