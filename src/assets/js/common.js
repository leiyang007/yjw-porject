
/*
 * 全局公用方法
 * author by leiyang	2018.06.05
 * */

export default{
    //ls : window.localStorage,
    //ss : window.sessionStorage,
    LStorage: {						//本地存储公用方法
    	getItem(key) {
		  try {
		   return JSON.parse(window.localStorage.getItem(key))
		  } catch (err) {
		   return null
		  }
		},
		 setItem(key, val) {
		  window.localStorage.setItem(key, JSON.stringify(val))
		},
		 clear() {
		  window.localStorage.clear()
		},
		 keys() {
		  return window.localStorage.keys()
		},
		 removeItem(key) {
		  window.localStorage.removeItem(key)
		}
    },
    SStorage: {
    	getItem(key) {
		  try {
		   return JSON.parse(window.sessionStorage.getItem(key))
		  } catch (err) {
		   return null
		  }
		 },
		 setItem(key, val) {
		  window.sessionStorage.setItem(key, JSON.stringify(val))
		 },
		 clear() {
		  window.sessionStorage.clear()
		 },
		 keys() {
		  return window.sessionStorage.keys()
		 },
		 removeItem(key) {
		  window.sessionStorage.removeItem(key)
		 }
    },
    base64ToData : (apiData) => {
		let base_to_json = Base64.decode(apiData)  //base64解密
		return base_to_json
	},
	
	DataToBase64 : (apiParm) => {
		let par_to_base = Base64.encode(apiParm)  //base64加密	
		return par_to_base
	},
	
	fomatTableDate : (arr, type = 1) => {					  //处理日期格式
		for(let i=0;i<arr.length;i++){
			if(type == 1){
				arr[i].createTime = arr[i].createTime.substring(-1,10)  //年-月-日				
			}		    
		}
		return arr
	},
	
	fomatDate : (date,type) => {					  //处理日期格式
		let year = date.getFullYear()
		let month = date.getMonth()+1
			if(month < 10){
				month = '0'+month
			}
		let day = date.getDate() < 10? '0'+date.getDate() : date.getDate()
		let date_str = ''
		if(type == 1){
			date_str = year+'-'+month+'-'+day
		}		
		return date_str
	},
	
	toTreeData : (data, attributes) => {					  //返回树型数据
		  let resData = data;
		  let tree = [];

		  for (let i = 0; i < resData.length; i++) {
		    if (resData[i].parentDepartmentId == attributes.rootId) {
		      let obj = {
		        id: resData[i][attributes.id],
		        departmentName: resData[i][attributes.name],
		        departmentSn: resData[i][attributes.dpSn],
		        children: []
		      };
		      tree.push(obj);
		      resData.splice(i, 1);
		      i--;
		    }
		  }
		  run(tree);
		  function run(chiArr) {
		    if (resData.length !== 0) {
		      for (let i = 0; i < chiArr.length; i++) {
		        for (let j = 0; j < resData.length; j++) {
		          if (chiArr[i].id == resData[j][attributes.parentId]) {
		            let obj = {
		              id: resData[j][attributes.id],
		              departmentName: resData[j][attributes.name],
		              departmentSn: resData[j][attributes.dpSn],
		              children: []
		            };
		            chiArr[i].children.push(obj);
		            resData.splice(j, 1);
		            j--;
		          }
		        }
		        run(chiArr[i].children);
		      }
		    }
		  }
		
		for(let i = 0; i<tree.length; i++){
			if(tree[i].children.length == 0){
				delete tree[i].children;
			}else{
				for(let j = 0; j<tree[i].children.length; j++){
					if(j<tree[i].children[j].children.length == 0){
						delete tree[i].children[j].children;
					}
				}
			}
		}
		
		return tree;
	},
	toTreeData2 : (data, attributes) => {					  //返回树型数据2(做权限菜单用的)
		  let resData = data;
		  let tree = [];

		  for (let i = 0; i < resData.length; i++) {
		    if (resData[i].parentMenuId == attributes.rootId) {
		      let obj = {
		        id: resData[i][attributes.id],
		        menuName: resData[i][attributes.name],
		        url: resData[i][attributes.dpSn],
		        children: []
		      };
		      tree.push(obj);
		      resData.splice(i, 1);
		      i--;
		    }
		  }
		  run(tree);
		  function run(chiArr) {
		    if (resData.length !== 0) {
		      for (let i = 0; i < chiArr.length; i++) {
		        for (let j = 0; j < resData.length; j++) {
		          if (chiArr[i].id == resData[j][attributes.parentId]) {
		            let obj = {
		              id: resData[j][attributes.id],
		              menuName: resData[j][attributes.name],
		              url: resData[j][attributes.dpSn],
		              children: []
		            };
		            chiArr[i].children.push(obj);
		            resData.splice(j, 1);
		            j--;
		          }
		        }
		        run(chiArr[i].children);
		      }
		    }
		  }
		
		for(let i = 0; i<tree.length; i++){
			if(tree[i].children.length == 0){
				delete tree[i].children;
			}else{
				for(let j = 0; j<tree[i].children.length; j++){
					if(j<tree[i].children[j].children.length == 0){
						delete tree[i].children[j].children;
					}
				}
			}
		}
		
		return tree;
	},
	isPhone: (inputVal) => {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(inputVal)) {
            return false;
        } else {
            return true;
      	}
	}
	
	/*DataToMd5 : (apiUserKey) => {
		let par_to_md = md5(apiUserKey)  //md5加密	
		return par_to_md
	},*/
	
}


