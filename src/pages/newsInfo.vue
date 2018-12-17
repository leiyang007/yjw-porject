<template>
  <div>
    <!--banner图-->
		<div class="banner">
				<img src="../assets/images/new-center/new-center-nav.jpg"/>
		</div>
		<!--banner图-->
		
		<!--内容部分-->
		<div class="content">
			<div class="right-content">
				<div class="cont-top-box">
					<a name="here"></a>
					<div class="float-left"><span class="font-18">新闻中心</span> | <span class="font-12">Information centres</span></div>
					<ul class="mbx-nav float-right">
						<li>
							<router-link :to="{path: '/'}">
								<span class="font-weight">首页</span>
							</router-link>	
							<i class="layui-icon layui-icon-right"></i>
						</li>
						<li>
							<router-link :to="{path: '/newsCenter/newsList'}">
								新闻中心
							</router-link>
							<i class="layui-icon layui-icon-right"></i>
						</li>
						<li>
							<span>新闻详情</span>
						</li>
					</ul>
				</div>
				<div class="cont-bot-box">						
						<h2 class="news-title">{{ articleInfo.title }}</h2>
						<p class="news-date">{{ articleInfo.policyTime | yearToMonth('year-month-day') }}</p>
						<!--<div class="news-img1">
							<img :src="articleInfo.img" alt="" />
						</div>	-->
						<article v-html="articleInfo.content"></article>
				</div>
			</div>		
		</div>
		<!--内容部分-->
  </div>
</template>

<script>
export default {
  data () {
    return {
			articleInfo: {}
		}
  },
  created () {
	    let newsID=this.$route.query.id;
	    let classify=this.$route.query.classify;
	    let parm = {
	    	'classify': classify,
	  				  'id': newsID
	  	}
			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			console.log(baseParm)
			let _this = this
	  	this.$axios.get('/wms_web/article/selectArticleinfoById?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	if(nowData.code == 0){		
			  		_this.articleInfo = nowData.result
			  		console.log(JSON.stringify(_this.articleInfo))
			  		
			  		$("html, body").scrollTop(0);
			  	}else{
			  		console.log(nowData.message)
			  	}		  	
			  })
			  .catch((err) => {
			    console.log(err);
			  })			
	},
	mounted (){
		
	}
}	
</script>

<style scoped>
.right-content{
	width: 100%;
}
.news-title{
	color: #666666; font-size: 22px;
}
.news-date{
	color: #2c2c2c; margin: 20px 0 30px;
}
.news-img1{
	width: 500px; height: 249px; margin: 0 auto 20px;
}
.news-img1 img{
	width: 100%;
}
article{
	text-align: left; text-indent: 1em;
}
article p{
	color: #666666; font-size: 14px; line-height: 32px; text-align: left; margin-bottom: 20px; text-indent: 2em;
}	
article .f_center{
	 text-align: center;
}
</style>