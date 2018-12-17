<template>
	<div class="person-info">
		<h3 class="title-line blue-font">个人信息</h3>
		<div class="info-left">
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="overflow: hidden;">
			  <el-form-item label="姓名">
			    <el-input v-model="formLabelAlign.name" disabled></el-input>
			  </el-form-item>			  			  
			  <el-form-item label="用户账号">
			    <el-input v-model="formLabelAlign.acount" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="员工编号">
			    <el-input v-model="formLabelAlign.number" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="所属部门">
			    <el-input v-model="formLabelAlign.department" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="员工角色">
			    <el-input v-model="formLabelAlign.role" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="联系方式">
			    <el-input v-model="formLabelAlign.phone"></el-input>
			  </el-form-item>
			</el-form>
			<el-button type="primary" @click="userInfoEdite">确认</el-button>
		</div>
		<div class="info-middle">
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="overflow: hidden;">
			  <el-form-item label="性别">
			    <template>
				  <el-radio v-model="formLabelAlign.sex" label="1">男</el-radio>
				  <el-radio v-model="formLabelAlign.sex" label="0">女</el-radio>
				</template>
			  </el-form-item>
			</el-form>
			<div class="" style="border: 1px solid #DCDFE6; border-radius: 5px; padding: 10px 7px 10px 0; position: relative; left: 30px;" v-show="isShowPassword">
				<el-form :label-position="labelPosition" status-icon label-width="80px" :model="formLabelAlign2" :rules="rules2" ref="formLabelAlign2" style="overflow: hidden;">
				  <el-form-item label="初始密码" v-show="isShowPassword">
				    <el-input type="password" v-model="formLabelAlign2.password"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码" v-show="isShowPassword" prop="newpassword">
				    <el-input type="password" v-model="formLabelAlign2.newpassword"></el-input>
				  </el-form-item>
				  <el-form-item label="确认新密码" v-show="isShowPassword" prop="requireNewpassword">
				    <el-input type="password" v-model="formLabelAlign2.requireNewpassword"></el-input>
				  </el-form-item>
				</el-form>	
				<el-button type="primary" plain @click="confirmModify('formLabelAlign2')" v-show="isShowPassword">确认修改</el-button>
				<el-button type="info" plain @click="cancle" v-show="isShowPassword">取消</el-button>
			</div>	
			<el-button type="primary" plain @click="editPassword" v-show="isShowBut">修改密码</el-button>
		</div>
		<div class="info-right">
			<span>请选择头像:</span>
			<el-upload
			  style="margin-top: 20px;"
			  class="avatar-uploader"
			  :action="reqUrl"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload"
			  :on-change="checkImg">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
		
	</div>
</template>

