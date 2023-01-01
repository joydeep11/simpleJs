# SimpleJs
A lightweight JavaScript library for regular uses, to makes JavaScript simple for you

## How to install
cdn
```html
<script src=" https://cdn.jsdelivr.net/gh/joydeep11/simpleJs/main/js/simple.js"></script>
```
I do not advise using this CDN for production, but you may do so for testing.
## what's inside
There are predefined functions that you can call to perform simple tasks  ,developed for the web.
## documentation
### selectors
```javascript
element=qs('.cssSelector')
//querySelector
elements=qsa('.cssSelector')
//querySelectorAll
```
### Check empty string
```javascript
empty(str)
//returns true if string  is empty
```
### Check if string contains only spaces
```javascript
isspace(str)
//returns true if string contains only spaces
```
### innerHTML,append, prepend
```javascript
html(element,str)
//change innerHtml 
append(element,str)
//append/add after in a html element
prepend(element,str)
//prepend / add before  in a html element
```
### Hide,show, css
```javascript
hide(element)
//hides the element {display:none}
show(element)
// shows the element {display:block}
css(element,css)
/*adds css style to a element
example
css(qs("div"),{
"height":40px,
"width":20px
})
*/
```
### HTML attributes
```javascript
attr(element, attr, value)
/* performs setAttribute is value is passed or retuns  getAttribute
example
attr(qs("div"),"title","hello");
results in
<div title="hello"></div>
and
var getattr=attr(qs("div"),"title"); // hello
returns the value hello
*/
```
###  Css class
```javascript
hasClass(element, className)
//returns the classname

 removeClass(element, className)
//removes Class

addClass(element, className)
//adds class
```
### Click events

```javascript
//on  for static elements
on(qs(".btn"),"click",function(){
	alert("clicked");
})
//live  for dynamically/ajax generated html
live(".btn","click",function(){
	alert("clicked");
})
```
### Serialize form data
```
serialize(new FormData(form));
//retunrs json string like 
//{name: 'john wick', email: 'example@email.com'}*```
###  Ajax function
```javascript
//makes an ajax request
ajax({
	url:"url to send request",
	data:{
		name: "name",
		email:"example@gmail.com"
	},
	method:"GET",  // or POST
	success: function(response){
		console.log(response);
		//returns the response
	},
	fail: function(response){
		console.log(response);
		//returns fail message
	}
})
```
### JavaScript cookies
```javascript
setCookie(name, value, expirydays)
//sets a cookie
getCookie(cname)
//gets a cookie
```
### Get selected text
```javascript
getSelectionText()
//returns windows selected texts
```
### Insert values in textarea and input that can undo with (ctrl+z)
```javascript
insertText(txt)
//insert values in currently focused textarea/input/contenteditable div elements
```
