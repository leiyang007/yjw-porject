<template>
	<div class="put-in-storage">
		<div class="content-nav">
			<ul>
				<li>
					<a href="javascript:history.go(-1)">返回上一步</a>
				</li>
				<li><i class="el-icon-arrow-right"></i></li>
				<li class="blue-font">入库单新增</li>
			</ul>
		</div>
		<div class="clear" style="padding: 20px 0 20px;">
			<div class="float-left">
				<h2>入库单新增</h2>
			</div>
			<div class="float-right">
				<el-button type="warning" @click="savePageData">保存</el-button>
				<el-button type="warning" @click="submit" :disabled="isSave">提交</el-button>
			</div>	
			<div class="float-right" v-show="status == 1">
				<el-button type="warning" @click="shenheSubmit">审核</el-button>
			</div>			
		</div>
		<div class="table-head clear">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">单据信息:</p>
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <!--<el-form-item label="单据编号" prop="djbh">
			    <el-input v-model="ruleForm.documentNumber" style="width:200px" ></el-input>
			  </el-form-item>-->
			  <el-form-item label="供应商" prop="gys">
			    <!--<el-input v-model="ruleForm.supplier" style="width:200px" disabled></el-input>-->
			    <el-select v-model="ruleForm.supplier" filterable placeholder="请选择" @change="gysSeleChange(ruleForm.supplier)" >
				    <el-option
				      v-for="item in ruleForm.gysList"
				      :key="item.id"
				      :label="item.companyName"
				      :value="item.id">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="出库单据" prop="gys">
			    <!--<el-input v-model="ruleForm.unionCaigouOrder" id="caigouOrder" placeholder="请输入订单号查询"  style="width:200px" @blur="outStroeQuaryData"></el-input>-->
			  	<el-select v-model="ruleForm.outStroeOrder" filterable placeholder="请选择" @change="outStroeQuaryData(ruleForm.outStroeOrder)" >
				    <el-option
				      v-for="item in ruleForm.outStroeOrderList"
				      :key="item.stockOutSn"
				      :label="item.stockOutSn"
				      :value="item.stockOutSn">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="关联的采购订单" prop="gys">
			    <el-input v-model="ruleForm.unionCaigouOrder" placeholder=""  style="width:200px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="单据日期">
			  	<el-input v-model="ruleForm.createTime" style="width:200px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="存储仓库" prop="ywy">
			      <el-select v-model="ruleForm.storageWarehouse" filterable placeholder="请选择" @change="onSelectedDrug($event, item)" >
				    <el-option
				      v-for="item in ruleForm.storageList"
				      :key="item.repertoryId"
				      :label="item.name"
				      :value="item.repertoryId">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="采购员" prop="cgy">
			    <el-input v-model="ruleForm.cgy_name" style="width:200px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="库管员" prop="cgy">
			    <el-input v-model="ruleForm.kgy_name" style="width:200px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="上传图片" prop="cgy" v-if="isShowImgBut">
			    <el-upload
				  class="avatar-uploader"
				  :action="reqUrl"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" @mouseenter="showImg" class="avatar">
				  <el-button v-else type="warning">点击上传</el-button>
				</el-upload>
				<div class="showImg" v-if="showImgUp" @mouseleave="hideImg">
					<img :src="imageUrl">
				</div>				
			  </el-form-item>			  			  
			</el-form>
		</div>
		<div class="table-body">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">商品信息:</p>			
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :summary-method="getSummaries" show-summary style="width: 100%;text-align: left;">			    
			    <el-table-column prop="sn" label="商品编号" :formatter="formatSn">
			    </el-table-column>
			    <el-table-column prop="name" label="商品名称" width="200px">
			    </el-table-column>
			    <el-table-column prop="bidCode" label="中标号" >
			    </el-table-column>
			    <el-table-column prop="attribute" label="商品类别" >
			    </el-table-column>
			    <el-table-column prop="className" label="所属分类目录" width="120px">
			    </el-table-column>			    
			    <el-table-column prop="packing" label="规格型号" >
			    </el-table-column>
			    <el-table-column prop="unit" label="计量单位" >
			    </el-table-column>
			    <el-table-column prop="registrationNumber" label="注册证号" width="200px">
			    </el-table-column>
			    <el-table-column prop="factoryName" label="生产厂家" width="150px">
			    </el-table-column>
			    <el-table-column prop="licenseNumber" label="生产企业许可证号"  width="150px">
			    </el-table-column>
			    <el-table-column prop="temperatureOption" label="温度条件(℃)" width="120px" :formatter="formatTem">
			    </el-table-column>
			    <el-table-column prop="humidityOption" label="湿度条件(%)" width="120px" :formatter="formatHum">
			    </el-table-column>
			    <el-table-column prop="expiryDate" label="有效期至" width="100px">
			    </el-table-column>
			    <el-table-column prop="batch" label="产品批次" width="160px">
			    	<!--<template slot-scope="scope">
			    		<el-input v-model="scope.row.productBatch" placeholder="请输入内容"></el-input>
			    	</template>-->
			    </el-table-column>
			    <el-table-column prop="storage" label="库房" width="160px">
			    	<template slot-scope="scope">
					  <el-select v-model="scope.row.storage" placeholder="请选择" @change="selectStorageValue($event, item)" @focus="clickStorage()">
					    <el-option
					      v-for="item in optionsList"
					      :key="item.storeId"
					      :label="item.storeName"
					      :value="item.storeId">
					    </el-option>
					  </el-select>
					</template>
			    </el-table-column>
			    <el-table-column prop="productDate" label="生产日期" width="160px" >			    	
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.productDate" value-format="yyyy-MM-dd" disabled></el-input>
			    		<!--<el-col :span="11">
					        <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.productDate" value-format="yyyy-MM-dd" style="width: 150px;"></el-date-picker>
					    </el-col>-->
			    	</template>	
			    </el-table-column>	
			    <el-table-column prop="price" label="单价" >
			    </el-table-column>	
			    <el-table-column prop="num" label="数量" >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.num" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>	
			    <el-table-column prop="amount" label="金额" >
			    	<template slot-scope="scope">
			    		<span v-model="scope.row.num * scope.row.price" v-text="scope.row.num * scope.row.price"></span>
			    	</template>
			    </el-table-column>			    
			    <el-table-column prop=""  label="操作" fixed="right">
			    	<template slot-scope="scope">
			    		<i class="el-icon-plus" title="添加一行" @click="addOneLine(scope.row)"></i>
			    		<i class="el-icon-minus" style="margin-left: 10px;" @click="deleOneLine(scope.$index,scope.row)" title="删除一行"></i>
			    	</template>
			    </el-table-column>
			  </el-table>
			    <!--<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="nowPage"
			      :page-size="pageSize"
			      layout="prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>-->
			</template>				
		</div>	
		<el-dialog title="审核" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="下一个审批人" :label-width="formLabelWidth">
		      <el-select v-model="form.shenpiPerson" @change="choseShenpiren" placeholder="请选择">
		        <el-option
			      v-for="item in shenpiNameList"
			      :key="item.id"
			      :label="item.name"
			      :value="item.sn">
			    </el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="" v-if="checkList.length != 0">
				  <el-radio-group v-model="form.juese">
				    <el-radio v-for="item in checkList" :label="item.userId" :data-name="item.name">{{ item.name }}</el-radio>
				  </el-radio-group>
		    </el-form-item>
		    <!--<el-form-item label="审核结果" :label-width="formLabelWidth" v-if="status != 0">
		      <el-select v-model="form.shenheResult" @change="choseShenpiResult(form.shenheResult)" placeholder="请选择">
		        <el-option
			      v-for="item in shenpiResultList"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
		      </el-select>
		    </el-form-item>-->
		    <!--<el-form-item label="备注" :label-width="formLabelWidth">
		      <el-input
				  type="textarea"
				  :rows="2"
				  placeholder="请输入内容"
				  style="width: 300px;"
				  v-model="form.textarea">
				</el-input>
		    </el-form-item>-->
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
			reqUrl: this.GLOBAL.uploadUrl,
			imageUrl: '',
			ruleForm: {
				//documentNumber: null,
				outStroeOrder: null,
				unionCaigouOrder: null,
				outStroeOrderList: [],
				supplier: null,
				gysList: [],
				createTime: null,
				storageWarehouse: null,
				cgy_name: null,
				kgy_name: null,
				storageList: []		
			},
			optionsList: [],	
			storageListNum: null,
			storageTableNum: null,
			tableData: [],
			newTableData: [],
			productBatch: null,
			storage: null,
			createTime: null,
			tableTotlePrice: null,
			isSave: true,
			dialogFormVisible: false,
			form: {
	          shenheResult: '',
	          shenpiPerson: '',
	          juese: null
	        },
	        shenpiNameList: [],
	        checkList: [],
	        danjuNumber: '',    //保存成功后返回的单据编号
	        showImgUp: false,
	        isShowImgBut: false,

		}
	},
	methods:{
		showImg(){	
     		this.showImgUp = true
		},
		hideImg(){	
     		this.showImgUp = false
		},
		handleAvatarSuccess(res, file) {					//-----------上传单文件
	        //this.imageUrl = URL.createObjectURL(file.raw);
	        this.imageUrl = res
		  	console.log(this.imageUrl)
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
		cancel(){
    		this.dialogFormVisible = false
    	},
    	confirm(){
    		console.log(JSON.stringify(this.form))
    		console.log(this.form.juese)
    		
    		let this_juese = this.form.juese
    		let this_name = null
    		
    		for(let i = 0; i<this.checkList.length; i++){
		        if(this.checkList[i].userId == this_juese){
		        	this_name = this.checkList[i].name
		        }
		    }
    		
    		console.log(JSON.stringify(this.form.juese+this_name))
    		this.submitData(this.form.juese,this_name)
    	},
		submitData(valId,valName){
			let _this = this

		  	let parm = {
						"auditTask":{
							"auditType": 3,
							"auditSn": this.danjuNumber,
							"taskName": '入库单审核',
							"status": 1,
							"times": 1,
							"createId": this.common.SStorage.getItem("saveUserInfo").userId
						},
						"auditor": valId,
						"auditorName": valName,
						"signId":this.GLOBAL.userid
					}
		  	
			console.log(JSON.stringify(parm))
			let baseparm = this.common.DataToBase64(JSON.stringify(parm))
			this.$axios.get('/wms_web/insertAudit?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
				
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
				  	this.$message({
			          message: nowData.message,
			          type: 'success'
			       })
				  	setTimeout(function(){
				  		_this.$router.push('/yjw_admin/putInStorageList')
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
		formatSn(row, column){		//处理商品编号
			return row.sn.split('*')[0]
		}, 	
		formatTem(row, column){		//处理温度相等情况显示"无要求"
			//console.log(row.temperatureOption)
			let aaa = row.temperatureOption.split('-')[0]
			let bbb = row.temperatureOption.split('-')[1]
			//console.log(aaa+'-->'+bbb)
			if(aaa == bbb){
				return "无要求"
			}else{
				return row.temperatureOption
			}
		}, 	
		formatHum(row, column){		//处理湿度相等情况显示"无要求"
			//console.log(row.humidityOption)
			let aaa = row.humidityOption.split('-')[0]
			let bbb = row.humidityOption.split('-')[1]
			//console.log(aaa+'-->'+bbb)
			if(aaa == bbb){
				return "无要求"
			}else{
				return row.humidityOption
			}
		}, 	
		addOneLine(row){
			console.log(JSON.stringify(row))
			/*row.productBatch = null
			row.createTime = null
			row.storage = null
			row.goodsNum = null*/
			this.tableData.push(JSON.parse(JSON.stringify(row)))   //断开引用    深复制 
		},
		deleOneLine(index, row){
			let _this = this
			console.log(index)
			
			this.imageUrl = ""
			this.outStroeQuaryData()
			console.log(this.imageUrl)
			
			if(this.tableData.length != 1){
				this.tableData.splice(index, 1)
			}else{
				setTimeout(function(){
					_this.$message({
			          message: '已经是最后一项了,不能删除',
			          type: 'warning'
			        })
				},700)				
			}		
		},
		savePageData(){
			let _this = this
			console.log(JSON.stringify(this.tableData))		

			this.newTableData = this.tableData.map(function(currentValue,index){
				//console.log(JSON.stringify(currentValue)+'-->'+index)
				let aaa = currentValue.temperatureOption.split('-')[0]
				let bbb = currentValue.temperatureOption.split('-')[1]
				
				let ccc = currentValue.humidityOption.split('-')[0]
				let ddd = currentValue.humidityOption.split('-')[1]
				
				if(aaa == bbb){
					currentValue.temperatureOption = "无要求"
				}
				if(ccc == ddd){
					currentValue.humidityOption = "无要求"
				}
				
				return {
						"amount": currentValue.amount,
						"bidCode": currentValue.bidCode,
						"className": currentValue.className,
						"attribute": currentValue.attribute,
						"classCode": currentValue.classCode,
						"createName": _this.common.SStorage.getItem("saveUserInfo").name,
						"expiryDate": currentValue.expiryDate,
						"licenseNumber": currentValue.licenseNumber,
						//"manufacturer": currentValue.bidCode,
						"factoryName": currentValue.factoryName,
						"name": currentValue.name,
						"packing": currentValue.packing,
						"price": currentValue.price,
						"registrationNumber": currentValue.registrationNumber,
						"sn": currentValue.sn,
						"temperatureOption": currentValue.temperatureOption,
						"humidityOption": currentValue.humidityOption,
						"unit": currentValue.unit,
						"batch": currentValue.batch,
						"num": currentValue.num,
						"storeroomId": currentValue.storage,
						"productDate": currentValue.productDate.substring(-1,10)
						//"createTime": currentValue.createTime				
				}
			})
			
			let supplierName = ''
			for(let i=0; i<this.ruleForm.gysList.length; i++){
				if(this.ruleForm.gysList[i].id == this.ruleForm.supplier){
					supplierName = this.ruleForm.gysList[i].companyName
				}
			}
			
			let parm = {}
			if(this.isShowImgBut){
				parm = {
					"stockInInfo":{
						"orderId": this.ruleForm.unionCaigouOrder,
						"createTime": this.ruleForm.createTime,
						"supplierName": supplierName,
						"repertoryId": this.ruleForm.storageWarehouse,
						"buyerName": this.ruleForm.cgy_name,
						"inspectorName": this.ruleForm.kgy_name
					},
					"list": this.newTableData,
					"imgFlag": 1,
					"qualityImg": this.imageUrl ? this.imageUrl : '',
					"companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					"price": this.tableTotlePrice,
					"createId": this.common.SStorage.getItem("saveUserInfo").userId,
					"signId": this.GLOBAL.userid	
				} 
			}else{
				parm = {
					"stockInInfo":{
						"orderId": this.ruleForm.unionCaigouOrder,
						"createTime": this.ruleForm.createTime,
						"supplierName": supplierName,
						"repertoryId": this.ruleForm.storageWarehouse,
						"buyerName": this.ruleForm.cgy_name,
						"inspectorName": this.ruleForm.kgy_name
					},
					"list": this.newTableData,
					"imgFlag": 0,
					//"qualityImg": this.imageUrl,
					"companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					"price": this.tableTotlePrice,
					"createId": this.common.SStorage.getItem("saveUserInfo").userId,
					"signId": this.GLOBAL.userid	
				} 
			}			   		

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			this.$axios.get('/wms_web/saveForStockInList?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  		this.danjuNumber = nowData.result
			  		this.isSave = false    //保存成功,解除提交按钮
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
		submit(){
			this.dialogFormVisible = true  
  			let parm = {
		  		"roleType": this.common.SStorage.getItem("saveUserInfo").userType,
		  		"signId": this.GLOBAL.userid
		  	}
  			console.log(parm)
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/wms_web/roleNameList?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.result))
					  	this.shenpiNameList = nowData.result
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
		choseShenpiren(){
			console.log(this.form.shenpiPerson)
			let parm = {
		  		"companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				"roleSn": this.form.shenpiPerson,
		  		"signId": this.GLOBAL.userid
		  	}
  			console.log(parm)
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/wms_web/userNameList?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.result))
					  	this.checkList = nowData.result
				  	}else{
				  		console.log(nowData.message)
				  		this.checkList = []
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
		shenheSubmit(){
			
		},
		onSelectedDrug(event,item){
			this.storageListNum = event
			console.log(this.storageListNum)

			let _this = this
    		let parm = {
				   "repertoryId": this.storageListNum,
			     		"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			this.$axios.get('/wms_web/selectStoreroomByRepertoryId?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.optionsList = nowData.result
			  		console.log(JSON.stringify(_this.optionsList))
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
		selectStorageValue(event,item){
			this.storageTableNum = event
			console.log(this.storageTableNum)			
		},
		clickStorage(){
			if(this.ruleForm.storageWarehouse == null){
				this.$message({
		          message: '请选择存储仓库',
		          type: 'warning'
		        })
			}
		},
		getStorageList(){
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
			  		_this.ruleForm.storageList = nowData.result
			  		console.log(JSON.stringify(_this.ruleForm.storageList))
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
		outStroeQuaryData(vSn){
			let _this = this
    		let parm = {
    			   "orderId": '',
				"stockOutSn": vSn,
				 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				 	  "type": 0,
			     	"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/queryOrder?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.tableData = nowData.result.goodsInfo
			  		_this.ruleForm.cgy_name = nowData.result.billInfo.buyerName
			  		_this.ruleForm.unionCaigouOrder = nowData.result.billInfo.orderId
			  		//_this.ruleForm.supplier = nowData.result.billInfo.sellerCompanyName			  		
			  		console.log(JSON.stringify(_this.tableData))
			  		for(let i=0; i<_this.tableData.length; i++){
			  			if(_this.tableData[i].classCode == '00207'){
			  				_this.isShowImgBut = true
			  			}
			  		}
			  		_this.getStoreroom()
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  	}else{
			  		console.log(nowData.message)
			  		_this.tableData = []
			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })
			  		_this.isShowImgBut = false
			  	}		  			
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			    _this.isShowImgBut = false
			  })
		},
		getStoreroom(){
			
		},
		getSummaries(param){
			//console.log(JSON.stringify(param))								  	
			
	        const { columns, data } = param;
	        const sums = [];
	        columns.forEach((column, index) => {
	          if (index === 15) {
	            sums[index] = '总价';	            
	            return;
	          }
	          const values = data.map(item => Number(item[column.property]));
	          if (!values.every(value => isNaN(value))) {
	            sums[index] = values.reduce((prev, curr) => {
	              const value = Number(curr);
	              if (!isNaN(value)) {
	                return prev + curr;
	              } else {
	                return prev;
	              }
	            }, 0);
	            if(index != 11){
	            	sums[index] += ' 元';
	            }else{
	            	sums[index] += ' 元';
	            }	                       
	          } else {
	            sums[index] = '';
	          }
		        sums[2] = '';
		        sums[4] = '';
	            sums[5] = '';
	            sums[6] = '';
	            sums[11] = '';
	            sums[12] = '';
	            sums[13] = '';
	            sums[14] = '';
	            sums[16] = '';
	            sums[17] = '';
	        })
			//console.log(JSON.stringify(parseInt(sums[12])))   14960
			this.totalPrice = 0
			let totalDemo = this.totalPrice
			for(let i=0; i<param.data.length; i++){
		  		totalDemo += param.data[i].price * param.data[i].num
		  	}
			//this.totalPrice = parseInt(sums[12])   //14960
			this.tableTotlePrice = totalDemo
			console.log(this.tableTotlePrice)			
			//this.totalPrice = totalDemo      //放开js会报错,注释掉不影响保存功能
			sums[18] = totalDemo+' 元'
			
	        return sums;			
		},
		getGysList(){
			let _this = this
    		let parm = {
				   "buyerId": this.common.SStorage.getItem("saveUserInfo").companyId,
			     	"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/user_web/company/selectSellerCompany?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.ruleForm.gysList = nowData.result
			  		
			  		console.log(JSON.stringify(_this.ruleForm.gysList))
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
		gysSeleChange(vid){
			let _this = this
    		let parm = {
				   "buyerCompany": this.common.SStorage.getItem("saveUserInfo").companyName,
				   	  "companyId": vid,
			     		 "signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectStockOutSnForStockIn?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.ruleForm.outStroeOrderList = nowData.result
			  		
			  		console.log(JSON.stringify(_this.ruleForm.outStroeOrderList))
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
		}
	},
	mounted (){
		let today = new Date()
		this.getStorageList()
		this.ruleForm.kgy_name = this.common.SStorage.getItem("saveUserInfo").name
		this.ruleForm.createTime = this.common.fomatDate(today,1)
		
		this.getGysList()    //获取供应商下拉框数据
		//this.outStroeQuaryData()
		
		/*let inputelement=document.getElementById('caigouOrder')
     	inputelement.focus()*/
     	
	}
}	
</script>

<style type="text/css">
.put-in-storage .el-form-item__content{
	text-align: left; width: auto; position: static;
}
.put-in-storage .el-form-item__label{
    width: 122px!important;
}
.put-in-storage .table-head .el-form-item {
    float: left; width: 360px;
}
.put-in-storage .reg-step-icon ul li.now-stap > div,
.put-in-storage .reg-step-icon ul li.now-stap:after{
	background-color: #E6A23C;
}
.put-in-storage .reg-step-icon ul li.now-stap > p{
	color: #E6A23C;
}
.put-in-storage .reg-step-icon ul{
	width: 722px;
}
.put-in-storage .reg-step-icon ul li{
	margin-right: 40px;
}
.put-in-storage .reg-step-icon ul li:last-child{
	margin-right: 0px;
}
.put-in-storage .reg-step-icon ul li:after{
	width: 123px;
}
/*审批弹窗*/
.put-in-storage .el-form-item__content{
	text-align: left;
}
.put-in-storage .el-dialog{
	width: 500px;
}
.put-in-storage .el-dialog__header{
	text-align: left;
}

</style>
<style scoped>
.table-head{
	padding: 10px 0; border-bottom: 1px solid #DCDFE6;	
}
.table-head ul li{
	float: left; margin-right: 20px; margin-bottom: 10px;
}	
.table-body{
	padding: 20px 0; overflow: hidden;
}	
.avatar{
	width: 50px; height: 50px;
}
.showImg{
	width: 600px; height: 700px; position: absolute; left: 260px; top: -67px; z-index: 99; background-color: #fff; border: 1px solid #D9D9D9; overflow: auto;
} 
.showImg > img{
	width: 100%;
} 
</style>