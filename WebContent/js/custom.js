function readURL(input) {
	$('#img_preview').empty();
	if(input.files.length>3){
		alert("이미지 첨부는 최대 3개까지 가능합니다")
	}
	for (i = 0; i < input.files.length; i++) {
		var file=input.files[i].name
		if(file !=""){
			var fileExt=file.substring(file.lastIndexOf(".") +1);
			var reg=/gif|jpg|jpeg|png/i;
			if(reg.test(fileExt)==false){
				alert("첨부파일은 gif, jpg, png로 된 이미지만 가능합니다.");
				 $('#img_upload_frm')[0].reset();
				return;
			}
		}
		if (input.files && input.files[i]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#img_preview').append(
						'<img width="150px" height="150px" src="'
								+ e.target.result + '" alt="your image" />');
			}
		}
		reader.readAsDataURL(input.files[i]);
		formData.append(i,input.files[i]);
	}
		
}

function readEditURL(input) {
	$('#img_edit_preview').empty();
	if(input.files.length>3){
		alert("이미지 첨부는 최대 3개까지 가능합니다")
	}
	for (i = 0; i < input.files.length; i++) {
		var file=input.files[i].name
		if(file !=""){
			var fileExt=file.substring(file.lastIndexOf(".") +1);
			var reg=/gif|jpg|jpeg|png/i;
			if(reg.test(fileExt)==false){
				alert("첨부파일은 gif, jpg, png로 된 이미지만 가능합니다.");
				 $('#img_upload_frm')[0].reset();
				return;
			}
		}
		if (input.files && input.files[i]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#img_edit_preview').append(
						'<img width="150px" height="150px" id="blah" src="'
								+ e.target.result + '" alt="your image" />');
			}
		}
		reader.readAsDataURL(input.files[i]);
		editFormData.append(i,input.files[i]);
	}
		
}

