<template>
	<div class="department-manage">
		<div class="table-head clear">
			<ul class="clear">
				<li style="width:250px">
					<el-input
					    placeholder="请输入部门编号或者部门名称"
					    prefix-icon="el-icon-search"
					    v-model="search_val">
					  </el-input>
				</li>
				<li>
					<el-button type="primary" @click="checkBut">查询</el-button>
				</li>
				<li>
					<el-button type="warning" @click="openBox()">新增</el-button>
				</li>
			</ul> 
		</div>
		<div>
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">
			    <el-table-column prop="departmentSn" label="部门编号">
			    </el-table-column>
			    <el-table-column prop="departmentName" label="部门名称">
			    </el-table-column>
			    <el-table-column prop="parentDepartmentName" label="上级部门" :formatter="parentDepertment">
			    </el-table-column>
			    <!--<el-table-column prop="id" label="本级ID" >
			    </el-table-column>
			    <el-table-column prop="parentDepartmentId" label="父级ID" >
			    </el-table-column>-->
			    <el-table-column prop="expiryDate" label="操作">
			    	<template slot-scope="scope">
			    		<!--<i class="el-icon-download" title="保存"></i>-->			    		
			    		<i class="el-icon-delete" title="删除" @click="deleteDepartment(scope.row)" ></i>
			    		<i class="el-icon-edit" title="修改" @click="openEditBox(scope.row)" style="margin-left: 10px;"></i>
			    	</template>
			    </el-table-column>			    
			  </el-table>
		  		<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="nowPage"
			      :page-size="pageSize"
			      layout="total, prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
		  </template>  
		</div>
		
