var myimage = document.getElementById("mimg");

window.addEventListener('DOMContentLoaded', () => {
    // 처음 로딩 될 때: 메시지가 있는지 확인하고 삭제
    whale.storage.local.get('message', storage => {
       if(myimage!=null&& storage.message!=null)
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

var upload = document.getElementById("upload");
var reader = new FileReader();


//--reader 시작시 함수 구현 
reader.onload = (function(){
   console.log(1);
   return function(e){
      /* base64 인코딩 된 스트링 데이터 */
      myimage.src = e.target.result
      //console.log("="+uploadImg.src);
   }
})()

upload.addEventListener('change',function(e){
   var get_file = e.target.files;
   if(get_file[0]){
        /* 
            get_file[0] 을 읽어서 read 행위가 종료되면 loadend 이벤트가 트리거 되고 
            onload 에 설정했던 return 으로 넘어간다.
            이와 함게 base64 인코딩 된 스트링 데이터가 result 속성에 담겨진다.
        */
        reader.readAsDataURL(get_file[0]);
        console.log(2);
    }
})