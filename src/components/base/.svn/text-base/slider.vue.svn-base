<template>
	<!--轮播图-->
		<div class="layui-carousel" id="test1" style="margin: 0 auto;">
			  <div carousel-item>
			    <div><a href="javascript:void(0);"><img class="slider-img" src="../../assets/images/index/hdp-1.jpg" alt="" /></a></div>
			    <div><a href="javascript:void(0);"><img class="slider-img" src="../../assets/images/index/hdp-2.jpg" alt="" /></a></div>
			    <div><a href="javascript:void(0);"><img class="slider-img" src="../../assets/images/index/hdp-3.jpg" alt="" /></a></div> 
			  </div>
		</div>
		<!--轮播图-->
</template>

<script>
	export default {
		created: function(){
			layui.use('carousel', function(){
			  var carousel = layui.carousel;
			  //建造实例
			  carousel.render({
			    elem: '#test1'
			    ,width: '100%' //设置容器宽度
			    ,arrow: 'hover' //始终显示箭头
			    ,width: 'auto'
			    ,height: '612px'
			    //,anim: 'updown' //切换动画方式
			  })
			})						
		},
		mounted: function(){
			
		}
	}
		
</script>

<style>
#test1 img{
	height: 100%;
}	
.layui-carousel>[carousel-item]{
overflow: visible;
}
.layui-carousel>[carousel-item]>*{
height: auto;
}
.layui-carousel-ind{
margin-top: -20px;
top: auto;
bottom: 10px;
}
</style>