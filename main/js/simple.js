
'use strict'
class simplejs {
    constructor(elements) {
        var nodeList = [];
        if (elements == document || elements instanceof HTMLElement) {
            nodeList.push(elements)
            this.nodeList= nodeList;
        } else {
            this.nodeList = document.querySelectorAll(elements);
        }
        this.node = this.nodeList[0];
    }
    ready(callback){
        this.node.addEventListener('readystatechange', e => {
            if(this.node.readyState === "complete"){
                callback();
                return true;
            }
          });
    }
    exist() {
        if (this.nodeList.length == 0) {
            return false;
        }
        return true;
    }
    siblings (){
        let el= this.node;
        if(!el || !el.parentNode) return this;
        let nodeList=[...el.parentNode.childNodes].filter(node => node !== el);
        this.nodeList=nodeList;
        return this;
    }
    val(value=null) {
        if(value){
            this.nodeList.forEach(el=>{
                el.value=value;
            })
        }
        return this.node.value;
    }

    on(event, child, callback = null, state = null) {
        if (callback != null) {
            var selector = child;
            this.nodeList.forEach((element) => {
                element.addEventListener(event, function(event) {
                    if (event.target.matches(selector + ', ' + selector + ' *')) {
                        callback.apply(event.target.closest(selector), arguments);
                    }
                }, false);
            });
        } else {
            callback = child;
            this.nodeList.forEach((element) => {
                if (state) {
                    element.addEventListener(event, callback, state);
                } else {
                    element.addEventListener(event, callback, false);
                }
            });
        }

        return this;
    }

    onDOMLoaded(callback){
            this.node.addEventListener('DOMContentLoaded', () => {callback()});
    }
    execute_scripts(element) {
        var scripts = element.getElementsByTagName("script");
        if (scripts) {
            for (var ix = 0; ix < scripts.length; ix++) {
                var script = scripts[ix].text.replace(/(\r\n|\n|\r)/gm, "");
                eval(script);
            }
        }
        return this;
    }
    focus() {
        this.nodeList.forEach((element) => {
            element.focus();
        });
    }
    submit(){
        this.nodeList.forEach((element) => {
            element.submit();
        });
    }
    html(data) {
        var data;
        if (data) {
            this.nodeList.forEach((element) => {
                element.innerHTML = data;
            });
        } else {
                return this.node.innerHTML;
            }
        
        return this;
    }
    append(data) {
        this.nodeList.forEach((element) => {
            if (data.nodeType === Node.ELEMENT_NODE) {
                element.appendChild(data)
            } else {
                element.append(data)
            }

        });
        return this;
    }
    prepend(data) {
        this.nodeList.forEach((element) => {
            element.prepend(data);
        });
        return this;
    }
    h(nodeName, attrs, ...children) {
        const NodeList = [];
        const element = document.createElement(nodeName);
        for (let key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
        if (children) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
        }
        NodeList.push(element);
        this.nodeList=NodeList;
        return this;
    }
    create(elements) {
        var NodeList = [];
        var newelement = "";
        if (elements.includes('<')) {
            newelement = this.parseHTML(elements).childNodes[0];
        } else {
            newelement = document.createElement(elements)
        }
        NodeList.push(newelement);
        this.nodeList=NodeList;
        this.node = this.nodeList[0];
        return this;

    }
    appendTo(selector) {
        this.nodeList.forEach((element) => {
            if (selector.nodeType === Node.ELEMENT_NODE) {
                selector.appendChild(element)
            } else {
                document.querySelector(selector).appendChild(element);
            }
        });
        return this;
    }
    css(propertyObject) {
        this.nodeList.forEach((element) => {
            for (var property in propertyObject) {
                element.style[property] = propertyObject[property];
            }
        });
        return this;
    }
    hide() {
        this.nodeList.forEach((element) => {
            element.style.display = "none";
        });
        return this;
    }
    show() {
        this.nodeList.forEach((element) => {
            element.style.display = "block";
        });
        return this;
    }
    click(callback=null){
        if(callback){
            this.nodeList.forEach((element) => {
                element.addEventListener("click", callback);
        });
        }else{
            this.node.click();
        }
        return this;
    }
    getNode() {
        return this.node;
    }
    attr(attr, value = null) {
        var getattr = undefined;
        this.nodeList.forEach((element) => {
            if (value) {
                element.setAttribute(attr, value);
                getattr = this;
            } else {
                getattr = element.getAttribute(attr);
            }
        });
        return getattr;
    }
    hasClass(className) {
        if (this.node.classList.contains(className)) {
            return true;
        } else {
            return false;
        }
    }
    removeClass(className) {
        this.nodeList.forEach(el=>{
            el.classList.remove(className);
        });
        return this;
    }

