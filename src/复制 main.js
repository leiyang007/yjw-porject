//引入项目依赖模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import 'babel-polyfill'

//import VueResource from 'vue-resource'
import axios from 'axios'
import base64 from 'js-base64'
import store from '../store/index'

import VideoPlayer from 'vue-video-player'		//调用视频播放插件
import videojsContribHls from 'videojs-contrib-hls'		//调用视频播放插件

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import ElementUI from 'element-ui'	
import 'element-ui/lib/theme-chalk/index.css'

import common from './assets/js/common.js'    //引入公共js文件

import SIdentify from './components/base/veriCode'

//引入项目各个页面一级组件
import global_ from './components/Global'  //引用全局变量文件
import Layout from './components/layout'
import registerStep1 from './components/registerStep1'
import registerStep2 from './components/registerStep2'
import registerStep3 from './components/registerStep3'
import indexPage from './pages/index'

import aboutUs from './pages/aboutUs'
import companyInfo from './pages/aboutUs/companyInfo'
import companyMission from './pages/aboutUs/companyMission'
import companyVision from './pages/aboutUs/companyVision'
import companyFulfillment from './pages/aboutUs/companyFulfillment'

import newsCenter from './pages/newsCenter'
import newsList from './pages/newsCenter/newsList'
import infoDisclosure from './pages/newsCenter/infoDisclosure'

import newsInfo from './pages/newsInfo'

import platformIntroduction from './pages/PlatformIntroduction'
import platformInfo from './pages/platformIntroduction/platformInfo'

import contactUs from './pages/contactUs'
import contactUsInfo from './pages/contactUs/contactUsInfo'

import helpCenter from './pages/helpCenter'
import customerNotice from './pages/helpCenter/customerNotice'
import shoppingList from './pages/helpCenter/shoppingList'
import commonProblem from './pages/helpCenter/commonProblem'
import registrationAgreement from './pages/helpCenter/registrationAgreement'
import privacyProtection from './pages/helpCenter/privacyProtection'
import disclaimer from './pages/helpCenter/disclaimer'

//后台管理系统组件导入
import yjw_admin from './admin/yjw_admin' 				
import daiBan from './admin/userCenter/daiBan'
import personInfo from './admin/userCenter/personInfo'
import warning from './admin/userCenter/warning'
import companyFileCabinet from './admin/userCenter/companyFileCabinet'		//企业文件柜

import companyCaigou from './admin/caiGou/companyCaigou'		//医院采购				
import distributorCaigou from './admin/caiGou/distributorCaigou'		//经销商采购

import businessRelationship from './admin/businessRelationship/businessRelationship'
import businessRelationshipAdd from './admin/businessRelationship/businessRelationshipAdd'
import businessRelationshipDaiban from './admin/businessRelationship/businessRelationshipDaiban'

import cgOrderList from './admin/orderCenter/cgOrderList'
import xsOrderList from './admin/orderCenter/xsOrderList'
import cgOrderInfo from './admin/orderCenter/cgOrderInfo'
import xsOrderInfo from './admin/orderCenter/xsOrderInfo'
import logisticsInfo from './admin/orderCenter/logisticsInfo'
import logisticsInfo2 from './admin/orderCenter/logisticsInfo2'

import storeManage from './admin/inventoryManage/storeManage'
import warehouseManage from './admin/inventoryManage/warehouseManage'
import producerStock from './admin/inventoryManage/producerStock'
import putInStorageList from './admin/inventoryManage/putInStorageList'		//入库列表
import putInStorageInfo from './admin/inventoryManage/putInStorageInfo'		//入库新增
import putInStorageUpdate from './admin/inventoryManage/putInStorageUpdate'		//入库编辑
import putInStorageDanju from './admin/inventoryManage/putInStorageDanju'		//入库单据
import outOfStorageList from './admin/inventoryManage/outOfStorageList'		//出库列表
import outOfStorageInfo from './admin/inventoryManage/outOfStorageInfo'		//出库新增
import outOfStorageUpdate from './admin/inventoryManage/outOfStorageUpdate'		//出库编辑
import outOfStorageDanju from './admin/inventoryManage/outOfStorageDanju'		//出库单据

import companyAccount from './admin/companyManage/companyAccount'
import departmentManage from './admin/companyManage/departmentManage'

