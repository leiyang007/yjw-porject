<template>
	<div class="factory-add-goods">
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
					<router-link :to="{path: '/yjw_admin/factoryAddGoodsInfo'}">
						<el-button type="warning" style="margin-left: 30px;">新增</el-button>
					</router-link>				
				</li>
			</ul> 
		</div>
		<div class="table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="productSn" label="商品编号">
			    </el-table-column>
			    <el-table-column prop="name" label="商品名称">
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
						    		<i class="el-icon-delete pointer font-18" title="删除" @click="deleteOneZbh(scope2.row)"></i>
						    	</template>
						    </el-table-column>
						  </el-table>
						  <i class="el-icon-view" slot="reference" title="查看中标号" ></i>
						</el-popover>
			    		<el-popover
						  placement="right"
						  width="600"
						  trigger="click">
						  <ul class="zbh-list" style="max-height: 200px; overflow-y: auto;">
						  	<li v-for="items in zbhArray">
						  		  <el-select v-model="items.province" placeholder="省" @change="provChange">
								    <el-option
								      v-for="item in items.provinceList"
								      :key="item.code"
								      :label="item.fullName"
								      :value="item.code">
								    </el-option>
								  </el-select>
						  		  <el-select v-model="items.city" placeholder="市" @change="cityChange">
								    <el-option
								      v-for="item in items.cityList"
								      :key="item.code"
								      :label="item.fullName"
								      :value="item.code">
								    </el-option>
								  </el-select>
								  <el-input v-model="items.input" placeholder="请输入内容" style="width: 100px;"></el-input>								  							  
						  	</li>
						  </ul>
						  <span class="zbh-operation">
						  	<i class="el-icon-circle-plus pointer font-22" slot="reference" @click="addOneLine" title="添加一行" ></i>
						  	<i class="el-icon-remove pointer font-22" slot="reference" @click="deleOneLine" title="删除一行" ></i>
						  </span>
						  <el-button type="warning" style="margin: 0 auto; display: block; margin-top: 10px" @click="saveZbh(scope.row)">保存</el-button>
						  <i class="el-icon-circle-plus-outline" slot="reference" style="margin-left: 20px;" title="中标号管理" ></i>
						</el-popover>	
			    	</template>
			    </el-table-column>
			    <el-table-column prop="attribute" label="商品类别">
			    </el-table-column>
			    <el-table-column prop="className" label="所属分类目录">
			    </el-table-column>
			    <el-table-column prop="packing" label="规格型号">
			    </el-table-column>
			    <el-table-column prop="unit" label="计量单位">
			    </el-table-column>
			    <el-table-column prop="registrationNumber" label="注册证号">
			    </el-table-column>
			    <el-table-column prop="factoryName" label="生产厂家">
			    </el-table-column>
			    <el-table-column prop="price" label="出厂价格">
			    </el-table-column>
			    <el-table-column prop="licenseNumber" label="生产企业许可证号">
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
				    		<i class="el-icon-delete" title="删除" @click="deleteLine(scope.row.fgoodsId.toString())"></i>
				    		<router-link :to="{path: '/yjw_admin/factoryAddGoodsInfo',query:{
			    							    fgoodsId: scope.row.fgoodsId,
			    							   attribute: scope.row.attribute,
			    							   classCode: scope.row.classCode,
			    						 	  expiryDate: scope.row.expiryDate,
			    							 factoryName: scope.row.factoryName,
			    						   licenseNumber: scope.row.licenseNumber,
			    					 			 packing: scope.row.packing,
			    			   						name: scope.row.name,
			    					 			   price: scope.row.price,
			    					 		   productSn: scope.row.productSn,
			    							manufacturer: scope.row.manufacturer,	
			    					  registrationNumber: scope.row.registrationNumber,
				    				   				unit: scope.row.unit,
				    				     temperatureDown: scope.row.temperatureDown,
				    				   	   temperatureUp: scope.row.temperatureUp,
				    				   	 	humidityDown: scope.row.humidityDown,
				    				   	 	  humidityUp: scope.row.humidityUp,
				    				   	 	    pageType: '编辑'
			    				   	 	}}">
				    			<i class="el-icon-edit" title="编辑" style="margin-left: 5px;"></i>	
				    		</router-link>
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
	</div>
