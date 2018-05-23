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

	// 购物车
	'use strict';
	
	var shoppingCartMain = new Vue({
		el: '.shoppingCartMain',
		data: {
			goodsSelect: false,
			openOrTakeup: true, // 展开
			shoppingCartData: [], // 购物车列表
			attrInfo: [], // 商品属性
			newAttrInfo: []
		},
		mounted: function mounted() {
			// 添加购物车接口
			this.$http.post('http://localhost:8083/zujahome-main/cart/cartList', {}, { // 没有参数也要放空的大括号
				headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				emulateJSON: true
			}).then(function (data) {
				/*var result = [
	   	{
	   		'data' : '"{"now_time":"1526984545","main_pic":"2","parent_name":"卧室","suit_detail":"[]","sale_unit":"0","device_type":"2","brand_logo":"images/201607/1469568467705945352.jpg","top_cat_url":"/category-woshi/","child_name":"","water_mark":"","cat_url":"/category-dougui/","is_custom":"0","rqdp_resource_info":"","predict_delete_time_1":"","goods_sort":"1","goods_name":"客厅家具斗柜 实木餐边斗柜 北欧格调 创意现代简约碗柜 酒柜茶水柜 储物柜子","original_img":"http://image.youjiagou.com/images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg","can_write":"1","shop_detail":"[{\"shop_name\":\"天伦之乐\",\"shop_link\":\"/shop/221/\"}]","Icon_Pic":"","goods_id":"16577","is_report_decimal_1":"","brand_name":"天伦之乐","is_report_decimal_2":"","goods_desc":"<img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_01(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_02(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_21(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_22(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_04(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_05(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_06(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_07(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_08(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_09(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_10(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_11(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_12(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_13(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_14(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_15(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_16(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_17(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_18(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_19(1).jpg\" alt=\"\">","brand_id":"220","shop_id":"221","parent_cat_url":"/category-woshi/","shop_price_1":"1100.00","user_id":"","goods_thumb":"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg","sercice_info":"免费提供“上门量房、家具配套设计、全屋家私估价”等全套定制服务！\r\n","content_info":"[{\"content\":\"\"}]","pic_url":"[{\"img_url\":\"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg\",\"thumb_url\":\"images/s-20160729/48/zip@w88_h66/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg\",\"img_original\":\"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg\"},{\"img_url\":\"images/s-20160729/24/77412723b1d09f2625c6add3e3f044a3.jpeg\",\"thumb_url\":\"images/s-20160729/24/zip@w88_h66/77412723b1d09f2625c6add3e3f044a3.jpeg\",\"img_original\":\"images/s-20160729/24/77412723b1d09f2625c6add3e3f044a3.jpeg\"}]","city_id":"0","goods_standards_url":"http://app.youjiagou.com/html/goodsattr_pad.html?id=16577","selling_name":"","primary_cat_name":"家具馆","suit_popularity":"[]","attr_detail":"[{\"attr_name\":\"品牌\",\"attr_value\":\"天伦之乐\",\"sort_order\":\"1\"},{\"attr_name\":\"型号\",\"attr_value\":\"GD-N001\",\"sort_order\":\"2\"},{\"attr_name\":\"风格\",\"attr_value\":\"北欧\",\"sort_order\":\"3\"},{\"attr_name\":\"包件\",\"attr_value\":\"2件\",\"sort_order\":\"4\"},{\"attr_name\":\"体积\",\"attr_value\":\"0.300\",\"sort_order\":\"5\"},{\"attr_name\":\"产地\",\"attr_value\":\"广东\",\"sort_order\":\"6\"},{\"attr_name\":\"产品尺寸\",\"attr_value\":\"长800*宽300*高988mm\",\"sort_order\":\"7\"},{\"attr_name\":\"产品包含\",\"attr_value\":\"五斗柜\",\"sort_order\":\"8\"},{\"attr_name\":\"是否可定制\",\"attr_value\":\"否\",\"sort_order\":\"9\"},{\"attr_name\":\"材质\",\"attr_value\":\"多层实木+中纤密度板+金属桌脚+无拉手按压式弹冲抽屉\",\"sort_order\":\"10\"},{\"attr_name\":\"生产周期\",\"attr_value\":\"10\",\"sort_order\":\"11\"},{\"attr_name\":\"温馨提示\",\"attr_value\":\"无拉手按压式弹冲抽屉\",\"sort_order\":\"12\"},{\"attr_name\":\"备注\",\"attr_value\":\"拍照设备、环境灯光及显示器等因素可能会导致网站图片与实物颜色存在偏差，本站不支持色差原因退换货，下单前请确认好实物颜色！\",\"sort_order\":\"13\"}]","city_name":"全国","is_report_decimal":"0","cat_pinyin":"dougui","cat_id":"27","brand_link":"/category-dougui/list-90_10627/","warm_prompt":"无拉手按压式弹冲抽屉","attr":"[{\"attr_name\":\"品牌\",\"attr_value\":\"天伦之乐\",\"sort_order\":\"1\"},{\"attr_name\":\"型号\",\"attr_value\":\"GD-N001\",\"sort_order\":\"2\"},{\"attr_name\":\"风格\",\"attr_value\":\"北欧\",\"sort_order\":\"3\"},{\"attr_name\":\"包件\",\"attr_value\":\"2件\",\"sort_order\":\"4\"},{\"attr_name\":\"体积\",\"attr_value\":\"0.300\",\"sort_order\":\"5\"},{\"attr_name\":\"产地\",\"attr_value\":\"广东\",\"sort_order\":\"6\"},{\"attr_name\":\"产品尺寸\",\"attr_value\":\"长800*宽300*高988mm\",\"sort_order\":\"7\"},{\"attr_name\":\"产品包含\",\"attr_value\":\"五斗柜\",\"sort_order\":\"8\"},{\"attr_name\":\"是否可定制\",\"attr_value\":\"否\",\"sort_order\":\"9\"}]","商品模型id":"2923","resource_info":"[{\"r…acec65b\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171031/27/3cee9b532068f97df67eae189864b66b.jpg\\\",\\\"task_title\\\":\\\"次卧\\\",\\\"task_id\\\":\\\"98558\\\",\\\"template_sn\\\":\\\"3a10265a021147f9badee4e8a5f7afbf\\\"}]\",\"session_id\":\"63479\",\"task_id\":\"98557\",\"cover_img\":\"images/s-20171031/96/f6c8aa57c1c1451682909b03da1534f8.jpg\",\"goods_id\":\"16577\"},{\"resource_id\":\"75036\",\"resource_title\":\"广西 欧景\",\"resource_img\":\"images/s-20171018/96/b7368000499b6fbad11dc9e4dc08b373.jpg\",\"city_name\":\"百色\",\"building_name\":\"欧景\",\"vtour\":\"http://m.youjiagou.com/3d/s-20171018/38/panorama/7ca94d828dc844281f411deaa0a80625/vtour/tour.html\",\"vtour_v\":\"/3d/s-20171018/38/panorama/7ca94d828dc844281f411deaa0a80625/vtour/tour.html\",\"template_json\":\"[{\\\"vtour_cover\\\":\\\"images/s-20171018/97/872f67aac37b5d347e02a2cf60d27989.jpg\\\",\\\"task_title\\\":\\\"次卧\\\",\\\"task_id\\\":\\\"93236\\\",\\\"template_sn\\\":\\\"b0e0d4ce0c4342e7b5e82efc5b2ced7c\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/67/d2fc296fdad205567c367804dd440689.jpg\\\",\\\"task_title\\\":\\\"主卧\\\",\\\"task_id\\\":\\\"93235\\\",\\\"template_sn\\\":\\\"2ac23ac79a9e4b79ab03fb949d7540cb\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/45/1015faff31fa63dba23567098a6a50df.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"93234\\\",\\\"template_sn\\\":\\\"626aea5fe24b465c81dac3b951dd5494\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/69/c25285d826f11b8f024f6f77a99147a5.jpg\\\",\\\"task_title\\\":\\\"卫生间\\\",\\\"task_id\\\":\\\"93237\\\",\\\"template_sn\\\":\\\"c897792fafe741f8a4547650f9a03af3\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/21/b7368000499b6fbad11dc9e4dc08b373.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"93233\\\",\\\"template_sn\\\":\\\"626aea5fe24b465c81dac3b951dd5494\\\"}]\",\"session_id\":\"60750\",\"task_id\":\"93235\",\"cover_img\":\"images/s-20171018/67/d2fc296fdad205567c367804dd440689.jpg\",\"goods_id\":\"16577\"},{\"resource_id\":\"43327\",\"resource_title\":\"北欧风照片背景墙客厅装修案例\",\"resource_img\":\"images/s-20170626/82/87ab0b79d60b483555b31e6e5ce95898.jpg\",\"city_name\":\"成都\",\"building_name\":\"一品CG\",\"vtour\":\"http://m.youjiagou.com/3d/s-20170626/32/panorama/f81bebe735497cb984c334c3cc075b7e/vtour/tour.html\",\"vtour_v\":\"/3d/s-20170626/32/panorama/f81bebe735497cb984c334c3cc075b7e/vtour/tour.html\",\"template_json\":\"[{\\\"vtour_cover\\\":\\\"images/s-20170626/1/87ab0b79d60b483555b31e6e5ce95898.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"45694\\\",\\\"template_sn\\\":\\\"cb7bc2449b924496a2bc2c167ac6ffb2\\\"}]\",\"session_id\":\"32744\",\"task_id\":\"45694\",\"cover_img\":\"images/s-20170626/1/87ab0b79d60b483555b31e6e5ce95898.jpg\",\"goods_id\":\"16577\"},{\"resource_id\":\"16773\",\"resource_title\":\"欧式嘉和城塞纳右岸复式整装案例\",\"resource_img\":\"images/s-20170619/21/445f3600e9bbe4916e2fb8afd69c147b.jpg\",\"city_name\":\"南宁\",\"building_name\":\"嘉和城塞纳右岸\",\"vtour\":\"http://m.youjiagou.com/3d/s-20170418/89/panorama/1d0461455fdd3b36fc5e68d8b98cc290/vtour/tour.html\",\"vtour_v\":\"/3d/s-20170418/89/panorama/1d0461455fdd3b36fc5e68d8b98cc290/vtour/tour.html\",\"template_json\":\"[{\\\"vtour_cover\\\":\\\"images/s-20170627/72/445f3600e9bbe4916e2fb8afd69c147b.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"18479\\\",\\\"template_sn\\\":\\\"\\\"}]\",\"session_id\":\"13718\",\"task_id\":\"18479\",\"cover_img\":\"images/s-20170627/72/445f3600e9bbe4916e2fb8afd69c147b.jpg\",\"goods_id\":\"16577\"}]","shop_price":"1100","group_attr_info":"{\"attr_info\":[\"[{\\\"attr_name\\\":\\\"产品包含\\\",\\\"attr_info\\\":[{\\\"attr_value\\\":\\\"五斗柜\\\",\\\"goods_id\\\":\\\"16577\\\",\\\"url\\\":\\\"/category-dougui/goods-16577.html\\\",\\\"is_select\\\":\\\"1\\\"}]}]\"]}","cat_name":"斗柜","afterservice":"[{\"desc1\":\"1、贴心售后服务，全方位保障您的权益。\\r\\n\"},{\"desc1\":\"2、便捷提交：ipad门店宝----个人中心——我的需求----售后问题最新进度表”可查看沟通售后进度\"},{\"desc1\":\"2、售后时效：买家提交售后，卖家会在两个工作时内尽快回复\"}]","is_3Dmode":"1","is_buildinginventory":"0","custom_type_name":"否","goods_sn":"GD-N001","quality_detail":"{\"quality_score\":5,\"quality_describe\":\"品质一流\",\"delivery_speed_score\":5,\"delivery_speed_describe\":\"极速\"}","product_type":"3","is_on_sale":"1","group_id":"0","desc_top_info":"[{\"img_url\":\"images/s-20170810/26/aee0ee453971f7baf6a9593fa1e2280d.jpeg?from=ad\",\"link_url\":\"http://www.youjiagou.com/taocan/jiancai/\",\"sort_order\":\"1\"},{\"img_url\":\"images/s-20160802/52/924e523280cdbf53661edbbcd08801ed.jpeg\",\"link_url\":\"http://www.youjiagou.com/act/dingzhi/pcdz.html\",\"sort_order\":\"2\"}]","sercice_promise":"[{\"desc1\":\"售后保障\",\"flag\":\"0\",\"url\":\"/about-aftersale/\",\"sort_order\":\"1\"},{\"desc1\":\"现货七天闪发\",\"flag\":\"1\",\"url\":\"\",\"sort_order\":\"2\"}]","goods_desc_url":"http://app.youjiagou.com/html/goodsdetail_pad.html?id=16577","sold_info_url":"http://app.youjiagou.com/html/solded_pad.html?id=16577","goods_img":"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg","selling_content":""}"',
	   		'itemId': "16577",
	   		'itemNum': 6,
	   		'type': "1"
	   	},
	   	{
	   		'data' : '"{"now_time":"1526984545","main_pic":"2","parent_name":"卧室","suit_detail":"[]","sale_unit":"0","device_type":"2","brand_logo":"images/201607/1469568467705945352.jpg","top_cat_url":"/category-woshi/","child_name":"","water_mark":"","cat_url":"/category-dougui/","is_custom":"0","rqdp_resource_info":"","predict_delete_time_1":"","goods_sort":"1","goods_name":"客厅家具斗柜 实木餐边斗柜 北欧格调 创意现代简约碗柜 酒柜茶水柜 储物柜子","original_img":"http://image.youjiagou.com/images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg","can_write":"1","shop_detail":"[{\"shop_name\":\"天伦之乐\",\"shop_link\":\"/shop/221/\"}]","Icon_Pic":"","goods_id":"16577","is_report_decimal_1":"","brand_name":"天伦之乐","is_report_decimal_2":"","goods_desc":"<img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_01(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_02(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_21(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_22(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_04(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_05(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_06(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_07(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_08(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_09(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_10(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_11(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_12(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_13(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_14(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_15(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_16(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_17(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_18(1).jpg\" alt=\"\"><img src=\"/ecshop/images/upload/Image/20170709/1_2米边柜_19(1).jpg\" alt=\"\">","brand_id":"220","shop_id":"221","parent_cat_url":"/category-woshi/","shop_price_1":"1100.00","user_id":"","goods_thumb":"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg","sercice_info":"免费提供“上门量房、家具配套设计、全屋家私估价”等全套定制服务！\r\n","content_info":"[{\"content\":\"\"}]","pic_url":"[{\"img_url\":\"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg\",\"thumb_url\":\"images/s-20160729/48/zip@w88_h66/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg\",\"img_original\":\"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg\"},{\"img_url\":\"images/s-20160729/24/77412723b1d09f2625c6add3e3f044a3.jpeg\",\"thumb_url\":\"images/s-20160729/24/zip@w88_h66/77412723b1d09f2625c6add3e3f044a3.jpeg\",\"img_original\":\"images/s-20160729/24/77412723b1d09f2625c6add3e3f044a3.jpeg\"}]","city_id":"0","goods_standards_url":"http://app.youjiagou.com/html/goodsattr_pad.html?id=16577","selling_name":"","primary_cat_name":"家具馆","suit_popularity":"[]","attr_detail":"[{\"attr_name\":\"品牌\",\"attr_value\":\"天伦之乐\",\"sort_order\":\"1\"},{\"attr_name\":\"型号\",\"attr_value\":\"GD-N001\",\"sort_order\":\"2\"},{\"attr_name\":\"风格\",\"attr_value\":\"北欧\",\"sort_order\":\"3\"},{\"attr_name\":\"包件\",\"attr_value\":\"2件\",\"sort_order\":\"4\"},{\"attr_name\":\"体积\",\"attr_value\":\"0.300\",\"sort_order\":\"5\"},{\"attr_name\":\"产地\",\"attr_value\":\"广东\",\"sort_order\":\"6\"},{\"attr_name\":\"产品尺寸\",\"attr_value\":\"长800*宽300*高988mm\",\"sort_order\":\"7\"},{\"attr_name\":\"产品包含\",\"attr_value\":\"五斗柜\",\"sort_order\":\"8\"},{\"attr_name\":\"是否可定制\",\"attr_value\":\"否\",\"sort_order\":\"9\"},{\"attr_name\":\"材质\",\"attr_value\":\"多层实木+中纤密度板+金属桌脚+无拉手按压式弹冲抽屉\",\"sort_order\":\"10\"},{\"attr_name\":\"生产周期\",\"attr_value\":\"10\",\"sort_order\":\"11\"},{\"attr_name\":\"温馨提示\",\"attr_value\":\"无拉手按压式弹冲抽屉\",\"sort_order\":\"12\"},{\"attr_name\":\"备注\",\"attr_value\":\"拍照设备、环境灯光及显示器等因素可能会导致网站图片与实物颜色存在偏差，本站不支持色差原因退换货，下单前请确认好实物颜色！\",\"sort_order\":\"13\"}]","city_name":"全国","is_report_decimal":"0","cat_pinyin":"dougui","cat_id":"27","brand_link":"/category-dougui/list-90_10627/","warm_prompt":"无拉手按压式弹冲抽屉","attr":"[{\"attr_name\":\"品牌\",\"attr_value\":\"天伦之乐\",\"sort_order\":\"1\"},{\"attr_name\":\"型号\",\"attr_value\":\"GD-N001\",\"sort_order\":\"2\"},{\"attr_name\":\"风格\",\"attr_value\":\"北欧\",\"sort_order\":\"3\"},{\"attr_name\":\"包件\",\"attr_value\":\"2件\",\"sort_order\":\"4\"},{\"attr_name\":\"体积\",\"attr_value\":\"0.300\",\"sort_order\":\"5\"},{\"attr_name\":\"产地\",\"attr_value\":\"广东\",\"sort_order\":\"6\"},{\"attr_name\":\"产品尺寸\",\"attr_value\":\"长800*宽300*高988mm\",\"sort_order\":\"7\"},{\"attr_name\":\"产品包含\",\"attr_value\":\"五斗柜\",\"sort_order\":\"8\"},{\"attr_name\":\"是否可定制\",\"attr_value\":\"否\",\"sort_order\":\"9\"}]","商品模型id":"2923","resource_info":"[{\"r…acec65b\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171031/27/3cee9b532068f97df67eae189864b66b.jpg\\\",\\\"task_title\\\":\\\"次卧\\\",\\\"task_id\\\":\\\"98558\\\",\\\"template_sn\\\":\\\"3a10265a021147f9badee4e8a5f7afbf\\\"}]\",\"session_id\":\"63479\",\"task_id\":\"98557\",\"cover_img\":\"images/s-20171031/96/f6c8aa57c1c1451682909b03da1534f8.jpg\",\"goods_id\":\"16577\"},{\"resource_id\":\"75036\",\"resource_title\":\"广西 欧景\",\"resource_img\":\"images/s-20171018/96/b7368000499b6fbad11dc9e4dc08b373.jpg\",\"city_name\":\"百色\",\"building_name\":\"欧景\",\"vtour\":\"http://m.youjiagou.com/3d/s-20171018/38/panorama/7ca94d828dc844281f411deaa0a80625/vtour/tour.html\",\"vtour_v\":\"/3d/s-20171018/38/panorama/7ca94d828dc844281f411deaa0a80625/vtour/tour.html\",\"template_json\":\"[{\\\"vtour_cover\\\":\\\"images/s-20171018/97/872f67aac37b5d347e02a2cf60d27989.jpg\\\",\\\"task_title\\\":\\\"次卧\\\",\\\"task_id\\\":\\\"93236\\\",\\\"template_sn\\\":\\\"b0e0d4ce0c4342e7b5e82efc5b2ced7c\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/67/d2fc296fdad205567c367804dd440689.jpg\\\",\\\"task_title\\\":\\\"主卧\\\",\\\"task_id\\\":\\\"93235\\\",\\\"template_sn\\\":\\\"2ac23ac79a9e4b79ab03fb949d7540cb\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/45/1015faff31fa63dba23567098a6a50df.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"93234\\\",\\\"template_sn\\\":\\\"626aea5fe24b465c81dac3b951dd5494\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/69/c25285d826f11b8f024f6f77a99147a5.jpg\\\",\\\"task_title\\\":\\\"卫生间\\\",\\\"task_id\\\":\\\"93237\\\",\\\"template_sn\\\":\\\"c897792fafe741f8a4547650f9a03af3\\\"},{\\\"vtour_cover\\\":\\\"images/s-20171018/21/b7368000499b6fbad11dc9e4dc08b373.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"93233\\\",\\\"template_sn\\\":\\\"626aea5fe24b465c81dac3b951dd5494\\\"}]\",\"session_id\":\"60750\",\"task_id\":\"93235\",\"cover_img\":\"images/s-20171018/67/d2fc296fdad205567c367804dd440689.jpg\",\"goods_id\":\"16577\"},{\"resource_id\":\"43327\",\"resource_title\":\"北欧风照片背景墙客厅装修案例\",\"resource_img\":\"images/s-20170626/82/87ab0b79d60b483555b31e6e5ce95898.jpg\",\"city_name\":\"成都\",\"building_name\":\"一品CG\",\"vtour\":\"http://m.youjiagou.com/3d/s-20170626/32/panorama/f81bebe735497cb984c334c3cc075b7e/vtour/tour.html\",\"vtour_v\":\"/3d/s-20170626/32/panorama/f81bebe735497cb984c334c3cc075b7e/vtour/tour.html\",\"template_json\":\"[{\\\"vtour_cover\\\":\\\"images/s-20170626/1/87ab0b79d60b483555b31e6e5ce95898.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"45694\\\",\\\"template_sn\\\":\\\"cb7bc2449b924496a2bc2c167ac6ffb2\\\"}]\",\"session_id\":\"32744\",\"task_id\":\"45694\",\"cover_img\":\"images/s-20170626/1/87ab0b79d60b483555b31e6e5ce95898.jpg\",\"goods_id\":\"16577\"},{\"resource_id\":\"16773\",\"resource_title\":\"欧式嘉和城塞纳右岸复式整装案例\",\"resource_img\":\"images/s-20170619/21/445f3600e9bbe4916e2fb8afd69c147b.jpg\",\"city_name\":\"南宁\",\"building_name\":\"嘉和城塞纳右岸\",\"vtour\":\"http://m.youjiagou.com/3d/s-20170418/89/panorama/1d0461455fdd3b36fc5e68d8b98cc290/vtour/tour.html\",\"vtour_v\":\"/3d/s-20170418/89/panorama/1d0461455fdd3b36fc5e68d8b98cc290/vtour/tour.html\",\"template_json\":\"[{\\\"vtour_cover\\\":\\\"images/s-20170627/72/445f3600e9bbe4916e2fb8afd69c147b.jpg\\\",\\\"task_title\\\":\\\"客餐厅\\\",\\\"task_id\\\":\\\"18479\\\",\\\"template_sn\\\":\\\"\\\"}]\",\"session_id\":\"13718\",\"task_id\":\"18479\",\"cover_img\":\"images/s-20170627/72/445f3600e9bbe4916e2fb8afd69c147b.jpg\",\"goods_id\":\"16577\"}]","shop_price":"1100","group_attr_info":"{\"attr_info\":[\"[{\\\"attr_name\\\":\\\"产品包含\\\",\\\"attr_info\\\":[{\\\"attr_value\\\":\\\"五斗柜\\\",\\\"goods_id\\\":\\\"16577\\\",\\\"url\\\":\\\"/category-dougui/goods-16577.html\\\",\\\"is_select\\\":\\\"1\\\"}]}]\"]}","cat_name":"斗柜","afterservice":"[{\"desc1\":\"1、贴心售后服务，全方位保障您的权益。\\r\\n\"},{\"desc1\":\"2、便捷提交：ipad门店宝----个人中心——我的需求----售后问题最新进度表”可查看沟通售后进度\"},{\"desc1\":\"2、售后时效：买家提交售后，卖家会在两个工作时内尽快回复\"}]","is_3Dmode":"1","is_buildinginventory":"0","custom_type_name":"否","goods_sn":"GD-N001","quality_detail":"{\"quality_score\":5,\"quality_describe\":\"品质一流\",\"delivery_speed_score\":5,\"delivery_speed_describe\":\"极速\"}","product_type":"3","is_on_sale":"1","group_id":"0","desc_top_info":"[{\"img_url\":\"images/s-20170810/26/aee0ee453971f7baf6a9593fa1e2280d.jpeg?from=ad\",\"link_url\":\"http://www.youjiagou.com/taocan/jiancai/\",\"sort_order\":\"1\"},{\"img_url\":\"images/s-20160802/52/924e523280cdbf53661edbbcd08801ed.jpeg\",\"link_url\":\"http://www.youjiagou.com/act/dingzhi/pcdz.html\",\"sort_order\":\"2\"}]","sercice_promise":"[{\"desc1\":\"售后保障\",\"flag\":\"0\",\"url\":\"/about-aftersale/\",\"sort_order\":\"1\"},{\"desc1\":\"现货七天闪发\",\"flag\":\"1\",\"url\":\"\",\"sort_order\":\"2\"}]","goods_desc_url":"http://app.youjiagou.com/html/goodsdetail_pad.html?id=16577","sold_info_url":"http://app.youjiagou.com/html/solded_pad.html?id=16577","goods_img":"images/s-20160729/48/4a7b775ad8f20dc5e4856b8c214fbecd.jpeg","selling_content":""}"',
	   		'itemId': "16577",
	   		'itemNum': 6,
	   		'type': "1"
	   	}
	   ];*/
				this.shoppingCartData = data.body.data;
	
				//this.shoppingCartData = result;
	
				console.log(this.shoppingCartData);
	
				for (var i = 0; i < this.shoppingCartData.length; i++) {
					//console.log(JSON.parse(this.shoppingCartData[i].data));
					//console.log(JSON.parse(JSON.parse(this.shoppingCartData[i].data).group_attr_info).attr_info);   // 商品属性
	
					this.attrInfo.push(JSON.parse(JSON.parse(this.shoppingCartData[i].data).group_attr_info).attr_info);
				}
	
				// 商品属性
				for (var y = 0; y < this.attrInfo.length; y++) {
					this.newAttrInfo.push(this.attrInfo[y]);
				}
			}, function (a) {
				console.log('请求错误 ');
			});
		},
		methods: {
			selectGoods: function selectGoods(e) {
				// 单选
				var aa = $(e.target).prop('src');
				if (aa.substr(aa.length - 5, 1) == '2' || aa.substr(aa.length - 5, 1) == 2) {
					$(e.target).prop('src', 'images/select_1.png');
				} else if (aa.substr(aa.length - 5, 1) == '1' || aa.substr(aa.length - 5, 1) == 1) {
					$(e.target).prop('src', 'images/select_2.png');
				}
	
				// 判断是否全选
				for (var i = 0; i < $('.goodsSingleSelect').length; i++) {
					if ($('.goodsSingleSelect').eq(i).prop('src').substr(aa.length - 5, 1) == '2' || aa.substr(aa.length - 5, 1) == 2) {
						$('.goodsAllSelect').prop('src', 'images/select_2.png');
					} else {
						$('.goodsAllSelect').prop('src', 'images/select_1.png');
					}
				}
			},
			selectAll: function selectAll() {
				// 全选
				this.goodsSelect = !this.goodsSelect;
				if (this.goodsSelect) {
					$('.shoppingCartMain .goodsSelect').prop('src', 'images/select_2.png');
				} else {
					$('.shoppingCartMain .goodsSelect').prop('src', 'images/select_1.png');
				}
			},
			limitShoppingNum: function limitShoppingNum(e) {
				// 限制购买数量只能输入数字
				$(e.target).val($(e.target).val().replace(/\D/g, ''));
			},
			changeShoppingNum: function changeShoppingNum(e, type) {
				// 修改购买数量
				var goodsNums = parseInt($(e.target).parent().find('.goodsNum').val());
				if (type == 1) {
					// 减
					if (goodsNums > 0) {
						goodsNums = goodsNums - 1;
						$(e.target).parent().find('.goodsNum').val(goodsNums);
					}
				} else {
					// 加
					goodsNums = goodsNums + 1;
					$(e.target).parent().find('.goodsNum').val(goodsNums);
				}
			},
			openOrTakeupFn: function openOrTakeupFn() {
				// 展开收起
				this.openOrTakeup = !this.openOrTakeup;
			}
		}
	});
	
	$(function () {});

/***/ })
/******/ ]);
//# sourceMappingURL=shoppingCart.js.map