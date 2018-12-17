<template>
	<div class="bus-rel-add">
		<div class="content-nav">
			<ul>
				<li>
					<a href="javascript:history.go(-1)">返回上一步</a>
				</li>
				<li><i class="el-icon-arrow-right"></i></li>
				<li class="blue-font">客商关系新增</li>
			</ul>
		</div>
		<div class="clear" style="padding: 20px 0 20px;">
			<div class="float-left">
				<h2>客商关系</h2>
			</div>
			<div class="float-right" v-show="status == 0 || status == undefined">
				<el-button type="warning" v-show="status == undefined" @click="savePageData">保存</el-button>
				<el-button type="warning" v-show="status == 0" @click="updataPageData">更新</el-button>
				<el-button type="warning" @click="submitData" :disabled="saveDataType == ''">提交</el-button>
			</div>
			<div class="float-right" v-show="status == 1 && compType ==0">
				<el-button type="warning" @click="dialogFormVisible = true">审核</el-button>
			</div>			
		</div>
		<p class="title-line">单据信息:</p>
		<div style="text-align: left; margin: 20px;">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="销售单位名称">
			    <el-input v-model="formInline.xsdwName" :value="formInline.companyId" :disabled="true" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item label="业务员">
			    <el-input v-model="formInline.ywyName" :value="formInline.userId" :disabled="true" placeholder=""></el-input>
			  </el-form-item>
		<!--新增时展示-->
			  <el-form-item label="采购单位编号" v-if="status == undefined">
				  <el-select v-model="formInline.buyerSn" filterable placeholder="请选择" @change="cgdwName" :disabled="status != 0 && status != undefined">
				    <el-option
				      v-for="item in cgdwNumber"
				      :key="item.id"
				      :label="item.sn"
				      :value="item.id">
				    </el-option>
				  </el-select>
			  </el-form-item>
		<!--新增时展示end-->
		<!--非新增时展示-->
			  <el-form-item label="采购单位编号" v-if="status != undefined">
				  <el-select v-model="formInline.buyerSn" filterable placeholder="请选择" @change="cgdwName" :disabled="status != 0 && status != undefined">
				    <el-option
				      v-for="item in cgdwNumber"
				      :key="item.id"
				      :label="item.sn"
				      :value="item.id">
				    </el-option>
				  </el-select>
			  </el-form-item>
		<!--非新增时展示end-->
			  <el-form-item label="采购单位名称">
				  <el-select v-model="formInline.cgdwName" filterable placeholder="请选择" @change="cgdwName" :disabled="status != 0 && status != undefined">
				    <el-option
				      v-for="item in cgdwNumber"
				      :key="item.id"
				      :label="item.companyName"
				      :value="item.id">
				    </el-option>
				  </el-select>
			  </el-form-item>
			  <el-form-item label="采购员">
			    <el-select v-model="formInline.cgyName" placeholder="请选择" @change="cgyName" :disabled="status != 0 && status != undefined">
			    	<el-option
				      v-for="item in cgyArr"
				      :key="item.userId"
				      :label="item.name"
				      :value="item.userId">
				    </el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
		</div>
		<div class="clear">
			<div class="float-right" v-show="status == 0 || status == undefined">
				<el-button type="warning" @click="dialogTableVisible = true">添加</el-button>
				<!--<el-button type="warning" @click="deleteData(deleData)">删除</el-button>-->
			</div>
		</div>
		<p class="title-line">商品信息:<span class="prompt-info" v-show="status == 0 || status == undefined" style="margin-left: 20px;">(选择新增商品<span class="red-font">记得填上单价</span>)</span></p>
		<div>
			<template>
				  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;" @selection-change="handleSelectionChange">
				    <el-table-column type="selection" width="50"></el-table-column>
				    <el-table-column prop="sn" label="商品编号" width="80">
				    </el-table-column>
				    <el-table-column prop="name" label="商品名称"></el-table-column>
				    <el-table-column prop="attribute" label="商品类别">
				    </el-table-column>
				    <el-table-column prop="className" label="所属分类目录">
				    </el-table-column>
				    <el-table-column prop="packing" label="规格型号">
				    </el-table-column>
				    <el-table-column prop="bidCode" label="中标号">
				    </el-table-column>
				    <el-table-column prop="registrationNumber" label="注册证号">
				    </el-table-column>
				    <el-table-column prop="factoryName" label="生产厂家">
				    </el-table-column>
				    <el-table-column prop="humidity" label="温度条件(℃)">
				    </el-table-column>
				    <el-table-column prop="temperature" label="湿度条件(%)">
				    </el-table-column>
				    <el-table-column prop="unit" label="计量单位">
				    </el-table-column>
				    <el-table-column prop="prices" label="单价">
				    	<template slot-scope="scope">			    		
					        <el-input v-model="scope.row.prices"  placeholder="" :disabled="status != 0 && status != undefined" ></el-input>				        
					    </template>
				    </el-table-column>	
				    <el-table-column prop=""  label="操作" v-if="status == 0 || status == undefined">
				    	<template slot-scope="scope">
				    		<el-button type="warning" @click="deleteOneData(scope.row)">删除</el-button>
				    	</template>
				    </el-table-column>
				  </el-table>			    
			</template>
		</div>
		<div style="text-align: left; padding: 30px 0 20px;">
			<span>客商关系合同附件:</span>
		<!--新增和编辑时显示-->
			<div v-show="status == 0 || status == undefined">
				<el-upload 
				  style="margin-left: 150px;"
				  class="avatar-uploader"
				  :action="reqUrl"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :on-error="uploadError"
				  :before-upload="beforeAvatarUpload"
				  :on-change="checkImg">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar" style="">
				  <i style="border: 1px solid #999;" v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span class="blue-font font-13" style="margin-left: 163px;">文件上传 支持jpg、png等</span>
			</div>
		<!--新增和编辑时显示end-->	
		<!--审核中和审核完成显示-->
			<div class="showImageUrl" v-show="status == 1 || status == 2">
				<img :src="showImageUrl" alt="" />
			</div>
		<!--审核中和审核完成显示end-->	
		</div>
	    <!--弹窗-->
	    <el-dialog class="add-goods" title="" :visible.sync="dialogTableVisible">
	    	<div style="text-align: left;">
	    		<el-input v-model="goodsInput" placeholder="请输入商品名称" style="width: 200px;"></el-input>
	    		<el-button type="primary" style="margin-left: 20px;" @click="goodsQuery">查询</el-button>
	    	</div>
	    	
		  <el-table ref="multipleTable" :data="gridData" tooltip-effect="dark" style="width: 100%;text-align: left;" @selection-change="winSelectionChange">
		    <el-table-column type="selection" width="50"></el-table-column>
		    <el-table-column prop="sn" label="商品编号" width="80">
		    </el-table-column>
		    <el-table-column prop="name" label="商品名称"  width="200">		      
		    </el-table-column>
		    <!--<el-table-column prop="code" label="中标号">
		    </el-table-column>-->
		    <el-table-column prop="attribute" label="商品类别">
		    </el-table-column>
		    <el-table-column prop="className" label="所属分类目录">
		    </el-table-column>
		    <el-table-column prop="packing" label="规格型号">
		    </el-table-column>
		    <el-table-column prop="unit" label="计量单位">
		    </el-table-column>
		    <el-table-column prop="registrationNumber" label="注册证号" width="200">
		    </el-table-column>
		    <el-table-column prop="licenseNumber" label="生产企业许可证号" width="200">
		    </el-table-column>
		    <el-table-column prop="expiryDate" label="有效期">
		    </el-table-column>
		    <el-table-column prop="humidity" label="存储温度(℃)">
		    </el-table-column>
		    <el-table-column prop="temperature" label="存储湿度(%)">
		    </el-table-column>			    
		  </el-table>
		  <el-button type="primary" style="position: absolute; right: 17px; bottom: 10px;" @click="winAdd">选中并添加</el-button>
		</el-dialog>
		
		<!--审核弹窗-->
		<el-dialog class="shenhe-box" title="审核" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="审核结果" :label-width="formLabelWidth">
		      <el-select v-model="form.shenheResult" placeholder="请选择">
		        <el-option label="审核通过" value="0"></el-option>
		        <el-option label="审核不通过" value="1"></el-option>
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
	</div>
	
