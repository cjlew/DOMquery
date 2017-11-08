# DOMquery
A JavaScript DOM Manipulation Library

## Description
DOMquery is a DOM Manupulation library inspired by jQuery and written in vanilla JavaScript. 
Functionalities include:

* Creating DOM Elements
* Selecting DOM Elements by HTML tag, id, or class
* Adding and Removing event handlers
* Appending elements
* Making AJAX requests

## Using DOMquery
* Clone the repo into your project
* Import DOMquery.js into your project by including it in a script tag in the header of your HTML

## API

### $l

The $l wrapper has three main uses:
* Creates a new DOMNodeCollection object, ex: `$l("<li>")`
* Takes an HTMLElement and wraps it to return an DOMNodeCollection object
* Selects elements via tags, css selectors or id, `$l(".hidden") or $l("div") or $l("blue-item")`

### DOM Traversal
`DOMNodeCollection#find(selector)` 
Returns a DOMNodeCollection of all the nodes that match the argument that are children of the DOMNodeCollection nodes.  


`DOMNodeCollection#children()` 

Returns a DOMNodeCollection of all children of all nodes within the DOMNodeCollection.  

`$l(".hidden").children()`

`DOMNodeCollection#parent()`   

Returns a DOMNodeCollection of the parent of all nodes within the DOMNodeCollection.  
`$l(".hidden").parent()`. 
  
`DOMNodeCollection#remove()`
Removes the element from the DOM.

### Event Handling

`DOMNodeCollection#on(action,cb)` 
Installs an 'action' event handler. When triggered runs the cb callback.
`$l(".addtodo-button").on("click", () => {
  const inp = $l(".hidden")
  inp.removeClass("hidden")
  inp.addClass("shown");
});`


`DOMNodeCollection#off(action)` 
Removes the 'action' listener from the DOM


### Manipulation

`DOMNodeCollection#addClass(className)`

Adds a class attritube to all nodes within the DOMNodeCollection.  
`todoTitle.addClass("todo-title");`

`DOMNodeCollection#removeClass(className)`

Remove a class attritube of all nodes within the DOMNodeCollection.  
`todoTitle.removeClass("todo-title");`

`DOMNodeCollection#append(arg)`
arg can be a string, HTMLElement, or DOMNodeCollection object
Appends the outerHTML of each element in the argument to the innerHTML of ALL nodes within the DOMNodeCollection.
`todoTitle.append(`${title}`);`
`newTodo.append(subButton);` where subButton is an instance of DOMNodeCollection

`DOMNodeCollection#empty()`

Clears the content from all nodes within the DOMNodeCollection.

`DOMNodeCollection#attr(key, [value])`

Accepts a key and optional value. 
If the value exists, it will add that value and key to all nodes within the DOMNodeCollection.
If there is no value, it will return the value corresponding for the key of the first node.

