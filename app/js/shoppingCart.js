// 购物车
var shoppingCartMain = new Vue({
	el : '.shoppingCartMain',
	data : {
		goodsSelect : false,
		openOrTakeup : true,  // 展开
	},
	mounted : function(){
		
	},
	methods : {
		selectGoods : function (e) {   // 单选
			var aa = $(e.target).prop('src');
			if (aa.substr(aa.length-5,1)=='2'||aa.substr(aa.length-5,1)==2) {
				$(e.target).prop('src','images/select_1.png');
			}else if (aa.substr(aa.length-5,1)=='1'||aa.substr(aa.length-5,1)==1){
				$(e.target).prop('src','images/select_2.png');
			}
		},
		selectAll : function () {   // 全选
			this.goodsSelect = !this.goodsSelect;
			if (this.goodsSelect) {
				$('.shoppingCartMain .goodsSelect').prop('src','images/select_2.png');
			} else{
				$('.shoppingCartMain .goodsSelect').prop('src','images/select_1.png');
			}
		},
		openOrTakeupFn : function () {  // 展开收起
			this.openOrTakeup = !this.openOrTakeup;
		}
	}
});

$(function () {
	
});
