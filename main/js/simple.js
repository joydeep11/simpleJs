function qs(element) {
  if(element!= null){
    return document.querySelector(element);
  }
}
function qsa(element) {
  if(element!=null){
    return document.querySelectorAll(element);
  }
}

//log
function log(str) {
  console.log(str);
}
//empty
function empty(str) {
  if (str.length == 0) {
    return true;
  } else {
    return false;
  }
}
//execute scripts
/*/function executejs(response) {
  if (response.match(/<script>(.*)<\/script>/)) {
    response.match(/<script>(.*)<\/script>/).forEach(function (element){
      log(element)
    })
    //script = response.replace(/<script>(.*)<\/script>/, "$1"); // Remove tags
    //eval(script);
  }
  return response;
}*/

//
function ajax(myObj) {
  var url = myObj["url"];
  var method = myObj["method"];
  var success = myObj["success"];
  var fail = myObj["fail"];
  var percent = myObj["progressPercent"];
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var response;
    if (this.readyState == 4 && this.status == 200) {
      response = this.responseText;
      response=decodeURIComponent(response);
      return success(response);
    } else {
      if (this.status == 403) {
        error = url + " 403 (Forbidden)";
        if (myObj["errors"]) {
          log(error);
        }
      }
      if (this.status == 404) {
        error = url + " 400 (Page not found)";
        if (myObj["errors"]) {
          log(error);
        }
      }
      return fail(error);
    }
  };
  if (percent) {
    xhttp.upload.onprogress = function (evt) {
      let percentComplete = (evt.loaded / evt.total) * 100 + "%";
      return percent(percentComplete);
    };
  }
  parameters = "";
  var obj = myObj["data"];
  var count = Object.keys(obj).length;
  for (i = 0; i < count; i++) {
    key=Object.keys(obj)[i];
    value=obj[Object.keys(obj)[i]];
    parameters += encodeURIComponent(key)+ "=" +encodeURIComponent(value)+ "&";
  }
  if (method == "POST" || method == "post" || method == "Post") {
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
  } else {
    xhttp.open("GET", url+"?"+parameters, true);
    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhttp.send();
  }
}

//on
function on(element, event, function_, callback) {
  if (callback) {
    element.addEventListener(event, function_, callback);
  } else {
    element.addEventListener(event, function_, false);
  }
}
//live
function live(selector, evt, handler) {
  document.addEventListener(evt, function(event) {
    if (event.target.matches(selector + ', ' + selector + ' *')) {
      handler.apply(event.target.closest(selector), arguments);
    }
  }, false);
}
//html
function html(element, data) {
  if (data) {
    element.innerHTML = data;
    var scripts = element.getElementsByTagName("script");
    for (var ix = 0; ix < scripts.length; ix++) {
      var script = scripts[ix].text.replace(/(\r\n|\n|\r)/gm, "");
      eval(script);
    }
  } else {
    return element.innerHTML;
  }
}
//append
function append(element,data){
  element.innerHTML+=data;
  var scripts = element.getElementsByTagName("script");
  for (var ix = 0; ix < scripts.length; ix++) {
    var script = scripts[ix].text.replace(/(\r\n|\n|\r)/gm, "");
    eval(script);}

}
//prepend
function prepend(element,data){
  element.insertAdjacentHTML('afterBegin', data);
  var scripts = element.getElementsByTagName("script");
  for (var ix = 0; ix < scripts.length; ix++) {
    var script = scripts[ix].text.replace(/(\r\n|\n|\r)/gm, "");
    eval(script);}
}

//css
function css(element, propertyObject) {
  for (var property in propertyObject) {
    element.style[property] = propertyObject[property];
  }
}
//hide
function hide(element) {
  element.style.display = "none";
}

//show
function show(element) {
  element.style.display = "block";
}
//attr
function attr(element, attr, value) {
  if (value) {
    element.setAttribute(attr, value);
  } else {
    return element.getAttribute(attr);
  }
}
//hasClass
function hasClass(element, className) {
 if(element.classList.contains(className)){return true;}
 else{return false;}
}
//removeClass
function removeClass(element, className) {
  element.classList.remove(className);
}
//addClass
function addClass(element, className) {
  element.classList.add(className);
}
//serialize
function serialize(data) {
  let obj = {};
  for (let [key, value] of data) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
//setCookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//getCookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    activeElTagName == "textarea" ||
    (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
      typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}
//strcontains
function strcontains(thistext, maintext) {
  let text = maintext;
  let result = text.match(thistext);
  console.log(result);
}
function insertText(txt) {
  //qs("textarea").value+=txt
  document.execCommand("insertText", false, txt);
}

//isspace
function isspace(str) {
  if (typeof str != "undefined" && !str.replace(/\s/g, "").length) {
    return true;
  } else {
    return false;
  }
}


