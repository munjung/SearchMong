var myimage = document.getElementById("mimg");
var upload = document.getElementById("upload");
var is_ocr = 0;
var btn_copy = document.getElementById("btn_copy");

window.addEventListener('DOMContentLoaded', () => {
    // 처음 로딩 될 때: 메시지가 있는지 확인하고 삭제
    whale.storage.local.get('message', storage => {
      var empty = 'chrome-extension://cibadghbkodochgapfjoginjajblkllo/images/empty_image.png'
      if(myimage.src != empty)
           myimage.src=storage.message;

        //whale.storage.local.remove(`message`);
    });

    // 로딩 이후의 변화 대응
    whale.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local' && 'message' in changes) {
            //var myimage = document.getElementById("mimg");
            myimage.src=changes.message.newValue;
            alert(myimage.src)
            //myimage.src = 'message';
        }
    });
});

//switch event -> 0: image_search / 1: ocr_detect
$(function(){
  $('#checkbox[data-type=is_ocr]').on('click', function () {
    var checked = $('#checkbox').is(":checked");
    if(checked) {
      is_ocr = 1;
    }else {
      is_ocr = 0;
    }
  });
})

myimage.addEventListener('click',function(){
  upload.click();
});

var reader = new FileReader();

//--reader 시작시 함수 구현
reader.onload = (function(){
   console.log("file upload success");
   return function(e){
      /* base64 인코딩 된 스트링 데이터 */
      myimage.src = e.target.result
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
  console.log(JSON.stringify(items)); // will give you the mime types
  // find pasted image among pasted items
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
  else
  {

    alert("클립보드에 이미지가 없습니다.")
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
