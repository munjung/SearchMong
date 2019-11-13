var myimage = document.getElementById("mimg");
var textarea = document.getElementById("textarea");

// 0: image_search / 1: ocr_detect

//url이 너무 긴경우 예외처리 해야함
$('#btn_search').click(function(){

  if(is_ocr == 1){

    openLoader();
    $('.card_border').css('display','none');
    $('.div_search').css('display','none');

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
        alert('이미지 주소가 너무 길어요ㅠㅠ');
        closeLoader();
      }
      }).done(function( data ) {
        data = data.toString();
        console.log(data);
        copyValue(data)
      }
    )
  }else{
    $('.div_search').css('display','');
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
    alert('글자 추출 완료!');
    closeLoader();
    document.getElementById("result_text").value = total;
    var copyText = document.getElementById("result_text");
    $('#textarea').val(copyText.value);
    $('.research_result').css('display','');

    // var copyText = document.getElementById("result_text");
    // copyText.select();
    // document.execCommand("copy");
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