<!--新增弹窗-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" class="dialog-box">
		  <el-form :model="form">
		    <el-form-item label="部门编号" :label-width="formLabelWidth">
		        <el-input v-model="form.departmentNum" placeholder=""></el-input>
		    </el-form-item>
		    <el-form-item label="部门名称" :label-width="formLabelWidth">
		        <el-input v-model="form.departmentName" placeholder=""></el-input>
		    </el-form-item>
		    <el-form-item label="上级部门" :label-width="formLabelWidth">
				  <el-select v-model="form.parentDepartmentId" :change="selectDepartment(form.parentDepartmentId)" placeholder="请选择" :disabled="dashed">
				    <el-option
				      v-for="item in options"
				      :key="item.id"
				      :label="item.departmentName"
				      :value="item.id">
				    </el-option>
				  </el-select>
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
			search_val: '',
			dialogVisible: false,
			nowPage: 1,
      		pageSize: this.GLOBAL.pageSize,
      		totalCount: 0,	//总条数			
	        form: {
	        	departmentNum:'',		//部门编号
	        	departmentName:'',		//部门名称
	          	departmentId: null,		//本级ID
	          	parentDepartmentId: '',		//父级部门下拉框绑定数据
	        },
	        departmentName: '',     //下拉框名称
	        dashed: false,			//下拉框是否禁止
	        formLabelWidth: '100px',
	        dialogTitle: '',
	        valRowData: null,
			tableData: [],	       	
		    options: [],				//选择器
		    props: {				//属性映射
	          label: 'departmentName',
	          value: 'id',
	          sn: 'departmentSn',
	          children: 'children'
			}
		}
	},
	methods:{
		selectDepartment(selVal){		//上级部门下拉框取值
			console.log(JSON.stringify(selVal))
			this.form.parentDepartmentId = selVal
			let optionData = this.options
			for(let i=0; i<optionData.length; i++){
				if(optionData[i].id == selVal){
					this.departmentName = optionData[i].departmentName										
				}
			}			
		},
		checkBut(){
			this.queryData()
		},
		confirm(){
			if(this.dialogTitle == '新增'){
				this.addDepartment()
			}else{
				this.editDepartment()
			}
			
		},
		openBox(){
			this.dialogVisible = true
			this.dialogTitle = '新增'
			
			this.form.departmentNum = ''
			this.form.departmentName = ''
			this.form.parentDepartmentId = ''
			
			this.dashed = false
		},
		openEditBox(valRow){
			this.dialogVisible = true
			this.dialogTitle = '修改'
			
			this.valRowData = valRow
			console.log(JSON.stringify(valRow))
			
			if(this.valRowData.parentDepartmentId == 0){
				this.dashed = true
			}else{
				this.dashed = false
			}
			
			this.form.departmentNum = this.valRowData.departmentSn    //部门编号
			this.form.departmentName = this.valRowData.departmentName	//部门名称
			this.form.parentDepartmentId = this.valRowData.parentDepartmentId	//上级部门ID
			this.form.departmentId = this.valRowData.id	//本级部门ID							
		},
		editDepartment(valRow){						
			
			let parm = {
				    "updateId": this.common.SStorage.getItem("saveUserInfo").userId,
				    "compDepart": {
				        "id": this.form.departmentId,	//本级部门ID
				        "departmentSn": this.form.departmentNum,	//部门编号			        
				        "departmentName": this.form.departmentName,  //本级部门名称
				        "parentDepartmentId": this.form.parentDepartmentId	 //上级部门ID(本级ID)
				    },			    
				    "signId": this.GLOBAL.userid
				}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/company/updateDepartment?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					this.$message({
			          message: nowData.message,
			          type: 'success'
			       })
					this.dialogVisible = false
					window.location.reload()					
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
		deleteDepartment(valRow){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	  			let parm = {
				    "id": valRow.id,			    
				    "signId": this.GLOBAL.userid
				}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/company/delDepartment?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					this.$message({
			          message: nowData.message,
			          type: 'success'
			       })
					window.location.reload()					
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
		addDepartment(){		//新增部门
			let parm = {
			    "createId": this.common.SStorage.getItem("saveUserInfo").userId,
			    "compDepart": {
			        "departmentSn": this.form.departmentNum,
			        "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
			        "parentDepartmentId": this.form.parentDepartmentId,
			        "departmentName": this.form.departmentName
			    },
			    "signId": this.GLOBAL.userid
			}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/company/addDepartment?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	//console.log('-------->'+JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
					this.dialogVisible = false
					window.location.reload()					
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
    		this.queryData()
    	},		
    	parentDepertment(row, column){
    		if(row.parentDepartmentName == undefined){
    			return '无'
    		}else{
    			return row.parentDepartmentName
    		}
    	},
    	queryDepartment(){
			let parm = {
		  		    "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					   "signId": this.GLOBAL.userid
		  		}
			console.log(parm)
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/company/selectDepartByCompId?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					let data = nowData.result;
					// 属性配置信息
					let attributes = {
					      id: 'id',
					      parentId: 'parentDepartmentId',
					      name: 'departmentName',
					      dpSn: 'departmentSn',
					      rootId: '0'
					  };
					let treeData = this.common.toTreeData(data, attributes)
					treeData.unshift({						
							"id":0,
							"departmentName":"(空)",
							"departmentSn":"0000"
					})
				  	this.options = treeData
				  	console.log('级联选择器数组:'+JSON.stringify(this.options))
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
		queryData(){
			let _this = this
  			let parm = {
		  		    "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					     "name": this.search_val,
					  "nowPage": this.nowPage,
					    "count": this.pageSize,
    				   "signId": this.GLOBAL.userid
		  		}
  			console.log(parm)
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/company/selectDepartByCompId?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log('-------->'+JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					
				  	this.tableData = nowData.result.list
				  	this.totalCount = nowData.result.total
				  	console.log(JSON.stringify(this.tableData))
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
	},
	created(){
		this.queryData()
		this.queryDepartment()   //公司部门查询
	},
	mounted (){
		
	}
}	
</script>

<style type="text/css">
/*新增弹窗*/
.department-manage .el-form-item__content{
	text-align: left;
}
.department-manage .el-dialog{
	width: 500px;
}
.department-manage .el-dialog__header{
	text-align: left;
}	
.department-manage .el-dialog__wrapper.dialog-box .el-input__inner{
	width: 300px;
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