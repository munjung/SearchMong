var linkImgs = document.getElementById("imgSearch");//링크 검색 버튼
var imgname = document.getElementById("imgName");//텍스트 나오는 부분

var fileImgs = document.getElementById("fileSearch");//파일 검색 버튼
var uploadImg = document.getElementById("mimg"); //이미지
var file = document.que
var result;
var imgBase;

linkImgs.addEventListener('click',function(){
	visionTest1();
});

fileImgs.addEventListener('click',function(){
  visionTestBase64();
});

function visionTestBase64(){ //이미지를 base64로 변환하여 보내는 경우
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
function visionTest1(){// 이미지를 url 소스로 보내는 경우
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
    result = msg.responses[0].webDetection.webEntities[0].description;
    console.log(msg.responses[0].webDetection.webEntities[0].description);
    imgname.value= result;
});
}