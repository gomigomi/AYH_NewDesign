$(function() {

	$(document).on('click', '#search_btn', function() {
		var taste = $(":checkbox[name='taste']:checked").val();
		var type = $(":checkbox[name='type']:checked").val();
		var time = $(":checkbox[name='time']:checked").val();
		var location = $(":checkbox[name='location']:checked").val();
		console.log(type, taste, time, location);
		
		if(location == 'none' || type=="" || taste=="" || time==""){
			alert('please fill out the form');
			return false;
		}

		$.ajax({
			url : 'http://localhost:8080/doSearch',
			method : 'GET',
			dataType : 'JSON',
			data : {
				type : type,
				taste : taste,
				time : time,
				location : location,
				writer : window.sessionStorage.getItem('id')
			},
			success : function(res) {
				var id = window.sessionStorage.getItem("id");
				console.log("letSearch");
				searchDatas = res.result;
				
				if(searchDatas == "") {
					$('.search-posts').empty();
					$('.search-posts').append('<div id="nothingElem">검색결과가 없습니다.</div>');	
				}
					
				$('#write').val('');
				$('input[type="checkbox"][name="type"]').prop('checked', false);
				$('input[type="checkbox"][name="taste"]').prop('checked', false);
				$('input[type="checkbox"][name="time"]').prop('checked', false);
				$('input[type="checkbox"][name="location"]').prop('checked', false);
				console.log(searchDatas);
				
				for(var i=0; i<searchDatas.length; i++) {
					if( id == searchDatas[i].writer) {
						$('.search-posts').append(getSectionItem(searchDatas[i], false));
						handleRaty();
					} else {
						$('.search-posts').append(getSectionItem(searchDatas[i], true));
						handleRaty();
					}
				}	
			},
			error : function() {
				alert("Error");
			}
		});
	})
})

