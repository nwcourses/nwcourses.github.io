# Practical Session - Week 1 

By the end of this week you should be able to answer the following questions:

- What are the latest features of JavaScript?
- How can I package a modern JavaScript application?

[Practical session Week 1 Video](https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=eac06dd3-4f6d-4f91-9de8-ac46013224e0&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all)

>> Task two walk through 

The purpose of this session is to ensure that everyone is up-to-speed with the latest version of JavaScript. To achieve this, we are going to work through the perennial [TodoList](https://github.com/tastejs/todomvc/) exercise.

In this session, we are focussing on vanilla JS; however, from next week onwards we will be using React.

## Session Dependencies

These should be available on the university computers.

- [You will need to ensure you have the version control tool Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)    
- You will need to ensure that you have installed [node.js](https://nodejs.org/en/)
- While you can use any text editor for this session, I recommend that you install [VS Code](https://code.visualstudio.com/download)

## TASK 1 

[Read the about the latest version of JavaScript](https://www.greycampus.com/blog/programming/java-script-versions)


## Package and Build Management

[Package and Build Management Video](https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=a6ae72f5-35a1-4843-9dec-ac460132246b&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all)

In order to package our application we need to a build tool, [Webpack](https://Webpack.js.org/) is currently the most popular tool.

Webpack is a JavaScript **bundler**. It takes one or more JavaScript files, together with static assets such as CSS and images, and builds a single **bundle file** containing this code. This bundle can be included on your HTML pages with a `script` tag as always.

The bundle contains **minified** JavaScript (encoded and compressed JavaScript, with a considerably smaller size and thus faster to download).

> > At its core, Webpack is a static module bundler for modern JavaScript applications. When Webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles. (Webpack, 2020)

![Webpack Architecture](./assets/webpack-architecture.png)

> > Figure 1, a typical single page web application architecture.

## Why do we even need Webpack?

[Task 3-7 walkthrough Video](https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=92986265-8a7d-4278-a843-ac46013224aa&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all)

>> Task 3 - 7 walk through

To understand why we need a tool such as Webpack, we must first consider a modern web application architecture and the practical goals of this unit.

Figure 1, represents the overarching practical project that we will be working on throughout these sessions. We are going to be creating this application on a **single page**. This type of application architecture is appropriately known as a single page application (SPA).

Using an SPA approach, the browser loads a single page, along with what's known as a JavaScript bundle. There is no need for further page reloads as the `bundle.js` file contains nearly everything the browser will need for the given session.

This approach minimises HTTP requests and user wait time; however, the major drawback is search engines can not easily differentiate between pages in your application. This may not be a problem if the application is behind a login screen, as there is no need to appear in the search engines. If this is not the case, the solution is server-side rendering or pre-rendering, these are advanced topics that you should be aware of, but we will not cover them in your practical.

It would not be practical for developers to construct or work on a bundle file as it may bundle together many hundreds of dependencies. Webpack is the solution to this challenge, it allows us to bundle together multiple JavaScript files and assets.

> > When Webpack processes your application, it starts from a list of modules defined on the command line or in its config file. Starting from these entry points, Webpack recursively builds a dependency graph that includes every module your application needs, then bundles all of those modules into a small number of bundles - often, just one - to be loaded by the browser. (Webpack, 2020)

Let's explore the above ideas by starting this weeks practical - a todo list application.

## More on Webpack

You can read more about Webpack on the [COM620 notes](https://nwcourses.github.io/COM620/week4.html).

## TASK 2 

- Clone the following repository `https://github.com/nwcourses/todo-list-tutorial`
- Open the resulting `todo-list-tutorial` in VS code
- Install the dependencies, `npm install`
- Open `package.json` and work out how to run the defined scripts to:
  - run project in development mode
  - create a development build
  - create a production build


If you open up `index.html` there is simply a placeholder div, `<div id="app"></div>` for our application. Such a set up is typical of a SPA, we have a single element that the entire application is injected into.

## ES6 modules

[ES6 modules Video](https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=47179bca-5915-40c7-a6fd-ac4601322510&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all)

ES6 modules allow us to comparmentalise our code into reusable components - let's explore this idea that is used heavily in modern JavaScript development.

## TASK 3 

In your `src` directory create a file called `todolist.js`. Add the following code:

```js
const todos = [
  {
    id: "1",
    text: "Complete Android Assessment",
    created: "Jan 22 2024 07:02:0",
    completed: false,
  },
  {
    id: "2",
    text: "Organise Social Event",
    created: "Jan 23 2024 07:03:0",
    completed: false,
  },
];

export default todos;
```

In the above example, by exporting our constant containing the todo list array we make it available to our wider application. Notice how we use the keyword `default` we can only have a single default export per file.

We can use `todolist` in `main.js` by importing it by using the following code:

```js
import todos from "./todolist";
console.log(todos);
```

Try the above yourself.

We looked at writing and importing modules last year in [COM518](https://nwcourses.github.io/COM518/topic7.html). By using modules and importing them into your main JavaScript code, you can re-use them in multiple applications.

In the above example, we are importing `todolist` which we can access through the variable `todos`. As `todos` is a default export, we could change the variable name, e.g. `import td from "./todolist";`

Before moving on, experiment with:

- exporting and importing a function (e.g. one that squares numbers) from a separate module
- exporting and importing multiple imports.


At the moment our application does not resemble a todo list, in-fact, there is nothing rendered - let's change this.



## TASK 4 

- An amazing feature of Webpack is that, by using different loaders, it allows us to treat a wide range of different assets as JavaScript modules - odd, but very useful. Case in point, add the following lines of code to the top of `main.js`:

```js
import "./main.css";
import img1 from "../assets/top-left-elips.png";
import img2 from "../assets/bottom-right-elips.png";
```

This imports **two images directly into variables**, a demonstration of the power Webpack offers. It also allows you to import a CSS file, which will be applied to your site.

To explore this:

- In `main.js` create a function called `render()` that logs to the console "ready"
- Add the following event listener to `main.js` that ensures `render()` only runs when the page is loaded, `window.addEventListener('DOMContentLoaded',render);`
- Below is a constant containing a string of HTML using backtick syntax (so that variables can be embedded). Work out, using previous knowledge learnt on COM518, how you would, within the `render()` function set the innerHTML of `index.html`'s `<div id="app"></div>` to this value. Notice how the variables `img1` and `img2` within the `src` attribute of the `img` tags are variables based on the above Webpack imports!

```js
const view = ` <img
src="${img1}"
id="background-left"
alt="background"
/>
<img
src="${img2}"
id="background-right"
alt="background"
/>

<div class="wrapper">
<div class="todolist">
  <h1>STUDENT TO DO LIST</h1>
  <input type="text" id="todoInput" placeholder="What do you need to do today...." />
  <div class="list">
  </div>
  <!-- /.list -->
</div>
<!-- /.todolist -->
</div>
<!-- /.wrapper -->`;
```


## Breaking Down an Application Into Components

Destructuring is a further concept that is used widely in modern JavaScript. Let's explore this idea with a further exercise.

### Tip

- It would be nice to not have the majority of our functionality in `main.js` and instead, separate it out into different modules. With this in mind, let's create a separate file that is responsible for rendering a single todo item on our todo list.
  Create a new file `todo.js`.

- Add the following to `todo.js` : `

  ```js
  const Todo = (text, id) => `<div class="outer-item" id="outer-item-${id}" >
  <div class="to-do-item">
  <p> ${text} </p>
  <span class="close" id="close${id}" >  X </span>
  </div>
  <!-- /.to-do-item -->
  </div>
  <!-- /.outer-item -->`;
  export default Todo;
  ```

- I've defined a function (`Todo`) here, using the lambda syntax. It is often called an arrow function. We looked at these last year in COM518.

- The `Todo` function takes some text and a unique ID, and returns an HTML string containing the Todo item formatted as HTML. It contains a simple close button, taking the form of a `span` containing the letter `X`. Later on we will add an event handler to this, to to make that specific todo item disappear.

- Add code to your `main.js` to import the default export (the `Todo` function) from `todo.js` into your `main.js`, in a similar way to how youj imported the todos array from `todolist.js`.

## Array Operations

You should know what an array is - it is a data structure represented by `[]`. We have already used arrays, our todo list is an array of object literals:

```js
const todos = [
  {
    id: "1",
    text: "Complete Android Assessment",
    created: "Jan 22 2024 07:02:0",
    completed: false,
  },
  {
    id: "2",
    text: "Organise Social Event",
    created: "Jan 23 2024 07:03:0",
    completed: false,
  },
];
```

Arrays, come with inbuilt operations that we can run on them. For instance, `todos.reverse()` will reverse the array for us. Some of the most useful features are operations that allow us to loop through the entire array and construct a new array. A slightly odd concept, however, one you will become very familiar with. Some key operations are `map`, `reduce`, `filter` and `find`. 

Let's consider `map` in the context of our todo list. `map` allows us to apply a specific operation to each member of an array and generate an output array.


```js
const newArrayJustText = todos.map((item) => item.text);
console.log(newArrayJustText); //  ['Complete Android Assessment','Organise Social Event'];
```

As you can see, `map()` is a function that takes, as an argument, a function. The function, on each iteration, gets passed an array element. The function then returns the `text` property of each item in the array, so the output array contains only the `text` properties of each item. 

:::tip

## TASK 5 

- Within your `main.js` render function add the following lines of code:

```js
let htmlList = todos.map((item) => Todo(item.text, item.id));
document.querySelector(".list").innerHTML = htmlList;
```

- As if by magic you now have a todo list, because each item in the array is **mapped to the return value of the `Todo()` function with the `text and `id` of eah item passed in as arguments**.
- Can you see the annoying comma that is printed to the DOM ? - work out how to remove this.

:::

## Spread Operator

We need to push and remove todos from our `todolist`; however, notice how it is a constant (`const` is used to declare the variable). This means that, after definition, it can't be changed - a concept known as immutability.

Immutability is a good thing, it allows us to consistently rely on values as they are passed around our program. Instead of modifying immutable values we make copies of them.

You may logically think you could do the following:

```js
const array_1 = [1, 2, 3, 4, 5, 6];
let array_2 = array_1;
array_2.push(7);
console.log(array_1);
console.log(array_2);
```


## TASK 6 

The above operates in a strange way, can you see why?

It is because we create **two references to the same data in memory**. `array_1` and `array_2` are both referring to the area of memory storing the array. So if we push to `array_2`, the value actually gets added to `array_1` and `array_2` because they are pointing to the same data!

:::

To make a copy of an array we can use the spread operator `...` . This is how it is used:

```js
const array_1 = [1,2,3,4,5,6]
const array_2 = [....array_1, 7]
```

In the above example, we are not modifying `array_1`. Instead, we are using the spread operator to compose a new array.

The spread operator breaks down an array into its constituent values and allows them to be specified as multiple parameters. So here, `array_2` will consist of the individual items of `array_1`, plus the value `7`.

In the example below we use the spread operator to create a new array when a TODO list item is removed.

This example also revises the use of `bind()` to set up event listeners to pass parameters, as we need to pass the todo list into the `render()` function. Please see [the COM518 notes from last year](https://nwcourses.github.io/COM518/topic4.html), specifically the section on Binding, for more detail.

```js
// Modify your DOMContentLoaded to call render() via bind()
window.addEventListener("DOMContentLoaded", render.bind(this, todos));

// Modify your render() function to take a given todos list as a parameter
function render(todos) {

  // Setup your `view' variable - as before...

  // Create a new array 'tds' containing a copy of the todos list
  const tds = [...todos];

  // Create a function which runs when the "close" span on each todo item is clicked
  const handleCloseClick = (e) => {
    // render all items except the one with the ID of the item clicked by filtering the `tds` array
    // e.target gives us the item that was clicked. We obtain its ID with
    // e.target.id.
    // Its ID will be "close" plus the item ID, e.g. close1, close2, etc. 
    // We need to find the numerical ID so we can filter the array.
    // We do this by taking the substring of the ID starting at character 5
    // e.g. 2 for an ID of "close2".
    // substr() allows us to do this.
    //
    // FOR YOU TO DO: explain what filter() is doing and explain why we are
    // calling render() again (Ex7)
    render(tds.filter((item) => e.target.id.substr(5) != item.id));
  };

  
  // Place 'view' inside your 'app' div (as before)
  
  // Setup 'htmlList' (as before0

  // Join the htmlList array into a single string, with each member 
  // separated by a space
  document.querySelector(".list").innerHTML = htmlList.join(" ");

  // Setup event handlers on each 'X' close button
  // Each close button has a class of 'close' so the querySelectorAll() call
  // will find all elements with a class of 'close', i.e. all close buttons
  
  document
    .querySelectorAll(".close")
    .forEach((e) => e.addEventListener("click", handleCloseClick));
}
```

## TASK 7 

- Write down on paper what you believe `filter` and `forEach` are doing in the code above and explain why we are calling `render()` again inside `handleCloseClick()`.
- Complete the todo list application so we can add new todos. You need to add a form with text fields and a button, create a new todo item, add it to the array of todos, and then re-render the page by calling `render()` again.

