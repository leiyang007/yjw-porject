<template>
	<div>
		<h3 class="blue-font">待办</h3>
		<template>
			<el-table 
			  v-loading="loading"
			  element-loading-text="拼命加载中"
			  element-loading-spinner="el-icon-loading"			
		      :data="tableData"
		      style="width: 100%; text-align: left;">
		      <el-table-column
		        prop="taskType"
		        label="待办类型" :formatter="formatTaskType">
		      </el-table-column>
		      <el-table-column
		      	width="400px"
		        prop="title"
		        label="待办事务">
		      </el-table-column>
		      <el-table-column
		        prop="status"
		        label="状态" :formatter="formatStatus">
		      </el-table-column>
		      <el-table-column
		        prop="remark"
		        label="备注">
		      </el-table-column>
		      <el-table-column
		        prop="createTime"
		        label="时间">
		      </el-table-column>		      
		      <el-table-column
		        prop=""
		        label="操作">
		          <template slot-scope="scope">
		          	<router-link :to="{path: '/yjw_admin/cgOrderInfo',query:{
			    						taskId: scope.row.taskId,
			    					  taskType: scope.row.taskType,
			    					    status: scope.row.status
			    			}}" v-if="scope.row.taskType == 0 || scope.row.taskType == 1">	
			        	<span class="blue-font pointer">点击立即处理>></span>
			        </router-link>
		          	<router-link :to="{path: '/yjw_admin/xsOrderInfo',query:{
			    						taskId: scope.row.taskId,
			    					  taskType: scope.row.taskType,
			    					    status: scope.row.status
			    			}}" v-if="scope.row.taskType == 2">	
			        	<span class="blue-font pointer">点击立即处理>></span>
			        </router-link>
		          	<router-link :to="{path: '/yjw_admin/putInStorageUpdate',query:{
	          							taskId: scope.row.taskId,
		    					 pageParameter: '待办',
			    			}}" v-if="scope.row.taskType == 3">	
			        	<span class="blue-font pointer">点击立即处理>></span>
			        </router-link>
		          	<router-link :to="{path: '/yjw_admin/outOfStorageUpdate',query:{
	          							taskId: scope.row.taskId,
		    					 pageParameter: '待办',
			    			}}" v-if="scope.row.taskType == 4">	
			        	<span class="blue-font pointer">点击立即处理>></span>
			        </router-link>
		          	<router-link :to="{path: '/yjw_admin/businessRelationshipDaiban',query:{
	          							taskId: scope.row.taskId		    					 
			    			}}" v-if="scope.row.taskType == 5">	
			        	<span class="blue-font pointer">点击立即处理>></span>
			        </router-link>
			      </template>    
		     </el-table-column>
		    </el-table>
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
</template>

<script>
export default {
  data() {
    return {
      loading: true,  
	  nowPage: 1,				//当前页
	  pageSize: this.GLOBAL.pageSize,			//每页显示条数
	  totalCount: 0,			//总条数      
      tableData: []
    }
  },
  methods:{
	handleSizeChange(val){
		this.pageSize = val
		console.log(this.pageSize)
	},
	handleCurrentChange(val){
		this.nowPage = val
		console.log('当前页是:'+this.nowPage)
		this.queryData()
	},	  	
  	queryData(){
  		let _this = this
		let parm = {
	  		"userId": this.common.SStorage.getItem("userId"),
			"status": null,
			"nowPage": this.nowPage,
    		"pageSize": this.pageSize,
			"signId": this.common.SStorage.getItem("userId")
	  	}
		console.log(JSON.stringify(parm))
		let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
		this.$axios.get('/user_web/user/selectUserTaskByUserId?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
			
		  .then((res) => {				  	
		  	let nowData = JSON.parse(this.common.base64ToData(res.data))
		  	console.log(nowData)
		  	if(nowData.code == 0){	
		  		console.log(JSON.stringify(nowData.result))				  		
			  	
			  	//let resArr = this.common.fomatTableDate(nowData.result.list)   //日期格式化
			  	this.tableData = nowData.result.list
			  	this.totalCount = nowData.result.total
			  	this.$message({
		          message: nowData.message,
		          type: 'success'
		        })					  	
			  	this.loading = false
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
		  		this.loading = false
		  		console.log(nowData.message)
		  		this.totalCount = 0
		  		this.$message({
		          message: nowData.message,
		          type: 'warning'
		        })
		  	}
		  	
		  })
		  .catch((err) => {
		  	this.loading = false
		    console.log(err);
		    this.$message({
	          message: err,
	          type: 'warning'
	        })
		  })   		
  	},
  	formatTaskType(row, column){
  		if(row.taskType == 0){
  			return '[医院采购订单]'
  		}else if(row.taskType == 1){
  			return '[经销商采购订单]'
  		}else if(row.taskType == 2){
  			return '[销售订单]'
  		}else if(row.taskType == 3){
  			return '[入库单]'
  		}else if(row.taskType == 4){
  			return '[出库单]'
  		}else{
  			return '[客商关系]'
  		} 		 
  	},
  	formatStatus(row, column){
  		if(row.status == 0){
  			return '完成'
  		}else if(row.status == 2){
  			return '已驳回'
  		}else{
  			return '未完成'
  		}
  	}
  },
  mounted(){
  	this.queryData()
  }
}	
</script>

<style scoped>
h3{
	text-align: left; border-bottom: 1px solid #E4E4E4; padding-bottom: 5px;
}	
</style>