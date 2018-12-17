<template>
	<div class="gitManage">
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
					  <el-input v-model="stroeName" placeholder="请输入仓库名称" ></el-input>
					</div>
				</li>
				<li>
					<div class="demo-input-suffix">
					  仓库地址：
					  	  <el-select v-model="province" placeholder="省" @change="provChange">
						    <el-option
						      v-for="item in provinceList"
						      :key="item.code"
						      :label="item.fullName"
						      :value="item.code">
						    </el-option>
						  </el-select> 
						  <el-select v-model="city" placeholder="市" @change="cityChange">
						    <el-option
						      v-for="item in cityList"
						      :key="item.code"
						      :label="item.fullName"
						      :value="item.code">
						    </el-option>
						  </el-select> 
						  <el-select v-model="area" placeholder="区" @change="areaChange">
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
				<li>
					<el-button type="warning" @click="addStore">新增仓库</el-button>
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
			    <el-table-column prop="typeString" label="仓库类型">
			    </el-table-column>
			    <el-table-column prop="address" label="仓库地址">
			    </el-table-column>			    
			    <el-table-column prop="" label="操作" width="100">
			    	<template slot-scope="scope">
			    		<span>
				    		<i class="el-icon-delete" @click="deleteStore(scope.row.repertoryId)"></i>				    		
				    		<i class="el-icon-edit" style="margin-left: 5px;" @click="storeQueryParam(scope.row.repertoryId)"></i>					    		
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
		  	<el-form-item label="仓库编号" :label-width="formLabelWidth">
				<el-input v-model="form.gitNumber" placeholder="请输入仓库编号" style="width:200px"></el-input>
		    </el-form-item>
		  	<el-form-item label="仓库名称" :label-width="formLabelWidth">
				<el-input v-model="form.gitName" placeholder="请输入仓库名称" style="width:200px"></el-input>
		    </el-form-item>
		    <el-form-item label="仓库类型" :label-width="formLabelWidth">
		      <el-select v-model="form.storeType" @change="choseStoreType(form.storeType)" placeholder="请选择">
		        <el-option
			      v-for="item in gitList"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="" :label-width="formLabelWidth">	
		    	<div style="width:200px; height: 40px; border: 1px solid #fff;"></div>
		    </el-form-item>
		    <el-form-item label="仓库地址" :label-width="formLabelWidth" style="width: auto;">	
		    	<el-select v-model="province2" placeholder="省" @change="provChange2">
				    <el-option
				      v-for="item in provinceList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
				  <el-select v-model="city2" placeholder="市" @change="cityChange2">
				    <el-option
				      v-for="item in cityList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
				  <el-select v-model="area2" placeholder="区" @change="areaChange2">
				    <el-option
				      v-for="item in areaList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="详细地址" :label-width="formLabelWidth" style="margin-left: 0;">
		      <el-input
				  type="textarea"
				  :rows="3"
				  placeholder="请输入内容"
				  style="width: 400px;"
				  v-model="form.textarea">
				</el-input>
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
			dialogFormVisible: false,
			activeLineId: null,
			tableData: [],	
			dialogTitle: '',
			form: {
			  gitNumber: '',		//弹窗仓库编码
			  gitName: '',
	          storeType: '',
	          textarea: ''
	        },
	        formLabelWidth: '90px',
	        gitList: [{
		          value: 1,
		          label: '私有仓库'
		        }, {
		          value: 0,
		          label: '平台仓库'
		        }]
		}
	},
	methods:{
		reset(){
			this.stroeName = null
			this.province = null
			this.city = null
			this.area = null
		},			
    	cancel(){
    		this.dialogFormVisible = false
    	},	
    	confirm(){
    		if(this.dialogTitle == '新增仓库'){
    			this.addWarehouse()
    		}else{
    			this.updataStore()
    		}   		
    	},	
    	choseStoreType(val){
    		console.log(val)
    	},
    	storeQueryParam(vid){
    		this.dialogFormVisible = true
    		this.dialogTitle = '修改仓库'
    		this.activeLineId = vid
    		
    		let _this = this
    		let parm = {
				"repertoryId": vid,				
			     	 "signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			_this.$axios.get('/wms_web/queryRepertory?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){
			  			this.cityList = [{
					          code: nowData.result.repertory.regionCode2,
					          fullName: nowData.result.RepertoryVo.city
					        }]
			  			this.areaList = [{
					          code: nowData.result.repertory.regionCode3,
					          fullName: nowData.result.RepertoryVo.area
					        }]
			  				  					  		
			  		this.form.gitNumber = nowData.result.repertory.sn
			  		this.form.gitName = nowData.result.repertory.name
			  		this.form.storeType = nowData.result.repertory.type
			  		this.form.textarea = nowData.result.RepertoryVo.address
			  		this.province2 = nowData.result.repertory.regionCode1
			  		this.city2 = this.cityList[0].code
			  		this.area2 = this.areaList[0].code
			  		console.log(JSON.stringify(nowData.result.repertory.address))
					nowData.result.repertory.address = ''
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
    	joinAddress(addname,arrname,codename){   //拼接省市联动name
 			for(let i=0; i<arrname.length; i++){
 				if(arrname[i].code == codename){
 					addname = arrname[i].fullName
 				}
 			}
 			return addname
    	},    	
    	updataStore(){
    		let _this = this
    		
    		let provinceDemo = ''
 			let cityDemo = ''
 			let areaDemo = ''
 			let pName = this.joinAddress(provinceDemo, this.provinceList, this.province2)
 			let cName = this.joinAddress(cityDemo, this.cityList, this.city2)
 			let aName = this.joinAddress(areaDemo, this.areaList, this.area2)
    		
    		let parm = {
	    		  		 "sn": this.form.gitNumber,
					   "name": this.form.gitName,
					"address": this.form.textarea,
				       "type": this.form.storeType,
				"regionCode1": this.province2,
				"regionName1": pName,
				"regionCode2": this.city2,
				"regionName2": cName,
				"regionCode3": this.area2,
				"regionName3": aName,
				  "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				   "updateId": this.common.SStorage.getItem("saveUserInfo").userId,
				"repertoryId": this.activeLineId,				
			     	 "signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			_this.$axios.get('/wms_web/updateRepertory?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			       })
			  		this.dialogFormVisible = false
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
    	deleteStore(vid){
    		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	  			let parm = {
			  		"repertoryId": vid,
			  		"signId": this.GLOBAL.userid
			  	}
	  			console.log(parm)
					let baseparm = this.common.DataToBase64(JSON.stringify(parm))
					this.$axios.get('/wms_web/deleteRepertory?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
						
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
 		addStore(){
 			this.dialogFormVisible = true
    		this.dialogTitle = '新增仓库'
    		
    		this.form.gitNumber = ''
	  		this.form.gitName = ''
	  		this.form.storeType = ''
	  		this.form.textarea = ''
	  		this.province2 = null
	  		this.city2 = null
	  		this.area2 = null
	  		
	  		this.cityList = []	//新增时清空市和区
  			this.areaList = []
 		},
 		addWarehouse(){		//新增
 			let _this = this 			
 			
 			let provinceDemo = ''
 			let cityDemo = ''
 			let areaDemo = ''
 			let pName = this.joinAddress(provinceDemo, this.provinceList, this.province2)
 			let cName = this.joinAddress(cityDemo, this.cityList, this.city2)
 			let aName = this.joinAddress(areaDemo, this.areaList, this.area2)
 			
    		let parm = {
	    		  		 "sn": this.form.gitNumber,
					   "name": this.form.gitName,
					"address": this.form.textarea,
				       "type": this.form.storeType,
				"regionCode1": this.province2,
				"regionName1": pName,
				"regionCode2": this.city2,
				"regionName2": cName,
				"regionCode3": this.area2,
				"regionName3": aName,
				  "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				   "createId": this.common.SStorage.getItem("saveUserInfo").userId,					
			     	 "signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			_this.$axios.get('/wms_web/insertRepertory?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			       })
			  		this.dialogFormVisible = false
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
    	queryTableData(){
    		let _this = this
    		let parm = {
	    		   "pageNum": this.nowPage,
				  "pageSize": this.pageSize,
				 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					  "name": this.stroeName,					
			   "regionCode1": this.province,					
			   "regionCode2": this.city,					
			   "regionCode3": this.area,					
			     	"signId": this.GLOBAL.userid
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectForRepertoryManage?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
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
 		provChange2 (data){
 			console.log('弹窗省级编号:'+data)
 			this.province2 = data
			this.city2 = null	//每次选择省级清空市和区
			this.area2 = null	//同上
			
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
 		cityChange2 (data){
 			console.log('弹窗市级编号:'+data)
 			this.city2 = data
 			this.area2 = null	//每次选择市清空区
			
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
 		areaChange2 (data){
 			this.area2 = data
 			console.log('弹窗区级编号:'+data)
 		},
 		checkBut(){
 			this.queryTableData()	
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
		this.prov_city_area()  		//初步加载省级数据
		
		this.queryTableData()	
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