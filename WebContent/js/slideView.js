var additionalPosting;

function slideContent(posting_seq){	
	console.log("slideContnet");
	$.ajax({
		url : '/getPosting?type=5&posting_seq='+posting_seq,
		method : 'GET',
		dataType : 'JSON',
		async : false,
		success : function(res) {
			additionalPosting = res.result;
			
			console.log(posting_seq);
			console.log(additionalPosting);
			
			$('#moreContent').empty();
			console.log(additionalPosting[0].content);
			$('#moreContent').append(getModalItem(additionalPosting));
		}
	})
	
}

function getModalItem(additionalPosting){
	
	//favorite 하트를 변경하기위한 부분 
	var favoriteDisplay = "none";
	var favoriteDisplaySub ='block';
	
	/*favorite와 posting 연결*/
	var currentFavoriteDatas = _.filter(favoriteDatas, function(value){
//			alert("flag"+value.posting_seq+"posting"+additionalPosting.seq);
		return value.posting_seq == additionalPosting.seq;
	});
			
	$.each(currentFavoriteDatas, function(idx, item){
		if (item.flag == "1") {
			favoriteDisplay = "block";
			favoriteDisplaySub = "none";
		}
	});

	var sectionElem = 
	    	'<div id="info-wrapper">'+
		    	'<span><img class="postingCI modalPostingCI" src="/img/icon/posting-location/location-+'postingData.location'+.png"></span>'+
		    	'<span><img class="postingCI modalPostingCI" src="/img/icon/posting-nationality/nationality-postingData.png"></span>'+
		    	'<span><img class="postingCI modalPostingCI" src="/img/icon/posting-taste/taste-hot.png"></span>'+
		    	'<span><img class="postingCI modalPostingCI" src="/img/icon/posting-time/time-lc.png"></span>'+
			'</div>'+
			'<div id="moreContentDiv"></div>'

	var sectionObject = $(sectionElem);

	
	return sectionObject.get(0).outerHTML;
	additionalPosting = null;
}