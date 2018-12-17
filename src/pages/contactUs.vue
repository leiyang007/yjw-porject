<template>
  <div>
		<!--banner图-->
		<div class="banner">
				<img src="../assets/images/lx-us/lx-us-nav.jpg"/>
		</div>
		<!--banner图-->
		
		<!--内容部分-->
		<div class="content">
			
			<!--左侧导航组件-->
	    	<column-list :menuList="menuList" :menuName="menuName" :nameToEn="nameToEn" @on-change-menu="menuChange"></column-list>
	    	
	    	<contact-us-info v-if="menuId == 0"></contact-us-info>
						
		</div>	
		<!--内容部分-->
  </div>
</template>

<script>
import columnList from '../components/base/columnList'
import contactUsInfo from './contactUs/contactUsInfo'   //联系我们
export default {
  components: {
		columnList,
		contactUsInfo
  },
  data () {
    return {
      menuId: 0,
      menuName: '联系我们',
      nameToEn: 'ABOUT US',
      menuList:[
	      {
	      	id:0,
	      	companyInfo:'联系我们',
	      	ruterLink:'/contactUs/contactUsInfo'
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
  	.lx-text-list ul li{
  		text-align: left; margin-bottom: 35px;
  	}
  	.lx-text-list ul li p i{
  		margin-right: 10px;
  	}
</style>
