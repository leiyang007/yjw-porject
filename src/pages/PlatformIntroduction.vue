<template>
  <div>
    <!--banner图-->
		<div class="banner">
				<img src="../assets/images/ptjs/ptjs-nav.jpg"/>
		</div>
		<!--banner图-->
		
		<!--内容部分-->
		<div class="content">
			
			<!--左侧导航组件-->
	    	<column-list :menuList="menuList" :menuName="menuName" :nameToEn="nameToEn" @on-change-menu="menuChange"></column-list>
	    	
			<platform-info v-if="menuId == 0"></platform-info>
		</div>
		<!--内容部分-->
  </div>
</template>

<script>
import columnList from '../components/base/columnList'
import platformInfo from './platformIntroduction/platformInfo'		//平台简介

export default {
  components: {
    columnList,
    platformInfo
  },
  data () {
    return {
      menuId: 0,
      menuName: '平台介绍',
      nameToEn: 'PLATFORM PROFILE',
      menuList:[
	      {
	      	id:0,
	      	companyInfo:'平台简介',
	      	ruterLink:'/platformIntroduction/platformInfo'
	      }
      ]
    }
  },
  watch: {
    
  },
  methods: {
    menuChange (obj){
      console.log(JSON.stringify(obj))
      this.menuId = obj.id
    }
  },
  mounted () {
    //this.getList()
  }
}
</script>

<style scoped>
	
</style>