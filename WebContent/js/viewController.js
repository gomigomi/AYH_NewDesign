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
		$('#profileEdit_wrapper').hide();
		$('#my_history_submenu').hide();
		
		$('.posts').show();
	})
		
	//popular posts
	$('#popular_post').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#search_wrapper').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		$('#profileEdit_wrapper').hide();
		$('#my_history_submenu').hide();
		
		$('popular_wrapper').show();
	})
	
	//favorite
	$(document).on('click', '#favorite_post', function() {
		$('#popular_wrapper').hide();
		$('#search_wrapper').hide();
		$('.posts').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		$('#profileEdit_wrapper').hide();
		$('#my_history_submenu').hide();
		
		$('.favorite-posts').empty();
		$('#favorite_wrapper').show();
		
		getFavoriteView();	
	})
	
	//history
	$('#my_history').click(function() {	
		if($('#my_history_submenu').css('display')=='none'){
			$('#my_history_submenu').fadeIn("slow");
		}else{
			$('#my_history_submenu').fadeOut("slow");
		}
		//게시글
		$('#my_history_posting').click(function(){
			$('.posts').hide();
			$('#favorite_wrapper').hide();
			$('#search_wrapper').hide();
			$('#popular_wrapper').hide();
			$('#preference_wrapper').hide();
			$('#profileEdit_wrapper').hide();	
			$('#history_wrapper').show();
			$('#commentH').hide();
			$('#postingH').show();
			getPostingUser();
			$('#history-posting').show();
			$('#history-comment').hide();
		})
		
		//댓글
		$('#my_history_comment').click(function(){
			$('.posts').hide();
			$('#favorite_wrapper').hide();
			$('#search_wrapper').hide();
			$('#popular_wrapper').hide();
			$('#preference_wrapper').hide();
			$('#profileEdit_wrapper').hide();	
			$('#history_wrapper').show();
			$('#postingH').hide();
			$('#commentH').show();
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
		$('#profileEdit_wrapper').hide();
		$('#my_history_submenu').hide();
		
		$('#preference_wrapper').show();
	})
	
	//popular
	$('#popular_post').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#search_wrapper').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		$('#profileEdit_wrapper').hide();
		$('#my_history_submenu').hide();
		
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
		$('#profileEdit_wrapper').hide();
		$('#my_history_submenu').hide();
		
		$('.search-posts').empty();
		$('#search_wrapper').show();
	})
	
	//edit profile
	$('#profile_edit').click(function() {
		$('.posts').hide();
		$('#favorite_wrapper').hide();
		$('#popular_wrapper').hide();
		$('#history_wrapper').hide();
		$('#preference_wrapper').hide();
		$('#search_wrapper').hide();
		$('#my_history_submenu').hide();
		
		$('#profileEdit_wrapper').show();
	})
	
	
})

	