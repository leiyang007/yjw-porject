<template>
	<div class="admin-system clear">
		<div class="admin-header">
			<div class="header1">
				医疗用品冷链集成系统
				<router-link :to="{path: '/'}">
					<img src="../assets/images/admin/admin-logo.png" @click="returnBack">
				</router-link>
			</div>
			<div class="header2">
				<router-link :to="{path: '/'}">
					<div class="float-left logo-admin" @click="returnBack">				
						<i class="layui-icon layui-icon-home" style="font-size: 23px;"></i>
						首页					
					</div>
				</router-link>
				<div class="float-left" style="height: 100%; color: #a2a3a3;">{{ companyName }}</div>
				<div class="header-right-list float-right">
					<ul>
						<li>
							<!--<i class="layui-icon layui-icon-username" style="font-size: 23px; margin-right: 10px;"></i>{{ username }}-->
							<el-dropdown>
							  <span class="el-dropdown-link">							  	
							  	<i class="layui-icon layui-icon-username" style="font-size: 23px; margin-right: 10px;"></i>
							    <span class="blue-font">{{ username }}</span>({{ roleName }})
							    <i class="el-icon-arrow-down el-icon--right"></i>
							  </span>
							  <el-dropdown-menu slot="dropdown">
							  	<router-link :to="{path: '/yjw_admin/personInfo'}">
							    	<el-dropdown-item>个人信息</el-dropdown-item>
							    </router-link>
							    <router-link :to="{path: '/yjw_admin/daiBan'}">
							    	<el-dropdown-item>待办</el-dropdown-item>
							    </router-link>
							    <router-link :to="{path: '/yjw_admin/warning'}">
							    	<el-dropdown-item>预警</el-dropdown-item>
							     </router-link>
							  </el-dropdown-menu>
							</el-dropdown>
						</li>
						<li>
							<i class="layui-icon layui-icon-notice" style="font-size: 23px;"></i>
						</li>
						<li>
							<i class="el-icon-message" style="font-size: 23px; margin-top: 6px;"></i>
						</li>
						<li>
							<router-link :to="{path: '/'}">
							<span @click="returnBack">返回官网</span>
							</router-link>
						</li>
						<li>
							<a href="javascript:void(0)">
								<span @click="logout">注销</span>
							</a>
						</li>
						<li>
							<a href="javascript:history.go(-1)">
								<i class="layui-icon layui-icon-return" style="font-size: 23px;" title="返回上一页"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="admin-left-nav float-left" :height=leftBoxHeight style="overflow-y: auto;">
			<el-row class="tac">			  
			  <el-col :span="12">
			    <el-menu :default-active="indexMenu" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
			    	@open="handleOpen" 
			    	@close="handleClose">
			    <router-link :to="{path: '/yjw_admin/companyCaigou'}" v-if="caigouType == 0">	
			      <el-menu-item index="companyCaigou">			      	
				        <i class="el-icon-menu"></i>
				        <span slot="title">企业采购(医院)</span>			        
			      </el-menu-item>
			    </router-link> 
			    <router-link :to="{path: '/yjw_admin/distributorCaigou'}" v-if="caigouType == 1">	
			      <el-menu-item index="distributorCaigou">			      	
				        <i class="el-icon-menu"></i>
				        <span slot="title">企业采购(经销商)</span>			        
			      </el-menu-item>
			    </router-link> 
			    <router-link :to="{path: '/yjw_admin/businessRelationship'}">	
			      <el-menu-item index="businessRelationship">			      	
				        <i class="el-icon-menu"></i>
				        <span slot="title">客商关系</span>			        
			      </el-menu-item>
			    </router-link>  		    
			      <el-submenu index="orderList">
			        <template slot="title" data-id="5" data-pid="0">
			          <i class="el-icon-location"></i>
			          <span>订单中心</span>
			        </template>
			        <el-menu-item-group>
			          <router-link :to="{path: '/yjw_admin/cgOrderList'}">
			          	<el-menu-item index="cgOrderList">采购订单</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/xsOrderList'}">
			          	<el-menu-item index="xsOrderList">销售订单</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/logisticsInfo'}">
			          	<el-menu-item index="logisticsInfo">物流详情</el-menu-item>
			          </router-link>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="goodsManage">
			        <template slot="title" data-id="6" data-pid="0">
			          <i class="el-icon-location"></i>
			          <span>商品管理</span>
			        </template>
			        <el-menu-item-group>
			          <router-link :to="{path: '/yjw_admin/factoryAddGoods'}" data-id="1" data-pid="0">
			          	<el-menu-item index="factoryAddGoods">生产厂家添加商品</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/distributorAddGoods'}">
			          	<el-menu-item index="distributorAddGoods">经销商添加商品</el-menu-item>
			          </router-link>
			        </el-menu-item-group>
			      </el-submenu>			      
			      <el-submenu index="inventoryManage">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>库存管理</span>
			        </template>
			        <el-menu-item-group>
			          <router-link :to="{path: '/yjw_admin/putInStorageList'}">
			          	<el-menu-item index="putInStorageList">入库管理</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/outOfStorageList'}">
			          	<el-menu-item index="outOfStorageList">出库管理</el-menu-item>
			          </router-link>			        	
			          <router-link :to="{path: '/yjw_admin/storeManage'}">
			          	<el-menu-item index="storeManage">仓库管理</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/warehouseManage'}">
			          	<el-menu-item index="warehouseManage">库房管理</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/producerStock'}">
			          	<el-menu-item index="producerStock">商品库存管理</el-menu-item>
			          </router-link>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="companyManage">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>企业管理</span>
			        </template>
			        <el-menu-item-group>
			          <router-link :to="{path: '/yjw_admin/companyAccount'}">
			          	<el-menu-item index="companyAccount">企业账号管理</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/departmentManage'}">
			          	<el-menu-item index="departmentManage">部门管理</el-menu-item>
			          </router-link>
			        </el-menu-item-group>
			      </el-submenu>
			      <el-submenu index="regulator">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>监管机构</span>
			        </template>
			        <el-menu-item-group>
			          <router-link :to="{path: '/yjw_admin/warehouseMonitoringData'}">
			          	<el-menu-item index="warehouseMonitoringData">仓库监控数据</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/carMonitoringData'}">
			          	<el-menu-item index="carMonitoringData">车辆监控数据</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/warehouseVideoData'}">
			          	<el-menu-item index="warehouseVideoData">仓库监控视频</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/carVideoData'}">
			          	<el-menu-item index="carVideoData">车辆监控视频</el-menu-item>
			          </router-link>
			        </el-menu-item-group>
			      </el-submenu>			      
			      <el-submenu index="thirdPartyStorageCenterWMS">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>第三方仓储中心WMS</span>
			        </template>
			        <el-menu-item-group>
			          <router-link :to="{path: '/yjw_admin/carsManage'}">
			          	<el-menu-item index="carsManage">车辆管理</el-menu-item>
			          </router-link>
			          <router-link :to="{path: '/yjw_admin/distributorManage'}">
			          	<el-menu-item index="distributorManage">配送员管理</el-menu-item>
			          </router-link>
			        </el-menu-item-group>
			      </el-submenu>
			    </el-menu>
			  </el-col>
			</el-row>
		</div>
		<div class="admin-right-nav" :width=rightBoxWidth ref="right_nav">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
  export default {
  	data (){
  		return {
  			indexMenu:'',
  			leftBoxHeight: window.innerHeight-236,
  			rightBoxWidth: null,
  			username:'admin',
  			companyName: '',
  			roleName: '',
  			caigouType: null,
  			//ruleList:this.ruleList.data.getData()
  		}
  	},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      returnBack(){
      	window.location.reload()
      },
      logout(){
      	let _this = this
		this.common.SStorage.clear()
		//this.common.SStorage.removeItem('userKey')
      	this.$message({
          message: '注销成功!',
          type: 'success'
        })
		setTimeout(function(){
       		_this.$router.push('/')
			window.location.reload()
        },700)
      },
	  saveUserInfo(){	
		/*保存用户个人信息*/
			
  			let parmUser = {
		  		"userId": this.common.SStorage.getItem("userId"),
		  		"signId": this.common.SStorage.getItem("userId")
		  	}
  			console.log(parmUser)
				let baseParmUser = this.common.DataToBase64(JSON.stringify(parmUser))
				this.$axios.get('/user_web/userInfo/getUserInfoByUserId?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parmUser))
					
				  .then((res) => {				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))
				  	//console.log(nowData)
				  	if(nowData.code == 0){
				  		//console.log(nowData.result)
					  	this.common.SStorage.setItem("saveUserInfo",nowData.result)  
					  	//console.log(this.common.SStorage.getItem("saveUserInfo"))
					  	
					  	/*页面加载基础数据*/  	
				    	this.companyName = this.common.SStorage.getItem("saveUserInfo").companyName
				  		this.roleName = this.common.SStorage.getItem("saveUserInfo").roleName
				    	
				    	if(this.common.SStorage.getItem("saveUserInfo").userType == 0){  //医院
				  			this.caigouType = 0
				  		}else if(this.common.SStorage.getItem("saveUserInfo").userType == 1){	//经销商
				  			this.caigouType = 1
				  		}   	   	
				
				    	//this.username = this.common.LStorage.getItem("userPageInfo").userName 
				    	this.username = this.common.SStorage.getItem("saveUserInfo").name 
				    	/*页面加载基础数据end*/
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
  		/*保存用户个人信息end*/
	  }      
   },
   created(){
        this.saveUserInfo() 
        
    },
    mounted(){
    	console.log(console.log(JSON.stringify(this.ruleList)))
    	//设置右侧显示区域宽度自适应
    	$('.admin-right-nav').css('width',window.innerWidth-295)
    	//$('.admin-left-nav').css('height',window.innerHeight-236)
    	console.log('右侧显示区宽度'+window.innerWidth-295)   	
    	
    	if(!window.sessionStorage.getItem("userKey")){
    		this.$router.push('/')
    	}
    	$('.dialog-wrap').hide()
    	
    	let nowIndex = window.location.pathname
    	console.log(nowIndex.substring(11))
  		this.indexMenu = nowIndex.substring(11)
  		
  		//二级菜单页面刷新导航能正确显示
  		if(nowIndex.indexOf('businessRelationshipAdd') > -1){
  			this.indexMenu = 'businessRelationship'
  		}else if(nowIndex.indexOf('cgOrderInfo') > -1){
  			this.indexMenu = 'cgOrderList'
  		}else if(nowIndex.indexOf('xsOrderInfo') > -1){
  			this.indexMenu = 'xsOrderList'
  		}else if(nowIndex.indexOf('factoryAddGoodsInfo') > -1){
  			this.indexMenu = 'factoryAddGoods'
  		}else if(nowIndex.indexOf('putInStorageInfo') > -1 || nowIndex.indexOf('putInStorageUpdate') > -1 || nowIndex.indexOf('putInStorageDanju') > -1){
  			this.indexMenu = 'putInStorageList'
  		}else if(nowIndex.indexOf('outOfStorageInfo') > -1 || nowIndex.indexOf('outOfStorageUpdate') > -1 || nowIndex.indexOf('outOfStorageDanju') > -1){
  			this.indexMenu = 'outOfStorageList'
  		}else if(nowIndex.indexOf('logisticsInfo') > -1){
  			this.indexMenu = 'logisticsInfo'
  		}
  		
    }
  }	
</script>

<style>
.admin-system .prompt-info{	/*提示字体颜色*/
	color: #999;
}
.admin-system .el-pagination{  /*分页样式显示*/
	margin: 20px 0;
}
.admin-system .el-table .cell i:hover{
	color: deepskyblue; cursor: pointer; font-size: 18px;
}
.admin-system .el-table .cell i{
	cursor: pointer; font-size: 18px;
}
.admin-system .content-nav{
	border-bottom: 1px dashed #C9C9C9; padding-bottom: 5px; color: #909399; text-align: left; overflow: hidden;
}
.admin-system .content-nav ul li{
	float: left; margin-right: 5px;
}
/*右侧导航样式	*/
.admin-system .admin-right-nav{
	/*height: 733px;*/ margin-left: 236px; padding: 15px 20px; position: absolute; top: 213px;
}
/*右侧导航样式end	*/
	
/*左侧导航样式	*/
html,body{
	height: 100%;
}
.admin-system .admin-left-nav{
	width: 236px; height: 733px; background-color: #545C64; position: fixed; top: 213px; z-index: 99;
}
.admin-system .admin-left-nav .el-col-12{
	width: 100%;
}
.admin-system .admin-left-nav .el-menu{
	border-right: none;
}
.admin-system .admin-left-nav .el-menu li{
	text-align: left;
}
.admin-system .admin-left-nav .el-menu-item.is-active{
	background-color: #434A50!important;
}
/*左侧导航样式end	*/
	
/*头部样式	*/
.admin-system .header1{
	height: 147px; background-color: #28BAE6; font-size: 56px; color: #fff; line-height: 147px; position: relative;
}
.admin-system .header1 img{
	position: absolute; left: 100px; top: 32px;
}
.admin-system .header2{
	height: 65px; border-bottom: 1px solid #B1B4B5; line-height: 65px;
}
.admin-system .header2 .logo-admin{
	width: 193px; height: 100%; color: #1E9FFF;
}
.admin-system .header-right-list ul{
	height: 35px; line-height: 35px; margin-top: 15px;
}
.admin-system .header-right-list ul li{
	float: left; margin-right: 15px; padding-right: 15px; border-right: 1px solid rgba(94,94,90,0.3);
}
.admin-system .header-right-list ul li i{
	color: #1E9FFF;
}
.admin-system .header-right-list ul li:last-child{
	border-right: none;
}
.admin-system .admin-header{
	position: fixed;
    width: 100%;
    z-index: 99;
}
.admin-system .admin-header .header2{
	background-color: #fff;
}
/*头部样式end	*/
</style>