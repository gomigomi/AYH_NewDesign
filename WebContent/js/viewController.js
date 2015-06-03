$(function(){
	//게시글 입력 표시
	$('#write_rec_bar').click(function(){
			if($('#write_bar').css('display') == 'none'){
			    $('#write_bar').show();
			} else {
			    $('#write_bar').hide();
			}
		})
	
	//main view
	$('#recent_post').click(function() {
		$('#favorite_wrapper').hide();
		$('#search_wrapper').hide();
		$('#popular_wrapper').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		
		$('.posts').show();
	})
		
	//popular posts
	$('#popular_post').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#search_wrapper').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		
		$('popular_wrapper').show();
	})
	
	
	
	//favorite
	$(document).on('click', '#favorite_post', function() {
		$('#popular_wrapper').hide();
		$('#search_wrapper').hide();
		$('.posts').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		
		$('#favorite_wrapper').show();
		
		getFavoriteView();	
	})
	
	//history
	$('#my_history').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#search_wrapper').hide();
		$('#popular_wrapper').hide();
		$('#preference_wrapper').hide();
		
		$('#history_wrapper').show();
		
		//게시글
		$('#my_history_posting').click(function(){
			getPostingUser();
			$('#history-posting').show();
			$('#history-comment').hide();
		})
		
		//댓글
		$('#my_history_comment').click(function(){
			getCommentUser();
			$('#history-comment').show();
			$('#history-posting').hide();								
		})
	})
	
	//preference
	$('#recommand_post').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#search_wrapper').hide();
		$('#popular_wrapper').hide();
		$('#history_wrapper').hide();
		
		$('#preference_wrapper').show();
	})
	
	//popular
	$('#popular_post').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#search_wrapper').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		
		$('#popular_wrapper').show();
		renderPopularPostingList();
	})
	
	//search
	$('#search_post').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#popular_wrapper').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		
		$('#search_wrapper').show();
	})
})

	