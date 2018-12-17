<template>
	<div class="gitManage">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="warehouseName" placeholder="请输入库房名称" ></el-input>
					</div>
				</li>
				<li>
					<el-button type="primary" @click="checkBut">查询</el-button>
					<el-button type="warning" @click="addStorehouseBox">新增库房</el-button>
				</li>
			</ul> 
		</div>
		<div class="table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="storeName" label="库房名称">
			    </el-table-column>
			    <el-table-column prop="temperatureOption" label="预设温度范围（℃）">
			    </el-table-column>
			    <el-table-column prop="humidityOption" label="预设湿度范围（%）">
			    </el-table-column>
			    <el-table-column prop="currentTemperature" label="实时温度">
			    </el-table-column>
			    <el-table-column prop="currentHumidity" label="实时湿度">
			    </el-table-column>
			    <el-table-column prop="name" label="所属仓库">
			    </el-table-column>			    
			    <el-table-column prop="" label="操作" width="100">
			    	<template slot-scope="scope">
			    		<span>
				    		<i class="el-icon-delete" @click="deleteLine(scope.row.storeId)" title="删除"></i>				    		
				    		<i class="el-icon-edit" style="margin-left: 5px;" @click="editStorehouseBox(scope.row)" title="修改"></i>	
				    		<i class="el-icon-view" style="margin-left: 5px;" @click="seeVideo(scope.row)" title="查看视频"></i>
			    		</span>	
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
		
		<!--新增仓库弹窗-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		  	<el-form-item label="库房名称" :label-width="formLabelWidth">
				<el-input v-model="form.gitName" placeholder="请输入仓库编号" style="width:200px"></el-input>
		   </el-form-item>
		  	<el-form-item label="预设湿度(%)" :label-width="formLabelWidth">
				<el-input v-model="form.sdLow" placeholder="" style="width:100px"></el-input>
				<el-input v-model="form.sdHigh" placeholder="" style="width:100px"></el-input>
		   </el-form-item>	  	
		    <el-form-item label="所属仓库" :label-width="formLabelWidth">
		      <el-select v-model="form.ownGit" @change="choseShenpiren" placeholder="请选择">
		        <el-option
			      v-for="item in gitList"
			      :key="item.repertoryId"
			      :label="item.name"
			      :value="item.repertoryId">
			    </el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="预设温度(℃)" :label-width="formLabelWidth">
				<el-input v-model="form.wdLow" placeholder="" style="width:100px"></el-input>
				<el-input v-model="form.wdHigh" placeholder="" style="width:100px"></el-input>
		   </el-form-item>
		    <el-form-item label="预警接收人" :label-width="formLabelWidth">
		        <el-select v-model="yujingData" multiple placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.userId"
				      :label="item.name"
				      :value="item.userId">
				    </el-option>
				</el-select>
		    </el-form-item>	
		    <el-form-item label="库房编码" :label-width="formLabelWidth">
		        <el-input v-model="form.storeCode" placeholder="请输入库房编码" style="width:200px"></el-input>
		    </el-form-item>		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </div>
		</el-dialog>
		
<!--添加弹窗-->
		<el-dialog title="查看" :visible.sync="dialogFormVisible2">
		  <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="videoCode" label="视频编码">
			    	<template slot-scope="scope">
			    		<!--<el-input v-model="scope.row.videoCode" placeholder="输入视频编码" style="width: 150px;"></el-input>-->
			    		<span v-text="scope.row.videoCode"></span>
			    	</template>	
			    </el-table-column>
			    <el-table-column prop="videoSn" label="设备编码">
			    	<template slot-scope="scope">
			    		<!--<el-input v-model="scope.row.videoSn" placeholder="输入设备编码" style="width: 150px;"></el-input>-->
			    		<span v-text="scope.row.videoSn"></span>
			    	</template>		
			    </el-table-column>
			    <el-table-column prop="" label="操作">
			    	<template slot-scope="scope">
			    		<i class="el-icon-view" style="margin-left: 10px;" @click="viewVideo(scope.row)" title="查看视频"></i>
			    	</template>
			    </el-table-column>			    	    
			  </el-table>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <!--<el-button type="primary" @click="confirm2">确 定</el-button>-->
		  </div>
		</el-dialog>		
	</div>
	
	
