# Introduction to React

By the end of this week you should be able to address the following questions:

- What is React?

- What are React components?

- What are props?

- What is JSX?

- How can we iterate over a list to output components?

- How do you create a compositional component and what is the point?


## Why React

React is one of the leading JavaScript libraries for building web user interfaces.

According to the [React](https://reactjs.org/) documentation, "it makes it painless to create interactive UIs." Having used React in a production business environment I certainly agree with this sentiment.

Speaking broadly, React offers the following benefits:

- A light layer of functionality on top of JavaScript
- An experienced React developer is also an experienced JavaScript developer
- The React job market is buoyant and developers are demanding high salaries

## Video Walk Through

For the more visually inclined the former tutor of this module, Joe Appleton, has created a tutorial walking you through this weeks notes, but note that it relates to the former version of these notes. React has had some changes so the notes have  been updated. Nonetheless it's provided in case you find it useful,

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=052d879f-385a-4c8e-a0f4-ac5201289fe6&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=1946&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

## Creating your first React app

Formerly, the recommended way of creating a React app was with [create-react-app](https://create-react-app.dev), which automatically downloads dependencies and writes build scripts for you. However `create-react-app` is no longer maintained and therefore its use is not recommended. It still works, but it may break in the future.

If you still want to use `create-react-app`, please look at this video:

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=052d879f-385a-4c8e-a0f4-ac5201289fe6&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=182&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

### Creating a Hello World React app from scratch

Instead, you can create and build it from scratch, making use of `npm` to install dependencies, Webpack to build, and a third tool, [Babel](https://babeljs.io), which we will look at below.

The Hello World React app is available on GitHub at [https://github.com/nwcourses/react-starter](https://github.com/nwcourses/react-starter). We will go through each of its components.
 

#### Babel - transpiling JavaScript

Babel is a *transpiler*: a piece of software which converts between different JavaScript versions. Why is this useful? First of all it allows the newest versions of JavaScript, which may not be supported by older browsers, to be *transpiled* into older versions which browsers do support. Formerly, Babel was used extensively to transpile ECMAScript 6 upwards into the older version of JavaScript, ECMAScript 5, when the former was not widely supported. Now it is less used for this purpose as ECMAScript 6 and higher are widely supported by browsers.

In the context of React, Babel is important. With React, we write out code using an extension of JavaScript, *JSX*, which we will look at below. JSX is not natively supported by browsers so we need to transpile it using Babel into standard JavaScript.

#### The package.json

We will start our examination of the Hello World repository with the `package.json` file, used by `npm` to download dependencies and build the app.

```
{
  "name": "react-wp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --mode development",
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.22.20",
    "@babel/preset-react": "^7.22.15",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "babel-loader": "^9.1.3"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

Hopefully some of this will be familiar to you from last week:

- the `scripts` section specifies the scripts we can run with `npm`: you can see there is a `dev` script to build the project in development mode, a `build` script to build it in production mode, and a `start` script to start the `webpack-dev-server` (which we looked at last week).

- we then specify the `devDependencies`. The `devDependencies` are those dependencies only used for building the app: they are not needed to run it. They include:
	- `@babel/core` : the core part of Babel.
	- `@babel/preset-env` : for transpiling ES6 to ES5 (for maximum compatibility the output is in ES5).
	- `@babel/preset-react` : for transpiling React JSX code.
	- `webpack`, `webpack-cli` and `webpack-dev-server`, as last week.
	- `babel-loader` : Webpack "plugin" for Babel, linking the two together and allowing you to specify which files will be handled by Babel in `webpack.config.js`.

Finally the `dependencies` include React itself, and `react-dom` which allows DOM manipulation with React.

#### The webpack.config.js

Next we will discuss the Webpack configuration file, `webpack.config.js`, which we also saw last week. Here is the `webpack.config.js` for this project:

```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false
    },
    devServer: {
      static: './dist'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}
```
We went through most of this last week. However note the `rules` section within `module`. We looked at this last week in the context of including CSS files and images with Webpack, and specifying custom loaders to handle these and include them in the bundle. Hopefully you can see that this is testing for files with extension `.js` or `.jsx`, and if they occur, handle them with the `babel-loader` (i.e. they will be transpiled with Babel). We also exclude the `node_modules` folder as we do not want to wastefully run Babel on any third-party libraries we are using, in which the JavaScript will already be suitable for bundling without the use of Babel.

#### The .babelrc file

Finally we have a third configuration file: `.babelrc`. This is the Babel configuration file.
```
{
	"presets": ["@babel/env", "@babel/react"]
}
```
This tells Babel which transformations to enable. The `env` transformation is the standard newer-to-older JavaScript transformation, while the `react` transformation allows transformation of React (JSX) code into standard JavaScript.


## Exploring React - Hello World

If you look inside the `src` folder of the `react-starter` example, you can see `index.js`, containing a React `Hello World` application:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello World!</h1>);
```

If you look at this code, you should notice that the `render()` method, on the last line, takes a string of HTML which is not in quotes. What is this? It's **JSX**.

### JSX

With React, as hinted above, we use an extension of JavaScript called JSX (see the React documentation). JSX allows us to embed HTML elements within JavaScript code which can simplify coding a component if it contains large amounts of static HTML and only a small amount of variable data. You will see examples of JSX below. Because JSX is not native JavaScript, it needs to be converted to standard JavaScript using Babel. We discussed this process above.

### Explanation of the code

So what's the code example above doing?

- First of all we create a root element for our React app. This is done with the `createRoot()` method, part of `ReactDOM`. This takes an existing HTML element as an argument - here, the element with the ID of `root`

- We then call the `render()` method of our root elementand specify something which looks like a string of HTML, but does not have the quotes. This is **JSX**. So here the React code will render an H1 heading reading Hello World inside the element with the ID of `root`.


 
`npx`, just like `npm`, is a tool that is installed with node. `npx` allows us to run executables that are stored in the `npm` repository. We can use `npx` to quickly scaffold a React application:

### Exercise 1 - Testing the app

1.1 From within command line run:

```js
npm install
npm start
```

As we saw above, this will install the dependencies and then start `webpack-dev-server` and serve your application from the `dist` folder, as we did last week.


1.2 Version control your work and upload it to a GitHub Repo
 

## React Components

React apps are created through composing a series of reusable **components** - everything in your app is a component. They allow you to split your UI into a series of reusable pieces.

Conceptually a component in React is a JavaScript function which returns JSX. Here is an example component called `Welcome` which is implemented as a function of that name, and returns JSX containing a greeting to a specified name.

Component functions take one parameter: `props`, which is an object representing the properties passed in to the component, known in React as **props**. We discuss props below.

Each component should go in its own file, for modularity. So the component below would be saved in `Welcome.js`.

```js
import React from 'react'; // must include in all components

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Welcome; // export the function so we can import it from the index.js
```
We could render this component in our `index.js` by specifying it as a `<Welcome>` tag:
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import Welcome from './Welcome'; // must import the component JS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Welcome name='Fred' />);`
```
Note how we pass in a `name` property to the `Welcome` component. Inside the function which implements the component, we access that property with `props.name`.

### Props

Props (short for properties) are a key feature in React (see the React documentation). Props allow you to pass parameters to the component. You can see this in the example above: note how the `Welcome` function takes a `props` object as a parameter. This `props` object contains the properties passed into the component.

So, once again, note how our `Welcome` component takes one prop called `name`, with a value of Fred. The component function takes an object containing **all props** as a parameter; we identify the specific prop we're interested in by obtaining the corresponding property of this object. Here, only one prop is passed into the component, `name`, so we access this one and only prop inside the component with `props.name`.

### Exercise 2

- Try out the above.
- Try passing in a second prop for the age, so that a message which greets the user according to the two props passed in appears. For example:

```
Hello James, your age is 18!
```
appears if `James` and `18` are passed in as props for the name and age. 

### Object destructuring

We can improve the syntax for specifying the props as parameters in this way:

```javascript
function Welcome({name, age})
```
rather than
```javascript
function Welcome(props)
```

What is this doing? This is a general JavaScript (not React specific) feature known as **object destructuring**. It allows us to allocate properties of a JavaScript object into variables of the same name. Here is a simpler non-React example:

```javascript
function displaySong({title, artist}) {
    console.log(`${title} ${artist}`);
}

const songObject = {
    title: 'Wonderwall',
    artist: 'Oasis'
};

displaySong(songObject);
```

In this simpler example we create an object `songObject` containing two properties `title` and `artist`. We then pass this to the `displaySong()` function. However, note that `displaySong()` destructures the object into two variables, title and artist, corresponding to the properties of the same name. 

Likewise with React props, the props of a component are, as we have seen, passed into the component function an object, which are then destructured in the same way, e.g. into `name` and `age` variables rather than `props.name` and `props.age `properties.

### Exercise 3 

Change your code to use destructuring.

## More on JSX

As we saw above, JSX is a syntax extension to JavaScript and allows you to combine the full power of JavaScript to construct views. Let's consider a more complete example in updating our `src/App` function:

```js
function App() {
  const name = "Joe Appleton";
  const age = 21;
  const heading = <h1>Hello, {name}, your age is {age}</h1>;

  const sum = (x,y) =>  x + y; // define an arrow function to add two numbers

  return (
  <div>
    {heading}
    <h2> Testing an expression: One plus one is {sum(1,1)} ! </h2>
    <h2> Testing another expression: You {age >= 18 ? "can":"cannot"} vote! </h2>
  </div>
  );
 }
}
```

There are a few points of note to understand in the above example

- `return(...)` the parentheses `()` is ES6 and allows us to return on multiple lines
- To nest variables and expressions within our JSX we must use curly brackets (e.g. `{name}`)
- In case you are unaware, the expression:
```
age >= 18 ? "can": "cannot"
```
evaluates to "can" if the age is greater than or equal to 18, or "cannot" if not. It's a concise form of an `if` statement, known as a **ternary expression**.
- There must be a single parent tags within the JSX returned from the component function. In this instance - `<div> ... </div>` You cannot return JSX without a root tag, so `<h1>...</h1><h2>...</h2>` would be illegal. In situations where you might want to do this, you can use a "blank tag" to wrap the code, e.g. `<><h1>...</h1><h2>...</h2></>`
- Every React component **must** return the JSX to be rendered.

### Exercise 4

- Try out the above example. Write an `index.js` to render the `<App>` component to a root `div`, as before.

- Pass in the name and age as props, rather than hardcoding them, as above.

### Inline Styles in React

An important point about JSX is that inline styles are specified with a different syntax.

<pre>
&lt;p style=&#123;&#123; backgroundColor: 'yellow' &#125;&#125;&gt;
</pre>

The outer curly brackets indicate that we are embedding JavaScript within HTML within JSX, as before. The inner brackets indicate that we are defining a **JavaScript object** to represent the style, rather than ordinary CSS. The same rules as normal for accessing styles within JavaScript apply, i.e. style properties with dashes become camel case, for example `background-color` becomes `backgroundColor`.

### Exercise 5

In your `Welcome` component, add code to style the `div` according to a colour defined in a prop `color`. Modify your `index.js` so you pass the `color` prop into the component.


## Wrapping one component into another

Hmmm, why would you ever want to do such a thing? Here is an example of a component: 

![](./assets/completed_view.png\)

Can you see the border is slightly raised, creating a tile effect? This effect will need to be re-created throughout our application. As such, we should abstract this tile into a component. We can do this by creating a compositional component.


## Compositional components 

<iframe src="https://solent.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=052d879f-385a-4c8e-a0f4-ac5201289fe6&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=1946&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>

Let's create a wrap-around component - also known as a compositional component. Create a new file `Components/Tile.js`. Add the following code:

```js
import React from "react";

function Tile(props) {
  const { children } = props; // destructuring again, so 'children' refers to 'props.children'

  // Specify the style as a JavaScript object, again
  const divStyle = {
    boxShadow: "0px 10px 20px rgba(31, 32, 65, 0.05)",
  };

  return <div style={divStyle}>{children}</div>;
}

export default Tile;
```

The goal of tile is to wrap it around another element or component, it would work like this: `<Tile> <SomeElement/> </Tile>`. This can be achieved by taking advantage of the fact that React injects `<SomeElement/>` into the 'children' property of our `props` object. More generally, the `children` property of the `props` is **an array of all the child components of a given React component**.

See if you can work out how to update `<Welcome>` so `<Tile>` is wrapped around it.
