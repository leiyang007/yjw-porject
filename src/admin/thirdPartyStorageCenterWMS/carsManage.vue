<template>
	<div class="cars-manage">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="searchText" placeholder="搜索车牌号/注册公司"></el-input>
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						车辆类型:
					    <el-select v-model="carType" placeholder="请选择" @change="getCarType">
						    <el-option
						      v-for="item in carList"
						      :key="item.value"
						      :label="item.name"
						      :value="item.value">
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
				<li>
					<el-button type="warning" @click="addBut">新增</el-button>
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
			    <el-table-column prop="departStatusString" label="发车状态">
			    </el-table-column>
			    <el-table-column prop="companyName" label="注册公司">
			    </el-table-column>
			    <el-table-column prop="usableStr" label="车辆是否可用">
			    	<template slot-scope="scope">
			    		<el-tooltip :content="'当前状态是: ' + scope.row.usableStr" placement="top">
				    		<el-switch
							  v-model="scope.row.usableStr"
							  active-color="#ff4949"
							  inactive-color="#13ce66"
							  active-value="1"
							  inactive-value="0"
							  @change="switchOn(scope.row.usableStr, scope.row)"
							>
							</el-switch>
						</el-tooltip>
			    	</template>
			    </el-table-column>			    
			    <el-table-column prop="" label="操作" width="100">
			    	<template slot-scope="scope">
			    		<span>
				    		<i class="el-icon-delete" title="删除" @click="deleteLine(scope.row.carId)"></i>
				    		<i class="el-icon-edit" title="编辑" style="margin-left: 5px;" @click="editeBox(scope.row)"></i>	
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
<!--新增弹窗-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="dialog-box">
		  <el-form :model="form" :rules="rules">
		    <el-form-item label="车牌号" :label-width="formLabelWidth" >
		      <el-input v-model="form.carNumber" placeholder="请输入车牌号!" :disabled="carNum"></el-input>
		    </el-form-item>
		    <el-form-item label="车辆编码" :label-width="formLabelWidth" >
		      <el-input v-model="form.carSn" placeholder="请输入车辆编码!"></el-input>
		    </el-form-item>
		    <el-form-item label="车辆类型" :label-width="formLabelWidth">
		        <el-select v-model="form.carType" @change="selectCarType(form.carType)" placeholder="请选择">
				    <el-option
				      v-for="item in carTypeList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="车牌类型" :label-width="formLabelWidth" style="position: relative;">
		        <el-select v-model="form.cardType" @change="selectCardType(form.cardType)" placeholder="请选择">
				    <el-option
				      v-for="item in cardTypeList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="车辆照片" :label-width="formLabelWidth" style="position: relative;">
		        <el-upload
		          style="position: absolute;"
				  class="avatar-uploader"
				  :action="reqUrl"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload"
				  :on-change="checkImg">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<p class="red-font" style="position: absolute; top: 33px; left: -73px; width: 63px; line-height: 20px;">(请上传带有车牌的车辆照片)</p>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
