function getSectionItem(postingDatas, isHide){
	var display = isHide ? 'none' : 'block';

	//favorite 하트를 변경하기위한 부분 
	var favoriteDisplay = "none";
	var favoriteDisplaySub ='block';
	var point = "0";
	var sc_idx = "0";
	/*favorite와 posting 연결*/
	var currentFavoriteDatas = _.filter(favoriteDatas, function(value){
//			alert("flag"+value.posting_seq+"posting"+postingDatas.seq);
		return value.posting_seq == postingDatas.seq;
	});
	
	$.each(currentFavoriteDatas, function(idx, item){
		if (item.flag == "1") {
			favoriteDisplay = "block";
			favoriteDisplaySub = "none";
		}
	});
	
	var currentScoreDatas = _.filter(scoreDatas, function(value) {
		return value.posting_seq == postingDatas.seq;
	})
	
	$.each(currentScoreDatas, function(idx, item) {
		point = item.point;
	})
	
	var currentAllScoreDatas = _.filter(allScoreDatas, function(value) {
		return value.posting_seq == postingDatas.seq;
	})
	
	$.each(currentAllScoreDatas, function(idx, item) {
		sc_idx = item.sc_idx;
	})
			
	var sectionElem = 
	'<div class="section_wrapper">'+
	'<section class="post '+postingDatas.seq+'" id="posting_'+postingDatas.seq+'">'+
		'<scIdx id="'+sc_idx+'"/>'+
		'<div class="post-top">'+
			'<div class="post-img"> '+
				'<img src="/img/thumb/'+postingDatas.thumb+'" alt="썸네일"/>'+
			'</div>'+ 
			'<div class="top-top">'+ 
				'<div class="post-writer">'+postingDatas.name+
					'<div class="btn-wrapper">'+
						'<span id=mainView_favorite>'+
							'<button id="heart-o" class="fa fa-heart-o favorite-btn" style="display:'+favoriteDisplaySub+'"></button>'+
							'<button id="heart" class="fa fa-heart favorite-btn" style="display:'+favoriteDisplay+'"></button>'+
						'</span>'+
						'<span class="posting-buttons" style="display:'+display+'"> '+
							'<button class="post-edit fa fa-pencil-square-o" data-toggle="modal" data-target="#postEditModal"></button>'+
							'<button class="post-delete fa fa-times"></button>'+
						'</span>'+
					'</div>'+
				'</div>'+
				'<div class="top-bottom comment-form">'+
					'<span class="bac-point" id="'+postingDatas.avg+'">평균평점 '+postingDatas.avg+'</span>'+
					'<span class="comment-raty-form">'+
						'<span class="raty" data-score="'+point+'" style="cursor:pointer;"></span>'+
						'<button class = "add-commentRaty-btn">평가</button>'+
					'</span>'+
					'<span class="post-regdate">'+postingDatas.regdate+'</span>'+
				'</div>'+
			'</div>'+
		'<div class="post-description bac-content">'+
			'<span id = "postingImg_view">'+
				'<button class="more-content" data-toggle="modal" data-target="#moreContentsModal">'+
					'<img src="img/'+postingDatas.img+'"/>'+
				'</button></a>'+
			'</span>'+
			'<span id = "postingContent_div">'+
				'<span id = "postingClassifyImg"><img id = "'+postingDatas.type+'" class ="type postingCI" src="/img/icon/posting-nationality/nationality-'+postingDatas.type+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+postingDatas.location+'" class ="location postingCI" src="/img/icon/posting-location/location-'+postingDatas.location+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+postingDatas.taste+'" class ="taste postingCI" src="/img/icon/posting-taste/taste-'+postingDatas.taste+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+postingDatas.time+'" class ="time postingCI" src="/img/icon/posting-time/time-'+postingDatas.time+'.png"/></span>'+
				'<div id = "postingContent_view">'+postingDatas.content+'</div>'+
			'</span>'+
		'</div>'+
		'<div class="comment-cnt">'+
			'<div class="comment-text-form">'+
				'<input type="text" name="comment" class="comment" />'+
				'<button class="add-comment-btn">Add</button>'+
			'</div>'+
			'<div class = "comment-list">'+
	
			'</div>'+
		'</div>'+
	'</section>'+
	'</div>'
	
/* comment와 posting 연결 */
	var currentCommentDatas = _.filter(commentDatas, function(value) {
		// console.log(JSON.stringify(value) + ' // '+ postingDatas.seq);
		// alert("comment:"+value.posting_seq+"posting:"+postingDatas.seq);
		return value.posting_seq == postingDatas.seq;
	});
	var sectionObject = $(sectionElem)

	$.each(currentCommentDatas, function(idx, item) {
		//댓글 삭제 버튼 추가
		var id = window.sessionStorage.getItem('id');
		var cmtDisplay = "none";
		if(item.writer==id) {
			cmtDisplay = "inline-block";
		}
		
		var liElem = 
			'<div class="comment-wrap">'+
				'<li class = "comment-list-sub" id="'+item.seq+'">'+
					'<span class="user" id="commentView-user">' + item.name+'</span>'+
					'<span class="regdate view" id="commentView-regdate">'+item.regdate.substr(0, 10)+
						'<button class="comment-delete" style="display:'+cmtDisplay+'">'+
							'<i class="fa fa-times"></i>'+
						'</button>'+
					'</span>' + '</li>'+
					'<span class="comment view" id="commentView-content">'+ item.content + '</span>'+
			'</div>'
		sectionObject.find('.comment-list').append(liElem);
	});
	return sectionObject.get(0).outerHTML;

}