$(function(){
     $("#recommand_post").click(function(){ 
    	 
    	var id=window.sessionStorage.getItem('id');

 		$.ajax({
 			url: 'http://localhost:8080/getPosting?type=6&id='+id,
 			method: 'get',
 			dataType: 'json',
 			async : false,
 			success : function(res){
 				$('.preference-posts').empty();
 				postingPreferenceDatas = res.result;
 				console.log(postingPreferenceDatas);
 				$('#preference_wrapper .write-rec-bar').append("We think you like "+postingPreferenceDatas[0].tasteR+postingPreferenceDatas[0].typeR+postingPreferenceDatas[0].timeR+"<br>");
 				if(postingPreferenceDatas.length==1){
 	 				$('.preference-posts').append("We are sorry but we couldn't find restaurent that you might like");
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