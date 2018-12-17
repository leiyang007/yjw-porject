<template>

<div class="bg-register">
	<!--内容部分-->
	<div class="content">
		<div class="clear">
			<div class="float-left blue-font">
				<i class="icon-register"></i>
				企业注册
			</div>
			<div class="float-right">
				<!--已有账号：<a href="" class="blue-font">立即登录</a>-->
				<router-link :to="{path: '/registerStep2'}" @click.native="refresh">	
					<span class="blue-font pointer">返回上一步</span>
				</router-link>
				<span class="now-login-icon"><i class="layui-icon layui-icon-right"></i></span>
			</div>
		</div>
		<div class="reg-step-icon clear">
			<ul class="clear">
				<li class="now-stap">
					<div>1</div>
					<p>企业管理员信息</p>
				</li>
				<li class="now-stap">
					<div>2</div>
					<p>公司基本信息</p>
				</li>
				<li class="now-stap">
					<div>3</div>
					<p>公司资料材料</p>
				</li>
			</ul>
		</div>
		<div class="reg3-from">
				<div v-if="isJgjg == false">
					<div class="reg3-title">企业基本资料</div>
					<!--上传单文件-->
					<div class="reg3-upload clear-float">
						<div class="float-left" style="position: relative;">
							<p><span class="red-font">*</span>营业执照附件：</p>
							<el-upload
							  class="avatar-uploader"
							  :action="reqUrl"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload"
							  :on-change="checkImg">
							  <img v-if="imageUrl" :src="imageUrl" class="avatar" @mouseenter="showImgdiv1">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<div class="show-img-div" v-if="showImg1" @mouseleave="leaveImg1" style="left: 188px; top: -250px;">
								<img :src="imageUrl" class="show-div-img">
							</div>						
							<span class="blue-font font-13">文件上传只支持jpg、png</span>
							<span class="red-font font-13" v-show="noImage">请选择文件</span>
						</div>
						<div class="float-left" style="position: relative;">
							<p><span class="red-font"></span>企业公章：</p>
							<el-upload
							  class="avatar-uploader"
							  :action="reqUrl"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess2"
							  :before-upload="beforeAvatarUpload"
							  :on-change="checkImg2">
							  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" @mouseenter="showImgdiv2">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<div class="show-img-div" v-if="showImg2" @mouseleave="leaveImg2" style="left: -705px; top: -250px;">
								<img :src="imageUrl2" class="show-div-img">
							</div>	
							<span class="blue-font font-13">文件上传只支持jpg、png</span>
							<span class="red-font font-13" v-show="noImage2">请选择文件</span>
						</div>
					</div>
					
					<div v-if="companyType == 2" style="position: relative;">
						<div class="reg3-title">生产厂家必备资料</div>
						<div class="mechanism-paper">
							<p><span class="red-font">*</span>医疗器械生产许可证：</p>
								<el-upload
								  class="avatar-uploader"
								  :action="reqUrl"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess3"
								  :before-upload="beforeAvatarUpload"
								  :on-change="checkImg3">
								  <img v-if="imageUrl3" :src="imageUrl3" class="avatar" @mouseenter="showImgdiv3">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="show-img-div" v-if="showImg3" @mouseleave="leaveImg3" style="left: -446px; top: -300px;">
									<img :src="imageUrl3" class="show-div-img">
								</div>
								<span class="blue-font font-13">文件上传只支持jpg、png</span>
								<span class="red-font font-13" v-show="noImage3">请选择文件</span>
								
							<!--上传多文件-->
							
								<p><span class="red-font">*</span>医疗器械注册证：<span class="blue-font">（可上传多个证件）</span></p>
								<div class="upload-div">									
									<el-upload
									  :action="reqUrl"
									  list-type="picture-card"
									  :on-preview="handlePictureCardPreview"
									  :on-success="moreImagesSuc"
									  :on-remove="handleRemove"
									  :on-change="checkImgs">
									  <i class="el-icon-plus"></i>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible">
									  <img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
									<span class="blue-font">文件上传只支持jpg、png</span>
									<span class="red-font font-13" v-show="noImages">请选择文件</span>
								</div>
							
						</div>
					</div>
					
					<div v-if="companyType == 0" style="position: relative;">
						<div class="reg3-title">医疗机构必备资料</div>
						<div class="mechanism-paper">
							<p><span class="red-font">*</span>医疗经营许可证：</p>
							<div class="upload-div">
								<el-upload
								  class="avatar-uploader"
								  :action="reqUrl"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess4"
								  :before-upload="beforeAvatarUpload"
								  :on-change="checkImg4">
								  <img v-if="imageUrl4" :src="imageUrl4" class="avatar" @mouseenter="showImgdiv4">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="show-img-div" v-if="showImg4" @mouseleave="leaveImg4" style="left: -446px; top: -450px;">
									<img :src="imageUrl4" class="show-div-img">
								</div>	
								<span class="blue-font">文件上传只支持jpg、png</span>
								<span class="red-font font-13" v-show="noImage4">请选择文件</span>
							</div>
						</div>
					</div>
					
					<div v-if="companyType == 1">
						<div class="reg3-title">经销商必填资料</div>
						<div class="mechanism-paper">
							<p><span class="red-font">*</span>医疗器械经营企业许可证：</p>
							<div class="upload-div">
								<el-upload
								  class="avatar-uploader"
								  :action="reqUrl"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess5"
								  :before-upload="beforeAvatarUpload"
								  :on-change="checkImg5">
								  <img v-if="imageUrl5" :src="imageUrl5" class="avatar" @mouseenter="showImgdiv5">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="show-img-div" v-if="showImg5" @mouseleave="leaveImg5" style="left: 156px; top: 364px;">
									<img :src="imageUrl5" class="show-div-img">
								</div>	
								<span class="blue-font">文件上传只支持jpg、png</span>
								<span class="red-font font-13" v-show="noImage5">请选择文件</span>
							</div>
							<p>医疗器械经营备案许可证：</p>
							<div class="upload-div">
								<el-upload
								  class="avatar-uploader"
								  :action="reqUrl"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess6"
								  :before-upload="beforeAvatarUpload"
								  :on-change="checkImg6">
								  <img v-if="imageUrl6" :src="imageUrl6" class="avatar" @mouseenter="showImgdiv6">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<div class="show-img-div" v-if="showImg6" @mouseleave="leaveImg6" style="left: 156px; top: 364px;">
									<img :src="imageUrl6" class="show-div-img">
								</div>	
								<span class="blue-font">文件上传只支持jpg、png</span>
								<span class="red-font font-13">可不选</span>
							</div>
						</div>
					</div>
				</div>	
			<button class="layui-btn next-stap" @click="finished">完成</button>			
		</div>		
	</div>
