function renderPopularPostingList(){
	$('.popular-posts').empty();
	$.ajax({
		url: '/getPosting?type=4',
		method: 'get',
		dataType: 'json',
		async : false,
		success : function(res){
			console.log("get populare posting");
			postingPopularDatas = res.result;
			
			if(postingPopularDatas == "") {
				$('.popular-posts').empty();
				$('.popular-posts').append('<div id="nothingElem">검색결과가 없습니다.</div>');
			}
			
			for(var i=0; i<postingPopularDatas.length; i++ ){
				if(window.sessionStorage.getItem('id')==postingPopularDatas[i].writer){
					$('.popular-posts').append(getSectionItem(postingPopularDatas[i], false));
					handleRaty();
				}else{
					$('.popular-posts').append(getSectionItem(postingPopularDatas[i], true));
					handleRaty();
				}
			}
		}
	})
}

