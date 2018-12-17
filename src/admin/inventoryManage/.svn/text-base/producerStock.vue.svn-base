<template>
	<div class="gitManage">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="warehouseName" placeholder="请输入商品名称或编号"></el-input>
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						库存仓库:
					    <el-select v-model="kcStore" placeholder="请选择" @change="kcStoreChange">
						    <el-option
						      v-for="item in kcStoreList"
						      :key="item.repertoryId"
						      :label="item.name"
						      :value="item.repertoryId">
						    </el-option>
						</el-select> 
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						库房:
					    <el-select v-model="warehouse" placeholder="请选择" @change="warehouseChange">
						    <el-option
						      v-for="item in warehouseList"
						      :key="item.storeId"
						      :label="item.storeName"
						      :value="item.storeId">
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
				<li v-if="isShowNewAdd">
					<el-button type="warning" @click="addStorehouse">新增库存</el-button>
				</li>
			</ul> 
		</div>
		<div class="table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="sn" label="商品编号" :formatter="formatSn">
			    </el-table-column>
			    <el-table-column prop="name" label="商品名称">
			    </el-table-column>
			    <el-table-column prop="orderId" label="产品批次">
			    	<template slot-scope="scope">			    						        
				        <el-popover
						  placement="right"
						  width="150"
						  trigger="hover"
						  @show="cpListShow(scope.row)">
						  <el-table :data="gridData">
						    <el-table-column width="70" property="banch" label="批次"></el-table-column>						    
						    <el-table-column width="70" property="num" label="数量"></el-table-column>						    
						  </el-table>
						  <el-pagination
						      @size-change="handleSizeChange2"
						      @current-change="handleCurrentChange2"
						      :current-page.sync="nowPage2"
						      :page-size="pageSize2"
						      layout="prev, pager, next"
						      :total="totalCount2">
						    </el-pagination>
						  <el-button slot="reference">查看所有批次</el-button>
						</el-popover>
				    </template>
			    </el-table-column>
			    <el-table-column prop="temperatureOption" label="存储温度">
			    </el-table-column>
			    <el-table-column prop="humidityOption" label="存储湿度">
			    </el-table-column>
			    <!--<el-table-column prop="expiryDate" label="有效期">
			    </el-table-column>-->
			    <el-table-column prop="repertoryName" label="仓库名称">
			    </el-table-column>
			    <el-table-column prop="storeroomName" label="库房名称">
			    </el-table-column>
			    <el-table-column prop="num" label="数量">
			    </el-table-column>			    
			    <!--<el-table-column prop="" label="操作" width="100">
			    	<template slot-scope="scope">
			    		<span>
				    		<i class="el-icon-delete"></i>
				    		<router-link :to="{path: '/yjw_admin/cgOrderInfo'}">
				    			<i class="el-icon-edit" style="margin-left: 5px;"></i>	
				    		</router-link>
			    		</span>	
			    	</template>
			    </el-table-column>-->
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
		
