<template>
	<!--内容部分-->
<div class="bg-register">
	<div class="content">
		<div class="clear">
			<div class="float-left blue-font">
				<i class="icon-register"></i>
				企业注册
			</div>
			<div class="float-right">
				<!--已有账号：<a href="" class="blue-font">立即登录</a>				
				<span class="now-login-icon"><i class="layui-icon layui-icon-right"></i></span>-->
			</div>
		</div>
		<div class="reg-step-icon clear">
			<ul class="clear">
				<li class="now-stap">
					<div>1</div>
					<p>企业管理员信息</p>
				</li>
				<li>
					<div>2</div>
					<p>公司基本信息</p>
				</li>
				<li>
					<div>3</div>
					<p>公司资料材料</p>
				</li>
			</ul>
		</div>
		<div class="reg-from">
			<form class="layui-form" action="">
				<div class="layui-form-item">
				    <label class="layui-form-label"><span class="red-font" style="margin-right: 10px;">*</span>姓名：</label>
				    <div class="layui-input-block">
				      <input type="text" name="name" v-model="name" required  lay-verify="required" placeholder="请输入姓名" autocomplete="off" class="layui-input">
				      <span class="reg-sex-radio">
					      <input type="radio" name="sex" lay-verify="sexReq" value="1" title="男" :checked="sex == 1">
					      <input type="radio" name="sex" lay-verify="sexReq" value="0" title="女" :checked="sex == 0">
					    </span>
				      <p class="red-font"></p>
				    </div>
				 </div>				
				<div class="layui-form-item">
				    <label class="layui-form-label"><span class="red-font" style="margin-right: 10px;">*</span>账号：</label>
				    <div class="layui-input-block">
				      <input type="text" name="userName" v-model="userName" required  lay-verify="required|phone" placeholder="请输入手机号作为账号" autocomplete="off" class="layui-input" @blur="checkAccountInfo">
				      <p class="red-font" v-show="checkAccount">{{ erro }}</p>
				    </div>
				 </div>
				<div class="layui-form-item">
				    <label class="layui-form-label"><span class="red-font" style="margin-right: 10px;">*</span>账号密码：</label>
				    <div class="layui-input-block">
				      <input type="password" name="password" v-model="password" required  lay-verify="required|password" placeholder="请输入6-24位数密码" autocomplete="off" class="layui-input">
				      <!--<p class="red-font">密码为6-24位！</p>-->
				      <ul class="password-level clear">
				      	<li :class="{'pass-active' : passwordWeak}">弱</li>
				      	<li :class="{'pass-active' : passwordSecondary}">中</li>
				      	<li :class="{'pass-active' : passwordStrong}">强</li>
				      </ul>
				    </div>
				 </div>
				<div class="layui-form-item">
				    <label class="layui-form-label"><span class="red-font" style="margin-right: 10px;">*</span>确认密码：</label>
				    <div class="layui-input-block">
				      <input type="password" name="repass" v-model="passwordAgain" required  lay-verify="required|repass" placeholder="请再次输入密码" autocomplete="off" class="layui-input">
				      <!--<p class="red-font">前后输入的密码不一致，请重新输入！</p>-->
				    </div>
				 </div>
				 <div class="layui-form-item">
				    <label class="layui-form-label"><span class="red-font" style="margin-right: 10px;">*</span>联系方式：</label>
				    <div class="layui-input-block">
				      <input type="text" name="phone" required v-model="phone" lay-verify="required|phone" placeholder="请输入手机号码" autocomplete="off" class="layui-input">
				      <!--<p class="red-font">无效的手机号！</p>-->
				    </div>
				 </div>
				 <!--<router-link :to="{path: '/registerStep2'}">-->
				 	<button class="layui-btn next-stap" type="button" lay-submit lay-filter="formDemo">下一步</button>
				 <!--</router-link>-->
			</form> 
		</div>
			
	</div>
</div>	

<!--内容部分-->
</template>

