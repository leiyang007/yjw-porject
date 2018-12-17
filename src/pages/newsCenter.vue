<template>
  <div>
    <!--banner图-->
		<div class="banner">
				<img src="../assets/images/new-center/new-center-nav.jpg"/>
		</div>
		<!--banner图-->
		
		<!--内容部分-->
		<div class="content">
			
			<!--左侧导航组件-->
	    	<column-list :menuList="menuList" :menuName="menuName" :nameToEn="nameToEn" @on-change-menu="menuChange"></column-list>
	    	<keep-alive>
					<news-list v-if="menuId == 0"></news-list>
				</keep-alive>
	    	<info-disclosure v-if="menuId == 1"></info-disclosure>
		</div>
		<!--内容部分-->
  </div>
</template>

<script>
import columnList from '../components/base/columnList'
import newsList from './newsCenter/newsList'		//新闻资讯
import infoDisclosure from './newsCenter/infoDisclosure'   //信息公开

export default {
  components: {
    columnList,
    newsList,
    infoDisclosure
  },
  data () {
    return {
      menuId: 0,
      menuName: '新闻中心',
      nameToEn: 'INFORMATION CENTRES',
      menuList:[
	      {
	      	id:0,
	      	companyInfo:'新闻资讯',
	      	ruterLink:'/newsCenter/newsList'
	      },
	      /*{
	      	id:1,
	      	companyInfo:'信息公开',
	      	ruterLink:'/newsCenter/infoDisclosure'
	      }*/
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
