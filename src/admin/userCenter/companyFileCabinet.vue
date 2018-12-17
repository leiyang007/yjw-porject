<template>
	<div>
		<div class="head-box">
			<ul>
				<li v-for="(item,index) in arrNav" :class="{current:index == nowIndex}" @click="relationClick(index)">{{ item.name }}</li>
			</ul>
		</div>
		<div class="companyInfo info-box" v-if="isShowNav1">
			<h3 class="title">
				企业概况
			</h3>			
			<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline clear" style="width: 800px;">
			  <el-form-item label="企业名称" prop="companyName" class="float-left" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.companyName" placeholder="企业名称" style="width: 300px;"></el-input>
			  </el-form-item>
			  <el-form-item label="纳税人识别号" prop="nsrSn" class="float-right" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.nsrSn" placeholder="纳税人编号"></el-input>
			  </el-form-item>
			  <el-form-item label="企业类型" prop="companyType" class="float-left" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.companyType" placeholder="企业类型" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="注册资金" prop="registerMoney" class="float-right" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.registerMoney" placeholder="注册资金" style="width: 156px;"></el-input>
			    <span style="margin-left: 10px;">万{{ ruleForm.registeredType == 1 ? '美元' : '' }}</span>
			  </el-form-item>
			  
			  <el-form-item label="企业地址" prop="address" class="float-left" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.address" placeholder="企业地址" style="width: 690px;"></el-input>
			  </el-form-item>
			  <el-form-item label="" prop="" class="float-right" :label-width="formLabelWidth">
			  </el-form-item>
			  
			  <el-form-item label="企业法人" prop="companyFren" class="float-left" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.companyFren" placeholder="企业法人"></el-input>
			  </el-form-item>
			  <el-form-item label="" prop="" class="float-right" :label-width="formLabelWidth" >
			  	<el-input placeholder="" id="input-none"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="第一联系人" prop="person1" class="float-left" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.person1" placeholder="第一联系人"></el-input>
			  </el-form-item>
			  <el-form-item label="联系方式" prop="phone1" class="float-right" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.phone1" placeholder="联系方式"></el-input>
			  </el-form-item>
			  <el-form-item label="第二联系人" prop="person2" class="float-left" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.person2" placeholder="第二联系人"></el-input>
			  </el-form-item>
			  <el-form-item label="联系方式" prop="phone2" class="float-right" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.phone2" placeholder="联系方式"></el-input>
			  </el-form-item>
			  <el-form-item label="第三联系人" prop="person3" class="float-left" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.person3" placeholder="第三联系人"></el-input>
			  </el-form-item>
			  <el-form-item label="联系方式" prop="phone3" class="float-right" :label-width="formLabelWidth">
			    <el-input v-model="ruleForm.phone3" placeholder="联系方式"></el-input>
			  </el-form-item>
			</el-form>		
			
			<h3 class="title bottom-line" v-if="isJgjg != 3">企业基本资料 </h3>
			<div class="body-box clear" v-if="isJgjg != 3">
				<div class="float-left">
					<span>营业执照附件:</span>
					<el-upload
					  class="avatar-uploader"
					  :action="reqUrl"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="businessLicense" :src="businessLicense" class="avatar">					  
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>					
					<span class="blue-font font-13">文件上传只支持jpg、png</span>
					<span class="green-font pointer show-big-img" @click="bigImgShow(businessLicense)">查看大图</span>
					<!--<img :src="businessLicense" style="width: 300px; height: 200px;" alt="" />-->
				</div>
				<div class="float-right">
					<span>企业公章:</span>
					<el-upload
					  class="avatar-uploader"
					  :action="reqUrl"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess2"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="companySeal" :src="companySeal" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<span class="blue-font font-13">文件上传只支持jpg、png</span>
					<span class="green-font pointer show-big-img" @click="bigImgShow(companySeal)">查看大图</span>
					<!--<img :src="companySeal" style="width: 300px; height: 200px;" alt="" />-->
				</div>
			</div>
			
			<div v-if="isShowCompanyType == 2">
				<h3 class="title bottom-line">生产厂家必备资料 </h3>
				<div class="body-box clear">
					<div class="">
						<span>医疗器械生产许可证:</span>
						<el-upload
						  class="avatar-uploader"
						  :action="reqUrl"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess3"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="medicalEquipmentProductionLicense" :src="medicalEquipmentProductionLicense" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span class="blue-font font-13">文件上传只支持jpg、png</span>
						<span class="green-font pointer show-big-img" @click="bigImgShow(medicalEquipmentProductionLicense)">查看大图</span>
						<!--<img :src="medicalEquipmentProductionLicense" style="width: 300px; height: 200px;" alt="" />-->
					</div>
					<div class="" style="margin-top: 20px;">
						<span style="margin-bottom: 20px;">医疗器械注册证: <span class="red-font">(可以有多张)</span></span>
						<el-upload
						  :action="reqUrl"
						  list-type="picture-card"
						  :on-preview="handlePictureCardPreview"
						  :on-success="moreImagesSuc"
						  :on-remove="handleRemove"
						  :file-list="editFiles">
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
						<span class="blue-font">文件上传只支持jpg、png</span>
						<!--<img v-for="item in medicalDeviceRegistrationList" :src="item.medicalDeviceRegistration" style="width: 300px; height: 200px; margin: 20px;" alt="" />-->
					</div>
				</div>
			</div>
			
			<div v-if="isShowCompanyType == 0">
				<h3 class="title bottom-line">医疗机构必备资料 </h3>
				<div class="body-box clear">
					<div class="float-left">
						<span>医疗机构执业许可证:</span>
						<el-upload
						  class="avatar-uploader"
						  :action="reqUrl"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess4"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="medicalOperationLicence" :src="medicalOperationLicence" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span class="blue-font font-13">文件上传只支持jpg、png</span>
						<span class="green-font pointer show-big-img" @click="bigImgShow(medicalOperationLicence)">查看大图</span>
						<!--<img :src="medicalOperationLicence" style="width: 300px; height: 200px;" alt="" />-->
					</div>
					<div class="float-right" style="width: 300px; height: 200px;"></div>
				</div>
			</div>
			
			<div v-if="isShowCompanyType == 1">
				<h3 class="title bottom-line">经销商必填资料 </h3>
				<div class="body-box clear">
					<div class="float-left">
						<span>医疗器械经营企业许可证:</span>
						<el-upload
						  class="avatar-uploader"
						  :action="reqUrl"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess5"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="medicalEquipmentBusinessLicense" :src="medicalEquipmentBusinessLicense" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span class="blue-font font-13">文件上传只支持jpg、png</span>
						<span class="green-font pointer show-big-img" @click="bigImgShow(medicalEquipmentBusinessLicense)">查看大图</span>
						<!--<img :src="medicalEquipmentBusinessLicense" style="width: 300px; height: 200px;" alt="" />-->
					</div>
					<div class="float-right">
						<span>医疗器械经营备案许可证:</span>
						<el-upload
						  class="avatar-uploader"
						  :action="reqUrl"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess6"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="medicalEquipmentManagementRecordLicense" :src="medicalEquipmentManagementRecordLicense" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span class="blue-font font-13">文件上传只支持jpg、png</span>
						<span class="green-font pointer show-big-img" @click="bigImgShow(medicalEquipmentManagementRecordLicense)">查看大图</span>
						<!--<img :src="medicalEquipmentManagementRecordLicense" style="width: 300px; height: 200px;" alt="" />-->
					</div>
				</div>			
			</div>	
			<div style="margin-bottom: 30px;">
				<el-button type="primary" @click="editInfo">修改</el-button>
			</div>	
		</div>
		<div class="info-box" v-if="isShowNav2">
			<div class="head-box clear" style="border-bottom: 1px solid #D9D9D9;">
				<ul>
					<li v-for="(item,index) in arrNav2" :class="{current:index == nowIndex2}" @click="relationClick2(index)">{{ item.name }}</li>
				</ul>
			</div>			
			<div v-if="isShowIn">
				<div class="date-time-box">
					<template>
					  <div class="block">
					    <el-date-picker
					      @change="selectDate"
					      v-model="dateTime"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					    <el-button type="primary" @click="queryInfo" style="margin-left: 30px;">查询</el-button>
					  </div>					  
					</template>					
				</div>
				<div class="table-body">
					<template>
					  <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
					    <el-table-column prop="createTime" label="单据日期">
					    </el-table-column>
					    <el-table-column prop="stockInSn" label="单据编号">
					    </el-table-column>
					    <el-table-column prop="supplierName" label="合作单位">
					    </el-table-column>					    
					    <el-table-column prop="img" label="单据链接">
					    	<template slot-scope="scope">				    		
				    			<el-popover
								  placement="right"
								  width="1300"
								  trigger="click">
								  <div style="width: 1300px; height: 450px; overflow-y: auto;">
								  	<img :src="scope.row.img" style="width: 1300px; " alt="" />
								  </div>								  	
								  <el-button slot="reference">查看单据</el-button>
								</el-popover>					    			
					    	</template>
					   </el-table-column>			    
					  </el-table>
					    <el-pagination
					      @size-change="handleSizeChange1"
					      @current-change="handleCurrentChange1"
					      :current-page.sync="nowPage"
					      :page-size="pageSize"
					      layout="prev, pager, next, jumper"
					      :total="totalCount">
					    </el-pagination>
					</template>	
				</div>
			</div>	
			<div v-if="isShowOut">
				<div class="date-time-box">
					<template>
					  <div class="block">
					    <el-date-picker
					      @change="selectDate2"
					      v-model="dateTime2"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					    <el-button type="primary" @click="queryInfo2" style="margin-left: 30px;">查询</el-button>
					  </div>
					</template>
				</div>
				<div class="table-body">
					<template>
					  <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
					    <el-table-column prop="createTime" label="单据日期2">
					    </el-table-column>
					    <el-table-column prop="stockOutSn" label="单据编号">
					    </el-table-column>
					    <el-table-column prop="buyerCompany" label="合作单位">
					    </el-table-column>					    
					    <el-table-column prop="img" label="单据链接">
					    	<template slot-scope="scope">				    		
					    		<el-popover
								  placement="right"
								  width="1300"
								  trigger="click">
								  <div style="width: 1300px; height: 450px; overflow-y: auto;">
								  	<img :src="scope.row.img" style="width: 1300px;" alt="" />
								  </div>	
								  <el-button slot="reference">查看单据</el-button>
								</el-popover>
					    	</template>
					   </el-table-column>			    
					  </el-table>
					    <el-pagination
					      @size-change="handleSizeChange2"
					      @current-change="handleCurrentChange2"
					      :current-page.sync="nowPage2"
					      :page-size="pageSize2"
					      layout="prev, pager, next, jumper"
					      :total="totalCount2">
					    </el-pagination>
					</template>	
				</div>
			</div>	
		</div>
		<div class="img-show-mask" id="img-show-mask" v-show="maskBtn" @click="closeBigImg"><img :src="bigImgSrc" class="bigImg" id="bigImg" /></div>
	</div>
