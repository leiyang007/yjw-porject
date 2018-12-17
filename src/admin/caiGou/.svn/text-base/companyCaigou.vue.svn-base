<template>
	<div class="qycg">
		<div class="search-box" style="position: relative;">
			<input class="float-left" type="text" v-model="searchGoods" placeholder="请输入商品名称" /><span class="pointer" @click="searchBtn">搜索</span>
			<el-button type="info" @click="reset" style="position: absolute; left: 430px; top: 0;">重置</el-button>
		</div>
		<div class="search-menu">
			<div class="search-item spfl">
				<span>商品分类:</span>
				<ul class="spfl clear">
					<li v-if="selectGoodsData.length == 0">无数据</li>
					<li v-for="(item,index) in selectGoodsData">
						<span :class="{'active-item':index ==  nowIndex }" @click="toggle(index,item.id,item.classCode)" :data-value="item.classCode">{{ item.name }}</span>
					</li>
				</ul>
			</div>
			<div class="search-item ssflml">
				<span>所属分类目录:</span>
				<ul class="clear">
					<li v-if="selectData2.length == 0">无数据</li>
					<li v-for="(item,index) in selectData2">
						<span :class="{'active-item':index ==  nowIndex2 }" @click="toggle2(index,item.id,item.classCode)" :data-value="item.classCode">{{ item.name }}</span>
					</li>
				</ul>
			</div>
			<div class="search-item">
				<span>销售单位地区:</span>
				<div class="float-left">
				  <el-select v-model="province" placeholder="省" @change="provChange">
				    <el-option
				      v-for="item in provinceList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
				  <el-select v-model="city" placeholder="市" @change="cityChange">
				    <el-option
				      v-for="item in cityList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
				  <el-select v-model="area" placeholder="区" @change="areaChange">
				    <el-option
				      v-for="item in areaList"
				      :key="item.code"
				      :label="item.fullName"
				      :value="item.code">
				    </el-option>
				  </el-select> 
				</div>  
			</div>
			<div class="search-item">
				<span>销售单位:</span>
				  <el-select
				    v-model="xsdwValue"
				    style="float: left;"
				    multiple
				    filterable
				    allow-create
				    default-first-option
				    placeholder="请输入销售单位名称">
				    <el-option
				      v-for="item in xsdwName"
				      :key="item.sellerId"
				      :label="item.sellerName"
				      :value="item.sellerId">
				    </el-option>
				  </el-select>
			</div>			
		</div>
		<div class="syetem-table">
			<div style="text-align: right; padding: 10px;">
				<span class="prompt-info" style="margin-left: 20px; float: left;">(勾选商品前<span class="red-font">必须填上数量</span>)</span>
				<el-button type="warning" @click="batchOrder" :disabled="multipleSelection.length == 0">批量订货</el-button>
			</div>
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;" @selection-change="handleSelectionChange">
			    <el-table-column :selectable='checkboxT' type="selection" width="55"></el-table-column>
			    <el-table-column prop="relationSn" label="客商关系编号" width="120">
			      <template slot-scope="scope">{{ scope.row.relationSn }}</template>
			    </el-table-column>
			    <el-table-column prop="sn" label="商品编号" width="80">
			    </el-table-column>
			    <el-table-column prop="name" label="商品名称" width="120">
			    </el-table-column>
			    <el-table-column prop="attribute" label="商品类别" width="80">
			    </el-table-column>
			    <el-table-column prop="className" label="所属分类目录" width="120">
			    </el-table-column>
			    <el-table-column prop="bidCode" label="中标号" width="80">
			    </el-table-column>
			    <el-table-column prop="packing" label="规格型号" width="120">
			    </el-table-column>
			    <el-table-column prop="unit" label="计量单位" width="80">
			    </el-table-column>
			    <el-table-column prop="factoryName" label="生产厂家" width="120">
			    </el-table-column>
			    <el-table-column prop="sellerName" label="销售单位" width="120">
			    </el-table-column>
			    <el-table-column prop="" label="联系企业" width="120">
			    	<template slot-scope="scope">
				    	<el-popover
						  placement="right"
						  width="100"
						  trigger="click">
						  <ul class="lianxiren">
						  	<li v-for="item in lianxirenList" :data-id="item.userId" @click="chatFor(item.userId,item.name)">{{ item.name }}</li>
						  </ul>
						  <el-button slot="reference" @click="queryLianxiren(scope.row.sellerId)" style="padding-left: 10px; padding-right: 10px;">选择联系人</el-button>
						</el-popover>
					</template>
			    </el-table-column>
			    <el-table-column prop="prices" label="单价" width="120">
			    </el-table-column>
			    <el-table-column prop="goodsNum" label="数量" width="120">
			    	<template slot-scope="scope">			    		
				        <el-input v-model="scope.row.goodsNum" @blur="blurRow(scope.row)" @change="changeRow(scope.row)" type="number" placeholder="" style="width: 70px;"></el-input>				        
				    </template>
			    </el-table-column>	
			    <el-table-column prop="" label="操作" width="120">
			    	<template slot-scope="scope">
			    		<el-button type="warning" @click="handleClick(scope.row)" :disabled="scope.row.goodsNum <= 0 || scope.row.goodsNum == null || scope.row.goodsNum == ''" >订货</el-button>
			    	</template>
			    </el-table-column>
			  </el-table>
			</template>			
		</div>
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="nowPage"
	      :page-size="pageSize"
	      layout="total, prev, pager, next, jumper"
	      :total="totalCount">
	    </el-pagination>		
	</div>
