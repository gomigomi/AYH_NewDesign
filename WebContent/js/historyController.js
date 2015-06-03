//쓴 포스팅 불러오기 
function getPostingUser() {
	$('.history-posts').empty();
	var id = window.sessionStorage.getItem('id');
	$.ajax({
		url : 'http://localhost:8080/getPosting?type=2&id=' + id,
		method : 'get',
		dataType : 'json',
		async : false,
		success : function(res) {
			console.log("get user-written-posting");
			postingUserDatas = res.result;

			if (postingUserDatas == "") {
				$('.history-posts').empty();
				$('.history-posts').append(
						'<div id="nothingElem">검색결과가 없습니다.</div>');
			}

			for (var i = 0; i < postingUserDatas.length; i++) {
				$('.history-posts').append(
						getSectionItem(postingUserDatas[i], false));
				handleRaty();
			}
		}
	})
}

// 쓴 코멘트 게시물 불러오기
function getCommentUser() {
	$('.history-posts').empty();
	var id = window.sessionStorage.getItem('id');
	$.ajax({
		url : 'http://localhost:8080/getPosting?type=3&id=' + id,
		method : 'get',
		dataType : 'json',
		async : false,
		success : function(res) {
			console.log("get-user-written comment");
			postingUserCommentDatas = res.result;

			if (postingUserCommentDatas == "") {
				$('.history-posts').empty();
				$('.history-posts').append(
						'<div id="nothingElem">검색결과가 없습니다.</div>');
			}

			// 콘솔
			// console.log(postingUserCommentDatas);
			for (var i = 0; i < postingUserCommentDatas.length; i++) {
				$('.history-posts').append(
						getSectionItem(postingUserCommentDatas[i], false));
				handleRaty();
			}
		}
	});
}