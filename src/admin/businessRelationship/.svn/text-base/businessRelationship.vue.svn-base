<template>
	<div>
		<div style="font-size: 18px;">湖北医界网电子科技有限公司客商关系列表</div>
		<div class="br-table-head clear">
			<div class="float-left">
				<ul class="clear">
					<li>
						<el-input
						    placeholder="请输入合作单位"
						    prefix-icon="el-icon-search"
						    v-model="hzdw_val">
						  </el-input>
					</li>
					<li>
						<el-input
						    placeholder="请输入商品名称"
						    prefix-icon="el-icon-search"
						    v-model="spmc_val">
						  </el-input>
					</li>
					<li>
						<el-button type="primary" @click="checkBut">查询</el-button>
					</li>
				</ul> 
			</div>
			<div class="float-right" style="margin-right: 50px;" v-show="userType != 0">
				<router-link :to="{path:'/yjw_admin/businessRelationshipAdd'}">
					<el-button type="warning">新增</el-button>
				</router-link>				
			</div>
		</div>
		<div class="br-table-body">
			<template>
			  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;text-align: left;">
			    <el-table-column prop="appendix" label="合同附件">
			    	<template slot-scope="scope">
			    		<el-popover
						  placement="right"
						  width="920"
						  trigger="click">
						  <div style="height: 800px; overflow-y: auto;">
						  	<img :src="scope.row.appendix" style="width: 900px;" alt="" />
						  </div>						  
						  <i class="el-icon-document" slot="reference" style="font-size: 20px; color: #3399CC; margin-left: 20px;"></i>
						</el-popover>
			    	</template>
			    </el-table-column>			    		    
			    <el-table-column prop="relationSn" label="客商关系编号">
			    </el-table-column>
			    <el-table-column prop="buyerName" label="采购单位名称">
			    </el-table-column>
			    <el-table-column prop="buyerPeople" label="采购员">
			    </el-table-column>
			    <el-table-column prop="sellerName" label="销售单位名称">
			    </el-table-column>
			    <el-table-column prop="sellerPeople" label="业务员">
			    </el-table-column>
			    <el-table-column prop="sn" label="商品编号">
			    </el-table-column>
			    <el-table-column prop="name" label="商品名称">
			    </el-table-column>
			    <el-table-column prop="bidCode" label="中标号">
			    </el-table-column>
			    <el-table-column prop="prices" label="单价">
			    </el-table-column>
			    <el-table-column prop="createTime" label="创建时间">
			    </el-table-column>
			    <el-table-column label="审批状态">
			      <template slot-scope="scope">
			      	<span class="sptype" :class="{'sptype-gray':scope.row.status===0}" >{{ scope.row.sta }}</span>
			      </template>
			    </el-table-column>				    
			    <el-table-column prop="" label="操作" width="80">
			    	<template slot-scope="scope">
			    		<span v-if="scope.row.status == 0">
				    		<i class="el-icon-delete" @click="deleteBusiness(scope.row.relationSn)"></i>
				    		<router-link :to="{path: '/yjw_admin/businessRelationshipAdd',query:{
				    					sellerName: scope.row.sellerName,
			    						  appendix: scope.row.appendix,
			    						    status: scope.row.status,
			    						 buyerName: scope.row.buyerName,
			    					   buyerPeople: scope.row.buyerPeople,
			    					    relationSn: scope.row.relationSn,
			    					      sellerId: scope.row.sellerId,
			    					  sellerPeople: scope.row.sellerPeople,
			    					     speopleId: scope.row.speopleId,
			    					       buyerSn: scope.row.buyerSn,
			    					       buyerId: scope.row.buyerId,
			    					     bpeopleId: scope.row.bpeopleId
			    			}}">
				    			<i class="el-icon-edit" style="margin-left: 5px;"></i>	
				    		</router-link>
			    		</span>
			    		<router-link :to="{path: '/yjw_admin/businessRelationshipAdd',query:{
			    					    sellerName: scope.row.sellerName,
			    					      appendix: scope.row.appendix,
			    						    status: scope.row.status,
			    						 buyerName: scope.row.buyerName,
			    					   buyerPeople: scope.row.buyerPeople,
			    					    relationSn: scope.row.relationSn,
			    					      sellerId: scope.row.sellerId,
			    					  sellerPeople: scope.row.sellerPeople,
			    					     speopleId: scope.row.speopleId,
			    					       buyerSn: scope.row.buyerSn,
			    					       buyerId: scope.row.buyerId,
			    					     bpeopleId: scope.row.bpeopleId
			    			}}">
							<span class="blue-font" v-if="scope.row.status != 0">
								查看详情
							</span>
						</router-link>	
			    	</template>
			    </el-table-column>			    
			  </el-table>
			  <!--<div style="margin-top: 20px">
			    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
			    <el-button @click="toggleSelection()">取消选择</el-button>
			  </div>-->
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="nowPage"
			      :page-size="pageSize"
			      layout="total, prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
			</template>			
		</div>
	</div>
</template>

<script>
//import page from '../admin-base/page'	
	
export default { 
	components: {
	   //page
	},
   data() {
      return {
      	hzdw_val: '',
      	spmc_val: '',
      	nowPage: 1,
      	pageSize: this.GLOBAL.pageSize,
      	totalCount: 0,	//总条数
        tableData: [],
        userType:this.common.SStorage.getItem("saveUserInfo").userType
      }
    },
    methods:{
		deleteBusiness(val){			
	        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	  			let parmUser = {
			  		"relationSn": val,
			  		"signId": this.GLOBAL.userid
			  	}
	  			console.log(parmUser)
					let baseParmUser = this.common.DataToBase64(JSON.stringify(parmUser))
					this.$axios.post('/product-web/Relation/deleteRelationBySn?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parmUser))
						
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
	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
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
    		this.pageQuery()
    	},
    	checkBut(){
    		this.pageQuery(1)
    	},
    	pageQuery(type){
    		let parm = {		  		
		  		 "partner": this.hzdw_val,
    			    "name": this.spmc_val,
		  		 'pageNum': this.nowPage,  		//当前页
		  		'pageSize': this.pageSize,		//每页显示多少条条
		  		  "signId": this.GLOBAL.userid
		  	}
				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
				let _this = this
		  	this.$axios.post('/product-web/Relation/selectRelation?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	console.log(JSON.stringify(nowData.result))
				  	if(nowData.code == 0){

						let resArr = this.common.fomatTableDate(nowData.result.list)
				  		
				  		_this.tableData = resArr				  		
				  		console.log(JSON.stringify(_this.tableData))
				  		
				  		_this.totalCount = nowData.result.total
    					console.log(_this.totalCount)
    					if(type == 1){
    						this.$message({
					          message: '查询成功!',
					          type: 'success'
					        })
    					}   					
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
    	}
    },
    mounted(){
    	this.pageQuery()
    }
} 	
</script>

<style scoped>
.br-table-head{
	margin: 30px 0 30px;
}
.br-table-head .float-left ul li{
	float: left; margin-right: 20px;
}	
.sptype{
	color: deepskyblue;
}
.sptype-gray{
	color: #606060;
}
</style>