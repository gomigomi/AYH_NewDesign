$(function(){
	$(document).on('click','.add-comment-btn', function(){
		var parentElem = $(this).parents('section');
		
		var section_id=parentElem.attr('id').substring(8);
		console.log(section_id);
		
		var param = {
			posting_seq : section_id,
			writer : window.sessionStorage.getItem('id'),
			content : parentElem.find('input.comment').val()
		};
		
		console.log(param);
		
		if(param.content==""){
			alert("내용을 입력해주세요!");
		}else{
			$.ajax({
				url: '/postComment',
				method: 'post',
				dataType: 'json',
				data: param,
				success: function(res){
					console.log("postcomment");
					if(res.result=='success'){
						
						$.ajax({
							url : '/getComment?type=2',
							method : 'GET',
							dataType : 'JSON',
							async : false,
							success : function(res) {
								currentCommentSeq = res.result;
								
								var id = window.sessionStorage.getItem('id');
								var name = window.sessionStorage.getItem('name');
								
								var cmtDisplay = "none";
								if(param.writer==id) {
									cmtDisplay = "inline-block";
								}
								
								//Append comment to comment list
								var commentItem = 
								'<div class="comment-wrap">'+
								'<li class = "comment-list-sub" id="'+currentCommentSeq[0].seq+'">'+
								'<span class="user" id="commentView-user">' +name+'</span>'+
								'<span class="regdate view" id="commentView-regdate">'+getNowDate()+
									'<button class="comment-delete" style="display:'+cmtDisplay+'">'+
									'<i class="fa fa-times"></i>'+
									'</button>'+
								'</span>' + '</li>'+
								'<span class="comment view" id="commentView-content">'+ param.content + '</span>'+
								'</div>'
								
								parentElem.find('.comment-list').append(commentItem);	
								parentElem.find('input.comment').val('');
							} 
						})
						
					}else{
						alert('comment add fail');
						parentElem.find('input').focus();
					}
				}
			})
		}
	
	});
})