export default{
	data(){
		return{
			reqUrl: this.GLOBAL.uploadUrl,
			imageUrl: '',
			compDocument: {},
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数
			searchText: '',		//搜索内容
			carType: null,
			carList: [
				{
					value: 0,
					name: '平台车辆'
				},
				{
					value: 1,
					name: '私有车辆'
				}
			],
			tableData: [],
			dialogVisible: false,
			dialogTitle: '',
			formLabelWidth: '90px',
			form: {
	       	  carNumber: '',
	       	  carSn: '',
	       	  carType: '',
	          cardType: ''
	        },
	        carTypeList: [
	        	{
	        		id: 0,
	        		name: '平台车辆'
	        	},
	        	{
	        		id: 1,
	        		name: '第三方车辆'
	        	}
	        ],
	        cardTypeList: [
	        	{
	        		id: 0,
	        		name: '蓝牌'
	        	},
	        	{
	        		id: 1,
	        		name: '黄牌'
	        	}
	        ],
	        carId: null,			//车辆ID
	        carNum: false
		}
	},
	methods:{
		reset(){
			this.searchText = ''
			this.carType = null
		},			
		handleAvatarSuccess(res, file) {					//-----------上传单文件
		  	this.compDocument.businessLicense = res
		  	console.log(this.compDocument)
	        this.imageUrl = URL.createObjectURL(file.raw);
	    },	
	    beforeAvatarUpload(file) {
	        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
	        const isLt5M = file.size / 1024 / 1024 < 5;
	
	        if (!isJPG) {
	          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
	        }
	        if (!isLt5M) {
	          this.$message.error('上传头像图片大小不能超过 5MB!');
	        }
	        return isJPG && isLt5M;
	    },
		checkImg(file, fileList){
	      	if(fileList.length != 0){
	      		this.noImage = false
	      	}
	    },
		confirm(){
			if(this.dialogTitle == '新增'){
				this.addCarInfo()
			}else{
				this.editeCarInfo()
			}
		},
		selectCarType(vid){
			console.log(vid)
			this.form.carType = vid
		},
		selectCardType(vid){
			console.log(vid)
			this.form.cardType = vid
		},		
		getCarType(val){
			console.log(val)
		},
		checkBut(){
			this.getTableData()
		},
		addBut(){
			this.dialogVisible = true
			this.dialogTitle = '新增'
			
			this.form.carNumber = null
			this.form.carSn = null
			this.form.carType = null
			this.form.cardType = null
			this.imageUrl = null
			
			this.carNum = false
		},
		editeBox(row){
			this.dialogVisible = true
			this.dialogTitle = '修改'
			this.carNum = true
			
			//console.log(JSON.stringify(row))
			this.form.carNumber = row.card
			this.form.carType = row.belongPlatformString
			this.form.carSn = row.carSn  
			this.form.cardType = row.carTypeString
			this.imageUrl = row.carImg
			this.carId = row.carId
		},
		addCarInfo(){
			let _this = this
			
    		let parm = {
						 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
							"belongPlatform": this.form.carType,
							"carType": this.form.cardType,
							"carSn": this.form.carSn,
							"card": this.form.carNumber,
							"carImg": this.compDocument.businessLicense,
							"createId": this.common.SStorage.getItem("saveUserInfo").userId,
			     			"signId": this.GLOBAL.userid
	    			}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/insertCar?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData.result))
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
		editeCarInfo(){
			let _this = this
			let arr = this.cardTypeList
			let arr2 = this.carTypeList
			let carType = null
			let belongPlatform = null
			
			for(let i=0; i<arr.length; i++){
				if(arr[i].name == this.form.cardType){
					carType = arr[i].id
				}
			}
			
			for(let j=0; j<arr2.length; j++){
				if(arr2[j].name == this.form.carType){
					belongPlatform = arr2[j].id
				}
			}
			
    		let parm = {							
							 "carId": this.carId,
					"belongPlatform": belongPlatform == null ? this.form.carType : belongPlatform,
						   "carType": carType == null ? this.form.cardType : carType,
						     "carSn": this.form.carSn,
							  "card": this.form.carNumber,
							"carImg": this.imageUrl,
						  "updateId": this.common.SStorage.getItem("saveUserInfo").userId,
	     					"signId": this.GLOBAL.userid
	    			}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/updateCar?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData.result))
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
	  			let parmUser = {
			  		 "carId": vid,
			  		"signId": this.GLOBAL.userid
			  	}
	  			console.log(parmUser)
					let baseParmUser = this.common.DataToBase64(JSON.stringify(parmUser))
					this.$axios.post('/wms_web/deleteCar?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parmUser))
						
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
		getTableData(){
			let _this = this
			
    		let parm = {
						 "selectStr": this.searchText,
					"belongPlatform": this.carType,
						 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,		
						   "pageNum": this.nowPage,
						  "pageSize": this.pageSize,							
			     			"signId": this.GLOBAL.userid
	    			}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectForCarManage?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData.result))
			  	if(nowData.code == 0){		
			  		this.tableData = nowData.result.list
			  		this.totalCount = nowData.result.total
			  		console.log(JSON.stringify(this.tableData))
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
			  		console.log(nowData)
			  		this.tableData = []
			  		this.totalCount = 0
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
    		this.getTableData()
    	}, 	
		switchOn(val,valRow){
			//val = parseInt(val)
			console.log(JSON.stringify(val))
			console.log(JSON.stringify(valRow))
			//this.scope.row.usable = val
			let parm =  {
					         "carId": valRow.carId,
							"usable": val,
					    	"signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/wms_web/updateCarUsable?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.message))
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
	},
	mounted (){
		this.getTableData()
	}
}	
</script>
<style type="text/css">
/*新增弹窗*/
.cars-manage .el-form-item__content{
	text-align: left;
} 
.cars-manage .el-dialog{
	width: 670px;
}
.cars-manage .el-dialog__header{
	text-align: left;
}
.cars-manage .el-form{
	text-align: left;
}
.cars-manage .el-form-item{
	display: inline-block;
}
.cars-manage .el-dialog__wrapper.dialog-box .el-input__inner{
	width: 200px;
}	
.cars-manage .el-dialog__body{
	height: 260px;
}
</style>
<style scoped>
.table-head{
	padding: 10px 0; border-bottom: 1px solid #DCDFE6;	
}
.table-head ul li{
	float: left; margin-right: 20px; margin-bottom: 10px;
}	

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    width: 122px; height: 122px; 
    line-height: 122px; 
    border: 1px dashed #d0cece; 
    cursor: pointer;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>