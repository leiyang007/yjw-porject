
	/*
		The global value set for xmpp server

		ws://im-api.easemob.com/ws/
		ws://im-api.sandbox.easemob.com/ws/

		http://im-api.easemob.com/http-bind/
		http://im-api.sandbox.easemob.com/http-bind/
	*/
	var xmppURL = null;
	/*
		The global value set for Easemob backend REST API

		http://a1.easemob.com
		http://a1.sdb.easemob.com
	*/
	var apiURL = null;
	var curUserId = null;
	var curChatUserId = null;
	var conn = null;
	var curRoomId = null;
	var msgCardDivId = "chat01";
	var talkToDivId = "talkTo";
	var talkInputId = "talkInputId";
	var fileInputId = "fileInput";
	var bothRoster = [];
	var toRoster = [];
	var maxWidth = 200;
	var groupFlagMark = "group--";
	var groupQuering = false;
	var textSending = false;
	var appkey = "1193180428177246#zs";
	var time = 0;
	var chartList = null;
	var save_img = '';
	var isQuery = null;			//判断是否查询过聊天记录
	
	window.URL = window.URL || window.webkitURL || window.mozURL
			|| window.msURL;
	var getLoginInfo = function() {
		return {
			isLogin : false
		};
	};
	var showLoginUI = function() {
		$('#loginmodal').modal('show');
		$('#username').focus();
	};
	var hiddenLoginUI = function() {
		$('#loginmodal').modal('hide');
	};
	var showWaitLoginedUI = function() {
		$('#waitLoginmodal').modal('show');
	};
	var hiddenWaitLoginedUI = function() {
		$('#waitLoginmodal').modal('hide');
	};
	
    //通过url获取用户名和ID
	function GetQueryString(name){
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");		
		     var r = decodeURI(window.location.search).substr(1).match(reg);		
		     if(r!=null)return  unescape(r[2]); return null;		
		}
	
	console.log(GetQueryString("userName"))
	console.log(GetQueryString("userId"))	
	
	var showChatUI = function() {
		$('#content').css({
			"display" : "block"
		});
		var login_userEle = document.getElementById("login_user").children[0];
		if(GetQueryString("type") == 1){
			login_userEle.innerHTML = GetQueryString("userName");
			login_userEle.setAttribute("title", GetQueryString("userName"));
		}else if(GetQueryString("type") == 2){
			login_userEle.innerHTML = GetQueryString("userName");
			login_userEle.setAttribute("title", GetQueryString("userName"));
		}else if(GetQueryString("type") == 3){
			login_userEle.innerHTML = GetQueryString("userName");
			login_userEle.setAttribute("title", GetQueryString("userName"));
		}
		
	};
	//登录之前不显示web对话框
	var hiddenChatUI = function() {
		$('#content').css({
			"display" : "none"
		});
		document.getElementById(talkInputId).value = "";
	};
	//定义消息编辑文本域的快捷键，enter和ctrl+enter为发送，alt+enter为换行
	//控制提交频率
	$(function() {
		$("textarea").keydown(function(event) {
			if (event.altKey && event.keyCode == 13) {
				e = $(this).val();
				$(this).val(e + '\n');
			} else if (event.ctrlKey && event.keyCode == 13) {
				//e = $(this).val();
				//$(this).val(e + '<br>');
				event.returnValue = false;
				sendText();
				return false;
			} else if (event.keyCode == 13) {
				event.returnValue = false;
				sendText();
				return false;
			}

		});
		$("#usetoken").on("click", function(){
			if ($("#password").attr("disabled")) {
				$("#password").removeAttr("disabled");
			} else {
				$("#password").attr("disabled", "disabled");
			}

			if ($("#token").attr("disabled")) {
				$("#token").removeAttr("disabled");
			} else {
				$("#token").attr("disabled", "disabled");
			}
		});
	});
	//easemobwebim-sdk注册回调函数列表
	$(document).ready(function() {
		if(GetQueryString("type") != 1){
			$.ajax({
				type:"post",
				url: server_url+"/product-web/chat/addContact",
				data: "signId="+GetQueryString("userId")+"&toId="+GetQueryString("otherUserId"),
				success: function(msg){
					var data = JSON.parse($.base64.decode(msg))
			       console.log( JSON.stringify(data) );  
			       queryChartList()
				},
				error:function(response){
			        console.log(response);
			    }
			});
		}		
		
		conn = new Easemob.im.Connection();
		//初始化连接
		conn.init({
			https : false,
			wss: false,
			url: xmppURL,
			//当连接成功时的回调方法
			onOpened : function() {
				handleOpen(conn);
			},
			//当连接关闭时的回调方法
			onClosed : function() {
				handleClosed();
			},
			//收到文本消息时的回调方法
			onTextMessage : function(message) {
				//alert("文本");
				handleTextMessage(message);
				console.log(message);
			},
			//收到透传消息时的回调方法
			onCmdMessage : function(message) {
				///alert("透传");
				handleTextMessage(message);
				console.log(message);
			},
			//收到表情消息时的回调方法
			onEmotionMessage : function(message) {
				handleEmotion(message);
			},
			//收到图片消息时的回调方法
			onPictureMessage : function(message) {
				//alert("图片");
				//save_img = message.url				
				handlePictureMessage(message);
			},
			//收到音频消息的回调方法
			onAudioMessage : function(message) {
				handleAudioMessage(message);
			},
			//收到位置消息的回调方法
			onLocationMessage : function(message) {
				handleLocationMessage(message);
			},
			//收到文件消息的回调方法
			onFileMessage : function(message) {
				handleFileMessage(message);
			},
			//收到视频消息的回调方法
			onVideoMessage : function(message) {
				handleVideoMessage(message);
			},
			//收到联系人订阅请求的回调方法
			onPresence : function(message) {
				handlePresence(message);
			},
			//收到联系人信息的回调方法
			onRoster : function(message) {
				handleRoster(message);
			},
			//收到群组邀请时的回调方法
			onInviteMessage : function(message) {
				//alert("邀请你进入某个群");
				handleInviteMessage(message);
			},
			//异常时的回调方法
			onError : function(message) {
				handleError(message);
			}
		});
		var loginInfo = getLoginInfo();
		if (loginInfo.isLogin) {
			showWaitLoginedUI();
		} else {
			showLoginUI();
		}
		//发送文件的模态窗口
		$('#fileModal').on('hidden.bs.modal', function(e) {
			var ele = document.getElementById(fileInputId);
			ele.value = "";
			if (!window.addEventListener) {
				ele.outerHTML = ele.outerHTML;
			}
			document.getElementById("fileSend").disabled = false;
			document.getElementById("cancelfileSend").disabled = false;
		});

		$('#addFridentModal').on('hidden.bs.modal', function(e) {
			var ele = document.getElementById("addfridentId");
			ele.value = "";
			if (!window.addEventListener) {
				ele.outerHTML = ele.outerHTML;
			}
			document.getElementById("addFridend").disabled = false;
			document.getElementById("cancelAddFridend").disabled = false;
		});

		$('#delFridentModal').on('hidden.bs.modal', function(e) {
			var ele = document.getElementById("delfridentId");
			ele.value = "";
			if (!window.addEventListener) {
				ele.outerHTML = ele.outerHTML;
			}
			document.getElementById("delFridend").disabled = false;
			document.getElementById("canceldelFridend").disabled = false;
		});

		$('#confirm-block-div-modal').on('hidden.bs.modal', function(e) {

		});

		$('#option-room-div-modal').on('hidden.bs.modal', function(e) {

		});

		$('#notice-block-div').on('hidden.bs.modal', function(e) {

		});

		$('#regist-div-modall').on('hidden.bs.modal', function(e) {

		});

		//在 密码输入框时的回车登录
		$('#password').keypress(function(e) {
			var key = e.which;
			if (key == 13) {
				login();
			}
		});

		$(function() {
			$(window).bind('beforeunload', function() {
			//	if (conn) {

			//		conn.close();
			//		if (navigator.userAgent.indexOf("Firefox") > 0)
			//			return ' ';
			//		else
			//			return '';
			//	}
			});
		});

	});