<!--新增库房弹窗-->
		<el-dialog title="新增库房" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		  	<el-form-item label="选择商品" :label-width="formLabelWidth">
				  <el-select v-model="form.goods" @change="getGoodsList(form.goods)" filterable placeholder="请选择">
				    <el-option
				      v-for="item in goodsList"
				      :key="item.fgoodsId"
				      :label="item.name"
				      :value="item.fgoodsId">
				    </el-option>
				  </el-select>
		    </el-form-item>
		  	<el-form-item label="选择仓库" :label-width="formLabelWidth">
				<el-select v-model="form.store"  @change="kcStoreChange" placeholder="请选择">
			        <el-option
				      v-for="item in kcStoreList"
				      :key="item.repertoryId"
				      :label="item.name"
				      :value="item.repertoryId">
				    </el-option>
			     </el-select>			      
		    </el-form-item>
		    <el-form-item label="选择库房" :label-width="formLabelWidth">
		      <el-select v-model="form.storeRoom" @change="warehouseChange" placeholder="请选择">
		        <el-option
			      v-for="item in warehouseList"
			      :key="item.storeId"
			      :label="item.storeName"
			      :value="item.storeId">
			    </el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="生产日期" :label-width="formLabelWidth">	
		    	<el-date-picker
		    	  style="width:200px"
			      v-model="form.productionDate"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
		    </el-form-item>
		    <el-form-item label="有效期至" :label-width="formLabelWidth">	
		    	<el-date-picker
		    	  style="width:200px"
			      v-model="form.productionDateTo"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
		    </el-form-item>
		    <el-form-item label="批次" :label-width="formLabelWidth">
		    	<el-input v-model="form.batch" placeholder="请输入批次"></el-input>
		    </el-form-item>
		    <el-form-item label="数量" :label-width="formLabelWidth">
		    	<el-input v-model="form.number" placeholder="请输入数量"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="confirm">确 定</el-button>
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
			nowPage2: 1,			//查看批次当前页	
	      	pageSize2: 5,			//查看批次每页显示条数
	      	totalCount2: 0,			//查看批次总条数
	      	repertoryId: null,
	      	storeroomId: null,
	      			 sn: '',
	      		   rows: {},
			dialogFormVisible: false,
			formLabelWidth: '100px',
			warehouseName: '',		//库房名称
			kcStore: null,			//库存仓库
			warehouse: null,			//库房
			//showPc: false,      //查看批次
	        tableData: [],
	        kcStoreList: [],  
	        warehouseList: [],
	        gridData: [],
	        form: {
			  goods: '',		
			  store: '',
	          storeRoom: '',
	          productionDate: '',
	          productionDateTo: '',
	          batch: '',
	          number: ''
	        },
	        goodsList: [],
	        checkGoodsList: {},   //新增时选中商品信息
	        isShowNewAdd: false
		}
	},
	methods:{
		addStorehouse(){
			//每次新增前清空数据
	        this.form.goods = ''
	        this.form.store = ''
	        this.form.storeRoom = ''
	        this.form.productionDate = ''
	        this.form.batch = ''
	        this.form.number = ''
	        
			this.dialogFormVisible = true
			this.queryGoodsList()
		},
		queryGoodsList(){
			let _this = this
    		let parm = {
			  	  "nameOrsn": this.form.goods,
				   "pageNum": 1,
				  "pageSize": 5,
			     	"signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.post('/product-web/product/selectFactoryGoodsByQueryFactoryGoods?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				//console.log(JSON.stringify(nowData.result))
			  	if(nowData.code == 0){		
			  		this.goodsList = nowData.result.list
			  		console.log(JSON.stringify(this.goodsList))
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
		formatSn(row, column){		//处理商品编号
			return row.sn.split('*')[0]
		},  
		reset(){
			this.warehouseName = ''
			this.kcStore = null
			this.warehouse = null
		},			
		cpListShow(rows){
			let _this = this
			this.rows = rows
			this.repertoryId = this.rows.repertoryId
			this.storeroomId = this.rows.storeroomId
			this.sn = this.rows.sn
			
			console.log(JSON.stringify(rows))
			
    		let parm = {
			  	 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
			   "repertoryId": this.repertoryId,
			   "storeroomId": this.storeroomId,
				   "pageNum": this.nowPage2,
				  "pageSize": this.pageSize2,
						"sn": this.sn,
			     	"signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectBanch?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData.result))
			  	if(nowData.code == 0){		
			  		this.gridData = nowData.result.list
			  		this.totalCount2 = nowData.result.total
			  		console.log(JSON.stringify(this.gridData))
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
		checkPcList(val,_this){
			console.log(JSON.stringify(val))
		},
		getGoodsList(goodsId){
			console.log(JSON.stringify(goodsId))
			for(let i=0; i<this.goodsList.length; i++){
				if(this.goodsList[i].fgoodsId == goodsId){
					this.checkGoodsList = this.goodsList[i]
				}
			}
			console.log(JSON.stringify(this.checkGoodsList))
		},
    	cancel(){
    		this.dialogFormVisible = false
    	},	
    	confirm(){
    		let _this = this
    		let parm = {
			  	  "list": [{
			  	  	"sn": this.checkGoodsList.platformSn,
					"temperatureOption": this.checkGoodsList.temperature,
					"expiryDate": this.common.fomatDate(this.form.productionDateTo,1),
					"unit": this.checkGoodsList.unit,
					"redistNum": this.checkGoodsList.registrationNumber,
					"rank": this.checkGoodsList.attribute,
					"name": this.checkGoodsList.name,
					"banch": this.form.batch,
					"num": this.form.number,
					"storeroomId": this.form.storeRoom,
					"productDate": this.common.fomatDate(this.form.productionDate,1),
					"classCode": this.checkGoodsList.classCode,
					"repertoryId": this.form.store,
					"humidityOption": this.checkGoodsList.humidity
			  	  }],
			  	  	"userId": this.common.SStorage.getItem("saveUserInfo").userId,
					"companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
			     	"signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			_this.$axios.post('/wms_web/insertStockAndStockBatch?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData.result))
			  	if(nowData.code == 0){		
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  		this.dialogFormVisible = false
			  		this.queryTableData()
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
			   "repertoryId": this.kcStore? this.kcStore : null,
			   "storeroomId": this.warehouse? this.warehouse : null,
				 "selectStr": this.warehouseName? this.warehouseName : '',
			     	"signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectForStockList?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.tableData = nowData.result.list
			  		_this.totalCount = nowData.result.total
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
 		handleSizeChange2(val){
    		this.pageSize2 = val
    		console.log('当前每页显示:'+this.pageSize2)
    	},
    	handleCurrentChange2(val){
    		this.nowPage2 = val
    		console.log('当前页是:'+this.nowPage2)
    		this.cpListShow()
    	},    	
    	kcStoreChange(data){
    		console.log(data)
    		this.kufangList(data)
    	},
    	warehouseChange(data){
    		console.log(data)
    	},
 		checkBut(){
 			this.queryTableData()
 		},
 		cangkuList(){
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
			  		this.kcStoreList = nowData.result
			  		console.log(JSON.stringify(nowData.result))
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
 		kufangList(vid){
 			let _this = this
    		let parm = {
			  	 "repertoryId": vid,
			     	  "signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectStoreroomByRepertoryId?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		this.warehouseList = nowData.result
			  		console.log(JSON.stringify(nowData.result))
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
		this.cangkuList()		
		this.queryTableData()
		
		if(this.common.SStorage.getItem("saveUserInfo").userType == 2){
			this.isShowNewAdd = true
		}
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