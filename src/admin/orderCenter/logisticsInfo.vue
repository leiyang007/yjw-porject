<template>
	<div class="cg-order-info">
		<div class="content-nav">
			<ul>
				<li>
					<a href="javascript:history.go(-1)">返回上一步</a>
				</li>
				<li><i class="el-icon-arrow-right"></i></li>
				<li class="blue-font">物流信息</li>
			</ul>
		</div>
		<p style="text-align: left; margin-top: 30px; color: #494949; padding-bottom: 10px; border-bottom: 1px solid #7f8384;">物流信息:</p>
		<div class="wl-item">
			<span>出库单编号:</span>
			<span class="item-last-span" v-text="outSn"></span>
		</div>	
		<div class="wl-item">
			<span>车辆信息:</span>
			<div class="wl-item-box">
				<span>车牌号:<span class="item-last-span" v-text="carNumber"></span></span>
				<span>注册公司:<span class="item-last-span" v-text="regCompany"></span></span>				
			</div>
		</div>
		<div class="wl-item">
			<span>配送员信息:</span>
			<div class="wl-item-box">
				<span>配送员:<span class="item-last-span" v-text="psy"></span></span>
				<span>联系方式:<span class="item-last-span" v-text="phone"></span></span>				
			</div>
		</div>
		<div class="wl-item">
			<span>当前位置:</span>
			<span class="blue-font pointer" style="margin-left: 20px;" @click="viewVideo">查看视频</span>
			<span class="item-last-span">
				<!--<div class="wl-map">地图</div>-->
				<map-admin :jingdu="jingdu" :weidu="weidu" :shidu="shidu" :wendu="wendu"></map-admin>
			</span>
		</div>
		<!--<div class="wl-item">
			<span>实时数据监控:</span>
			<span class="item-last-span">
				<template>
				  <el-table :data="tableData" border style="width: 551px; margin: 30px 0 0 100px;">
				    <el-table-column prop="date" label="采集时间" width="150">
				    </el-table-column>
				    <el-table-column prop="yssd" label="预设湿度" width="100">
				    </el-table-column>
				    <el-table-column prop="cxsd" label="车厢湿度" width="100">
				    </el-table-column>
				    <el-table-column prop="yswd" label="预设温度" width="100">
				    </el-table-column>
				    <el-table-column prop="cxwd" label="车厢温度" width="100">
				    </el-table-column>
				  </el-table>
				</template>
			</span>
		</div>-->
	</div>		
</template>

<script>
import mapAdmin from '../admin-base/mapAdmin'	
export default{
    components: {
		mapAdmin
    },	
	data(){
		return{	
			outSn: '',
			carNumber: '',
			regCompany: '',
			psy: '',
			phone: '',
			jingdu: '',		//维度
			weidu: '',		//经度
			shidu: null,	//湿度
			wendu: null,	//温度
			car: null,	//车辆视频
	        tableData: [{
		          date: '2016-05-02',
		          yssd: '24%',
		          cxsd: '30%',
		          yswd: '5',
		          cxwd: '10'
		        },{
		          date: '2016-05-02',
		          yssd: '24%',
		          cxsd: '30%',
		          yswd: '5',
		          cxwd: '10'
		        },{
		          date: '2016-05-02',
		          yssd: '24%',
		          cxsd: '30%',
		          yswd: '5',
		          cxwd: '10'
		        },{
		          date: '2016-05-02',
		          yssd: '24%',
		          cxsd: '30%',
		          yswd: '5',
		          cxwd: '10'
		        }]	    
	   }
	},
	methods:{
		viewVideo(){
			let vSn = this.car.videoSn.split(':')[1]
				console.log(vSn)
    		let parm = {			   
    				  "videoSn": vSn,
			     	   "signId": this.GLOBAL.userid
	    	}  

				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))								
					
			this.$axios.get('/wms_web/getVideoToken?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		
			  		setTimeout(function(){			       		
				       		window.open("../../../static/videoPlay.html?videoUrl="+nowData.result.hdAddress,'_blank','width=1000,height=800,top=50px,left=300px,location=no');
			  		},500)
				       
			  		console.log(JSON.stringify(nowData.result.hdAddress))
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  	}else{
			  		console.log(nowData.message)

			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })
			  	}		  			
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},	
		getPageData(){
			let _this = this
			let parm = {
				 "stockOutSn": this.$route.query.stockOutSn,
		  		    //"orderId": this.$route.query.orderId,   出库单入口没有此参数
		  			 "signId": this.GLOBAL.userid
		  	}
			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/wms_web/selectForLogistics?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))			  		
			  		_this.outSn = nowData.result.stockOutSn
			  		_this.carNumber = nowData.result.car.card
			  		_this.regCompany = nowData.result.car.companyName
			  		_this.psy = nowData.result.driver.name
			  		_this.phone = nowData.result.driver.phone
			  		_this.jingdu = nowData.result.car.xlocation
			  		_this.weidu = nowData.result.car.ylocation
			  		_this.shidu = nowData.result.car.currentHumidity
			  		_this.wendu = nowData.result.car.currentTemperature
			  		_this.car = nowData.result.car
			  		console.log(_this.shidu)
			  		console.log(_this.wendu)
			  		_this.common.SStorage.setItem("logisticsInfoData",nowData.result)
			  	}else if(nowData.code == 10011){
			  		let demoData = _this.common.SStorage.getItem("logisticsInfoData")
			  		_this.outSn = demoData.orderId
			  		_this.carNumber = demoData.car.card
			  		_this.regCompany = demoData.car.companyName
			  		_this.psy = demoData.driver.name
			  		_this.phone = demoData.driver.phone
			  		_this.jingdu = demoData.car.xlocation
			  		_this.weidu = demoData.car.ylocation
			  		_this.shidu = nowData.result.car.currentHumidity
			  		_this.wendu = nowData.result.car.currentTemperature
			  		_this.car = nowData.result.car
			  		//console.log(_this.jingdu)
					//console.log(_this.weidu)
			  	}else{
			  		console.log(nowData.message)
			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    /*this.$message({
		          message: err,
		          type: 'warning'
		        })*/
			  })
		}
	},
	mounted(){
		this.getPageData()
		console.log(this.phone)
		console.log(this.weidu)
		
		console.log(this.wendu)
		console.log(this.shidu)
	}
}
	
</script>

<style type="text/css">
.cg-order-info .el-table--border th{
	background-color: #BEDCEB; color: #333333;
}	
</style>

<style scoped>
.wl-item{
	text-align: left; padding: 20px;
}
.wl-item > span:first-child{
	font-weight: bold;
}
.wl-item .item-last-span{
	border-bottom: 1px solid #c0c4c5; margin-left: 20px;
}
.wl-item-box{
	padding-left: 100px;
}
.wl-item-box > span:last-child{
	margin-left: 50px;
}
.wl-map{
	width: 378px; height: 249px; background-color: #009F95; margin-left: 100px;	
}

</style>