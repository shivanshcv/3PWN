$(document).ready(function () {
  $(".dropdown").change(function(){
    

  if($(".dropdown :selected").text()=="Individual")
  {
    $(".main-inst").hide();
    $(".main-fc").hide();
    $(".main-ind").show();
  }
  if($(".dropdown :selected").text()=="Institution")
  {
    $(".main-ind").hide();
    $(".main-fc").hide();
    $(".main-inst").show();
  }
  if($(".dropdown :selected").text()=="Industry")
  {
    $(".main-inst").hide();
    $(".main-ind").hide();
    $(".main-fc").show();
  }
});
});
