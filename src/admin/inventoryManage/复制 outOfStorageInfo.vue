<template>
	<div class="put-in-storage">
		<div class="content-nav">
			<ul>
				<li>
					<a href="javascript:history.go(-1)">返回上一步</a>
				</li>
				<li><i class="el-icon-arrow-right"></i></li>
				<li class="blue-font">出库单新增</li>
			</ul>
		</div>
		<div class="clear" style="padding: 20px 0 20px;">
			<div class="float-left">
				<h2>出库单新增</h2>
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
			  <el-form-item label="关联的销售订单" prop="gys">
			    <el-input v-model="ruleForm.unionCaigouOrder" id="caigouOrder" placeholder="请输入订单号查询"  style="width:200px" @blur="caigouOrderQuaryData"></el-input>
			  </el-form-item>
			  <el-form-item label="采购单位" prop="gys">
			    <el-input v-model="ruleForm.supplier" style="width:200px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="单据日期">
			  	<el-input v-model="ruleForm.createTime" style="width:200px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="仓库" prop="ywy">
			      <el-select v-model="ruleForm.storageWarehouse" filterable placeholder="请选择" @change="onSelectedDrug($event, item)" >
				    <el-option
				      v-for="item in ruleForm.storageList"
				      :key="item.repertoryId"
				      :label="item.name"
				      :value="item.repertoryId">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="销售员" prop="cgy">
			    <el-input v-model="ruleForm.xsy_name" style="width:200px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="制单员" prop="cgy">
			    <el-input v-model="ruleForm.zdy_name" style="width:200px" disabled></el-input>
			  </el-form-item>			  			  
			</el-form>
		</div>
		<div class="table-body">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">商品信息:</p>			
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :summary-method="getSummaries" show-summary style="width: 100%;text-align: left;">			    
			    <el-table-column prop="goodsSn" label="商品编号" :formatter="formatSn">
			    </el-table-column>
			    <el-table-column prop="goodsName" label="商品名称" width="200px">
			    </el-table-column>
			    <el-table-column prop="bidCode" label="中标号" >
			    </el-table-column>
			    <el-table-column prop="attribute" label="商品类别" >
			    </el-table-column>
			    <el-table-column prop="className" label="所属分类目录" width="120px">
			    </el-table-column>			    
			    <el-table-column prop="packing" label="规格型号" >
			    </el-table-column>
			    <el-table-column prop="goodsUnit" label="计量单位" >
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
			    <el-table-column prop="expiryDate" label="有效期(月)" width="100px">
			    </el-table-column>
			    <el-table-column prop="productBatch" label="产品批次" width="160px">
			    	<template slot-scope="scope">
			    		<!--<el-input v-model="scope.row.productBatch" placeholder="请输入内容"></el-input>-->
			    		<el-select v-model="scope.row.productBatch" placeholder="请选择" @change="selectProductBatch($event, scope.row)" @focus="clickProductBatch(scope.row.goodsSn)">
						    <el-option
						      v-for="item in productBatchList"
						      :key="item.banch"
						      :label="item.banch"
						      :value="item.banch">
						    </el-option>
						</el-select>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="storage" label="库房" width="160px">
			    	<template slot-scope="scope">
					  <el-select v-model="scope.row.storage" placeholder="请选择" @change="selectStorageValue($event, item)" @focus="clickStorage(scope.row,$event)">
					    <el-option
					      v-for="item in optionsList"
					      :key="item.storeId"
					      :label="item.storeName"
					      :value="item.storeId">
					    </el-option>
					  </el-select>
					</template>
			    </el-table-column>
			    <el-table-column prop="createTime" label="生产日期" width="160px">
			    	<template slot-scope="scope">
			    		<el-col :span="11">
					        <el-date-picker type="date" placeholder="选择日期" disabled v-model="scope.row.createTime" value-format="yyyy-MM-dd" style="width: 150px;"></el-date-picker>
					    </el-col>
			    	</template>	
			    </el-table-column>	
			    <el-table-column prop="goodsPrice" label="单价" >
			    </el-table-column>	
			    <el-table-column prop="goodsNum" label="数量" >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.goodsNum" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>	
			    <el-table-column prop="totalPrice" label="金额" >
			    	<template slot-scope="scope">
			    		<span v-model="scope.row.goodsNum * scope.row.goodsPrice" v-text="scope.row.goodsNum * scope.row.goodsPrice"></span>
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
		<div class="table-head clear">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">配送物流:</p>	
			<el-form :model="ruleForm" ref="ruleForm2" label-width="100px" class="demo-ruleForm" id="ruleForm2">
			  <el-form-item label="配送地址" prop="djbh">
			    <el-input v-model="ruleForm2.address" :title="ruleForm2.address" style="width:220px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="验货人" prop="gys">
			    <el-input v-model="ruleForm2.yhrName" style="width:220px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="签收人">
			  	<el-input v-model="ruleForm2.qsrName" style="width:220px" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="配送车辆" prop="ywy" style="position: relative;">
			  	  <span class="red-font" v-if="departStatus == 1" style="position: absolute; top: -30px;">该车辆已经被选，请协商好慎重选择</span>
			      <el-select v-model="ruleForm2.peisongCar" filterable placeholder="请选择" @change="onSelectedPeisongCar($event, item)" style="width:220px" >
				    <el-option
				      v-for="item in ruleForm2.peisongCarList"
				      :key="item.carId"
				      :label="item.card"
				      :value="item.carId">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="配送司机" prop="ywy" style="position: relative;">
			  	<span class="red-font" v-if="usable == 1" style="position: absolute; top: -30px;">该司机已经被选，请协商好慎重选择</span>
			      <el-select v-model="ruleForm2.peisongDriver" filterable placeholder="请选择" @change="onSelectedPeisongDriver($event, item)" style="width:220px" >
				    <el-option
				      v-for="item in ruleForm2.peisongDriverList"
				      :key="item.driverId"
				      :label="item.name"
				      :value="item.driverId">
				    </el-option>
				  </el-select>
			  </el-form-item>	
			  <el-form-item label="预设湿度(%)" :label-width="formLabelWidth" v-show="isShowCarSelect">
				<el-input v-model="ruleForm2.sdLow" placeholder="" style="width:108px"></el-input>
				<el-input v-model="ruleForm2.sdHigh" placeholder="" style="width:108px"></el-input>
		   	  </el-form-item>
		   	  <el-form-item label="预设温度(℃)" :label-width="formLabelWidth" v-show="isShowCarSelect">
				<el-input v-model="ruleForm2.wdLow" placeholder="" style="width:108px"></el-input>
				<el-input v-model="ruleForm2.wdHigh" placeholder="" style="width:108px"></el-input>
		   	  </el-form-item>
		      <el-form-item label="预警接收人" :label-width="formLabelWidth" v-show="isShowCarSelect">
		        <el-select v-model="ruleForm2.yujingData" multiple placeholder="请选择">
				    <el-option
				      v-for="item in ruleForm2.yujingDataList"
				      :key="item.userId"
				      :label="item.name"
				      :value="item.userId">
				    </el-option>
				</el-select>
		      </el-form-item>	
			</el-form>
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
			ruleForm: {
				//documentNumber: null,
				unionCaigouOrder: null,
				supplier: null,
				createTime: null,
				storageWarehouse: null,
				xsy_name: null,
				zdy_name: null,
				storageList: []		
			},
			ruleForm2: {
				address: null,
				yhrName: null,
				qsrName: null,
				peisongCar: null,
				peisongDriver: null,
				peisongCarList: [],
				peisongDriverList: [],		
				sdLow: null,		
				sdHigh: null,		
				wdLow: null,		
				wdHigh: null,		
				yujingData: [],		
				yujingDataList: [],		
			},
			isShowCarSelect: false,
			formLabelWidth: '94px',
			productBatchList: [],	
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
	        departStatus: null,  //判断车辆是否已选
	        usable: null,		//判断司机是否已选
		}
	},
	methods:{
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
						"auditType": 4,
						"auditSn": this.danjuNumber,
						"taskName": "出库单审核",
						"status": 1,
						"times": 1,
						"createId": this.common.SStorage.getItem("saveUserInfo").userId
					},
					"auditor": valId,
					"auditorName": valName,
					"carId": this.ruleForm2.peisongCar,
					"driverId": this.ruleForm2.peisongDriver,
					"signId": this.GLOBAL.userid
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
				  		_this.$router.push('/yjw_admin/outOfStorageList')
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
			return row.goodsSn.split('*')[0]
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
			console.log(index)
			if(this.tableData.length != 1){
				this.tableData.splice(index, 1)
			}else{
				this.$message({
		          message: '已经是最后一项了,不能删除',
		          type: 'warning'
		        })
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
						"amount": currentValue.totalPrice,
						"bidCode": currentValue.bidCode,
						"className": currentValue.className,
						"attribute": currentValue.attribute,
						"classCode": currentValue.classCode,
						"createName": _this.common.SStorage.getItem("saveUserInfo").name,
						"expiryDate": currentValue.expiryDate,
						"licenseNumber": currentValue.licenseNumber,
						//"manufacturer": currentValue.bidCode,
						"factoryName": currentValue.factoryName,
						"name": currentValue.goodsName,
						"packing": currentValue.packing,
						"price": currentValue.goodsPrice,
						"registrationNumber": currentValue.registrationNumber,
						"sn": currentValue.goodsSn,
						"temperatureOption": currentValue.temperatureOption,
						"humidityOption": currentValue.humidityOption,
						"unit": currentValue.goodsUnit,
						"batch": currentValue.productBatch,
						"num": currentValue.goodsNum,
						"storeroomId": currentValue.storage,
						"productDate": currentValue.createTime.substring(-1,10)
						//"createTime": currentValue.createTime				
				}
			})
    		let parm = {
					"stockOutInfo":{
						"orderId": this.ruleForm.unionCaigouOrder,
						"createTime": this.ruleForm.createTime,
						"createName": this.ruleForm.zdy_name,
						"repertoryId": this.ruleForm.storageWarehouse,
						"buyerCompany": this.ruleForm.supplier,
						"salesperson": this.ruleForm.xsy_name
					},
					"list": this.newTableData,
					"stockOutInfoVo":{
						"address": this.ruleForm2.address,
						"inspector": this.ruleForm2.yhrName,
						"signer": this.ruleForm2.qsrName,
						"driverId": this.ruleForm2.peisongDriver,
						"carId": this.ruleForm2.peisongCar,
						"temperatureDown": this.ruleForm2.wdLow,
						"temperatureUp": this.ruleForm2.wdHigh,
						"humidityUp": this.ruleForm2.sdHigh,
						"humidityDown": this.ruleForm2.sdLow,
						"warningUserId": this.ruleForm2.yujingData.toString(',')
					},
					"companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
					"price": this.tableTotlePrice,
					"userId": this.common.SStorage.getItem("saveUserInfo").userId,
					"signId": this.GLOBAL.userid
				} 

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(JSON.stringify(parm))
					
			this.$axios.get('/wms_web/saveForStockOutList?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
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
		onSeleproductBatch(gsn){
			this.storageListNum = event
			console.log(this.storageListNum)

			let _this = this
    		let parm = {
				     "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				   "repertoryId": this.ruleForm.storageWarehouse,
				   			"sn": gsn,
			     		"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			this.$axios.get('/wms_web/selectBanch?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.productBatchList = nowData.result
			  		console.log(JSON.stringify(_this.productBatchList))
			  	}else{
			  		console.log(nowData.message)
			  		_this.productBatchList = []
			  		_this.optionsList = []
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
		onSelectedDrug(event,item){
			this.storageListNum = event
			console.log(this.storageListNum)
		},
		onSelectedPeisongCar(event,item){
			console.log(event)
			let arrCar = this.ruleForm2.peisongCarList
			for(let i=0; i<arrCar.length; i++){
				if(event == arrCar[i].carId){
					this.departStatus = arrCar[i].departStatus
				}
			}
			console.log(this.departStatus)
			this.isShowCarSelect = true
 			this.warningUserList()    //查询预警接收人
		},
		onSelectedPeisongDriver(event,item){
			console.log(event)
			let arrDriver = this.ruleForm2.peisongDriverList
			for(let i=0; i<arrDriver.length; i++){
				if(event == arrDriver[i].driverId){
					this.usable = arrDriver[i].usable
				}
			}
			console.log(this.usable)
		},
		selectProductBatch(event,row){
			console.log(event)	
			let _this = this
    		let parm = {
				     "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				   "repertoryId": this.ruleForm.storageWarehouse,
				  		    "sn": row.goodsSn,
				  		 "banch": row.productBatch,
			     		"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			this.$axios.get('/wms_web/selectStockBatchByBanch?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {//debugger
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.optionsList = nowData.result.list
			  		
			  		row.createTime = nowData.result.stockBatch.productDate

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
		selectStorageValue(event,item){
			this.storageTableNum = event
			console.log(this.storageTableNum)			
		},
		clickProductBatch(gsn){
			if(this.ruleForm.storageWarehouse == null){
				this.$message({
		          message: '请选择存储仓库',
		          type: 'warning'
		        })
			}else{
				this.onSeleproductBatch(gsn)
			}			
		},
		clickStorage(row,event){
			if(this.ruleForm.storageWarehouse == null){
				this.$message({
		          message: '请选择存储仓库',
		          type: 'warning'
		        })
			}
			if(!row.productBatch){
				//this.optionsList = []
				this.$message({
		          message: '请选择批次!',
		          type: 'warning'
		        })
			}
			console.log(event)
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
		caigouOrderQuaryData(){
			let _this = this
    		let parm = {
				   "orderId": this.ruleForm.unionCaigouOrder,
				 "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				 	  "type": 1,
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
			  		_this.ruleForm.xsy_name = nowData.result.billInfo.sellerName
			  		_this.ruleForm.supplier = nowData.result.billInfo.buyerCompanyName	
			  		
			  		for(let i=0; i<this.tableData.length; i++){    //赋值完createTime制空
			     		this.tableData[i].createTime = '' 
			     	}
			  		
			  		let yhr_name = null
			  		let qsr_name = null
			  		if(nowData.result.logistics.inspector1){
			  			yhr_name = nowData.result.logistics.inspector1
			  			if(nowData.result.logistics.inspector1 && nowData.result.logistics.inspector2){
			  				yhr_name = nowData.result.logistics.inspector1 +'/'+ nowData.result.logistics.inspector2
			  				if(nowData.result.logistics.inspector1 && nowData.result.logistics.inspector2 && nowData.result.logistics.inspector3){
			  					yhr_name = nowData.result.logistics.inspector1 +'/'+ nowData.result.logistics.inspector2 +'/'+ nowData.result.logistics.inspector3
			  				}
			  			}
			  		}
			  		
			  		if(nowData.result.logistics.signer1){
			  			qsr_name = nowData.result.logistics.signer1
			  			if(nowData.result.logistics.signer1 && nowData.result.logistics.signer2){
			  				qsr_name = nowData.result.logistics.signer1 +'/'+ nowData.result.logistics.signer2
			  				if(nowData.result.logistics.signer1 && nowData.result.logistics.signer2 && nowData.result.logistics.signer3){
			  					qsr_name = nowData.result.logistics.signer1 +'/'+ nowData.result.logistics.signer2 +'/'+ nowData.result.logistics.signer3
			  				}
			  			}
			  		}
			  		
			  		_this.ruleForm2.address = nowData.result.logistics.address
			  		_this.ruleForm2.yhrName = yhr_name
			  		_this.ruleForm2.qsrName = qsr_name
			  		
			  		console.log(JSON.stringify(_this.tableData))
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
	            sums[5] = '';
	            sums[9] = '';
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
		  		totalDemo += param.data[i].goodsPrice * param.data[i].goodsNum
		  	}
			//this.totalPrice = parseInt(sums[12])   //14960
			this.tableTotlePrice = totalDemo
			console.log(this.tableTotlePrice)			
			//this.totalPrice = totalDemo      //放开js会报错,注释掉不影响保存功能
			sums[18] = totalDemo+' 元'
			
	        return sums;			
		},
		getCarList(){
			let _this = this
    		let parm = {
				   "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				 	  "usable": 0,
			     	  "signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectAllCar?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.ruleForm2.peisongCarList = nowData.result
			  	}else{
			  		console.log(nowData.message)
			  		_this.tableData = []
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
		getDriverList(){
			let _this = this
    		let parm = {
				   "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
				 	  "status": 1,
			     	  "signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/selectAllDriver?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.ruleForm2.peisongDriverList = nowData.result
			  	}else{
			  		console.log(nowData.message)
			  		_this.tableData = []
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
 		warningUserList(){
 			let _this = this
    		let parm = {
				  "companyId": this.common.SStorage.getItem("saveUserInfo").companyId,
			     	"signId": this.GLOBAL.userid			     	
	    	}  

				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.get('/wms_web/warningUserList?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(JSON.stringify(nowData))
			  	if(nowData.code == 0){		
			  		_this.ruleForm2.yujingDataList = nowData.result
			  		console.log(JSON.stringify(_this.options))
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
		this.ruleForm.zdy_name = this.common.SStorage.getItem("saveUserInfo").name
		this.ruleForm.createTime = this.common.fomatDate(today,1)
		
		this.getCarList()    	//查询配送车辆
		this.getDriverList()    //查询配送员
		
		let inputelement=document.getElementById('caigouOrder')
     	inputelement.focus()
     	
	}
}	
</script>

<style type="text/css">
.put-in-storage .el-form-item__content{
	text-align: left; width: auto;
}
.put-in-storage .el-form-item__label{
    width: 120px!important;
}
#ruleForm2 .el-input.el-input--suffix{
	width: 220px;
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
</style>