    addClass(className) {
        this.node.classList.add(className);
        return this;
    }
    find(el) {
        var NodeList = []
        this.nodeList.forEach((element) => {
            if (element.querySelectorAll(el)) {
                element.querySelectorAll(el).forEach((nel)=>{
                    NodeList.push(nel);
                })
            }
        });
        this.nodeList=NodeList;
        return this;
    }
    isInView() {
        var rect =  this.node.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
        );
        }
    inView(callback){
        const node=this.node;
        const observer=new IntersectionObserver(entries=>{
            if(entries,entries[0].isIntersecting) callback();
        },
        {
            threshold:0.3
        });
        observer.observe(node)
    }
    /* testing required*/
    serialize() {
        data = new form(this.nodeList[0]);
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

    view(html, values = {},obj=null) {
        if (html.match(/{{(.*?)}}/g)) {
            html.match(/{{(.*?)}}/g).forEach(match => {
                let match_data=match.replace(/{{(.*?)}}/g,"$1");
                let regex = new RegExp(match);
                if(match_data.startsWith('props.')|| match_data.startsWith('attr.')){
                    html=html.replace(regex,eval('obj.'+match_data));
                }
                if(match_data.startsWith('window.')){
                    let data=eval(match_data);
                    if(data)  html=html.replace(regex,data);
                }
                if (values[match_data] != undefined) {
                    html = html.replace(regex,  values[match_data]);
                }
            })
        }
        return html;
    }
    ajax(args) {
        var url = args["url"];
        var method = args["method"];
        var success = args["success"];
        var fail = args["fail"];
        var percent = args["progressPercent"];
        let error;
        const xhttp = new XMLHttpRequest();
        xhttp.onerror = function(error){
            reject(error);
        }
        xhttp.onload = function() {
            var response;
            if (this.readyState == 4 && this.status == 200) {
                response = this.responseText;
                //response = decodeURIComponent(response);
                return success(response);
            } else {
                if (this.status == 403) {
                    error = url + " 403 (Forbidden)";
                } else if (this.status == 404) {
                    error = url + " 400 (Page not found)";
                } else {
                    error = this.status;
                }
                return fail(error);
            }
        };
        if (percent) {
            xhttp.upload.onprogress = function(evt) {
                let percentComplete = (evt.loaded / evt.total) * 100 + "%";
                return percent(percentComplete);
            };
        }
        let parameters, i, key, value, paramarr;
        paramarr = url.slice(url.indexOf('?') + 1).split('&');
        parameters = paramarr.join('&');
        if (args) {
            var method = args["method"];
            if ('data' in args) {
                parameters = "";
                var obj = args["data"];
                var count = Object.keys(obj).length;
                for (i = 0; i < count; i++) {
                    key = Object.keys(obj)[i];
                    value = obj[Object.keys(obj)[i]];
                    parameters += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
                }
            }

        }
        if (method == "POST" || method == "post" || method == "Post") {
            xhttp.open("POST", url, true);
            if (args && 'headers' in args) {
                headers = args['headers'];
                for (let key in headers) {
                    xhttp.setRequestHeader(key, headers[key])
                }
            } else {
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            xhttp.send(parameters);
        } else {
            console.log(method)
            xhttp.open("GET", url + "?" + parameters, true);
            if (args && 'headers' in args) {
                headers = args['headers'];
                for (let key in headers) {
                    xhttp.setRequestHeader(key, headers[key])
                }
            } else {
                xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            }
            xhttp.send();
        }
    }
    fetch(url_, args = null) {
        return new Promise(function(resolve, reject) {
            var url = url_;
            let error;
            const xhttp = new XMLHttpRequest();
            xhttp.onerror = function(error){
                reject(error);
            }
            xhttp.onload = function() {
                var response;
                if (this.readyState == 4 && this.status == 200) {
                    response = this.responseText;
                    //response = decodeURIComponent(response);
                    resolve(response);
                } else {
                    if (this.status == 403) {
                        error = url + " 403 (Forbidden)";
                    } else if (this.status == 404) {
                        error = url + " 400 (Page not found)";
                    } else {
                        error = this.status;
                    }
                    reject(error);
                }
            };
           let parameters, i, key, value, paramarr;
            paramarr = url.slice(url.indexOf('?') + 1).split('&');
            parameters = paramarr.join('&');
            if (args) {
                var method = args["method"];
                if ('data' in args) {
                    parameters = "";
                    var obj = args["data"];
                    var count = Object.keys(obj).length;
                    for (i = 0; i < count; i++) {
                        key = Object.keys(obj)[i];
                        value = obj[Object.keys(obj)[i]];
                        parameters += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
                    }
                }

            }
            if (method == "POST" || method == "post" || method == "Post") {
                xhttp.open("POST", url, true);
                if (args && 'headers' in args) {
                    headers = args['headers'];
                    for (let key in headers) {
                        xhttp.setRequestHeader(key, headers[key])
                    }
                } else {
                    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }
                xhttp.send(parameters);
            } else {
                xhttp.open("GET", url + "?" + parameters, true);
                if (args && 'headers' in args) {
                    headers = args['headers'];
                    for (let key in headers) {
                        xhttp.setRequestHeader(key, headers[key])
                    }
                } else {
                    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                }
                xhttp.send();
            }

        });
    }
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + decodeURIComponent(cvalue) + ";" + expires + ";path=/";
    }

    getCookie(cname) {
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
    }
    clean(node) {
        for (var n = 0; n < node.childNodes.length; n++) {
            var child = node.childNodes[n];
            if (
                child.nodeType === 8 ||
                (child.nodeType === 3 && !/\S/.test(child.nodeValue))
            ) {
                node.removeChild(child);
                n--;
            } else if (child.nodeType === 1) {
                this.clean(child);
            }
        }
    }
     parseHTML(html) {
        if(html instanceof HTMLElement) return html;
        const parser = new DOMParser();
        const str = html.trim();
        const doc = parser.parseFromString(str, "text/html");
        this.clean(doc.body)
        return doc.body;
    }
    truncate(str, n,placeholder){
        return (str.length > n) ? str.slice(0, n-1) + placeholder : str;
      }
    
    readingTime(str){
        const string=this.strip_tags(str);
        const wordsPerMinute = 250;//average case
        let words = string.split(" ").length;
        if(words>0){
            let time = Math.ceil(words / wordsPerMinute);
            return time;
        }else{
            return 0;
        }
    }
    strip_tags(str){
        return str.replace(/<(.|\n)*?>/g, '')
    }
    textSearch(args) {

        const items=args['array'];
        const text=args['query'];
        const keys=args['keys'];
        const results=[];
        const textArr = text.trim().split(' ');
        textArr.forEach((textItem)=>{
            items.forEach((item)=>{
                keys.forEach((key)=>{
                    if (item[key].toLowerCase().includes(textItem.toLowerCase())){
                        results.push(item);
                    }
                })
            });
        });
        return [...new Set(results)];
    }

    htmlentities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    html_entity_decode(str){
        return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    }
    uniquePush(arr,value){
        if(!arr.includes(value)) arr.push(value);
    }
    generate_uid(){
        let id=this.rand(1,5000000);
        if(document.querySelector('[uid="'+id+'"]')){
            this.get_uid();
        }
        return id;
    }
    rand(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }

}

const s = (el = null) => {
    if (el) {
        return new simplejs(el);
    } else {
        return new simplejs();
    }
}
const simple = s();
