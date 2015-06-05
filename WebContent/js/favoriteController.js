//Favorite View Button
var id = window.sessionStorage.getItem('id');

function getFavoriteView() {
	$('#favoritePosting').empty();
	$.ajax ({
		url : 'http://localhost:8080/getFavorite?id='+id+'&type=1',
		method : 'get',
		dataType : 'json',
		async : false,
		success : function(res) {
			console.log('getFavoriteView_CF');
			favoriteView = res.result;

			if (favoriteView == "") {
					$('#favoritePosting').empty();
					$('#favoritePosting').append('<div id="nothingElem">추가하신 게시글이 없습니다.</div>');
					return false;
			}
			
			for(var i=0; i<favoriteView.length; i++) {
				if( id == favoriteView[i].writer) {
					$('.favorite-posts').append(getFavSectionItem(favoriteView[i], false));
					handleRaty();
				} else {
					$('.favorite-posts').append(getFavSectionItem(favoriteView[i], true));
					handleRaty();
				}
			}
		}
	});
}


//Delete process in Favorite view
$(document).on('click', '#favoriteView .fa-heart', function() {
	var check = confirm("DELETE this from your FAVORITE?\n\nIf you click OK, this will be disappeared immediately.");
	
	if(check) {
		var id = window.sessionStorage.getItem('id');
		var posting_seq = $(this).closest('section').attr('id').substring(8);
		
		$.ajax ({
			url : 'http://localhost:8080/deleteFavorite?id='+id+'&posting_seq='+posting_seq,
			method : 'delete',
			success : function(res) {
				console.log('BOOKMARK : User('+id+') deleted favorite seq : '+posting_seq+'.');
				getFavoriteView();
			}
		})
	} else { return false; }
})



/*Main view*/
//Posting process in Main view  
$(document).on('click', '#mainView_favorite .fa-heart-o', function(e) {
	var param = {
			id : window.sessionStorage.getItem('id'),
			posting_seq : $(this).closest('section').attr('id').substring(8)
	};
	console.log(param.posting_seq);
	
	$.ajax({
		url : 'http://localhost:8080/postFavorite',
		method : 'post',
		dataType : 'json',
		data : param,
		success :  function(res){
			console.log("BOOKMARK : Updated");

			$('section[id$="'+param.posting_seq+'"] .fa-heart').show();
			$('section[id$="'+param.posting_seq+'"] .fa-heart-o').hide();
			

		}
	})
})


//Delete process in Main view
$(document).on('click', '#mainView_favorite .fa-heart', function(){
	var check = confirm('DELETE this from your FAVORITE?');
	
	if(check) {
		var id = window.sessionStorage.getItem('id');
		var posting_seq = $(this).closest('section').attr('id').substring(8);
		
		$.ajax ({
			url : 'http://localhost:8080/deleteFavorite?id='+id+'&posting_seq='+posting_seq,
			method : 'delete',
			success : function(res) {
				console.log('BOOKMARK : User('+id+') deleted favorite seq : '+posting_seq+'.');
				
				$('section[id$="'+posting_seq+'"] .fa-heart-o').show();
				$('section[id$="'+posting_seq+'"] .fa-heart').hide();
			}
		})
	} else { return false; }
})

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}


//Rendering section
/**
 * 하트 문제해결 및 데이터 통신 단
 */
function getFavSectionItem(favoriteView, isHide) {

	var display = isHide ? 'none' : 'block';
	var point = "0";
	
	var currentScoreDatas = _.filter(scoreDatas, function(value) {
		return value.posting_seq == favoriteView.seq
	})
	
	$.each(currentScoreDatas, function(idx, item) {
		point = item.point;
	})
	
	
	
	var sectionElem = 
	'<div class="section_wrapper">'+
	'<section class="post '+favoriteView.seq+'" id="posting_'+favoriteView.seq+'">'+
		'<scIdx id="'+favoriteView.sc_idx+'"/>'+
		'<div class="post-top">'+
			'<div class="post-img"> '+
				'<img src="/img/common/'+favoriteView.thumb+'" alt="썸네일"/>'+
			'</div>'+ 
			'<div class="top-top">'+ 
				'<div class="post-writer">'+favoriteView.writer+
					'<div class="btn-wrapper">'+
						'<span id=mainView_favorite>'+
							'<button id="heart" class="fa fa-heart favorite-btn" style="display:block"></button>'+
						'</span>'+
						'<span class="posting-buttons" style="display:'+display+'"> '+
							'<button class="post-edit fa fa-pencil-square-o" data-toggle="modal" data-target="#postEditModal"></button>'+
							'<button class="post-delete fa fa-times"></button>'+
						'</span>'+
					'</div>'+
				'</div>'+
				'<div class="top-bottom comment-form">'+
					'<span class="bac-point" id="'+favoriteView.avg+'">평균평점 '+favoriteView.avg+'</span>'+
					'<span class="comment-raty-form">'+
						'<span class="raty" data-score="'+point+'" style="cursor:pointer;"></span>'+
						'<span class = "add-commentRaty-btn">평가</span>'+
					'</span>'+
					'<span class="post-regdate">'+favoriteView.regdate+'</span>'+
				'</div>'+
			'</div>'+
		'<div class="post-description bac-content">'+
			'<span id = "postingImg_view">'+
				'<button class="more-content" data-toggle="modal" data-target="#moreContentsModal">'+
					'<img src="img/'+favoriteView.img+'"/>'+
				'</button></a>'+
			'</span>'+
			'<span id = "postingContent_div">'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.type+'" class ="type postingCI" src="/img/icon/posting-nationality/nationality-'+favoriteView.type+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.location+'" class ="location postingCI" src="/img/icon/posting-location/location-'+favoriteView.location+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.taste+'" class ="taste postingCI" src="/img/icon/posting-taste/taste-'+favoriteView.taste+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+favoriteView.time+'" class ="time postingCI" src="/img/icon/posting-time/time-'+favoriteView.time+'.png"/></span>'+
				'<div id = "postingContent_view">'+favoriteView.content+'</div>'+
			'</span>'+
		'</div>'+
		'<div class="comment-cnt">'+
			'<div class="comment-text-form">'+
				'<input type="text" name="comment" class="comment" />'+
				'<div class="add-comment-btn">Add</div>'+
			'</div>'+
			'<div class = "comment-list">'+
	
			'</div>'+
		'</div>'+
	'</section>'+
	'</div>'
	
	var cmtDisplay = 'none';
	var currentCommentDatas = _.filter(commentDatas, function(value) {
		return value.posting_seq == favoriteView.seq;
	});
	var sectionObject = $(sectionElem);
	
	$.each(currentCommentDatas, function(idx, item) {
		if(item.writer == id) {
			cmtDisplay = 'inline-block';
		}
	})

	$.each(currentCommentDatas, function(idx, item) {
		var liElem = 
			'<div class="comment-wrap">'+
				'<li class = "comment-list-sub" id="'+item.seq+'">'+
					'<span class="user" id="commentView-user">' + item.writer+'</span>'+
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