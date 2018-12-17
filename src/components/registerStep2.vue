<template>
<!--内容部分-->
<div class="bg-register step2">
	<div class="content">
		<div class="clear">
			<div class="float-left blue-font">
				<i class="icon-register"></i>
				企业注册
			</div>
			<div class="float-right">
				<!--已有账号：<a href="" class="blue-font">立即登录</a>-->
				<router-link :to="{path: '/registerStep1'}" @click.native="refresh">	
					<span class="blue-font pointer">返回上一步</span>
				</router-link>
				<span class="now-login-icon"><i class="layui-icon layui-icon-right"></i></span>
			</div>
		</div>
		<div class="reg-step-icon clear">
			<ul class="clear">
				<li class="now-stap">
					<div>1</div>
					<p>企业管理员信息</p>
				</li>
				<li class="now-stap">
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
				<div class="reg2-box float-left">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>{{ companyNameTitle }}：</label>
					    <div class="layui-input-block">
					      <input type="text" name="companyName" required v-model="companyName"  lay-verify="required" placeholder="请输入企业名称" autocomplete="off" class="layui-input">
					    </div>
						</div>
				</div>
				<div class="reg2-box float-right">
						<div class="layui-form-item" v-if="isShowZc">
						    <label class="layui-form-label"><span class="red-font">*</span>纳税人识别号：</label>
						    <div class="layui-input-block">
						      <input type="text" name="taxpayerRegistrationNumber" required v-model="taxpayerRegistrationNumber"  lay-verify="required|nashuirenNumber" placeholder="请输入号码" autocomplete="off" class="layui-input">
						    </div>
					 	</div>
				</div>
				<div class="reg2-box float-left">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>{{ companyTypeTitle }}：</label>
					    <div class="layui-input-block">
					      <select name="companyType" lay-verify="companyType" v-model="companyTypeValue" lay-filter="companyTypeSel" class="company-type">
					        <option value="0">医疗机构</option>
					        <option value="1">经销商</option>
					        <option value="2">生产厂家</option>
					        <option value="3">监管机构</option>
					      </select>
					    </div>
						</div>
				</div>
				<div class="reg2-box float-right" style="position: relative;">
						<div class="layui-form-item" v-if="isShowZc">
						    <label class="layui-form-label"><span class="red-font">*</span>注册资金：</label>
						    <div class="layui-input-block">
						      <input type="number" name="registeredCapital" v-model="regMoney" required lay-verify="required|number|zczj" placeholder="请输入金额" autocomplete="off" class="layui-input" style="width: 120px;">
						      <span style="position: relative; top: -30px; left: 40px;">万元</span>
						    </div>
					 	</div>
					 	<div class="zjlx" v-if="isShowZc">
							<el-select v-model="registeredType" placeholder="请选择" @change="seleRegisterMoney">
							    <el-option
							      v-for="item in registeredTypeList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						  	</el-select>
					 	</div>			 	
				</div>
				<div class="reg2-box float-left" v-show="isShowJgxq">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>监管辖区等级：</label>
					    <div class="layui-input-block">
					      <select name="jgAreaLevel" id="jgjgData" lay-verify="areaLevel" v-model="jgAreaLevelValue" lay-filter="jgAreaLevelSel" class="jgarea-type layui-form">
					        <option value="0">国家</option>
					        <option value="1">省</option>
					        <option value="2">市</option>
					        <option value="3">区</option>
					      </select>
					    </div>
						</div>
				</div>
				<div class="reg2-box float-right" v-show="isShowJgxq"></div>
				<div class="reg2-box float-left" lay-filter="" style="height: 180px; width: 60%;" v-show="isShowJyfw">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>经营范围：</label>
					    <div class="layui-input-block layui-form" style="width: 226px;" lay-verify="checkbox">
					    	<input type="checkbox" name="oneClass" title="Ⅰ类" lay-filter="one" lay-skin="primary">	
					    	<input type="checkbox" name="twoClass" title="Ⅱ类" lay-filter="two" lay-skin="primary">	
					    	<input type="checkbox" name="threeClass" title="Ⅲ类" lay-filter="three" lay-skin="primary">					     			      
					    </div>
					    <textarea name="businessScopeDesc" placeholder="请输入内容" v-model="businessScopeDesc" class="layui-textarea" style="position: relative; left: 162px;"></textarea>
						</div>
				</div>
				<div class="reg2-box float-left layui-form" lay-filter="selectLinkage" style="height: 180px; width: 60%;">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>{{ companyAddressTitle }}：</label>
					    <div class="layui-input-block layui-form" style="position: relative;">
					    	<select name="province" id="province" v-model="province" lay-filter="provSel" class="first-sele">
						        <option v-for="item in prvList" :value="item.code">{{ item.fullName }}</option>
						    </select>	
						    <select name="city" id="city" lay-filter="citySel" v-model="cigyValue" class="second-sele">	
						    </select>
						    <select name="locationId" id="area" lay-verify="area" v-model="areaValue" lay-filter="areaSel" class="third-sele">
						    </select>  			      
					    </div>
					    <textarea name="location" placeholder="请输入内容" lay-verify="required" v-model="location" class="layui-textarea" style="position: relative; left: 162px;"></textarea>
						</div>
				</div>
				
				<div class="reg2-box float-right"></div>
				<div class="reg2-box float-left">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>{{ companyFarenTitle }}：</label>
					    <div class="layui-input-block">
					      <input type="text" name="legalPerson" required v-model="legalPerson" lay-verify="required" placeholder="请输入企业法人" autocomplete="off" class="layui-input">
					    </div>
						</div>
				</div>
				<!--<div class="reg2-box float-right"></div>-->
				<div class="reg2-box float-left">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>{{ companyFristTitle }}：</label>
					    <div class="layui-input-block">
					      <input type="text" name="contactPerson1" required v-model="contactPerson1" lay-verify="required" placeholder="请输入联系人" autocomplete="off" class="layui-input">
					    </div>
						</div>
				</div>
				<div class="reg2-box float-right">
						<div class="layui-form-item">
					    <label class="layui-form-label"><span class="red-font">*</span>联系方式：</label>
					    <div class="layui-input-block">
					      <input type="text" name="phone1" required v-model="phone1" lay-verify="required|phone" placeholder="请输入手机号作为账号" autocomplete="off" class="layui-input">
					    </div>
					 	</div>
				</div>
				<div class="reg2-box float-left">
						<div class="layui-form-item">
					    <label class="layui-form-label">{{ companyScondeTitle }}：</label>
					    <div class="layui-input-block">
					      <input type="text" name="contactPerson2" lay-verify="" v-model="contactPerson2" placeholder="请输入联系人" autocomplete="off" class="layui-input">
					    </div>
						</div>
				</div>
				<div class="reg2-box float-right">
						<div class="layui-form-item">
					    <label class="layui-form-label">联系方式：</label>
					    <div class="layui-input-block">
					      <input type="text" name="phone2" lay-verify="phone_main" v-model="phone2" placeholder="请输入手机号作为账号" autocomplete="off" class="layui-input">
					    </div>
					 	</div>
				</div>
				<div class="reg2-box float-left">
						<div class="layui-form-item">
					    <label class="layui-form-label">{{ companyThredTitle }}：</label>
					    <div class="layui-input-block">
					      <input type="text" name="contactPerson3" placeholder="请输入联系人" v-model="contactPerson3" autocomplete="off" class="layui-input">
					    </div>
						</div>
				</div>
				<div class="reg2-box float-right">
						<div class="layui-form-item">
					    <label class="layui-form-label">联系方式：</label>
					    <div class="layui-input-block">
					      <input type="text" name="phone3" lay-verify="phone_main" v-model="phone3" placeholder="请输入手机号作为账号" autocomplete="off" class="layui-input">
					    </div>
					 	</div>
				</div>
	
			  <button class="layui-btn next-stap" type="button" lay-submit lay-filter="formDemo">下一步</button>
	
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
			registeredType: 0,
			registeredTypeList: [
				{
		          value: 0,
		          label: '¥'
		       },
				{
		          value: 1,
		          label: '$'
		       },
			],
			companyNameTitle: '企业名称',
			companyTypeTitle: '企业类型',
			companyAddressTitle: '企业地址',
			companyFarenTitle: '企业法人',
			companyFristTitle: '企业第一联系人',
			companyScondeTitle: '企业第二联系人',
			companyThredTitle: '企业第三联系人',
	      	 provSelect: '',
	      	 citySelect: '',
      		 prvList:[],
      		 cityList:[],
      		 areaList:[],
      		 companyName: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").companyName : "",     //企业名称
      		 taxpayerRegistrationNumber: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").taxpayerRegistrationNumber : "",     //注册号
      		 companyTypeValue: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").companyType : null,    			//企业类型
      		 jgAreaLevelValue: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").property : "",			//监管辖区等级
      		 regMoney: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").registeredCapital : "",					//注册资金
      		 businessScopeDesc: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").businessScopeDesc : "",					//注册资金		
      		 isShowJyfw: true,		
      		 isShowJgxq: false,		//控制监管辖区显示
      		 isShowZc: this.common.LStorage.getItem("compInfo") && this.common.LStorage.getItem("compInfo").companyType == 3 ? false : true,		//控制注册资金和纳税人识别号显示
      		 jgjg: this.common.LStorage.getItem("compInfo") && this.common.LStorage.getItem("compInfo").companyType == 3 ? true : false,
      		 //companyTypeValue: null,
      		 province: null,		//省编号
			 cigyValue: null,		//市编号
      		 areaValue: null,		//区编号
      		 location: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").location : "",		//区编号
      		 legalPerson: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").legalPerson : "",		
      		 contactPerson1: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").contactPerson1 : "",		
      		 contactPerson2: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").contactPerson2 : "",		
      		 contactPerson3: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").contactPerson3 : "",		
      		 phone1: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").phone1 : "",		
      		 phone2: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").phone2 : "",		
      		 phone3: this.common.LStorage.getItem("compInfo") ? this.common.LStorage.getItem("compInfo").phone3 : "",		
    	}
	},
	methods: {
		seleRegisterMoney(v){
			console.log(v)
		},
		refresh(){
	　　　　　　this.$router.go(0);  
	　　　},
		defaultShowJyfwBox(){
			console.log(this.companyTypeValue)		
			if(this.companyTypeValue == 1 || this.companyTypeValue == 2){ 	//控制经营范围显示(经销商和生产厂家)
				this.isShowJyfw = true
			}else{
				this.isShowJyfw = false
			}
		},
		defaultShowJgjgBox(){
			console.log(this.jgAreaLevelValue)
			if(this.jgAreaLevelValue == ''){
				this.isShowJgxq = false
			}else{
				this.isShowJgxq = true
			}
		},
		defaultShowJyfwCheckbox(){
			if(this.common.LStorage.getItem("compInfo")){
				if(this.common.LStorage.getItem("compInfo").businessScope == 'Ⅰ类')
				{
					$('input[name="oneClass"]').attr('checked',true)
					$('input[name="twoClass"]').attr('checked',false)
					$('input[name="threeClass"]').attr('checked',false)
				}
				else if(this.common.LStorage.getItem("compInfo").businessScope == 'Ⅱ类')
				{
					$('input[name="oneClass"]').attr('checked',false)
					$('input[name="twoClass"]').attr('checked',true)
					$('input[name="threeClass"]').attr('checked',false)
				}
				else if(this.common.LStorage.getItem("compInfo").businessScope == 'Ⅲ类')
				{
					$('input[name="oneClass"]').attr('checked',false)
					$('input[name="twoClass"]').attr('checked',false)
					$('input[name="threeClass"]').attr('checked',true)
				}
				else if(this.common.LStorage.getItem("compInfo").businessScope == 'Ⅰ类,Ⅱ类')
				{
					$('input[name="oneClass"]').attr('checked',true)
					$('input[name="twoClass"]').attr('checked',true)
					$('input[name="threeClass"]').attr('checked',false)
				}
				else if(this.common.LStorage.getItem("compInfo").businessScope == 'Ⅰ类,Ⅲ类')
				{
					$('input[name="oneClass"]').attr('checked',true)
					$('input[name="twoClass"]').attr('checked',false)
					$('input[name="threeClass"]').attr('checked',true)
				}
				else if(this.common.LStorage.getItem("compInfo").businessScope == 'Ⅱ类,Ⅲ类')
				{
					$('input[name="oneClass"]').attr('checked',false)
					$('input[name="twoClass"]').attr('checked',true)
					$('input[name="threeClass"]').attr('checked',true)
				}
				else if(this.common.LStorage.getItem("compInfo").businessScope == 'Ⅰ类,Ⅱ类,Ⅲ类')
				{
					$('input[name="oneClass"]').attr('checked',true)
					$('input[name="twoClass"]').attr('checked',true)
					$('input[name="threeClass"]').attr('checked',true)
				}				
			}
		}
	},
	mounted (){
		let _this = this
		
		this.defaultShowJyfwBox()		//控制经营范围显示(经销商和生产厂家)
		this.defaultShowJgjgBox()		//控制监管辖区显示(监管机构)
		this.defaultShowJyfwCheckbox()		//控制经营范围显示(经销商和生产厂家)
		
		layui.use('form', function(){
		  	var form = layui.form;

			form.render();
			
			form.verify({	
				  zczj: [
				    /^[\S]{1,6}$/,'注册资金不能超过6位'
				  ],
				  nashuirenNumber: function(value, item){
				  	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");  
				  	if(reg.test(value))
					{
						return '纳税人识别号不能有中文'
					}
				  },
				  companyType: function(value, item){ //value：表单的值、item：表单的DOM对象			    
				    if(!_this.companyTypeValue){
				    	return '请选择企业类型'
				    }
				  },
				  area: function(value, item){ //value：表单的值、item：表单的DOM对象			    
				    if(!_this.areaValue){
				    	return '请选择企业地址'
				    }
				  },
				  phone_main: function(value, item){ //value：表单的值、item：表单的DOM对象
				  	//debugger				    
				    if(value == ''){
				    	return
				    }else{
				    	
				    	if(!/^1\d{10}$/.test(value)){
					      return '请输入正确的手机号';
					    }
				    }
				  },
				  checkbox: function(value, item){ //value：表单的值、item：表单的DOM对象
				  	if($(".layui-form-checked").length == 0 && _this.isShowJyfw == true){
				  		return '请选择经营范围';
				  	}
				  	console.log("经营范围选择数:"+$(".layui-form-checked").length)
				  },
				  areaLevel: function(value, item){ //value：表单的值、item：表单的DOM对象
				  	if(value == null && _this.isShowJgxq == true){
				  		return '请选择监管辖区';
				  	}
				  }
			}) 
			
//初步加载省级数据
		let parm = {
	  		'type':1,
	  		'parentCode':100000
	  	}
		let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
		console.log(baseParm)
			
		_this.$axios.get('/wms_web/regionSelect?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
		  .then((res) => {
		  	
		  	let nowData = JSON.parse(_this.common.base64ToData(res.data))
			
		  	if(nowData.code == 0){	
		  		_this.prvList = nowData.result.data   //provSelect
		  		this.provSelect = `<option value="-1">请选择</option>`
		  		for(let i = 0; i <_this.prvList.length; i++){
		  			this.provSelect += `<option value="${_this.prvList[i].code}">${_this.prvList[i].fullName}</option>`
		  		}
		  		//console.log('--->'+this.provSelect)
		  		$("#province").append(this.provSelect);
		  		form.render('select','selectLinkage');
		  		console.log(JSON.stringify(_this.prvList))
		  	}else{
		  		console.log(nowData.message)
		  	}		  			
		  })
		  .catch((err) => {
		    console.log(err);
		  })
		//初步加载省级数据end
			
//监听企业类型下拉框选中事件			
			form.on('select(companyTypeSel)', function(data){
				_this.companyTypeValue = data.value
				console.log(data.value); //得到被选中的值

				if(data.value == 0){			//医院
					_this.companyNameTitle = '企业名称'
					_this.companyTypeTitle = '企业类型'
					_this.companyAddressTitle = '企业地址'
					_this.companyFarenTitle = '企业法人'
					_this.companyFristTitle = '企业第一联系人'
					_this.companyScondeTitle = '企业第二联系人'
					_this.companyThredTitle = '企业第三联系人'
					
					_this.jgjg = false
					_this.isShowZc = true		//显示注册资金和纳税人识别号
					_this.isShowJyfw = false
					_this.isShowJgxq = false
										
				}else if(data.value == 3){		//监管机构
					_this.companyNameTitle = '监管机构名称'
					_this.companyTypeTitle = '机构类型'
					_this.companyAddressTitle = '机构地址'
					_this.companyFarenTitle = '监管机构负责人'
					_this.companyFristTitle = '监管机构第一负责人'
					_this.companyScondeTitle = '监管机构第二负责人'
					_this.companyThredTitle = '监管机构第三负责人'
					
					_this.jgjg = true
					_this.isShowZc = false		//显示注册资金和纳税人识别号
					_this.isShowJgxq = true		//显示监管辖区
					_this.isShowJyfw = false	//隐藏经营范围
				}else{
					_this.companyNameTitle = '企业名称'
					_this.companyTypeTitle = '企业类型'
					_this.companyAddressTitle = '企业地址'
					_this.companyFarenTitle = '企业法人'
					_this.companyFristTitle = '企业第一联系人'
					_this.companyScondeTitle = '企业第二联系人'
					_this.companyThredTitle = '企业第三联系人'
					
					_this.jgjg = false	
					_this.isShowZc = true		//显示注册资金和纳税人识别号
					_this.isShowJgxq = false
					_this.isShowJyfw = true
					
				}

			})
			
//监听监管辖区下拉框选中事件			
			form.on('select(jgAreaLevelSel)', function(data){
				//console.log(data.value); //得到被选中的值
				_this.jgAreaLevelValue = data.value
				console.log(_this.jgAreaLevelValue)
			})
			
//监听省级下拉框选中事件
		    form.on('select(provSel)', function(data){
			  console.log(data.value); //得到被选中的值
			  
			 	$("#area").empty()  //清空区级选项	
			 		 	
			  //加载市级数据	
			  let parm = {
			  		'type':2,
			  		'parentCode':data.value
			  	}
				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
				_this.$axios.get('/wms_web/regionSelect?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	
				  	let nowData = JSON.parse(_this.common.base64ToData(res.data))

				  	if(nowData.code == 0){						
						
				  		_this.cityList = nowData.result.data
				  		this.citySelect = `<option value="-1">请选择</option>`
				  		for(let i = 0; i <_this.cityList.length; i++){
				  			this.citySelect += `<option value="${_this.cityList[i].code}">${_this.cityList[i].fullName}</option>`
				  		}
				  		console.log('--->'+this.citySelect)
				  		$("#city").empty();
				  		$("#city").append(this.citySelect);
				  		form.render('select','selectLinkage');
						
						console.log(JSON.stringify($("#city").next().find("input")))
			 			$("#city").next().find("input").css("color","#C2BFBF")
						
				  		console.log(JSON.stringify(_this.cityList))
				  	}else{
				  		console.log(nowData.message)
				  	}		  			
				  })
				  .catch((err) => {
				    console.log(err);
				  })
				//加载市级数据end  
			});
			
//监听市级下拉框选中事件
		    form.on('select(citySel)', function(data){
			  console.log(data.value); //得到被选中的值			  	
			  //加载区级数据	
			  let parm = {
			  		'type':3,
			  		'parentCode':data.value
			  	}
				let baseParm = _this.common.DataToBase64(JSON.stringify(parm))
				console.log(parm)
					
				_this.$axios.get('/wms_web/regionSelect?data='+baseParm+'&sign='+_this.GLOBAL.urlStr(parm))
				  .then((res) => {
				  	
				  	let nowData = JSON.parse(_this.common.base64ToData(res.data))

				  	if(nowData.code == 0){		
				  		_this.areaList = nowData.result.data
				  		let areaSelect = `<option value="-1">请选择</option>`
				  		for(let i = 0; i <_this.areaList.length; i++){
				  			areaSelect += `<option value="${_this.areaList[i].code}">${_this.areaList[i].fullName}</option>`
				  		}
				  		console.log('--->'+areaSelect)
				  		$("#area").empty();
				  		$("#area").append(areaSelect);
				  		form.render('select','selectLinkage');

				  		console.log(JSON.stringify(_this.areaList))
				  	}else{
				  		console.log(nowData.message)
				  	}		  			
				  })
				  .catch((err) => {
				    console.log(err);
				  })
				//加载区级数据end  
				
			});
			
//监听区级下拉框选中事件
		    form.on('select(areaSel)', function(data){
		    	_this.areaValue = data.value
		    	console.log(data.value); //得到被选中的值
		    })
		    
		  	//监听提交
			form.on('submit(formDemo)', function(data){
				if(data.field.registeredCapital > 0 || _this.isShowZc == false){
					console.log(JSON.stringify(data.field))
					let businessScope = ""
					if(data.field.oneClass == "on" && data.field.twoClass == "on" && data.field.threeClass == "on"){
						businessScope = "Ⅰ类,Ⅱ类,Ⅲ类"
					}else if(data.field.oneClass == "on" && data.field.twoClass == "on"){
						businessScope = "Ⅰ类,Ⅱ类"
					}else if(data.field.oneClass == "on" && data.field.threeClass == "on"){
						businessScope = "Ⅰ类,Ⅲ类"
					}else if(data.field.twoClass == "on" && data.field.threeClass == "on"){
						businessScope = "Ⅱ类,Ⅲ类"
					}else if(data.field.oneClass == "on"){
						businessScope = "Ⅰ类"
					}else if(data.field.twoClass == "on"){
						businessScope = "Ⅱ类"
					}else if(data.field.threeClass == "on"){
						businessScope = "Ⅲ类"
					}
					
					//isShowJyfw: true,		经营范围
      				// isShowJgxq: false,		//控制监管辖区显示
					let companyList = {
								   "companyName": data.field.companyName,
				        		   "legalPerson": data.field.legalPerson,
				    "taxpayerRegistrationNumber": data.field.taxpayerRegistrationNumber,
				    			"registeredType": _this.registeredType,
				        		   "companyType": _this.companyTypeValue,
				        	 "registeredCapital": data.field.registeredCapital,
				        		 "businessScope": _this.isShowJyfw == true? businessScope : '',
				        	 "businessScopeDesc": _this.isShowJyfw == true? data.field.businessScopeDesc : '',
				       				"locationId": data.field.locationId,
				        			  "location": data.field.location,
				       			"contactPerson1": data.field.contactPerson1,
				        				"phone1": data.field.phone1,
				        		"contactPerson2": data.field.contactPerson2,
				        				"phone2": data.field.phone2,
				        		"contactPerson3": data.field.contactPerson3,
				        				"phone3": data.field.phone3,
				        			  "property": _this.isShowJgxq == true? _this.jgAreaLevelValue : ''
					}
					console.log(JSON.stringify(companyList))
				    _this.common.LStorage.setItem("compInfo",companyList)

					_this.$router.push({ path: 'registerStep3', query: { isJgjg: _this.jgjg }})
				    window.location.reload()
				    return false;
				}else{
					layer.msg('注册金额需大于零！')
				}
				
			});
		})
	},
	watch: {
		/*companyTypeValue(val, oldVal){			
			this.cityList = val
			console.log(JSON.stringify(this.val))
		}*/
	}
}	
</script>

