$(function(){
     $("#recommand_post").click(function(){ 
    	 
    	var id=window.sessionStorage.getItem('id');

 		$.ajax({
 			url: '/getPosting?type=6&id='+id,
 			method: 'get',
 			dataType: 'json',
 			async : false,
 			success : function(res){
 				$('.preference-posts').empty();
 				$('#preference_wrapper .write-rec-bar').empty();
 				
 				postingPreferenceDatas = res.result;
 				console.log(postingPreferenceDatas);
 				
 				$('#preference_wrapper .write-rec-bar').append("We think you like "+postingPreferenceDatas[0].tasteR+postingPreferenceDatas[0].typeR+postingPreferenceDatas[0].timeR+"<br>");
 				if(postingPreferenceDatas.length==1){
 					$('#preference_notFound').empty();
 	 				$('#preference_notFound').append("미안해요. 찾을수가 없네요 ㅠㅅㅠ. 선호도를 더 표현해주세요.");
 				}
 				for(var i=1; i<postingPreferenceDatas.length; i++ ){
					if(window.sessionStorage.getItem('id')==postingPreferenceDatas[i].writer){
						$('.preference-posts').append(getSectionItem(postingPreferenceDatas[i], false));
						handleRaty();
					}else{
						$('.preference-posts').append(getSectionItem(postingPreferenceDatas[i], true));
						handleRaty();
					}
				}
 			}
 		})
     })
})