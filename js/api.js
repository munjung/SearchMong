var image_url = "https://i.ytimg.com/vi/-QgNCUjhNiY/maxresdefault.jpg";
var image_type = "jpg";

// 0: image_search / 1: ocr_detect
$('#btn_search').click(function(){

  if(is_ocr == 1){
    $.ajax({
      method: "GET",
      async: true,
      url: "http://ec2-15-164-97-135.ap-northeast-2.compute.amazonaws.com/searchmong/to.py",
      data: {image_url : image_url, image_type: image_type },
      data_type: 'html',
      error: function(request,status,error) {
        console.log(request.responseText)
        alert('error!')
      }
      }).done(function( data ) {
        data = data.toString();
        copyValue(data)
      }
    )
  }else{

  }

});

//작은따옴표 제거 : .replace(/'/g, "");
//큰따옴표 제거 : .replace(/"/g, "");
function copyValue(data){
  data = data.replace("{","").replace("}","")
        .replace("}","").replace("{","").split(":")[2];
  data = data.replace("[","").replace("]","");
  var text = data.split(",");
  var total = '';
  for(var i = text.length-1; i >= 0; i--) {
    total += text[i];
  }
  total = total.replace("\n","").replace(/'/g, "");
  document.getElementById("result_text").value = total;
  var copyText = document.getElementById("result_text");
  copyText.select();
  document.execCommand("copy");
  alert("복사된 문자열: " + copyText.value);
}
