var spxqMain = new Vue({
	el: '.spxqMain',
	data: {
		goodsIntroduceBtn : true,   // 商品介绍按钮
		goodsCommentBtn : false,  // 商品评论按钮
		goodsDetailArr : {},   // 商品详情
		attrInfo : [],       // 商品属性
		newAttrInfo : [],   // 转变为数组后的商品属性
		shoppingNum : '',   // 购买数量
		goodsImgArr : [],   // 商品图片
		suitDetail : [],    // 搭配套餐
		newSuitDetail : [],   //转变为数组后的搭配套餐
		showItemNumDetail : {},   // 商品详情购买量和评价数量
		goodsAttrArr : [],  // 商品详情
		attrDetail : [],   // 商品基本信息
	},
	mounted: function() {
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
			callback: function(api) {
				this.nowPageNum = api.getCurrent();
				console.log('bb:' + this.nowPageNum);
			}
		});
		
		// 展示商品详情
		this.$http.post('http://localhost:8092/item/showItem/'+this.getUrlParam('goodsId'), {}, { // 没有参数也要放空的大括号
			headers: { // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			emulateJSON: true
		}).then(function(data) {
			console.log(data.body.data.rows[0]);
			/*console.log(JSON.parse(data.body.data.rows[0].attr));
			console.log(JSON.parse(data.body.data.rows[0].attr_detail));
			console.log(JSON.parse(data.body.data.rows[0].group_attr_info).attr_info);
			console.log(JSON.parse(data.body.data.rows[0].pic_url));
			console.log(JSON.parse(data.body.data.rows[0].suit_detail));
			console.log(JSON.parse(data.body.data.rows[0].attr));*/
			
			this.goodsDetailArr = data.body.data.rows[0];  
			this.attrInfo = JSON.parse(data.body.data.rows[0].group_attr_info).attr_info;   // 商品属性
			this.goodsImgArr = JSON.parse(data.body.data.rows[0].pic_url);   // 商品图片
			this.suitDetail = JSON.parse(data.body.data.rows[0].suit_detail);   // 搭配套餐
			this.goodsAttrArr = JSON.parse(data.body.data.rows[0].attr);  // 商品详情
			this.attrDetail = JSON.parse(data.body.data.rows[0].attr_detail); // 商品基本信息
			
			document.getElementById('picShow').innerHTML = this.goodsDetailArr.goods_desc;
			
			// 商品属性
			for(var y=0;y<this.attrInfo.length;y++){
				this.newAttrInfo.push(JSON.parse(this.attrInfo[y]))
			}
			
			// 搭配套餐
			for (var i = 0; i < this.suitDetail.length; i++) {
				this.newSuitDetail.push(JSON.parse(this.suitDetail[i].goods));
			}
			
			// 套餐价和节省
			for(var v=0;v<this.newSuitDetail.length;v++){
				for(var q=0;q<this.newSuitDetail[v].length;q++){
					this.newSuitDetail[v][q]['suit_price'] = this.suitDetail[v].suit_price;
					this.newSuitDetail[v][q]['save_price'] = this.suitDetail[v].save_price;
				}
			}
			
			// 隐藏套餐最后一个加号
			setTimeout(function () {
				for (var a = 0; a < spxqMain.suitDetail.length; a++) {
					$('.mealBox').eq(a).find('.addSymbol').last().hide();
				}
			},100);
			
			// 图片放大查看插件
			setTimeout(function () {
				var magnifierConfig = {
					magnifier: "#magnifier1", //最外层的大容器
					width: 450, //承载容器宽
					height: 450, //承载容器高
					moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
					zoom: 5 //缩放比例
				};
			
				var _magnifier = magnifier(magnifierConfig);
			},100);
		}, function(a) {
			console.log('请求错误 ')
		});
		
		// 商品分类接口
		this.$http.post('http://localhost:8092/item/showItemNumDetail/'+this.getUrlParam('goodsId'), {} ,{   // 没有参数也要放空的大括号
            headers: {   // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            emulateJSON: true
        }).then(function(data) {
            console.log(JSON.parse(data.body.data).rows[0]);
            this.showItemNumDetail = JSON.parse(data.body.data).rows[0];
        }, function(a) {
            console.log('请求错误 ')
        });
	},
	methods: {
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
		goodsIntroduceClick : function(){  // 点击商品介绍
			this.goodsIntroduceBtn = true;
			this.goodsCommentBtn = false;
		},
		goodsCommentClick : function(){  // 点击商品评论
			this.goodsIntroduceBtn = false;
			this.goodsCommentBtn = true;
		},
		limitShoppingNum : function () {   // 限制购买数量只能输入数字
			this.shoppingNum = this.shoppingNum.replace(/\D/g,'');
		},
		changeShoppingNum : function (type) {  // 修改购买数量
			if (type==1) {  // 减
				if(this.shoppingNum>0){
					this.shoppingNum--;
				}
			}else{ // 加
				this.shoppingNum++;
			}
		},
		goodsDetail : function (id) {
			window.open('spxq.html?goodsId='+id);
		}
	}
});

$(function() {
	// 配套方案
	$('.toPage a').css('color', '#333');
	$('.toPage .spxq a').css('color', '#cd2f1d');

	// 设置翻页距左边距离
	$('.pagingWrap .paging').css({
		'margin-left': ($('.pagingWrap').width() - $('.pagingWrap .paging').width()) / 2 + 'px'
	});
	
});