$(function() {
	console.log(commentDatas);
	console.log(favoriteDatas);
	console.log(favoriteView);

	var postingDatas;	

	renderPostingList();
	console.log("1");
	
	//log-out process
	$('#log_out').click(function(){
		sessionStorage.clear();
		location.href="/NewFront.jsp";
	});

	$('#write_post').click(function(){

		if($('#w_checkbox').css('display') == 'none'){
		    $('#w_checkbox').show();
		} else {
		    $('#w_checkbox').hide();
		}
	});
	
    $("#post_img").on('change', function(){
        readURL(this);
    });
    
    $("#postEdit_img").on('change', function(){
        readEditURL(this);
    });
	
	//posting process
	$('#post_btn').click(function(){
		if(!window.sessionStorage.getItem('id')){
			alert('login first!');
			return false;
		}
		var taste=$("#tasteSel option:selected").val();
		var f_type=$("#f_typeSel option:selected").val();
		var time=$("#timeSel option:selected").val();
		var location=$("#locationSel option:selected").val();
		var content = $('#post_txt_box').val();
		
		console.log(f_type, taste, time, location, content);
		
		if(content==false){
			alert('please write something');
			$('#write').focus();
			return false;
		}else if(location == 'none' || f_type=="" || taste=="" || time==""){
			alert('please fill out the form');
			return false;
		}
		
		
		$.ajax({
			url: '/postPosting?type=1',
			method : 'post',
			dataType: 'json',
			async: false,
			data : {
				f_type: f_type,
				taste : taste,
				time : time,
				content : content,
				location : location,
				writer : window.sessionStorage.getItem('id')
			},
			success : function(res){
				console.log("postposting");
				if(res.result == 'success'){
					$('#post_txt_box').val('');
					$("#tasteSel > option[value=none]").attr("selected", "true");
					$("#f_typeSel > option[value=none]").attr("selected", "true");
					$("#timeSel > option[value=none]").attr("selected", "true");
					$("#locationSel > option[value=none]").attr("selected", "true");
					//renew posting list
				}else{
					alert('post fail!');
				}
			},
			error : function(){}
		});
		if($('#post_img').val()){
			$.ajax({
	             url: '/postImg?type=1',
	             processData: false,
	             contentType: false,
	             data: formData,
	             async: false,
	             type: 'POST',
	             success: function(result){
	                   $('#img_preview').empty();
	                   $('#img_upload_frm')[0].reset();
	                   formData=new FormData();
	             }
	         });
		}
        renderPostingList();
      });

	function renderPostingList(){
		$('#recent_wrapper').empty();
		count=0;
		$.ajax({
			url: '/getPosting?type=1',
			method: 'get',
			dataType: 'json',
			async : false,
			success : function(res){
				console.log("renderPostingList()get_posting");
				postingDatas = res.result;
				for(var i=0; i<postingDatas.length; i++ ){
					renderSectionElem();
				}
			}
		})
	}
//스크롤 내릴때마다 자동 로딩되게 해주는
//	var timer = setInterval(function() {scrollOK = true;}, 100);
//	var scrollOK = true;
//	$(window).bind('scroll',function() {
//		if (scrollOK) {
//			scrollOK = false;
//			if ($(this).scrollTop() + $(this).height() >= ($(document).height() - 100)) {
//				console.log('You Hit Bottom!');
//				if(postingDatas.length-count<5){
//					for(var i=0; i<postingDatas.length-count; i++ ){
//						renderSectionElem();
//					}
//				}else{
//					for(var i=0; i<5; i++ ){
//						renderSectionElem();
//					}
//				}
//			
//			}
//		}
//	});
	

	//1번.posts 2번#popular_post 3번#favoritePosting 4번#history-posting 5번#history-comment 6번# 7번#
	function renderSectionElem(){
		if(window.sessionStorage.getItem('id')==postingDatas[count].writer){
			$('#recent_wrapper').append(getSectionItem(postingDatas[count], false));
			} else if (window.sessionStorage.getItem('id') != postingDatas[count].writer){
			$('#recent_wrapper').append(getSectionItem(postingDatas[count], true));		
		} 
		count++;
	}
//포스팅삭제 
	$(document).on('click', '.post-delete' , function(){
		var seq = $(this).closest('section').attr('id');
		seq= seq.substring(8);
		var check=confirm('Are you sure to delete this post?');
		if (check){
			$.ajax({
				url :'/deletePosting?seq=' + seq,
				method :'DELETE',
				dataType :'json',
				success : function(res) {
					console.log("deleteposting");
					renderPostingList();
				}
			});
		}else{return false;}
	});
//포스팅 수정 
	$(document).on('click','.post-edit', function(){
		var seq = $(this).closest('section').attr('id');
		seq= seq.substring(8);
		var taste=$(this).parents('section').find('.taste').attr('id');
		var f_type=$(this).parents('section').find('.type').attr('id');
		var location=$(this).parents('section').find('.location').attr('id');
		var time = $(this).parents('section').find('.time').attr('id');
		
		$("#taste_edit > option[value="+taste+"]").attr("selected", "true");
		$("#type_edit > option[value="+f_type+"]").attr("selected", "true");
		$("#time_edit > option[value="+time+"]").attr("selected", "true");
		$("#location_edit > option[value="+location+"]").attr("selected", "true");
		
		console.log(seq);
		$(document).on('click', '#save_btn' , function(){
			taste=$("#taste_edit option:selected").val();
			f_type=$("#type_edit option:selected").val();
			time=$("#time_edit option:selected").val();
			location=$("#location_edit option:selected").val();
			
			var content=$('#post_edit_area').val();
			
			$.ajax({
				url :'/postPosting?type=2',
				method :'post',
				async : false,
				dataType :'json',
				data:{
					seq : seq,
					taste : taste,
					f_type : f_type,
					time : time,
					location : location,
					content : content
				},
				success : function(res) {
					console.log("posting-edit");
					$('#post_edit_area').val('');
				}
			});			
			if($('#postEdit_img').val()){
				$.ajax({
		             url: '/postImg?type=2&seq='+seq,
		             processData: false,
		             contentType: false,
		             data: editFormData,
		             async : false,
		             type: 'POST',
		             success: function(result){
		                   $('#img_edit_preview').empty();
		                   $("#postEdit_img").val("");
		                   editFormData=new FormData();
		                   renderPostingList();
		             }
		         });
			}			
			$('#postEditModal').modal('hide');
			renderPostingList();
		});
	});
});


function handleRaty(){
	$('span.raty').raty({
		half : true,
//		cancel : true,
//		cancelPlace : 'left',
		noRatedMsg : "I'am readOnly and I haven't rated yet!",
		score: function() {
			return $(this).attr('data-score');
		}
	});
}

function getNowDate(){
	// GET CURRENT DATE
	var date = new Date();
	 
	// GET YYYY, MM AND DD FROM THE DATE OBJECT
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = date.getDate().toString();
	 
	// CONVERT mm AND dd INTO chars
	var mmChars = mm.split('');
	var ddChars = dd.split('');
	 
	// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
	var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
	
	return datestring;
}