<template>
  <div>
  	<div id="allmap"></div>
  </div>
  
</template>
<script>
  import BMap from 'BMap'
  
  export default {
    // 创建地图对象，在mounted生命周期调用；
	  mounted() {
	    this.ready()
	  },
	  methods: {
	    ready: function() {
	    		var map = new BMap.Map('allmap')
		      var point = new BMap.Point(114.430032,30.439862)  //114.430012,30.440047  114.430032,30.439862
		      
		      map.centerAndZoom(point, 18)	//设初始化地图。 如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级
		      map.addControl(new BMap.MapTypeControl())  //将控件添加到地图，一个控件实例只能向地图中添加一次
		      map.enableScrollWheelZoom(true)	//开启鼠标滚轮缩放功能。仅对PC上有效
		      map.enableDoubleClickZoom(false)	//启用双击放大，默认启用
		      
		      var marker = new BMap.Marker(point)
		      map.addOverlay(marker)	//将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
 
	    }
	  }
  }
</script>
 
<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>
 #allmap{
 	width: 300px;
 	height: 200px;
 }
</style>