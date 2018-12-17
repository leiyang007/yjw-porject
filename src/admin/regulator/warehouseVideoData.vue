<template>
	<div class="ckjk-video-data">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="stroeName" placeholder="请输入仓库或公司名称" style="width: 176px;"></el-input>
					</div>
				</li>
				<li>
					<div class="demo-input-suffix">
					  仓库地址：
					  	  <el-select v-model="province" placeholder="省" @change="provChange" style="width: 160px;">
						    <el-option
						      v-for="item in provinceList"
						      :key="item.code"
						      :label="item.fullName"
						      :value="item.code">
						    </el-option>
						  </el-select> 
						  <el-select v-model="city" placeholder="市" @change="cityChange" style="width: 160px;">
						    <el-option
						      v-for="item in cityList"
						      :key="item.code"
						      :label="item.fullName"
						      :value="item.code">
						    </el-option>
						  </el-select> 
						  <el-select v-model="area" placeholder="区" @change="areaChange" style="width: 160px;">
						    <el-option
						      v-for="item in areaList"
						      :key="item.code"
						      :label="item.fullName"
						      :value="item.code">
						    </el-option>
						  </el-select>
					</div>
				</li>
				<li>
					<el-button type="primary" @click="checkBut">查询</el-button>
				</li>
				<li>
					<el-button type="info" @click="reset">重置</el-button>
				</li>
			</ul> 
		</div>
		<div class="table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="sn" label="仓库编号">
			    </el-table-column>
			    <el-table-column prop="name" label="仓库名称">
			    </el-table-column>
			    <el-table-column prop="address" label="仓库地址" width="300px">
			    </el-table-column>	
			    <el-table-column prop="companyName" label="所属公司">
			    </el-table-column>
			    <el-table-column prop="storeName" label="库房名称">
			    </el-table-column>
			    <el-table-column prop="videoSn" label="设备编号">
			    </el-table-column>
			    <el-table-column prop="videoCode" label="视频编号">
			    </el-table-column>
			    <el-table-column prop="" label="操作">
			    	<template slot-scope="scope">
			    		<!--<router-link :to="{path: '/yjw_admin/videoPlay',query:{
				    				   	  AppKey: scope.row.appKey, 
									 AccessToken: accessToken, 
									 	 videoSn: scope.row.videoSn
			    			}}">-->
			    		<i class="el-icon-search" style="margin-left: 10px;" v-if="scope.row.videoSn != null" @click="viewVideo(scope.row)" title="查看"></i>	
			    		<!--</router-link>-->
			    	</template>
			    </el-table-column>			    
			  </el-table>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="nowPage"
			      :page-size="pageSize"
			      layout="prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
			</template>				
		</div>		
	</div>
</template>

<script>
export default{
	data(){
		return{
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数
			stroeName: null,
			provinceList: [],
			cityList: [],
			areaList: [],
			province: null,		//code码
			city: null,
			area: null,
			province2: null,			
			city2: null,			
			area2: null,
			tableData: [],
			//accessToken: ''
		}
	},
	methods:{
		viewVideo(row){
			let _this = this
    		let parm = {			   
			     	   "signId": this.GLOBAL.userid
	    	}  

				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			this.$axios.get('/wms_web/getVideoToken?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		//this.accessToken = nowData.result.accessToken
			  		
			  		setTimeout(function(){
				       		window.location.href = "../../../static/videoPlay.html?AppKey="+nowData.result.appKey+"&AccessToken="+nowData.result.accessToken+"&videoSn="+row.videoSn;				       		
			  		},500)
				       
			  		console.log(JSON.stringify(nowData.result))
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
		reset(){
			this.stroeName = null
			this.province = null
			this.city = null
			this.area = null			
		},
		checkBut(){
			this.queryTableData()
		},
		queryTableData(){
			let _this = this
    		let parm = {			   
			   "repertoryVo": {
						"regionCode1": this.province,
						"regionCode2": this.city,
						"regionCode3": this.area
					},
					"selectStr": this.stroeName,
				   "locationId": this.common.SStorage.getItem("saveUserInfo").locationId,
					 "property": this.common.SStorage.getItem("saveUserInfo").property,
						 "type": 0,
					  "pageNum": this.nowPage,
					 "pageSize": this.pageSize,
			     	   "signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			_this.$axios.get('/wms_web/selectForVideoMonitor?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.tableData = nowData.result.list
			  		_this.totalCount = parseInt(nowData.result.total)
			  		console.log(JSON.stringify(_this.tableData))
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  	}else if(nowData.code == 800){
			  		console.log(nowData.message)
			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })
			  		setTimeout(function(){
			  				_this.common.SStorage.removeItem("userKey")
					  		_this.$router.push('/')
							window.location.reload()
					  	},700)
			  	}else{
			  		console.log(nowData.message)
			  		_this.tableData = []
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
 		handleSizeChange(val){
    		this.pageSize = val
    		console.log(this.pageSize)
    	},
    	handleCurrentChange(val){
    		this.nowPage = val
    		console.log('当前页是:'+this.nowPage)
    		this.queryTableData()
    	},		
 		prov_city_area(){
				let _this = this
				
			//初步加载省级数据
				let parm = {
			  		'type':1,
			  		'parentCode':100000
			  	}
				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(baseParm)
					
			_this.$axios.get('/wms_web/regionSelect?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
	
			  	if(nowData.code == 0){		
			  		_this.provinceList = nowData.result.data
			  		console.log(JSON.stringify(_this.provinceList))
			  	}else{
			  		console.log(nowData.message)
			  	}		  			
			  })
			  .catch((err) => {
			    console.log(err);
			  })
			//初步加载省级数据end	

		},
 		provChange (data){
 			this.province = data
 			console.log('省级编号:'+data)
			this.city = null	//每次选择省级清空市和区
			this.area = null	//同上
			let _this = this
			//加载市级数据	
			  let parm = {
			  		'type':2,
			  		'parentCode':data
			  	}
				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
				_this.$axios.get('/wms_web/regionSelect?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	
				  	let nowData = JSON.parse(_this.common.base64ToData(res.data))

				  	if(nowData.code == 0){		
				  		_this.cityList = nowData.result.data
				  		console.log(JSON.stringify(_this.cityList))
				  	}else{
				  		console.log(nowData.message)
				  	}		  			
				  })
				  .catch((err) => {
				    console.log(err);
				  })
				//加载市级数据end  			
 		},
 		cityChange (data){
 			this.city = data
 			console.log('市级编号:'+data)
 			this.area = null	//每次选择市清空区
			
			let _this = this
			//加载区级数据	
			  let parm = {
			  		'type':3,
			  		'parentCode':data
			  	}
				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
				_this.$axios.get('/wms_web/regionSelect?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	
				  	let nowData = JSON.parse(_this.common.base64ToData(res.data))

				  	if(nowData.code == 0){		
				  		_this.areaList = nowData.result.data
				  		console.log(JSON.stringify(_this.areaList))
				  	}else{
				  		console.log(nowData.message)
				  	}		  			
				  })
				  .catch((err) => {
				    console.log(err);
				  })
				//加载区级数据end
 		},
 		areaChange (data){
 			this.area = data
 			console.log('区级编号:'+data)
 		},
 	},
	mounted (){
		this.prov_city_area()  		//初步加载省级数据
		
		this.queryTableData()	
	} 	
}
</script>

<style scope>
.table-head{
	padding: 10px 0; border-bottom: 1px solid #DCDFE6;	
}
.table-head ul li{
	float: left; margin-right: 20px; margin-bottom: 10px;
}		
</style>