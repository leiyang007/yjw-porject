<template>
  <div class="dialog-div">
    <div class="dialog-wrap">
      <div class="dialog-cover" v-if="isShow"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="closeMyself1"><i class="layui-icon layui-icon-close"></i></p>
          <slot>empty</slot>
          
          <div class="login-foot clear">
		  			<!--<div class="float-left layui-form">
		  					<input type="checkbox" name="checkbox" id="male" value="1" style="display: inline-block;" />
		  					<label class="gray-font pointer" style="margin-left: 5px;" for="male">下次自动登录</label>
		  			</div>-->
		  			<div class="float-right" @click="closeMyself2">
		  				<router-link :to="{path: '/registerStep1'}">
		  					<span style="color: #379dd2;" @click="zhuxiaoLs">还没账号，前去注册>></span>
		  				</router-link>	
		  			</div>     			
		  		</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
      checked: true
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
  	zhuxiaoLs(){
  		if(this.common.LStorage.getItem("userInfo")){
  			this.common.LStorage.removeItem("userInfo")
  		}
  		if(this.common.LStorage.getItem("userLogin")){
  			this.common.LStorage.removeItem("userLogin")
  		}
  		if(this.common.LStorage.getItem("compInfo")){
  			this.common.LStorage.removeItem("compInfo")
  		}
  		if(this.common.LStorage.getItem("compDocument")){
  			this.common.LStorage.removeItem("compDocument")
  		}
  		if(this.common.LStorage.getItem("compDocumentInfos")){
  			this.common.LStorage.removeItem("compDocumentInfos")
  		}
  		if(this.common.LStorage.getItem("registerData")){
  			this.common.LStorage.removeItem("registerData")
  		}
  		if(this.common.LStorage.getItem("userPageInfo")){
  			this.common.LStorage.removeItem("userPageInfo")
  		}
  	},
    closeMyself1 () {
      this.$emit('on-close')
      //this.$store.commit('showRegister', false) 
    },
    closeMyself2 () {
      this.$emit('on-close')
      this.$store.commit('showRegister', false) 
      window.location.reload()
    }
  },
  created (){
	  	layui.use('form', function(){
			  var form = layui.form;		  
		})
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 425px;
  /*height: 430px;*/
  position: fixed;
  /*max-height: 50%;*/
  overflow: auto;
  background: #fff;
  top: 23%;
  left: 50%;
  margin-left: -213px;
  z-index: 10;
  /*border: 2px solid #464068;*/
  padding: 15px;
  line-height: 1.6;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  color: #666;
  line-height: 20px;
  font-size: 20px;
}
.dialog-close:hover {
  color: #4fc08d;
}

	.login-foot{
		
	}
	.dialog-div .layui-layer-msg{
		top: 410px!important;
	}

</style>
