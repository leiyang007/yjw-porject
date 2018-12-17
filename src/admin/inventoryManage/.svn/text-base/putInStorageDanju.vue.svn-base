<template>
	<div class="put-in-storage">
		<div class="content-nav">
			<ul>
				<li>
					<a href="javascript:history.go(-1)">返回上一步</a>
				</li>
				<li><i class="el-icon-arrow-right"></i></li>
				<li class="blue-font">入库单据</li>
			</ul>
			<div class="float-right" v-show="isShowBut == 2">
				<el-button type="warning" @click="savePageData">保存</el-button>
			</div>
		</div>
		<div id="saveStart">
			<div class="clear" style="padding: 20px 0 20px;">
				<div class="">
					<h2>{{ companyName }}入库单</h2>
				</div>
				<!--<div class="float-right" v-show="isShowBut == 2">
					<el-button type="warning" @click="savePageData">保存</el-button>
				</div>-->			
			</div>
			<div class="table-head clear">
				<ul>
					<li>
						<span>供货单位:</span>
						<span class="yellow-font">{{ ghCompanyName }}</span>
					</li>
					<li>
						<span>仓库:</span>
						<span class="yellow-font">{{ cangkuName }}</span>
					</li>
				</ul>
				<ul style="float: right">
					<li>
						<span>单据日期:</span>
						<span class="yellow-font">{{ danjuDate }}</span>
					</li>
					<li>
						<span>单据编号:</span>
						<span class="yellow-font">{{ danjuNumber }}</span>
					</li>
				</ul>
			</div>
			<div class="table-body">
				<p style="text-align: left; color: #494949; margin-bottom: 10px;">商品信息:</p>			
				<template>
				  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :summary-method="getSummaries" show-summary style="width: 100%;text-align: left;">			    
				    <el-table-column prop="sn" label="商品编号" :formatter="formatSn">
				    </el-table-column>
				    <el-table-column prop="name" label="商品名称" width="200px">
				    </el-table-column>
				    <el-table-column prop="packing" label="规格型号" >
				    </el-table-column>
				    <el-table-column prop="unit" label="计量单位" >
				    </el-table-column>
				    <el-table-column prop="temperatureOption" label="温度条件" width="120px">
				    </el-table-column>	
				    <el-table-column prop="humidityOption" label="湿度条件" width="120px">
				    </el-table-column>			    
				    <el-table-column prop="expiryDate" label="有效期(月)" >
				    </el-table-column>
				    <el-table-column prop="batch" label="产品批次" >
				    </el-table-column>
				    <el-table-column prop="productDate" label="生产日期" width="200px">
				    </el-table-column>
				    <el-table-column prop="storeName" label="库房" width="150px">
				    </el-table-column>
				    <el-table-column prop="price" label="单价"  width="150px">
				    </el-table-column>
				    <el-table-column prop="num" label="数量" width="120px">
				    </el-table-column>
				    <el-table-column prop="amount" label="金额(元)" width="120px">
				    </el-table-column>
				  </el-table>
				</template>				
			</div>	
			<p style="text-align: left;">温馨提示：收货后请及时查验，如有问题，及时反馈</p>
			<ul class="foot-ul clear">
				<li>
					<span>库管员:</span>
					<span class="yellow-font">{{ kgyName }}</span>
				</li>
				<li>
					<span>采购员:</span>
					<span class="yellow-font">{{ cgyName }}</span>
				</li>
			</ul>
		</div>
		<!--<div>
			<img :src="imgSrc" alt="" />
		</div>-->
	</div>
</template>

<script>
export default{
	data(){
		return{
			isShowBut: this.$route.query.status,
			companyName: '',
			ghCompanyName: '',
			cangkuName: '',
			danjuDate: '',
			danjuNumber: '',
			kgyName: '',
			cgyName: '',
			//imgSrc: '',
			b64: ''
		}
	},
	methods:{
		formatSn(row, column){		//处理商品编号
			return row.sn.split('*')[0]
		},
		savePageData(){
			let _this = this
			html2canvas(document.getElementById("saveStart"),{useCORS:true}).then(function(canvas) {
                  let imgUrl = _this.convertCanvasToImage(canvas); //截取图片路径,该路径为服务器参数
                  _this.imgSrc = imgUrl
                  $("#saveImage").attr("src",imgUrl);
                  _this.b64 = imgUrl.substring(22);
                  console.log(_this.b64)
                  
                  //保存截图
				let parm = {
							 "stockInSn": _this.$route.query.stockInSn,
							       "img": _this.b64,
	    						"signId": _this.GLOBAL.userid
			  		}
				console.log(JSON.stringify(parm))
				let baseparm = _this.common.DataToBase64(JSON.stringify(parm))
				_this.$axios.get('/wms_web/saveStockInImg?data='+baseparm+'&sign='+_this.GLOBAL.urlStr(parm))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
				  	console.log(nowData)
				  	if(nowData.code == 0){			  		
					  	_this.$message({
				          message: nowData.message,
				          type: 'success'
				      })
				  	}else{
				  		console.log(nowData.message)
				  		_this.$message({
				          message: nowData.message,
				          type: 'warning'
				        })
				  	}			  	
				  })
				  .catch((err) => {
				    console.log(err);
				    _this.$message({
			          message: err,
			          type: 'warning'
			        })
				  }) 
           })						
		},
		convertCanvasToImage(canvas) {
            return canvas.toDataURL("image/png");
        },
		getPageData(){
    		let parm = {
						 "stockInSn": this.$route.query.stockInSn,
    						"signId": this.GLOBAL.userid
		  		}
			console.log(JSON.stringify(parm))
			let baseparm = this.common.DataToBase64(JSON.stringify(parm))
			this.$axios.get('/wms_web/selectForStockIn?data='+baseparm+'&sign='+this.GLOBAL.urlStr(parm))
				
			  .then((res) => {				  	
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	console.log(nowData)
			  	if(nowData.code == 0){
			  		console.log(JSON.stringify(nowData.result))
			  		
			  		this.companyName = nowData.result.company.companyName
			  		this.ghCompanyName = nowData.result.sInInfo.supplierName
			  		this.cangkuName = nowData.result.repertory.name
			  		this.danjuDate = nowData.result.stockIn.createTime.substring(-1,10)
			  		this.danjuNumber = nowData.result.stockIn.stockInSn
			  		this.kgyName = nowData.result.sInInfo.inspectorName
			  		this.cgyName = nowData.result.sInInfo.buyerName
			  		
			  		this.tableData = nowData.result.stockInInfo
			  		
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
		getSummaries(param){								  	
	        const { columns, data } = param;
	        const sums = [];
	        columns.forEach((column, index) => {
	          if (index === 9) {
	            sums[index] = '合计';
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
	            sums[index] += '';
	          } else {
	            sums[index] = '';
	          }
		        sums[6] = '';
	            sums[7] = '';
	            sums[10] = '';
	            //sums[11] = '';
	        });
	
	        return sums;			
		}
	},
	mounted (){
		this.getPageData()
	}
}	
</script>

<style type="text/css">
.put-in-storage .el-form-item__content{
	text-align: left; width: auto;
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
.foot-ul li{
	float: right; margin-right: 50px;
}
</style>