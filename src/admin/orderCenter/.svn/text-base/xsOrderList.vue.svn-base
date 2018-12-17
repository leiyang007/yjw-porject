<template>
	<div>
		<div class="table-head clear">
			<ul class="clear">
				<li>
					<el-input
					    placeholder="请输出库单编号或采购单位"
					    prefix-icon="el-icon-search"
					    v-model="hzdw_val">
					  </el-input>
				</li>
				<li>
					<el-input
					    placeholder="查询采购（销售）单位"
					    prefix-icon="el-icon-search"
					    v-model="spmc_val">
					  </el-input>
				</li>
				<li>
					<el-select v-model="ddzt_value" placeholder="请选择订单状态">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</li>
				<li>
					<el-button type="primary" @click="checkBut">查询</el-button>
				</li>
				<li>
					<el-button type="info" @click="reset">重置</el-button>
				</li>
			</ul> 
		</div>
		<div class="table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">			    
			    <el-table-column prop="orderId" label="销售订单编号">
			    </el-table-column>
			    <el-table-column prop="goodsSn" label="商品编号">
			    </el-table-column>
			    <el-table-column prop="bidCode" label="中标号">
			    </el-table-column>
			    <el-table-column prop="goodsName" label="商品名称">
			    </el-table-column>
			    <el-table-column prop="goodsPrice" label="商品价格">
			    </el-table-column>
			    <el-table-column prop="goodsNum" label="商品数量">
			    </el-table-column>
			    <el-table-column prop="orderTotalPrice" label="订单总金额">
			    </el-table-column>
			    <el-table-column prop="companyName" label="采购公司">
			    </el-table-column>
			    <el-table-column prop="name" label="采购员">
			    </el-table-column>
			    <el-table-column prop="address" label="配送地址">
			    </el-table-column>
			    <el-table-column prop="status" label="订单状态" :formatter="formatStatus">
			    </el-table-column>
			    <el-table-column prop="" label="操作" width="80">
			    	<template slot-scope="scope">
			    		<router-link :to="{path: '/yjw_admin/xsOrderInfo',query:{
			    						orderId: scope.row.orderId,
			    				orderTotalPrice: scope.row.orderTotalPrice,
			    						 status: scope.row.status,
			    					companyName: scope.row.companyName,
			    						   name: scope.row.name,
			    					 createTime: scope.row.createTime,
			    			   distributionTime: scope.row.distributionTime,	 
			    					 expiryDate: scope.row.expiryDate,
			    					 	 remark: scope.row.remark,
			    					 	buyerId: scope.row.buyerId,
			    					buyerUserId: scope.row.buyerUserId,			    					 	 
			    					   sellerId: scope.row.sellerId,
			    				   sellerUserId: scope.row.sellerUserId,
			    				     locationId: scope.row.locationId,
			    				   		address: scope.row.address,
			    					 inspector1: scope.row.inspector1,
			    					 inspector2: scope.row.inspector2,
			    					 inspector3: scope.row.inspector3,
			    					 	signer1: scope.row.signer1,
			    					 	signer2: scope.row.signer2,
			    					 	signer3: scope.row.signer3,
			    					auditStatus: scope.row.auditStatus
			    			}}">
			    			<i class="el-icon-document"></i>
			    		</router-link>	
			    	</template>
			    </el-table-column>
			  </el-table>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="nowPage"
			      :page-size="pageSize"
			      layout="prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
			</template>				
		</div>
	</div>
	
	
</template>

<script>
	
export default{
	data(){
		return{
			nowPage: 1,				//当前页
      		pageSize: this.GLOBAL.pageSize,			//每页显示条数
      		totalCount: 0,			//总条数		
      		hzdw_val: '',			//出库单编号或采购单位
      		spmc_val: '',			//采购（销售）单位
      	    ddzt_value: '',			//订单状态
	        options: [{
	          value: 0,
	          label: '待提交'
	        }, {
	          value: 1,
	          label: '待内部审核'
	        },{
	          value: 2,
	          label: '待经销商审核'
	        }, {
	          value: 3,
	          label: '待出库'
	        },{
	          value: 4,
	          label: '配送中'
	        }, {
	          value: 5,
	          label: '已签收'
	        }],
	        value: '',
	      tableData: []
		}
	},
	methods:{
		reset(){
			this.hzdw_val = ''
			this.spmc_val = ''
			this.ddzt_value = ''			
		},
		checkBut(){
			this.queryData()
		},
    	handleSizeChange(val){
    		this.pageSize = val
    		console.log(this.pageSize)
    	},
    	handleCurrentChange(val){
    		this.nowPage = val
    		console.log('当前页是:'+this.nowPage)
    		this.queryData()
    	},	
    	formatStatus(row, column){
    		if(row.status == 0){
    			return '待提交'
    		}else if(row.status == 1){
    			return '待内部审核'
    		}else if(row.status == 2){
    			return '待经销商审核'
    		}else if(row.status == 3){
    			return '待出库'
    		}else if(row.status == 4){
    			return '配送中'
    		}else if(row.status == 5){
    			return '已签收'
    		}
    	},    	
		queryData(){
			let _this = this
  			let parm = {
		  		     "orderType": "12",
    					"compId": this.common.SStorage.getItem("saveUserInfo").companyId,
    					"userId": this.common.SStorage.getItem("saveUserInfo").userId,
    					  "name": this.hzdw_val,
    			   "companyName": this.spmc_val,
						"status": this.ddzt_value,
					   "nowPage": this.nowPage,
						 "count": this.pageSize,
						"roleSn": this.common.SStorage.getItem("saveUserInfo").roleSn,
		  				"signId": this.GLOBAL.userid
		  	}
  			console.log(JSON.stringify(parm))
				let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
				this.$axios.get('/user_web/userOrder/selectOrderByLike?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	
				  	if(nowData.code == 0){	
				  		console.log(nowData.result.list)
						
						this.tableData = nowData.result.list
					  	this.totalCount = nowData.result.total
					  	
					  	console.log(JSON.stringify(this.tableData))
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
				  		this.tableData = []
					  	this.totalCount = 0
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
		this.queryData()
	}
}
	
</script>

<style scoped>
.table-head{
	padding: 10px 0; border-bottom: 1px solid #DCDFE6;	
}
.table-head ul li{
	float: left; margin-right: 20px; margin-bottom: 10px;
}	

</style>