<!--内容部分-->
</div>	
</template>
<script>
export default {	
	data (){
		return {
			reqUrl: this.GLOBAL.uploadUrl,
   			imageUrl: null,   //营业执照
   			imageUrl2: null,		//企业公章
   			imageUrl3: null,  //医疗器械生产许可证(生产厂家必备资料)
   			imageUrl4: null,	//医疗经营许可证（医疗机构必备资料）
   			imageUrl5: null,	//医疗器械经营企业许可证(经销商)
   			imageUrl6: null,	//医疗器械经营备案许可证(经销商)
   			dialogImageUrl: null,			
        	dialogVisible: false,
        	noSubmit: false,
        	noImages: true,
        	noImage: this.common.LStorage.getItem("compDocument") && this.common.LStorage.getItem("compDocument").businessLicense ? false : true,
        	noImage2: this.common.LStorage.getItem("compDocument") && this.common.LStorage.getItem("compDocument").companySeal ? false : true,
        	noImage3: this.common.LStorage.getItem("compDocument") && this.common.LStorage.getItem("compDocument").medicalEquipmentProductionLicense ? false : true,
        	noImage4: this.common.LStorage.getItem("compDocument") && this.common.LStorage.getItem("compDocument").medicalOperationLicence ? false : true,
        	noImage5: this.common.LStorage.getItem("compDocument") && this.common.LStorage.getItem("compDocument").medicalEquipmentBusinessLicense ? false : true,
        	compDocument: {},
        	medicalDeviceRegistration: '',
        	compDocumentInfos: [],
        	companyType: this.common.LStorage.getItem("compInfo").companyType,
        	isJgjg: this.$route.query.isJgjg == 'true'? true : false,
        	showImg1: false,
        	showImg2: false,
        	showImg3: false,
        	showImg4: false,
        	showImg5: false,
        	showImg6: false,
    	}
	},
	methods: {
		showImgdiv1(){
			this.showImg1 = true
			this.showImg2 = false
			this.showImg3 = false
			this.showImg4 = false
			this.showImg5 = false
			this.showImg6 = false
		},
		showImgdiv2(){
			this.showImg1 = false
			this.showImg2 = true
			this.showImg3 = false
			this.showImg4 = false
			this.showImg5 = false
			this.showImg6 = false
		},
		showImgdiv3(){
			this.showImg1 = false
			this.showImg2 = false
			this.showImg3 = true
			this.showImg4 = false
			this.showImg5 = false
			this.showImg6 = false
		},
		showImgdiv4(){
			this.showImg1 = false
			this.showImg2 = false
			this.showImg3 = false
			this.showImg4 = true
			this.showImg5 = false
			this.showImg6 = false
		},
		showImgdiv5(){
			this.showImg1 = false
			this.showImg2 = false
			this.showImg3 = false
			this.showImg4 = false
			this.showImg5 = true
			this.showImg6 = false
		},
		showImgdiv6(){
			this.showImg1 = false
			this.showImg2 = false
			this.showImg3 = false
			this.showImg4 = false
			this.showImg5 = false
			this.showImg6 = true
		},
		leaveImg1(){
			this.showImg1 = false
		},
		leaveImg2(){
			this.showImg2 = false
		},
		leaveImg3(){
			this.showImg3 = false
		},
		leaveImg4(){
			this.showImg4 = false
		},
		leaveImg5(){
			this.showImg5 = false
		},
		leaveImg6(){
			this.showImg6 = false
		},
		refresh(){
	　　　　　　this.$router.go(0);  
	　　　},
	/******上传图片*****/	
	  handleAvatarSuccess(res, file) {					//-----------上传单文件
	  	this.compDocument.businessLicense = res
	  	console.log(this.compDocument)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.common.LStorage.setItem("compDocument",this.compDocument)
      },
	  handleAvatarSuccess2(res, file) {
	  	console.log(this.compDocument)
	  	this.compDocument.companySeal = res
        this.imageUrl2 = URL.createObjectURL(file.raw);
        this.common.LStorage.setItem("compDocument",this.compDocument)
      },
	  handleAvatarSuccess3(res, file) {
	  	console.log(this.compDocument)
	  	this.compDocument.medicalEquipmentProductionLicense = res
        this.imageUrl3 = URL.createObjectURL(file.raw);
        this.common.LStorage.setItem("compDocument",this.compDocument)
      },
	  handleAvatarSuccess4(res, file) {
	  	console.log(this.compDocument)
	  	this.compDocument.medicalOperationLicence = res
        this.imageUrl4 = URL.createObjectURL(file.raw);
        this.common.LStorage.setItem("compDocument",this.compDocument)
      },
	  handleAvatarSuccess5(res, file) {
	  	console.log(this.compDocument)
	  	this.compDocument.medicalEquipmentBusinessLicense = res
        this.imageUrl5 = URL.createObjectURL(file.raw);
        this.common.LStorage.setItem("compDocument",this.compDocument)
      },
	  handleAvatarSuccess6(res, file) {
	  	console.log(this.compDocumentInfos)
	  	this.compDocumentInfos = [
	  		{
	  			'medicalEquipmentManagementRecordLicense': res
	  		}
	  	]
        this.imageUrl6 = URL.createObjectURL(file.raw);
        this.common.LStorage.setItem("compDocumentInfos",this.compDocumentInfos)
      },
      checkImgs(file, fileList){
      	if(fileList.length != 0){
      		this.noImages = false
      	}
      },
      checkImg(file, fileList){
      	if(fileList.length != 0){
      		this.noImage = false
      	}
      },
      checkImg2(file, fileList){
      	if(fileList.length != 0){
      		this.noImage2 = false
      	}
      },
      checkImg3(file, fileList){
      	if(fileList.length != 0){
      		this.noImage3 = false
      	}
      },
      checkImg4(file, fileList){
      	if(fileList.length != 0){
      		this.noImage4 = false
      	}
      },
      checkImg5(file, fileList){
      	if(fileList.length != 0){
      		this.noImage5 = false
      	}
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
      finished(){
      	if(!this.noImage && (!this.noImage4 || (!this.noImage3 && !this.noImages) || !this.noImage5) || this.isJgjg == true){
      		
      		this.common.LStorage.setItem("compDocument",this.compDocument)
      		this.common.LStorage.setItem("compDocumentInfos",this.compDocumentInfos)
      		
      		let userInfo = this.common.LStorage.getItem('userInfo')
      		let userLogin = this.common.LStorage.getItem('userLogin')
      		let compInfo = this.common.LStorage.getItem('compInfo')
      		let compDocument = this.common.LStorage.getItem('compDocument')
      		let compDocumentInfos = this.common.LStorage.getItem('compDocumentInfos')
      		
      		this.common.LStorage.setItem("registerData",{
      			"userInfo":userInfo,
      			"userLogin":userLogin,
      			"compInfo":compInfo,
      			"compDocument":compDocument,
      			"compDocumentInfos":compDocumentInfos,
      		})
      		
      		let parm = this.common.LStorage.getItem('registerData')
      		
			let baseParm = this.common.DataToBase64(JSON.stringify(parm))			
			let _this = this
			//console.log(baseParm)
			console.log(JSON.stringify(parm))
      		this.$axios.post('/user_web/user/register?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){		
			  		this.$message({
			          showClose: true,
			          message: '提交成功,请等待审核！',
			          type: 'success'
			        })
			  		setTimeout(function(){
			  			_this.common.LStorage.removeItem("userInfo")
			  			_this.common.LStorage.removeItem("userLogin")
			  			_this.common.LStorage.removeItem("compInfo")
			  			_this.common.LStorage.removeItem("compDocument")
			  			_this.common.LStorage.removeItem("compDocumentInfos")
			  			_this.common.LStorage.removeItem("registerData")
						_this.$router.push('/')
				  	},700)			  		
			  	}else{
			  		console.log(nowData.message)
			  		this.$message({
			          showClose: true,
			          message: '请检查文件是否上传完整!',
			          type: 'warning'
			        })
			  	}	  		
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          showClose: true,
		          message: err.message,
		          type: 'warning'
		        })
			  })
      		
      		
      	}else{
      		this.$message({
	          showClose: true,
	          message: '请检查上传图片！',
	          type: 'warning'
	        })
      	}
      },
      handleRemove(file, fileList) {     				//-----------上传多文件
        console.log(file.response);
        console.log(fileList);
        this.moreImagesSuc(file.response, file, fileList, 2)  //2代表删除操作
      },
      handlePictureCardPreview(file) {
      	console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      removeByValue(arr, val){				//删除数组指定项
		  for(var i=0; i<arr.length; i++) {
		    if(arr[i].medicalDeviceRegistration == val) {
		      arr.splice(i, 1);
		      break;
		    }
		  }
	  },
      moreImagesSuc(response, file, fileList, type){
      	console.log(response)
      	this.common.LStorage.setItem('compDocumentInfos',{})  //每次上传多个备案许可证时清空上一次数据
      	if(type == 2){      		
	      	this.removeByValue(this.compDocumentInfos,response)   //多图上传删除操作
	      	
	 		this.common.LStorage.setItem("compDocumentInfos",this.compDocumentInfos)  //上传多个备案许可证
      	}else{     	
	      	this.medicalDeviceRegistration = response
	 		this.compDocumentInfos.push({
	 			medicalDeviceRegistration: this.medicalDeviceRegistration
	 		})
	
	 		this.common.LStorage.setItem("compDocumentInfos",this.compDocumentInfos)  //上传多个备案许可证
      	}
      	
 		console.log(JSON.stringify(this.compDocumentInfos))
      }
	},
	mounted (){
		console.log('监管机构判断参数:'+this.isJgjg)
		console.log(JSON.stringify(this.common.LStorage.getItem('registerData')))
		
		if(this.common.LStorage.getItem('compDocument')){
			if(this.common.LStorage.getItem('compDocument').businessLicense){
				this.imageUrl = this.common.LStorage.getItem('compDocument').businessLicense
			}
			if(this.common.LStorage.getItem('compDocument').companySeal){
				this.imageUrl2 = this.common.LStorage.getItem('compDocument').companySeal
			}
			if(this.common.LStorage.getItem('compDocument').medicalEquipmentProductionLicense){
				this.imageUrl3 = this.common.LStorage.getItem('compDocument').medicalEquipmentProductionLicense
			}
			if(this.common.LStorage.getItem('compDocument').medicalOperationLicence){
				this.imageUrl4 = this.common.LStorage.getItem('compDocument').medicalOperationLicence
			}
			if(this.common.LStorage.getItem('compDocument').medicalEquipmentBusinessLicense){
				this.imageUrl5 = this.common.LStorage.getItem('compDocument').medicalEquipmentBusinessLicense
			}
			if(this.common.LStorage.getItem('compDocumentInfos')){
				if(this.common.LStorage.getItem('compDocumentInfos').length > 0){
					this.imageUrl6 = this.common.LStorage.getItem('compDocumentInfos')[0].medicalEquipmentManagementRecordLicense
				}
			}					
		}
	},
	watch: {

	}
}	
</script>
<style scoped>
.show-img-div{
	position: absolute; width: 700px; height: 800px; overflow: auto; z-index: 99; background-color: #fff; border: 1px solid #999;
}	
.show-div-img{
	width: 100%;
}	
.bg-register{/*#28B9E0-#2DA4EC*/
	padding-top: 1px;
	background: #28B9E0;
    background: -moz-linear-gradient(top,  #28B9E0 0%, #2DA4EC 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#28B9E0), color-stop(100%,#2DA4EC));
    background: -webkit-linear-gradient(top,  #28B9E0 0%,#2DA4EC 100%);
    background: -o-linear-gradient(top,  #28B9E0 0%,#2DA4EC 100%);
    background: -ms-linear-gradient(top,  #28B9E0 0%,#2DA4EC 100%);
    background: linear-gradient(to bottom,  #28B9E0 0%,#2DA4EC 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#28B9E0', endColorstr='#2DA4EC',GradientType=0 );
	} 	
	.now-login-icon{
	width: 14px;
    height: 14px;
    background-color: #737373;
    display: inline-block;
    line-height: 14px;
    border-radius: 50%;
    color: #fff;
	}
	.now-login-icon i{
		font-size: 12px;
		position: relative;
    top: -1px;
    left: 1px;
	}
	.content{
		width: 1040px; min-height: 400px; margin: 6px auto 0px; padding: 15px 30px 50px; overflow: visible; background-color: #fff;
	}
	.reg-step-icon{
		margin: 40px;
	}
	.reg-step-icon ul li{
		float: left; position: relative; margin-right: 120px;
	}
	.reg-step-icon ul li:after{
		content:""; width: 226px; height: 2px; display: block; background-color: #bec0c0; position: absolute; left: 70px; top: 15px;
	}
	.reg-step-icon ul li.now-stap:after{
		background-color: #3a99d6;
	}
	.reg-step-icon ul li:last-child{
		margin-right: 0px;
	}
	.reg-step-icon ul li:last-child:after{
		display: none; 
	}
	.reg-step-icon ul li > div{
		width: 29px; height: 29px; line-height: 29px; margin: 0 auto; background-color: #bec0c0; border-radius: 50%; color: #fff;
	}
	.reg-step-icon ul li.now-stap > div{
		background-color: #3a99d6; 
	}
	.reg-step-icon ul li > p{
		margin-top: 10px; width: 112px; color: #585858;
	}
	.reg-step-icon ul li.now-stap > p{
		color: #3a99d6;
	}
	.reg-step-icon ul{
		width: 625px; margin: 0 auto;
	}
	.layui-form-label{
		width: auto; color: #5f5f5f; padding-right: 0px;
	}
	.layui-input-block {
	    margin-left: 162px; height: 59px; position: relative;
	}
	.layui-input-block p{
	    text-align: left;
	}
	.layui-form-item {
	    
	}
	.layui-form-item input{
	    width: 338px;
	} 
	.layui-form-item input{
	    width: 190px;
	}
	.layui-form-select .layui-edge{
			right: 45px;
	}
	.next-stap{
		width: 379px;
    height: 39px;
    font-size: 17px;
    background-color: #62bdee;
    border-radius: 19px;
    margin-top: 60px;
	}
	
	.reg3-from{
		width: 700px; margin: 0 auto 50px;
	}
	.reg3-title{
		color: #585858; font-size: 20px; text-align: left; padding-bottom: 10px; border-bottom: 1px solid #585858; margin-top: 30px; 
	}
	.reg3-upload .float-left{
		width: 50%; text-align: left;
	}
	/*.upload-box{
		width: 122px; height: 122px; line-height: 122px; text-align: center; border: 1px dashed #d0cece; cursor: pointer;
	}
	.upload-box i{
		font-size: 60px; color: #d0cece;
	}*/
	.reg3-upload .float-left > p{
		margin: 10px 0;
	}
	/*.upload-div{
		width: 160px; height: 150px;
	}*/
	.reg3-upload .float-left .upload-div{
		padding-left: 150px;
	}
	.reg3-upload .float-left .upload-div > span{
		font-size: 13px;
	}
	.mechanism-paper .upload-div{
		padding-left: 0px;
	}
	.mechanism-paper .upload-div > span{
		font-size: 13px;
	}
	.mechanism-paper p{
		text-align: left; margin: 10px 0;
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