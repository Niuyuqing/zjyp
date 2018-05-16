var indexPage = new Vue({
	el: '.indexPage',
	data: {
		accordingLayout: true, // 按户型
		accordingStyles: false, // 按风格
		accordingFunctions: false, // 按功能
		hotSellersGoods: [ // 热卖推荐
			{
				imgUrl: 'https://gd2.alicdn.com/imgextra/i2/2433295359/TB2ZA7xb21TBuNjy0FjXXajyXXa_!!2433295359.jpg_400x400.jpg_.webp',
			},
			{
				imgUrl: 'https://gd3.alicdn.com/imgextra/i3/2275377373/TB2xjjLaBsmBKNjSZFsXXaXSVXa_!!2275377373.jpg_400x400.jpg_.webp'
			}
		]
	},
	mounted: function() {
		// 商品分类接口
		this.$http.post('http://localhost:8092/item/showItemClassifyList', {} ,{   // 没有参数也要放空的大括号
            headers: {   // 这里是重点，一定不要加"X-Requested-With": "XMLHttpRequest"
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            emulateJSON: true
        }).then(function(data) {
            console.log(JSON.parse(JSON.parse(data.body.data).rows[0].cat_info));
        }, function(a) {
            console.log('请求错误 ')
        });
	},
	methods: {
		layoutClick: function() { // 按户型点击
			this.accordingLayout = true;
			this.accordingStyles = false;
			this.accordingFunctions = false;
		},
		stylesClick: function() { // 按风格点击
			this.accordingLayout = false;
			this.accordingStyles = true;
			this.accordingFunctions = false;
		},
		funsClick: function() { // 按功能点击
			this.accordingLayout = false;
			this.accordingStyles = false;
			this.accordingFunctions = true;
		}
	}
});

Vue.http.options.emulateJSON = true;

$(function() {
	// 首页banner轮播
	var swiper = new Swiper('.swiper-container', {
		autoplay: { // 自动播放设置
			delay: 1500,
			stopOnLastSlide: true,
		},
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
		},
	});

	// 首页
	$('.toPage a').css('color', '#333');
	$('.toPage .index a').css('color', '#cd2f1d');

	// 热卖推荐默认选中第一个
	$('.hotChoseBtn li').first().css({
		'background': '#cd2f1d',
		'border-radius': '1rem',
		'color': '#fff'
	});

	// 热卖推荐点击样式切换
	$('.hotChoseBtn li').on('click', function() {
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