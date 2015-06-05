$(document).ready(function() {
	
	
	var session = {
		id : window.sessionStorage.getItem('id'),
		name : window.sessionStorage.getItem('name')
	};
	var thumb = window.sessionStorage.getItem('thumb');
	var pass = window.sessionStorage.getItem('pw');
	
	
	if(!session.id){
		
	}else{
		$('.logon').show();
		$('.logoff').hide();
		
		$('#top_thumbImg').attr("src","/img/thumb/"+thumb);
		$('#user_edit_id').val(session.id);
		$('#user_edit_name').val(session.name);
		$('#user_edit_pass').val(pass);
	}
	
	
	
});