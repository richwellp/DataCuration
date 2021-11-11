// THE CULPRITS

var domTree = document.getElementById("dom-tree");
var page = document.getElementById("page");
var highlight = document.getElementById("highlight");



// THE CREATION OF THE DOM TREE LOGIC

function createDomTree() {
  domTree.innerHTML = "";

  function walkElement(element, indent = 0) {
    domTree.appendChild(document.createTextNode("  ".repeat(indent)));

    var span = document.createElement("span");
    span.textContent = "<" + element.tagName.toLowerCase() + ">";
    span.attachedElement = element;
    element.attachedDomTreeElement = span;
    span.className = "dom-element";
    domTree.appendChild(span);

    domTree.appendChild(document.createTextNode("\n"));

    for (let child of element.children) {
      walkElement(child, indent + 1);
    }
  }

  walkElement(page);
}



// THE HIGHLIGHTING LOGIC

let currentlyHighlightedItem = null;

function highlightElement(element, domTreeElement) {
  if (currentlyHighlightedItem == element)
    return;

  let rect = element.getBoundingClientRect();

  highlight.style.left = rect.x + "px";
  highlight.style.top = rect.y + "px";
  highlight.style.width = rect.width + "px";
  highlight.style.height = rect.height + "px";

  page.appendChild(highlight);
  
  let selectedDomTreeElement = document.querySelector(".dom-element.selected");
  if(selectedDomTreeElement) {
  	selectedDomTreeElement.classList.remove("selected");
  }
  domTreeElement.classList.add("selected");

  currentlyHighlightedItem = element;
}



// EVENTS

// on the dom tree elements

domTree.addEventListener("mousemove", function(e) {
  let target = e.target;
  if (target.classList.contains("dom-element")) {
    highlightElement(target.attachedElement, target);
  }
}, true);

domTree.addEventListener("mouseleave", function(e) {
  highlight.remove();
  currentlyHighlightedItem = null;
  let selectedDomTreeElement = document.querySelector(".dom-element.selected");
  if(selectedDomTreeElement) {
  	selectedDomTreeElement.classList.remove("selected");
  }
});

// on the page itself

page.addEventListener("mousemove", function(e) {
  let target = e.target;
  if (target.attachedDomTreeElement) {
    highlightElement(target, target.attachedDomTreeElement);
  }
}, true);

page.addEventListener("mouseleave", function(e) {
  highlight.remove();
  currentlyHighlightedItem = null;
  let selectedDomTreeElement = document.querySelector(".dom-element.selected");
  if(selectedDomTreeElement) {
  	selectedDomTreeElement.classList.remove("selected");
  }
});

// BOOTSTRAP

createDomTree();
