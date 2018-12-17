<template>
	<div class="distributor-add-goods">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="searchText" placeholder="查商品编号或商品名称"></el-input>
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						商品类别:
					    <el-select v-model="goodsCategory" placeholder="请选择" @change="getGoodsCategory">
						    <el-option
						      v-for="item in goodsList"
						      :key="item.name"
						      :label="item.name"
						      :value="item.name">
						    </el-option>
						</el-select> 
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						商品类型:
					    <el-select v-model="goodsType" placeholder="请选择" @change="getGoodsType">
						    <el-option
						      v-for="item in goodsTypeList"
						      :key="item.classCode"
						      :label="item.name"
						      :value="item.classCode">
						    </el-option>
						</el-select> 
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						所属分类目录:
					    <el-select v-model="ownClassMenu" placeholder="请选择" @change="getClassMenu">
						    <el-option
						      v-for="item in menuList"
						      :key="item.classCode"
						      :label="item.name"
						      :value="item.classCode">
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
					<el-button type="warning" style="margin-left: 30px;" @click="addBut">新增</el-button>			
				</li>
			</ul> 
		</div>
		<div class="table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="productSn" label="商品编号">
			    </el-table-column>
			    <el-table-column prop="name" label="商品名称" width="200px">
			    </el-table-column>
			    <el-table-column prop="belongPlatformString" label="中标号">
			    	<template slot-scope="scope">
			    		<el-popover
						  placement="right"
						  width="400"
						  trigger="click"
						  @show="zbhListShow(scope.row)"
						  >
						  <el-table :data="zbhData">
						    <el-table-column width="100" property="locationName1" label="省"></el-table-column>
						    <el-table-column width="100" property="locationName2" label="市"></el-table-column>
						    <el-table-column width="100" property="code" label="中标号"></el-table-column>
						    <el-table-column width="100" property="code" label="操作">
						    	<template slot-scope="scope2">
						    		<i class="el-icon-delete pointer font-18" title="删除" @click="deleteOneZbh(scope2.row)" v-show="userType == 2"></i>
						    	</template>
						    </el-table-column>
						  </el-table>
						  <i class="el-icon-view" slot="reference" title="查看中标号" ></i>
						</el-popover>	
			    	</template>
			    </el-table-column>
			    <el-table-column prop="attribute" label="商品类别">
			    </el-table-column>
			    <el-table-column prop="className" label="所属分类目录" width="200px">
			    </el-table-column>
			    <el-table-column prop="packing" label="规格型号">
			    </el-table-column>
			    <el-table-column prop="unit" label="计量单位">
			    </el-table-column>
			    <el-table-column prop="registrationNumber" label="注册证号" width="200px">
			    </el-table-column>
			    <el-table-column prop="factoryName" label="生产厂家" width="200px">
			    </el-table-column>
			    <el-table-column prop="licenseNumber" label="生产企业许可证号" width="200px">
			    </el-table-column>
			    <el-table-column prop="expiryDate" label="有效期">
			    </el-table-column>
			    <el-table-column prop="temperature" label="存储温度">
			    </el-table-column>
			    <el-table-column prop="humidity" label="存储湿度">
			    </el-table-column>
			    <el-table-column prop="statusStr" label="商品状态">
			    	<template slot-scope="scope">
			    		<el-tooltip :content="'当前状态是: ' + scope.row.statusStr" placement="top">
				    		<el-switch
							  v-model="scope.row.statusStr"
							  active-color="#ff4949"
							  inactive-color="#13ce66"
							  active-value="1"
							  inactive-value="0"
							  @change="switchOn(scope.row.statusStr, scope.row)"
							>
							</el-switch>
						</el-tooltip>
			    	</template>
			    </el-table-column>			    
			    <el-table-column prop="" label="操作" width="100">
			    	<template slot-scope="scope">
			    		<span>
				    		<i class="el-icon-delete" title="删除" @click="deleteLine(scope.row.dgoodsId.toString())"></i>
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
		<el-dialog title="新增" :visible.sync="dialogVisible" class="dialog-box">
		  <el-form :model="form" :rules="rules" style="border-bottom: 1px solid #EBEEF5;">
		    <el-form-item label="生产厂家" :label-width="formLabelWidth" prop="phone" >
		        <el-select v-model="form.factory" filterable placeholder="请输入生产厂家名称" @change="changeFactory">
			    	<el-option
				      v-for="item in factoryList"
				      :key="item.companyId"
				      :label="item.factoryName"
				      :value="item.companyId">
				    </el-option>
				</el-select>
		    </el-form-item>		   
		  </el-form>
		  <div class="dialog-body" style="text-align: left;" v-show="factoryTableShow">
	    		<el-input v-model="goodsInput" placeholder="查询商品编号或名称" style="width: 200px;"></el-input>
	    		<el-button type="primary" style="margin-left: 20px;" @click="goodsQuery">查询</el-button>
	    		<el-table ref="multipleTable" :data="gridData" tooltip-effect="dark" height="320" style="width: 100%;text-align: left; max-height: 320px;
   					 overflow-y: auto;" @selection-change="winSelectionChange">
				    <el-table-column type="selection" width="50"></el-table-column>
				    <el-table-column prop="productSn" label="商品编号">
				    </el-table-column>
				    <el-table-column prop="name" label="商品名称" width="200px">		      
				    </el-table-column>
				    <!--<el-table-column prop="code" label="中标号">
				    </el-table-column>-->
				    <el-table-column prop="attribute" label="商品类别">
				    </el-table-column>
				    <el-table-column prop="className" label="所属分类目录" width="120px">
				    </el-table-column>
				    <el-table-column prop="packing" label="规格型号">
				    </el-table-column>
				    <el-table-column prop="unit" label="计量单位">
				    </el-table-column>
				    <el-table-column prop="registrationNumber" label="注册证号" width="200px">
				    </el-table-column>
				    <el-table-column prop="licenseNumber" label="生产企业许可证号" width="200">
				    </el-table-column>
				    <el-table-column prop="expiryDate" label="有效期">
				    </el-table-column>
				    <el-table-column prop="humidity" label="存储温度(℃)">
				    </el-table-column>
				    <el-table-column prop="temperature" label="存储湿度(%)">
				    </el-table-column>			    
				  </el-table>
	      </div>
	      
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
			userType: null,			//用户类型,如:厂家\经销商等
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数
			searchText: '',		//搜索内容
			goodsCategory: null,
			goodsType: null,
			ownClassMenu: null,
			goodsList: [
				{
					value: 0,
					name: 'Ⅰ'
				},
				{
					value: 1,
					name: 'Ⅱ'
				},
				{
					value: 2,
					name: 'Ⅲ'
				}
			],
			goodsTypeList: [],
			menuList: [],
			tableData: [],
			zbhData: [],
			dialogVisible: false,
			formLabelWidth: '90px',
			locationCode:'',
			form: {
				factory: ''
			},
			factoryList: [],
			goodsInput: '',
			factoryTableShow: false,
			gridData: [],				//新增查询表格数据
			selectData: []				//选中商品
		}
	},	
	methods:{	
		reset(){
			this.searchText = ''
			this.goodsCategory = null
			this.goodsType = null
			this.ownClassMenu = null
		},			
		confirm(){
			this.addGoodsInfo()
		},
		addGoodsInfo(){
			let str = ''
			console.log(JSON.stringify(this.selectData))
			for(let i=0; i<this.selectData.length; i++){
				str += this.selectData[i].fgoodsId+','
			}
			
			let parm = {
					      "goodsId": str.substring(0,str.length-1),
    				       "signId": this.GLOBAL.userid
		  			}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/insetDealerProductGoodsNew?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  		
			  		setTimeout(function(){
			  			this.factoryTableShow = false
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
		checkBut(){
			this.getTableData()
		},
		changeFactory(val){
			console.log(val)
			this.factoryTableShow = true	
			this.gridData = []
		},
    	winSelectionChange(val){
    		this.selectData = val
    		console.log(JSON.stringify(val))
    	},		
		queryFactoryTableData(){
			let arr = [this.form.factory]
			let parm = {
		  		     	 "nameOrsn": this.goodsInput,
					    "companyId": arr,
    				       "signId": this.GLOBAL.userid
		  			}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/product/selectFactoryGoodsForDealer?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
			  		this.gridData = nowData.result
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
		goodsQuery(){
			this.queryFactoryTableData()			
		},
		addBut(){
			this.dialogVisible = true
			
			let parm = {
		  		     	 "name": this.form.factory,
    				   "signId": this.GLOBAL.userid
		  			}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/product/getFactoryName?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
			  		this.factoryList = nowData.result
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
		deleteLine(gid){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				let _this = this
	    		let parm = {
							   "goodsId": gid,
				     			"signId": this.GLOBAL.userid
		    			}  
	
					let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
					console.log(parm)
						
				_this.$axios.post('/product-web/deleteDealerProductGoodsMuch?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
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
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          })        
	        })					  
		},
		getGoodsCategory(val){
			console.log(val)
		},
		getGoodsType(val){
			console.log(val)
			this.getGoodsMenu(val)    //加载商品类别
			this.ownClassMenu = ''
		},
		getClassMenu(val){
			console.log(val)
		},
		getTableData(){
			let _this = this
    		let parm = {
						  "nameOrsn": this.searchText,
						 "className": this.ownClassMenu ? this.ownClassMenu : this.goodsType,
						 "attribute": this.goodsCategory,		
						   "pageNum": this.nowPage,
						  "pageSize": this.pageSize,
			     			"signId": this.GLOBAL.userid
	    			}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.post('/product-web/selectForDealer?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
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
					    	"goods":{
						        "status": val,
						        "dgoodsId": valRow.dgoodsId
						    },
						    "signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/updateDealerProductGoods?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
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
		getGoodsMenu(vid){		//查询商品分类
			let _this = this
			let parm =  {
							  "type": 1,
						    "signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/product/getProductClass?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
			  		_this.goodsTypeList = nowData.result[0].parent
			  		
			  		if(vid == 1){
			  			_this.menuList = nowData.result[0].drug
			  		}else{
			  			_this.menuList = nowData.result[0].inss
			  		}
			  		console.log(JSON.stringify(_this.menuList))
			  		/*this.$message({
			          message: nowData.message,
			          type: 'success'
			        })*/
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
		deleteOneZbh(row){
			console.log(JSON.stringify(row))
			this.$confirm('确定删除该中标号吗?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	  			let parm = {
			  		    "id": row.id.toString(),
			  		"signId": this.GLOBAL.userid
			  	}
	  			console.log(parm)
					let baseparm = this.common.DataToBase64(JSON.stringify(parm))
					this.$axios.post('/product-web/bid/deleteMuch?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
						
					  .then((res) => {				  	
					  	let nowData = JSON.parse(this.common.base64ToData(res.data))
					  	console.log(nowData)
					  	if(nowData.code == 0){	
					  		console.log(nowData.result)
						  	this.$message({
					            type: 'success',
					            message: '删除成功!'
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
	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          })        
	        })	
		},
		zbhListShow(row){
			console.log(row)
			let _this = this
			let parm =  {
						   "goodsId": row.fgoodsId,
						    "signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/bid/getByQuery?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
			  		_this.zbhData = nowData.result
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
		this.getGoodsMenu()
		this.getTableData()	
		
		this.userType = this.common.SStorage.getItem("saveUserInfo").userType 
	}	
}
</script>

<style type="text/css">
/*新增弹窗*/
.distributor-add-goods .el-form-item__content{
	text-align: left;
} 
.distributor-add-goods .el-dialog{
	width: 800px;
}
.distributor-add-goods .el-dialog__header{
	text-align: left;
}
.distributor-add-goods .el-form{
	text-align: left; height: 50px; margin-bottom: 10px;
}
.distributor-add-goods .el-form-item{
	display: inline-block;
}
.distributor-add-goods .el-dialog__wrapper.dialog-box .el-input__inner{
	width: 200px;
}	
.distributor-add-goods .el-dialog__body{
	max-height: 420px; padding: 10px 20px;
}
.distributor-add-goods .el-popper{
	height: 500px!important;
}
</style>
<style scoped>
.table-head{
	padding: 10px 0; border-bottom: 1px solid #DCDFE6;	
}
.table-head ul li{
	float: left; margin-right: 20px; margin-bottom: 10px;
}	

.zbh-operation{
	margin-left: 20px; position: absolute; top: 25px; left: 515px;
}
.zbh-list li{
	margin-top: 5px;
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