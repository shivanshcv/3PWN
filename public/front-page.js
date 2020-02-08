$(document).ready(function(){

  $(".up").click(function(){
  $(".panel").slideToggle();
});
console.log("hgdvghds");
var a=document.getElementById('id1');
window.onclick=function(event){
  if(event.target==a){
    a.style.display="none";
  }
}
var b=document.getElementById('id2');
var c=document.getElementById('pop');
b.onclick=function(event){

  // if(document.getElementById('email').value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
  // &&document.getElementById('password').value.length>=4)

  if(document.getElementById('email').value!=""&&
document.getElementById('password').value!="")
  {

    c.innerHTML="";
    // var d=document.createTextNode("Hi!! "+ document.getElementById('email').value);
    // var e = document.createElement("button");
    // e.appendChild(document.createTextNode("OK"));
    // e.setAttribute("id","popbttn");
    // e.setAttribute("class","popbttn");
    // c.appendChild(d);
    // c.appendChild(document.createElement("br"));
    // c.appendChild(document.createElement("div").appendChild(e));
    //
    // document.getElementById('popo').style.display = "block";
    // document.getElementById("popbttn").addEventListener("click", function(event){
    //   event.preventDefault();
    //   document.getElementById('popo').style.display='none'
    // });
    // sessionStorage.setItem('ok',document.getElementById('email').value);
    //
    //
    //
    //   location.href="./2.html";



  }
  else {
    event.preventDefault();
    document.getElementById('email').value="";
    document.getElementById('password').value="";
    c.innerHTML="";
    var d=document.createTextNode("Please Enter Something");
    var e = document.createElement("button");
    e.appendChild(document.createTextNode("OK"));
    e.setAttribute("id","popbttn");
    e.setAttribute("class","popbttn");
    c.appendChild(d);
    c.appendChild(document.createElement("br"));
    c.appendChild(document.createElement("div").appendChild(e));
    document.getElementById('popo').style.display = "block";
    document.getElementById("popbttn").addEventListener("click", function(event){
      event.preventDefault();
      document.getElementById('popo').style.display='none'
    });
  }


}






});
