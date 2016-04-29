var message = document.createElement("div");
page = document.getElementById("page");
message.setAttribute("id","load");
message.innerHTML='<img src="/images/load.gif"><p>Обновление</p>';
page.insertBefore(message,page.children[0]);
createRequest();
xmlHttp.onreadystatechange=function()
  {
  if (xmlHttp.readyState==4 && xmlHttp.status==200)
    {
      var page = document.createElement('html');
      page.innerHTML=xmlHttp.responseText;
      var content=document.getElementById("content");
      var cont=page.getElementsByTagName("div");
      for(var i=0;i<cont.length;i++){
      	if(cont[i].id=="content"){
      		content.innerHTML=cont[i].innerHTML;
          break;
      	}
      }
      var load=document.getElementById("load");
      load.parentNode.removeChild(load);
    }
  }
xmlHttp.open("GET", window.location.pathname+"?js=true", true);
xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlHttp.send();