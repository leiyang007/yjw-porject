<template>
	<div class="warning">
		<h3 class="blue-font">预警</h3>
		<div style="text-align: left; height: 50px; line-height: 50px; padding-left: 50px;">
			<span style="margin-right: 20px;">待办状态:</span>
			<template>
			    <el-radio-group v-model="daibanRadio" @change="daibanStatus(daibanRadio)">
				    <el-radio :label="0">完成</el-radio>
				    <el-radio :label="1">未完成</el-radio>
				  </el-radio-group>
			</template>
			<el-button type="info" @click="reset" style="margin-left: 30px;">重置</el-button>
		</div>
		<template>
			<el-table 
			  v-loading="loading"
			  element-loading-text="拼命加载中"
			  element-loading-spinner="el-icon-loading"
		      :data="tableData"
		      style="width: 100%; text-align: left;">
		      <el-table-column
		      	width="200px"
		        prop="taskType"
		        label="预警类型" :formatter="formatTaskType">
		      </el-table-column>
		      <el-table-column
		        prop="title"
		        label="预警详情">
		      </el-table-column>
		      <el-table-column
		      	width="200px"
		        prop="createTime"
		        label="发送时间">
		      </el-table-column>	      
		      <el-table-column
		        prop=""
		        label="操作">
		          <template slot-scope="scope">
		          	<el-button type="primary" plain @click="clickHandle(scope.row)" v-show="scope.row.status == '1'">点击处理</el-button>
		          	<h4 v-show="scope.row.status == '0'">已处理</h4>
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
      tableData: [],
      daibanRadio: null
    }
  },
  methods:{
  	reset(){
  		this.daibanRadio = null
  		this.queryData()
  	},
  	formatTaskType(row, column){
  		if(row.taskType == 6){
  			return '本地仓库预警'
  		}else{
  			return '移动仓库预警'
  		}
  	},
  	clickHandle(row){
  		let parm = {
	  		    "id": row.id,
			"status": row.status == '1'? '0' : '1',
			"signId": this.GLOBAL.userid
	  	}
		console.log(parm)
			let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
			this.$axios.post('/user_web/user/updateUserTaskEarlyById?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
				
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
				  	this.$message({
			          message: nowData.message,
			          type: 'success'
			       })	
			       this.queryData()
			       
			  	}else{
			  		console.log(nowData)
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
  	daibanStatus(val){
  		console.log(val)
  		this.queryData(val)
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
  	queryData(val){
  		let _this = this
		let parm = {
	  		"userId": this.common.SStorage.getItem("saveUserInfo").userId,
			"status": val,
			"nowPage": this.nowPage,
    		"pageSize": this.pageSize,			
			"signId": this.GLOBAL.userid
	  	}
		console.log(parm)
			let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
			this.$axios.get('/user_web/user/selectUserTaskEarlyByUserId?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
				
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){	
			  		console.log(JSON.stringify(nowData.result))				  		
				  	
				  	//let resArr = this.common.fomatTableDate(nowData.result)   //日期格式化
				  	this.tableData = nowData.result.list		
				  	this.totalCount = nowData.result.total
				  	this.$message({
			          message: nowData.message,
			          type: 'success'
			        })					  	
				  	this.loading = false
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
			  		console.log(nowData)
			  		this.loading = false
			  		this.tableData = []
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
  	}
  },
  mounted(){
  	this.queryData()
  }
}	
</script>

<style scoped>
.warning h3{
	text-align: left; border-bottom: 1px solid #E4E4E4; padding-bottom: 5px;
}	
</style>