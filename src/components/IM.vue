<template>
	<div>
		<div class="showorhidden"   style="position: fixed;right: 60px;bottom: 60px;z-index:88;">
			<img src="http://localhost:8080/yjw/web-im-master/img/chatbegin.jpg"/>
		</div>
			<div class="content" id="content" style=" visibility: hidden;position: fixed;right: 700px;bottom: 380px;z-index:2">
				<div class="leftcontact" id="leftcontact">
					<div id="headerimg" class="leftheader">
						<span> <img src="${pageContext.request.contextPath}/web-im-master/img/head/header2.jpg" alt="logo"
							class="img-circle" width="60px" height="60px"
							style="margin-top: -40px; margin-left: 20px" /></span> <span
							id="login_user" class="login_user_title"> <a
							class="leftheader-font" href="#"></a>
						</span> <span>
							<div class="btn-group" style="margin-left: 5px;">
								<button class="btn btn-inverse dropdown-toggle"
									data-toggle="dropdown">
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="#" onclick="showAddFriend()">添加好友</a></li>
									<li><a href="#" onclick="showDelFriend()">删除好友</a></li>
									<li class="divider"></li>
									<li><a href="#" onclick="logout()">退出</a></li>
								</ul>
							</div>
						</span>
					</div>
					<div id="leftmiddle">
						<!--
						<input style="width: 120px; color: #999999; margin-top: 8px;"
							type="text" id="searchfriend" value="搜索"
							onFocus="if(value==defaultValue){value='';this.style.color='#000'}"
							onBlur="if(!value){value=defaultValue;this.style.color='#999'}" />
						<button id="searchFriend" style="background: #cccccc">查询</button>
					-->
					</div>
					
					<div id="contractlist11"
						style="height: 492px; overflow-y: auto; overflow-x: auto;">
						<div class="accordion" id="accordionDiv">
							<div class="accordion-group">
								<div class="accordion-heading">
								<a href="javascript:;" onclick="easemobIM()">你的目标元素</a>
									<a id="accordion1" class="accordion-toggle"
										data-toggle="collapse" data-parent="#accordionDiv"
										href="#collapseOne">我的好友 </a>
								</div>
								<div id="collapseOne" class="accordion-body collapse in">
									<div class="accordion-inner" id="contractlist">
										<ul id="contactlistUL" class="chat03_content_ul"></ul>
									</div>
								</div>
							</div>
							<div class="accordion-group">
								<div class="accordion-heading">
									<a id="accordion2" class="accordion-toggle collapsed"
										data-toggle="collapse" data-parent="#accordionDiv"
										href="#collapseTwo">我的群组</a>
								</div>
								<div id="collapseTwo" class="accordion-body collapse">
									<div class="accordion-inner" id="contracgrouplist">
										<ul id="contactgrouplistUL" class="chat03_content_ul"></ul>
									</div>
								</div>
							</div>
							<div class="accordion-group">
								<div class="accordion-heading">
									<a id="accordion3" class="accordion-toggle collapsed"
										data-toggle="collapse" data-parent="#accordionDiv"
										href="#collapseThree">陌生人</a>
								</div>
								<div id="collapseThree" class="accordion-body collapse">
									<div class="accordion-inner" id="momogrouplist">
										<ul id="momogrouplistUL" class="chat03_content_ul"></ul>
									</div>
								</div>
							</div>
						</div>
		
					</div>
				</div>
				<div id="rightTop" style="height: 78px;"></div>
				<!-- 聊天页面 -->
				<div class="chatRight"  >
					<div id="chat01">
						<div class="chat01_title">
							<ul class="talkTo">
								<li id="talkTo"><a href="#"></a></li>
									<li  id="excitechat"  style="float: right;"><img
									src="${pageContext.request.contextPath}/web-im-master/img/tuiexcit.jpg"
									style="cursor: hand; width: 30px; " title="退出" /></li>
								<li id="recycle" style="float: right;"><img
									src="${pageContext.request.contextPath}/web-im-master/img/recycle.png" onclick="clearCurrentChat();"
									style="margin-right: 15px; cursor: hand; width: 18px;" title="清屏" /></li>
									
								<li id="roomInfo" style="float: right;"><img
									id="roomMemberImg"
									src="${pageContext.request.contextPath}/web-im-master/img/head/find_more_friend_addfriend_icon.png"
									onclick="showRoomMember();"
									style="margin-right: 15px; cursor: hand; width: 18px; display: none"
									title="群组成员" /></li>
								
							</ul>
						</div>
						<div id="null-nouser" class="chat01_content">
								
						</div>
					</div>
		
					<div class="chat02">
						<div class="chat02_title">
							<a class="chat02_title_btn ctb01" onclick="showEmotionDialog()"
								title="选择表情"></a> <a class="chat02_title_btn ctb03" title="选择图片"
								onclick="showSendPic()" href="#"> </a> <a
								class="chat02_title_btn ctb02" onclick="showSendAudio()" href="#"
								title="选择语音"><span></span></a> <label id="chat02_title_t"></label>
							<div id="wl_faces_box" class="wl_faces_box">
								<div class="wl_faces_content">
									<div class="title">
										<ul>
											<li class="title_name">常用表情</li>
											<li class="wl_faces_close"><span
												onclick='turnoffFaces_box()'>&nbsp;</span></li>
										</ul>
									</div>
									<div id="wl_faces_main" class="wl_faces_main">
										<ul id="emotionUL">
										</ul>
									</div>
								</div>
								<div class="wlf_icon"></div>
							</div>
						</div>
						<div id="input_content" class="chat02_content">
							<textarea id="talkInputId" style="resize: none;"></textarea>
						</div>
						<div class="chat02_bar">
							<ul>
								<li style="right: 5px; top: 5px;"><img src="${pageContext.request.contextPath}/web-im-master/img/send_btn.jpg"
									onclick="sendText()" /></li>
							</ul>
						</div>
		
						<div style="clear: both;"></div>
					</div>
					<div id="fileModal" class="modal hide fade" role="dialog"
						aria-hidden="true" data-backdrop="false">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<h3>文件选择框</h3>
						</div>
						<div class="modal-body">
							<input type='file' id="fileInput" /> <input type='hidden'
								id="sendfiletype" />
							<div id="send-file-warning"></div>
						</div>
						<div class="modal-footer">
							<button id="fileSend" class="btn btn-primary" onclick="sendFile()">发送</button>
							<button id="cancelfileSend" class="btn" data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
		
				<div id="addFridentModal" class="modal hide fade" role="dialog"
					aria-hidden="true" data-backdrop="false">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h3>添加好友</h3>
					</div>
					<div class="modal-body">
						<input id="addfridentId" onfocus='clearInputValue("addfridentId")' />
						<div id="add-frident-warning"></div>
					</div>
					<div class="modal-footer">
						<button id="addFridend" class="btn btn-primary"
							onclick="startAddFriend()">添加</button>
						<button id="cancelAddFridend" class="btn" data-dismiss="modal">取消</button>
					</div>
				</div>
		
				<div id="delFridentModal" class="modal hide fade" role="dialog"
					aria-hidden="true" data-backdrop="false">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h3>删除好友</h3>
					</div>
					<div class="modal-body">
						<input id="delfridentId" onfocus='clearInputValue("delfridentId")' />
						<div id="del-frident-warning"></div>
					</div>
					<div class="modal-footer">
						<button id="delFridend" class="btn btn-primary"
							onclick="directDelFriend()">删除</button>
						<button id="canceldelFridend" class="btn" data-dismiss="modal">取消</button>
					</div>
				</div>
		
				<!-- 一般消息通知 -->
				<div id="notice-block-div" class="modal fade hide">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<div class="modal-body">
						<h4>Warning!</h4>
						<div id="notice-block-body"></div>
					</div>
				</div>
		
				<!-- 确认消息通知 -->
				<div id="confirm-block-div-modal" class="modal fade hide"
					role="dialog" aria-hidden="true" data-backdrop="static">
					<div class="modal-header">
						<h3>订阅通知</h3>
					</div>
					<div class="modal-body">
						<div id="confirm-block-footer-body"></div>
					</div>
					<div class="modal-footer">
						<button id="confirm-block-footer-confirmButton"
							class="btn btn-primary">同意</button>
						<button id="confirm-block-footer-cancelButton" class="btn"
							data-dismiss="modal">拒绝</button>
					</div>
				</div>
		
				<!-- 群组成员操作界面 -->
				<div id="option-room-div-modal" class="alert modal fade hide"
					role="dialog" aria-hidden="true" data-backdrop="static">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<div class="modal-header">
						<h3>群组成员</h3>
					</div>
					<div class="modal-body">
						<div id="room-member-list" style="height: 100px; overflow-y: auto"></div>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
</script>

<style>
</style>