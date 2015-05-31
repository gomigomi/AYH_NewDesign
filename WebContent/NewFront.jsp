<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>

<%
	//request scope에 담긴 오류메세지 받아오기  나중에 커스텀태그로 둘수도.

	String errMsg = (String)request.getAttribute("errMsg");
	if(errMsg==null){
		errMsg="";
	}
	String errMsg2 = (String)request.getAttribute("errMsg2");
	if(errMsg2==null){
		errMsg2="";
	}
	String signErr = (String)request.getAttribute("signErr");
	if(signErr==null){
		signErr="0";
	}
%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/json2/20140204/json2.js"></script>
<script>
$(function() {

	$('#left-top').click(function(){
		$('#login-bot').show();
		$('#signin-bot').hide();
		$('#left-top').css("background-color", 'rgba(236,240,246,1)');
		$('#left-top').css("color", '#F15A24');
		$('#right-top').css("background-color", '#F15A24');
		$('#right-top').css("color", 'white');
	});
	
	$('#right-top').click(function(){
		$('#login-bot').hide();
		$('#signin-bot').show();
		$('#left-top').css("background-color", '#F15A24');
		$('#left-top').css("color", 'white');
		$('#right-top').css("background-color", 'rgba(236,240,246,1)');
		$('#right-top').css("color", '#F15A24');
		
	});
	
});
</script>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/front.css">
<title>front</title>
</head>
<body>
	<div id="wrapper">
		<img src="/img/icon/front/logo.jpg" id="logo"/>
		<div id="front-wrapper">
			<div id="top-wrapper">
				<div class="top-menu" id="left-top">
					로그인
				</div>
				<div class="top-menu" id="right-top">
					회원가입
				</div>
			</div>
		<div id="bot-wrapper">
			<div id="login-bot">
				<form name="form-login" id="form-login" method="POST" action="login.jsp">
					<div class="login-item" style="padding-top:18%;border-top-left-radius: 10px; border-top-right-radius: 10px;border:0 solid;">
						<i class="fa fa-user" style="padding-left:15%;"></i>
						<input class="login-input" type="text" name="id" placeholder="  Your ID" style="font-family: 굴림; font-size: 1em; color: black; background-color: white;border-radius: 10px;padding: 0.5em;" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#ffffff'"/>
					</div>
					<div class="login-item">
						<i class="fa fa-key" style="padding-left:14.5%;"></i>
						<input class="login-input" type="password" name="pw" placeholder="  Password" style="font-family: 굴림; font-size: 1em; color: black; border-radius: 10px; padding: 0.5em; background-color: rgb(255, 255, 255); margin-top:2%;" onMouseOut="this.style.backgroundColor='#ffffff'"/>
					</div>
					<div class="error"><%=errMsg %></div>	
					<div class="login-item">
						<button type="submit" class='front-button' style="padding: 2.5% 40%; margin-bottom: 5%; margin-top: 7%; border-radius:10px; border: 0 solid;">로그인</button>
					</div>
				</form>
			</div>

			<div id="signin-bot">
				<form name="form-sign" id="form-sign" method="POST" action="signin.jsp" enctype="multipart/form-data">
				    <div class="signin-item" style="padding-top:10%;border-top-left-radius: 10px; border-top-right-radius: 10px;border:0 solid;">
				    	<i class="fa fa-user" style="padding-left:15.5%;"></i>
				    	<input class="signin-input" type="text" name="id" id="id" placeholder="  Your ID" style="margin-top:7%; font-family: 굴림; font-size: 1em; color: black; border-radius: 10px; padding: 0.2em; background-color: rgb(255, 255, 255);" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#ffffff'"/>
				    </div>
				    <div class="signin-item">
				    	<i class="fa fa-user" style="padding-left:15.5%;"></i>
				    	<input class="signin-input" type="text" name="name" id="name" placeholder="  Your Name" style="margin-top:2%; font-family: 굴림; font-size: 1em; color: black; border-radius: 10px; padding: 0.2em; background-color: rgb(255, 255, 255);" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#ffffff'"/>
				    </div>
				    <div class="signin-item">
				    	<i class="fa fa-key" style="padding-left:15.5%;"></i>
				    	<input class="signin-input" type="password" name="pw" id="pw" placeholder="  Your Password" style="margin-top:2%; font-family: 굴림; font-size: 1em; color: black; border-radius: 10px; padding: 0.2em; background-color: rgb(255, 255, 255);" onMouseOver="this.style.backgroundColor='white'" onMouseOut="this.style.backgroundColor='#ffffff'"/>
				    </div>
				    <div class="signin-item" style="padding-left:15.5%;">
				    	<i class="fa fa-picture-o"></i>
				    	<input class="signin-input" type="file" name="thumbnail" id="thumbnail" style="margin-top:2%;">
				    </div>
				    <div class="error"><%=errMsg2 %></div>
				    <div class="signin-item">
						<button type="submit" class='front-button' style="padding: 2.5% 38%; margin-bottom:5%; margin-top:7%; border-radius:10px; border: 0 solid;">회원가입</button>
					</div> 
				</form>
			</div>
		</div>	
		</div>
	</div>
<script>	
if(<%=signErr%>=='1'){
	$('#login-bot').hide();
	$('#signin-bot').show();
}
</script>
</body>
</html>