var id = window.sessionStorage.getItem('id');
var pass = window.sessionStorage.getItem('pass');
var name = window.sessionStorage.getItem('name');
var thumb = window.sessionStorage.getItem('thumb');
var userElem = '<span class = "top_id_name" id="top_name">'+name+'</span>'+
			   '<span class = "top_id_name" id="top_id">'+id+'</span>'
			
			
$(function(){
	$('#user_edit_id').val(id);
	$('#user_edit_name').val(name);
	$('#user_delete_id').val(id);
	
	$('#user_information').append(userElem);
	$('#top_thumb').append("<img src='/img/common/"+thumb+"'>");

	//로그아웃 버튼 제어.
	$('#logout_btn').click(function(){
		sessionStorage.clear();
		location.href="/NewFront.jsp";
	})

	//profile edit process
	$('#profile_edit_submit').click(
		function() {
			var id = $('#user_edit_id').val();
			var name = $('#user_edit_name').val();
			var pass = $('#user_edit_pass').val();
			var newPass = $('#user_edit_newpass').val();
//			var thumb = $('#user_edit_thumb').val().substring(12);

			var form = $('#profile_edit_form')[0];
			var updateUser = new FormData(form);

			
			if (!passconf) {
				alert("비밀번호를 한 번 더 입력해 주세요.")
				return false;
			} else if (!pass) {
				alert("비밀번호를 입력해 주세요.");
				return false;
			} else if (passconf == pass) {
				$.ajax({
					url : 'http://localhost:8080/postUser?type=2',
					type : 'POST',
					contentType : false,
					processData : false,
					data : updateUser,
					success : function(res) {

						window.sessionStorage.setItem('name', name);
						window.sessionStorage.setItem('pass', pass);
						window.sessionStorage.setItem('thumb', thumb);

						$('#user_edit_name').val(name);
						$('#user_edit_pass').val(pass);
						$('#user_edit_passconf').val('');

						alert('edit success');
						$.modal.close();
						$('.info').text(id + '(' + name + ')');
						$('.thumb').css("background-image",
								'url(' + '"/img/common/' + thumb + '"' + ')');
						updateUser = new FormData();

					}
				});
			} 
		});


	//user delete process
	$('#profile_delete_submit').click(function() {
		var id = $('#user_edit_id').val();
		var pass = $('#user_edit_pass').val();

		var check = confirm('Are you sure to delete your id? All your postings will be deleted');
		if (check) {
			$.ajax({
				url : 'http://localhost:8080/deleteUser?id='+id,
				method : 'DELETE',
				dataType : 'json',
				success : function(res) {
					console.log("user-delete");
					sessionStorage.clear();
					location.href = "/NewFront.jsp";
				}
			});
		}
	});

})


