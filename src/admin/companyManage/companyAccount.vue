<template>
	<div class="comp-account-manage">
		<div class="table-head clear">
			<ul class="clear">
				<li>
					<el-input
					    placeholder="请输用户编码/用户姓名"
					    prefix-icon="el-icon-search"
					    v-model="search_val">
					  </el-input>
				</li>
				<li>
					<el-button type="primary" @click="checkBut()">查询</el-button>
				</li>
				<li>
					<el-button type="warning" @click="openBox()">新增</el-button>
				</li>
			</ul> 
		</div>
		<div>
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">
			    <el-table-column prop="userName" label="用户账号">
			    </el-table-column>
			    <el-table-column prop="name" label="用户姓名">	
			    </el-table-column>
			    <el-table-column prop="sex" label="性别" :formatter="sexFomat">	
			    </el-table-column>
			    <el-table-column prop="userSn" label="用户编号">
			    </el-table-column>
			    <el-table-column prop="departmentName" label="所属部门">
			    </el-table-column>
			    <el-table-column prop="roleName" label="个人角色">
			    </el-table-column>
			    <el-table-column prop="phone" label="联系方式">
			    </el-table-column>
			    <el-table-column porp="state" label="员工状态">
			    	<template slot-scope="scope">
			    		<el-tooltip :content="'当前状态是: ' + scope.row.state" placement="top">
				    		<el-switch
							  v-model="scope.row.state"
							  active-color="#13ce66"
							  inactive-color="#ff4949"
							  active-value="0"
							  inactive-value="1"
							  @change="switchOn(scope.row.state, scope.row)"
							>
							</el-switch>
						</el-tooltip>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="expiryDate" label="操作">
			    	<template slot-scope="scope">
			    		<!--<i class="el-icon-download" title="保存"></i>-->
			    		<i class="el-icon-edit" title="修改" @click="openUpdataBox(scope.row)" style="margin-left: 10px;"></i>
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
		  <el-form :model="form" :rules="rules">
		    <el-form-item label="用户账号" :label-width="formLabelWidth" prop="phone" >
		      <el-input v-model="form.userName" @blur="checkUser" placeholder="请输入手机号" :disabled="dashed"></el-input>
		    </el-form-item>
		    <el-form-item label="用户姓名" :label-width="formLabelWidth">
		      <el-input v-model="form.name" placeholder=""></el-input>
		    </el-form-item>
		    <el-form-item label="性别" :label-width="formLabelWidth">
		      <!--<el-input v-model="form.sex" placeholder=""></el-input>-->
		        <el-select v-model="form.sex" :change="selectSex(form.sex)" placeholder="请选择">
				    <el-option
				      v-for="item in sexList"
				      :key="item.id"
				      :label="item.label"
				      :value="item.id">
				    </el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="用户编号" :label-width="formLabelWidth">
		      <el-input v-model="form.userSn" placeholder=""></el-input>
		    </el-form-item>
		    <el-form-item label="所属部门" :label-width="formLabelWidth">
		        <el-cascader
				  :options="options"
				  :props="props"
				  :show-all-levels="false"
				  expand-trigger="hover"
				  v-model="selectedOptions"
				  @change="handleChange()"
				></el-cascader>
		    </el-form-item>
		    <el-form-item label="个人角色" :label-width="formLabelWidth">
		        <el-select v-model="form.userType" :change="selectUserType(form.userType)" placeholder="请选择">
				    <el-option
				      v-for="item in jueseList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.sn">
				    </el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="联系方式" :label-width="formLabelWidth">
		      <el-input v-model="form.phone" placeholder=""></el-input>
		    </el-form-item>
		    <el-form-item label="用户密码" :label-width="formLabelWidth" v-if="dialogTitle == '新增'">
		      <el-input v-model="form.passWord" placeholder=""></el-input>
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
		 var phone = (rule, value, callback) => {
		 	let isPhone = this.common.isPhone(this.form.userName)
	        if (isPhone == false) {
	          callback(new Error('手机号格式不对!'));
	          this.isPhone = false
	        } else {
	          callback();
	          this.isPhone = true
	        }
	      }
		return{
			rules: {
	          phone: [
	            { validator: phone, trigger: 'blur' }
	          ]
	       },
	       isPhone:false,		//验证手机格式
			search_val: '',
			dialogVisible: false,
			nowPage: 1,
      		pageSize: this.GLOBAL.pageSize,
      		totalCount: 0,	//总条数
      		valRowData: null,
	       form: {
	       	  userId: '',
	       	  roleSn: '',
	          userName: '',
	          name: '',
	          sex: '',
	          userSn: '',
	          department: '',
	          userType: '',
	          phone: '',
	          passWord: ''
	        },
	        dialogTitle: '',
	        dashed: false,
	        formLabelWidth: '100px',
			tableData: [],
		    value: '',
        	parentSelectId: null,
        	jueseList: [],			//角色列表
        	sexList: [
        		{
	        		label: '男',
	        		id: 1
        		},
        		{
	        		label: '女',
	        		id: 0
        		},
        	],			//性别列表
        	selectedOptions: [],	//下拉部门选择上下级数组
        	selectDepartMent: '',	//下拉部门选择最后一个值
		    options: [],				//级联选择器
		    props: {				//属性映射
	          label: 'departmentName',
	          value: 'id',
	          sn: 'departmentSn',
	          children: 'children'
	      }
		}
	},
	methods:{
		selectSex(vid){
			console.log(vid)
			this.form.sex = vid
		},
		selectUserType(vid){
			console.log(vid)
			
			this.form.roleSn = vid
			
			for(let i=0; i<this.jueseList.length; i++){
				if(this.jueseList[i].name == vid){
					this.form.roleSn = this.jueseList[i].sn
				}
			}						
		},
		sexFomat(row, column){
			if(row.sex == 0){
    			return '女'
    		}else{
    			return '男'
    		}
		},
		queryDepart(pid){
			
		},
		openUpdataBox(valRow){
			this.dialogVisible = true
			this.valRowData = valRow
			console.log(JSON.stringify(this.valRowData))
			
			this.dialogTitle = '修改'
			this.dashed = true
			
			this.form.userId = this.valRowData.userId
			this.form.roleSn = this.valRowData.roleSn
			this.form.userName = this.valRowData.userName
			this.form.name = this.valRowData.name
			this.form.sex = this.valRowData.sex
			this.form.userSn = this.valRowData.userSn
			this.selectDepartMent = this.valRowData.departmentId
			this.form.userType = this.valRowData.roleName
			this.form.phone = this.valRowData.phone
			this.form.passWord = this.valRowData.passWord
			
			/*this.queryDepart(this.selectDepartMent)*/
			let parm = {
		  		           "id": this.selectDepartMent,
    				   "signId": this.GLOBAL.userid
		  		}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/company/getDepartById?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log('部门父ID:'+JSON.stringify(nowData.result.parentDepartmentId))	
			  		//this.parentSelectId = nowData.result.parentDepartmentId
			  		this.selectedOptions = [nowData.result.parentDepartmentId, this.selectDepartMent]
			
					console.log('下拉框选择数组是:'+JSON.stringify(this.selectedOptions))
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
		upDate(){
			let parm =  {
					"roleSn": this.form.roleSn,
					"departId": this.selectDepartMent,
				    "userInfo": {
				        "userId": this.form.userId,
				        "userName": this.form.userName,
				        "userSn": this.form.userSn,
				        "name": this.form.name,
				        "phone": this.form.phone,
				        "sex": this.form.sex,
				        //"headIcon": this.form.headIcon,
				        "updateId": this.common.SStorage.getItem("saveUserInfo").userId
				    },
				    "signId": this.GLOBAL.userid
				}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/user/updateUserInfo?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(JSON.stringify(nowData))
				  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.message))
				  		this.$message({
				          message: nowData.message,
				          type: 'success'
				        })
				  		this.dialogVisible = false
						this.queryDate()	//查询数据	
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
		switchOn(val,valRow){
			console.log(JSON.stringify(val))
			console.log(JSON.stringify(valRow))
			let parm =  {
					    	"list":[{
					            "userId": valRow.userId,
							     "state": val,
							  "updateId": this.common.SStorage.getItem("saveUserInfo").userId
					        }],
					    	"signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/user/batchUpdateUserInfo?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
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
		checkBut(){
			this.queryDate()
		},
		confirm(){
			if(this.dialogTitle == '新增'){
				this.addUser()
			}else{
				this.upDate()
			}
		},
		checkUser(){
				let parm = {
		  		     "username": this.form.userName,
    				   "signId": this.GLOBAL.userid
		  		}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/user/checkUsername?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.message))
			  	}else if(nowData.code == 1){	
			  		console.log(JSON.stringify(nowData.message))
			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
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
		openBox(){
			this.dialogVisible = true
			this.dialogTitle = '新增'
			this.dashed = false
			
			this.form.userName = ''
			this.form.name = ''
			this.form.sex = ''
			this.form.userSn = ''
			this.form.department = ''
			this.form.userType = ''
			this.form.phone = ''
			this.form.passWord = ''
			this.selectedOptions = []
		},
		addUser(){			
			let parm = {
		  		    "createId": this.common.SStorage.getItem("saveUserInfo").userId,
					 "roleSn": this.form.userType,
					"departId": this.selectDepartMent,
					    "userInfo": {
					        "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					        "userType": this.common.SStorage.getItem("saveUserInfo").userType,
					        "userSn": this.form.userSn,
					        "name": this.form.name,
					        "userName": this.form.userName,
					        "sex": this.form.sex,
					        "phone": this.form.phone
					    },
					    "userLogin": {
					        "password": this.form.passWord
					    },
    				   "signId": this.GLOBAL.userid
		  		}
  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/user/adminAddUser?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log('-------->'+JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
					this.dialogVisible = false
					this.queryDate()	//查询数据
					
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
    		this.queryDate()
    	},
    	handleChange(){
    		this.selectDepartMent = this.selectedOptions[this.selectedOptions.length - 1]
    		console.log(JSON.stringify(this.selectedOptions))
    		console.log(JSON.stringify(this.selectDepartMent))
    		console.log(JSON.stringify(this.options))
    	},
		queryDate(){
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
				this.$axios.get('/user_web/userInfo/selectUserInfoByCompId?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log('-------->'+JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					
				  	this.tableData = nowData.result.list
				  	this.totalCount = nowData.result.total
				  	for(let i=0; i < this.tableData.length; i++){
				  		this.tableData[i].state = this.tableData[i].state.toString()
				  	}
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
		queryJuese(){
			let parm = {
		  		    "roleType": this.common.SStorage.getItem("saveUserInfo").userType,
					   "signId": this.GLOBAL.userid
		  		}
			console.log(parm)
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/role/selectRoleByRoleType?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					
				  	this.jueseList = nowData.result
				  	//console.log(JSON.stringify(this.jueseList))
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
					console.log(JSON.stringify(data))
					console.log('------------>>>>>'+JSON.stringify(treeData))
				  	this.options = treeData
				  	//console.log(JSON.stringify(this.jueseList))
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
	created (){
		
		this.queryDate()	//查询数据
		this.queryJuese()   //根据角色类型查询所有角色
		this.queryDepartment()   //公司部门查询
	},
	mounted (){
		
	}
}	
</script>

<style type="text/css">
/*新增弹窗*/
.comp-account-manage .el-form-item__content{
	text-align: left;
} 
.comp-account-manage .el-dialog{
	width: 670px;
}
.comp-account-manage .el-dialog__header{
	text-align: left;
}
.comp-account-manage .el-form{
	text-align: left;
}
.comp-account-manage .el-form-item{
	display: inline-block;
}
.comp-account-manage .el-dialog__wrapper.dialog-box .el-input__inner{
	width: 200px;
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