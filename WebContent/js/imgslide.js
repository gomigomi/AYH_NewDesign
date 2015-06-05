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
			url: 'http://localhost:8080/getImg?posting_seq='+posting_seq,
			method : 'get',
			dataType : 'json',
			async : false,
			success : function(res){
				imgDatas = res.result;
				console.log(imgDatas);
			}
		});
		if(imgDatas[0]=='no-image.jpg'){
			$('#moreContentsModal').modal('hide');
			console.log('hiding');
		}
		else if(imgDatas.length==1){
			slidecontent=
				'<img data-slidr="one" src="img/'+imgDatas[0]+'"/>'
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
	})
	
	//슬라이드 모달 초기화 
	$('#moreContentsModal').on('hidden.bs.modal', function (e) {
		$('#carousel-example-generic').empty();
		console.log('empting')
	});

});