</template>

<script>
	
export default{
	data(){
		return{
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数
			dialogFormVisible: false,
			dialogFormVisible2: false,
			warehouseName: '',		//库房名称
			form: {
	          gitName: '',
	          ownGit: '',
	          sdLow: '',
	          sdHigh: '',
	          wdLow: '',
	          wdHigh: '',
	          storeCode: ''
	        },
	        storeId: null,		//当前仓库ID
	        formLabelWidth: '94px',
	        dialogTitle: '',
	        tableData: [],
	        tableData2: [],
	        gitList: [{
		          value: 1,
		          label: '私有仓库'
		        }, {
		          value: 2,
		          label: '平台仓库'
		        }],
		    options: [],
	        yujingData: []
		}
	},
	methods:{
    	cancel(){
    		this.dialogFormVisible = false
    		this.dialogFormVisible2 = false
    	},	
    	confirm(){
    		if(this.dialogTitle == '新增库房'){
    			this.addStorehouse()
    		}else{
    			this.editStorehouse()
    		}
    	},	
    	seeVideo(row){
			this.dialogFormVisible2 = true
			if(row.videoSn){
				let arr = row.videoSn.split(",")
				let arr2 = []
				for (let i=0;i<arr.length ;i++ ){
					arr2[i] = {
						'videoCode': arr[i].split(":")[0],
						'videoSn': arr[i].split(":")[1]
					}
				}
				//console.log(JSON.stringify(arr2))
				this.tableData2 = arr2
			}else{
				this.tableData2 = []
			}
			
		},
		viewVideo(row){
    		let parm = {		
    				  "videoSn": row.videoSn,
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
    	queryTableData(){
    		let _this = this
    		let parm = {
			  	 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				   "pageNum": this.nowPage,
				  "pageSize": this.pageSize,
				 "storeName": this.warehouseName,
			     	"signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectForStoreroomManage?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.tableData = nowData.result.list
			  		this.common.SStorage.setItem("kufangManageTableData",nowData.result)
			  		_this.totalCount = nowData.result.total
			  		console.log(JSON.stringify(_this.tableData))
			  		this.$message({
			           message: nowData.message,
			           type: 'success'
			        }) 
			  	}else if(nowData.code == 10011){
			  		_this.tableData = this.common.SStorage.getItem("kufangManageTableData").list
			  		_this.totalCount = parseInt(this.common.SStorage.getItem("kufangManageTableData").total)
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
			  		console.log(nowData)
			  		_this.tableData = []
			  		_this.totalCount = null
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
    	choseShenpiren(){
    		
    	},
 		checkBut(){
 			this.queryTableData()
 		},
 		editStorehouseBox(rows){
 			this.dialogFormVisible = true
 			this.dialogTitle = '编辑库房'
 			
 			let arrLs = rows.warningUserId.split(",")
 			for(let i=0; i<arrLs.length; i++){
 				arrLs[i] = parseInt(arrLs[i])
 			}
 			
 			this.form.gitName = rows.storeName
 			this.form.ownGit = rows.repertoryId
 			this.yujingData = arrLs
 			this.form.wdLow = rows.temperatureDown
 			this.form.wdHigh = rows.temperatureUp
 			this.form.sdLow = rows.humidityDown
 			this.form.sdHigh = rows.humidityUp
 			this.form.storeCode = rows.storeCode
 			
 			console.log(JSON.stringify(this.yujingData))
 			this.storeId = rows.storeId
 		},
 		editStorehouse(){
 			let _this = this
    		let parm = {
					    "storeId": this.storeId,
					  "storeName": this.form.gitName,
					"repertoryId": this.form.ownGit,
				  "warningUserId": this.yujingData.toString(','),
				"temperatureDown": this.form.wdLow,
				  "temperatureUp": this.form.wdHigh,
				   "humidityDown": this.form.sdLow,
					 "humidityUp": this.form.sdHigh,
					  "storeCode": this.form.storeCode,
				       "updateId": this.common.SStorage.getItem("saveUserInfo").userId,				      
			     	     "signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			_this.$axios.get('/wms_web/updateStoreroom?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){					  		
			  		this.$message({
			           message: nowData.message,
			           type: 'success'
			        }) 
			        setTimeout(function(){
						window.location.reload()
				  	},700)
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
 		addStorehouseBox(){
 			this.dialogFormVisible = true
 			this.dialogTitle = '新增库房'
 			
 			this.form.gitName = ''
 			this.form.ownGit = null
 			this.yujingData = []
 			this.form.wdLow = null
 			this.form.wdHigh = null
 			this.form.sdLow = null
 			this.form.sdHigh = null
 			this.form.stroeCode = null
 		},
 		addStorehouse(){
 			let _this = this
    		let parm = {
				 "storeName": this.form.gitName,
				  "createId": this.common.SStorage.getItem("saveUserInfo").userId,
			   "repertoryId": this.form.ownGit,
			 "warningUserId": this.yujingData.toString(','),
		   "temperatureDown": this.form.wdLow,
			 "temperatureUp": this.form.wdHigh,
			  "humidityDown": this.form.sdLow,
				"humidityUp": this.form.sdHigh,
				 "storeCode": this.form.storeCode,
			     	"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			_this.$axios.get('/wms_web/insertStoreroom?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){					  		
			  		this.$message({
			           message: nowData.message,
			           type: 'success'
			        }) 
			        setTimeout(function(){
						window.location.reload()
				  	},700)
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
 		deleteLine(vid){
 			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	  			let parm = {
			  		"storeId": vid,
			  		"signId": this.GLOBAL.userid
			  	}
	  			console.log(parm)
					let baseparm = this.common.DataToBase64(JSON.stringify(parm))
					this.$axios.get('/wms_web/deleteStoreroom?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
						
					  .then((res) => {				  	
					  	let nowData = JSON.parse(this.common.base64ToData(res.data))
					  	console.log(nowData)
					  	if(nowData.code == 0){	
					  		console.log(nowData.result)
						  	this.$message({
					            type: 'success',
					            message: '删除成功!'
					          })
						  	setTimeout(function(){
								window.location.reload()
						  	},700)
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
	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          })        
	        })
 		},
 		storeList(){
 			let _this = this
    		let parm = {
				  "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
			     	"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectAllRepertory?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.gitList = nowData.result
			  		console.log(JSON.stringify(_this.gitList))
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
 		warningUserList(){
 			let _this = this
    		let parm = {
				  "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
			     	"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/warningUserList?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.options = nowData.result
			  		console.log(JSON.stringify(_this.options))
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
 		}
	},
	mounted (){
		this.queryTableData()
		this.storeList()
		this.warningUserList()
	}
}
	
</script>
<style type="text/css">
.gitManage .el-form-item__content{
	text-align: left;
}
.gitManage .el-dialog{
	width: 760px;
}
.gitManage .el-dialog__header{
	text-align: left;
}
.gitManage .el-form-item{
	width: 300px; float: left;
}
.gitManage .el-form-item:nth-child(even){
	margin-left: 20px;
}
.gitManage .el-form{
	overflow: hidden;
}
</style>
<style scoped>
.table-head{
	padding: 10px 0; border-bottom: 1px solid #DCDFE6;	
}
.table-head ul li{
	float: left; margin-right: 20px; margin-bottom: 10px;
}	

</style>