</template>

<script>
export default{
	data(){
		return{
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
			zbhArray: [
				{
					province: null,
					city: null,
					input: null,
					provinceList: [],
					cityList: []
				}
			],
			locationCode:''
		}
	},	
	methods:{
		reset(){
			this.searchText = ''
			this.goodsCategory = null
			this.goodsType = null
			this.ownClassMenu = null
		},		
		saveZbh(row){
			console.log(JSON.stringify(row.fgoodsId))
			//console.log(JSON.stringify(this.zbhArray))
				let _this = this
				
				let newZbhArray = []
				newZbhArray = this.zbhArray.map(function(currentValue,index){
					return {
							    "locationCode": currentValue.city ? currentValue.city : currentValue.province,
					               "productSn": row.fgoodsId,
					                    "code": currentValue.input			
					}
				})
				//console.log(JSON.stringify(newZbhArray))
	    		let parm = {
							   	   "bid":newZbhArray,
				     			"signId": this.GLOBAL.userid
		    			}  
	
					let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
					console.log(JSON.stringify(parm))
						
				_this.$axios.post('/product-web/bid/addNew?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	
				  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
					console.log(JSON.stringify(nowData))
				  	if(nowData.code == 0){	
				  		this.$message({
				          message: nowData.message,
				          type: 'success'
				       })
				  		_this.zbhArray = [
								{
									province: null,
									city: null,
									input: null,
									provinceList: [],
									cityList: []
								}
							]
						_this.prov_city_area()
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
				//debugger
			  	if(nowData.code == 0){
			  		for(let j=0; j<_this.zbhArray.length; j++){
				  		_this.zbhArray[j].provinceList = nowData.result.data
			  		}			  				  		
			  		console.log(JSON.stringify(_this.zbhArray[0].provinceList))
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
 			//this.province = data
 			console.log('省级编号:'+data)
			//this.city = null	//每次选择省级清空市和区
			//this.area = null	//同上
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
				  		for(let i=0; i<_this.zbhArray.length; i++){
				  			_this.zbhArray[i].cityList = nowData.result.data
				  		}
				  		console.log(JSON.stringify(_this.zbhArray.cityList[0]))
				  	}else{
				  		console.log(nowData.message)
				  	}		  			
				  })
				  .catch((err) => {
				    console.log(err);
				  })
				//加载市级数据end  			
 		},		
 		cityChange(data){
 			console.log('市级编号:'+data)
 			this.locationCode = data
 		},
		checkBut(){
			this.getTableData()
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
						
				_this.$axios.post('/product-web/product/deleteFactoryProductGoodsMuch?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
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
					
			_this.$axios.post('/product-web/product/selectFactoryGoodsByQueryFactoryGoods?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
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
						        "fgoodsId": valRow.fgoodsId
						    },
						    "type": 1,
						    "signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/product/updateFactoryProductGoods?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
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
		},
		addOneLine(){
			this.zbhArray.push({
					province: null,
					city: null,
					input: null,
					input: null,
					provinceList: [],
					cityList: []
			})		
			this.prov_city_area()  		//初步加载省级数据
		},
		deleOneLine(){
			if(this.zbhArray.length > 1){
				this.zbhArray.pop()
			}else{
				this.$message({
		          message: '已经是最后一个了!',
		          type: 'warning'
		        })
			}
		}
	},
	mounted (){
		this.getGoodsMenu()
		this.getTableData()	
		
		this.prov_city_area()  		//初步加载省级数据
	}	
}
</script>

<style type="text/css">
/*新增弹窗*/
.factory-add-goods .el-form-item__content{
	text-align: left;
} 
.factory-add-goods .el-dialog{
	width: 670px;
}
.factory-add-goods .el-dialog__header{
	text-align: left;
}
.factory-add-goods .el-form{
	text-align: left;
}
.factory-add-goods .el-form-item{
	display: inline-block;
}
.factory-add-goods .el-dialog__wrapper.dialog-box .el-input__inner{
	width: 200px;
}	
.factory-add-goods .el-dialog__body{
	height: 260px;
}
.factory-add-goods .el-popper{
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