import carsManage from './admin/thirdPartyStorageCenterWMS/carsManage'
import distributorManage from './admin/thirdPartyStorageCenterWMS/distributorManage'

import factoryAddGoods from './admin/goodsManage/factoryAddGoods'
import distributorAddGoods from './admin/goodsManage/distributorAddGoods'
import factoryAddGoodsInfo from './admin/goodsManage/factoryAddGoodsInfo'

import warehouseMonitoringData from './admin/regulator/warehouseMonitoringData'
import carMonitoringData from './admin/regulator/carMonitoringData'
import warehouseVideoData from './admin/regulator/warehouseVideoData'
import carVideoData from './admin/regulator/carVideoData'

import videoPlay from './admin/admin-base/videoPlay'


Vue.use(VueRouter)

Vue.use(SIdentify)
Vue.use(ElementUI)
Vue.use(VideoPlayer)
Vue.use(videojsContribHls)


Vue.component('SIdentify', SIdentify)

Vue.prototype.GLOBAL = global_		//挂载到Vue实例上面
Vue.prototype.common = common

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://192.168.1.2:8080';   //配置axios的全局url  		服务端地址
//axios.defaults.baseURL = 'http://116.62.241.107:8080';   //配置axios的全局url  		阿里云服务端地址
//axios.defaults.baseURL = 'http://192.168.1.2:8080';   //配置axios的全局url  		公司服务端地址
//axios.defaults.baseURL = 'http://192.168.1.6:8080';   //配置axios的全局url		开发地址(曹杰)
//axios.defaults.baseURL = 'http://192.168.1.5:8080';   //配置axios的全局url		开发地址(陈晋阳)
//axios.defaults.baseURL = 'http://192.168.1.9:8080';   //配置axios的全局url		开发地址(郑大钊)

axios.defaults.websocketURL = 'ws://192.168.1.2:8080/user_web/';   //配置axios的全局url  		服务端地址
//axios.defaults.websocketURL = 'ws://116.62.241.107:8080/user_web/';   //配置axios的全局url  		阿里云服务端地址
//axios.defaults.websocketURL = 'ws://192.168.1.5:8080/user_web/';   //配置axios的全局url  	开发地址(陈晋阳)

let Base64 = require('js-base64').Base64

