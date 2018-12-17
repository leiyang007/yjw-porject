<template>
  <div id="index-box">
  	<!--轮播图组件-->
    	<!--<slide-show></slide-show>-->
    <template>
	    <el-carousel :height="bannerHeight + 'px'">
	     <el-carousel-item v-for="(item,index) in BannerImg">
	       <img :src="item.src" :data-id="index" class="bannerImg" />
	       <!--<img src="../../assets/images/banner2.jpg" v-if="index == 1" class="bannerImg" />
	       <img src="../../assets/images/banner3.jpg" v-if="index == 2" class="bannerImg" />-->
	     </el-carousel-item>
	   </el-carousel>
		</template>	
		
		<!--内容部分-->
		<div class="content">
			
			<div class="cont-item1">
				<div class="cont-item1-img float-left">
					<img src="../assets/images/index/index-1.png" alt="" />
				</div>
				<div class="cont-item1-font float-right">
					<h2>冷链医疗用品集成平台</h2>
					<p>冷链医疗用品集成系统定位为开放的产品供应链集成服务平台，致力于打造一个从生产、销售、到终端使用单位的供应链协同模式。打造“四位一体“，即（生产、销售、使用、监管）的集成平台。实现供应链协同模式的“快、准、省”运行特点！</p>
				</div>
			</div>
			
			<div class="cont-item-title">
				<img src="../assets/images/index/pt-server.png" alt="" />
			</div>
			
			<div class="cont-item2">
				<ul>
					<li v-for="item in imgList">
						<img class="first-img" :src="item.img" alt="" />
						<img class="last-img" :src="item.img2"/>
					</li>
				</ul>
			</div>
			
			<div class="cont-item-title">
				<img src="../assets/images/index/pt-ys.png" alt="" />
			</div>
			
			<div class="cont-item3">
				<div style="float: left;"><img src="../assets/images/index/low-cost.png" alt="" /></div>
				<div><img src="../assets/images/index/high-security.png" alt="" /></div>
				<div style="float: right;"><img src="../assets/images/index/high-efficiency.png" alt="" /></div>
			</div>
				
		</div>
		<div class="content-bottom-gray">
			<div class="cont-item4">
				<div class="cont-item-title">
					<img src="../assets/images/index/yjw-new-center.png" alt="" />
				</div>
				<div class="cont-bot-box clear">
					<div class="left-font float-left">
						<ul>							
							<li v-for="item in articleList">
								<div class="date-box">								
									<p>{{ item.updateTime | yearToMonth('day') }}</p>
									<p>{{ item.updateTime | yearToMonth('year-month') }}</p>
								</div>
								<div class="cont-item4-text">
									<p class="line-1" :title="item.title">
										<router-link :to="{path: '/newsInfo#here',query:{ 
													  id:item.id, 
											classify:item.classify 
											}}">
											<span @click="returnBack">{{ item.title }}</span>
										</router-link>
									</p>
									<p class="line-2" :title="item.introduction">{{ item.introduction }}</p>
								</div>					
							</li>	
							<li v-show="articleLength == 0" style="margin: 30px;">数据获取中...</li>
					</ul>						
					</div>
					<div class="right-img float-right">
						<!--<img src="../assets/images/index/item4-img.jpg" alt="" />-->
						<video-player  class="video-player vjs-custom-skin"
						     ref="videoPlayer"
						     width="300"
						     heigth="200"
						     controls
						     :playsinline="true"
						     :options="playerOptions">
						</video-player>						
					</div>
				</div>
			</div>
		</div>
		<!--内容部分-->	
  </div>
</template>

<script>

