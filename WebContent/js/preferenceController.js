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
 				
 				var taste;
 				var type;
 				var time;
 				
 				switch (postingPreferenceDatas[0].tasteR) {
 			    case 'sal':
 			        taste = "짠맛의 ";
 			        break;
 			    case 'hot':
 			    	taste = "매운맛의 ";
 			        break;
 			    case 'bit':
 			    	taste = "쓴맛의 ";
 			        break;
 			    case 'swe':
 			    	taste = "단맛의 ";
 			        break;
 			    case 'soa':
 			    	taste = "신맛의 ";
 			        break;
 			    default:
 			    	taste = "";
 			}
 				switch (postingPreferenceDatas[0].typeR) {
 			    case 'chines':
 			    	type = "중국음식을 ";
 			        break;
 			    case 'korean':
 			    	type = "한국음식을 ";
 			        break;
 			    case 'japanes':
 			    	type = "일본음식을 ";
 			        break;
 			    case 'european':
 			    	type = "유럽음식을 ";
 			        break;
 			   default:
			    	type = "";
 			}
 				switch (postingPreferenceDatas[0].timeR) {
 			    case 'lc':
 			        time = "점심에 ";
 			        break;
 			    case 'bf':
 			    	time = "아침에 ";
 			        break;
 			    case 'dn':
 			    	time = "저녁 ";
 			        break;
 			   default:
			    	time = "";
 			}
 				if(taste==""&&type==""&&time==""){
 					$('#preference_wrapper .write-rec-bar').append("아직 당신이 좋아하는 음식 성향을 알수 없네요.");
 				}else{
 					$('#preference_wrapper .write-rec-bar').append("당신은 "+taste+type+time+" 드시는 것을 좋아하시는군요!<br>");
 				}
 				if(postingPreferenceDatas.length==1){
 					$('#preference_notFound').empty();
 	 				$('#preference_notFound').append("미안해요. 당신이 좋아할 만한 게시글을 찾을수가 없네요.");
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