let router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: indexPage
		},
		{
			path: '/newsInfo',
			component: newsInfo
		},
		{
			path: '/registerStep1',
			component: registerStep1
		},
		{
			path: '/registerStep2',
			component: registerStep2
		},
		{
			name: 'registerStep3',
			path: '/registerStep3',
			component: registerStep3
		},
		{
			path: '/aboutUs',
			component: aboutUs,
			redirect: '/aboutUs/companyInfo',
			children: [
				{
					path: 'companyInfo',
					component: companyInfo
				},
				{
					path: 'companyMission',
					component: companyMission
				},
				{
					path: 'companyVision',
					component: companyVision
				},
				{
					path: 'companyFulfillment',
					component: companyFulfillment
				}
			]
		},
		{
			path: '/newsCenter',
			component: newsCenter,
			redirect: '/newsCenter/newsList',
			children: [
				{
					path: 'newsList',
					component: newsList
				},
				{
					path: 'infoDisclosure',
					component: infoDisclosure
				}
			]
		},
		{
			path: '/platformIntroduction',
			component: platformIntroduction,
			redirect: '/platformIntroduction/platformInfo',
			children: [
				{
					path: 'platformInfo',
					component: platformInfo
				}
			]
		},
		{
			path: '/contactUs',
			component: contactUs,
			redirect: '/contactUs/contactUsInfo',
			children: [
				{
					path: 'contactUsInfo',
					component: contactUsInfo
				}
			]
		},
		{
			path: '/helpCenter',
			component: helpCenter,
			redirect: '/helpCenter/customerNotice',
			children: [
				{
					path: 'customerNotice',
					component: customerNotice
				},
				{
					path: 'shoppingList',
					component: shoppingList
				},
				{
					path: 'commonProblem',
					component: commonProblem
				},
				{
					path: 'registrationAgreement',
					component: registrationAgreement
				},
				{
					path: 'privacyProtection',
					component: privacyProtection
				},
				{
					path: 'disclaimer',
					component: disclaimer
				},
			]
		},
		{
			path: '/yjw_admin',
			component: yjw_admin,
			//component: resolve => require(['../admin/yjw_admin.vue'], resolve),
			redirect: '/yjw_admin/daiBan',
			children: [
				{
					path: 'daiBan',						//个人中心(待办)
					component: daiBan
				},
				{
					path: 'personInfo',						//个人中心(个人信息)
					component: personInfo
				},
				{
					path: 'warning',						//个人中心(预警)
					component: warning
				},
				{
					path: 'companyFileCabinet',						//企业文件柜
					component: companyFileCabinet
				},
				{
					path: 'companyCaigou',				//企业采购(医院)
					component: companyCaigou
				},
				{
					path: 'distributorCaigou',				//企业采购(经销商)
					component: distributorCaigou
				},
				{
					path: 'businessRelationship',		//客商关系
					component: businessRelationship
				},
				{
					path: 'businessRelationshipAdd',		//客商关系详情(修改)页
					component: businessRelationshipAdd
				},
				{
					path: 'businessRelationshipDaiban',		//客商关系待办页
					component: businessRelationshipDaiban
				},
				{
					path: 'cgOrderList',
					component: cgOrderList		//采购订单列表
				},
				{
					path: 'xsOrderList',
					component: xsOrderList		//销售订单列表
				},
				{
					path: 'cgOrderInfo',
					component: cgOrderInfo		//采购订单详情
				},
				{
					path: 'xsOrderInfo',
					component: xsOrderInfo		//销售订单详情
				},
				{
					path: 'logisticsInfo',
					component: logisticsInfo	//物流详情
				},
				{
					path: 'logisticsInfo2',
					component: logisticsInfo2	//物流详情
				},
				{
					path: 'storeManage',		//仓库管理
					component: storeManage
				},
				{
					path: 'warehouseManage',		//库房管理
					component: warehouseManage
				},
				{
					path: 'producerStock',		//商品库存管理
					component: producerStock
				},
				{
					path: 'putInStorageList',		//入库列表
					component: putInStorageList
				},
				{
					path: 'putInStorageInfo',		//入库详情
					component: putInStorageInfo
				},
				{
					path: 'putInStorageUpdate',		//入库编辑
					component: putInStorageUpdate
				},
				{
					path: 'putInStorageDanju',		//入库单据
					component: putInStorageDanju
				},
				{
					path: 'outOfStorageList',		//出库列表
					component: outOfStorageList
				},
				{
					path: 'outOfStorageInfo',		//出库新增
					component: outOfStorageInfo
				},
				{
					path: 'outOfStorageUpdate',		//出库编辑
					component: outOfStorageUpdate
				},
				{
					path: 'outOfStorageDanju',		//出库单据
					component: outOfStorageDanju
				},
				{
					path: 'companyAccount',		//企业账号管理
					component: companyAccount
				},
				{
					path: 'departmentManage',		//部门管理
					component: departmentManage
				},
				{
					path: 'carsManage',		//车辆管理
					component: carsManage
				},
				{
					path: 'distributorManage',		//配送员管理
					component: distributorManage
				},
				{
					path: 'factoryAddGoods',		//生产厂家添加商品
					component: factoryAddGoods
				},
				{
					path: 'distributorAddGoods',		//经销商添加商品
					component: distributorAddGoods
				},
				{
					path: 'factoryAddGoodsInfo',		//商品详情
					component: factoryAddGoodsInfo
				},
				{
					path: 'warehouseMonitoringData',		//仓库监控数据
					component: warehouseMonitoringData
				},
				{
					path: 'carMonitoringData',		//车辆监控数据
					component: carMonitoringData
				},
				{
					path: 'warehouseVideoData',		//仓库监控视频
					component: warehouseVideoData
				},
				{
					path: 'carVideoData',		//车辆监控视频
					component: carVideoData
				},	
				{
					path: 'videoPlay',		//视频播放页面
					component: videoPlay
				},			
			]
		}
	]
})

//全局过滤器
Vue.filter('yearToMonth', function (value,format) {	
	if (!value) return ''
	let res = ''
	if(format == 'year-month'){
		res = value.substring(-1,7)  	//**年-**月
	}else if(format == 'day'){
		res = value.substring(8,10)		//**日
	}else if(format == 'year-month-day'){
		res = value.substring(-1,4)+'年'+value.substring(5,7)+'月'+value.substring(8,10)+'日'  	//**年**月**日
	}
  return res
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})


