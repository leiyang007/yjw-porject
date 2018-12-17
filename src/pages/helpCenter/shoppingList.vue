<template>
	<div class="clear">
		<span class="title float-left">购物流程</span>
		<div class="article">
			<p>采购员在采购页面上搜索需要采购的产品的信息，选择产品添加到订单中心。采购分为两种模式，一种是医院向经销商采购，这种方式需要经销商维护与医院的客商关系，第二种是经销商向生产厂家采购，这种方式下经销商可以采购平台所有生产厂家的产品。</p>

			<div>方式一：</div>
			    <p>经销商向生产厂家购买商品时，可以采购平台生产厂家的所有商品；采购员可以在搜索框内输入商品名称，也可以在输入框下选中对应的搜索条件，点击搜索按钮，页面根据搜索条件查询出对应的商品信息。</p>
			<div>方式二：</div>
			    <p> 医疗机构向经销商采购，可以采购与自身建立客商关系的经销商的商品；采购员可以在搜索框内输入商品名称，也可以在输入框下选中对应的搜索条件，点击搜索按钮，页面根据搜索条件查询出对应的经销商的客商关系中的商品信息。数据列表中的中标号需要根据采购单位所在的地区进行筛选，如果没有筛选结果，显示为空。</p>
			
			<div>订货：</div>
			    <p>采购单位可以在列表中点击销售单位的名字，可以在新窗口打开该企业的企业信息；同时采购单位可以填入商品的价格或数量信息。</p>
			    <p>采购单位勾选数据列表中的商品，点击“批量订货”，将选中的多个商品信息添加到订单中心中.</p>
			    <p>“订货”按钮，每次订购一个商品。</p>
			    <p>交易完成后可以在订单中查看物流的信息。</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
.title{
	text-align: left; border-bottom: 2px solid #75beff; font-size: 18px; font-weight: normal; margin-bottom: 10px;
}	
.article{
	display: inline-block; color: #6a6868; padding: 10px;
}
.article > p{
	text-align: left; font-size: 15px; margin-bottom: 10px; text-indent: 2em;
}
.article > div{
	text-align: left; font-size: 15px; margin-bottom: 10px;
}
</style>