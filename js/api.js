var myimage = document.getElementById("mimg");
var textarea = document.getElementById("textarea");
//var popup = document.getElementById("myPopup");

// 0: image_search / 1: ocr_detect
$('#btn_search').click(function(){

  if(is_ocr == 1){

    //popup.classList.toggle("show");
    var image_url = myimage.src.toString();
    var image_type = findImageType(image_url);

    console.log('image_url: '+image_url);
    console.log('image_type: '+image_type);

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
        console.log(data);
        copyValue(data)
      }
    )
  }else{
    $('.research_result').css('display','none');
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
    alert('글자 추출 완료!');
    console.log(copyText.value);
    $('.research_result').css('display','');
    $('#textarea').val(copyText.value);
}

function findImageType(image_url){
    var type = ''
    //이미지 주소에 확장자 있는 경우
    if(image_url.toLowerCase().includes('jpg') || image_url.toLowerCase().includes('jpeg') )
      type = "jpg";
    else if(image_url.toLowerCase().includes('gif'))
      type = "gif";
    else if(image_url.toLowerCase().includes('png'))
      type = "png";
    else if(image_url.toLowerCase().includes('bmp'))
      type = "bmp";
    else if(image_url.toLowerCase().includes('webp'))
      type = "webp";
    else if(image_url.toLowerCase().includes('ico'))
      type = "ico";
    else{
      var fileLength = image_url.length;
    	var lastDot = fileName.lastIndexOf('.');
    	var fileExtension = fileName.substring(lastDot+1, fileLength);
    	type = fileExtension;
    }
    return type;
}
