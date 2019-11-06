var img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpmhzfOWgU0YGfHd5UxoCR2zpTp8eQqbLtnDrfgAR5KggncJ2n&s";
var file_type = "png";

$('#btn_search').click(function(){
  $.ajax({
    method: "GET",
    async: false, // 동기식으로 통신
    url: "http://ec2-15-164-97-135.ap-northeast-2.compute.amazonaws.com/searchmong/ocr.py", // 파이썬 모듈 호출 (http://localhost/whale/python-server/cfr_v2.py)
    beforeSend: function() {
      whale.sidebarAction.setBadgeBackgroundColor({ color: [255, 187, 0, 255] });// 로딩중 배지 색상 변경 (주황), 알림창
    },
    complete: function() {whale.sidebarAction.setBadgeBackgroundColor({ color: [29, 219 ,22, 255] });}, // 완료후 배지 색상 (초록)
    data: {img_url : img_url, file_type: file_type }, // 원본 url, 확장자
    error: function(request,status,error) {alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);}
  }).done(function( data ) {

    data = data.toString();
    console.log("data(script.js): " + data); // 문자열
    }
  )
});