</template>

<script>
	
export default { 
  	computed: {	
	    showImageUrl(){	//客商关系合同图片
	      return this.$route.query.appendix
	    }
	},
   data() {
      return {
      	compType: this.common.SStorage.getItem("saveUserInfo").userType,
      	reqUrl: this.GLOBAL.uploadUrl,
      	isShowLogDialog: false,
      	imageUrl: this.$route.query.appendix,		//上传图片路径
      	formInline: {								//采购信息表单数据
      		xsdwName:'',
      		companyId: '',
      		ywyName:'',
      		userId: '',     		
      		buyerSn: this.$route.query.buyerSn,	//采购单位编号
      		//buyerSn: '111-222',	//采购单位编号
      		cgdwName: this.$route.query.buyerName,	//采购单位名称
      		cgdwId: this.$route.query.buyerId,		//采购单位ID
        	cgyName: this.$route.query.buyerPeople,	 //采购员
        	cgyId: this.$route.query.bpeopleId		//采购员ID
      	},
  		form: {
          shenheResult: '',
          textarea: ''
        },
        formLabelWidth: '90px',
        tableData: [],		//表格数据
        deleData: [],		//选中需要删除的数据
        cgyObj: {},			//采购员数组第一个值
        cgyArr: [],			//采购员下拉数组
        goodsInput: '',
        gridData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        cgdwNumber: [],
        //cgdw_Name: '',   //采购单位名称
        cgdw_Type: '',   //采购单位类型
        //cgy_Name: '',		//采购员名称
        image_address: '',		//上传图片地址
        saveData:{},			//保存需要传的参数
        arrGoods:[],			//存放商品ID和单价
        saveDataType: '',		//点击保存之后保存的返回审核编号(供提交使用)
        submitParam: {},
        status: this.$route.query.status,		//列表页传值状态码
        //buyerName: this.$route.query.buyerName,		//采购单位名称
        //buyerPeople: this.$route.query.buyerPeople,		//采购员
        relationSn: this.$route.query.relationSn,		//客商关系编号
      }
    },
    methods:{
    	confirm(){
    		let _this = this
    		console.log(JSON.stringify(this.form))
    		
    		  	let parm = {
					    "userId": this.common.SStorage.getItem("saveUserInfo").userId,
					  "userName": this.common.SStorage.getItem("saveUserInfo").name,
					   "auditSn": this.relationSn,
					 "auditType": 5,
				   "auditStatus": this.form.shenheResult,
					    "remark": this.form.textarea,
					   "auditor": '',
				   "auditorName": '',
					    "signId": this.GLOBAL.userid
			  		}
  				console.log(parm)
				let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/wms_web/updateAudit?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){	
				  		console.log(JSON.stringify(nowData.result))
				  	
					  	this.$message({
				          message: nowData.message,
				          type: 'success'
				        })					  	
					  	this.dialogFormVisible = false
					  	
					  	setTimeout(function(){
					  		_this.$router.push('/yjw_admin/businessRelationship')
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
    	cancel(){
    		this.dialogFormVisible = false
    	},    	
    	savePageData(){			//新增数据
    		let _this = this
    		this.arrGoods = []
    		this.saveData={
    			"relation":{
			          "sellerName": this.formInline.xsdwName,
			            "sellerId": this.formInline.companyId? this.formInline.companyId : '',
			        "sellerPeople": this.formInline.ywyName,
			           "speopleId": this.formInline.userId? this.formInline.userId : '',
			           "buyerName": this.formInline.cgdwName,
			             "buyerId": this.formInline.cgdwId,
			         "buyerPeople": this.formInline.cgyName,
			           "bpeopleId": this.formInline.cgyId,
			            "appendix": this.image_address
			    },
			    "goods": this.arrGoods,
			    "signId": this.GLOBAL.userid
    		}

    		let arrDele = this.deleData
    		for(let i=0; i<arrDele.length; i++){
    			_this.arrGoods.push({ 
    				'goodsId': arrDele[i].dgoodsId, 
    				'prices': arrDele[i].prices != undefined ? arrDele[i].prices : ''
    			})
    		}
    		//console.log(JSON.stringify(this.formInline))
    		console.log(JSON.stringify(this.saveData))
    		//console.log(JSON.stringify(this.arrGoods))
    		
    		//请求保存接口
    		let parm = this.saveData
    		
			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			console.log(parm)

	  	this.$axios.post('/product-web/Relation/insetRelationNew?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){		
			  		_this.saveDataType = nowData.result
			  		console.log(JSON.stringify(_this.saveDataType))
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  		/*setTimeout(function(){
				  		_this.$router.push('/yjw_admin/businessRelationship')
						window.location.reload()
				  	},700)*/
			  	}else if(nowData.code == 4){
	  		        this.$message({
			          message: '选中商品单价不能为空!',
			          type: 'warning'
			        })
			  	}else{
			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })
			  		console.log(nowData.message)
			  	}		  	

			  })
			  .catch((err) => {
			  	this.$message({
			          message: err,
			          type: 'warning'
			        })
			    console.log(err);
			  })
    	},
    	updataPageData(){		//修改数据	
    		let _this = this
    		this.arrGoods = []
    		this.saveData={
    			"relation":{
			    			  "id": this.tableData[0].id,
			          "relationSn": this.tableData[0].relationSn,
			          "sellerName": this.formInline.xsdwName,
			            "sellerId": this.formInline.companyId,
			        "sellerPeople": this.formInline.ywyName,
			           "speopleId": this.formInline.userId,
			           "buyerName": this.formInline.cgdwName,	//采购单位名称
			             "buyerId": this.formInline.cgdwId,		//采购商id
			         "buyerPeople": this.formInline.cgyName,	//采购员
			           "bpeopleId": this.formInline.cgyId,		//采购员id
			            "appendix": this.imageUrl			//合同附件url
			    },
			    "goods": this.arrGoods,
			    "signId": this.GLOBAL.userid
    		}

    		let arrDele = this.deleData
    		
    		for(let i=0; i<arrDele.length; i++){
    			_this.arrGoods.push({ 
    				    'pid': arrDele[i].pid ? arrDele[i].pid : '',
    				'goodsId': arrDele[i].dgoodsId, 
    				 'prices': arrDele[i].prices != undefined ? arrDele[i].prices : ''
    			})
    		}
    		//console.log(JSON.stringify(this.formInline))
    		console.log(JSON.stringify(this.saveData))
    		//console.log(JSON.stringify(this.arrGoods))
    		
    		//请求保存接口
    		let parm = this.saveData
    		
			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			console.log(parm)

	  	this.$axios.post('/product-web/Relation/updateRelationNew?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){		
			  		_this.saveDataType = nowData.result
			  		console.log(JSON.stringify(_this.saveDataType))
			  		this.$message({
			          message: nowData.message,
			          type: 'success'
			        })
			  		/*setTimeout(function(){
				  		_this.$router.push('/yjw_admin/businessRelationship')
						window.location.reload()
				  	},700)*/
			  	}else if(nowData.code == 4){
	  		        this.$message({
			          message: '选中商品单价不能为空!',
			          type: 'warning'
			        })
			  	}else{
			  		this.$message({
			          message: nowData.message,
			          type: 'warning'
			        })
			  		console.log(nowData.message)
			  	}		  	

			  })
			  .catch((err) => {
			  	this.$message({
			          message: err,
			          type: 'warning'
			        })
			    console.log(err);
			  })
    	},
    	submitData(){
    		let _this = this
    		this.submitParam = {
				"auditTask": {
			        "auditType": 5,
			          "auditSn": this.saveDataType,
			         "taskName": "客商关系审核",
			           "status": 1,
			            "times": 1,
			         "createId": this.formInline.userId
			    	},
			          "auditor": this.formInline.cgyId,
			      "auditorName": this.formInline.cgyName,
			           "signId": this.GLOBAL.userid
				}
    		console.log(JSON.stringify(this.submitParam))
    		
    		let parm = this.submitParam
			console.log(parm)
			let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
			this.$axios.get('/wms_web/insertAudit?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
				
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
				  	this.$message({
			          message: nowData.message,
			          type: 'success'
			       })
				  	setTimeout(function(){
				  		_this.$router.push('/yjw_admin/businessRelationship')
						window.location.reload()
				  	},700)
			  	}else if(nowData.code == 1){
			  		this.$message({
			          message: '请先保存!',
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
	    handleAvatarSuccess(res, file) {
	    	console.log(res)
	    	this.image_address = res
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
    	handleSelectionChange(val){   		
    		console.log(val)
    		this.deleData = val
    		console.log(JSON.stringify(this.deleData))

    	},
    	deleteOneData(val){
    		console.log(JSON.stringify(val))
    		let _this = this
    		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	       }).then(() => {
	        	//删除数据库已保存的数据
	        		if(val.pid){
							let parm = {
						  		   "pid": val.pid,
						  		"signId": this.GLOBAL.userid
						  	}
			  			console.log(parm)
							let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
							this.$axios.post('/product-web/Relation/deleteRelationProduct?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
								
							  .then((res) => {				  	
							  	let nowData = JSON.parse(this.common.base64ToData(res.data))
							  	console.log(nowData)
							  	if(nowData.code == 0){	
							  		console.log(nowData.result)							  		
								  	this.$message({
							            type: 'success',
							            message: '删除成功!'
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
						}else{
							for(let i=0; i<this.tableData.length; i++){
				        		if(this.tableData[i].dgoodsId == val.dgoodsId){
				        			this.tableData.splice(i, 1)
				        		}
				        	}
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
/*    	deleteData(val){
    		console.log(JSON.stringify(val))
    		let _this = this
    		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	//删除数据库已保存的数据
	        	for(let k=0; k<val.length; k++){
	        		if(val[k].pid){
							let parm = {
						  		   "pid": val[k].pid,
						  		"signId": this.GLOBAL.userid
						  	}
			  			console.log(parm)
							let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
							this.$axios.post('/product-web/Relation/deleteRelationProduct?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
								
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
						}
	        	}
	        	//删除添加进来的数据
	        	for(let i=0; i<_this.tableData.length; i++) {	        		
	    			for(let j=0; j<val.length; j++){	    				
    					if(_this.tableData[i].dgoodsId == val[j].dgoodsId && _this.tableData[i].dgoodsId != undefined){  						
							_this.removeByValue(_this.tableData,val[j])
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });   								    					
	    				}	    				
	    			}
				}	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
    		
    		console.log(this.tableData)
    	},*/
    	winSelectionChange(val){
    		this.tempData = val
    		console.log(JSON.stringify(val))
    	},
    	removeByValue(arr, val) {  		//删除数组元素
		  for(var i=0; i<arr.length; i++) {
		    if(arr[i] == val) {
		      arr.splice(i, 1);
		      break;
		    }
		  }
		},
    	winAdd(){
    		//this.tableData = this.tempData
    		this.tableData = this.tableData.concat(this.tempData)
    		this.dialogTableVisible = false
    		console.log(JSON.stringify(this.tableData))
    	},
    	handleSizeChange(val){
    		this.pageSize = val
    	},
    	handleCurrentChange(val){
    		this.currentPage = val
    	},
    	choose () {
	      this.isShowLogDialog = true
	    },
	    closeDialog (attr) {
	      this[attr] = false
	    },
	    goodsQuery(){
	    	//let userid = window.sessionStorage.getItem("userId")
	    	let parm = {
		  		'nameOrsn': this.goodsInput,
		  		"signId": this.GLOBAL.userid
		  	}
				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(baseParm)
				let _this = this
		  	this.$axios.post('/product-web/selectDealerGoodsByQuery?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){		
				  		_this.gridData = nowData.result
				  		console.log(JSON.stringify(_this.gridData))
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
				    console.log(err)
				    this.$message({
			          message: err,
			          type: 'warning'
			        })
				  })
	    },
	    cgdwName(val){
	    	console.log(val)
	    	this.formInline.cgdwId = val
				console.log(JSON.stringify(this.cgdwNumber))
				this.cgdwNumber.find((item)=>{
					if(item.id == val){
						this.formInline.cgdwName = item.companyName
						this.cgdw_Type = item.companyType
					}
				})
		      console.log(this.formInline.cgdwName)
    	//获取采购员
	    	let parm = {
			  		"companyId":val,
    				"roleName":"采购员",
    				"roleType":this.cgdw_Type,
			  		"signId": this.GLOBAL.userid
			  	}
				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
				let _this = this
		  	this.$axios.get('/user_web/role/selectUserByRoleName?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData.result)
				  	if(nowData.code == 0){	
				  		_this.cgyObj = nowData.result[0]
				  		//_this.formInline.cgyName = nowData.result[0].name
				  		_this.cgyArr = nowData.result
				  		
				  		console.log('采购员:'+JSON.stringify(_this.cgyArr))
				  		this.formInline.cgyName = null		//采购员清空
				  	}else{
				  		_this.cgyArr = []		//没有该角色,清空该数组
				  		this.formInline.cgyName = null		//采购员清空
				  		console.log(nowData.message)
				  	}		  	
	
				  })
				  .catch((err) => {
				    console.log(err);
				    this.formInline.cgyName = null		//采购员清空
				  })
			
			this.cgyName()  
	    },
	    cgCompany(){
    		//获取采购单位编号
	    	let parm = {
			  		"type": "0",
			  		"signId": this.GLOBAL.userid
			  	}
				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
				let _this = this
		  	this.$axios.get('/user_web/company/selectCompanyAllByType?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){	
				  		_this.cgdwNumber = nowData.result
				  		console.log(JSON.stringify(_this.cgdwNumber))
				  		//getCaigouyuan()
				  	}else{
				  		console.log(nowData.message)
				  	}		  	
	
				  })
				  .catch((err) => {
				    console.log(err);
				  })	    	
	    },
	    cgyName(val){
	    	this.formInline.cgyId = val
	    	//console.log('当前采购员信息:'+val)
	    	//console.log(JSON.stringify(this.cgyArr))
				this.cgyArr.find((item)=>{
					if(item.userId == val){
						this.formInline.cgyName = item.name
					}
				})
		      console.log(this.formInline.cgyName)
	    },
	    getTableData(){
			let parm = {
		  		 "relationSn": this.$route.query.relationSn,
		  			 "signId": this.GLOBAL.userid
		  	}
			console.log(JSON.stringify(parm))
				let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.post('/product-web/Relation/selectByRelationSn?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){				  		
					this.tableData = nowData.result
					console.log('表格数组:--->'+JSON.stringify(this.tableData))
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
    	if(this.status == undefined){	//新增时
    		this.formInline.xsdwName = this.common.SStorage.getItem("saveUserInfo").companyName
    		this.formInline.ywyName = this.common.SStorage.getItem("saveUserInfo").name
    		this.formInline.companyId = this.common.SStorage.getItem("saveUserInfo").companyId  	
    		this.formInline.userId = this.common.SStorage.getItem("saveUserInfo").userId
    	}else if(this.status != undefined){
    		this.formInline.xsdwName = this.$route.query.sellerName
    		this.formInline.ywyName = this.$route.query.sellerPeople
    		this.formInline.companyId = this.$route.query.sellerId  	
    		this.formInline.userId = this.$route.query.speopleId
    	}
    	    	  	   	
    	/*接收列表页传来参数操作*/
    	console.log(this.formInline.cgdwName)
    	console.log('状态是:----->'+this.$route.query.status)
    	console.log(this.$route.query.relationSn)
    	
		this.cgCompany()   //获取采购单位编号
		if(this.$route.query.status != undefined || this.$route.query.status == 0){
			this.getTableData()
		}
		console.log(this.compType)

    },
    created(){
    	/*let aaa = window.innerWidth-300+'px!important'
    	console.log(aaa)
    	$('.admin-right-nav').css('width',aaa)*/
    	
    }
} 	
</script>

<style scoped>

.title-line	{
	text-align: left; border-bottom: 1px solid #E4E4E4; padding-bottom: 5px;
}
.el-form--inline .el-form-item__label{
	width: 96px;
}
.el-form--inline .el-form-item__content{
	width: 200px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader-icon[data-v-3f31cd07],.avatar[data-v-3f31cd07]{
  	border: 1px dashed #C9C9C9; margin: 20px 0 0 150px; 
  }
  .el-table::before{
  	z-index: 0;
  }
  .el-table--fit{
  	max-height: 450px;
    overflow-y: auto;
  }
.showImageUrl{
	width: 300px; height: 200px; margin-left: 160px;
}
.showImageUrl img{
	width: 100%; 
}
</style>
<style type="text/css">
 .bus-rel-add .el-dialog__body{
  	position: relative!important;
  	padding: 15px 20px 60px!important;
  }
 .bus-rel-add .el-dialog__headerbtn .el-dialog__close{
  	top: -12px;
    position: relative;
  }
.bus-rel-add .el-form-item__content{
	text-align: left;
}
.bus-rel-add .el-dialog__wrapper.shenhe-box .el-dialog{
	width: 500px;
}
.bus-rel-add .el-dialog__header{
	text-align: left;
}
</style>