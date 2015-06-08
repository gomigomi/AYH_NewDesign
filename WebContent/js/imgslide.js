var additionalPosting;

$(function() {
	$(document).on('click','.more-content',function(){
		
		var posting_seq=$(this).closest('section').attr('id');
		posting_seq=posting_seq.substring(8);
		
		var imgDatas;
		var slidecontent;
		var slideArrow=
				'<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">'+
	    			'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
	    			'<span class="sr-only">Previous</span>'+
	    		'</a>'+
	    		'<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">'+
	    			'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
	    			'<span class="sr-only">Next</span>'+
	    		'</a>'
		
		$.ajax({	//Request Login API
			url: '/getImg?posting_seq='+posting_seq,
			method : 'get',
			dataType : 'json',
			async : false,
			success : function(res){
				imgDatas = res.result;
				console.log(imgDatas);
				if(imgDatas[0]=='no-image.jpg'){
					$('#moreContentsModal').modal('hide');
					console.log('hiding');
				}
				else if(imgDatas.length==1){
					slidecontent=
						'<img data-slidr="one" class="slideImg" src="img/'+imgDatas[0]+'"/>'
					$('#img-slide').append(slidecontent);
				}else if(imgDatas.length==2){
					slidecontent=
						'<div id="carousel-example-generic" class="carousel slide" data-ride="carousel" style="width:350px;">'+					
						'<div class="carousel-inner" role="listbox">'+
							'<div class="item active">'+
								'<img class="slideImg" src="img/'+imgDatas[0]+'">'+
							'</div>'+
							'<div class="item">'+
								'<img class="slideImg" src="img/'+imgDatas[1]+'">'+
							'</div>'+
						'</div>'+
						'<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">'+
		    			'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
		    			'<span class="sr-only">Previous</span>'+
		    		'</a>'+
		    		'<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">'+
		    			'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
		    			'<span class="sr-only">Next</span>'+
		    		'</a>'+
							'</div>'
					$('#img-slide').append(slidecontent+slideArrow);
				}else if(imgDatas.length==3){
					slidecontent=
						'<div id="carousel-example-generic" class="carousel slide" data-ride="carousel" style="width:350px;">'+					
						'<div class="carousel-inner" role="listbox">'+
							'<div class="item active">'+
								'<img class="slideImg" src="img/'+imgDatas[0]+'">'+
							'</div>'+
							'<div class="item">'+
								'<img class="slideImg" src="img/'+imgDatas[1]+'">'+
							'</div>'+
							'<div class="item">'+
								'<img class="slideImg" src="img/'+imgDatas[2]+'">'+
							'</div>'+
						'</div>'+
						'<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">'+
		    			'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
		    			'<span class="sr-only">Previous</span>'+
		    		'</a>'+
		    		'<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">'+
		    			'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
		    			'<span class="sr-only">Next</span>'+
		    		'</a>'+
							'</div>'
					$('#img-slide').append(slidecontent);
				}
			}
		});
<<<<<<< HEAD
			
		if(imgDatas[0]=='no-image.jpg'){
			$('#moreContentsModal').modal('hide');
			console.log('hiding');
		}
		else if(imgDatas.length==1){
			slidecontent=
				'<img data-slidr="one" class="slideImg" src="img/'+imgDatas[0]+'"/>'
			$('#carousel-example-generic').append(slidecontent);
		}else if(imgDatas.length==2){
			slidecontent=
				'<div class="carousel-inner" role="listbox">'+
					'<div class="item active">'+
						'<img class="slideImg" src="img/'+imgDatas[0]+'"/>'+
					'</div>'+
					'<div class="item">'+
						'<img class="slideImg" src="img/'+imgDatas[1]+'"/>'+
					'</div>'+
				'</div>'
			$('#carousel-example-generic').append(slidecontent+slideArrow);
		}else if(imgDatas.length==3){
			slidecontent=
				'<div class="carousel-inner" role="listbox">'+
					'<div class="item active">'+
						'<img class="slideImg" src="img/'+imgDatas[0]+'">'+
					'</div>'+
					'<div class="item">'+
						'<img class="slideImg" src="img/'+imgDatas[1]+'">'+
					'</div>'+
					'<div class="item">'+
						'<img class="slideImg" src="img/'+imgDatas[2]+'">'+
					'</div>'+
				'</div>'
			$('#carousel-example-generic').append(slidecontent+slideArrow);
		}
		$.ajax({
			url : '/getPosting?type=5&posting_seq='+posting_seq,
			method : 'GET',
			dataType : 'JSON',
			async : false,
			success : function(res) {
				additionalPosting = res.result;
				
				console.log(posting_seq);
				console.log(additionalPosting);
				
				$('#moreContents').empty();
				console.log(additionalPosting[0].content);
				
				$('#moreContents').append(getModalItem(additionalPosting[0]));
			}
		});
=======
>>>>>>> f53148aea8e042877f334dde599095174f70da7e
	})
	
	//슬라이드 모달 초기화 
	$('#moreContentsModal').on('hidden.bs.modal', function (e) {
<<<<<<< HEAD
		$('#carousel-example-generic').empty();
		additionalPosting = null;
		console.log('empting');
		
=======
		$('#img-slide').empty();
		console.log('empting')
>>>>>>> f53148aea8e042877f334dde599095174f70da7e
	});

});

//내용 연
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
		    	'<span id = "postingClassifyImg"><img id = "'+additionalPosting.type+'" class ="type postingCI" src="/img/icon/posting-nationality/nationality-'+additionalPosting.type+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+additionalPosting.location+'" class ="location postingCI" src="/img/icon/posting-location/location-'+additionalPosting.location+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+additionalPosting.taste+'" class ="taste postingCI" src="/img/icon/posting-taste/taste-'+additionalPosting.taste+'.png"/></span>'+
				'<span id = "postingClassifyImg"><img id = "'+additionalPosting.time+'" class ="time postingCI" src="/img/icon/posting-time/time-'+additionalPosting.time+'.png"/></span>'+
			'</div>'+
			'<div id="moreContentDiv"></div>'+
			'<div id="realContentDiv">'+additionalPosting.content+'</div>'
			
			
	return sectionElem;

}
