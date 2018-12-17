<template>
	<div class="cg-order-info">
		<div class="content-nav">
			<ul>
				<li>
					<a href="javascript:history.go(-1)">返回上一步</a>
				</li>
				<li><i class="el-icon-arrow-right"></i></li>
				<li class="blue-font">销售订单详情</li>
			</ul>
		</div>
		<div class="reg-step-icon clear">
			<ul class="clear">
				<li :class="{'now-stap': stap1}">
					<div>1</div>
					<p>提交订单</p>
				</li>
				<li :class="{'now-stap': stap2}">
					<div>2</div>
					<p>审核订单</p>
				</li>
				<li :class="{'now-stap': stap3}">
					<div>3</div>
					<p>待出库</p>
				</li>
				<li :class="{'now-stap': stap4}">
					<div>4</div>
					<p>配送中</p>
				</li>
				<li :class="{'now-stap': stap5}">
					<div>5</div>
					<p>已签收</p>
				</li>
			</ul>
		</div>		
		<div class="clear" style="padding: 20px 0 20px;">
			<div class="float-left">
				<h2>销售订单详情</h2>
			</div>
			<!--<div class="float-right" v-show="status == 0">
				<el-button type="warning" @click="savePageData">保存</el-button>
				<el-button type="warning" @click="submit">提交</el-button>
			</div>	
			<div class="float-right" v-show="isShowShenheBut == 1 || status2 == 1">
				<el-button type="warning" @click="shenheSubmit">审核</el-button>
			</div>-->			
		</div>
		<div class="table-head clear">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">单据信息:</p>
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="单据编号" prop="djbh">
			    <el-input v-model="orderId" style="width:150px"  disabled></el-input>
			  </el-form-item>
			  <el-form-item label="供应商" prop="gys">
			    <el-input v-model="companyName" style="width:250px"  disabled></el-input>
			  </el-form-item>
			  <el-form-item label="业务员" prop="ywy">
			    <!--<el-input v-model="name" style="width:150px"></el-input>-->
			      <el-select v-model="ywy_name" :data-seller="sellerUserId" style="width:120px" filterable placeholder="请选择" @change="onSelectedDrug($event, item)" disabled>
				    <el-option
				      v-for="item in buyerUserId"
				      :key="item.userId"
				      :label="item.name"
				      :value="item.userId">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="采购员" prop="cgy">
			    <el-input v-model="cgy_name" style="width:150px"  disabled></el-input>
			  </el-form-item>			  
			  <el-form-item label="单据日期">
			    <el-col :span="11">
			      <el-form-item prop="date">
			        <el-date-picker type="date" placeholder="选择日期" v-model="createTime" style="width: 150px;"  disabled></el-date-picker>
			      </el-form-item>
			    </el-col>
			  </el-form-item>
			  <!--<el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>-->
			</el-form>
		</div>
		<div class="table-body">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">商品信息:</p>			
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :summary-method="getSummaries" show-summary style="width: 100%;text-align: left;">			    
			    <el-table-column prop="index" label="" width="50">
			    </el-table-column>
			    <el-table-column prop="goodsSn" :formatter="formatSn" label="商品编号" >
			    </el-table-column>
			    <el-table-column prop="goodsName" label="商品名称" width="150px" >
			    </el-table-column>
			    <el-table-column prop="className" label="商品分类" >
			    </el-table-column>
			    <el-table-column prop="packing" label="规格型号"   width="80px">
			    </el-table-column>
			    <el-table-column prop="bidCode" label="中标号" >
			    </el-table-column>
			    <el-table-column prop="registrationNumber" label="注册证号" >
			    </el-table-column>
			    <el-table-column prop="factoryName" label="生产厂家" width="200px">
			    </el-table-column>
			    <el-table-column prop="temperatureOption" label="存储温度" >
			    </el-table-column>
			    <el-table-column prop="humidityOption" label="存储湿度" >
			    </el-table-column>
			    <el-table-column prop="goodsUnit" label="计量单位"  width="80px">
			    </el-table-column>
			    <el-table-column prop="goodsPrice" label="单价">
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.goodsPrice" placeholder="" @input="changeGoodsPrice(scope.row.goodsPrice)" :disabled="status != 0" style="width:80px"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="goodsNum" label="数量" >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.goodsNum" placeholder="" @input="changeGoodsNum(scope.row.goodsNum)" :disabled="status != 0" style="width:80px"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="totalPrice" :formatter="formatTotalPrice" label="金额" >
			    </el-table-column>
			    <el-table-column prop=""  label="操作">
			    	<template slot-scope="scope">
			    		<el-button type="warning" @click="deleteOneData(scope.row)" v-show="status == 0">删除</el-button>
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
		<div class="table-body" style="border-bottom: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6;">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">配送信息:</p>			
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="配送地址" prop="psdz">
			      <el-select v-model="province" placeholder="省" style="width:200px" @change="provChange" :disabled="status != 0">
				    <el-option
				      v-for="item in provinceList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
				  <el-select v-model="city" placeholder="市" style="width:200px" @change="cityChange" :disabled="status != 0">
				    <el-option
				      v-for="item in cityList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
				  <el-select v-model="area" placeholder="区" style="width:200px" @change="areaChange" :disabled="status != 0">
				    <el-option
				      v-for="item in areaList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
			  </el-form-item>
			  <el-form-item label="详细地址" prop="xxdz">
			    <el-input v-model="address" placeholder="请输入详细地址" style="width:500px" :disabled="status != 0"></el-input>
			  </el-form-item>
			  <el-form-item label="验货人" prop="yhr" id="yhrId">
			    <!--<el-input v-model="ruleForm.name" style="width:150px"></el-input>-->
			      <el-select
				    v-model="value1"
				    multiple
				    filterable
				    value-key
				    allow-create
				    default-first-option
           			:multiple-limit="3"
				    placeholder="请输入选择标签,最多3条" style="width: 300px;" :disabled="status != 0">
				    <el-option
				      v-for="item in yhrId"
				      :key="item.userId"
				      :label="item.name"
				      :value="item.name">
				    </el-option>
				  </el-select>
				  <span class="red-font">(如下拉无数据请手填!)</span>
			  </el-form-item>
			  <el-form-item label="签收人" prop="qsr" id="qsrId">
			      <el-select
				    v-model="value2"
				    multiple
				    filterable
				    allow-create
				    default-first-option 
           			:multiple-limit="3"
				    placeholder="请输入选择标签,最多3条" style="width: 300px;" :disabled="status != 0">
				    <el-option
				      v-for="item in qsrId"
				      :key="item.userId"
				      :label="item.name"
				      :value="item.name">
				    </el-option>
				  </el-select>
				  <span class="red-font">(如下拉无数据请手填!)</span>
			  </el-form-item>
			  <el-form-item label="配送期限" prop="psqx">
			    <el-input v-model="distributionTime" style="width:80px" :disabled="status != 0"></el-input><span style="margin-left: 10px;">天</span>
			  </el-form-item>
			  <el-form-item label="备注">
			    <el-input
				  type="textarea"
				  :rows="5"
				  style="width:700px"
				  placeholder="请输入内容"
				  v-model="remark"
				   :disabled="status != 0">
				</el-input>
			  </el-form-item>
			</el-form>						
		</div>
		<div class="table-body" v-if="status == 4">
			<p style="text-align: left; color: #494949; margin-bottom: 10px;">物流跟踪:</p>			
			<div style="text-align: left; padding-left: 100px;">
				订单编号: 
				<span style="color: #CC9933;">{{ orderId }}</span>
				<router-link :to="{path: '/yjw_admin/logisticsInfo2',query:{
			    				           orderId: orderId
			    			}}">
					<span>点击查看物流</span>
				</router-link>
			</div>			
		</div>
		<div style="margin-top: 20px;">
			<div class="" v-show="status == 0">
				<el-button type="warning" @click="savePageData">保存</el-button>
				<el-button type="warning" @click="submit">提交</el-button>
			</div>	
			<div class="" v-show="isShowShenheBut == 1 || status2 == 1">
				<el-button type="warning" @click="shenheSubmit">审核</el-button>
			</div>
		</div>
		<!--审核弹窗-->
		<el-dialog title="审核" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="下一个审批人" :label-width="formLabelWidth" v-if="auditStatus != 3" >
		      <el-select v-model="form.shenpiPerson" @change="choseShenpiren" placeholder="请选择">
		        <el-option
			      v-for="item in shenpiNameList"
			      :key="item.id"
			      :label="item.name"
			      :value="item.sn">
			    </el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="" v-show="checkList.length > 0">
				  <el-radio-group v-model="juese">
				    <el-radio v-for="item in checkList" :label="item.userId" :data-name="item.name">{{ item.name }}</el-radio>
				  </el-radio-group>
		    </el-form-item>
		    <el-form-item label="审核结果" :label-width="formLabelWidth">
		      <el-select v-model="form.shenheResult" @change="choseShenpiResult(form.shenheResult)" placeholder="请选择">
		        <el-option
			      v-for="item in shenpiResultList"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="备注" :label-width="formLabelWidth">
		      <el-input
				  type="textarea"
				  :rows="2"
				  placeholder="请输入内容"
				  style="width: 300px;"
				  v-model="form.textarea">
				</el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </div>
		</el-dialog>
		<!--审核弹窗2-->
		<!--<el-dialog title="审核2" :visible.sync="dialogFormVisible2">
		  <el-form :model="form2">
		    <el-form-item label="审核结果" :label-width="formLabelWidth">
		      <el-select v-model="form2.shenheResult" @change="choseShenpiResult(form2.shenheResult)" placeholder="请选择">
		        <el-option
			      v-for="item in shenpiResultList"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="备注" :label-width="formLabelWidth">
		      <el-input
				  type="textarea"
				  :rows="2"
				  placeholder="请输入内容"
				  style="width: 300px;"
				  v-model="form2.textarea">
				</el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel2">取 消</el-button>
		    <el-button type="primary" @click="confirm2">确 定</el-button>
		  </div>
		</el-dialog>-->		
	</div>
	
	
