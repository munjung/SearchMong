var image_url = "https://i.ytimg.com/vi/-QgNCUjhNiY/maxresdefault.jpg";
var image_type = "jpg";


$('#btn_search').click(function(){
  $.ajax({
    method: "GET",
    async: true,
    url: "http://ec2-15-164-97-135.ap-northeast-2.compute.amazonaws.com/searchmong/to.py",
    data: {image_url : image_url, image_type: image_type },
    data_type: 'html',
    error: function(request,status,error) {
      alert(request.responseText)
      console.log(request.responseText)
    }
    }).done(function( data ) {
      data = data.toString();
      alert("success")
      console.log('success: '+data)
    }
  )

});