//import slideShow from '../components/base/slider'
export default {
	data () {
    return {
    	articleList:[],
    	articleLength: 0,
    	bannerHeight: 'auto',
    	screenWidth: null,
    	BannerImg: [
    		{
    			id: 0,
    			src: require('../assets/images/index/hdp-1.jpg')
    		},
    		{
    			id: 1,
    			src: require('../assets/images/index/hdp-2.jpg')
    		},
    		{
    			id: 2,
    			src: require('../assets/images/index/hdp-3.jpg')
    		}
    	],
      imgList:[
      	{
      		img: require('../assets/images/index/a1.jpg'),
      		img2: require('../assets/images/index/b1.jpg')
      	},
      	{
      		img: require('../assets/images/index/a2.jpg'),
      		img2: require('../assets/images/index/b2.jpg')
      	},
      	{
      		img: require('../assets/images/index/a3.jpg'),
      		img2: require('../assets/images/index/b3.jpg')
      	},
      	{
      		img: require('../assets/images/index/a4.jpg'),
      		img2: require('../assets/images/index/b4.jpg')
      	}
      ],
      playerOptions : {
	        //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
	        autoplay: false, //如果true,浏览器准备好时开始回放。
	        muted: false, // 默认情况下将会消除任何音频。
	        loop: false, // 导致视频一结束就重新开始。
	        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
	        language: 'zh-CN',
	        aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
	        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
	        sources: [{
            type: "video/mp4",
	          src: "http://www.yjwsecure.com:82/video/tuiguang.mp4" //url地址
	          //src: "../../static/aaa.mp4" //url地址
	        }],
	        //poster: require('../assets/images/index/index-1.png'), //你的封面地址
	        poster: '', //你的封面地址
	        // width: document.documentElement.clientWidth,
	        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
	        controlBar: {
	          timeDivider: true,
	          durationDisplay: true,
	          remainingTimeDisplay: false,
	          fullscreenToggle: true  //全屏按钮
	        }
	    }
    }
 },
  components: {
    //slideShow
  },
  methods: {
  	returnBack(){
      	window.location.reload()
     },
    subStringResult (str, len){    //截取字符串
		    var newLength = 0; 
		    var newStr = ""; 
		    var chineseRegex = /[^\x00-\xff]/g; 
		    var singleChar = ""; 
		    var strLength = str.replace(chineseRegex,"**").length; 
		    for(var i = 0;i < strLength;i++) 
		    { 
		        singleChar = str.charAt(i).toString(); 
		        if(singleChar.match(chineseRegex) != null) 
		        { 
		            newLength += 2; 
		        }     
		        else 
		        { 
		            newLength++; 
		        } 
		        if(newLength > len) 
		        { 
		            break; 
		        } 
		        newStr += singleChar; 
		    } 
		     
		    if(strLength > len) 
		    { 
		        newStr += "..."; 
		    }
		    
		    return newStr;
		},
		overflowhidden (str, rows){
		     if(rows == 1){
	     		let sbu_str = this.subStringResult(str,66)
		     	return sbu_str
		     }else if(rows == 2){
	     		let sbu_str = this.subStringResult(str,154)
		     	return sbu_str
		     }		     
		},
		setSize: function () {
			this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
	    this.bannerHeight = 740 / 2560 * this.screenWidth
	    if(this.bannerHeight > 740) this.bannerHeight = 740
	    if(this.bannerHeight < 360) this.bannerHeight = 360
	  }
  },
  created () {
  	let parm = {
  		'type':0,
  		'pageNum':1,
  		'pageSize':3
  	}
		let baseParm = this.common.DataToBase64(JSON.stringify(parm))
		console.log(parm)
		let _this = this
  	this.$axios.get('/wms_web/article/selectArticleinfo?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
		  .then((res) => {//debugger
		  	let nowData = JSON.parse(this.common.base64ToData(res.data))
		  	//console.log(JSON.stringify(nowData.result.list))
		  	if(nowData.code == 0){		
		  		_this.articleList = nowData.result.list
		  		
		  		for(let i=0; i<_this.articleList.length; i++){
			  			let title = _this.articleList[i].title
			  			let introduction = _this.articleList[i].introduction
			  			
			  			_this.articleList[i].title = _this.overflowhidden(title,1)
			  			_this.articleList[i].introduction = _this.overflowhidden(introduction,2)
			  		}
		  		
		  		_this.articleLength = _this.articleList.length
		  		console.log(JSON.stringify(_this.articleLength))
		  	}else{
		  		console.log(nowData.message)
		  	}		  	
		    //console.log(JSON.stringify(nowData.code));
		    //console.log(JSON.stringify(nowData));		
		  })
		  .catch((err) => {
		    console.log(err);
		  })
  },
  mounted (){
	  this.setSize();
	  const that = this;
	  window.addEventListener('resize', function() {
	    that.screenWidth = $(window).width();
	    that.setSize();
	  }, false);
		var scr_width = screen.width;
		console.log('当前分辨率为'+scr_width)
  }
  
}


</script>

<style type="text/css">
#index-box .vjs-custom-skin > .video-js .vjs-big-play-button{
	border-radius: 50%; 
	width: 2em!important;
  margin-left: -1em!important;
}
.el-carousel{
	z-index: 0;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<style scoped>
/*轮播图样式*/
.bannerImg{
    width: 100%;
    height: inherit;
    min-height: 360px;
    min-width: 1100px;
  }
/*轮播图样式end*/

.layui-carousel img{
	width: 100%;
	height: 100%;
}
.content{
	width: 1000px; margin: 0 auto;
}
.cont-item1{
	overflow: hidden; padding: 20px 0;
}
.cont-item1 > div{
	width: 48%;
}
.cont-item1 > div > img{
	width: 448px; height: 338px;
}
.cont-item1-font h2{
	color: rgb(3,112,167); font-size: 24px; text-align: left; margin: 66px 0 20px;
}
.cont-item1-font p{
	color: rgba(34,34,34,0.84); 
	font-size: 18px; 
	line-height: 24px; 
	text-indent: 38px; 
	text-indent: 38px; 
	text-align: left; 
}
.cont-item-title{
	margin: 20px 0;
}

.cont-item2{
	margin: 30px 0 40px;
}
.cont-item2 ul{
	overflow: hidden; padding: 7px;
}
.cont-item2 ul li{
	float: left; position: relative; margin-right: 21px; 
}
.cont-item2 ul li:hover{
	box-shadow: 0px 0px 6px 3px #888888;
}
.cont-item2 ul li:hover .last-img{
	top: 0px;
}
.cont-item2 ul li:last-child{
	margin-right: 0px;
}
.cont-item2 .last-img{
	position: absolute; left: 0px; top: 363px;
	-webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
}


.cont-item3{
	margin: 20px 0;
}
.cont-item3 > div{
	display: inline-block;
}

.content-bottom-gray{
	width: 100%; height: 458px; background-color: rgb(236,236,236); margin: 50px 0;
}
.cont-item4{
	width: 1000px; height: 458px; margin: 0 auto; padding-top: 30px;
}
.cont-bot-box{
	margin-top: 30px;
}
.left-font{
	width: 70%;
}
.left-font ul li{
	overflow: hidden; margin-bottom: 20px;
}
.left-font ul li .cont-item4-text{
	text-align: left; width: 80%; font-size: 14px;
}
.left-font ul li > div{
	float: left;
}
.left-font ul li .cont-item4-text p:first-child{
	font-size: 16px; margin-bottom: 10px; height: 20px;
}
.left-font ul li .cont-item4-text p:last-child{
	height: 38px;
}
.right-img{
	width: 30%;
}
.date-box{
	width: 66px; height: 66px; background-color: rgb(153,153,153); margin-right: 15px; color: #fff; font-size: 12px;
}
.left-font ul li:hover .date-box{
	background-color: rgb(18,87,176);
}
.date-box p:first-child{
	font-size: 32px;
}
.line-2{
		color: #747474;
	}


</style>
