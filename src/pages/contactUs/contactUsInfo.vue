<template> 	
	<div class="right-content">
		<div class="cont-top-box">
			<div class="float-left"><span class="font-18">联系我们</span> | <span class="font-12">Contact us</span></div>
			<ul class="mbx-nav float-right">
				<li>
					<router-link :to="{path: '/'}">
						<span class="font-weight">首页</span>
					</router-link>
					<i class="layui-icon layui-icon-right"></i>
				</li>
				<li>
					<router-link :to="{path: '/contactUs/contactUsInfo'}">
						联系我们
					</router-link>
					<i class="layui-icon layui-icon-right"></i>
				</li>
				<li><span>联系方式</span></li>
			</ul>
		</div>
		<div class="cont-bot-box clear">
			<div class="lx-text-list float-left">
				<ul>
					<li>								
        				<p><i class="icon-address"></i>公司地址：武汉市江夏区藏龙岛百度大厦A座903</p>
					</li>
					<li>
						<p><i class="icon-telephone"></i>公司电话：027-86695030</p>
					</li>
					<li>
						<p><i class="icon-e-mail"></i>Email ：postmaster@yjw120.cn</p>
					</li>
					<li>
						<p><i class="icon-web-site"></i>网址：<a href="http://www.yjwsecure.com">http://www.yjwsecure.com</a></p>
					</li>
				</ul>
			</div>
			<div class="lx-map float-right" title="双击可查看大地图" ondblclick="window.open('http://map.baidu.com/?latlng=30.439862,114.430032&title=我的位置&content=武汉市江夏区藏龙岛百度大厦A座903&autoOpen=true&l')">
				<map-demo></map-demo>
				<!--<span>双击可查看大地图</span>-->
			</div>
		</div>
	</div>	
</template>

<script>
import mapDemo from '../../components/base/map'
export default {
  components: {
		mapDemo
  },
  mounted (){
    
  }
}
</script>

<style scoped>
.lx-text-list ul li{
	text-align: left; margin-bottom: 35px;
}
.lx-text-list ul li p i{
	margin-right: 10px;
}
/*.anchorBL{
	display: none!important;
}*/
</style>