<template>
	<div class="goods-info">
		<div class="content-nav">
			<ul>
				<li>
					<router-link :to="{path: '/yjw_admin/factoryAddGoods'}">
						生产厂家添加商品
					</router-link>
				</li>
				<li><i class="el-icon-arrow-right"></i></li>
				<li class="blue-font">商品详情</li>
			</ul>
		</div>	
		<div class="clear" style="padding: 20px 0 20px;">
			<div class="float-left">
				<h2>商品详情</h2>
			</div>
			<div class="float-right">
				<el-button type="warning" v-if="pageType == undefined" @click="addPageData">添加</el-button>
				<el-button type="warning" v-if="pageType == '编辑'" @click="savePageData">保存</el-button>
			</div>			
		</div>
		<div class="table-head clear">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">商品信息:</p>
			<el-form :model="form" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
			  <el-form-item label="商品编号" prop="goodsCode">
			    <el-input v-model="form.goodsCode" style="width: 180px;" @change="checkGoodsCode" ></el-input>
			  </el-form-item>
			  <el-form-item label="商品名称" prop="goodsName">
			    <el-input v-model="form.goodsName" style="width: 180px;" ></el-input>
			  </el-form-item>
			  <el-form-item label="商品品牌" prop="goodsLogo">
			    <el-input v-model="form.goodsLogo" style="width: 180px;" ></el-input>
			  </el-form-item>
			  <el-form-item label="规格型号" prop="packing">
			    <el-input v-model="form.packing" style="width: 180px;" ></el-input>
			  </el-form-item>
			  <el-form-item label="计量单位" prop="unit">
			    <el-input v-model="form.unit" style="width: 180px" ></el-input>
			  </el-form-item>			  
			  <el-form-item label="商品类型" prop="goodsType">
			      <el-select v-model="form.goodsType" :data-seller="sellerUserId" filterable placeholder="请选择" @change="getGoodsType" style="width: 180px;">
				    <el-option
				      v-for="item in goodsTypeList"
				      :key="item.classCode"
				      :label="item.name"
				      :value="item.classCode">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="所属分类目录" prop="ownClassMenu">
			      <el-select v-model="form.ownClassMenu" :data-seller="sellerUserId" filterable placeholder="请选择" @change="getClassMenu" style="width: 180px;">
				    <el-option
				      v-for="item in ownClassMenuList"
				      :key="item.classCode"
				      :label="item.name"
				      :value="item.classCode">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="商品类别" prop="goodsClass">
			      <el-select v-model="form.goodsClass" :data-seller="sellerUserId" filterable placeholder="请选择" @change="getGoodsClass" style="width: 180px;">
				    <el-option
				      v-for="item in goodsClassList"
				      :key="item.name"
				      :label="item.name"
				      :value="item.name">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="注册证号" prop="registrationNumber">
			    <el-input v-model="form.registrationNumber" style="width: 180px" ></el-input>
			  </el-form-item>	
			  <el-form-item label="生产厂家" prop="factoryName">
			    <el-input v-model="form.factoryName" style="width: 180px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="生产企业许可证号" prop="licenseNumber">
			    <el-input v-model="form.licenseNumber" style="width: 180px" ></el-input>
			  </el-form-item>	
			  <!--<el-form-item label="有效期" prop="expiryDate">
			    <el-input v-model="form.expiryDate" style="width: 180px" ></el-input><span style="margin-left: 10px; position: absolute;">月</span>
			  </el-form-item>-->
			  <el-form-item label="出厂价格" prop="price">
			    <el-input v-model="form.price" style="width: 180px" ></el-input><span style="margin-left: 10px;">元</span>
			  </el-form-item>			  			  
			</el-form>
		</div>
		<div class="table-body" style="border-bottom: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6;">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">储存条件:</p>			
			<el-form :model="storageForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">			  
			  <el-form-item label="温度" prop="temperature">
			  	<el-checkbox v-model="temperature" style="margin-left: 50px;" @change="tempCheckChange">常温</el-checkbox>
			    <el-input v-model="storageForm.temperatureDown" :disabled="temDisable" style="width:80px; margin-left: 50px"></el-input><span style="margin-left: 10px">C <span style="margin-left: 10px">~</span></span>
			    <el-input v-model="storageForm.temperatureUp" :disabled="temDisable" style="width:80px; margin-left: 20px"></el-input><span style="margin-left: 10px">C</span>
			  </el-form-item>
			  <el-form-item label="湿度" prop="humidity">
			  	<el-checkbox v-model="humidity" style="margin-left: 50px"  @change="humCheckChange">无要求</el-checkbox>
			    <el-input v-model="storageForm.humidityDown" :disabled="humDisable" style="width:80px; margin-left: 36px"></el-input><span style="margin-left: 10px">% <span style="margin-left: 10px">~</span></span>
			    <el-input v-model="storageForm.humidityUp" :disabled="humDisable" style="width:80px; margin-left: 20px"></el-input><span style="margin-left: 10px">%</span>
			  </el-form-item>
			</el-form>						
		</div>
	</div>
	
	
