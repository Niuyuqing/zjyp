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
			// 地址栏参数
			cid: '',
			cname: '',
			parentname: '',
			ancestorname: '',
			ancestorClassify: '', // 祖先分类名称(家具馆)
	
			filterLabelNameStr: [], // 筛选条件文本
			filterLabelIdStr: [], // 筛选条件id
	
			choseLabelArr: [], // 所有筛选条件数组
			choseLabelName: [], // 选中的筛选条件
			showGoodsListArr: [], // 商品列表
			showCityLabel: false,
			showStyleLabel: false,
			colligate: true, // 综合
			salesVolume: false, // 销量
			priceBtnDown1: true, // 价格降序（默认）
			priceBtnDown2: false, // 价格降序（选中）
			priceBtnUp1: false, // 价格升序（默认）
			priceBtnUp2: false, // 价格升序（选中）
			popularity: false, // 人气
			totalNum: 0, // 总页数
			nowPageNum: 0 },
		// 当前页
		mounted: function mounted() {
			// 获取地址栏参数
			this.cid = this.getUrlParam('cid');
			this.cname = this.getUrlParam('cname');
			this.parentname = this.getUrlParam('parentname');
			this.ancestorname = this.getUrlParam('ancestorname');
			if (this.getUrlParam('label')) {
				this.filterLabelIdStr = this.getUrlParam('label').split(',');
			}
			if (this.getUrlParam('labelname')) {
				// 筛选文本
				this.filterLabelNameStr = this.getUrlParam('labelname').split(',');
			}
	
			// 家具馆
			if (this.getUrlParam('ancestorname')) {
				this.ancestorClassify = this.getUrlParam('ancestorname');
			};
	
			// 展示商品列表,展示商品筛选列表
			if (this.filterLabelIdStr == '' || this.filterLabelIdStr == null) {
				this.showGoodsList('cat_id-' + this.getUrlParam('cid'), 'sort_order');
				this.goodsFilterList('cat_id-' + this.getUrlParam('cid'));
			} else {
				this.showGoodsList(this.filterLabelIdStr + ',cat_id-' + this.getUrlParam('cid'), 'sort_order');
				this.goodsFilterList(this.filterLabelIdStr + ',cat_id-' + this.getUrlParam('cid'));
			}
		},
		methods: {
			// 展示商品列表
			showGoodsList: function showGoodsList(inputStr, sortVal) {
				this.$http.post('http://localhost:8083/zujahome-main/item/showGoodsList', {
					inputStr: inputStr,
					pageNum: this.nowPageNum,
					rowNum: 20,
					sortVal: sortVal
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					//console.log(JSON.parse(JSON.parse(data.body.msg).rows[0].solr_param_info));
					this.showGoodsListArr = JSON.parse(data.body.data.rows[0].solr_param_info);
					this.totalNum = Math.ceil(JSON.parse(data.body.data.rows[0].total) / 20) - 1;
					console.log(JSON.parse(data.body.data.rows[0].solr_param_info));
	
					// 翻页器
					$('.paging').pagination({
						pageCount: this.totalNum,
						coping: true,
						mode: 'fixed',
						activeCls: 'activeCls',
						homePage: '首页',
						endPage: '尾页',
						prevContent: '<img src="./images/prevPage.png"/>',
						nextContent: '<img src="./images/nextPage.png"/>',
						callback: function callback(api) {
							this.nowPageNum = api.getCurrent();
	
							spsxMain.$http.post('http://localhost:8083/zujahome-main/item/showGoodsList', {
								inputStr: 'cat_id-' + spsxMain.getUrlParam('cid'),
								pageNum: this.nowPageNum,
								rowNum: 20
							}, { // 没有参数也要放空的大括号
								headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								emulateJSON: true
							}).then(function (data) {
								spsxMain.showGoodsListArr = JSON.parse(data.body.data.rows[0].solr_param_info);
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
			// 展示商品筛选列表
			goodsFilterList: function goodsFilterList(inputStr) {
				this.$http.post('http://localhost:8083/zujahome-main/item/showItemFilterList', {
					inputStr: inputStr
				}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function (data) {
					this.choseLabelArr = JSON.parse(JSON.parse(data.body.data).rows[0].attr_value_str);
	
					// 某些筛选项不需要有下拉图标
					setTimeout(function () {
						for (var i = 0; i < $('.chooseWrap .options').length; i++) {
							if ($('.chooseWrap .options').eq(i).height() <= 2.66667 * 15) {
								// 注意，这里千万不要remove掉，否则后面的点击eq的时候，数量就是不匹配的
								$('.chooseWrap .options').eq(i).next().css('opacity', '0');
							}
						}
					}, 100);
				}, function (a) {
					console.log('请求错误 ');
				});
			},
			closeLabel: function closeLabel(e) {
				// 删除当前选中的小标签
				$(e.target).parent().remove();
				this.filterLabelNameStr.splice($(e.target).data('index'), 1);
				this.filterLabelIdStr.splice($(e.target).data('index'), 1);
				window.location.href = 'spsx.html?cid=' + this.cid + '&cname=' + this.cname + '&parentname=' + this.parentname + '&ancestorname=' + this.ancestorname + '&label=' + this.filterLabelIdStr.toString() + '&labelname=' + this.filterLabelNameStr.toString();
			},
			addLabel: function addLabel(e) {
				// 添加筛选项
				this.choseLabelName.push({
					'name': $(e.target).text(),
					'id': $(e.target).data('id')
				});
	
				// 判断一下，如果有标签才进行切割
				if (this.getUrlParam('label')) {
					this.filterLabelIdStr = this.filterLabelIdStr.toString();
					this.filterLabelIdStr = this.filterLabelIdStr.split(',');
				}
	
				if (this.getUrlParam('labelname')) {
					this.filterLabelNameStr = this.filterLabelNameStr.toString();
					this.filterLabelNameStr = this.filterLabelNameStr.split(',');
				}
	
				this.filterLabelIdStr.push($(e.target).data('id'));
				this.filterLabelNameStr.push($(e.target).text());
	
				window.location.href = 'spsx.html?cid=' + this.cid + '&cname=' + this.cname + '&parentname=' + this.parentname + '&ancestorname=' + this.ancestorname + '&label=' + this.filterLabelIdStr.toString() + '&labelname=' + this.filterLabelNameStr.toString();
			},
			showCityLabelClick: function showCityLabelClick(i, e) {
				// 点击筛选条件更多按钮
				if ($(e.target).data('type') == '1') {
					$(e.target).data('type', '2');
					$('.filterIcon').eq(i).prop('src', 'images/retract.png');
					$('.chooseArea .city').eq(i).css({
						'overflow': 'inherit',
						'height': 'auto'
					});
				} else if ($(e.target).data('type') == '2') {
					$(e.target).data('type', '1');
					$('.filterIcon').eq(i).prop('src', 'images/open.png');
					$('.chooseArea .city').eq(i).css({
						'overflow': 'hidden',
						'height': '2.666666rem'
					});
				}
			},
			toGoodsDetail: function toGoodsDetail(id) {
				// 点击商品跳转商品详情页面
				window.open('spxq.html?goodsId=' + id);
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
				this.popularity = false; // 人气
	
				//价格
				this.priceBtnDown1 = true;
				this.priceBtnDown2 = false;
				this.priceBtnUp1 = false;
				this.priceBtnUp2 = false;
	
				// 展示商品列表,展示商品筛选列表
				if (this.filterLabelIdStr == '' || this.filterLabelIdStr == null) {
					this.showGoodsList('cat_id-' + this.getUrlParam('cid'), 'sort_order');
				} else {
					this.showGoodsList(this.filterLabelIdStr + ',cat_id-' + this.getUrlParam('cid'), 'sort_order');
				}
			},
			salesVolumeClick: function salesVolumeClick() {
				// 点击销量
				this.colligate = false; // 综合
				this.salesVolume = true; // 销量
				this.popularity = false; // 人气
	
				//价格
				this.priceBtnDown1 = true;
				this.priceBtnDown2 = false;
				this.priceBtnUp1 = false;
				this.priceBtnUp2 = false;
	
				// 展示商品列表,展示商品筛选列表
				if (this.filterLabelIdStr == '' || this.filterLabelIdStr == null) {
					this.showGoodsList('cat_id-' + this.getUrlParam('cid'), 's2');
				} else {
					this.showGoodsList(this.filterLabelIdStr + ',cat_id-' + this.getUrlParam('cid'), 's2');
				}
			},
			priceBtnClick: function priceBtnClick(type) {
				// 点击价格
				console.log(type);
				if (type == 1) {
					// 默认降序
					this.priceBtnDown1 = false;
					this.priceBtnDown2 = false;
					this.priceBtnUp1 = false;
					this.priceBtnUp2 = true;
	
					// 展示商品列表,展示商品筛选列表
					if (this.filterLabelIdStr == '' || this.filterLabelIdStr == null) {
						this.showGoodsList('cat_id-' + this.getUrlParam('cid'), 'p2');
					} else {
						this.showGoodsList(this.filterLabelIdStr + ',cat_id-' + this.getUrlParam('cid'), 'p2');
					}
				} else if (type == 2) {
					// 降序选中状态
					this.priceBtnDown1 = false;
					this.priceBtnDown2 = false;
					this.priceBtnUp1 = false;
					this.priceBtnUp2 = true;
	
					// 展示商品列表,展示商品筛选列表
					if (this.filterLabelIdStr == '' || this.filterLabelIdStr == null) {
						this.showGoodsList('cat_id-' + this.getUrlParam('cid'), 'p2');
					} else {
						this.showGoodsList(this.filterLabelIdStr + ',cat_id-' + this.getUrlParam('cid'), 'p2');
					}
				} else if (type == 3) {
					// 默认升序
					this.priceBtnDown1 = false;
					this.priceBtnDown2 = false;
					this.priceBtnUp1 = false;
					this.priceBtnUp2 = true;
				} else if (type == 4) {
					// 升序选中状态
					this.priceBtnDown1 = false;
					this.priceBtnDown2 = true;
					this.priceBtnUp1 = false;
					this.priceBtnUp2 = false;
	
					// 展示商品列表,展示商品筛选列表
					if (this.filterLabelIdStr == '' || this.filterLabelIdStr == null) {
						this.showGoodsList('cat_id-' + this.getUrlParam('cid'), 'p1');
					} else {
						this.showGoodsList(this.filterLabelIdStr + ',cat_id-' + this.getUrlParam('cid'), 'p1');
					}
				}
				this.colligate = false; // 综合
				this.salesVolume = false; // 销量
				this.popularity = false; // 人气
			},
			/*popularityClick: function() { // 点击人气
	  	this.colligate = false; // 综合
	  	this.salesVolume = false; // 销量
	  	this.priceBtn = false; // 价格
	  	this.popularity = true; // 人气
	  },*/
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
	
	var guessLove = new Vue({
		el: '.guessLove',
		data: {
			guessYouLikeList: []
		},
		mounted: function mounted() {
			// 猜你喜欢
			this.$http.post('http://localhost:8083/zujahome-main/other/guessYouLike', {}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				this.guessYouLikeList = data.body.data;
				console.log(this.guessYouLikeList);
			}, function (a) {
				console.log('请求错误 ');
			});
		},
		methods: {}
	});

/***/ })
/******/ ]);
//# sourceMappingURL=spsx.js.map