<script>
export default {	
	data (){
		return {
      		
      		passwordWeak: false,
      		passwordSecondary: false,
      		passwordStrong: false,    
      		checkAccount: false,
      		name: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").name : "",			//用户名模型
      		sex: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").sex : null,		
      		userName: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").userName : "",		
      		password: this.common.LStorage.getItem("userLogin") ? this.common.LStorage.getItem("userLogin").password : "",
      		passwordAgain: this.common.LStorage.getItem("userLogin") ? this.common.LStorage.getItem("userLogin").password : "",
      		phone: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").phone : "",
      		erro: ''
    	}
	},
	methods: {
		checkAccountInfo(){
			  let parm = {
			  		"username": this.userName
			  	}
				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
				this.$axios.post('/user_web/user/checkUsername?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	
				  	let nowData = JSON.parse(this.common.base64ToData(res.data))

				  	if(nowData.code == 0){		
				  		this.checkAccount = false
				  		console.log(JSON.stringify(nowData))
				  	}else{
				  		this.checkAccount = true
				  		this.erro = nowData.message
				  		console.log(nowData.message)
				  	}		  			
				  })
				  .catch((err) => {
				    console.log(err);
				  })			
		}
	},
	created (){
		let _this = this	
		//_this.common.LStorage.setItem("registerData",{})
		layui.use('form', function(){
		  	var form = layui.form;

			form.verify({	
				  //我们既支持上述函数式的方式，也支持下述数组的形式
				  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
				  password: [
				    /^[\S]{6,24}$/,'密码必须6到24位，且不能出现空格'
				  ],
				  repass: function(value){  
				  	console.log(_this.password)
					if(value != _this.password){
						return '两次输入的密码不一致!'; 
			        }
				 },
				  sexReq: function(value){  
					if($(".layui-form-radioed").length == 0){
						return '请选择性别!'; 
			        }
				 }	
			}) 
		  form.on('radio', function(data){
			    console.log(data.value); //被点击的radio的value值
			     if(data.value == 1){
			     	_this.sex = '1'
			     }else if (data.value == 0) {
			     	_this.sex = '0'
			     }					   			     
			})
		  	//监听提交
			form.on('submit(formDemo)', function(data){
				if(_this.checkAccount){
					layer.msg('用户名已注册,请重新填写!')
				}else{
					console.log(JSON.stringify(data.field))
					let userList = {
						"name": data.field.name,
				        "userName": data.field.userName,
				        "sex": _this.sex,
				        //"repass": data.field.repass,
				        "phone": data.field.phone
					}
				    _this.common.LStorage.setItem("userInfo",userList)
				    _this.common.LStorage.setItem("userLogin",{password:_this.password})
				    
				    _this.$router.push('/registerStep2')
				    window.location.reload()
				    return false;
				}
				
			});
		})

	},
	watch: {
		'password': function(newval, oldval) {
            if(newval.length <= 6){
            	this.passwordWeak = true
            	this.passwordSecondary = false
            	this.passwordStrong = false
            }else if(newval.length >=7 && newval.length <=18){
            	this.passwordWeak = false
            	this.passwordSecondary = true
            	this.passwordStrong = false
            }else{
            	this.passwordWeak = false
            	this.passwordSecondary = false
            	this.passwordStrong = true
            }
          },
	}
}	
</script>

<style scoped>
.bg-register{/*#28B9E0-#2DA4EC*/
	padding-top: 1px;
	background: #28B9E0;
    background: -moz-linear-gradient(top,  #28B9E0 0%, #2DA4EC 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#28B9E0), color-stop(100%,#2DA4EC));
    background: -webkit-linear-gradient(top,  #28B9E0 0%,#2DA4EC 100%);
    background: -o-linear-gradient(top,  #28B9E0 0%,#2DA4EC 100%);
    background: -ms-linear-gradient(top,  #28B9E0 0%,#2DA4EC 100%);
    background: linear-gradient(to bottom,  #28B9E0 0%,#2DA4EC 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#28B9E0', endColorstr='#2DA4EC',GradientType=0 );
	} 	
	.now-login-icon{
		width: 14px;
    height: 14px;
    background-color: #737373;
    display: inline-block;
    line-height: 14px;
    border-radius: 50%;
    color: #fff;
	}
	.now-login-icon i{
		font-size: 12px;
		position: relative;
    top: -1px;
    left: 1px;
	}
	.content{
		width: 1040px; height: 738px; margin: 6px auto 0px; padding: 15px 30px; overflow: hidden; background-color: #fff;
	}
	.reg-step-icon{
		margin: 40px;
	}
	.reg-step-icon ul li{
		float: left; position: relative; margin-right: 120px;
	}
	.reg-step-icon ul li:after{
		content:""; width: 226px; height: 2px; display: block; background-color: #bec0c0; position: absolute; left: 70px; top: 15px;
	}
	.reg-step-icon ul li.now-stap:after{
		background-color: #3a99d6;
	}
	.reg-step-icon ul li:last-child{
		margin-right: 0px;
	}
	.reg-step-icon ul li:last-child:after{
		display: none; 
	}
	.reg-step-icon ul li > div{
		width: 29px; height: 29px; line-height: 29px; margin: 0 auto; background-color: #bec0c0; border-radius: 50%; color: #fff;
	}
	.reg-step-icon ul li.now-stap > div{
		background-color: #3a99d6; 
	}
	.reg-step-icon ul li > p{
		margin-top: 10px; width: 112px; color: #585858;
	}
	.reg-step-icon ul li.now-stap > p{
		color: #3a99d6;
	}
	.reg-step-icon ul{
		width: 625px; margin: 0 auto;
	}
	.reg-from{
		width: 660px; margin: 0 auto;
	}
	.layui-form-label{
		width: 115px; color: #5f5f5f; text-align: left;
	}
	.layui-input-block {
	    margin-left: 145px; height: 59px; position: relative;
	}
	.layui-input-block p{
	    text-align: left;
	}
	.layui-form-item {
	    margin-bottom: 20px;
	}
	.layui-form-item input{
	    width: 338px;
	} 
	.layui-form-item:first-child input{
	    width: 190px;
	}
	.reg-sex-radio{
		position: absolute; left: 222px; top: 0px;
	}
	.next-stap{
		width: 379px;
    height: 39px;
    font-size: 17px;
    background-color: #62bdee;
    border-radius: 19px;
    margin-top: 60px;
	}
	.password-level li{
		float: left;
		width: 48px;
		height: 30px;
		line-height: 30px;
		background-color: #b2e1ff;
		color: #fff;
	}
	.password-level{
		position: absolute;
		left: 350px;
		top: 4px;
	}
	.password-level li:nth-child(2){
		border-left: 1px solid #fff;
		border-right: 1px solid #fff;
	}
	.password-level li:first-child.pass-active{
		background-color: #ff0030;
	}
	.password-level li:nth-child(2).pass-active{
		background-color: #46a6ff;
	}
	.password-level li:last-child.pass-active{
		background-color: #3ad67c;
	}	
</style>