</template>

<script>
	
export default{
	data(){
		var checkGoodsCodeRules = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('不能为空'));
	        } 
	        let parm =  {
						    	"sn": this.form.goodsCode,
						    "signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/product/checkSn?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))	
			  		callback();
			  	}else{
			  		console.log(nowData.message)
			  		callback(new Error(nowData.message));
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
	      };
		return{	
			pageType: '',
			rules: {
		          goodsCode: [
		            {validator: checkGoodsCodeRules, trigger: 'blur' }
		          ]
		    },
			temperature: false,
			humidity: false,
			form: {
				goodsCode: this.$route.query.productSn,
				goodsName: this.$route.query.name,
				goodsLogo: this.$route.query.manufacturer,
				packing: this.$route.query.packing,
				goodsType: '',
				ownClassMenu: this.$route.query.classCode,
				goodsClass: this.$route.query.attribute,
				unit: this.$route.query.unit,
				registrationNumber: this.$route.query.registrationNumber,
				factoryName: this.common.SStorage.getItem("saveUserInfo").companyName,
				licenseNumber: this.$route.query.licenseNumber,
				//expiryDate: this.$route.query.expiryDate,
				price: this.$route.query.price
			},
			parentClassCode: '',     //反选时商品类型
			storageForm: {
				temperature: '',
				temperatureDown: this.$route.query.temperatureDown,
				temperatureUp: this.$route.query.temperatureUp,
				humidity: '',
				humidityDown: this.$route.query.humidityDown,
				humidityUp: this.$route.query.humidityUp
			},
			goodsClassList: [
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
			ownClassMenuList: [],
			temDisable: false,
			humDisable: false,
		}
	},
	methods:{
		checkGoodsCode(val){
			console.log(val)
		},
		savePageData(){
			let _this = this
			let parm =  {
						    "goods":{
						    	  "fgoodsId": this.$route.query.fgoodsId,
						         "attribute": this.form.goodsClass,
						         "classCode": this.form.ownClassMenu ? this.form.ownClassMenu : this.form.goodsType,
						        //"expiryDate": this.form.expiryDate,
						       "factoryName": this.common.SStorage.getItem("saveUserInfo").companyName,
						     "licenseNumber": this.form.licenseNumber,
						       	   "packing": this.form.packing,
						       		  "name": this.form.goodsName,
						        	 "price": this.form.price,
						         "productSn": this.form.goodsCode,
						      "manufacturer": this.form.goodsLogo,
				        "registrationNumber": this.form.registrationNumber,
				         			  "unit": this.form.unit,
						   "temperatureDown": this.storageForm.temperatureDown,
						     "temperatureUp": this.storageForm.temperatureUp,
						      "humidityDown": this.storageForm.humidityDown,
						        "humidityUp": this.storageForm.humidityUp						       
						    },
						      "type": '2',
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
			  		setTimeout(function(){
			       		_this.$router.push('/yjw_admin/factoryAddGoods')
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
		addPageData(){
			let _this = this
			let parm =  {
						    "goods":{
						         "attribute": this.form.goodsClass,
						         "classCode": this.form.ownClassMenu ? this.form.ownClassMenu : this.form.goodsType,
						        //"expiryDate": this.form.expiryDate,
						       "factoryName": this.common.SStorage.getItem("saveUserInfo").companyName,
						     "licenseNumber": this.form.licenseNumber,
						       	   "packing": this.form.packing,
						       		  "name": this.form.goodsName,
						        	 "price": this.form.price,
						         "productSn": this.form.goodsCode,
						      "manufacturer": this.form.goodsLogo,
				        "registrationNumber": this.form.registrationNumber,
				         			  "unit": this.form.unit,
						   "temperatureDown": this.storageForm.temperatureDown,
						     "temperatureUp": this.storageForm.temperatureUp,
						      "humidityDown": this.storageForm.humidityDown,
						        "humidityUp": this.storageForm.humidityUp
						       
						    },
						    "signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				/*this.$axios.post('/product-web/product/insetFactoryProductGoodsNew?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.message))
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  		setTimeout(function(){
			       		_this.$router.push('/yjw_admin/factoryAddGoods')
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
			  })*/
		},
		tempCheckChange(val){
			console.log(val)
			if(val == true){
				this.temDisable = true
				this.storageForm.temperatureDown = ''
				this.storageForm.temperatureUp = ''
			}else{
				this.temDisable = false
			}
		},
		humCheckChange(val){
			console.log(val)
			if(val == true){
				this.humDisable = true
				this.storageForm.humidityDown = ''
				this.storageForm.humidityUp = ''
			}else{
				this.humDisable = false
			}
		},
		getGoodsType(val){
			console.log(val)
			this.getGoodsMenu(val)    //加载商品类别
			this.form.ownClassMenu = ''
		},
		getClassMenu(val){
			console.log(val)
		},	
		getGoodsClass(val){
			console.log(val)
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
			  		
			  		if(vid == 1 && _this.goodsTypeList != []){
			  			_this.ownClassMenuList = nowData.result[0].drug
			  		}else{
			  			_this.ownClassMenuList = nowData.result[0].inss
			  		}
			  		
			  		//反选查询商品类型
			  		if(_this.pageType == '编辑'){
			  			let parentClassId = null
						for(let i=0; i<_this.ownClassMenuList.length; i++){
							if(_this.ownClassMenuList[i].classCode == _this.$route.query.classCode){
								parentClassId = _this.ownClassMenuList[i].parentId
							}
						}
						for(let i=0; i<_this.goodsTypeList.length; i++){
							if(_this.goodsTypeList[i].id == parentClassId){
								_this.parentClassCode = _this.goodsTypeList[i].classCode
							}
						}
						console.log(_this.parentClassCode)
						_this.form.goodsType = _this.parentClassCode
			  		}
			  		
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
	mounted(){
		this.getGoodsMenu()
		console.log(this.form.goodsCode)
		this.pageType = this.$route.query.pageType
		
		if(this.pageType == '编辑'){
			if(this.storageForm.temperatureDown == this.storageForm.temperatureUp){
				this.temperature = true
	
				this.temDisable = true
				this.storageForm.temperatureDown = ''
				this.storageForm.temperatureUp = ''
			}
			if(this.storageForm.humidityDown == this.storageForm.humidityUp){
				this.humidity = true
				
				this.humDisable = true
				this.storageForm.humidityDown = ''
				this.storageForm.humidityUp = ''
			}
		}
		
	}
}
	
</script>

<style type="text/css">
.goods-info .el-form-item__content{
	text-align: left; width: auto;
}
.goods-info .table-head .el-form-item {
    float: left;
}
.goods-info .reg-step-icon ul li.now-stap > div,
.goods-info .reg-step-icon ul li.now-stap:after{
	background-color: #E6A23C;
}
.goods-info .reg-step-icon ul li.now-stap > p{
	color: #E6A23C;
}
.goods-info .reg-step-icon ul{
	width: 722px;
}
.goods-info .reg-step-icon ul li{
	margin-right: 40px;
}
.goods-info .reg-step-icon ul li:last-child{
	margin-right: 0px;
}
.goods-info .reg-step-icon ul li:after{
	width: 123px;
}
/*审批弹窗*/
.goods-info .el-form-item__content{
	text-align: left;
}
.goods-info .el-dialog{
	width: 500px;
}
.goods-info .el-dialog__header{
	text-align: left;
}

</style>
<style scoped>
.goods-info{
	margin-bottom: 50px;		
}
.table-head{
	padding: 10px 0; border-bottom: 1px solid #DCDFE6;	
}
.table-head ul li{
	float: left; margin-right: 20px; margin-bottom: 10px;
}	
.table-body{
	padding: 20px 0; overflow: hidden;
}

</style>