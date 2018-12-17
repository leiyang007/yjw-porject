<template>
	<div>
		<div class="nav-bg"></div>
		<div class="help-center">
			<h3>帮助中心</h3>
			<div class="clear">
				<div class="help-center-menu float-left">
					<el-row class="tac">
					  <el-col>
					    <el-menu
					      :default-active="indexMenu"
					      class="el-menu-vertical-demo"
					      @open="handleOpen"
					      @close="handleClose"
					      background-color="#328ddd"
					      text-color="#fff"
					      active-text-color="#328ddd">
					      <el-submenu index="noviceGuide">
					        <template slot="title">
					          <span>新手指南</span>
					        </template>
					        <el-menu-item-group>
					          <router-link :to="{path: '/helpCenter/customerNotice'}">
					          	<el-menu-item index="customerNotice">客户须知</el-menu-item>
					          </router-link> 
					          <router-link :to="{path: '/helpCenter/shoppingList'}">
					          	<el-menu-item index="shoppingList">购物流程</el-menu-item>
					          </router-link>	
					          <router-link :to="{path: '/helpCenter/commonProblem'}">
					          	<el-menu-item index="commonProblem">常见问题</el-menu-item>
					          </router-link>	
					        </el-menu-item-group>
					      </el-submenu>
					      <el-submenu index="websiteGuarantee">
					        <template slot="title">
					          <span>网站保障</span>
					        </template>
					        <el-menu-item-group>
					          <router-link :to="{path: '/helpCenter/registrationAgreement'}">
					          	<el-menu-item index="registrationAgreement">注册协议</el-menu-item>
					          </router-link> 
					          <router-link :to="{path: '/helpCenter/privacyProtection'}">
					          	<el-menu-item index="privacyProtection">隐私保护</el-menu-item>
					          </router-link>	
					          <router-link :to="{path: '/helpCenter/disclaimer'}">
					          	<el-menu-item index="disclaimer">免责声明</el-menu-item>
					          </router-link>	
					        </el-menu-item-group>
					      </el-submenu>				      
					    </el-menu>
					  </el-col>
					</el-row>
				</div>
				<div class="help-center-content float-right">
					<router-view></router-view>
				</div>
			</div>
	  	</div>
	</div>  	
</template>

<script>
//import columnList from '../components/base/columnList'


export default {
  components: {
  	//columnList,

  },
  data () {
    return {
      indexMenu:''
    }
  },
  methods: {
	handleOpen(key, keyPath) {
	   console.log(key, keyPath);
	},
	handleClose(key, keyPath) {
	   console.log(key, keyPath);
	}
  },
  mounted () {
    let nowIndex = window.location.pathname
    	console.log(nowIndex.substring(12))
  		this.indexMenu = nowIndex.substring(12)
  }
}
</script>

<style type="text/css">
.help-center .el-submenu{
	border-bottom: 1px solid #F7F7F7;
}
.help-center .el-submenu .el-menu-item{
	min-width: 199px;
}
.help-center .el-menu-item-group__title{
	padding: 0;
}	
.help-center .el-submenu.is-active .el-submenu__title{
	border-bottom: 1px solid #F7F7F7;
}
.help-center .el-submenu .el-menu-item{
	background-color: #F7F7F7!important; color: #828282!important; border-bottom: 1px solid #F7F7F7;
}
.help-center .el-submenu .el-menu-item:hover{
	background-color: #328ddd!important; color: #fff!important;
}
.help-center .el-submenu__title i {
    color: #fff;
}
.help-center .router-link-active .el-menu-item{
	background-color: #74B7F0!important; color: #fff!important;
}	
</style>

<style scoped>
.nav-bg{
	height: 45px; background: url(../assets/images/help-center-nav-bg.jpg) repeat-x;
}
.help-center{
	width: 1000px; border: 1px solid #dcdcdc; margin: 10px auto 30px; padding-bottom: 30px;
}
.help-center > h3{
	text-align: left; padding: 10px; color: #2f2f2f;
}
.help-center-menu{
	width: 200px;
}
.help-center-content{
	width: 744px;
}
</style>
