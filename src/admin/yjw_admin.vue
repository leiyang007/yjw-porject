<template>
	<div class="admin-system clear">
		<div class="admin-header">
			<div class="header1">
				医疗用品冷链集成系统
				<img class="pointer" src="../assets/images/admin/admin-logo.png" @click="returnBack">
			</div>
			<div class="header2">
				<div class="float-left pointer logo-admin" @click="returnBack">				
					<i class="layui-icon layui-icon-home" style="font-size: 23px;"></i>
					首页					
				</div>
				<div class="float-left" style="height: 100%; color: #a2a3a3;">{{ companyName }}</div>
				<div class="header-right-list float-right">
					<ul>
						<li>
							<!--<i class="layui-icon layui-icon-username" style="font-size: 23px; margin-right: 10px;"></i>{{ username }}-->
							<el-dropdown>
							  <span class="el-dropdown-link">							  	
							  	<i class="layui-icon layui-icon-username" style="font-size: 23px;"></i>
							    <span class="blue-font">{{ username }}</span>({{ roleName }})
							    <i class="el-icon-arrow-down el-icon--right"></i>
							  </span>
							  <el-dropdown-menu slot="dropdown">
							  	<router-link :to="{path: '/yjw_admin/personInfo'}">
							    	<el-dropdown-item>个人信息</el-dropdown-item>
							    </router-link>
							    <router-link :to="{path: '/yjw_admin/daiBan'}">
							    	<el-dropdown-item>待办 <span class="red-font">({{ daibanNumber }})</span></el-dropdown-item>
							    </router-link>
							    <router-link :to="{path: '/yjw_admin/warning'}">
							    	<el-dropdown-item>预警 <span class="red-font" v-if="">({{ yujingNumber }})</span></el-dropdown-item>
							     </router-link>
							  </el-dropdown-menu>
							</el-dropdown>
						</li>
						<!--<li>
							<i class="layui-icon layui-icon-notice" style="font-size: 23px;"></i>
						</li>
						<li>
							<i class="el-icon-message" style="font-size: 23px; margin-top: 6px;"></i>
						</li>-->
						<li>
							<span class="pointer returnGuanwang" @click="returnBack">返回官网</span>
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
		<div class="admin-left-nav float-left" style="overflow-y: auto;">
			<el-row class="tac">			  
			  <el-col :span="12">
			    <el-menu :default-active="indexMenu" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
			    	@open="handleOpen" 
			    	@close="handleClose">
			    	<template v-for="(item,index) in treeData" v-if="!item.children">
				    	<router-link :to="{path: '/yjw_admin/'+item.url}" :data-id="item.id">	
					      <el-menu-item :index="item.url">			      	
						        <i class="el-icon-menu"></i>
						        <span slot="title">{{ item.menuName }}</span>			        
					      </el-menu-item>
					    </router-link> 	
			    	</template>			    	
			    	<template v-for="(itema,index) in treeData" v-if="itema.children">
				      <el-submenu :index="itema.url" :title="itema.url" :data-id="itema.id">
				        <template slot="title" >
				          <i class="el-icon-location"></i>
				          <span>{{ itema.menuName }}</span>
				        </template>
				        <el-menu-item-group>
				          <router-link v-for="(itemd,indexd) in itema.children" :to="{path: '/yjw_admin/'+itemd.url}" :data-id="itemd.id">
				          	<el-menu-item :index="itemd.url" :title="itemd.url">{{ itemd.menuName }}</el-menu-item>
				          </router-link>
				        </el-menu-item-group>
				      </el-submenu>
			      	</template>
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
  			//leftBoxHeight: window.innerHeight-213,
  			rightBoxWidth: null,
  			username:'admin',
  			companyName: '',
  			roleName: '',
  			caigouType: null,
  			treeData: [],
  			daibanNumber: 0,
  			yujingNumber: 0
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
      	this.$router.push('/')
      	window.location.reload()
      },
      logout(){
      	let _this = this
		
		this.$confirm('确定要退出?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	  			  	this.common.SStorage.clear()
					this.common.LStorage.removeItem("userPageInfo")
					//this.common.SStorage.removeItem('userKey')
			      	this.$message({
			          message: '注销成功!',
			          type: 'success'
			        })
					setTimeout(function(){
			       		_this.$router.push('/')
						window.location.reload()
			        },700)     	
	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消'
	          })        
	        })
      },
	  saveUserInfo(){	
		/*保存用户个人信息*/
			let _this = this
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
					  	
					  	/*页面加载基础数据*/  	
				    	this.companyName = this.common.SStorage.getItem("saveUserInfo").companyName
				  		this.roleName = this.common.SStorage.getItem("saveUserInfo").roleName
				    	
				    	if(this.common.SStorage.getItem("saveUserInfo").userType == 0){  //医院
				  			this.caigouType = 0
				  		}else if(this.common.SStorage.getItem("saveUserInfo").userType == 1){	//经销商
				  			this.caigouType = 1
				  		}   	   	
				 
				    	this.username = this.common.SStorage.getItem("saveUserInfo").name 
				    	/*页面加载基础数据end*/
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
  		/*保存用户个人信息end*/
	  },
	  getMenuList(){
	  	let author_list = this.common.SStorage.getItem("author")
	  	console.log(console.log(JSON.stringify(author_list)))
	  	// 属性配置信息
		let attributes = {
		      id: 'id',
		      parentId: 'parentMenuId',
		      name: 'menuName',
		      dpSn: 'url',
		      rootId: '0'
		  };
		this.treeData = this.common.toTreeData2(author_list, attributes)
			  	
	  	console.log(console.log(JSON.stringify(this.treeData)))
	  },
	  daibanNum(){			//待办信息数量
	  	let _this = this
	  	let parm = {
	  		"userId": this.common.SStorage.getItem("userId"),
			"signId": this.common.SStorage.getItem("userId")
	  	}
		console.log(JSON.stringify(parm))
		let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
		this.$axios.get('/user_web/user/getUserTaskCountByNo?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
			
		  .then((res) => {				  	
		  	let nowData = JSON.parse(this.common.base64ToData(res.data))
		  	console.log(nowData)
		  	if(nowData.code == 0){	
		  		_this.daibanNumber = nowData.result
		  		console.log('待办数量是:'+JSON.stringify(nowData.result))		  		
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
	  yujingNum(){			//预警信息数量
	  	let _this = this
	  	let parm = {
	  		"userId": this.common.SStorage.getItem("userId"),
			"signId": this.common.SStorage.getItem("userId")
	  	}
		console.log(JSON.stringify(parm))
		let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
		this.$axios.get('/user_web/user/getUserTaskEarlyCountByNo?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
			
		  .then((res) => {				  	
		  	let nowData = JSON.parse(this.common.base64ToData(res.data))
		  	console.log(nowData)
		  	if(nowData.code == 0){	
		  		_this.yujingNumber = nowData.result
		  		console.log('预警数量是:'+JSON.stringify(nowData.result))			  		
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
	  getWebSocket(userId){
	  	let _this = this
	  	//建立socket连接
        let sock;
        if ('WebSocket' in window) {
            sock = new WebSocket(this.$axios.defaults.websocketURL+"socketServer?userId="+userId);
        } else if ('MozWebSocket' in window) {
            sock = new MozWebSocket(this.$axios.defaults.websocketURL+"socketServer?userId="+userId);
        } else {
            sock = new SockJS(this.$axios.defaults.websocketURL+"sockjs/socketServer?userId="+userId);
        }
        sock.onopen = function (e) {			//连接后触发
        	//alert('已连接')
            console.log("onopen");
            console.log(e);
            //sock.send('123456')
        };
        sock.onmessage = function (e) {			//接收消息成功触发
        	//alert('接收消息成功')
            console.log("onmessage");
            //alert(e.data);
            console.log(e.data);

            if(e.data == 1){   			//查询待办未完成数量          	
            	_this.daibanNum()
            }else if(e.data == 2){		//查询预警未完成数量           	
            	_this.yujingNum()
            }
        };
        sock.onerror = function (e) {			//失败\发生错误回调
        	//alert('接收消息失败')
            console.log("onerror");
            console.log(e);
        };
        sock.onclose = function (e) {			//连接关闭回调
        	//alert('关闭连接')
            console.log("onclose");
            console.log(e);
        }
	  },
	  /*websockeTest(){
	  	let _this = this
	  	let parm = {
	  		"userId": this.common.SStorage.getItem("userId"),
	  	   "message": '123456',
			"signId": this.common.SStorage.getItem("userId")
	  	}
		console.log(JSON.stringify(parm))
		let baseParmUser = this.common.DataToBase64(JSON.stringify(parm))
		this.$axios.get('/user/sendMessage?data='+baseParmUser+'&sign='+this.GLOBAL.urlStr(parm))
			
		  .then((res) => {				  	
		  	let nowData = JSON.parse(this.common.base64ToData(res.data))
		  	console.log(nowData)
		  	if(nowData.code == 0){	
		  				  		
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
	  }*/
   },
   created(){
        this.saveUserInfo()        
   },
    mounted(){
    	let _this = this
    	if(!_this.common.SStorage.getItem("userId")){   //没有登录跳转首页		
    		setTimeout(function(){
  				_this.common.SStorage.removeItem("userKey")
		  		_this.$router.push('/')
				window.location.reload()
		  	},700)
    	}
    	
    	this.getMenuList()		//根据权限获取菜单列表

    	//设置右侧显示区域宽度自适应
    	$('.admin-right-nav').css('width',window.innerWidth-295)		//赋值右侧显示区域宽度
    	$('.admin-left-nav').css('height',window.innerHeight-170)		//赋值左侧导航菜单高度
    	console.log('右侧显示区宽度'+window.innerWidth-295)   	
    	
    	if(!window.sessionStorage.getItem("userKey")){
    		this.$router.push('/')
    	}
    	$('.dialog-wrap').hide()
    	
    	let nowIndex = window.location.pathname
    	
  		this.indexMenu = nowIndex.substring(11)
  		
  		console.log(this.indexMenu)
  		console.log(this.indexMenu.length)
  		
  		
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
  		
  		this.getWebSocket(this.common.SStorage.getItem("userId"))		//WebSocket处理函数 		
    },
    watch:{
		daibanNumber: function (newValue, oldValue) {
	      console.log(oldValue+'--->'+newValue)
	      if(val != oldVal){
	      	this.daibanNum()
	      }
	   },
		yujingNumber: function (newValue, oldValue) {
	      console.log(oldValue+'--->'+newValue)
	      if(val != oldVal){
	      	this.yujingNum()
	      }
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
	/*height: 733px;*/ margin-left: 236px; padding: 15px 20px; position: absolute; top: 170px;
}
/*右侧导航样式end	*/
	
/*左侧导航样式	*/
html,body{
	height: 100%;
}
.admin-system .admin-left-nav{
	width: 236px; height: 733px; background-color: #545C64; position: fixed; top: 170px; z-index: 99; overflow-y: auto;
}
.admin-system .admin-left-nav .el-col-12{
	width: 100%;
}
.admin-system .admin-left-nav .el-menu{
	border-right: none; /*margin-bottom: 30px;*/
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
	min-width: 1200px; height: 120px; background-color: #28BAE6; font-size: 56px; color: #fff; line-height: 120px; position: relative;
}
.admin-system .header1 img{
	position: absolute; left: 100px; top: 20px;
}
.admin-system .header2{
	height: 50px; border-bottom: 1px solid #B1B4B5; line-height: 50px;
}
.admin-system .header2 .logo-admin{
	width: 130px; height: 100%; color: #1E9FFF;
}
.admin-system .header-right-list ul{
	height: 35px; line-height: 35px; margin-top: 8px;
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
	background-color: #fff; min-width: 800px;
}
.admin-system .returnGuanwang:hover{
	color: #33BFFF;
}
/*头部样式end	*/
</style>