<style scoped>
.content{
	/*height: 1010px;*/
	padding-bottom: 50px;
}	
</style>

/*这里加上scoped页面省级联动会出样式问题*/
<style>  
.zjlx{
	position: absolute;
    top: 0px;
    left: 100px;
    width: 50px;
    height: 36px;   
}
.zjlx .el-input__inner{
	padding-left: 10px;
	padding-right: 0px; 
	height: 38px; 
}

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
		width: 1040px; margin: 6px auto 0px; padding: 15px 30px; overflow: hidden; background-color: #fff;
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
		width: 800px; margin: 0 auto;
	}
	.reg2-box{
		width: 48%; height: 60px; 
	}
	.step2 .layui-form-label{
		width: auto; color: #5f5f5f; padding-right: 0px;
	}
	.step2 .layui-input-block {
	    margin-left: 162px; height: 59px; position: relative;
	}
	.step2 .layui-input-block p{
	    text-align: left;
	}
	.step2 .layui-form-item {
	    
	}
	.step2 .layui-form-item input{
	    width: 338px; 
	} 
	.step2 .layui-form-item input{
	    width: 190px;
	}
	.step2 .layui-form-select .layui-edge{
		right: 45px;
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
	.first-sele + .layui-form-select,.company-type + .layui-form-select{
		width: 190px;
	}
	.first-sele + .layui-form-select .layui-edge{
		right: 13px;
	}
	.company-type + .layui-form-select .layui-edge{
		right: 13px;
	}
	.second-sele + .layui-form-select{
		position: absolute; left: 200px; top: 0px;
	}
	.second-sele + .layui-form-select .layui-edge{
		right: 12px;
	}
	.third-sele + .layui-form-select{
		position: absolute; left: 400px; top: 0px;
	}
	.third-sele + .layui-form-select .layui-edge{
		right: 12px;
	}	

</style>