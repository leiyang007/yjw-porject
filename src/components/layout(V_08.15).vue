<template>
  <div class="layout-box">
    <div class="app-head"  v-if="yjwAadmin">
    	<!--公共头部-->
      <header>
				<div class="header-box">
					<div class="img-box">
						<div>
							<router-link :to="{path: '/'}">
								<img src="../assets/logo.png" alt="" @click="refresh" />
							</router-link>
						</div>			
					</div>
					<ul class="nav-list" v-show="showRegister">
						<li v-for="(item,index) in ruterLink" :class="{active : nowIndex == index}" @click="changeLink(index)">
							<router-link :to="{path: item.link}">{{ item.name }}</router-link>
						</li>
					</ul>
					<div>
						<div v-if="!userState" class="login-box" @click="logClick">
							<span class="login-icon icon-login-before"></span>
							<span>客户登录</span>
							<i class="layui-icon layui-icon-triangle-r" style="font-size: 14px;"></i> 
						</div>
						<router-link :to="{path: '/yjw_admin'}" onClick="javascript:window.location.reload()">
							<div v-if="userState" class="login-box" @click="refresh">
								<span class="login-icon icon-login-after" v-if="userState"></span>
								<span v-if="userState">进入后台</span>
								<i class="layui-icon layui-icon-triangle-r" style="font-size: 14px;"></i> 
							</div>
						</router-link>
					</div>					
				</div>
			</header>
    </div>
    <div class="container clear" style="width: 100%;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!--<div class="content-bottom-blue" v-show="showRegister" v-if="yjwAadmin">
			<div class="cont-item-title">
				<img src="../assets/images/index/hzjg.png" alt="" />
			</div>
			<div class="friend-link clear">
				<ul>
					<li><img src="../assets/images/index/link1.png" alt="" /></li>
					<li><img src="../assets/images/index/link2.png" alt="" /></li>
					<li><img src="../assets/images/index/link3.png" alt="" /></li>
					<li><img src="../assets/images/index/link4.png" alt="" /></li>
					<li><img src="../assets/images/index/link1.png" alt="" /></li>
					<li><img src="../assets/images/index/link-more.png" alt="" /></li>
				</ul>
			</div>
		</div>-->
    <div class="app-foot" v-if="yjwAadmin">
      <!-- 公共底部-->
			<footer1></footer1>
			<!--<footer2></footer2>-->
    </div>
    <my-dialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <log-form :is-show="isShowLogDialog" @userSignIn="userSignIn"></log-form>
    </my-dialog>
  </div>
</template>
<script>
import MyDialog from './base/dialog'
import LogForm from './logForm'
import footer1 from './footer1'
//import footer2 from './footer2'

export default {
  components: {
    MyDialog,
    LogForm,
    footer1
  },
  data () {
    return {
    	//userState: window.localStorage.getItem('userKey')?  false : true,
    	userState: window.sessionStorage.getItem("userKey")? true : false,
    	isShowLogDialog: false,
    	nowIndex: 0,
    	yjwAadmin: true,
    	//showRegister: true,
      ruterLink: [
      	{
      		name: '首页',
      		link: '/'
      	},
      	{
      		name: '关于我们',
      		link: '/aboutUs/companyInfo'
      	},
      	{
      		name: '新闻中心',
      		link: '/newsCenter/newsList'
      	},
      	{
      		name: '平台介绍',
      		link: '/platformIntroduction/platformInfo'
      	},
      	{
      		name: '联系我们',
      		link: '/contactUs/contactUsInfo'
      	}
      ]
    }
  },
  methods: {
    changeLink (index){
    	this.nowIndex = index
    	//console.log(this.nowIndex+'-->'+index)
    },
    logClick () {
      this.isShowLogDialog = true
    },
    closeDialog (attr) {
      this[attr] = false
    },
    userSignIn (data) {
      console.log(data)
      console.log(this.userState)
      this.closeDialog ('isShowLogDialog')
			window.location.reload()
    },
    refresh (){
    	window.location.reload()
    }
  },
  mounted (){
  		console.log('-->'+window.location.pathname)
  		let nowHref = window.location.pathname
  		if(nowHref.indexOf('/aboutUs/companyInfo') > -1){
  			this.nowIndex = 1
  		}else if(nowHref.indexOf('/newsCenter') > -1 || nowHref.indexOf('/newsInfo') > -1){
  			this.nowIndex = 2
  		}else if(nowHref.indexOf('/platformIntroduction/platformInfo') > -1){
  			this.nowIndex = 3
  		}else if(nowHref.indexOf('/contactUs/contactUsInfo') > -1){
  			this.nowIndex = 4
  		}else if(nowHref.indexOf('/registerStep') > -1){
  			this.$store.commit('changeHeader')
  		}else{
  			this.nowIndex = 0
  		}
  		
  		if(nowHref.indexOf('yjw_admin') > -1){
  			this.yjwAadmin = false
  		}
  		
  		console.log("登录状态是："+this.userState)
  		//console.log(this.showRegister)
  },
  beforeDestroy (){
  	
  },
  created (){
  	//console.log('=>'+this.$store.state.name)
  },
  computed: {
  	showRegister() {
      return this.$store.state.showRegister;
    }
  }
}

