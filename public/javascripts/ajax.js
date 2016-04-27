var xmlHttp;

function createRequest() {
  try {
    xmlHttp = new XMLHttpRequest();
  } catch (trymicrosoft) {
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
      try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        xmlHttp = false;
      }
    }
  }

  if (!xmlHttp)
    alert("Error initializing XMLHttpRequest!");
}
