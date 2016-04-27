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
      console.log("WORK");
       console.log(xmlHttp.responseText);
    }
  }
  console.log(window.location.pathname);
xmlHttp.open("GET", window.location.pathname+"?js=true", true);
xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlHttp.send();