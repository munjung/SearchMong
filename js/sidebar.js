var myimage = document.getElementById("mimg");

window.addEventListener('DOMContentLoaded', () => {
    // 처음 로딩 될 때: 메시지가 있는지 확인하고 삭제
    whale.storage.local.get('message', storage => {
      // if(myimage!=null)
      //      myimage.src=storage.message;

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
