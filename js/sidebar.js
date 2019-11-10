var myimage = document.getElementById("mimg");
var upload = document.getElementById("upload");
var is_ocr = 0;
var btn_copy = document.getElementById("btn_copy");

window.addEventListener('DOMContentLoaded', () => {
    // 처음 로딩 될 때: 메시지가 있는지 확인하고 삭제
    whale.storage.local.get('message', storage => {
      //var empty = 'chrome-extension://cibadghbkodochgapfjoginjajblkllo/images/empty_image.png'
      //if(myimage.src != empty)
      if(storage.message != null)
           myimage.src=storage.message;
        //whale.storage.local.remove(`message`);
    });

    // 로딩 이후의 변화 대응
    whale.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local' && 'message' in changes) {
            //var myimage = document.getElementById("mimg");
            myimage.src=changes.message.newValue;
            //myimage.src = 'message';
        }
    });
});

//switch event -> 0: image_search / 1: ocr_detect
//$('.div_search').css('display','');
$(function(){
  $('#checkbox[data-type=is_ocr]').on('click', function () {
    var checked = $('#checkbox').is(":checked");
    if(checked) {
      is_ocr = 1;
    }else {
      $('.div_search').css('display','');
      $('.research_result').css('display','none');
      is_ocr = 0;
    }
  });
})

myimage.addEventListener('click',function(){
  //ocr 기능은 파일 업로드 기능 일단 보류
  if(is_ocr == 1){
    alert('글자 추출 기능은 파일 업로드가 불가능해요 ㅜㅜ\n오른쪽 마우스에 있는 <이미지 검색하기> 기능을 이용해주세요!');
  }else{
    upload.click();
  }
});

var reader = new FileReader();

//--reader 시작시 함수 구현
reader.onload = (function(){
   console.log("file upload success");
   return function(e){
      /* base64 인코딩 된 스트링 데이터 */
      myimage.src = e.target.result
      console.log('file result: '+e.target.result);
      //console.log("="+uploadImg.src);
   }
})()
reader.error = (function(){
  return function(e){
    console.log("file upload fail");
  }
})()


upload.addEventListener('change',function(e){
   var get_file = e.target.files;
   if(get_file[0]){
    if(/^image\//.test(get_file[0].type)){//이미지 파일인 경우만 이미지 띄움
      /*
            get_file[0] 을 읽어서 read 행위가 종료되면 loadend 이벤트가 트리거 되고
            onload 에 설정했던 return 으로 넘어간다.
            이와 함께 base64 인코딩 된 스트링 데이터가 result 속성에 담겨진다.
        */
        reader.readAsDataURL(get_file[0]);
        console.log(2);
    }else{
      alert("이미지 파일만 업로드 가능합니다.");
      return false;
    }
  }
})

document.onpaste = function (event) {
  // use event.originalEvent.clipboard for newer chrome versions
  var items = (event.clipboardData  || event.originalEvent.clipboardData).items;
  var check_image_or_text = JSON.stringify(items);
  //이미지가 복사된 경우
  if(check_image_or_text.indexOf("1") != -1){
    var blob = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile();
      }
    }
    // load image if there is a pasted image
    if (blob !== null) {
      var reader = new FileReader();
      reader.onload = function(event) {
        console.log(event.target.result); // data url!
        myimage.src = event.target.result;
      };
      reader.readAsDataURL(blob);
    }
  }else{ //텍스트가 복사된 경우

  }

}

// 검색 추가 결과 보이기, 숨기기
var visible = document.getElementById("result_visible");
var unvisible = document.getElementById("result_unvisible");
var add_result=document.getElementById("search_result_add");

visible.addEventListener('click',function(){
  add_result.style.display ='';
  visible.style.display ='none';
  unvisible.style.display ='';
});
unvisible.addEventListener('click',function(){
  add_result.style.display ='none';
  visible.style.display ='';
  unvisible.style.display ='none';
});

//로고 클릭시 스위치 도움말 보이기, 숨기기
var logo = document.getElementById("logo");
var un_logo = document.getElementById("un_logo");
var div_help = document.getElementById("div_help");

logo.addEventListener('click' , function(){
  div_help.style.display ='';
  logo.style.display ='none';
  un_logo.style.display ='';
});

un_logo.addEventListener('click' , function(){
  div_help.style.display ='none';
  logo.style.display ='';
  un_logo.style.display ='none';
});

//검색 결과 나올때까지 프로그래스바 돌리고 싶다!!
/*
var myProgress = document.getElementById("myProgress");
var i = 0;
myProgress.addEventListener('click' , function(){
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar2");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
});
*/
