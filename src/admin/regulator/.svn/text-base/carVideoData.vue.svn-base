<template>
	<div class="car-jk-data">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="searchText" placeholder="请输车牌号或车辆公司名称" style="width: 200px;"></el-input>
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
			    <el-table-column prop="card" label="车牌号">
			    </el-table-column>
			    <el-table-column prop="carTypeString" label="车牌类型">
			    </el-table-column>
			    <el-table-column prop="belongPlatformString" label="车辆类型">
			    </el-table-column>	
			    <el-table-column prop="companyName" label="所属公司">
			    </el-table-column>	
			    <el-table-column prop="videoSn" label="设备编号">
			    </el-table-column>
			    <el-table-column prop="videoCode" label="视频编号">
			    </el-table-column>	
			    <el-table-column prop="" label="操作">
			    	<template slot-scope="scope">
			    		<i class="el-icon-search" style="margin-left: 10px;" v-if="scope.row.videoSn != null" @click="viewVideo(scope.row)" title="查看"></i>	
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
			nowPage: 1,				    			//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,							//总条数
			searchText: null,
			tableData: []
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
			this.searchText = null				
		},		
		checkBut(){
			this.queryTableData()
		},
		queryTableData(){
			let _this = this
			
    		let parm = {			   
					"selectStr": this.searchText,
				   "locationId": this.common.SStorage.getItem("saveUserInfo").locationId,
					 "property": this.common.SStorage.getItem("saveUserInfo").property,
						 "type": 1,
					  "pageNum": this.nowPage,
					 "pageSize": this.pageSize,
			     	   "signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
				console.log(JSON.stringify(baseParm))
				console.log(JSON.stringify(_this.GLOBAL.urlStr(parm)))
					
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
    	}
 	},
	mounted (){
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