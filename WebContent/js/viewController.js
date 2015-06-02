$(function() {
<<<<<<< HEAD
////	console.log("View Ready!");
//	var commentDatas = getCommentData();
	
	$('#howAbout, #search, #favorite, #history').hide();

	
	/*collection을 누를 때 */
	$('#collection-button').click(function() {
		if(window.sessionStorage.getItem('id')){
			$('#main-view').hide();
			$('#top').show();
			$('.top_explain').show();			
			$('')
		} else {
			alert("Log-in First!");
		}
	});
	
	/*What about*/
	$('#howAbout-button').click(function(){
		$('#howAbout').show();
		$('#search').hide();
		$('#favorite').hide();
		$('#history').hide();
		$('.top_explain').hide();
	})
	
	
	/*search*/
	$('#search_post').click(function() {
		$('#search_wrapper').show();
		$('#search').hide();
		$('#write_bar').hide();
		$('#history').hide();
		$('.posts').hide();
	});
	
	$('#search-clear-button').click(function(){
		$('.property').attr('checked', false)
	})
	
=======
>>>>>>> 9baf476f73bd6b91705ce5d44304fdfc4b60aae4
	/*favorite*/
	$('#favorite_post').click(function() {
		alert("hi");
		$('#favorite').show();
		$('#howAbout').hide();
		$('#search').hide();
		$('#history').hide();
		$('.top_explain').hide();
	})

})
