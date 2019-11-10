var btn_search = document.getElementById("btn_search"); //이미지 검색 버튼
var imgname = document.getElementById("imgName");//텍스트 나오는 부분
var uploadImg = document.getElementById("mimg"); //이미지
var add_result=document.getElementById("search_result_add");
var btn_test = document.getElementById("btn_search_test");
var result;
var imgBase;

btn_search.addEventListener('click',function(){
  if(is_ocr == 0){
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
    papagoTranslate(result)
    add_result_entity(msg);
    console.log(msg);
    //imgname.value= result;
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
        "features": [{"type":"WEB_DETECTION","maxResults":10}]
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
      var enttitiy = msg;
      if(enttitiy=!null){
        console.log(msg);
        result = msg.responses[0].webDetection.webEntities[0].description;
        papagoTranslate(result)
        add_result_entity(msg);
      }else{
        alert("이미지 정보가 검색되지 않습니다")
        console.log(msg);
      }

    });
  }
  function add_result_entity(msg){
    var add="";
    add=add+msg.responses[0].webDetection.bestGuessLabels[0].label;
    for(var i=1;i<7;i++){
      add=add+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+msg.responses[0].webDetection.webEntities[i].description;
    }
    add_result.innerHTML=add;

  }
//번역 하는 곳
function papagoTranslate(result){
  var url = "http://ec2-15-164-97-135.ap-northeast-2.compute.amazonaws.com/searchmong/hello.py"
  var text = result; // 번역할 문자
  console.log("키워드 : "+text)
  $.ajax({
    method: 'GET',
    data: { keyword: text, find_image:" ", tmp:"0"},
    url: url,
    error: function(request,status,error) {
      alert(request.responseText)
      console.log(request.responseText)
    }
  }).done(function( data ) {
      //data = data.toString();
      data =JSON.parse(data)
      imgname.value=data.message.result.translatedText;
      console.log(data)
      findImage(data.message.result.translatedText)
    }
    )
}
function findImage(result){ //
  var url = "http://ec2-15-164-97-135.ap-northeast-2.compute.amazonaws.com/searchmong/hello.py"
  var text = result; // 번역할 문자
  console.log("키워드 : "+text)
  $.ajax({
    method: 'GET',
    data: { keyword: "text", find_image: text, tmp:"1"},
    url: url,
    error: function(request,status,error) {
      alert(request.responseText)
      console.log(request.responseText)
    }
  }).done(function( data ) {
      //data = data.toString();
      data =JSON.parse(data);
      img_result_load(data);
      })

  }

function img_result_load(img_data){
  if(typeof(img_data.documents[0]) == "undefined" || img_data ==null || img_data =="")
    alert("결과를 찾을 수 없습니다.")
  else{
  var str="";
  for(var i=0; i<16;i++){
    var date = img_data.documents[i].datetime
    var dateArray = date.split("T");
    var image_date=dateArray[0];
    var image_src=img_data.documents[i].image_url;;
    var image_name=img_data.documents[i].display_sitename;
    var image_link = img_data.documents[i].doc_url;
    var img_id="img_id"+i;
    //style="display:none" //style='display:none'
    str=str+
        "<div class='card_border'>"+
          "<div class='card' id='"+img_id+"'>"+
            "<img class='card_img' src='"+image_src+"' onerror='this.src='/images/empty_image.png'' >"+
            "<div class='container1'>"+
              "<h4><b>"+image_name+"</b></h4>"+
              "<p>"+image_date+"</p>"+
              "<a href='"+"#"+"'>바로가기</a>"+
            "</div>"+
          "</div>"+
        "</div>";

  }
  imgresult.innerHTML=str;
  for(var i=0; i < 16; i++ ) {
        (function(m) {
            document.getElementById("img_id" + m).addEventListener("click", function() {
                var image_link = img_data.documents[m].doc_url;
                whale.tabs.create({url: image_link});
            }, false);
        })(i);
    }

  }
}
