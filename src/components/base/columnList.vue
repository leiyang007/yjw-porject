<template>
	<div class="left-slider-bar">
		<div class="column-title">
			<h3 class="font-16">{{ menuName }}</h3>
			<p class="font-10">{{ nameToEn }}</p>
		</div>
		<div class="cloum-list">
			<ul>
				<li :class="{'high-light':index == nowIndex}" v-for="(item,index) in menuList" @click="chooseMenu(index)">
					<router-link :to="item.ruterLink">
						<div>{{ item.companyInfo }}</div><span>+</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="kefu-img-box">
			<img src="../../assets/images/about-us/gywm-img2.jpg"/>
			<div class="kefu-munber">
				<p>客户服务热线：</p>
				<p>027-86695030</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
  	menuName: {
  		default: '关于我们'
  	},
  	nameToEn: {
  		default: 'SUNSHINE PRODUCTS'
  	},
    menuList: {
      type: Array,
      default: [{
      	id:0,
        companyInfo:'企业简介',
	    ruterLink:'/aboutUs/companyInfo'
      }]
    }
  },
  data () {
    return {	
      nowIndex: 0
    }
  },
  methods: {
    chooseMenu (index) {
    	console.log(index)
      this.nowIndex = index
      this.$emit('on-change-menu', this.menuList[this.nowIndex])
    }
  }
}	
</script>

<style>
</style>