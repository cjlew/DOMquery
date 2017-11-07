const DomNodeCollection = require('./dom_node_collection.js');

const docReadyFunctions = [];
let docReady = false;

window.$l = (arg) => {
  switch(typeof arg) {
    case "function":
      return queueFunction(arg);
    // Case 1: arg is string with CSS selector
    case "string":
      return getNodesFromDom(arg);
    // Case 2: arg is HTMLElement
    case "object":
      if (arg instanceof HTMLElement) {
        return new DomNodeCollection([arg]);
      }
  }
};

$l.extend = function (...objs) {
  let first = this;
  if (objs.length !== 1) {
    first = objs[0];
    Object.assign(first, ...objs.slice(1));
  }else {
    Object.assign(first, ...objs);
  }
  return first;
};

$l.ajax = (options) => {
  const xhr = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: "",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: ()=>{},
    error: ()=>{}
  };

  let requestOptions = $l.extend(defaults, options);
  requestOptions.method = options.method.toUpperCase();

  if (requestOptions.method === "GET") {
    options.url += `?${makeQueryString(options.data)}`;
  }

  xhr.open(requestOptions.method, requestOptions.url);

  xhr.onload = (e) => {
    if (xhr.status === 200) {
      requestOptions.success(xhr.response);
    } else {
      requestOptions.error(xhr.response);
    }
  };

  const optionalData = requestOptions.data;
  xhr.send(JSON.stringify(optionalData));
};

// helpers

const makeQueryString = (obj) => {
  let query = "";
  for (const prop in obj){
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      query += `${prop}=${obj[prop]}&`;
    }
  }
  return query.substring(0, query.length - 1);
};

const getNodesFromDom = (selector) => {
  const nodeList = document.querySelectorAll(selector);
  const nodeArray = Array.from(nodeList);
  return new DomNodeCollection(nodeArray);
};

const queueFunction = (fn) => {
  if(!docReady) {
  docReadyFunctions.push(fn);
  } else{
    fn();
  }
};

document.addEventListener("DOMContentLoaded", (e) =>{
  docReady = true;
  docReadyFunctions.forEach((fn) => {
    fn();
  });
});
