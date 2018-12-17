<template>
  <div>
  	<div id="allmap"></div>
  	<div style="margin: 20px 0 0 70px;">
  		经度是:<span v-text="xlocation" class="blue-font">{{ xlocation }}</span>
	  	维度是:<span v-text="ylocation" class="blue-font" style="margin-right: 50px;">{{ ylocation }}</span>
	
	  	湿度是:<span class="blue-font">{{ currentHumidity }}%</span>
	  	温度是:<span class="blue-font">{{ currentTemperature }}℃</span>
  	</div>
  	
  </div>
  
</template>
<script>
  import BMap from 'BMap'	
  
  export default {
  	//props: ["jingdu","weidu","shidu","wendu"],
  	data(){
  		return{
  			xlocation: this.common.SStorage.getItem("logisticsInfoData").car.xlocation,		//经度
  			ylocation: this.common.SStorage.getItem("logisticsInfoData").car.ylocation,			//维度
  			currentHumidity: this.common.SStorage.getItem("logisticsInfoData").car.currentHumidity,		//湿度
			  currentTemperature: this.common.SStorage.getItem("logisticsInfoData").car.currentTemperature	//温度
  		}
  	},
  	/*watch: {
        jingdu: function(newVal,oldVal){
            console.log(newVal+'-->'+oldVal)
            this.xlocation = newVal
        },
        weidu: function(newVal,oldVal){
            console.log(newVal+'-->'+oldVal)
            this.ylocation = newVal
        },
        shidu: function(newVal,oldVal){
            console.log(newVal+'-->'+oldVal)
            this.currentHumidity = newVal
        },
        wendu: function(newVal,oldVal){
            console.log(newVal+'-->'+oldVal)
            this.currentTemperature = newVal
        },
    },*/

	  mounted() {
	    this.ready()
	    console.log(this.xlocation)
	    console.log(this.ylocation)
	    console.log(this.currentHumidity)
	    console.log(this.currentTemperature)

	  },
	  methods: {
	    ready: function() {
	      var map = new BMap.Map('allmap')    // 创建地图对象
	      var point = new BMap.Point(this.xlocation,this.ylocation)  //114.430032,30.439862
	      //var point = new BMap.Point(114.430032,30.439862)  //114.430032,30.439862
	      map.centerAndZoom(point, 18)	//设初始化地图。 如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级
	      map.addControl(new BMap.MapTypeControl())  //将控件添加到地图，一个控件实例只能向地图中添加一次
	      map.enableScrollWheelZoom(true)	//开启鼠标滚轮缩放功能。仅对PC上有效
	      map.enableDoubleClickZoom(true)	//启用双击放大，默认启用
	      var myIcon = new BMap.Icon("../../static/car.png", new BMap.Size(48,44));  //定义自己的标注
	      var marker = new BMap.Marker(point,{icon:myIcon})
	      
	      map.addOverlay(marker)	//将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
	      //this.common.SStorage.setItem("marker",marker)
	      map.centerAndZoom(point, 15);
				var opts = {
				  width : 100,     // 信息窗口宽度
				  height: 50,     // 信息窗口高度
				  title : "" , // 信息窗口标题
				  enableMessage:true		//设置允许信息窗发送短息
				  //message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
				}
				var wen_shi_du = "湿度:"+this.currentHumidity+"%<br/>温度:"+this.currentTemperature+"℃"
				var infoWindow = new BMap.InfoWindow(wen_shi_du, opts);  // 创建信息窗口对象 

				if(marker.Bc){
					marker.Bc.addEventListener("mouseover", function(){          
						map.openInfoWindow(infoWindow,point); //开启信息窗口
					});
				}else{
						//$(".BMap_Marker img[src='../../static/car.png']").click(function(){debugger
							map.openInfoWindow(infoWindow,point); //开启信息窗口
						//})
				}

				//$(".BMap_pop > img").first().hide()
		  }
	  }
}	  
</script>
 
<style type="text/css">
		body, html {width: 100%;height: 100%;margin:0;font-family:"微软雅黑";}
		#allmap{width:100%;height:500px;}
		p{margin-left:5px; font-size:14px;}
		.BMap_Marker{
		 	cursor: pointer;
		}
</style>
<style scoped>
 #allmap{
 	width: 600px;
 	height: 400px;
 	margin-top: 20px;
 	margin-left: 70px;
 }

</style>