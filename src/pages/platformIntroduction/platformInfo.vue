<template>
  	<div class="right-content">
		<div class="cont-top-box">
			<div class="float-left"><span class="font-18">平台介绍</span> | <span class="font-12">Platform profile</span></div>
			<ul class="mbx-nav float-right">
				<li>
					<router-link :to="{path: '/'}">
						<span class="font-weight">首页</span>
					</router-link>
					<i class="layui-icon layui-icon-right"></i>
				</li>
				<li>
					<router-link :to="{path: '/platformIntroduction/platformInfo'}">
						平台介绍
					</router-link>
					<i class="layui-icon layui-icon-right"></i>
				</li>
				<li><span>平台简介</span></li>
			</ul>
		</div>
		<div class="cont-bot-box">
			<div class="brief-img-box">
				<img src="../../assets/images/ptjs/ptjs-img.jpg" alt="" />
			</div>
			<h2>冷链医疗用品集成平台</h2>
			<p class="brief-text-box">
				冷链医疗用品集成系统定位为开放的产品供应链集成服务平台，致力于打造一个从生产、销售、到终端使用单位的供应链协同模式。打造“四位一体“，即（生产、销售、使用、监管）的集成平台。实现供应链协同模式的“快、准、省”运行特点！
			</p>			
		</div>
	</div>
</template>

<script>

export default {
  
}
</script>

<style scoped>
	.cont-bot-box .brief-img-box{
  		width: 723px; margin-bottom: 20px;
  	}
  	.cont-bot-box .brief-img-box img{
  		width: 100%;
  	}
  	.cont-bot-box .brief-text-box {
  		font-weight: bold; font-stretch: normal; line-height: 32px; letter-spacing: 1px; color: #4f4f4f; text-align: left; text-indent: 2em; margin-bottom: 20px;
  	}
  	.cont-bot-box h2{
  		font-size: 26px; color: #0370a7; margin-bottom: 30px;
  	}
</style>