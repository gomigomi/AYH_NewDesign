var id = window.sessionStorage.getItem('id');
var pass = window.sessionStorage.getItem('pw');
var name = window.sessionStorage.getItem('name');
var thumb = window.sessionStorage.getItem('thumb');
var userElem = '<span class = "top_id_name" id="top_name">' + name + '</span>'
		+ '<span class = "top_id_name" id="top_id">' + id + '</span>'
		
function readProfileImgURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('#profileEdit_thumbImg').attr('src', e.target.result);
	}

	reader.readAsDataURL(input.files[0]);
	}
}
		
$(function() {
	$('#user_edit_id').val(id);
	$('#user_edit_name').val(name);
	$('#user_delete_id').val(id);

	$('#user_information').append(userElem);
	$('#top_thumb').append("<img src='/img/common/" + thumb + "'>");
	$('#profileEdit_thumbImg').attr("src", "/img/common/" + thumb);

	// 로그아웃 버튼 제어.
	$('#logout_btn').click(function() {
		sessionStorage.clear();
		location.href = "/NewFront.jsp";
	});

	// 이미지 미리보기
	$("#thumbE").on('change', function() {
		readProfileImgURL(this);
	});
	
	// profile edit process
	$('#profile_edit_submit').click(
			function() {
				var idE = $('#user_edit_id').val();
				var nameE = $('#user_edit_name').val();
				var editPass = $('#user_edit_pass').val();
				var newPass = $('#user_edit_newPass').val();
				var newPassConfirm= $('#user_edit_newPass_Confirm').val();
				var thumbE=$('#thumbE').val().substring(12);
				
				var form = $('#profile_edit_form')[0];
				var updateUser = new FormData(form);

				if (!editPass) {
					alert("비밀번호를 입력해 주세요.");
					return false;
				}else if(pass !=editPass){
					alert("비밀번호가 정확하지 않습니다.")
				}else if (pass == editPass) {
					if(newPass!=newPassConfirm){
						alert("새로 설정한 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
					}else{
					$.ajax({
						url : 'http://localhost:8080/postUser?type=2',
						type : 'POST',
						contentType : false,
						processData : false,
						data : updateUser,
						success : function(res) {
							
							window.sessionStorage.setItem('name', nameE);
							window.sessionStorage.setItem('pw', editPass);
							window.sessionStorage.setItem('thumb', thumbE);

							$('#user_edit_name').val(nameE);
							$('#user_edit_pass').val('');
							$('#user_edit_newPass').val('');
							$('#user_edit_newPass_Confirm').val('');

							alert('edit success');
							
							userElem = '<span class = "top_id_name" id="top_name">' + name + '</span>'
							+ '<span class = "top_id_name" id="top_id">' + id + '</span>'
							
							$('.info').text(id + '(' + name + ')');
							$('#top_thumb').empty();
							$('#user_information').empty();
							$('#user_information').append(userElem);
							$('#top_thumb').append("<img src='/img/common/" + thumb + "'>");
							
							updateUser = new FormData();
							}
						});
					}
				}
			});

	// user delete process
	$('#profile_delete_submit')
			.click(
					function() {
						var id = $('#user_delete_id').val();
						var pass = $('#user_delete_pass').val();

						var check = confirm('Are you sure to delete your id? All your postings will be deleted');
						if (check) {
							$.ajax({
								url : 'http://localhost:8080/deleteUser?id='
										+ id,
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


