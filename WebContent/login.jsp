<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap" %>

<jsp:useBean id="udao" class="com.hungry.user.UserDao" />
    
<% request.setCharacterEncoding("UTF-8"); %>

<%
	String form_id = request.getParameter("id"); 
	String form_pw = request.getParameter("pw");
%>

<%
	HashMap<String, Object> userHash = new HashMap<String, Object>();
	userHash = udao.loginUser(form_id, form_pw);
	String idHash;
	String pwHash;
	String nameHash;
	String regdateHash;
	String thumbHash;
	
	if(userHash.isEmpty()){
		System.out.println("wrong");
		request.setAttribute("errMsg", "아이디나 비밀번호가 일치하지 않습니다.");
		RequestDispatcher rd = request.getRequestDispatcher("NewFront.jsp");
		rd.forward(request, response);
	}else{
		idHash = (String)userHash.get("id");
		pwHash = (String)userHash.get("pass");
		thumbHash = (String)userHash.get("bookmark");
		
		session.setAttribute("id", idHash);
		session.setAttribute("pass", pwHash);
		session.setAttribute("thumb", thumbHash);		
	}

%>		

<%--jsp ¼¼¼Ç session to js jquery ¼¼¼Ç session --%>
<%
	String id = (String)session.getAttribute("id");
	String pw = (String)session.getAttribute("pass");
	String thumb = (String)session.getAttribute("thumb");
%>

<%
/* 	if(idHash.isEmpty()){
		System.out.println("wrong");
		request.setAttribute("errMsg", "아이디나 비밀번호가 일치하지 않습니다.");
		RequestDispatcher rd = request.getRequestDispatcher("NewFront.jsp");
		rd.forward(request, response);
	} */
%>

<!DOCTYPE html>
<html>
<head>


<script type="text/javascript">
	function redirectPage(){
	sessionStorage.setItem("id", "<%=id%>")
	sessionStorage.setItem("pw", "<%=pw%>")
	sessionStorage.setItem("thumb", "<%=thumb%>")
	document.location.href= "index.html"
	}

</script>

<script>redirectPage();</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>log-ining...</title>
</head>
<body>

</body>
</html>