var ajax_data = null

var queryChartList = function(){
	$.ajax({
		type:"get",
		url: server_url+"/product-web/chat/getContact",
		data: "signId="+GetQueryString("userId"),
		success: function(msg){
			showChatUI();
			var data = JSON.parse(msg)
			ajax_data = data.result
	       console.log( JSON.stringify(data) );   
		},
		error:function(response){
	        console.log(response);
	    }
	});
}
	if(GetQueryString("type") == 1){
		queryChartList()
	}
	
	
	//处理连接时函数,主要是登录成功后对页面元素做处理
	var handleOpen = function(conn) {
		//从连接中获取到当前的登录人注册帐号名
	curUserId = conn.context.userId;
	//curUserId = "喵喵";
		//获取当前登录人的联系人列表
		conn.getRoster({

			success : function(roster) {								
				roster = ajax_data
				
				// 页面处理
				hiddenWaitLoginedUI();
				showChatUI();
				var curroster;
				for ( var i in roster) {
					var ros = roster[i];
					//both为双方互为好友，要显示的联系人,from我是对方的单向好友
					if (ros.subscription == 'both'
							|| ros.subscription == 'from') {
						bothRoster.push(ros);
					} else if (ros.subscription == 'to') {
						//to表明了联系人是我的单向好友
						toRoster.push(ros);
					}
				}

				if (bothRoster.length > 0) {
					curroster = bothRoster[0];
					buildContactDiv("contractlist", bothRoster);//联系人列表页面处理
					if (curroster){

                        setCurrentContact(curroster.name);//页面处理将第一个联系人作为当前聊天div
					}

				}
				//获取当前登录人的群组列表
				conn.listRooms({
					success : function(rooms) {
						if (rooms && rooms.length > 0) {
							buildListRoomDiv("contracgrouplist", rooms);//群组列表页面处理
							if (curChatUserId == null) {
								setCurrentContact(groupFlagMark
										+ rooms[0].roomId);
								$('#accordion2').click();
							}
						}
						conn.setPresence();//设置用户上线状态，必须调用
					},
					error : function(e) {

					}
				});
			}
		});

		//启动心跳
		if (conn.isOpened()) {
			conn.heartBeat(conn);
		}
	};

	//连接中断时的处理，主要是对页面进行处理
	var handleClosed = function() {
		curUserId = null;
		curChatUserId = null;
		curRoomId = null;
		bothRoster = [];
		toRoster = [];
		hiddenChatUI();
		clearContactUI("contactlistUL", "contactgrouplistUL",
				"momogrouplistUL", msgCardDivId);

		showLoginUI();
		groupQuering = false;
		textSending = false;
	};
	//easemobwebim-sdk中收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
	/* var handlePresence = function(e) {
		//（发送者希望订阅接收者的出席信息），即别人申请加你为好友
		if (e.type == 'subscribe') {
			
			if (e.status) {
				if (e.status.indexOf('resp:true') > -1) {
					agreeAddFriend(e.from);
					return;
				}
			}
			var subscribeMessage = e.from + "请求加你为好友。\n验证消息：" + e.status;
			showNewNotice(subscribeMessage);
			$('#confirm-block-footer-confirmButton').click(function() {
				//同意好友请求
				agreeAddFriend(e.from);//e.from用户名
				//反向添加对方好友
				conn.subscribe({
					to : e.from,
					message : "[resp:true]"
				});
				$('#confirm-block-div-modal').modal('hide');
			});
			$('#confirm-block-footer-cancelButton').click(function() {
				rejectAddFriend(e.from);//拒绝加为好友
				$('#confirm-block-div-modal').modal('hide');
			});
			return;
		}
		//(发送者允许接收者接收他们的出席信息)，即别人同意你加他为好友
		if (e.type == 'subscribed') {
			toRoster.push({
				name : e.from,
				jid : e.fromJid,
				subscription : "to"
			});
			return;
		}
		//（发送者取消订阅另一个实体的出席信息）,即删除现有好友
		if (e.type == 'unsubscribe') {
			//单向删除自己的好友信息，具体使用时请结合具体业务进行处理
			delFriend(e.from);
			return;
		}
		//（订阅者的请求被拒绝或以前的订阅被取消），即对方单向的删除了好友
		if (e.type == 'unsubscribed') {
			delFriend(e.from);
			return;
		}
	}; */
	//easemobwebim-sdk中处理出席状态操作
	var handleRoster = function(rosterMsg) {
		for (var i = 0; i < rosterMsg.length; i++) {
			var contact = rosterMsg[i];
			if (contact.ask && contact.ask == 'subscribe') {
				continue;
			}
			if (contact.subscription == 'to') {
				toRoster.push({
					name : contact.name,
					jid : contact.jid,
					subscription : "to"
				});
			}
			//app端删除好友后web端要同时判断状态from做删除对方的操作
			if (contact.subscription == 'from') {
				toRoster.push({
					name : contact.name,
					jid : contact.jid,
					subscription : "from"
				});
			}
			if (contact.subscription == 'both') {

				var isexist = contains(bothRoster, contact);

				if (!isexist) {

					var lielem = $('<li>').attr({
						"id" : contact.name,
						"class" : "offline",
						"className" : "offline"
					}).click(function() {
						chooseContactDivClick(this);
					});
					$('<img>').attr({
						"src" : "${pageContext.request.contextPath}/web-im-master/img/head/contact_normal.png"
					}).appendTo(lielem);

					$('<span>').html(contact.name).appendTo(lielem);
					$('#contactlistUL').append(lielem);
					bothRoster.push(contact);
				}
			}
			if (contact.subscription == 'remove') {
				var isexist = contains(bothRoster, contact);
				if (isexist) {
					removeFriendDomElement(contact.name);
				}
			}
		}
	};
	//异常情况下的处理方法
	var handleError = function(e) {
		if (curUserId == null) {
			hiddenWaitLoginedUI();
			alert(e.msg + ",请重新登录");
			showLoginUI();
		} else {
			var msg = e.msg;
			if (e.type == EASEMOB_IM_CONNCTION_SERVER_CLOSE_ERROR) {
				if (msg == "" || msg == 'unknown' ) {
					alert("服务器断开连接,可能是因为在别处登录");
				} else {
					alert("服务器断开连接");
                }
			} else if (e.type === EASEMOB_IM_CONNCTION_SERVER_ERROR) {
				if (msg.toLowerCase().indexOf("user removed") != -1) {
					alert("用户已经在管理后台删除");
				}
			} else {
				alert(msg);
			}
		}
		conn.stopHeartBeat(conn);
	};
	//判断要操作的联系人和当前联系人列表的关系
	var contains = function(roster, contact) {
		var i = roster.length;
		while (i--) {
			if (roster[i].name === contact.name) {
				return true;
			}
		}
		return false;
	};

	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i].name == val.name)
				return i;
		}
		return -1;
	};
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};


	//登录系统时的操作方法
	var login = function() {
		if ($("#usetoken").is(":checked")) {
			var user = $("#username").val();
			var token = $("#token").val();
			if (user == '' || token == '') {
				alert("请输入用户名和令牌");
				return;
			}
			hiddenLoginUI();
			showWaitLoginedUI();
			//根据用户名令牌登录系统
			conn.open({
				apiUrl : apiURL,
				user : user,
				accessToken : token,	
				//连接时提供appkey
				appKey : appkey
			});
		} else {
			//var user = $("#username").val();
			//var pass = $("#password").val();
			var user = GetQueryString("userId");
			var pass = '123456';
			if (user == '' || pass == '') {
				alert("请输入用户名和密码");
				return;
			}
			hiddenLoginUI();
			showWaitLoginedUI();
			//根据用户名密码登录系统
			conn.open({
				apiUrl : apiURL,
				user : user,
				pwd : pass,
				//连接时提供appkey
				appKey : appkey
			});			
		}
		return true;
	};
    $(function () {
      login();
    });

	//注册新用户操作方法
	var regist = function() {
		var user = $("#regist_username").val();
		var pass = $("#regist_password").val();
		var nickname = $("#regist_nickname").val();
		if (user == '' || pass == '' || nickname == '') {
			alert("用户名/密码/昵称 不能为空");
			return;
		}
		var options = {
			username : user,
			password : pass,
			nickname : nickname,
			appKey : appkey,
			success : function(result) {
				alert("注册成功!");
				$('#loginmodal').modal('show');
				$('#regist-div-modal').modal('hide');
			},
			error : function(e) {
				alert(e.error);
			},
			apiUrl : apiURL
		};
		Easemob.im.Helper.registerUser(options);
	};

	//注册页面返回登录页面操作
	var showlogin = function() {
		$('#loginmodal').modal('show');
		$('#regist-div-modal').modal('hide');
	};

	var logout = function() {
		conn.stopHeartBeat(conn);
		conn.close();
	};

	//设置当前显示的聊天窗口div，如果有联系人则默认选中联系人中的第一个联系人，如没有联系人则当前div为null-nouser
	var setCurrentContact = function(defaultUserId) {
		showContactChatDiv(defaultUserId);
		if (curChatUserId != null) {
			hiddenContactChatDiv(curChatUserId);
		} else {
			$('#null-nouser').css({
				"display" : "none"
			});
		}
		curChatUserId = defaultUserId;
	};

	//构造联系人列表
	var buildContactDiv = function(contactlistDivId, roster) {		

	//	
		var uielem = document.getElementById("contactlistUL");
		var cache = {};
		for (i = 0; i<roster.length; i++) {
			if (!(roster[i].subscription == 'both' || roster[i].subscription == 'from')) {
				continue;
			}
			
			var user_name = roster[i].realName;
			//var jid = roster[i].contactId;
			
			var jid = roster[i].jid;
			var userName = jid.substring(jid.indexOf("_") + 1).split("@")[0];
			if (userName in cache) {
				continue;
			}
			cache[userName] = true;

			var lielem = $('<li>').attr({
				'id' : userName,
				'class' : 'offline',
				'className' : 'offline',
				'type' : 'chat',
				'displayName' : user_name
			}).click(function() {
				chooseContactDivClick(this);
			});

			$('<img>').attr("src", roster[i].url).appendTo(
					lielem);
			$('<span>').html(user_name).appendTo(lielem);
			$('#contactlistUL').append(lielem);
		}
		var contactlist = document.getElementById(contactlistDivId);
		var children = contactlist.children;
		if (children.length > 0) {
			contactlist.removeChild(children[0]);
		}
		contactlist.appendChild(uielem);
	};

	//构造群组列表
	var buildListRoomDiv = function(contactlistDivId, rooms) {
		var uielem = document.getElementById("contactgrouplistUL");
		var cache = {};
		for (i = 0; i<rooms.length; i++) {
			var roomsName = rooms[i].name;
			var roomId = rooms[i].roomId;
			if (roomId in cache) {
				continue;
			}
			cache[roomId] = true;
			var lielem = $('<li>').attr({
				'id' : groupFlagMark + roomId,
				'class' : 'offline',
				'className' : 'offline',
				'type' : 'groupchat',
				'displayName' : roomsName,
				'roomId' : roomId,
				'joined' : 'false'
			}).click(function() {
				chooseContactDivClick(this);
			});
			$('<img>').attr({
				'src' : '${pageContext.request.contextPath}/web-im-master/img/head/group_normal.png'
			}).appendTo(lielem);
			$('<span>').html(roomsName).appendTo(lielem);
			$('#contactgrouplistUL').append(lielem);
		}
		var contactlist = document.getElementById(contactlistDivId);
		var children = contactlist.children;
		if (children.length > 0) {
			contactlist.removeChild(children[0]);
		}
		contactlist.appendChild(uielem);
	};

	//选择联系人的处理
	var getContactLi = function(chatUserId) {
		return document.getElementById(chatUserId);
	};

	//构造当前聊天记录的窗口div
	var getContactChatDiv = function(chatUserId) {
		return document.getElementById(curUserId + "-" + chatUserId);
	};

	//如果当前没有某一个联系人的聊天窗口div就新建一个
	var createContactChatDiv = function(chatUserId) {
		var msgContentDivId = curUserId + "-" + chatUserId;
		var newContent = document.createElement("div");
		$(newContent).attr({
			"id" : msgContentDivId,
			"class" : "chat01_content",
			"className" : "chat01_content",
			"style" : "display:none"
		});
		return newContent;
	};

	//显示当前选中联系人的聊天窗口div，并将该联系人在联系人列表中背景色置为蓝色
	var showContactChatDiv = function(chatUserId) {
		var contentDiv = getContactChatDiv(chatUserId);
		if (contentDiv == null) {
			contentDiv = createContactChatDiv(chatUserId);
			document.getElementById(msgCardDivId).appendChild(contentDiv);
		}
		contentDiv.style.display = "block";
		var contactLi = document.getElementById(chatUserId);
		if (contactLi == null) {
			return;
		}
		contactLi.style.backgroundColor = "#33CCFF";
		var dispalyTitle = null;//聊天窗口显示当前对话人名称
		if (chatUserId.indexOf(groupFlagMark) >= 0) {
			dispalyTitle = "群组" + $(contactLi).attr('displayname') + "聊天中";
			curRoomId = $(contactLi).attr('roomid');
			$("#roomMemberImg").css('display', 'block');
		} else {
			var to_name = null
			for(var i=0; i<ajax_data.length; i++){
				if(ajax_data[i].contactId == chatUserId){
					to_name = ajax_data[i].realName
				}
			}
			
			dispalyTitle = "与" + to_name + "聊天中";
			//dispalyTitle = "与" + "机智的我" + "聊天中";
			$("#roomMemberImg").css('display', 'none');

		}

		document.getElementById(talkToDivId).children[0].innerHTML = dispalyTitle;

	};
	//对上一个联系人的聊天窗口div做隐藏处理，并将联系人列表中选择的联系人背景色置空
	var hiddenContactChatDiv = function(chatUserId) {
		var contactLi = document.getElementById(chatUserId);
		if (contactLi) {
			contactLi.style.backgroundColor = "";
		}
		var contentDiv = getContactChatDiv(chatUserId);
		if (contentDiv) {
			contentDiv.style.display = "none";

		}

	};
	//切换联系人聊天窗口div
	var chooseContactDivClick = function(li) {
		var chatUserId = li.id;
		if ($(li).attr("type") == 'groupchat'
				&& ('true' != $(li).attr("joined"))) {
			conn.join({
				roomId : $(li).attr("roomId")
			});
			$(li).attr("joined", "true");
		}
		if (chatUserId != curChatUserId) {
			if (curChatUserId == null) {
				showContactChatDiv(chatUserId);
			} else {
				showContactChatDiv(chatUserId);
				hiddenContactChatDiv(curChatUserId);
			}
			curChatUserId = chatUserId;
		}
		//对默认的null-nouser div进行处理,走的这里说明联系人列表肯定不为空所以对默认的聊天div进行处理
		$('#null-nouser').css({
			"display" : "none"
		});
		var badgespan = $(li).children(".badge");
		if (badgespan && badgespan.length > 0) {
			li.removeChild(li.children[2]);
		}

		//点击有未读消息对象时对未读消息提醒的处理
		var badgespanGroup = $(li).parent().parent().parent().find(".badge");
		if (badgespanGroup && badgespanGroup.length == 0) {
			$(li).parent().parent().parent().prev().children().children()
					.remove();
		}					
		
		queryHistoryChartList(chatUserId)
	};
	
	var page = 0
	//首次渲染历史聊天记录
	var queryHistoryChartList = function(chatUserId){
		
		var date_time = new Date();
		var year = date_time.getFullYear();
		var month = date_time.getMonth()+1 < 10? '0'+(date_time.getMonth()+1) : date_time.getMonth()+1;
		var day = date_time.getDate()< 10? '0'+date_time.getDate() : date_time.getDate();
		var date_mag = year+month+day
		console.log(date_mag)
		
		var aaa = "signId="+GetQueryString("userId")+"&type="+date_mag+"&toId="+chatUserId
		console.log('参数为:'+aaa)
		
		$.ajax({
			type:"get",
			url: server_url+"/product-web/chat/getMessage",
			data: "signId="+GetQueryString("userId")+"&type="+date_mag+"&toId="+chatUserId,
			success: function(msg){
				console.log(JSON.stringify(msg))
				page = 0
				
				if(JSON.parse(msg).code == 0){
					chartList = JSON.parse(JSON.parse(msg).result.messageData)
					for(var i=0; i<chartList.length; i++){
						chartList[i] = JSON.parse(chartList[i])
					}
					console.log(JSON.stringify(chartList))
			        historyShow(chatUserId,chartList)
				}				
			},
			error:function(response){
		        console.log(response);
		    }
		});				
	}
	
	//渲染历史聊天记录
	var historyShow = function(chatUserId,chartList,type,page=0){		
		if(type != 1){
			page ++
			var div_str = '<p class="query-more" onClick="queryMore('+chatUserId+',this,'+page+')">点击查看更多记录!</p>'
			var from_person = null
			var to_person = null
			var to_div_per = null
			page ++
			for(var i=0; i<chartList.length; i++){
				from_person = chartList[i].fromId
				to_person = chartList[i].toId
				if(chartList[i].fromId == GetQueryString("userId")){	//加入div时的id值后半部分
					to_div_per = chartList[i].toId
				}else{
					to_div_per = chartList[i].fromId
				}
				if(chartList[i].fromId == GetQueryString("userId")){    //判断自己还是对方发消息
					if(chartList[i].type == 'pic'){						//判断消息类型(图片或者文本)		
						var imgNotice = textExpression({
							data:[{
								type: "pic", 
								filename: chartList[i].url, 
								data: 'img'
							}]
						})
						/*var imgNotice = textExpression(
											handlePictureMessage({
												type: "pic",
												from: "88",
												to: "112",
												url: chartList[i].url,
												filename: "",
												width: "200px"									
											})
										)*/
						div_str += '<div style="text-align: right;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+imgNotice+'</p3></div>'
					}else if(chartList[i].type == 'txt'){
						var textNotice = textExpression(chartList[i].msgDate)
						div_str += '<div style="text-align: right;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+textNotice+'</p3></div>'
					}				
				}else{
					if(chartList[i].type == 'pic'){						//判断消息类型(图片或者文本)
						var imgNotice = textExpression({
							data:[{
								type: "pic", 
								filename: chartList[i].url, 
								data: 'img'
							}]
						})
						/*var imgNotice = textExpression(
											handlePictureMessage({
												type: "pic",
												from: "88",
												to: "112",
												url: chartList[i].url,
												filename: "",
												width: "200px"									
											})
										)*/
						div_str += '<div style="text-align: left;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+imgNotice+'</p3></div>'
					}else if(chartList[i].type == 'txt'){
						var textNotice = textExpression(chartList[i].msgDate)
						div_str += '<div style="text-align: left;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+textNotice+'</p3></div>'
					}	
				}
			}
	
			if($("#"+GetQueryString("userId")+"-"+chatUserId).children().length == 0){
				if(from_person == chatUserId || to_person == chatUserId){			
					$("#"+GetQueryString("userId")+"-"+chatUserId).append(div_str)
		
				}
			}
			
			
		}else if(type == 1){
			page ++
			var div_str = '<p class="query-more" onClick="queryMore('+chatUserId+',this,'+page+')">点击查看更多记录!</p>'
			var from_person = null
			var to_person = null
			var to_div_per = null
			
			for(var i=0; i<chartList.length; i++){
				from_person = chartList[i].fromId
				to_person = chartList[i].toId
				if(chartList[i].fromId == GetQueryString("userId")){	//加入div时的id值后半部分
					to_div_per = chartList[i].toId
				}else{
					to_div_per = chartList[i].fromId
				}
				if(chartList[i].fromId == GetQueryString("userId")){    //判断自己还是对方发消息
					if(chartList[i].type == 'pic'){						//判断消息类型(图片或者文本)		
						var imgNotice = textExpression({
							data:[{
								type: "pic", 
								filename: chartList[i].url, 
								data: 'img'
							}]
						})
						div_str += '<div style="text-align: right;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+imgNotice+'</p3></div>'
					}else if(chartList[i].type == 'txt'){
						var textNotice = textExpression(chartList[i].msgDate)
						div_str += '<div style="text-align: right;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+textNotice+'</p3></div>'
					}				
				}else{
					if(chartList[i].type == 'pic'){						//判断消息类型(图片或者文本)
						var imgNotice = textExpression({
							data:[{
								type: "pic", 
								filename: chartList[i].url, 
								data: 'img'
							}]
						})
						div_str += '<div style="text-align: left;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+imgNotice+'</p3></div>'
					}else if(chartList[i].type == 'txt'){
						var textNotice = textExpression(chartList[i].msgDate)
						div_str += '<div style="text-align: left;"><p1>   <span></span>   </p1><p2>'+chartList[i].timestamp+'<b></b><br></p2><p3 class="chat-content-p3" classname="chat-content-p3" style="background-color: rgb(235, 235, 235);">'+textNotice+'</p3></div>'
					}	
				}
			}		
				$(".query-more").after(div_str)	
				page ++
		}
		
	}
	
	//分页查询聊天记录
	var queryMore = function(chatUserId,thisObj,page){
		
		console.log('分页参数是>'+"signId="+GetQueryString("userId")+"&type="+page+"&toId="+chatUserId)
		
		$.ajax({
			type:"get",
			url: server_url+"/product-web/chat/getMessageBy",
			data: "signId="+GetQueryString("userId")+"&type="+page+"&toId="+chatUserId,
			success: function(msg){
				console.log(JSON.stringify(msg))
				var msgObj = JSON.parse(msg)

				console.log(msgObj)

				if(msgObj.code == 0){

					var histroyList = JSON.parse(msgObj.result.messageData)
					for(var i=0; i<histroyList.length; i++){
						histroyList[i] = JSON.parse(histroyList[i])
					}
					
					historyShow(chatUserId,histroyList,1,page)
					thisObj.style.display = 'none'
				}else{
					alert("未查询到更多数据!")
					//alert(msgObj.message)
				}
			},
			error:function(response){
		        console.log(response);
		    }
		});		
	}
	
	//表情图片转换
	var textExpression = function(message){
		// 消息体 {isemotion:true;body:[{type:txt,msg:ssss}{type:emotion,msg:imgdata}]}
		var localMsg = null;
		if (typeof message == 'string') {
			localMsg = Easemob.im.Helper.parseTextMessage(message);
			localMsg = localMsg.body;
		} else {
			localMsg = message.data;
		}
		var headstr = [ "<p1>   <span></span>" + "   </p1>",
		//var headstr = [ "<p1>" + who + "   <span></span>" + "   </p1>",
				"<p2>" + getLoacalTimeString() + "<b></b><br/></p2>" ];
		var header = $(headstr.join(''))

		var lineDiv = document.createElement("div");
		for (var i = 0; i < header.length; i++) {
			var ele = header[i];
			lineDiv.appendChild(ele);
		}
		var messageContent = localMsg;
		var text_totle = ''
		for (var i = 0; i < messageContent.length; i++) {
			var msg = messageContent[i];
			var type = msg.type;
			var data = msg.data;
			if (type == "emotion") {
				var eletext_e = "<p3><img src='" + data + "'/></p3>";
				text_totle += eletext_e
			} else if (type == "pic" || type == 'audio' || type == 'video') {
				var filename = msg.filename;
				var fileele = "<p3><img style='width:200px' src='" + filename + "'/></p3>";
				return fileele
			} else {
				var eletext = "<p3>" + data + "</p3>";
				 text_totle += eletext
			}
		}
		return text_totle
	}
	
	var clearContactUI = function(contactlistUL, contactgrouplistUL,
			momogrouplistUL, contactChatDiv) {
		//清除左侧联系人内容
		$('#contactlistUL').empty();
		$('#contactgrouplistUL').empty();
		$('#momogrouplistUL').empty();

		//处理联系人分组的未读消息处理
		var accordionChild = $('#accordionDiv').children();
		for (var i = 1; i <= accordionChild.length; i++) {
			var badgegroup = $('#accordion' + i).find(".badgegroup");
			if (badgegroup && badgegroup.length > 0) {
				$('#accordion' + i).children().remove();
			}
		}
		;

		//清除右侧对话框内容
		document.getElementById(talkToDivId).children[0].innerHTML = "";
		var chatRootDiv = document.getElementById(contactChatDiv);
		var children = chatRootDiv.children;
		for (var i = children.length - 1; i > 1; i--) {
			chatRootDiv.removeChild(children[i]);
		}
		$('#null-nouser').css({
			"display" : "block"
		});
	};

	var emotionFlag = false;
	var showEmotionDialog = function() {
		if (emotionFlag) {
			$('#wl_faces_box').css({
				"display" : "block"
			});
			return;
		}
		emotionFlag = true;
		// Easemob.im.Helper.EmotionPicData设置表情的json数组
		var sjson = Easemob.im.Helper.EmotionPicData;
		for ( var key in sjson) {
			var emotions = $('<img>').attr({
				"id" : key,
				"src" : sjson[key],
				"style" : "cursor:pointer;"
			}).click(function() {
				selectEmotionImg(this);
			});
			$('<li>').append(emotions).appendTo($('#emotionUL'));
		}
		$('#wl_faces_box').css({
			"display" : "block"
		});
	};
	//表情选择div的关闭方法
	var turnoffFaces_box = function() {
		$("#wl_faces_box").fadeOut("slow");
	};
	var selectEmotionImg = function(selImg) {
		var txt = document.getElementById(talkInputId);
		txt.value = txt.value + selImg.id;
		txt.focus();
	};
	var showSendPic = function() {
		$('#fileModal').modal('toggle');
		$('#sendfiletype').val('pic');
		$('#send-file-warning').html("");
	};
	var showSendAudio = function() {
		$('#fileModal').modal('toggle');
		$('#sendfiletype').val('audio');
		$('#send-file-warning').html("");
	};

	var sendText = function() {
		textSending = true;

		var msgInput = document.getElementById(talkInputId);
		var msg = msgInput.value;


		if (msg == null || msg.length == 0) {
			return;
		}
		var to = curChatUserId;

		if (to == null) {
			return;
		}

		var options = {
			to : to,
			msg : msg,
			type : "chat"
		};
		// 群组消息和个人消息的判断分支
		if (curChatUserId.indexOf(groupFlagMark) >= 0) {
			options.type = 'groupchat';
			options.to = curRoomId;
		}
		//easemobwebim-sdk发送文本消息的方法 to为发送给谁，meg为文本消息对象
		conn.sendTextMessage(options);
		//当前登录人发送的信息在聊天窗口中原样显示
		var msgtext = msg.replace(/\n/g, '<br>');
		appendMsg(curUserId, to, msgtext);
		turnoffFaces_box();
		msgInput.value = "";
		msgInput.focus();

		setTimeout(function() {
			textSending = false;
		}, 1000);
		
		saveChartContent(curUserId,to,msg,'txt')  //调用新增文本方法
	};
	
	//保存聊天信息
	var saveChartContent = function(fromId,toId,msg,type){
		var content = ''
		if(type == 'txt'){
			content = 'msgDate'
		}else{
			content = 'url'
		}
		$.ajax({
				type:"post",
				url: server_url+"/product-web/chat/addMessage",
				data: "signId="+GetQueryString("userId")+
					  "&fromId="+fromId+
					  "&toId="+toId+
					  "&type="+type+
					  "&"+content+"="+msg,
				success: function(msg){
			        console.log( JSON.stringify(msg) );  
				},
				error:function(response){
			        console.log(response);
			    }
			});
	}

	var pictype = {
		"jpg" : true,
		"gif" : true,
		"png" : true,
		"bmp" : true
	};
	var sendFile = function() {
		
		var type = $("#sendfiletype").val();
		if (type == 'pic') {
			sendPic();
		} else {
			sendAudio();
		}
	};
	//发送图片消息时调用方法
	var sendPic = function() {
		var to = curChatUserId;
		if (to == null) {
			return;
		}
		// Easemob.im.Helper.getFileUrl为easemobwebim-sdk获取发送文件对象的方法，fileInputId为 input 标签的id值
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
			$('#send-file-warning')
					.html("<font color='#FF0000'>请选择发送图片</font>");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		
		//saveChartContent(curUserId,curChatUserId,fileObj.url,'pic')   //调用保存图片方法
		
		if (filetype in pictype) {
			document.getElementById("fileSend").disabled = true;
			document.getElementById("cancelfileSend").disabled = true;
			var opt = {
				type : 'chat',
				fileInputId : fileInputId,
				to : to,
				onFileUploadError : function(error) {
					$('#fileModal').modal('hide');
					var messageContent = error.msg + ",发送图片文件失败:" + filename;
					appendMsg(curUserId, to, messageContent);
				},
				onFileUploadComplete : function(data) {
					$('#fileModal').modal('hide');
					var file = document.getElementById(fileInputId);
					if (file && file.files) {
						var objUrl = getObjectURL(file.files[0]);   //上传图片
						if (objUrl) {
							var img = document.createElement("img");
							img.src = objUrl;
							img.width = maxWidth;
						}
					}
					appendMsg(curUserId, to, {
						data : [ {
							type : 'pic',
							filename : filename,
							data : img
						} ]
					});
				}
			};

			if (curChatUserId.indexOf(groupFlagMark) >= 0) {
				opt.type = 'groupchat';
				opt.to = curRoomId;
			}
			opt.apiUrl = apiURL;
			conn.sendPicture(opt);
			return;
		}
		
		$('#send-file-warning').html(
				"<font color='#FF0000'>不支持此图片类型" + filetype + "</font>");				
	};
	var audtype = {
		"mp3" : true,
		"wma" : true,
		"wav" : true,
		"amr" : true,
		"avi" : true
	};
	//发送音频消息时调用的方法
	var sendAudio = function() {
		var to = curChatUserId;
		if (to == null) {
			return;
		}
		//利用easemobwebim-sdk提供的方法来构造一个file对象
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
			$('#send-file-warning')
					.html("<font color='#FF0000'>请选择发送音频</font>");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		if (filetype in audtype) {
			document.getElementById("fileSend").disabled = true;
			document.getElementById("cancelfileSend").disabled = true;
			var opt = {
				type : "chat",
				fileInputId : fileInputId,
				to : to,//发给谁
				onFileUploadError : function(error) {
					$('#fileModal').modal('hide');
					var messageContent = error.msg + ",发送音频失败:" + filename;
					appendMsg(curUserId, to, messageContent);
				},
				onFileUploadComplete : function(data) {
					var messageContent = "发送音频" + filename;
					$('#fileModal').modal('hide');
					appendMsg(curUserId, to, messageContent);
				}
			};
			//构造完opt对象后调用easemobwebim-sdk中发送音频的方法
			if (curChatUserId.indexOf(groupFlagMark) >= 0) {
				opt.type = 'groupchat';
				opt.to = curRoomId;
			}
			opt.apiUrl = apiURL;
			conn.sendAudio(opt);
			return;
		}
		$('#send-file-warning').html(
				"<font color='#FF0000'>不支持此音频类型" + filetype + "</font>");
	};
	//easemobwebim-sdk收到文本消息的回调方法的实现
	var handleTextMessage = function(message) {
		//alert("您有新短消息")   //***********在这里加上这一句**************** 
		var from = message.from;//消息的发送者
		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var messageContent = message.data;//文本消息体
		//TODO  根据消息体的to值去定位那个群组的聊天记录
		var room = message.to;
		if (mestype == 'groupchat') {
			appendMsg(message.from, message.to, messageContent, mestype);
		} else {
			appendMsg(from, from, messageContent);
		}
	};
	//easemobwebim-sdk收到表情消息的回调方法的实现，message为表情符号和文本的消息对象，文本和表情符号sdk中做了
	//统一的处理，不需要用户自己区别字符是文本还是表情符号。
	var handleEmotion = function(message) {
		var from = message.from;
		var room = message.to;
		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		if (mestype == 'groupchat') {
			appendMsg(message.from, message.to, message, mestype);
		} else {
			appendMsg(from, from, message);
		}

	};
	//easemobwebim-sdk收到图片消息的回调方法的实现
	var handlePictureMessage = function(message) {debugger
		var filename = message.filename;//文件名称，带文件扩展名
		var from = message.from;//文件的发送者
		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var contactDivId = from;
		if (mestype == 'groupchat') {
			contactDivId = groupFlagMark + message.to;
		}
		var options = message;
		// 图片消息下载成功后的处理逻辑
		options.onFileDownloadComplete = function(response, xhr) {
			var objectURL = window.URL.createObjectURL(response);
			img = document.createElement("img");
			img.onload = function(e) {
				img.onload = null;
				window.URL.revokeObjectURL(img.src);
			};
			img.onerror = function() {
				img.onerror = null;
				if (typeof FileReader == 'undefined') {
					img.alter = "当前浏览器不支持blob方式";
					return;
				}
				img.onerror = function() {
					img.alter = "当前浏览器不支持blob方式";
				};
				var reader = new FileReader();
				reader.onload = function(event) {
					img.src = this.result;
				};
				reader.readAsDataURL(response);
			}
			img.src = objectURL;
			var pic_real_width = options.width;

			if (pic_real_width == 0) {
				$("<img/>").attr("src", objectURL).load(function() {
					pic_real_width = this.width;
					if (pic_real_width > maxWidth) {
						img.width = maxWidth;
					} else {
						img.width = pic_real_width;
					}
					appendMsg(from, contactDivId, {
						data : [ {
							type : 'pic',
							filename : filename,
							data : img
						} ]
					});

				});
			} else {
				if (pic_real_width > maxWidth) {
					img.width = maxWidth;
				} else {
					img.width = pic_real_width;
				}
				appendMsg(from, contactDivId, {
					data : [ {
						type : 'pic',
						filename : filename,
						data : img
					} ]
				});
			}
		};
        
        var redownLoadFileNum = 0;
		options.onFileDownloadError = function(e) {
            //下载失败时只重新下载一次
            if(redownLoadFileNum < 1){
               redownLoadFileNum++;
                options.accessToken = options_c;
               Easemob.im.Helper.download(options);
               
            }else{
              appendMsg(from, contactDivId, e.msg + ",下载图片" + filename + "失败");
              redownLoadFileNum = 0;
            }
           
		};
		//easemobwebim-sdk包装的下载文件对象的统一处理方法。
		Easemob.im.Helper.download(options);
		//saveChartContent(message.from,message.to,message.url,'pic')   //调用保存图片方法
	};

	//easemobwebim-sdk收到音频消息回调方法的实现
	var handleAudioMessage = function(message) {
		var filename = message.filename;
		var filetype = message.filetype;
		var from = message.from;

		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var contactDivId = from;
		if (mestype == 'groupchat') {
			contactDivId = groupFlagMark + message.to;
		}
		var options = message;
		options.onFileDownloadComplete = function(response, xhr) {
			var objectURL = window.URL.createObjectURL(response);
			var audio = document.createElement("audio");
			if (("src" in audio) && ("controls" in audio)) {
				audio.onload = function() {
					audio.onload = null;
					window.URL.revokeObjectURL(audio.src);
				};
				audio.onerror = function() {
					audio.onerror = null;
					appendMsg(from, contactDivId, "当前浏览器不支持播放此音频:" + filename);
				};
				audio.controls = "controls";
				audio.src = objectURL;
				appendMsg(from, contactDivId, {
					data : [ {
						type : 'audio',
						filename : filename,
						data : audio
					} ]
				});
				//audio.play();
				return;
			}
		};
		options.onFileDownloadError = function(e) {
			appendMsg(from, contactDivId, e.msg + ",下载音频" + filename + "失败");
		};
		options.headers = {
			"Accept" : "audio/mp3"
		};
		Easemob.im.Helper.download(options);
	};

	//处理收到文件消息
	var handleFileMessage = function(message) {
		var filename = message.filename;
		var filetype = message.filetype;
		var from = message.from;

		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var contactDivId = from;
		if (mestype == 'groupchat') {
			contactDivId = groupFlagMark + message.to;
		}
		var options = message;
		options.onFileDownloadComplete = function(response, xhr) {
			var spans = "收到文件消息:" + filename;
			appendMsg(from, contactDivId, spans);
			return;
		};
		options.onFileDownloadError = function(e) {
			appendMsg(from, contactDivId, e.msg + ",下载文件" + filename + "失败");
		};
		Easemob.im.Helper.download(options);
	};
	//收到视频消息
	var handleVideoMessage = function(message) {

		var filename = message.filename;
		var filetype = message.filetype;
		var from = message.from;

		var mestype = message.type;//消息发送的类型是群组消息还是个人消息
		var contactDivId = from;
		if (mestype == 'groupchat') {
			contactDivId = groupFlagMark + message.to;
		}
		var options = message;
		options.onFileDownloadComplete = function(response, xhr) {
			var spans = "收到视频消息:" + filename;
			appendMsg(from, contactDivId, spans);
		};
		options.onFileDownloadError = function(e) {
			appendMsg(from, contactDivId, e.msg + ",下载音频" + filename + "失败");
		};
		Easemob.im.Helper.download(options);
	};
	var handleLocationMessage = function(message) {
		var from = message.from;
		var to = message.to;
		var mestype = message.type;
		var content = message.addr;
		if (mestype == 'groupchat') {
			appendMsg(from, to, content, mestype);
		} else {
			appendMsg(from, from, content, mestype);
		}
	};

	var handleInviteMessage = function(message) {
		var type = message.type;
		var from = message.from;
		var roomId = message.roomid;

		//获取当前登录人的群组列表
		conn.listRooms({
			success : function(rooms) {
				if (rooms) {
					for (i = 0; i < rooms.length; i++) {
						var roomsName = rooms[i].name;
						var roomId = rooms[i].roomId;
						var existRoom = $('#contactgrouplistUL').children(
								'#group--' + roomId);
						if (existRoom && existRoom.length == 0) {
							var lielem = $('<li>').attr({
								'id' : groupFlagMark + roomId,
								'class' : 'offline',
								'className' : 'offline',
								'type' : 'groupchat',
								'displayName' : roomsName,
								'roomId' : roomId,
								'joined' : 'false'
							}).click(function() {
								chooseContactDivClick(this);
							});
							$('<img>').attr({
								'src' : '${pageContext.request.contextPath}/web-im-master/img/head/group_normal.png'
							}).appendTo(lielem);
							$('<span>').html(roomsName).appendTo(lielem);
							$('#contactgrouplistUL').append(lielem);
							//return;
						}
					}
					//cleanListRoomDiv();//先将原群组列表中的内容清除，再将最新的群组列表加入
					//buildListRoomDiv("contracgrouplist", rooms);//群组列表页面处理
				}
			},
			error : function(e) {
			}
		});

	};
	var cleanListRoomDiv = function cleanListRoomDiv() {
		$('#contactgrouplistUL').empty();
	};

	//收到陌生人消息时创建陌生人列表
	var createMomogrouplistUL = function createMomogrouplistUL(who, message) {
		var momogrouplistUL = document.getElementById("momogrouplistUL");
		var cache = {};

		if (who in cache) {
			return;
		}
		cache[who] = true;
		var lielem = document.createElement("li");
		$(lielem).attr({
			'id' : who,
			'class' : 'offline',
			'className' : 'offline',
			'type' : 'chat',
			'displayName' : who
		});
		lielem.onclick = function() {
			chooseContactDivClick(this);
		};
		var imgelem = document.createElement("img");
		imgelem.setAttribute("src", "${pageContext.request.contextPath}/web-im-master/img/head/contact_normal.png");
		lielem.appendChild(imgelem);

		var spanelem = document.createElement("span");
		spanelem.innerHTML = who;
		lielem.appendChild(spanelem);

		momogrouplistUL.appendChild(lielem);
	};
	//显示聊天记录的统一处理方法  who->发送人    contact->接收人    message->消息
	var appendMsg = function(who, contact, message, chattype) {
		var contactUL = document.getElementById("contactlistUL");
		var contactDivId = contact;
		if (chattype && chattype == 'groupchat') {
			contactDivId = groupFlagMark + contact;
		}
		var contactLi = getContactLi(contactDivId);
		if (contactLi == null) {
			createMomogrouplistUL(who, message);
		}

		// 消息体 {isemotion:true;body:[{type:txt,msg:ssss}{type:emotion,msg:imgdata}]}
		var localMsg = null;
		if (typeof message == 'string') {
			localMsg = Easemob.im.Helper.parseTextMessage(message);
			localMsg = localMsg.body;
		} else {
			localMsg = message.data;
		}
		var headstr = [ "<p1>   <span></span>" + "   </p1>",
		//var headstr = [ "<p1>" + who + "   <span></span>" + "   </p1>",
				"<p2>" + getLoacalTimeString() + "<b></b><br/></p2>" ];
		var header = $(headstr.join(''))

		var lineDiv = document.createElement("div");
		for (var i = 0; i < header.length; i++) {
			var ele = header[i];
			lineDiv.appendChild(ele);
		}
		var messageContent = localMsg;
		for (var i = 0; i < messageContent.length; i++) {
			var msg = messageContent[i];
			var type = msg.type;
			var data = msg.data;
			if (type == "emotion") {
				var eletext = "<p3><img src='" + data + "'/></p3>";
				var ele = $(eletext);
				for (var j = 0; j < ele.length; j++) {
					lineDiv.appendChild(ele[j]);
				}
			} else if (type == "pic" || type == 'audio' || type == 'video') {
				var filename = msg.filename;
				var fileele = $("<p3>" + filename + "</p3><br>");
				for (var j = 0; j < fileele.length; j++) {
					lineDiv.appendChild(fileele[j]);
				}
				lineDiv.appendChild(data);
			} else {
				var eletext = "<p3>" + data + "</p3>";
				var ele = $(eletext);
				ele[0].setAttribute("class", "chat-content-p3");
				ele[0].setAttribute("className", "chat-content-p3");
				if (curUserId == who) {
					ele[0].style.backgroundColor = "#EBEBEB";
				}
				for (var j = 0; j < ele.length; j++) {
					lineDiv.appendChild(ele[j]);
				}
			}
		}
		if (curChatUserId == null && chattype == null) {
			setCurrentContact(contact);
			if (time < 1) {
				$('#accordion3').click();
				time++;
			}
		}
		if (curChatUserId && curChatUserId.indexOf(contact) < 0) {
			var contactLi = getContactLi(contactDivId);
			if (contactLi == null) {
				return;
			}
			contactLi.style.backgroundColor = "green";
			var badgespan = $(contactLi).children(".badge");
			if (badgespan && badgespan.length > 0) {
				var count = badgespan.text();
				var myNum = new Number(count);
				myNum++;
				badgespan.text(myNum);

			} else {
				$(contactLi).append('<span class="badge">1</span>');
			}
			//联系人不同分组的未读消息提醒
			var badgespanGroup = $(contactLi).parent().parent().parent().prev()
					.children().children(".badgegroup");
			if (badgespanGroup && badgespanGroup.length == 0) {
				$(contactLi).parent().parent().parent().prev().children()
						.append('<span class="badgegroup">New</span>');
			}

		}
		var msgContentDiv = getContactChatDiv(contactDivId);
		if (curUserId == who) {
			lineDiv.style.textAlign = "right";
		} else {
			lineDiv.style.textAlign = "left";
		}
		var create = false;
		if (msgContentDiv == null) {
			msgContentDiv = createContactChatDiv(contactDivId);
			create = true;
		}
		msgContentDiv.appendChild(lineDiv);
		if (create) {
			document.getElementById(msgCardDivId).appendChild(msgContentDiv);
		}
		msgContentDiv.scrollTop = msgContentDiv.scrollHeight;
		return lineDiv;

	};

	var showAddFriend = function() {
		$('#addFridentModal').modal('toggle');
		$('#addfridentId').val('好友账号');//输入好友账号
		$('#add-frident-warning').html("");
	};

	//添加输入框鼠标焦点进入时清空输入框中的内容
	var clearInputValue = function(inputId) {
		$('#' + inputId).val('');
	};

	var showDelFriend = function() {
		$('#delFridentModal').modal('toggle');
		$('#delfridentId').val('好友账号');//输入好友账号
		$('#del-frident-warning').html("");
	};

	//消息通知操作时条用的方法
	var showNewNotice = function(message) {
		$('#confirm-block-div-modal').modal('toggle');
		$('#confirm-block-footer-body').html(message);
	};

	var showWarning = function(message) {
		$('#notice-block-div').modal('toggle');
		$('#notice-block-body').html(message);
	};

	//主动添加好友操作的实现方法
	var startAddFriend = function() {
		var user = $('#addfridentId').val();
		if (user == '') {
			$('#add-frident-warning').html(
					"<font color='#FF0000'> 请输入好友名称</font>");
			return;
		}
		if (bothRoster)
			for (var i = 0; i < bothRoster.length; i++) {
				if (bothRoster[i].name == user) {
					$('#add-frident-warning').html(
							"<font color='#FF0000'> 已是您的好友</font>");
					return;
				}
			}
		//发送添加好友请求
		conn.subscribe({
			to : user,
			message : "加个好友呗-" + getLoacalTimeString()
		});
		$('#addFridentModal').modal('hide');
		return;
	};

	//回调方法执行时同意添加好友操作的实现方法
	var agreeAddFriend = function(user) {
		conn.subscribed({
			to : user,
			message : "[resp:true]"
		});
	};
	//拒绝添加好友的方法处理
	var rejectAddFriend = function(user) {
		conn.unsubscribed({
			to : user,
			message : getLoacalTimeString()
		});
	};

	//直接调用删除操作时的调用方法
	var directDelFriend = function() {
		var user = $('#delfridentId').val();
		if (validateFriend(user, bothRoster)) {
			conn.removeRoster({
				to : user,
				success : function() {
					conn.unsubscribed({
						to : user
					});
					//删除操作成功时隐藏掉dialog
					$('#delFridentModal').modal('hide');
				},
				error : function() {
					$('#del-frident-warning').html(
							"<font color='#FF0000'>删除联系人失败!</font>");
				}
			});
		} else {
			$('#del-frident-warning').html(
					"<font color='#FF0000'>该用户不是你的好友!</font>");
		}
	};
	//判断要删除的好友是否在当前好友列表中
	var validateFriend = function(optionuser, bothRoster) {
		for ( var deluser in bothRoster) {
			if (optionuser == bothRoster[deluser].name) {
				return true;
			}
		}
		return true;
	};

	//回调方法执行时删除好友操作的方法处理
	var delFriend = function(user) {
		conn.removeRoster({
			to : user,
			groups : [ 'default' ],
			success : function() {
				conn.unsubscribed({
					to : user
				});
			}
		});
	};
	var removeFriendDomElement = function(userToDel, local) {
		var contactToDel;
		if (bothRoster.length > 0) {
			for (var i = 0; i < bothRoster.length; i++) {
				if (bothRoster[i].name == userToDel) {
					contactToDel = bothRoster[i];
					break;
				}
			}
		}
		if (contactToDel) {
			bothRoster.remove(contactToDel);
		}
		// 隐藏删除好友窗口
		if (local) {
			$('#delFridentModal').modal('hide');
		}
		//删除通讯录
		$('#' + userToDel).remove();
		//删除聊天
		var chatDivId = curUserId + "-" + userToDel;
		var chatDiv = $('#' + chatDivId);
		if (chatDiv) {
			chatDiv.remove();
		}
		if (curChatUserId != userToDel) {
			return;
		} else {
			var displayName = '';
			//将第一个联系人作为当前聊天div
			if (bothRoster.length > 0) {
				curChatUserId = bothRoster[0].name;
				$('#' + curChatUserId).css({
					"background-color" : "#33CCFF"
				});
				var currentDiv = getContactChatDiv(curChatUserId)
						|| createContactChatDiv(curChatUserId);
				document.getElementById(msgCardDivId).appendChild(currentDiv);
				$(currentDiv).css({
					"display" : "block"
				});
				
				var to_name = null
				for(var i=0; i<ajax_data.length; i++){
					if(ajax_data[i].contactId == curChatUserId){
						to_name = ajax_data[i].realName
					}
				}
				
				displayName = '与' + to_name + '聊天中';
			} else {
				$('#null-nouser').css({
					"display" : "block"
				});
				displayName = '';
			}
			$('#talkTo').html('<a href="#">' + displayName + '</a>');
		}
	};

	//清除聊天记录
	var clearCurrentChat = function clearCurrentChat() {
		var currentDiv = getContactChatDiv(curChatUserId)
				|| createContactChatDiv(curChatUserId);
		currentDiv.innerHTML = "";
	};

	//显示成员列表
	var showRoomMember = function showRoomMember() {
		if (groupQuering) {
			return;
		}
		groupQuering = true;
		queryOccupants(curRoomId);
	};

	//根据roomId查询room成员列表
	var queryOccupants = function queryOccupants(roomId) {
		var occupants = [];
		conn.queryRoomInfo({
			roomId : roomId,
			success : function(occs) {
				if (occs) {
					for (var i = 0; i < occs.length; i++) {
						occupants.push(occs[i]);
					}
				}
				conn.queryRoomMember({
					roomId : roomId,
					success : function(members) {
						if (members) {
							for (var i = 0; i < members.length; i++) {
								occupants.push(members[i]);
							}
						}
						showRoomMemberList(occupants);
						groupQuering = false;
					},
					error : function() {
						groupQuering = false;
					}
				});
			},
			error : function() {
				groupQuering = false;
			}
		});
	};

	var showRoomMemberList = function showRoomMemberList(occupants) {
		var list = $('#room-member-list')[0];
		var childs = list.childNodes;
		for (var i = childs.length - 1; i >= 0; i--) {
			list.removeChild(childs.item(i));
		}
		for (i = 0; i < occupants.length; i++) {
			var jid = occupants[i].jid;
			var userName = jid.substring(jid.indexOf("_") + 1).split("@")[0];
			var txt = $("<p></p>").text(userName);
			$('#room-member-list').append(txt);
		}
		$('#option-room-div-modal').modal('toggle');
	};

	var showRegist = function showRegist() {
		$('#loginmodal').modal('hide');
		$('#regist-div-modal').modal('toggle');
	};

	var getObjectURL = function getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	};
	var getLoacalTimeString = function getLoacalTimeString() {
		var date = new Date();
		var time = date.getHours() + ":" + date.getMinutes() + ":"
				+ date.getSeconds();
		return time;
	}

		