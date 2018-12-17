<template>
	<div class="bg-box">
 		<textarea rows=8 cols=70 id="dataPanel" style="display: none;"></textarea>
 		<div id="play-box">
 			<video-player  class="video-player vjs-custom-skin"
			     ref="videoPlayer"
			     width="300"
			     heigth="200"
			     controls
			     :playsinline="true"
			     :options="playerOptions">
			</video-player>
			<!--<video-player
	        class="video-player vjs-custom-skin"
	                    :options="playerOptions"
	                    @ready="playerReadied">
	      </video-player>-->
	 		<!--<div class="bot-box">
	 			<input type="button" value="开始播放" onclick="StartPlay()" style="display:block" id="startplaybtn">
				<input type="button" value="结束播放" onclick="StopPlay()" style="display:none" id="stopplaybtn">
	 		</div>-->
 		</div>
 		
 	</div>
</template>

<script>
//import 'videojs-contrib-hls.js/src/videojs.hlsjs'
export default{
	data(){
		return {
			playerOptions : {
		        //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
		        autoplay: true, //如果true,浏览器准备好时开始回放。
		        muted: true, // 默认情况下将会消除任何音频。
		        loop: false, // 导致视频一结束就重新开始。
		        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
		        language: 'zh-CN',
		        aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
		        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
		        sources: [{
		          withCredentials: false,
	              type: "application/x-mpegURL",
		          src: "http://hls.open.ys7.com/openlive/47e2ef5e728e4f2abd5085ecbccc9ff6.hd.m3u8" //url地址
		        }],
		        controls: true,
		        dataType: "jsonp",
		        crossDomain: true,
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
	methods:{
		playerReadied(){
			
		}
	},
	created(){
		/*let vm = this
		vm.playerOptions.sources[0].src = vm.device.liveaddress
		vm.playerOptions.poster = vm.device.imageUrl
		vm.getCameraImages()*/
	},
	mounted (){
		
	}
}
</script>

<style scoped>
	/*body {
		background-color: lightblue; 
		background: url(img/b.jpg);
		background-position: center;
	    background-repeat: no-repeat;
	    background-attachment: fixed;
	}*/
	.bg-box{
		width: 100%; position: relative; 
	}
	.bot-box{
		position: absolute; top: 450px; left: 243px;
	}
	.bot-box input[type="button"]{
		width: 149px;
		height: 45px;
		box-shadow: 0px 0px 1px 0px rgba(0, 82, 131, 0.75);
		background-color: #2696DC;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 18px;
		cursor: pointer;
	}
	.bot-box input[type="button"]:hover{
		background-color: #59B0DD;
	}
	#EZUIKit{
		/*position: absolute; top: 335px; left: 621px;*/
	}
	#play-box{
		/*width: 677px; margin: 0 auto; position: absolute; top: 338px; left: 622px;*/
			width: 677px; margin: 15rem auto 0; position: relative;
		}
</style>