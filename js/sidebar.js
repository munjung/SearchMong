var myimage = document.getElementById("mimg");
var is_ocr = 0;

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
            //myimage.src = 'message';
        }
    });
});

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
