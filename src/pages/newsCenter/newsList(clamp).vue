<template>

	<div class="right-content">
		<div class="cont-top-box">
			<div class="float-left"><span class="font-18">新闻资讯</span> | <span class="font-12">News information</span></div>
			<ul class="mbx-nav float-right">
				<li>
					<router-link :to="{path: '/'}">
						<span class="font-weight">首页</span>
					</router-link>
					<i class="layui-icon layui-icon-right"></i>
				</li>
				<li>
					<router-link :to="{path: '/newsCenter/newsList'}">
						新闻中心
					</router-link>
					<i class="layui-icon layui-icon-right"></i>
				</li>
				<li><span>新闻资讯</span></li>
			</ul>
		</div>
		<div class="cont-bot-box">			
			<ul class="news-ul">				
				<li v-for="item in articleList">
					<div class="date-box float-left">
						<p>{{ item.policyTime | yearToMonth('day') }}</p>
						<p>{{ item.policyTime | yearToMonth('year-month') }}</p>
					</div>
					<div class="new-li-box float-right clear">
						<div class="float-left">
							<img v-if="item.img" :src="item.img"/>
							<img v-if="!item.img" src="../../assets/images/new-center/new-list-default-img.jpg"/>
						</div>
						<div class="news-brief float-right">
							<router-link :to="{path: '/newsInfo#here',query:{ 
									  id:item.id,
								classify:item.classify
								 }}">
								<p class="article-title" @click="returnBack" :title="item.title">{{ item.title }}</p>
							</router-link>
							<p class="article-cont" style="height: 57px;" :title="item.introduction">{{ item.introduction }}</p>
						</div>	
					</div>									
				</li>
				<li v-show="articleLength == 0" style="margin: 30px;">数据获取中...</li>
			</ul>
			<div class="pages clear">
				<ul>
					<li v-if="nowPage>1"><a @click="pageClick(1)">首页</a></li>
					<li v-if="nowPage==1"><a class="banclick">首页</a></li>
					<li v-if="nowPage>1"><a @click="nowPage--,pageClick()">上一页</a></li>
					<li v-if="nowPage==1"><a class="banclick">上一页</a></li>
					<li v-for="index in indexs"  v-bind:class="{ 'active': nowPage == index}" v-if="index <= Math.ceil(totalPage/pageNumber)">
						<a @click="btnClick(index)">{{ index }}</a>
					</li>
					<!--<li v-if="Math.ceil(totalPage/pageNumber) > 7">...</li>-->
					<li v-if="nowPage!=Math.ceil(totalPage/pageNumber)"><a @click="nowPage++,pageClick()">下一页</a></li>
					<li v-if="nowPage == Math.ceil(totalPage/pageNumber)"><a class="banclick">下一页</a></li>
					<li v-if="nowPage!=Math.ceil(totalPage/pageNumber)"><a @click="pageClick(Math.ceil(totalPage/pageNumber))">尾页</a></li>
					<li v-if="nowPage == Math.ceil(totalPage/pageNumber)"><a class="banclick">尾页</a></li>
					<li>共<a @click="pageClick(Math.ceil(totalPage/pageNumber))">{{ Math.ceil(this.totalPage/this.pageNumber) }}</a>页</li>
					<li>
						<span>转到第</span>
						<input type="number" v-model="nowPage" />
						<span>页</span>
					</li>					
				</ul>
			</div>
		</div>
	</div>	
	
</template>

<script>

