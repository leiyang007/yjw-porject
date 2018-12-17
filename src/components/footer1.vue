<template>
  <!-- 公共底部-->
			<footer>
				<div class="footer-box">
					<div class="footer-item-left" style="width: 25%;">
						<h3>湖北医界网电子科技有限公司</h3>
						<p>电话：027-86695030</p>
						<p>邮箱：postmaster@yjw120.cn</p>
					</div>
					<div class="footer-item-middle" style="width: 40%;">
						<div>
							<h3 style="margin-bottom: 0px; position: relative;">
								<div class="h3-icon"></div>
								<span class="h3-span">新手指南</span>
							</h3>
							<ul class="clear">
								<li>
									<router-link :to="{path: '/helpCenter/customerNotice'}">
										<img src="../assets/images/footer-link-icon.png" alt="" />客户须知
									</router-link>
								</li>
								<li>
									<router-link :to="{path: '/helpCenter/shoppingList'}">
										<img src="../assets/images/footer-link-icon.png" alt="" />购物流程
									</router-link>
								</li>
								<li>
									<router-link :to="{path: '/helpCenter/commonProblem'}">
										<img src="../assets/images/footer-link-icon.png" alt="" />常见问题
									</router-link>	
								</li>	
							</ul>
						</div>
						<div>
							<h3 style="margin-bottom: 0px; position: relative;">
								<div class="h3-icon"></div>
								<span class="h3-span">网站保障</span>
							</h3>
							<ul class="clear">
								<li>
									<router-link :to="{path: '/helpCenter/registrationAgreement'}">
										<img src="../assets/images/footer-link-icon.png" alt="" />注册协议
									</router-link>
								</li>
								<li>
									<router-link :to="{path: '/helpCenter/privacyProtection'}">
										<img src="../assets/images/footer-link-icon.png" alt="" />隐私保护
									</router-link>
								</li>
								<li>
									<router-link :to="{path: '/helpCenter/disclaimer'}">
										<img src="../assets/images/footer-link-icon.png" alt="" />免责声明
									</router-link>
								</li>
							</ul>
						</div>					
					</div>
					<div class="footer-item-right" style="width: 30%;">
						<h3 style="margin-bottom: 0px; padding-left: 45px; position: relative;">
							<div class="h3-icon" style="left: 50px;"></div>
							<span class="h3-span">友情链接</span>
						</h3>
						<ul class="clear">
							<li>
								<img src="../assets/images/footer-link-icon.png" alt="" />
								<a target="_blank" href="http://www.roche.com.cn/entreprise/roche_global.html">罗氏全球</a>
							</li>
							<li>
								<img src="../assets/images/footer-link-icon.png" alt="" />
								<a target="_blank" href="http://www.maccura.com/normal/main/">迈克生物</a>
							</li>
							<li>
								<img src="../assets/images/footer-link-icon.png" alt="" />
								<a target="_blank" href="http://www.mindray.com/cn/index.html">迈瑞医疗</a>
							</li>
							<li>
								<img src="../assets/images/footer-link-icon.png" alt="" />
								<a target="_blank" href="https://www.sysmex.com.cn/">希森美康</a>
							</li>
							<li>
								<img src="../assets/images/footer-link-icon.png" alt="" />
								<a target="_blank" href="http://www.autobio.com.cn/">安图生物</a>
							</li>
							<li>
								<img src="../assets/images/footer-link-icon.png" alt="" />
								<a target="_blank" href="http://www.leadmanbio.com/index.html">利德曼</a>
							</li>
						</ul>
					</div>					
				</div>
				<p>Copyright©湖北医界网电子科技有限公司版权所有 | 鄂ICP备18016539号</p>
			</footer>
</template>

<script>
</script>

<style scoped>
footer{
	width: 100%; background-color:#2094D6; 
}
footer > p{
	padding-bottom: 20px; color: #fff; font-size: 12px;
}
.footer-box{
	width: 1000px; height: 200px; margin: 0 auto; overflow: hidden;
}
.footer-box > div{
	color: #fff; font-size: 12px; float: left;
}
.footer-box > div > h3{
	margin: 50px 0 20px; text-align: left;
}
.footer-box .h3-icon{
	width: 8px; height: 8px; background-color: #fff; border-radius: 3px; position: absolute; left: 67px; top: 5px;
}
.footer-box .h3-span{
	margin-left: 20px;
}
.footer-item-left{
	float: left;
}
.footer-item-left p{
	text-align: left; line-height: 30px;
}
.footer-item-right{
	float: right;
}
.footer-item-right ul{
	
}
.footer-item-right ul li{
	float: left; margin-left: 50px; margin-top: 10px;
}
.footer-item-right ul li img{
	margin-right: 10px;
}
.footer-item-right ul li a{
	color: #fff; font-size: 12px;
}
.footer-item-right ul li a:hover{
	text-decoration:underline; 
	color: #546;
}
.footer-item-middle > div{
	width: 50%; float: left; font-size: 12px; margin-top: 50px;
} 
.footer-item-middle > div ul li{
	margin-top: 10px;
}
.footer-item-middle > div ul li img{
	margin-right: 10px;
} 
.footer-item-middle ul li a{
	color: #fff; font-size: 12px;
}
.footer-item-middle ul li a:hover{
	text-decoration:underline; 
	color: #546;
}
</style>
