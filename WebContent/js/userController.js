var id = window.sessionStorage.getItem('id');
var pass = window.sessionStorage.getItem('pass');
var name = window.sessionStorage.getItem('name');
var thumb = window.sessionStorage.getItem('thumb');
var userElem = '<span class = "top_id_name" id="top_name">'+name+'</span>'+
			   '<span class = "top_id_name" id="top_id">'+id+'</span>'
			
			
$(function(){
	$('#user_information').append(userElem);
	$('#top_thumb').css("background-image", 'url('+'"/img/common/'+thumb+'"'+')');

	//로그아웃 버튼 제어.
	$('#logout_btn').click(function(){
		sessionStorage.clear();
		location.href="/NewFront.jsp";
	})
})
