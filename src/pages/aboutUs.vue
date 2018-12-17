<template>
	<div>
		<!--banner图-->
		<div class="banner">
				<img src="../assets/images/about-us/gywm-nav.jpg"/>
		</div>
		<!--banner图-->
	  <div class="content">
	    	<!--左侧导航组件-->
	    	<column-list :menuList="menuList" :menuName="menuName" :nameToEn="nameToEn" @on-change-menu="menuChange"></column-list>
	    	
	    	<company-info v-if="menuId == 0"></company-info>
	    	<company-mission v-if="menuId == 1"></company-mission>
	    	<company-vision v-if="menuId == 2"></company-vision>
	    	<company-fulfillment v-if="menuId == 3"></company-fulfillment>
			
	  </div>
  </div>
</template>

<script>
import columnList from '../components/base/columnList'
import companyInfo from './aboutUs/companyInfo'		//企业简介
import companyMission from './aboutUs/companyMission'   //企业使命
import companyVision from './aboutUs/companyVision'   //企业愿景
import companyFulfillment from './aboutUs/companyFulfillment'   //企业成就感

export default {
  components: {
  	columnList,
  	companyInfo,
  	companyMission,
  	companyVision,
  	companyFulfillment
  },
  data () {
    return {
      menuId: 0,
      menuName: '关于我们',
      nameToEn: 'SUNSHINE PRODUCTS',
      menuList:[
	      {
	      	id:0,
	      	companyInfo:'企业简介',
	      	ruterLink:'/aboutUs/companyInfo'
	      },
	      /*{
	      	id:1,
	      	companyInfo:'企业使命',
	      	ruterLink:'/aboutUs/companyMission'
	      },
	      {
	      	id:2,
	      	companyInfo:'企业愿景',
	      	ruterLink:'/aboutUs/companyVision'
	      },
	      {
	      	id:3,
	      	companyInfo:'企业成就感',
	      	ruterLink:'/aboutUs/companyFulfillment'
	      }*/
      ]
    }
  },
  watch: {
    /*query () {
      this.getList()
    }*/
  },
  methods: {
    menuChange (obj){
      console.log(JSON.stringify(obj))
      this.menuId = obj.id
    }
  },
  mounted () {
    /*this.getList()*/
  }
}
</script>

<style scoped>

</style>
