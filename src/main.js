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

import global_ from './components/Global'  //引用全局变量文件
import Layout from './components/layout'

//引入项目各个页面一级组件
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

//axios.defaults.websocketURL = 'ws://192.168.1.2:8080/user_web/';   //配置axios的全局url  		服务端地址
//axios.defaults.websocketURL = 'ws://116.62.241.107:8080/user_web/';   //配置axios的全局url  		阿里云服务端地址
axios.defaults.websocketURL = 'ws://192.168.1.8:8080/user_web/';   //配置axios的全局url  	开发地址(曹杰)

let Base64 = require('js-base64').Base64

let router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component:resolve => require(['./pages/index'],resolve)
			//component: indexPage
		},
		{
			path: '/newsInfo',
			component:resolve => require(['./pages/newsInfo'],resolve)
			//component: newsInfo
		},
		{
			path: '/registerStep1',
			component:resolve => require(['./components/registerStep1'],resolve)
			//component: registerStep1
		},
		{
			path: '/registerStep2',
			component:resolve => require(['./components/registerStep2'],resolve)
			//component: registerStep2
		},
		{
			name: 'registerStep3',
			path: '/registerStep3',
			component:resolve => require(['./components/registerStep3'],resolve)
			//component: registerStep3
		},
		{
			path: '/aboutUs',
			component:resolve => require(['./pages/aboutUs'],resolve),
			//component: aboutUs,
			redirect: '/aboutUs/companyInfo',
			children: [
				{
					path: 'companyInfo',
					component:resolve => require(['./pages/aboutUs/companyInfo'],resolve)
					//component: companyInfo
				},
				{
					path: 'companyMission',
					component:resolve => require(['./pages/aboutUs/companyMission'],resolve)
					//component: companyMission
				},
				{
					path: 'companyVision',
					component:resolve => require(['./pages/aboutUs/companyVision'],resolve)
					//component: companyVision
				},
				{
					path: 'companyFulfillment',
					component:resolve => require(['./pages/aboutUs/companyFulfillment'],resolve)
					//component: companyFulfillment
				}
			]
		},
		{
			path: '/newsCenter',
			component:resolve => require(['./pages/newsCenter'],resolve),
			//component: newsCenter,
			redirect: '/newsCenter/newsList',
			children: [
				{
					path: 'newsList',
					component:resolve => require(['./pages/newsCenter/newsList'],resolve)
					//component: newsList
				},
				{
					path: 'infoDisclosure',
					component:resolve => require(['./pages/newsCenter/infoDisclosure'],resolve),
					//component: infoDisclosure
				}
			]
		},
		{
			path: '/platformIntroduction',
			component:resolve => require(['./pages/PlatformIntroduction'],resolve),
			//component: platformIntroduction,
			redirect: '/platformIntroduction/platformInfo',
			children: [
				{
					path: 'platformInfo',
					component:resolve => require(['./pages/platformIntroduction/platformInfo'],resolve)
					//component: platformInfo
				}
			]
		},
		{
			path: '/contactUs',
			component:resolve => require(['./pages/contactUs'],resolve),
			//component: contactUs,
			redirect: '/contactUs/contactUsInfo',
			children: [
				{
					path: 'contactUsInfo',
					component:resolve => require(['./pages/contactUs/contactUsInfo'],resolve)
					//component: contactUsInfo
				}
			]
		},
		{
			path: '/helpCenter',
			component:resolve => require(['./pages/helpCenter'],resolve),
			//component: helpCenter,
			redirect: '/helpCenter/customerNotice',
			children: [
				{
					path: 'customerNotice',
					component:resolve => require(['./pages/helpCenter/customerNotice'],resolve)
					//component: customerNotice
				},
				{
					path: 'shoppingList',
					component:resolve => require(['./pages/helpCenter/shoppingList'],resolve)
					//component: shoppingList
				},
				{
					path: 'commonProblem',
					component:resolve => require(['./pages/helpCenter/commonProblem'],resolve)
					//component: commonProblem
				},
				{
					path: 'registrationAgreement',
					component:resolve => require(['./pages/helpCenter/registrationAgreement'],resolve)
					//component: registrationAgreement
				},
				{
					path: 'privacyProtection',
					component:resolve => require(['./pages/helpCenter/privacyProtection'],resolve)
					//component: privacyProtection
				},
				{
					path: 'disclaimer',
					component:resolve => require(['./pages/helpCenter/disclaimer'],resolve)
					//component: disclaimer
				},
			]
		},
		{
			path: '/yjw_admin',
			//component: yjw_admin,
			component: resolve => require(['./admin/yjw_admin'], resolve),
			redirect: '/yjw_admin/daiBan',
			children: [
				{
					path: 'daiBan',						//个人中心(待办)
					component: resolve => require(['./admin/userCenter/daiBan'], resolve),
					//component: daiBan
				},
				{
					path: 'personInfo',						//个人中心(个人信息)
					component: resolve => require(['./admin/userCenter/personInfo'], resolve),
					//component: personInfo
				},
				{
					path: 'warning',						//个人中心(预警)
					component: resolve => require(['./admin/userCenter/warning'], resolve),
					//component: warning
				},
				{
					path: 'companyFileCabinet',						//企业文件柜
					component: resolve => require(['./admin/userCenter/companyFileCabinet'], resolve),
					//component: companyFileCabinet
				},
				{
					path: 'companyCaigou',				//企业采购(医院)
					component: resolve => require(['./admin/caiGou/companyCaigou'], resolve),
					//component: companyCaigou
				},
				{
					path: 'distributorCaigou',				//企业采购(经销商)
					component: resolve => require(['./admin/caiGou/distributorCaigou'], resolve),
					//component: distributorCaigou
				},
				{
					path: 'businessRelationship',		//客商关系
					component: resolve => require(['./admin/businessRelationship/businessRelationship'], resolve),
					//component: businessRelationship
				},
				{
					path: 'businessRelationshipAdd',		//客商关系详情(修改)页
					component: resolve => require(['./admin/businessRelationship/businessRelationshipAdd'], resolve),
					//component: businessRelationshipAdd
				},
				{
					path: 'businessRelationshipDaiban',		//客商关系待办页
					component: resolve => require(['./admin/businessRelationship/businessRelationshipDaiban'], resolve),
					//component: businessRelationshipDaiban
				},
				{
					path: 'cgOrderList',
					component: resolve => require(['./admin/orderCenter/cgOrderList'], resolve),
					//component: cgOrderList		//采购订单列表
				},
				{
					path: 'xsOrderList',
					component: resolve => require(['./admin/orderCenter/xsOrderList'], resolve),
					//component: xsOrderList		//销售订单列表
				},
				{
					path: 'cgOrderInfo',
					component: resolve => require(['./admin/orderCenter/cgOrderInfo'], resolve),
					//component: cgOrderInfo		//采购订单详情
				},
				{
					path: 'xsOrderInfo',
					component: resolve => require(['./admin/orderCenter/xsOrderInfo'], resolve),
					//component: xsOrderInfo		//销售订单详情
				},
				{
					path: 'logisticsInfo',
					component: resolve => require(['./admin/orderCenter/logisticsInfo'], resolve),
					//component: logisticsInfo	//物流详情
				},
				{
					path: 'logisticsInfo2',
					component: resolve => require(['./admin/orderCenter/logisticsInfo2'], resolve),
					//component: logisticsInfo2	//物流详情
				},
				{
					path: 'storeManage',		//仓库管理
					component: resolve => require(['./admin/inventoryManage/storeManage'], resolve),
					//component: storeManage
				},
				{
					path: 'warehouseManage',		//库房管理
					component: resolve => require(['./admin/inventoryManage/warehouseManage'], resolve),
					//component: warehouseManage
				},
				{
					path: 'producerStock',		//商品库存管理
					component: resolve => require(['./admin/inventoryManage/producerStock'], resolve),
					//component: producerStock
				},
				{
					path: 'putInStorageList',		//入库列表
					component: resolve => require(['./admin/inventoryManage/putInStorageList'], resolve),
					//component: putInStorageList
				},
				{
					path: 'putInStorageInfo',		//入库详情
					component: resolve => require(['./admin/inventoryManage/putInStorageInfo'], resolve),
					//component: putInStorageInfo
				},
				{
					path: 'putInStorageUpdate',		//入库编辑
					component: resolve => require(['./admin/inventoryManage/putInStorageUpdate'], resolve),
					//component: putInStorageUpdate
				},
				{
					path: 'putInStorageDanju',		//入库单据
					component: resolve => require(['./admin/inventoryManage/putInStorageDanju'], resolve),
					//component: putInStorageDanju
				},
				{
					path: 'outOfStorageList',		//出库列表
					component: resolve => require(['./admin/inventoryManage/outOfStorageList'], resolve),
					//component: outOfStorageList
				},
				{
					path: 'outOfStorageInfo',		//出库新增
					component: resolve => require(['./admin/inventoryManage/outOfStorageInfo'], resolve),
					//component: outOfStorageInfo
				},
				{
					path: 'outOfStorageUpdate',		//出库编辑
					component: resolve => require(['./admin/inventoryManage/outOfStorageUpdate'], resolve),
					//component: outOfStorageUpdate
				},
				{
					path: 'outOfStorageDanju',		//出库单据
					component: resolve => require(['./admin/inventoryManage/outOfStorageDanju'], resolve),
					//component: outOfStorageDanju
				},
				{
					path: 'companyAccount',		//企业账号管理
					component: resolve => require(['./admin/companyManage/companyAccount'], resolve),
					//component: companyAccount
				},
				{
					path: 'departmentManage',		//部门管理
					component: resolve => require(['./admin/companyManage/departmentManage'], resolve),
					//component: departmentManage
				},
				{
					path: 'carsManage',		//车辆管理
					component: resolve => require(['./admin/thirdPartyStorageCenterWMS/carsManage'], resolve),
					//component: carsManage
				},
				{
					path: 'distributorManage',		//配送员管理
					component: resolve => require(['./admin/thirdPartyStorageCenterWMS/distributorManage'], resolve),
					//component: distributorManage
				},
				{
					path: 'factoryAddGoods',		//生产厂家添加商品
					component: resolve => require(['./admin/goodsManage/factoryAddGoods'], resolve),
					//component: factoryAddGoods
				},
				{
					path: 'distributorAddGoods',		//经销商添加商品
					component: resolve => require(['./admin/goodsManage/distributorAddGoods'], resolve),
					//component: distributorAddGoods
				},
				{
					path: 'factoryAddGoodsInfo',		//商品详情
					component: resolve => require(['./admin/goodsManage/factoryAddGoodsInfo'], resolve),
					//component: factoryAddGoodsInfo
				},				
				{
					path: 'warehouseMonitoringData',		//仓库监控数据
					component: resolve => require(['./admin/regulator/warehouseMonitoringData'], resolve),
					//component: warehouseMonitoringData
				},
				{
					path: 'carMonitoringData',		//车辆监控数据
					component: resolve => require(['./admin/regulator/carMonitoringData'], resolve),
					//component: carMonitoringData
				},
				{
					path: 'warehouseVideoData',		//仓库监控视频
					component: resolve => require(['./admin/regulator/warehouseVideoData'], resolve),
					//component: warehouseVideoData
				},
				{
					path: 'carVideoData',		//车辆监控视频
					component: resolve => require(['./admin/regulator/carVideoData'], resolve),
					//component: carVideoData
				},	
				{
					path: 'videoPlay',		//视频播放页面
					component: resolve => require(['./admin/admin-base/videoPlay'], resolve),
					//component: videoPlay
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


