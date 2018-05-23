// 注册
var shoppingCartMain = new Vue({
	el : '.shoppingCartMain',
	data : {
		shoppingNum : 1,    // 购买数量
		goodsId : '',  // 商品ID
		goodsArr : [],  // 商品详情
		newAttrInfo : [],  // 转变为数组后的商品详情
		goodsPic : '',  // 商品图片
		toGoodsPage : '',  // 跳转到商品详情页面地址
		addShoppingType : false,  // 加入购物车是否成功
	},
	mounted : function(){
		this.shoppingNum = this.getUrlParam('num');   // 购买数量
		this.goodsId = this.getUrlParam('goodsId');
		this.toGoodsPage = 'spxq.html?goodsId='+this.goodsId;
		
		// 添加购物车接口
		this.$http.post('http://localhost:8083/zujahome-main/cart/add/'+this.goodsId, {
			type : '1',  // 1 普通商品, 2 优品, 3 套餐
			num : this.shoppingNum   // 购买数量
		} ,{   // 没有参数也要放空的大括号
            headers: {   // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            emulateJSON: true
        }).then(function(data) {
            if(data.body.status=='200'){
            	this.addShoppingType = true;
            	this.$http.post('http://localhost:8083/zujahome-main/item/showItem/'+this.goodsId, {}, { // 没有参数也要放空的大括号
					headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					emulateJSON: true
				}).then(function(data) {
					console.log(data.body.data.rows[0]);
					this.goodsArr = data.body.data.rows[0];
					this.attrInfo = JSON.parse(data.body.data.rows[0].group_attr_info).attr_info;   // 商品属性
					this.goodsPic = JSON.parse(data.body.data.rows[0].pic_url)[0].img_url;  // 商品图片
					
					// 商品属性
					for(var y=0;y<this.attrInfo.length;y++){
						this.newAttrInfo.push(JSON.parse(this.attrInfo[y]));
					}
				}, function(a) {
					console.log('请求错误 ')
				});
            }
        }, function(a) {
            console.log('请求错误 ')
        });
	},
	methods : {
		getUrlParam: function(key) { // 地址栏中文也可以正常获取
			// 获取参数
			var url = window.location.search;
			// 正则筛选地址栏
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			// 匹配目标参数
			var result = url.substr(1).match(reg);
			//返回参数值
			return result ? decodeURIComponent(result[2]) : null;
		},
	}
});

$(function () {
	$('.goodsWrapBox').hide();
});