<script>
  export default {
    data() {
    	  var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
	          if (this.formLabelAlign2.requireNewpassword !== '') {
	            this.$refs.formLabelAlign2.validateField('requireNewpassword');
	          }
	          callback();
	        }
	      };
	      var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.formLabelAlign2.newpassword) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };
      return {
      	reqUrl: this.GLOBAL.uploadUrl,
      	imageUrl: this.common.SStorage.getItem("saveUserInfo").headIcon ? this.common.SStorage.getItem("saveUserInfo").headIcon : require('../../assets/default-img.png'),
        labelPosition: 'right',
        formLabelAlign: {
          		name: this.common.SStorage.getItem("saveUserInfo").name,
          	  	 sex: this.common.SStorage.getItem("saveUserInfo").sex.toString(),
          	  acount: this.common.SStorage.getItem("saveUserInfo").userName,
          	  number: this.common.SStorage.getItem("saveUserInfo").userSn,
          department: this.common.SStorage.getItem("saveUserInfo").departmentName,
          		role: this.common.SStorage.getItem("saveUserInfo").roleName,
         	   phone: this.common.SStorage.getItem("saveUserInfo").phone,
        },
        formLabelAlign2: {
          password: '',
          newpassword: '',
          requireNewpassword: ''
        },
        isShowPassword: false,
        isShowBut: true,
        compDocument: {},
        rules2: {
          newpassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          requireNewpassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
		saveUserInfo(){	 	
			/*保存用户个人信息*/
	
	  			let parmUser = {
			  		"userId": this.GLOBAL.userid,
			  		"signId": this.GLOBAL.userid
			  	}
	  			console.log(parmUser)
					let baseParmUser = this.common.DataToBase64(JSON.stringify(parmUser))
					this.$axios.get('/user_web/userInfo/getUserInfoByUserId?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parmUser))
						
					  .then((res) => {				  	
					  	let nowData = JSON.parse(this.common.base64ToData(res.data))
					  	console.log(nowData)
					  	if(nowData.code == 0){	
					  		console.log(nowData.result)
						  	this.common.SStorage.setItem("saveUserInfo",nowData.result)  
						  	console.log(this.common.SStorage.getItem("saveUserInfo"))
					  	}else if(nowData.code == 800 || nowData.code == 500){
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
	  		/*保存用户个人信息end*/
		},     	
    	userInfoEdite(){
    		let parm = {
	    					"userInfo": {
							     "userId": this.common.SStorage.getItem("saveUserInfo").userId,
						       "headIcon": this.compDocument.businessLicense,
						          "phone": this.formLabelAlign.phone,
						      		"sex": this.formLabelAlign.sex						   	 
						   		},
						   	"signId": this.GLOBAL.userid
				  		}
  				console.log(JSON.stringify(parm))
				let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/user/updateUserInfo?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.result))
				  	
					  	this.$message({
				          message: nowData.message,
				          type: 'success'
				        })					  	
					  	this.saveUserInfo()
				  	}else if(nowData.code == 800 || nowData.code == 500){
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
    	editPassword(){
    		this.isShowPassword = true
    		this.isShowBut = false
    	},
    	cancle(){
    		this.isShowPassword = false
    		this.isShowBut = true
    	},
	    cancellation(){			//修改密码后注销,重新登录
	      	let _this = this
			this.common.SStorage.clear()
	      	this.$message({
	          message: '请重新登录!',
	          type: 'success'
	        })
			setTimeout(function(){
	       		_this.$router.push('/')
				window.location.reload()
	        },700)
	    },    	
    	confirmModify(formName){
    		let _this = this
    		 this.$refs[formName].validate((valid) => {
	          if (valid) {
	            let parm = {
					     "username": this.common.SStorage.getItem("saveUserInfo").userName,
				      "oldPassword": this.formLabelAlign2.password,
				      "newPassword": this.formLabelAlign2.requireNewpassword,
					   	   "signId": this.GLOBAL.userid
			  		}
  				console.log(parm)
				let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/user_web/user/updatePwd?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.result))
				  	
					  	this.$message({
				          message: nowData.message,
				          type: 'success'
				        })					  	
					  	this.isShowPassword = false
    					this.isShowBut = true
    					setTimeout(function(){
				       		_this.cancellation()
				        },1000)
    					
				  	}else if(nowData.code == 800 || nowData.code == 500){
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
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
    		
    	},
	/******上传图片*****/	
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
        }       
    }
  }
</script>
<style type="text/css">
.person-info .el-form-item{
	width: 300px; margin-left: 20px; float: left;
}	
.person-info .el-form-item__content{
	text-align: left; padding-left: 20px;
}	
.person-info .el-form-item__label{
	width: 90px!important;
}	
</style>
<style scoped>
.person-info{
	padding-top: 20px;
}
.title-line	{
	text-align: left; border-bottom: 1px solid #E4E4E4; padding-bottom: 5px; font-weight: bold;
}	
.info-left, .info-middle, .info-right{
	float: left; margin-top: 30px;
}
.info-left{
	width: 330px;
}
.info-middle{
	width: 330px;
}
.info-right{
	width: 300px;
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
    border-radius: 50%;
  }
</style>