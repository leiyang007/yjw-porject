
/*indexedDB操作部分*/

window.indexedDB=window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
  if(window.indexedDB){
    console.log("您的浏览器支持IndexedDB数据库。");
  } else{
   alert("您的浏览器不支持IndexedDB数据库。");
  }
  
//1、打开或创建数据库
request=window.indexedDB.open('testDB','2.0');//参数为：数据库名和版本号；数据库存在，则打开它；否则创建。

//2、指定操作成功的处理函数(可以获得对象存储空间信息)
request.onsuccess=function(event){
    console.log('打开成功！');
    mydb=request.result;
    //var len = mydb.objectStoreNames.length;                 //对象存储空间名的个数
    //var  name=mydb.objectStoreNames[i];                     //对象存储空间名
    /*******方法调用********************/
   insert(mydb)
    get(mydb);
};

//3、指定操作失败的处理函数
request.onerror=function(event){
    console.log("打开失败,错误号：" + event.target.errorCode);
};

//4、onupgradeneeded事件在下列情况下被触发：数据库第一次被打开时；打开数据库时指定的版本号高于当前被持久化的数据库版本号。(可通过修改版本号触发该事件)
request.onupgradeneeded = function(event) {
    mydb=request.result;//获得数据库实例对象
    if(!mydb.objectStoreNames.contains("students")) {                   //判断对象存储空间名称是否已经存在
        var objectStore = mydb.createObjectStore("students", {keyPath: "id"});//创建students对象存储空间;指定keyPath选项为id（即主键为id）
        //对象存储空间students的列email上创建一个唯一索引email,可以创建多个索引。
        objectStore.createIndex("email",                                //索引名
                                "email",                                //创建索引的列（即keyPath,索引属性字段名）
                                { unique: true });                      //索引选项(索引属性值是否唯一:true or false)
    }
}

function insert(mydb){
    var data = {
    			  "id": "1",
		        "magDate":"20180803",
		        "messageData": [
					        	{
					        		fromId:88,
					        		size:{
					        			"width":159,
					        			"height":110
					        		},
					        		timestamp:"2018-08-03 14:49:52",
					        		toId:112,
					        		type:"msg",
					        		url:"https://a1.easemob.com/1193180428177246/zs/chatfiles/3401b1d0-a69e-11e8-b264-172482572cbf"
					        	},
					        	{
					        		fromId:112,
					        		timestamp:"2018-08-03 14:49:52",
					        		toId:88,
					        		type:"text",
					        		msgDate:"hello"
					        	},
					        	{
					        		fromId:112,
					        		timestamp:"2018-08-03 14:49:52",
					        		toId:88,
					        		type:"text",
					        		msgDate:"[(#)]"
					        	}
				        ]
			}

    //使用事务
    var transaction = mydb.transaction('students',                        //事务操作的对象存储空间名
                                    'readwrite');                         //事务模式:'readwrite'可读写模式;READ_ONLY只读模式;VERSION_CHANGE版本升级模式;
    //2.1、当事务中的所有操作请求都被处理完成时触发
    transaction.oncomplete = function(event) {};
    //2.2、当事务中出现错误时触发，默认的处理方式为回滚事务；
    transaction.onerror = function(event) {};
    //2.3、当事务被终止时触发
    transaction.onabort = function(event){};
    //2.4、从事务中获得相关的对象存储空间对象
    var objStore = transaction.objectStore('students');
    //向students存储空间加入一个student对象，获得request对象用于处理用户对数据库的操作请求(同样拥有onerror，onupgradeneeded，onsuccess事件)
    var request = objStore.add(data);
    request.onsuccess = function(e) {
        console.log("成功插入数据，id=" + e.target.result);
    };
}

function get(mydb){	
      var transaction = mydb.transaction('students','readwrite');
      transaction.oncomplete = function(event) {};
      transaction.onerror = function(event) {};
      transaction.onabort = function(event){};
      var objStore = transaction.objectStore('students');
      var request = objStore.get("1");                 //按照id查询
      request.onsuccess=function(e){
          console.log(JSON.stringify(e.target.result.messageData));
          //chartList = e.target.result.messageData
          return e.target.result.messageData
      }
  }

function update(mydb){
     var transaction = mydb.transaction('students','readwrite');
     transaction.oncomplete = function(event) {};
     transaction.onerror = function(event) {};
     transaction.onabort = function(event){};
     var objStore = transaction.objectStore('students');
     var request = objStore.get("110");
     request.onsuccess=function(e){
         var student=e.target.result;
         student.name='wwww1';
         objStore.put(student);
     }
 }

function remove(mydb){
    var transaction = mydb.transaction('students','readwrite');
    transaction.oncomplete = function(event) {};
    transaction.onerror = function(event) {};
    transaction.onabort = function(event){};
    var objStore = transaction.objectStore('students');
    var request = objStore.delete("110");
    request.onsuccess = function(e) {
        alert("成功删除数据");
    };
}

//利用索引号查询
function byIndexGet(mydb){
    var transaction = mydb.transaction('students','readwrite');
    transaction.oncomplete = function(event) {};
    transaction.onerror = function(event) {};
    transaction.onabort = function(event){};
    var objStore = transaction.objectStore('students');
    var index = objStore.index('email');                //索引名
    var request=index.get('liming1@email.com');         //通过索引值获取数据
    request.onsuccess=function(e){
        var student=e.target.result;
        alert(student.name+"：索引查询");
    }
}

//游标遍历所有
function byCursorGet(mydb){
    var transaction = mydb.transaction('students','readwrite');
    transaction.oncomplete = function(event) {};
    transaction.onerror = function(event) {};
    transaction.onabort = function(event){};
    var objStore = transaction.objectStore('students');
    var request=objStore.openCursor();//打开游标
    request.onsuccess = function(e){
        var cursor = e.target.result;
        if(cursor){
            console.log(cursor.value.name);
            cursor.continue();
        }else {
            console.log('遍历完成');
        }
    }
}