</script>

<style>

/*全局样式*/
*{padding:0;margin:0;}
div,dl,dt,dd,form,h1,h2,h3,h4,h5,h6,img,ol,ul,li,table,th,td,p,span,a{border:0px solid red;}
img,input{border:none; vertical-align:middle; outline:medium;}
body{font-family:微软雅黑; font-size:16px; text-align:center; background:#fff;}
html{overflow-y:auto;}
ul li{list-style-type:none;}
a{text-decoration:none; color:#333;}
a:hover{text-decoration:none; color: #1BB1FE;}
textarea{resize:none;}

.layui-form-item input::-webkit-input-placeholder,.layui-form-item textarea::-webkit-input-placeholder{ /*WebKit browsers*/
	color: #c2bfbf;	
}
.layui-form-item input::-moz-input-placeholder,.layui-form-item textarea::-moz-input-placeholder{ /*Mozilla Firefox*/
	color: #c2bfbf;	
}
.layui-form-item input::-ms-input-placeholder,.layui-form-item textarea::-ms-input-placeholder{ /*Internet Explorer*/ 
	color: #c2bfbf;	
}
input::-webkit-input-placeholder,.layui-form-item textarea::-webkit-input-placeholder{ /*WebKit browsers*/
	color: #c2bfbf;	
}
input::-moz-input-placeholder,.layui-form-item textarea::-moz-input-placeholder{ /*Mozilla Firefox*/
	color: #c2bfbf;	
}
input::-ms-input-placeholder,.layui-form-item textarea::-ms-input-placeholder{ /*Internet Explorer*/ 
	color: #c2bfbf;	
}
.float-left{float:left;}
.float-right{float:right;}
.clear{overflow: hidden;}
.pointer{cursor: pointer;}
.red-font{color: red;}
.blue-font{color: #00BFFF;}
.gray-font{color: gray;}
.yellow-font{color: #E6A23C;}

.font-22{font-size: 22px;}
.font-20{font-size: 20px;}
.font-18{font-size: 18px;}
.font-16{font-size: 16px;}
.font-13{font-size: 13px;}
.font-12{font-size: 12px;}
.font-10{font-size: 10px;}
.font-weight{font-weight: bold;}

.line-1{
	overflow:hidden; 
	text-overflow:ellipsis;	
	display:-webkit-box; 	
	/* autoprefixer: off */  
  -webkit-box-orient: vertical;  
  /* autoprefixer: on */
 -webkit-line-clamp:1;	
}
.line-2{
	overflow:hidden; 
	text-overflow:ellipsis;	
	display:-webkit-box; 	
	/* autoprefixer: off */  
  -webkit-box-orient: vertical;  
  /* autoprefixer: on */	
	-webkit-line-clamp:2; 
}
.line-3{
	overflow:hidden; 
	text-overflow:ellipsis;	
	display:-webkit-box; 	
	/* autoprefixer: off */  
  -webkit-box-orient: vertical;  
  /* autoprefixer: on */	
	-webkit-line-clamp:3; 
}

.anchorBL,.BMap_noprint{display:none;} 

/*公共头部样式*/
header{
	width:100%; height: 150px; background-color: #fff;
}
.header-box{
	width: 1000px; height: 150px; margin: 0 auto; position: relative;
}
.img-box{
	float: left;
}
.img-box > div{
	width: 240px; height: 150px; display: table-cell; vertical-align: middle;
}
.header-box img{
	float: left;
}
.nav-list{
	float: right; overflow: hidden; position: relative; top: 100px;
}
.nav-list .active a{
	color:rgb(66,146,208); border-bottom: 2px solid rgb(66,146,208);
}
.nav-list li{
	float: left; margin-left: 30px; line-height: 39px; font-size: 18px;
}
.nav-list li a:hover{
	color: rgb(0,139,218);  border-bottom: 2px solid rgb(66,146,208);
}
.login-box{
	width: 105px; height: 30px; line-height: 30px; background-color: rgb(21,104,179); color: #fff; position: absolute; right: 0px; top: 46px; cursor: pointer;
}
.login-icon{
	position: absolute; left: -40px; font-size: 30px;
}

/*栏目页公共banner图*/
.banner{width: 1900px; margin: 0 auto;}
.banner img{width: 100%;}
	
/*公共左侧导航栏*/
.content{
	width: 1000px; margin: 80px auto 50px; overflow: hidden;
}
.left-slider-bar{
	width: 226px; float: left;
}
.left-slider-bar .column-title{
	height: 59px; padding: 21px 0 0 20px; background-color: #45b3f2; text-align: left; color: #eeeaea;
}  	
.left-slider-bar .cloum-list{
	background-color: #f6f6f6;;
}
.left-slider-bar .cloum-list ul li{
	height: 35px; line-height: 35px; color: #848484; margin-top: 2px; border-bottom: 2px solid #fff; cursor: pointer;
}
.left-slider-bar .cloum-list ul li:hover{
	background-color: #dedddd; 
}
.left-slider-bar .cloum-list ul li:hover span{
	color: #45b3f2; 
}
.left-slider-bar .cloum-list ul li div{
	width: 180px; display: inline-block; text-align: left; font-size: 14px;
}
.left-slider-bar .cloum-list ul li span{
	color: #dedddd;
}
.left-slider-bar .cloum-list ul li.high-light{
	background-color: #dedddd;
}
.left-slider-bar .cloum-list ul li.high-light span{
	color: #45b3f2;
}
.left-slider-bar .kefu-img-box{
	width: 226px; height: 179px;
}
.left-slider-bar .kefu-img-box img{
	width: 100%; 
}
.left-slider-bar .kefu-img-box .kefu-munber{
	color: #848484; text-align: right; position: relative; top: -40px; padding-right: 5px;
}


/*公共右侧内容区*/
.right-content{
	width: 723px; float: right;
}
.right-content .cont-top-box{
	height: 37px; overflow: hidden; line-height: 37px; border-bottom: 1px dashed #b8b8b8;
}
.right-content .cont-top-box > div,.right-content .cont-top-box > ul{
	display: inline-block; color: #848484;
}
.right-content .cont-top-box ul li{
	float: left; color: #494949;
}
.right-content .cont-top-box ul li i{
	margin: 0 5px 0 5px;
}
.right-content .cont-top-box ul li:last-child span{
	color: #429ddf; border-bottom: 2px solid #429ddf;
}
.right-content .cont-bot-box{
	padding-top: 20px;
}

/*公共底部样式*/
.content-bottom-blue{
	width: 100%; height: 251px; background: url(../assets/images/index/bg4.jpg); padding-top: 20px;
}
.friend-link{
	width: 1000px; margin: 40px auto 0;
}
.friend-link ul li{
	float: left; margin-right: 113px;
}
.friend-link ul li:last-child{
	margin-right: 0px; cursor: pointer;
}


</style>
