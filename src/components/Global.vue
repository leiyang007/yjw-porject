
<script>
/*
 * 全局公用常量和方法
 * author by leiyang	2018.06.05
 * */
	import md5 from 'js-md5'
	import base64 from 'js-base64'
	
	const uploadUrl = 'http://192.168.1.2:8080/product-web/conmonFunc/upload'		//全局配置上传地址
	//const uploadUrl = 'http://116.62.241.107:8080/product-web/conmonFunc/upload'		//全局配置上传地址
	
	let Base64 = require('js-base64').Base64
	let userKey = window.localStorage.getItem("userPageInfo")? md5(JSON.parse(window.localStorage.getItem("userPageInfo")).userKey) : null		//获取用户userKey
	let loginState = false
	let showRegister = true
	let userid = window.sessionStorage.getItem("userId")		//获取用户ID
	let pageSize = 10
	/*let parm = {
		'name':'lei',
		'age':'27'
	}*/
	//parm = JSON.stringify(parm)
	/*console.log(Base64.encode(parm))
	console.log(userKey)
	console.log(md5(Base64.encode(parm)+userKey))*/
	console.log(userKey)
	  export default
	  {
	    userKey,  //接口访问签名
	    userid,
	    showRegister,
	    uploadUrl,
	    pageSize,
	    urlStr : (parm)=>{
	    	let	url = md5(Base64.encode(JSON.stringify(parm))+userKey)
	    	return url;
	    },
	    judgeCode: (thisCode)=>{
	    	if(thisCode == '0'){
	    		loginState = true
	    	}else{
	    		loginState = false
	    	}
	    	return loginState
	    }
	  }
</script>