</template>

<script>
export default {
  	data (){
	  	return {
	  		maskBtn: false,
	  		bigImgSrc: '',
	  		reqUrl: this.GLOBAL.uploadUrl,
	  		nowPage: 1,								//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,							//总条数
	  		nowPage2: 1,								//当前页
	      	pageSize2: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount2: 0,							//总条数
	      	tableData1: [],
	      	tableData2: [],
	  		arrNav: [
	  			{
	  				id: 0,
	  				name: '企业信息'
	  			},
	  			{
	  				id: 1,
	  				name: '企业单据'
	  			}
	  		],
	  		arrNav2: [
	  			{
	  				id: 0,
	  				name: '入库单'
	  			},
	  			{
	  				id: 1,
	  				name: '出库单'
	  			}
	  		],
	  		nowIndex:0,
	  		nowIndex2:0,
	  		formLabelWidth: '100px',
	  		dateTime: '',
	  		dateTime2: '',
	  		ruleForm: {
	          companyName: '',
	          nsrSn: '',
	          companyType: '',
	          companyTypeNum: '',
	          registeredType: '',
	          registerMoney: '',
	          locationId: '',
	          address: '',
	          companyFren: '',
	          businessScope: '',
	          businessScopeDesc: '',
	          person1: '',
	          person2: '',
	          person3: '',
	          phone1: '',
	          phone2: '',
	          phone3: ''
	      },
	      isShowCompanyType: null,
	      isJgjg: this.common.SStorage.getItem("saveUserInfo").userType,   //判断是否是监管机构
	      businessLicense: null,	//营业执照
	      companySeal: null,		//企业公章
	      medicalEquipmentProductionLicense: null,		//医疗器械生产许可证(生产厂家必备资料)
	      medicalDeviceRegistrationList: [],		//医疗器械注册证(生产厂家必备资料）可多个
	      medicalDeviceRegistrationArray: [],		//临时存放医疗器械注册证数组(生产厂家必备资料）可多个
	      medicalOperationLicence: null,		//医疗经营许可证（医疗机构必备资料）
	      medicalEquipmentBusinessLicense: null,		//医疗器械经营企业许可证(经销商)
	      medicalEquipmentManagementRecordLicense: null,		//医疗器械经营备案许可证(经销商)
	      isShowNav1: true,
	      isShowNav2: false,
	      isShowIn: true,
	      isShowOut: false,
	      dialogImageUrl: '',
          dialogVisible: false,
          editFiles: []// 编辑时已上传图片初始化
		}
	},
    methods: {
    	handleAvatarSuccess(res, file) {					//-----------上传单文件
	        this.businessLicense = res;
	        console.log(this.businessLicense)
	    },
    	handleAvatarSuccess2(res, file) {					//-----------上传单文件
	        this.companySeal = res;
	        console.log(this.companySeal)
	    },
    	handleAvatarSuccess3(res, file) {					//-----------上传单文件
	        this.medicalEquipmentProductionLicense = res;
	        console.log(this.medicalEquipmentProductionLicense)
	    },
    	handleAvatarSuccess4(res, file) {					//-----------上传单文件
	        this.medicalOperationLicence = res;
	        console.log(this.medicalOperationLicence)
	    },
    	handleAvatarSuccess5(res, file) {					//-----------上传单文件
	        this.medicalEquipmentBusinessLicense = res;
	        console.log(this.medicalEquipmentBusinessLicense)
	    },
    	handleAvatarSuccess6(res, file) {					//-----------上传单文件
	        this.medicalEquipmentManagementRecordLicense = res;
	        this.medicalDeviceRegistrationArray = [
		  		{
		  			'medicalEquipmentManagementRecordLicense': res
		  		}
		  	]
	        console.log(this.medicalDeviceRegistrationArray)
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
	    handleRemove(file, fileList) {     				//-----------上传多文件
	        console.log(file.response);
	        console.log(fileList);
	    },
	    handlePictureCardPreview(file) {
	      	console.log(file)
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
	    moreImagesSuc(res, file){		//上传多文件
	      	console.log(res)
			console.log(file)
			console.log(this.editFiles)

			this.medicalDeviceRegistrationArray.push({
	 			medicalDeviceRegistration: res
	 		})
			console.log(JSON.stringify(this.medicalDeviceRegistrationArray))
	    },
	    // 多图上传初始化
	    initInfo() {
	        // 这里photo应从服务器获取，存储的是数组，请按照相应格式获取图片url（这里直接给值）v-for="item in medicalDeviceRegistrationList" :src="item.medicalDeviceRegistration" 
	        let temp = this.medicalDeviceRegistrationList

	        if(temp.length > 0){
	          for(let t=0; t<temp.length; t++){
	            //通过[{name: 'name', url: 'url地址'}]格式初始化照片墙
	            this.editFiles.push({url: temp[t].medicalDeviceRegistration});	
	          }
	        }
	        this.editVisible = true;
	    },
    	editInfo(){
    		let parm = {	
					    "updateId": this.common.SStorage.getItem("saveUserInfo").userId,
					    "compInfo": {
					        "id": this.common.SStorage.getItem("saveUserInfo").companyId,
					        "companyName": this.ruleForm.companyName,
					        "companyType": this.ruleForm.companyTypeNum,
					        "legalPerson": this.ruleForm.companyFren,
					        "taxpayerRegistrationNumber": this.ruleForm.nsrSn,
					        //"businessScope": this.ruleForm.businessScope,
					        //"businessScopeDesc": this.ruleForm.businessScopeDesc,
					        "registeredCapital": this.ruleForm.registerMoney,
					        "locationId": this.ruleForm.locationId,
					        "location": this.ruleForm.address,
					        "contactPerson1": this.ruleForm.person1,
					        "phone1": this.ruleForm.phone1,
					        "contactPerson2": this.ruleForm.person2,
					        "phone2": this.ruleForm.phone2,
					        "contactPerson3": this.ruleForm.person3,
					        "phone3": this.ruleForm.phone3
					    },
					    "compDocument":{
					        "businessLicense": this.businessLicense,
					        "companySeal": this.companySeal,
					        "medicalEquipmentProductionLicense": this.medicalEquipmentProductionLicense ? this.medicalEquipmentProductionLicense : null,
					        "medicalOperationLicence": this.medicalOperationLicence ? this.medicalOperationLicence : null,
					        "medicalEquipmentBusinessLicense": this.medicalEquipmentBusinessLicense ? this.medicalEquipmentBusinessLicense : null
					    },
					    "compDocumentInfos":this.medicalDeviceRegistrationArray,
			     	    "signId": this.GLOBAL.userid
	    	}  

			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			console.log(JSON.stringify(parm))
					
			this.$axios.post('/user_web/company/updateCompany?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){						    
				    
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
    	selectDate(val){
    		console.log(val)
    		console.log(JSON.stringify(this.dateTime))
    	},
    	selectDate2(val){
    		console.log(val)
    		console.log(JSON.stringify(this.dateTime2))
    	},
     	relationClick (index){ 
     		console.log(index)
		   this.nowIndex=index; 
		   if(index == 0){
		   		this.isShowNav1 = true
		   		this.isShowNav2 = false
		   }else{
		   		this.isShowNav2 = true
		   		this.isShowNav1 = false
		       	this.getInOutWarehouse(1)	//默认先下载入库单数据		
		   }
		}, 
     	relationClick2 (index){ 
     		console.log(index)
		   this.nowIndex2=index; 
		   if(index == 0){
		   		this.isShowIn = true
		   		this.isShowOut = false
		   		this.getInOutWarehouse(1)	//获取入库数据
		   }else{
		   		this.isShowIn = false
		   		this.isShowOut = true
		   		this.getInOutWarehouse(2)	//获取出库数据
		   }
		},
		handleSizeChange1(val){
    		this.pageSize = val
    		console.log(this.pageSize)
    	},
    	handleCurrentChange1(val){
    		this.nowPage = val
    		console.log('当前页是:'+this.nowPage)
    		//this.queryTableData()
    	}, 
		handleSizeChange2(val){
    		this.pageSize2 = val
    		console.log(this.pageSize2)
    	},
    	handleCurrentChange2(val){
    		this.nowPage2 = val
    		console.log('当前页是:'+this.nowPage2)
    		//this.queryTableData2()
    	},
    	queryCompanyInfo(){
			let _this = this
    		let parm = {	
					"companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				  "companyType": this.common.SStorage.getItem("saveUserInfo").userType,
			     	   "signId": this.GLOBAL.userid
	    	}  

			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			console.log(JSON.stringify(parm))
					
			this.$axios.get('/user_web/company/getCompanyInfoById?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
				    let company_type = null 
				    
				    if(nowData.result.companyType == 0){
		    			company_type = '医疗机构'
		    			_this.isShowCompanyType = 0
		    		}else if(nowData.result.companyType == 1){
		    			company_type = '经销商'
		    			_this.isShowCompanyType = 1
		    		}else if(nowData.result.companyType == 2){
		    			company_type = '生产厂家'
		    			_this.isShowCompanyType = 2
		    		}else{
		    			company_type = '监管机构'
		    			_this.isShowCompanyType = 3
		    		}

				    this.ruleForm.companyName = nowData.result.companyName
				    this.ruleForm.nsrSn = nowData.result.taxpayerRegistrationNumber
				    this.ruleForm.companyType = company_type
				    this.ruleForm.companyTypeNum = nowData.result.companyType
				    this.ruleForm.registeredType = nowData.result.registeredType
				    this.ruleForm.registerMoney = nowData.result.registeredCapital
				    this.ruleForm.locationId = nowData.result.locationId
				    this.ruleForm.address = nowData.result.location
				    this.ruleForm.businessScope = nowData.result.businessScope
				    this.ruleForm.businessScopeDesc = nowData.result.businessScopeDesc
				    this.ruleForm.companyFren = nowData.result.legalPerson
				    this.ruleForm.person1 = nowData.result.contactPerson1
				    this.ruleForm.person2 = nowData.result.contactPerson2
				    this.ruleForm.person3 = nowData.result.contactPerson3
				    this.ruleForm.phone1 = nowData.result.phone1
				    this.ruleForm.phone2 = nowData.result.phone2
				    this.ruleForm.phone3 = nowData.result.phone3				    				  
				    
				    this.businessLicense = nowData.result.businessLicense		//营业执照
				    this.companySeal = nowData.result.companySeal				//企业公章
				    
				    this.medicalOperationLicence = nowData.result.medicalOperationLicence		//医疗经营许可证（医疗机构必备资料）
				    
				    this.medicalEquipmentProductionLicense = nowData.result.medicalEquipmentProductionLicense		//医疗器械生产许可证(生产厂家必备资料)
				    this.medicalDeviceRegistrationList = nowData.result.compDocumentInfos
					
					if(_this.isShowCompanyType == 1){	//经销商
						_this.medicalDeviceRegistrationArray = [
					  		{
					  			'medicalEquipmentManagementRecordLicense': nowData.result.compDocumentInfos[0].medicalEquipmentManagementRecordLicense  //上传多张临时数组
					  		}
					  	]
					}else if(_this.isShowCompanyType == 2){		//生产厂家
						let arr = nowData.result.compDocumentInfos
						for(let i=0; i<arr.length; i++){
							_this.medicalDeviceRegistrationArray.push({
					 			medicalDeviceRegistration: nowData.result.compDocumentInfos[i].medicalDeviceRegistration
					 		})
						}
					}
				    				    
				    if(nowData.result.medicalEquipmentBusinessLicense){
				    	this.medicalEquipmentBusinessLicense = nowData.result.medicalEquipmentBusinessLicense     //医疗器械经营企业许可证(经销商)
				    }
				    if(nowData.result.compDocumentInfos){
				    	if(nowData.result.compDocumentInfos.length != 0){
					    	this.medicalEquipmentManagementRecordLicense = nowData.result.compDocumentInfos[0].medicalEquipmentManagementRecordLicense     //医疗器械经营备案许可证(经销商)
					    }				   			    
					    
					    this.initInfo()  //多图上传图片回显
				    }				    
				    
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
    	queryInfo(){
    		this.getInOutWarehouse(1)	//获取入库数据
    	},
    	queryInfo2(){
    		this.getInOutWarehouse(2)	//获取出库数据
    	},
    	getInOutWarehouse(type){		//获取出入库数据
    		let startTime = ''
    		let endTime = ''
    		let startTime2 = ''
    		let endTime2 = ''
    		
    		if(this.dateTime){
				startTime = this.common.fomatDate(this.dateTime[0],1)
				endTime = this.common.fomatDate(this.dateTime[1],1)   			
    		}else{
    			startTime = ''
    			endTime = ''
    		}
    		
    		if(this.dateTime2){
    			startTime2 = this.common.fomatDate(this.dateTime2[0],1)
				endTime2 = this.common.fomatDate(this.dateTime2[1],1) 
    		}else{
    			startTime2 = ''
    			endTime2 = ''
    		}
    		
    		let parm = {	
					"companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					  "nowPage": type == 1? this.nowPage : this.nowPage2,
						"count": type == 1? this.pageSize : this.pageSize2,
			  "createTimeStart": type == 1? startTime : startTime2,
				"createTimeEnd": type == 1? endTime : endTime2,
					     "type": type,
			     	   "signId": this.GLOBAL.userid
	    	}  

			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			console.log(JSON.stringify(parm))
					
			this.$axios.get('/user_web/company/selectBillsByCompId?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
				    console.log(JSON.stringify(nowData.result))			    
				    if(type == 1){
				    	this.tableData1 = nowData.result.list
				    	this.totalCount = nowData.result.total
				    }else{
				    	this.tableData2 = nowData.result.list
				    	this.totalCount2 = nowData.result.total
				    }
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  	}else{
			  		console.log(nowData.message)
			  		if(type == 1){
				    	this.tableData1 = []
				    }else{
				    	this.tableData2 = []
				    }
			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })
			  	}		  			
			  })
			  .catch((err) => {
			    console.log(err);
			    if(type == 1){
			    	this.tableData1 = []
			    }else{
			    	this.tableData2 = []
			    }
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  }) 
    	},
        bigImgShow (url) { //打开图片预览
			this.bigImgSrc = url;
			this.maskBtn = true;
			this.$nextTick(function() {
				var imgShowMask = document.getElementById('img-show-mask');
				var img = document.getElementById('bigImg');
				var w = document.documentElement.clientWidth || document.body.clientWidth;
				var h = document.documentElement.clientHeight || document.body.clientHeight;
				var offsetY=window.pageYOffset;
				
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
					imgShowMask.style.height=scrollHeight+'px';
					img.style.left=(w/2-500)+'px';
					img.style.top=(h/2-370+offsetY)+'px';
				});
 
		},
		closeBigImg () { //关闭图片预览
			this.maskBtn = false;
		}
    },
    mounted(){    	
    	this.queryCompanyInfo()    //查询企业信息
    	
    	$('.img-show-mask').css('width',$('body').css('width'))
    	$('.img-show-mask').css('height',document.body.clientHeight+1000)
    	console.log(this.medicalOperationLicence)
    	console.log(this.isJgjg)
    	   	
    }
}
</script>

<style type="text/css">
#input-none{
	width: 240px; border-color: #fff;
}	
</style>

<style scoped>
.head-box ul li{
	float: left; margin-right: 20px; cursor: pointer;
}
.head-box ul li.current{
	color: #fff; background-color: #92B8B1;
}
.head-box ul li:hover{
	color: #fff; background-color: #92B8B1;
}	
.companyInfo{
	
}
.info-box{
	border: 1px solid #999; min-width: 800px; position: relative; top: 30px; padding: 20px 100px; margin-bottom: 50px;
}
.title{
    text-align: left; padding: 20px 20px 10px;
}
.bottom-line{
	border-bottom: 1px solid #494949;
}
.body-box{
	padding-top: 20px; width: 930px; margin-bottom: 30px;
}
.body-box > div > img{
	margin-left: 20px;
}
.body-box > div > span{
	display: inline-block; 
}

.date-time-box{
	text-align: left; padding-top: 20px;
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
    width: 300px;
    height: 200px;
    display: block;
    margin-top: 20px;
  }

/*图片预览    */
.img-show-mask {
    /*width: 100%;
    height: 100%;*/
    position: absolute;
    left: -236px;
    top: -170px;
    z-index: 3000;
    background: rgba(0, 0, 0, .5);
}
 
.img-show-mask .bigImg {
    width: 1000px;
    height: 800px;
    position: absolute;
    z-index: 3100;
    top: 0;
    left: 0;
    margin: auto;
}
.show-big-img{
	margin: 10px 0 0 20px; 
	/*background-color: #C9C9C9;*/
}  
</style>