</template>

<script>
	
export default{
	data(){
		return{	
			orderId: this.$route.query.orderId,		//订单编号
			status: null,			//订单状态
			stap1: false,
			stap2: false,
			stap3: false,
			stap4: false,
			stap5: false,
			companyName: '',	//卖家或买家公司名
			ywy_name: '',			//卖家或买家业务员id
			sellerUserId: '',		//经销商时页面进来已选好默认传的id
			buyerUserId: '',	//卖家或买家业务员名(接口获取业务员)
			qsrId: [],			//卖家或买家业务员名(接口获取签收人)
			yhrId: [],			//卖家或买家业务员名(接口获取验货人)
			cgy_name: this.$route.query.name,		//采购员名
			createTime: this.StrToGMT(this.$route.query.createTime),		//创建时间
			distributionTime: this.$route.query.distributionTime,		//配送期限
			address: this.$route.query.address,		//详细地址
			remark: this.$route.query.remark,			//备注
			inspector1: this.$route.query.inspector1? this.$route.query.inspector1 : null,		//验收人1
			inspector2: this.$route.query.inspector2? this.$route.query.inspector2 : null,
			inspector3: this.$route.query.inspector3? this.$route.query.inspector3 : null,
			signer1: this.$route.query.signer1? this.$route.query.signer1 : null,		//签收人1
			signer2: this.$route.query.signer2? this.$route.query.signer2 : null,
			signer3: this.$route.query.signer3? this.$route.query.signer3 : null,
			auditStatus: this.$route.query.auditStatus? this.$route.query.auditStatus : null,			//审核进程状态	
	      	 province: '',		//省编号
	      	 city: '',			//市编号
	      	 area: '',				//区编号	
	      	provinceList: [],      //省列表 	 
	      	 cityList: [],      	//市列表 
	      	 areaList: [],      	 //区列表   
	      	 areaNumber: '',		//地区编号
	      	 isYiliao: false,		//是否是医疗机构
	      	 isJingxiaoshang: false,		//是否是经销商
			locationId: this.$route.query.locationId,
	        ruleForm: {},
		    tableData: [],
		    arrDelet: [],
		    newTableData: [],
		    options5: [{
	          value: 'HTML',
	          label: 'HTML'
	        }, {
	          value: 'CSS',
	          label: 'CSS'
	        }, {
	          value: 'JavaScript',
	          label: 'JavaScript'
	        }],
		    shenpiResultList: [{
	          id: '0',
	          name: '审核通过'
	        }, {
	          id: '1',
	          name: '审核不通过'
	        }],
	        value1: [],  
	        value2: [],
	        dialogFormVisible: false,
	        dialogFormVisible2: false,
	        form: {
	          shenpiPerson: '',
	          shenheResult: '',
	          textarea: ''
	        },
	        /*form2: {
	          shenheResult: '',
	          textarea: ''
	        },*/
	        formLabelWidth: '100px',
	        shenpiNameList: [],
	        checkList: [],
	        juese: null,
	        countPriceArr: [],
	        tableTotlePrice: null,
	        taskId: this.$route.query.taskId,		//待办页传参taskId
	        taskType: this.$route.query.taskType,	//待办页传参taskType
	        cgy_id: null,							//待办页传参  采购员ID
	        isShowShenheBut: false,
	        status2: null
		}
	},
	watch:{
		/*goodsPrice: function (newValue, oldValue) {
	      console.log(oldValue+'--->'+newValue)
	    }*/
	},
	methods:{
		changeGoodsPrice(val){
			console.log(val)
		},
		changeGoodsNum(val){
			console.log(val)
		},
    	confirm(){
    		console.log(JSON.stringify(this.form))
    		console.log(this.juese)
    		
    		let this_juese = this.juese
    		let this_name = null
    		
    		for(let i = 0; i<this.checkList.length; i++){
		        if(this.checkList[i].userId == this_juese){
		        	this_name = this.checkList[i].name
		        }
		    }
    		
    		console.log(JSON.stringify(this.juese+this_name))
    		this.submitData(this.juese,this_name)
    	},
    	cancel(){
    		this.dialogFormVisible = false
    	},
    	cancel2(){
    		this.dialogFormVisible2 = false
    	},	
    	choseShenpiResult(vid){
    		console.log(vid)
    	},
    	deleteOneData(val){	//删除单行数据
    		console.log(JSON.stringify(val))
    		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	      }).then(() => {
	      		if(this.tableData.length == 1){
	      			this.$message({
			            type: 'warning',
			            message: '最少要有一件商品'
			          }); 
	      		}else{
	      			for(let i=0; i<this.tableData.length; i++){
		        		if(this.tableData[i].id == val.id){
		        			this.tableData.splice(i, 1)
		        			this.arrDelet.push(val.id)
		        		}
		        	}
		        	console.log(JSON.stringify(this.tableData))
		        	console.log(JSON.stringify(this.arrDelet))
		        	this.$message({
			            type: 'success',
			            message: '删除成功!'
			          })
	      		}       
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
    		
    	},
		onSelectedDrug(event,item){
			this.sellerUserIdNum = event
			console.log(this.sellerUserIdNum)
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
		shenheSubmit(){
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
		savePageData(){
			console.log(this.value1)
			console.log(this.value2)

			this.newTableData = this.tableData.map(function(currentValue,index){
				console.log(JSON.stringify(currentValue)+'-->'+index)
				return {
						    "id": currentValue.id,
		              "goodsNum": currentValue.goodsNum,
		            "goodsPrice": currentValue.goodsPrice,
		            "totalPrice": currentValue.totalPrice			
				}
			})
			
			let param = {
				"order":{
						 "orderId": this.orderId,
						"updateId": this.common.SStorage.getItem("saveUserInfo").userId,
					  "totalPrice": this.tableTotlePrice,		//订单总金额
					     "buyerId": this.$route.query.buyerId,
					 "buyerUserId": this.$route.query.buyerUserId,
					    "sellerId": this.$route.query.sellerId,
					"sellerUserId": this.$route.query.sellerUserId,
				"distributionTime": this.distributionTime,
						  "remark": this.remark,
					  "locationId": this.areaNumber,
						 "address": this.address,
						 "signer1": this.value2[0] ? this.value2[0] : '',
						 "signer2": this.value2[1] ? this.value2[1] : '',
						 "signer3": this.value2[2] ? this.value2[2] : '',
					  "inspector1": this.value1[0] ? this.value1[0] : '',
					  "inspector2": this.value1[1] ? this.value1[1] : '',
					  "inspector3": this.value1[2] ? this.value1[2] : ''
				},
				"orderInfo":this.newTableData,
				"ids":this.arrDelet,
				"signId": this.GLOBAL.userid
			}
			
			console.log(JSON.stringify(this.newTableData))
			console.log('参数--->'+JSON.stringify(param))
			
			let _this = this	
			let parm = param
			  
			let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
			console.log(JSON.stringify(this.newTableData))
					
				_this.$axios.post('/user_web/userOrder/updateOrder?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	
				  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
					console.log(JSON.stringify(nowData))
				  	if(nowData.code == 0){		
				  		_this.$message({
				          message: nowData.message,
				          type: 'success'
				       })
				  	}else{
				  		_this.$message({
				          message: nowData.message,
				          type: 'warning'
				        })
				  		console.log(nowData.message)
				  	}		  			
				  })
				  .catch((err) => {
				  		_this.$message({
				          message: err,
				          type: 'warning'
				        })
				    console.log(err);
				  })
		},
		submitData(valId,valName){
			let _this = this
	      	let time_check = null
	      	if(this.isYiliao == true){
	      		time_check = 1
	      	}
	      	if(this.isJingxiaoshang == true){
	      		time_check = 2
	      	}
	      	let taskNameData = ''
	      	if(this.common.SStorage.getItem("saveUserInfo").userType == 0){
	      		taskNameData = '医院采购订单审核'
	      	}else if(this.common.SStorage.getItem("saveUserInfo").userType == 1){
	      		taskNameData = '经销商采购订单审核'
	      	}
		  	let parm = {
					"userId": this.common.SStorage.getItem("saveUserInfo").userId,
					"userName": this.common.SStorage.getItem("saveUserInfo").name,
					"auditSn": this.orderId,
					"auditType": 2,
					"auditStatus": this.form.shenheResult,
					"remark": this.form.textarea,
					"auditor": valId,
					"auditorName": valName,
					"signId": this.GLOBAL.userid
				}
			console.log(JSON.stringify(parm))
			let baseparm = this.common.DataToBase64(JSON.stringify(parm))
			this.$axios.get('/wms_web/updateAudit?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
				
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
				  	this.$message({
			          message: nowData.message,
			          type: 'success'
			       })
				  	setTimeout(function(){
				  		_this.$router.push('/yjw_admin/xsOrderList')
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
		formatTotalPrice(row, column, cellValue, index){	//算每行总价
			cellValue = row.goodsNum * row.goodsPrice
			console.log(JSON.stringify(index+'-->'+cellValue))
			
			this.countPriceArr[index] = cellValue
			for(let i=0; i<this.tableData.length; i++){
				this.tableData[i].totalPrice = this.countPriceArr[i]
			}
			
			console.log(JSON.stringify(this.tableData))
			return cellValue			
		},
		formatSn(row, column){		//处理商品编号
			return row.goodsSn.split('*')[0]
		},
		getSummaries(param){
			//console.log(JSON.stringify(param))								  	
			
	        const { columns, data } = param;
	        const sums = [];
	        columns.forEach((column, index) => {
	          if (index === 10) {
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
		        sums[4] = '';
	            sums[5] = '';
	            sums[6] = '';
	            sums[11] = '';
	            sums[12] = '';
	            
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
			sums[13] = totalDemo+' 元'
			
	        return sums;			
		},
		GMTToStr : function(time){   //格林威时间转成字符串
		    let date = new Date(time)
		    let Str=date.getFullYear() + '-' +
		            (date.getMonth() + 1) + '-' +
		            date.getDate() + ' ' +
		            date.getHours() + ':' +
		            date.getMinutes() + ':' +
		            date.getSeconds()
		    return Str
		},
		StrToGMT(time){			//转换成格林威时间
		    let GMT = new Date(time)
		    return GMT
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
			console.log('地区编号:'+data)
			this.areaNumber = data
		},
		getBuyerUserId(company_id,rolesn,model_data){
			let _this = this
  			let parm = {
		  		    "companyId": company_id,  //当前用户公司id
    				   "roleSn": rolesn,
    				   "signId": this.GLOBAL.userid
		  		}
  			console.log(parm)
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/userInfo/selectUserInfoByRoleSn?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log('-------->'+JSON.stringify(nowData))
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					if(model_data == 1){
						_this.buyerUserId = nowData.result
					}else if(model_data == 2){
						_this.qsrId = nowData.result
					}else{
						_this.yhrId = nowData.result
					}
				  	//this.totalCount = nowData.result.total
				  	console.log(JSON.stringify(this.tableData))
			  	}else{
			  		console.log(nowData.message)
			  		/*this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })*/
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
		
		getTableData(){      //加载表格数据			
			console.log(this.companyName)
			console.log(this.ywy_name)
			console.log(this.createTime)
			console.log(this.inspector1)
			console.log(this.signer1)
			console.log(this.orderId)
			
	  			let parm = {
			  		       "orderId": this.$route.query.orderId,
			  				"signId": this.GLOBAL.userid
			  	}
	  			console.log(parm)
					let baseparm = this.common.DataToBase64(JSON.stringify(parm))
					this.$axios.get('/user_web/userOrder/getOrderDescByOrderId?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
						
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.result))
	
					  	this.tableData = nowData.result					  	
					  	
					  	//温湿度相当情况下显示'无要求'
					  	for(let i=0; i<this.tableData.length; i++){
					  		let aaa = this.tableData[i].temperatureOption.split('-')[0]
							let bbb = this.tableData[i].temperatureOption.split('-')[1]
							
							let ccc = this.tableData[i].humidityOption.split('-')[0]
							let ddd = this.tableData[i].humidityOption.split('-')[1]
							
							if(aaa == bbb){
								this.tableData[i].temperatureOption = "无要求"
							}
							if(ccc == ddd){
								this.tableData[i].humidityOption = "无要求"
							}
					  	}
					  	
					  	//this.totalCount = nowData.result.total
					  	console.log(JSON.stringify(this.tableData))
					  	
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
		defaultAddressCheck(locationId){		//编辑时加载已选地区
			let parm = {
		  		       "code": locationId ? locationId : this.locationId,
		  			 "signId": this.GLOBAL.userid
		  	}
			console.log('编辑时加载已选地区参数:------->'+JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/wms_web/selectParentRegion?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
	
				  	this.province = nowData.result.provinceName
				  	this.city = nowData.result.cityName
				  	this.area = nowData.result.areaName
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
		querySellerInfo(ywy_id){		//查询卖家信息和供应商
			let parm = {
		  		     "userId": ywy_id ? ywy_id : this.$route.query.sellerUserId,
		  			 "signId": this.GLOBAL.userid
		  	}
			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/userInfo/getUserInfoByUserId?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					this.ywy_name = nowData.result.name			//赋值业务员
					this.companyName = nowData.result.companyName			//赋值供应商
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
		daibanPageData(){
			let orderType = ''
			if(this.taskType == 0 || this.taskType == 1){
				orderType = '1'
			}else if(this.taskType == 2){
				orderType = '12'
			}
			let parm = {
		  		     "taskId": this.taskId,
		  		  "orderType": orderType,
		  			 "signId": this.GLOBAL.userid
		  	}
			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/userOrder/getOrderDescByTask?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
								
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))
					this.tableData = nowData.result.list
					
					//温湿度相当情况下显示'无要求'
					for(let i=0; i<this.tableData.length; i++){
					  		let aaa = this.tableData[i].temperatureOption.split('-')[0]
							let bbb = this.tableData[i].temperatureOption.split('-')[1]
							
							let ccc = this.tableData[i].humidityOption.split('-')[0]
							let ddd = this.tableData[i].humidityOption.split('-')[1]
							
							if(aaa == bbb){
								this.tableData[i].temperatureOption = "无要求"
							}
							if(ccc == ddd){
								this.tableData[i].humidityOption = "无要求"
							}
					}
					
					this.defaultAddressCheck(nowData.result.userOrderVo.locationId)  //加载回选地区值
					
					this.status = nowData.result.userOrderVo.status    
					this.orderId = nowData.result.userOrderVo.orderId
					//this.companyName = nowData.result.userOrderVo.companyName
					//this.ywy_name = nowData.result.userOrderVo.name
					this.cgy_name = nowData.result.userOrderVo.name
					this.cgy_id = nowData.result.userOrderVo.buyerUserId		//采购员ID
					this.ywy_id = nowData.result.userOrderVo.sellerUserId		//业务员ID
					this.createTime = nowData.result.userOrderVo.createTime
					this.distributionTime = nowData.result.userOrderVo.distributionTime
					this.remark = nowData.result.userOrderVo.remark
					this.address = nowData.result.userOrderVo.address
					this.auditStatus = nowData.result.userOrderVo.auditStatus
					
					this.querySellerInfo(this.ywy_id)	//找业务员
					
					this.signer1 = nowData.result.userOrderVo.signer1
					this.signer2 = nowData.result.userOrderVo.signer2
					this.signer3 = nowData.result.userOrderVo.signer3
					
					this.inspector1 = nowData.result.userOrderVo.inspector1
					this.inspector2 = nowData.result.userOrderVo.inspector2
					this.inspector3 = nowData.result.userOrderVo.inspector3
					
					this.value1 = [`${this.inspector1}`, `${this.inspector2}`, `${this.inspector3}`]
					this.value2 = [`${this.signer1}`, `${this.signer2}`, `${this.signer3}`]
					
					this.status2 = this.$route.query.status
					
					
					this.value1 = this.value1.filter(items=>{	//过滤掉数组中'null'的元素
						if(items == 'null'){
							
						}else{
							return items
						}
					})
					this.value2 = this.value2.filter(items=>{	//过滤掉数组中'null'的元素
						if(items == 'null'){
							
						}else{
							return items
						}
					})	
					console.log(this.status2)
					if(this.status == 0 || this.status == 1 || this.status == 2 || this.status == 3 || this.status == 4 || this.status == 5){
						this.stap1 = true
					}
					if(this.status == 2 || this.status == 3 || this.status == 4 || this.status == 5){
						this.stap2 = true
					}
					if(this.status == 3 || this.status == 4 || this.status == 5){
						this.stap3 = true
					}
					if(this.status == 4 || this.status == 5){
						this.stap4 = true
					}
					if(this.status == 5){
						this.stap5 = true
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
		},
		checkIsShenhe(){
			let parm = {
		  		    "orderId": this.$route.query.orderId,
		  		  "auditType": '2',
		  		  	 "userId": this.common.SStorage.getItem("saveUserInfo").userId,
		  			 "signId": this.GLOBAL.userid
		  	}
			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/userOrder/getTaskStatusByOrderId?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
								
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.result))				
						if(nowData.result == 1){
							this.isShowShenheBut = true
						}else{
							this.isShowShenheBut = false
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
		console.log('判断审批编号'+this.auditStatus)
		
		if(this.common.SStorage.getItem("saveUserInfo").userType == 0){
			this.isYiliao = true
		}else if(this.common.SStorage.getItem("saveUserInfo").userType == 1){
			this.isJingxiaoshang = true
			this.sellerUserId = this.$route.query.sellerUserId
			console.log(this.sellerUserId)
		}
		
		//判断是待办页进入还是列表页进入
		if(this.taskId){
			this.daibanPageData()   //待办页数据查询
			
		}else{		
			this.checkIsShenhe()
			
			this.status = this.$route.query.status
			console.log(this.$route.query.status+'=====>>>>'+this.status)
			if(this.status == 0 || this.status == 1 || this.status == 2 || this.status == 3 || this.status == 4 || this.status == 5){
				this.stap1 = true
			}
			if(this.status == 2 || this.status == 3 || this.status == 4 || this.status == 5){
				this.stap2 = true
			}
			if(this.status == 3 || this.status == 4 || this.status == 5){
				this.stap3 = true
			}
			if(this.status == 4 || this.status == 5){
				this.stap4 = true
			}
			if(this.status == 5){
				this.stap5 = true
			}
			
			this.value1 = [`${this.inspector1}`, `${this.inspector2}`, `${this.inspector3}`]
			this.value2 = [`${this.signer1}`, `${this.signer2}`, `${this.signer3}`]
	
			this.value1 = this.value1.filter(items=>{	//过滤掉数组中'null'的元素
				if(items == 'null'){
					
				}else{
					return items
				}
			})
			this.value2 = this.value2.filter(items=>{	//过滤掉数组中'null'的元素
				if(items == 'null'){
					
				}else{
					return items
				}
			})
			
			console.log(JSON.stringify(this.value1))
			
			console.log(JSON.stringify(this.yhrId))
			console.log(JSON.stringify(this.qsrId))
						
			this.getBuyerUserId(this.$route.query.sellerId,"10013",1)	//查询业务员
			this.getBuyerUserId(this.common.SStorage.getItem("saveUserInfo").companyId,"10009",2)	//查询签收人
			this.getBuyerUserId(this.common.SStorage.getItem("saveUserInfo").companyId,"10011",3)	//查询验货人
			
			if(this.common.SStorage.getItem("saveUserInfo").userType == 0){
				this.sellerUserIdNum = this.sellerUserId
			}else if(this.common.SStorage.getItem("saveUserInfo").userType == 1){
				this.sellerUserIdNum = this.sellerUserId
			}else{
				this.sellerUserIdNum = this.ywy_name
			}
			
			this.prov_city_area()	//加载省市联动数据
							
			if(this.locationId){
				this.defaultAddressCheck()  //加载回选地区值
			}
			this.querySellerInfo()	//找业务员
			this.getTableData()    //加载表格数据
		}
		
		
	}
}
	
</script>

<style type="text/css">
.cg-order-info .el-form-item__content{
	text-align: left; width: auto;
}
.cg-order-info .table-head .el-form-item {
    float: left;
}
.cg-order-info .reg-step-icon ul li.now-stap > div,
.cg-order-info .reg-step-icon ul li.now-stap:after{
	background-color: #E6A23C;
}
.cg-order-info .reg-step-icon ul li.now-stap > p{
	color: #E6A23C;
}
.cg-order-info .reg-step-icon ul{
	width: 722px;
}
.cg-order-info .reg-step-icon ul li{
	margin-right: 20px;
}
.cg-order-info .reg-step-icon ul li:last-child{
	margin-right: 0px;
}
.cg-order-info .reg-step-icon ul li:after{
	width: 123px;
}
/*审批弹窗*/
.cg-order-info .el-form-item__content{
	text-align: left;
}
.cg-order-info .el-dialog{
	width: 500px;
}
.cg-order-info .el-dialog__header{
	text-align: left;
}

</style>
<style scoped>
.cg-order-info{
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