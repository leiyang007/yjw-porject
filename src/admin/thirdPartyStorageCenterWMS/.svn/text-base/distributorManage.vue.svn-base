<template>
	<div class="distributor-manage">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="searchText" placeholder="查询姓名或公司"></el-input>
					</div>
				</li>
				<li>
					<el-button type="primary" @click="checkBut">查询</el-button>
				</li>
			</ul> 
		</div>
		<div class="table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="driverId" label="用户编号">
			    </el-table-column>
			    <el-table-column prop="name" label="姓名">
			    </el-table-column>
			    <el-table-column prop="sexString" label="性别">
			    </el-table-column>
			    <el-table-column prop="phone" label="联系方式">
			    </el-table-column>
			    <el-table-column prop="imgUp" label="驾驶证正面">
			    	<template slot-scope="scope">
			    		<img :src="scope.row.imgUp" alt="" style="width: 30px; height: 20px;" />
			    	</template>
			    </el-table-column>
			    <el-table-column prop="imgDown" label="驾驶证反面">
			    	<template slot-scope="scope">
			    		<img :src="scope.row.imgDown" alt="" style="width: 30px; height: 20px;" />
			    	</template>
			    </el-table-column>
			    <el-table-column prop="companyName" label="注册公司">
			    </el-table-column>
			    <el-table-column prop="statusString" label="启用状态">
			    	<template slot-scope="scope">
			    		<el-tooltip :content="'当前状态是: ' + scope.row.statusString" placement="top">
				    		<el-switch
							  v-model="scope.row.statusString"
							  active-color="#ff4949"
							  inactive-color="#13ce66"
							  active-value="0"
							  inactive-value="1"
							  @change="switchOn(scope.row.statusString, scope.row)"
							>
							</el-switch>
						</el-tooltip>
			    	</template>
			    </el-table-column>			    
			    <el-table-column prop="" label="操作" width="100">
			    	<template slot-scope="scope">
			    		<span>	
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
		<el-dialog title="修改" :visible.sync="dialogVisible" class="dialog-box">
		  <el-form :model="form" :rules="rules">
		    <el-form-item label="姓名" :label-width="formLabelWidth" >
		      <el-input v-model="form.name" placeholder="请输入姓名" disabled="disabled"></el-input>
		    </el-form-item>
		    <el-form-item label="性别" :label-width="formLabelWidth">
		        <el-select v-model="form.sex" :change="selectSex(form.sex)" disabled="disabled" placeholder="请选择">
				    <el-option
				      v-for="item in sexList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="联系方式" :label-width="formLabelWidth">
		        <el-input v-model="form.phone" placeholder="请输入手机号" disabled="disabled"></el-input>
		    </el-form-item>
		    <el-form-item label="注册公司" :label-width="formLabelWidth">
		        <el-input v-model="form.companyName" placeholder="请输入公司名" disabled="disabled"></el-input>
		    </el-form-item>
		    <el-form-item label="身份证正面照" :label-width="formLabelWidth" >
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
				  <p class="blue-font font-13">请上传jpg/png图片</p>
				</el-upload>	        
		    </el-form-item>
		    <el-form-item label="身份证反面照" :label-width="formLabelWidth" style="float: right; margin-right: 214px;">
		        <el-upload
		          style="position: absolute;"
				  class="avatar-uploader"
				  :action="reqUrl2"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess2"
				  :before-upload="beforeAvatarUpload2"
				  :on-change="checkImg">
				  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  <p class="blue-font font-13">请上传jpg/png图片</p>
				</el-upload>	        
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
			reqUrl2: this.GLOBAL.uploadUrl,
			imageUrl: '',
			imageUrl2: '',
			compDocument: {},
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数
			searchText: '',		//搜索内容
			tableData: [],
			dialogVisible: false,
			formLabelWidth: '96px',
			form: {
	       	  name: '',
	       	  sex: null,
	          phone: '',
	          companyName: ''
	      },
	        sexList: [
	        	{
	        		id: 0,
	        		name: '女'
	        	},
	        	{
	        		id: 1,
	        		name: '男'
	        	}
	        ],
	        carId: null,			//车辆ID
	        noImage: true,			//判断是否传图
	        driverId: null			//配送员ID
		}
		
	},
	methods:{
		handleAvatarSuccess(res, file) {					//-----------上传单文件
		  	this.compDocument.businessLicense = res
		  	console.log(this.compDocument)
	        this.imageUrl = file.response;
	    },	
		handleAvatarSuccess2(res, file) {					//-----------上传单文件
		  	this.compDocument.businessLicense = res
		  	console.log(this.compDocument)
	        this.imageUrl2 = file.response;
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
	    beforeAvatarUpload2(file) {
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
			this.editeDistributorInfo()
		},
		selectSex(vid){
			console.log(vid)
			this.form.sex = vid
		},	
		checkBut(){
			this.getTableData()
		},
		editeBox(row){
			this.dialogVisible = true
			
			//console.log(JSON.stringify(row))
			this.form.name = row.name
			this.form.sex = row.sex
			this.form.phone = row.phone
			this.form.companyName = row.companyName
			
			this.imageUrl = row.imgUp
			this.imageUrl2 = row.imgDown
			this.driverId = row.driverId

		},
		editeDistributorInfo(){
			let _this = this
			
    		let parm = {													  
						       "imgUp": this.imageUrl,
							 "imgDown": this.imageUrl2,
							"updateId": this.common.SStorage.getItem("saveUserInfo").userId,
							"driverId": this.driverId,
	     					  "signId": this.GLOBAL.userid
	    			}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/updateDriver?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
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
		getTableData(){
			let _this = this
			
    		let parm = {
						 "selectStr": this.searchText,
						 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,		
						   "pageNum": this.nowPage,
						  "pageSize": this.pageSize,
			     			"signId": this.GLOBAL.userid
	    			}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectForDriverManage?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
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
			  		this.totalCount = null
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

			console.log(JSON.stringify(val))
			console.log(JSON.stringify(valRow))

			let parm =  {
					      "driverId": valRow.driverId,
							"status": val,
					    	"signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/wms_web/updateDriverUsable?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
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
.distributor-manage .el-form-item__content{
	text-align: left;
} 
.distributor-manage .el-dialog{
	width: 670px;
}
.distributor-manage .el-dialog__header{
	text-align: left;
}
.distributor-manage .el-form{
	text-align: left;
}
.distributor-manage .el-form-item{
	display: inline-block;
}
.distributor-manage .el-dialog__wrapper.dialog-box .el-input__inner{
	width: 200px;
}	
.distributor-manage .el-dialog__body{
	height: 310px;
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