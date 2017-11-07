class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
    this.eventCallBack = {};
  }

  each(callBack) {
    this.nodes.forEach(callBack);
  }

  html(string) {
    if (string === undefined) {
      return this.nodes[0].innerHTML;
    }

    this.each((node) => {
      node.innerHTML = string;
    });

    return this;
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (this.nodes.length === 0) return;

    if (typeof arg === 'object' && !(arg instanceof DomNodeCollection)) {
      arg = $l(arg);
    }

    if (typeof arg === 'string'){
      this.each((node => {
        node.innerHTML += arg;
      }));
    } else if (arg instanceof DomNodeCollection) {
      // grab existing elements, delete and append to the end of this
      this.each((parentNode) => {
        arg.each((childNode) => {
          parentNode.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  attr(key, value) {
    if (typeof value === 'undefined'){
      //getter
      return this.nodes[0].getAttribute(key);
    } else {
      //setter
      this.each((node)=>{
        return node.setAttribute(key, value);
      });
    }
  }

  addClass(newClass){
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass){
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(toggleClass){
    this.each(node => node.classList.toggle(toggleClass));
  }

  children() {
    // iterate through node
    let childrenNodes = [];
    this.each((node)=>{
    // find the child
      let childrenForNode = node.children;
      childrenNodes = childrenNodes.concat(Array.from(childrenForNode));
    // create a dom obj for each child
    });
    return new DomNodeCollection(childrenNodes);
  }

  parent() {
    let parentNodes = [];
    this.each(({ parentNode }) => {
      if (parentNode.indexOf(parent) === -1){
      parentNodes.push(parentNode);
    }
    });
    return new DomNodeCollection(parentNodes);
  }

  find(selector) {
    let found = [];
    let foundNodes = [];
    this.each((node) => {
      foundNodes = (node.querySelectorAll(selector));
      found = found.concat(Array.from(foundNodes));
    });
    return new DomNodeCollection(found);
  }

  remove(){
    this.each((node) => {node.remove();});
  }

  on(eventType, callback) {
    this.eventCallBack[eventType] = callback;
    this.each((node) => {
      node.addEventListener(eventType, callback);
    });
  }

  off(eventType) {
    this.each((node) => {
      node.removeEventListener(eventType, this.eventCallBack[eventType]);
    });
    delete this.eventCallBack[eventType];
  }
}

module.exports = DomNodeCollection;
