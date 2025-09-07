$(document).ready(function(){
    $(".overlay").click(function(){
      $(this).hide();
      $(".overlay_img").attr("src", "");
    });

    $(".img_preview").click(function(){
      var x = $(this).attr("src");
      $(".overlay_img").attr("src", x);
      $(".overlay").show();
    });
});