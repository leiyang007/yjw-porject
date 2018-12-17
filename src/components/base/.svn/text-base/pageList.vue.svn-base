<template>
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
			<li>共<a @click="pageClick(Math.ceil(totalPage/pageNumber))">{{ totalPage }}</a>页</li>
			<li>
				<span>转到第</span>
				<input type="number" v-model="nowPage" />
				<span>页</span>
			</li>					
		</ul>
	</div>
</template>

<script>
export default{
	props: {
		articleList: {
			default: []
		},
		totalPage: {
			default: 1
		}, //总页数
        nowPage: {
			default: 1
		},	//当前页码
        pageNumber: {
        	default: 1
        } //每页显示多少条
	 },
	data () {
    	return {	
      		//nowNun: 0
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
		btnClick (data){	//页码点击事件
			this.data = data
            if(this.data != this.nowPage){
                this.nowPage = this.data 
            }
            this.getNewsList(this.nowPage)
        },
        pageClick (nowNum){
        	this.nowNum = nowNum
        	if(this.nowNum == 1){
        		this.nowPage = 1
        	}else if(this.nowNum == Math.ceil(this.totalPage/this.pageNumber)){
        		this.nowPage = Math.ceil(this.totalPage/this.pageNumber)
        	}
        	this.getNewsList(this.nowPage)
            console.log('现在在'+this.nowPage+'页');
        }
	},
	mounted(){

	}/*,
	watch: {
        nowPage: function(oldValue , newValue){
        	this.getNewsList(this.nowPage)
            console.log(arguments);
        }
    }*/
}	
</script>

<style scoped>
	.pages{
		color: #606060;
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
</style>