export default{
	data(){
		return {
			articleList: [],
			articleLength: null,
			totalPage: 1, //总条数
        	nowPage: 1,	//当前页码
        	pageNumber: 5 //每页显示多少条
		}
	},
	computed: {
		indexs: function(){
          let left = 1;
          let right = this.totalPage;
          let arr = [];
          if(right >= 7){
            if(this.nowPage > 4 && this.nowPage < right - 3){
                    left = this.nowPage - 3
                    right = this.nowPage + 3
            }else{
                if(this.nowPage <= 4){
                    left = 1
                    right = 7
                }else{
                    right = this.totalPage
                    left = right - 6
                }
            }
         }
        while (left <= right){
            arr.push(left)
            left ++
        }
        return arr
       }
	},
	created(){
	  	this.getNewsList(this.nowPage)	  	
	},
	methods:{
		returnBack(){
	      	window.location.reload()
	    },
		btnClick (data){	//页码点击事件
            if(data != this.nowPage){
                this.nowPage = data 
            }
            this.getNewsList(this.nowPage)
        },
        pageClick (nowNum){
        	if(nowNum == 1){
        		this.nowPage = 1
        	}else if(nowNum == Math.ceil(this.totalPage/this.pageNumber)){
        		this.nowPage = Math.ceil(this.totalPage/this.pageNumber)
        	}
        	this.getNewsList(this.nowPage)
            console.log('现在在'+this.nowPage+'页');
        },
        getNewsList (){
			let parm = {
		  		'type':1,						//请求类型：0发布到首页的文章，1请求全部文章
		  		'pageNum':this.nowPage,  		//当前页
		  		'pageSize':this.pageNumber		//每页显示多少条条
		  	}
				console.log('--->'+JSON.stringify(parm))
				let baseParm = this.common.DataToBase64(JSON.stringify(parm))
				console.log(baseParm)
				let _this = this
		  	this.$axios.get('/wms_web/article/selectArticleinfo?data='+baseParm+'&sign='+this.GLOBAL.urlStr(parm))
			  .then((res) => {//debugger
			  	let nowData = JSON.parse(this.common.base64ToData(res.data))
			  	if(nowData.code == 0){		
			  		_this.articleList = nowData.result.list
			  		_this.articleLength = _this.articleList.length
			  		
			  		_this.totalPage = nowData.result.total
			  		
				    console.log(_this.totalPage);
				    console.log(Math.ceil(_this.totalPage/this.pageNumber))
			  		console.log(JSON.stringify(_this.articleList))			  		
			  	}else{
			  		console.log(nowData.message)
			  	}		  			    			    
			    
			  })
			  .catch((err) => {
			    console.log(err);
			  })
		}
	},
	mounted(){
		
	},
	watch: {
        nowPage: function(oldValue , newValue){
        	if(this.nowPage <= 0){
				this.nowPage = 1
			}
        	
        	this.getNewsList(this.nowPage)
        	
            console.log(arguments);
        },
        articleList: function(){
        	this.$nextTick(function(){
        		console.log("页面加载完成")
        		/*let title = document.getElementsByClassName('article-title')
        		let cont = document.getElementsByClassName('article-cont')
        		for(let i=0; i<title.length; i++){
        			$clamp(title[i],{clamp:1})
        		}
        		
        		for(let j=0; j<cont.length; j++){
        			$clamp(cont[j],{clamp:3})
        		}*/

        	})
        }
        
    }
}
</script>

<style scoped>
  	.cont-bot-box{
  		padding-top: 0px!important;
  	}	
  	.news-ul li{
  		overflow: hidden; padding: 20px 0; border-bottom: 1px dashed #e6e6e6;
  	}
  	.news-ul li:hover .date-box{
  		background-color: rgb(18,87,176);
  	}
	.news-ul li p a:hover{
		color: #1BB1FE;
	}
  	.news-ul li:last-child{
  		border-bottom: none;
  	}
  	.date-box{
		width: 66px; height: 66px; background-color: rgb(153,153,153); margin: 10px 15px 0 0; color: #fff; font-size: 12px;
	}
	.date-box p:first-child{
		font-size: 32px;
	}
	.news-brief{
		text-align: left; width: 422px; font-size: 14px; padding-left: 20px;
	}
	.news-brief p:first-child{
		font-size: 16px; margin-bottom: 10px;
	}
	.new-li-box .float-left{
		width: 188px; height: 92px;
	}
	.new-li-box .float-left img{
		width: 100%;
	}
	.pages{
		color: #606060; margin: 20px 0;
	}
	.pages ul{
		display: inline-block;
	}
	.pages ul li{
		float: left; margin-right: 5px; cursor: pointer;
	}
	.pages ul li.active a{
		color: #fbbe31;
	}
	.pages ul li a.banclick{
	    cursor:not-allowed;
	}
	.pages ul li:last-child{
		float: left; margin:0 5px 0 15px;
	}
	.pages ul li input{
		border: 1px solid #434343; width: 58px;
	}
	.pages ul li a:hover{
		color: #fbbe31;
	}
	.article-title{
		height: 23px; overflow: hidden;	
	}
	.article-cont{
		color: #747474; overflow: hidden;
	}
</style>