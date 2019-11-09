var btn_search = document.getElementById("btn_search_test"); //이미지 검색 버튼
var imgname = document.getElementById("imgName");//텍스트 나오는 부분
var uploadImg = document.getElementById("mimg"); //이미지
var add_result=document.getElementById("search_result_add");
var result;
var imgBase;


btn_search.addEventListener('click',function(){
  if(uploadImg.src!=null&uploadImg.src!=""){// 이미지가 들어있는 경우에만 실행 data:image/
    imgname.value= "";
     var imgsrc = uploadImg.src;
//     alert(imgsrc.substring(0,10));
     if(imgsrc.substring(0,10)!="data:image"){ // 이미지의 src가 url형태인 경우
       visionUrl();
        // alert("링크");
     }else{//----------------------------------// 이미지의 src가 base64로 인코딩 된 경우
       visionBase64();
        // alert("파일");
     }

  }
  else{
    alert("파일이 업로드 되지 않았습니다.");
    console.log("result="+imgBase);
  }
});

function visionBase64(){ //이미지를 base64로 변환하여 보내는 경우
var request, output;
if(uploadImg.src!=null&uploadImg.src!=""){// 이미지가 들어있는 경우에만 실행
  var block = uploadImg.src.split(';');
  imgBase = block[1].split(',')[1];
  console.log(imgBase);
  //imgBase = uploadImg.src.replace('data:image/jpeg;base64,', '');
  var p = {
    "requests":[{
      "image":{ "content": imgBase }  ,
      "features": [{"type":"WEB_DETECTION","maxResults":10}]//---1개로 하니까 정확도 떨어짐
    }
    ]
  };
  $.ajax({
    method: "POST",
    url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDChEF1yBG_NXEPii0_v4ksuQXbVxZpXuY",
    contentType: "application/json",
    data: JSON.stringify(p),
    processData: false,
    success:function(data){
    //alert("성공");
    },
    error:function(){
      alert("올바른 이미지 정보가 아닙니다.");
    }
  }).done(function(msg) { //이미지 가져오지 못했을때 예외처리 필요
    result = msg.responses[0].webDetection.webEntities[0].description;
    console.log(msg);
    imgname.value= result;
});
}
  else{
    alert("파일이 업로드 되지 않았습니다.");
    console.log("result="+imgBase);
  }
}
function visionUrl(){// 이미지를 url 소스로 보내는 경우
  var request, output;
var p = {
  "requests":[{
    "image":{
      "source":{//--------------------이미지 url 경로
        "imageUri":uploadImg.src
      }}  ,
      "features": [{"type":"WEB_DETECTION","maxResults":1}]
    }
  ]};
  $.ajax({
    method: "POST",
    url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDChEF1yBG_NXEPii0_v4ksuQXbVxZpXuY",
    contentType: "application/json",
    data: JSON.stringify(p),
    processData: false,
    success:function(data){
    //alert("성공");
    },
    error:function(){
      alert("이미지 전송 실패");
    }
  }).done(function(msg) { //이미지 가져오지 못했을때 예외처리 필요
    if(msg.responses[0].webDetection.webEntities[0].description=!null){
      result = msg.responses[0].webDetection.webEntities[0].description;
      console.log(msg.responses[0].webDetection.webEntities[0].description);
      imgname.value= result;
    }else{
      alert("이미지 정보가 검색되지 않습니다")
      console.log(msg);
    }

});
}