</template>

<script>

  export default {
  	components: {
	   //page
	},
    data() {
      return {
      	nowPage: 1,				//当前页
      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
      	totalCount: 0,			//总条数
      	item_id: null,			//商品分类id
      	selectGoodsData:[],			//商品分类数组
      	selectData2:[],			//所属分类数组
      	searchGoods: '',		//大搜索框值
      	classCode: '',			//所属分类编号
      	classAllType: '',		//用来判别是否全选
      	 nowIndex: 0,			 // 初始化第一个栏块高亮
      	 nowIndex2: 0, 			// 初始化第一个栏块高亮
      	 province: null,		//省编号
      	 city: null,			//市编号
      	 area: '',				//区编号
      	 areaNum:null,			//省\市\区编号
      	 provinceList: [],      //省列表 	 
      	 cityList: [],      	//市列表 
      	 areaList: [],      	 //区列表
      	 addressType: '3',		//省市联动type类型
        xsdwValue: '',			//销售单位值    
		xsdwName: [],			//销售单位下拉框数组        
        tableData: [],			//表格数据
        multipleSelection: [],	//表格多选结果
        oneTableData: {},		//表格当前行数据
        paramData: {},			//请求订货参数
        selectTableData: [],			//多选表格数据组成新数组
        orderAllType: false,		//判断批量提交时是否有数量没有填
        lianxirenList: []
      }
    },
    methods: {
    	checkboxT(row,index){
    		if(row.goodsNum){
    			return 1;
    		}else{
    			return 0;
    		}
    	},
    	blurRow(row){
    		if(row.goodsNum){
    			this.$refs.multipleTable.toggleRowSelection(row,true)
    		}else{
    			this.$refs.multipleTable.toggleRowSelection(row,false)
    		}
    	},
    	changeRow(row){
			if(row.goodsNum <= 0){
				row.goodsNum = null
			}    		
    	},
    	chatFor(id,name){
    		//window.open('../../static/im-old/index.html?userName='+this.user_name+'&userId='+this.user_id+'&type=1','_blank','width=770,height=587,top=200px,left=300px,location=no')
    		window.open(
    			'../../../static/im-old/index.html?otherUserName='+name+'&otherUserId='+id+'&userName='+this.common.SStorage.getItem("saveUserInfo").name+'&userId='+this.common.SStorage.getItem("userId")+'&type=3',
    			'_blank',
    			'width=770,height=587,top=200px,left=300px,location=no'
    		)//type=3代表医院
    	},
    	queryLianxiren(companyId){
    		let _this = this
			let parm =  {
						 "companyId": companyId,
						    "roleSn": '10005',
						    "signId": this.GLOBAL.userid
				    	}

  			console.log(JSON.stringify(parm))
				let baseparm = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/userInfo/selectUserInfoByRoleSn?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
					
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(JSON.stringify(nowData))
			  	this.lianxirenList = nowData.result
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
    	},    	
		reset(){
			this.searchGoods = ''
			this.xsdwValue = []
			this.province = null
			this.city = null
			this.area = null
		},    	
    	batchOrder(){		//批量订货
    		if(this.orderAllType){
    			this.$message({
			          message: '选中商品数量不能为空!',
			          type: 'warning'
			        })
    			console.log('选中商品数量不能为空!')
    			return false   			
    		}
    		this.order(2)
    	},
    	handleClick(row){	//单行订货
    		this.order(1,row)
    	},
    	order(num, row){	//订货公用方法    row->当前行数据
    		let _this = this
    		let this_list = []   		   		
    		
    		if(num == 1){
    			this.oneTableData = row
	    		console.log(JSON.stringify(this.oneTableData))
	    		console.log(this.oneTableData.goodsNum ? true : false)
	    		this_list = [{
		    			"order":{
								  "orderType": "1",
								 "totalPrice": this.oneTableData.goodsNum * this.oneTableData.prices,
								   "createId": this.common.SStorage.getItem("saveUserInfo").userId,
									"buyerId": this.common.SStorage.getItem("saveUserInfo").companyId,
								   "sellerId": this.oneTableData.sellerId,
								"buyerUserId": this.common.SStorage.getItem("saveUserInfo").userId,
							   //"sellerUserId": this.oneTableData.speopleId,
							     "locationId": this.common.SStorage.getItem("saveUserInfo").locationId? this.common.SStorage.getItem("saveUserInfo").locationId : '',
                				    "address": this.common.SStorage.getItem("saveUserInfo").location? this.common.SStorage.getItem("saveUserInfo").location : ''
						},
						"orderInfo":[{
									"bidCode": this.oneTableData.bidCode,
									"goodsSn": this.oneTableData.productSn,
						  		  "goodsName": this.oneTableData.name,
								  "attribute": this.oneTableData.attribute,
								  "classCode": this.oneTableData.classCode,
								  "className": this.oneTableData.className,
									"packing": this.oneTableData.packing,
						 "registrationNumber": this.oneTableData.registrationNumber,
								   "goodsNum": this.oneTableData.goodsNum ? this.oneTableData.goodsNum : null,
								  "goodsUnit": this.oneTableData.unit,
								 "goodsPrice": this.oneTableData.prices,
								 "totalPrice": this.oneTableData.goodsNum * this.oneTableData.prices,
								"factoryName": this.oneTableData.factoryName,
							  "licenseNumber": this.oneTableData.licenseNumber,
							  "temperatureUp": this.oneTableData.temperatureUp,
							"temperatureDown": this.oneTableData.temperatureDown,
								 "humidityUp": this.oneTableData.humidityUp,
							   "humidityDown": this.oneTableData.humidityDown,
								 "expiryDate": this.oneTableData.expiryDate
						}]						
		    	}]
    		}else{
    			for(let j=0; j<this.selectTableData.length; j++){
    				let totle_price = 0
					for(let h=0; h<this.selectTableData[j].orderInfo.length; h++){						
						totle_price += this.selectTableData[j].orderInfo[h].totalPrice
					}	
					this.selectTableData[j].order.totalPrice = totle_price
				}
    			this_list = this.selectTableData
    		}
    		   		
    		this.paramData = {
    			  "list": this_list,
    	   "companyType": this.common.SStorage.getItem("saveUserInfo").userType,
    			"signId": this.GLOBAL.userid
    		}
    		console.log('****-->'+JSON.stringify(this_list))
    		//console.log('当前行是-->'+JSON.stringify(this.paramData))

				let baseParm = this.common.DataToBase64(JSON.stringify(this.paramData))
				console.log('提交的参数是-->'+JSON.stringify(this.paramData))
				
		  	this.$axios.post('/user_web/userOrder/addOrder?data='+baseParm+'&sign='+this.GLOBAL.urlStr(this.paramData))
				  .then((res) => {
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(JSON.stringify(nowData))
				  	if(nowData.code == 0){												
						
						this.$message({
				          message: nowData.message,
				          type: 'success'
				       })  
				       
				       setTimeout(function(){
				       		_this.$router.push('/yjw_admin/cgOrderList')
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
    	selectArrChuli(arr){//debugger		//对于批量订货选取数组处理
    		var length = arr.length;
			var copy = JSON.parse(JSON.stringify(arr));
			for(var a=0; a<length; a++){
				for(var i=length-1;i>=0;i--){
				    if (arr[a] != undefined) {
	                    if (a !== i && arr[a].order.sellerId === copy[i].order.sellerId) {
	                        arr[a].orderInfo.push(copy[i].orderInfo[0])
	                        arr.splice(i,1)
	                    }
	                }
				}
			}			
			return arr;  		
    	},
    	handleSelectionChange(val){	//debugger
    		for(let j=0; j<val.length; j++){
    			
    		}
    		this.multipleSelection = val
    		console.log(JSON.stringify(this.multipleSelection))
    		let selectArr = this.multipleSelection  
    		let seleTableData = []
    		for(let i = 0; i < selectArr.length; i++){
				if(selectArr[i].goodsNum){
					seleTableData[i] = {
			    			"order":{
									  "orderType": "1",
									 "totalPrice": selectArr[i].goodsNum * selectArr[i].prices,
									   "createId": this.common.SStorage.getItem("saveUserInfo").userId,
										"buyerId": this.common.SStorage.getItem("saveUserInfo").companyId,
									   "sellerId": selectArr[i].sellerId,
									"buyerUserId": this.common.SStorage.getItem("saveUserInfo").userId,
								   "sellerUserId": selectArr[i].speopleId
							},
							"orderInfo":[{
										"bidCode": selectArr[i].bidCode,
										"goodsSn": selectArr[i].productSn,
							  		  "goodsName": selectArr[i].name,
									  "attribute": selectArr[i].attribute,
									  "classCode": selectArr[i].classCode,
									  "className": selectArr[i].className,
										"packing": selectArr[i].packing,
							 "registrationNumber": selectArr[i].registrationNumber,
									   "goodsNum": selectArr[i].goodsNum,
									  "goodsUnit": selectArr[i].unit,
									 "goodsPrice": selectArr[i].prices,
									 "totalPrice": selectArr[i].goodsNum * selectArr[i].prices,
									"factoryName": selectArr[i].factoryName,
								  "licenseNumber": selectArr[i].licenseNumber,
								  "temperatureUp": selectArr[i].temperatureUp,
								"temperatureDown": selectArr[i].temperatureDown,
									 "humidityUp": selectArr[i].humidityUp,
								   "humidityDown": selectArr[i].humidityDown,
									 "expiryDate": selectArr[i].expiryDate
							}]	    				
	    			}
				}else{
					this.$message({
				          message: '请填上商品数量!',
				          type: 'warning'
				        })
					return
				}    			
   			
    			if(selectArr[i].goodsNum == null){
    				this.orderAllType = true
    			}else{
    				this.orderAllType = false
    			}
    		}

    		this.selectTableData = this.selectArrChuli(seleTableData)
    		console.log('多选后的新数组:--->'+JSON.stringify(this.selectTableData))
    		
    	},
    	searchBtn(){
    		this.queryList()
    	},
    	queryList(){
    		let _this = this
    		
    		if(this.province != null && this.city == null && this.area == null){
    			this.addressType = '1'
    		}else if(this.province != null && this.city != null && this.area == null){
    			this.addressType = '2'
    		}else if(this.province != null && this.city != null && this.area != null){
    			this.addressType = '3'
    		}else{
    			this.addressType = ''
    		}
    		if(this.province != null && this.city == null && this.area == null){
    			this.areaNum = this.province
    		}else if(this.province != null && this.city != null && this.area == null){
    			this.areaNum = this.city
    		}else{
    			this.areaNum = this.area
    		}
	    	let paramx = {
	    		   "partner": this.xsdwValue,
			          "name": this.searchGoods,
			    "locationId": this.areaNum,
			          "type": this.addressType,
			     "classCode": this.classCode,
			       'pageNum': this.nowPage,  		//当前页
		  		  'pageSize': this.pageSize,		//每页显示多少条条
			     	"signId": this.GLOBAL.userid
	    	}
	    	console.log('参数对象:'+JSON.stringify(paramx))    		
	    	console.log('省:'+this.province)    		
	    	console.log('市:'+this.city)    		
	    	console.log('区:'+this.area)   
	    	
				let parm = paramx
				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.post('/product-web/Relation/selectSellRelation?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				console.log(nowData)
			  	if(nowData.code == 0){		
			  		_this.tableData = nowData.result.list
			  		_this.totalCount = nowData.result.total
			  		console.log(JSON.stringify(_this.tableData))
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
    	handleSizeChange(val){
    		this.pageSize = val
    		console.log(this.pageSize)
    	},
    	handleCurrentChange(val){
    		this.nowPage = val
    		console.log('当前页是:'+this.nowPage)
    		this.queryList()
    	},    	
	    toggleSelection(rows) {
	        if (rows) {
	          rows.forEach(row => {
	            this.$refs.multipleTable.toggleRowSelection(row);
	          });
	        } else {
	          this.$refs.multipleTable.clearSelection();
	        }
	    },
	    toggle(index,item_id,item_classcode){
	    	this.nowIndex = index
	    	this.item_id = item_id	    	
	    	
	    	this.classCode = item_classcode
	    	if(this.classCode == undefined){
	    		this.classCode = ''
	    	}
	    	if(this.classCode == '001'){
	    		this.classAllType = '001'
	    	}else if(this.classCode == '002'){
	    		this.classAllType = '002'
	    	}else{
	    		this.classAllType = ''
	    	}
	    	console.log('一级id:'+this.item_id+'-->code:'+this.classCode)
	    	this.nowIndex2 = 0
	    	
	    	this.querySeleData()
	    },
	    toggle2(index,item_id,item_classcode){
	    	this.nowIndex2 = index
	    	
	    	this.classCode = item_classcode
	    	if(this.classCode == undefined && this.classAllType == '001'){
	    		this.classCode = '001'
	    	}else if(this.classCode == undefined && this.classAllType == '002'){
	    		this.classCode = '002'
	    	}else if(this.classCode == undefined && this.classAllType == ''){
	    		this.classCode = ''
	    	}
	    	console.log('二级id:'+this.item_id+'-->code:'+this.classCode)
	    },
		querySeleData(){
			let _this = this
    		let parm = {
    			"signId": this.GLOBAL.userid
    		}
    		
			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			console.log(parm)

	  	this.$axios.post('/product-web/product/getProductClass?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log('1----->'+JSON.stringify(nowData.result[0].parent))
			  	console.log('2----->'+JSON.stringify(nowData.result[0].inss))
			  	console.log('3----->'+JSON.stringify(nowData.result[0].drug))

			  	if(nowData.code == 0){
			  		
			  		_this.selectGoodsData = nowData.result[0].parent
			  		
			  		if(this.item_id == 1){
			  			_this.selectData2 = nowData.result[0].inss
			  		}else if(this.item_id == 4){
			  			_this.selectData2 = nowData.result[0].drug
			  		}else{
			  			_this.selectData2 = []
			  		}

			  		console.log(JSON.stringify(_this.selectGoodsData))

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
		xsdwOption(){
				let _this = this
				
				if(this.province != null && this.city == null && this.area == null){
	    			this.addressType = '1'
	    		}else if(this.province != null && this.city != null && this.area == null){
	    			this.addressType = '2'
	    		}else if(this.province != null && this.city != null && this.area != null){
	    			this.addressType = '3'
	    		}else{
	    			this.addressType = ''
	    		}
	    	
	    		if(this.province != null && this.city == null && this.area == null){
	    			this.areaNum = this.province
	    		}else if(this.province != null && this.city != null && this.area == null){
	    			this.areaNum = this.city
	    		}else{
	    			this.areaNum = this.area
	    		}
	    		
				let parm = {
			  		    	  "name": '',
					    	  "type": this.addressType,
					    "locationId": this.areaNum,
					        "signId": this.GLOBAL.userid
			  	}
				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
			_this.$axios.post('/product-web/Relation/selectPartner?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
			  .then((res) => {
			  	
			  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
	
			  	if(nowData.code == 0){		
			  		_this.xsdwName = nowData.result
			  		console.log(JSON.stringify(_this.xsdwName))
			  	}else{
			  		console.log(nowData.message)
			  	}		  			
			  })
			  .catch((err) => {
			    console.log(err);
			  })			
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
			
			this.xsdwOption()	//加载销售单位数据
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
				
				this.xsdwOption()	//加载销售单位数据
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
				
				this.xsdwOption()	//加载销售单位数据
		},
		areaChange (data){
			this.area = data
			console.log('地区编号:'+data)
			this.xsdwOption()	//加载销售单位数据
		}
	},
    mounted(){
    	this.querySeleData()	//加载分类选项数据
    	this.prov_city_area()	//加载省市联动数据
    	
    	console.log('classCode:'+this.classCode)   	
		this.searchBtn()	//页面初次加载数据
    }
  }
</script>

<style type="text/css">
.qycg .el-select__tags{
	min-width: 200px;
}
.qycg .el-select__tags > span{
	display: flex;
    position: absolute;
    left: 210px;
}
.qycg .el-input__inner{
	padding: 0 5px;
}

</style>

<style scoped>
/*表格	*/
.syetem-table{
	margin-top: 30px; border: 1px solid #EBEEF5;
}
/*表格end	*/
.search-box{
	width: 409px; height: 40px; margin: 0 auto; background-color: #3a99d6;
}	
.search-box input{
	margin: 5px; width: 309px; height: 30px; padding-left: 5px;
}	
.search-box span{
	display: inline-block; color: #fff; width: 84px; height: 40px; line-height: 40px;
}	
.search-menu{
	border: 1px solid #CFD0D0; margin-top: 20px;
}
.search-item{
	height: 50px; line-height: 50px; border-bottom: 1px dashed #CFD0D0; 
}
.search-item:last-child{
	border-bottom: none;
}
.search-item > span{
	float: left; margin-right: 30px; display: inline-block; width: 150px; text-align: right;
}
.search-item ul li{
	float: left; margin-right: 50px; cursor: pointer;
}	
.search-item ul li > span{
	padding: 5px;
}
.search-item ul li > span.active-item{
	border: 2px solid #008BDA;
}
.lianxiren li:hover{
	background-color: #999999; color: #fff; cursor: pointer;
}
</style>