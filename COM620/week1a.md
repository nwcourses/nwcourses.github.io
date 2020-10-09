## JavaScript and the Document Object Model (DOM)

The *Document Object Model (DOM)* is an addressing system for web pages 
(or XML documents, for those of you who have done XML).
The DOM represents the elements of a web page as a series
of hierarchically-nested *objects*, in which 
objects representing child tags are contained within objects representing the
parent. Using the DOM, we can access and manipulate properties of a web page 
using JavaScript. 
This allows us to dynamically update the state of the page, for example change the colour of a *div* or the text within it. Each page element is treated as a JavaScript object. Each object then has a series of 
attributes which we can manipulate.


Probably the most important feature of the DOM is the getElementById() 
*method* of the *document* object (an object representing the entire web page).
This method takes the ID of a page element, and gives us back
a JavaScript object representing that page element. 
For example:

```javascript
// JavaScript file: index.js
function changecolour() {    
    document.getElementById('div1').style.backgroundColor='red';
    document.getElementById('div1').style.color='white';
}

// Add a click even to the element with the ID 'btn1', so that when it
// is clicked, the function "changecolour()" will run.
document.getElementById('btn1').addEventListener('click', changecolour);
```
and the web page:
```html
<html>
<head>
<script type='module' src='index.js'></script>
</head>
<body>

<h1>Basic DOM example</h1>

<input type='button' value='Go!' id='btn1'/>
<div id='div1'> This is the test div </div>

</body>
</html>
```
This page contains a *div* with an ID of div1. The JavaScript function 
*changecolour()* uses *document.getElementById()* to 
get hold of that element, and then changes the backgroundColor (background colour) and color (text colour) properties of 
its style to red and white respectively. 

You'll also notice that this example provides some revision on *event
handling*. Note how, in our JavaScript, we attach a `click` event to the
element with the ID of `btn1` (the button). The `click` event is handled with
an *event handler function*, `changecolour()`. So, when the button is clicked,
the colour of the `<div>` will change.

### Rewriting the example more concisely with an arrow function

We can make the example more concise by re-writing the `changecolour()`
function as an *arrow function*. An arrow function is an anonymous function
(without a name), which can be added inline where an event handler is
expected. This is useful if the function will only ever be called in one
place, so there is little need to make it a named function. For example:
```javascript
// JavaScript file: index.js
// Add a click even to the element with the ID 'btn1', so that when it
// is clicked, the arrow function will run.
 
document.getElementById('btn1').addEventListener('click', () => {
    document.getElementById('div1').style.backgroundColor='red';
    document.getElementById('div1').style.color='white';
});
```
Note how much more concise the arrow function syntax is. When the 
button is clicked, the arrow function specified as the second argument to
`addEventListener()` will run. When we look at A-Frame, we will be using
the arrow function syntax extenasively.

### Exercise 1

1. Write a web page which contains a `<div>`, together with a form field
(with an ID) and a button. When the user clicks the button, a JavaScript function should run which reads in a colour (e.g "red") from the input box and sets the div's background colour to that colour.

2. Extend the previous question so that it has three form fields (each with IDs) allowing the user to input background and foreground colours and a message. When the user clicks a button, the background and foreground colour of the <div> should be set to what the user entered, and the `<div>` should be filled with 
the message.

## More detail on DOM - the concept of nodes

We will now explore the DOM in a bit more depth, and see how the DOM allows
us to *dynamically create content* on a web page.
An HTML document consists of a series of hierarchical *nodes*.
Each *element* (e.g *p*, *div*, or *em*
in HTML; or a custom tag in XML) is treated as a single *node*.

However it's not just the elements themselves:
the *text* within each element is also treated as a special kind of node, a *text node*

The nodes are a *nested*, *hierarchical* structure; 
each element within an element is a *child node* of that element

### Example of Nodes Terminology
```html
<body>

<p> Welcome to the <em>wonderful</em>* world of dynamic text</p>
</body>
```

- The paragraph is a *child node* of the *body*
- The paragraph contains **three** of its own *child nodes*:
    - The **text**: *"Welcome to the"*
    - The **em** element
    - The **text**: *"world of dynamic text!"*

- The **em** *itself* contains one child node:
    - The **text**: *"wonderful!"*
    - This is a child of the **em** not the **p**

### Nodes Hierarchy Diagram: Tree view
```html
<body>
<p> Welcome to the <em>wonderful</em> world of dynamic text</p>
</body>
```
![Nodes](images/nodes2.png)

### Adding a new node

*document.createElement()* allows us to *create a brand
new element* and *document.createTextNode()* allows us to create a brand new
text node.  Having created an element we can then populate it with text nodes
and child elements, and finally add it to either the body, or
another element, which will act as its parent.

[Example](examples/dom/node_add.html)

### Replacing an existing node

We can *replace a whole paragraph of text with another*.
The steps to do this are:
- Find the element to replace
- Create a new element (as per the previous example)
- Call *replaceChild()* to replace the old node with the new

[Example](examples/dom/node_replace.html)

### Getting all elements of a particular type

- It can make it easier to find a page element if we can collect
together all elements of a particular type (e.g. all paragraphs)
- *document.getElementsByTagName()* allows us to do this
- This gives us an *array* of all elements of a particular
type, which we can then index
-*document.querySelector()* 
and *document.querySelectorAll()* give the first
element, and all elements, which match a CSS selector respectively,
- e.g. `document.querySelectorAll(".important")`
will give an array of all elements with a class of *important*.

[Example - getElementsByTagName()](examples/dom/bytagname.html)

[Example - querySelector()](examples/dom/selector.html)

### Removing nodes

- The final key concept of dynamic text is *removing* a particular
node
- Use `parentElement.removeChild(childElement)`
- Use IDs or *getElementByTagName()*/*querySelector()* once again to find
the element to remove


### Debugging DOM applications: Inspecting elements

The *inspect* functionality in the browser will help you see
what's going on - try it as you do this exercise - right click on an
element. Inspecting helps you to see the actual current DOM structure of the
page - including any dynamically-created elements.

## Exercise 2

1. Write a simulation of a chat application. It does not need to work quite like a 'real' chat application where two people are communicating; just create a web page with two form fields, one for "person 1" and one for "person 2". Whenever a user enters something in either form field, append the message to a `<div>` (below the two form fields) so that it appears as a chat message. Create a paragraph for each chat message.

2. Extend your answer so that it displays in bold, before the message, which person (Person 1 or Person 2) created the message.

3. Further extend your answer so that different colours are used for the messagees from Person 1 and Person 2.

4. **(More advanced)** Try adding a Delete button to each chat message, so
that, for privacy reasons, a user can later delete a message that they are
not comfortable with. This isn't so easy but try and do it!
