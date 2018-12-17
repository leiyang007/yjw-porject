<template>
  <div class="login-dialog">
  		<div class="login-head">
  			<span style="font-size: 28px;">用户登录</span>
  			<span style="font-size: 19px;">welcome</span>
  		</div>
  		<div class="login-body">
  			<form class="layui-form" action="">
					  <div class="layui-form-item">
					    <label class="layui-form-label"><i class="icon-user"></i></label>
					    <div class="layui-input-block">
					      <input type="text" name="username" v-model="username" required lay-verify="required|phone|usePwdCheck" placeholder="请输入用户名(手机号)" autocomplete="off" class="layui-input">
					    </div>
					  </div>
					  <div class="layui-form-item">
					    <label class="layui-form-label"><i class="icon-password"></i></label>
					    <div class="layui-input-block">
					      <input type="password" name="password" v-model="password" required lay-verify="required|password|usePwdCheck" placeholder="请输入密码" autocomplete="off" class="layui-input">
					    </div>
					  </div>
					  <!--<div class="layui-form-item">
					    <label class="layui-form-label"><i class="icon-veri-code"></i></label>
					    <div class="layui-input-inline">
					      <input type="text" name="veryfi-code" v-model="veryfiCode" required lay-verify="required|verifyCodeCheck" @blur="veriCodeCheck" placeholder="请输入验证码" autocomplete="off" class="layui-input">
					    </div>
					    <div class="layui-form-mid layui-word-aux" @click="refreshCode">					    	
					    	<s-identify :identifyCode="identifyCode"></s-identify>
					    </div>		
					    
					  </div>-->	
					  <div class="layui-form-item">
					    <div class="">
					    	<p class="red-font" v-text="errorInfo"></p>
					      <button class="layui-btn login-btn" type="button" lay-submit lay-filter="login" @click="loginChecked()">登录</button>
					    </div>
					  </div>
				</form>
  		</div>
  		
  </div>
</template>

<script scoped>
//import VueInputCode from 'vue-input-code' 
export default {
	components:{
		//VueInputCode		
	},
  data () {
    return {
    	errorInfo: '',
			username:'',
			password:'',
			veryfiCode:'',
			//loginReturnData:{},
			identifyCodes: "1234567890",
      identifyCode:'1234',
      usernamePwd: false
    }
  },
  mounted (){
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {  
  	/*veriCodeCheck (){
  		console.log(this.veryfiCode+'-->'+this.identifyCode)
  		if(this.veryfiCode != this.identifyCode){
				//this.errorInfo = '验证码不对'
				return false
			}else{
				this.errorInfo = ''
				return true
			}
  	},*/
    loginChecked (){
    	let parm = {
	  		"username": this.username,
	  		"password": this.password
	  	}
			let baseParm = this.common.DataToBase64(JSON.stringify(parm))
			//console.log(parm)
			let _this = this
			
			//if(_this.veriCodeCheck()){
					this.$axios.post('/user_web/user/userLoginByPc?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
					  .then((res) => {
					  	
					  	let nowData = JSON.parse(this.common.base64ToData(res.data))
					  	console.log(JSON.stringify(nowData))
		
					  	if(nowData.code == 0){
								this.usernamePwd = true
								window.sessionStorage.setItem("userKey", nowData.result.userKey)									  											  		
					  		
					  		//_this.loginReturnData = nowData.result
					  		_this.common.LStorage.setItem("userPageInfo",nowData.result)
					  		console.log(_this.common.LStorage.getItem("userPageInfo").userKey)
					  		layer.msg('登录成功！')
					  		console.log(JSON.stringify(_this.loginReturnData))
					  		
					  		if(_this.usernamePwd/* && _this.veriCodeCheck()*/){
						  		_this.$emit('userSignIn', true)	     //收起登录窗口
				  			}
								
								for(let i=0; i<nowData.result.author.length; i++){
									nowData.result.author[i].url = nowData.result.author[i].url.replace(/\n/g,"")  //过滤掉url里的换行符
								}
								
								_this.common.SStorage.setItem("userId", nowData.result.userId)		/*保存用户个人信息*/
								_this.common.SStorage.setItem("author", nowData.result.author)		/*保存作者信息*/
								_this.common.SStorage.setItem("roleSn", nowData.result.roleSn)		/*保存用角色编码*/
								console.log(JSON.stringify(nowData.result.author))					
								
								_this.$router.push('/yjw_admin')
					    	window.location.reload()
					  	}else{	
					  		//this.errorInfo = '用户名或者密码不对'
					  		this.errorInfo = nowData.message
					  		console.log(nowData.message)
					  	}		  		
					  })
					  .catch((err) => {
					  	//this.errorInfo = '用户名或者密码不对'
					  	this.errorInfo = err
					    console.log(err);
					  })
			//}	
			
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  },
  created (){
  		let _this = this
	  	layui.use('form', function(){
			  var form = layui.form;
			  form.verify({
			  //我们既支持上述函数式的方式，也支持下述数组的形式
			  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
			  password: [
			    /^[\S]{6,24}$/,'密码必须6到12位，且不能出现空格'
			  ],
			  verifyCodeCheck: function(value){  
					if(value != _this.identifyCode){
						return '验证码错误!'; 
			      }
				},
			  usePwdCheck: function(value){  
					if(this.usernamePwd){
						return '用户名或者密码不对!'; 
			      }
				}
			}) 

		  form.on('submit(login)', function(data){//debugger
			  //console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
			  //console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
			  //console.log(_this.loginData) //当前容器的全部表单字段，名值对形式：{name: value}			  
			  return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
			})
		})
  	
	  
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login-dialog{
		
	}
	.login-head{
		border-left: 3px solid #63bdee; text-align: left; margin: 15px 0 0 15px; padding-left: 15px; color: #c2bfbf; line-height: 30px;
	}
	.login-body{
		padding: 40px 15px 15px 15px;
	}
	.login-dialog .layui-form-label{
		width: 20px; font-size: 25px; padding: 6px 15px 6px 0;
	}
	.login-dialog .layui-form-item{
		margin-bottom: 28px;
	}
	.login-dialog .layui-input-block{
		margin-left: 35px;
	}
	.login-btn{
		width: 379px; height: 39px; font-size: 24px; background-color: #62bdee; border-radius: 19px;
	}
	.login-dialog .layui-form-mid{
		padding: 0!important;
	}
</style>
