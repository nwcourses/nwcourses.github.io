# Week 1 Topic 1 - JavaScript Modules

In this topic we will introduce *JavaScript modules* and also look at how
*bundlers* such as *Webpack* can make our life easier. We will also take
a look at the `npm` package management tool and how it can make installing
third-party dependencies easier.

## Why?

This topic is necessary to understand contemporary JavaScript development
practice.

## Introduction - Why are modules needed?

You have already done some JavaScript, in Developing for the Internet (where
we did some AJAX) and also in Internet Technology. However, so far, we have
not created any large, complex JavaScript applications. So far, the approach
has been to save your JavaScript in an external `.js` file, and include it
into your HTML, e.g.
```html
<script type='text/javascript' src='script1.js'></script>
```
However, when writing larger and more complex JavaScript applications (such as those we will write in this module), you will find that this approach will quickly become difficult to manage, as you will write multiple JavaScript files and have to include *each one* in your HTML, for example:
```html
<script type='text/javascript' src='script1.js'></script>
<script type='text/javascript' src='script2.js'></script>
<script type='text/javascript' src='script3.js'></script>
<script type='text/javascript' src='script4.js'></script>
<script type='text/javascript' src='script5.js'></script>
```
As can be seen, this quickly becomes quite unmanageable and makes your
HTML code very messy. Furthermore, many websites rely on *third party*
JavaScript libraries - such as A-Frame, the VR and AR library we will be using
in this module. These have to be included too, for example here we are including A-Frame as well as 5 of our own JavaScript files:
```html
<script type='text/javascript' src='script1.js'></script>
<script type='text/javascript' src='script2.js'></script>
<script type='text/javascript' src='script3.js'></script>
<script type='text/javascript' src='script4.js'></script>
<script type='text/javascript' src='script5.js'></script>
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
```
Hopefully you can see that for a complex web application with many JavaScript files, you'll end up with half your HTML code being links to external script files!

### A better way: modules

Clearly another way is needed and luckily there is one: the JavaScript *module*. A module is a reusable piece of JavaScript which can be *imported* into other JavaScript files. There have been various approaches to modules;

- *CommonJS modules*. This was the first widespread approach to using modules, and is still widespread today because it is the main approach taken by the server-side JavaScript environment *Node.js*. It can also be used in the browser through the use of a *bundling tool*, see below, and indeed is stil widely used in a browser environment.

- *ECMAScript 6 modules* ("ECMA6 modules"). This approach is part of the recent ECMAScript 6 standard, a major revision to the ECMAScript specification which forms the basis of JavaScript. Unlike CommonJS modules, ECMAScript 6 modules are supported *natively by the browser* and do not require third-party tools to process. However, support has only recently been added to browsers, and similarly, support has only recently been added to Node.js, so uptake of ECMA6 modules has been slow. Additionally, much code has been already written with CommonJS modules, necessitating conversion of CommonJS to ECMA6.

However, because they are now becoming mainstream and are supported by up-to-date browsers (and you should be using an up-to-date browser, otherwise it's a security risk) we will use them here.

## An example ECMAScript 6 module

The whole idea of modules is to write *reusable code* that can be *imported into any project*. Here is an example of a simple module. You'll notice that most of it is simple JavaScript. Only the `export` statement at the end makes it a module.
```javascript
function sayHello(name) {
    console.log(`Hello ${name}!`);
}

function square(n) {
    return n * n;
}

export { sayHello, square };
```
Note how this module contains two functions, `sayHello()` and `square()`, which display a greeting and calculate the square of a number, respectively. However the interesting thing is the statement at the end:
```javascript
export { sayHello, square };
```
This statement *exports the two functions, so that they can be used from the outside world*. This file would be saved as a simple JavaScript file, e.g. `module1.js`.

A couple of other syntax points here, which you may not have encountered before:

- `console.log()` writes a message to the developer console, which you can
view by going to the developer tools of your browser.
- Note the backtick syntax in the `console.log()` statement when we write
out the hello message. This is another ECMAScript 6 feature, and allows us to *embed variables directly inside a string* as long as the variable is surrounded by curly brackets `{}` and the curly brackets are preceded by a dollar sign `$`. (In fact, full expressions can be placed within the curly brackets).

### Using the module from another file

We've created a simple module, but how might we use it from another file?
We need to `import` the functions that have been exported. Here's an example. You can imagine this is the "main" JavaScript function of your application, in other words the file which runs when the page is first loaded. This is often named `index.js` by convention.
```javascript
// index.js - 'main' JavaScript file

// Import the two functions from the module. 
// Note the './' before 'module1.js'. This means 'the current folder'
import { sayHello, square } from './module1.js';

// Call the sayHello() function from the module
sayHello("Fred");

// 'const' is a constant - like a variable, but can never change.
const a = square(3);
console.log(`The square of 3 is : ${a}`);
```
Note how we have to *import* the functions from the module before we can use
them. This makes for easier-to-read code as we can tell exactly where the
two functions `sayHello()` and `square()` have come from.

### Including modules into a web page

To actually make this code run, we need to link it to an HTML web page which
can be executed from the browser. We link the `index.js` file as that is the
main file of the application, and then the `module1.js` file will automatically
load.

We link a module in the same way as a regular JavaScript file, except we
use `<script type='module'>`. Note that the main JavaScript file,
`index.js`, is itself a module. It's the 'main module' of the application and
it's using another module, `module1.js`. For example:
```html
<html>
<head>
<script type='module' src='index.js'></script>
</head>
<body>
...
```
Note that the standard for ECMAScript 6 modules is to use the `.mjs` extension
(JavaScript module) rather than `.js`. However `.mjs` is not widely supported
by browsers yet, so I'd advise you to use `.js`.

### Example 2: Only importing some functions

It's possible to only import *some* functions from a module. For instance
this version of our `index.js` code:
```javascript
// index.js - 'main' JavaScript file

// Import sayHello() (only) from the module. 
import { sayHello } from './module1.js';

// Call the sayHello() function from the module
sayHello("Fred");

// This will not work now, as square() was not imported from the module
const a = square(3);
console.log(`The square of 3 is : ${a}`);
```

### Example 3: Grouping all members of an exported module into a module object

The code above works, but it can be a little messy to import each function
separately. It would be nicer if we could *collect together all module
exports as a single object*  so that the code is a bit more, well, 
modular. The next `index.js` example shows this:
```javascript
// index.js - 'main' JavaScript file

// Import the two functions from the module into a module object.
import * as MyModule from './module1.js';

// Call the sayHello() function from the module
MyModule.sayHello("Fred");

const a = MyModule.square(3);
console.log(`The square of 3 is : ${a}`);
```
Note how this differs from the first two examples. First, consider the
`import` statement:
```javascript
import * as MyModule from './module1.js';
```
Rather than importing each function separately, they are all being imported
as a single *module object*, MyModule. You can reference each exported 
function by referencing the module object name, then a dot, then the function
name, for example `MyModule.sayHello(...)`. 

(To relate this to object-oriented programming, which we did in DFTI last year and you may have done elsewhere, `MyModule` is an *object* and `sayHello()` is a *method* of that object).

### Example 4: Default export 

If your module only needs to export one function or object, you can declare
this as the *default export*. This is another way of achieving the effect of
the previous example, with all exports from a module packaged into a single
object. So here is an example of the module using a default export:
```javascript
function _sayHello(name) {
    console.log(`Hello ${name}! This is from a default export`);
}

function _square(n) {
    return n*n;
}

export default {
    sayHello: _sayHello,
    square1: _square
};
```
This exports a default object with two fields: The *sayHello* field is set
equal to the function *_sayHello()* (note that an underscore is a convention
in JavaScript for a 'private' or 'internal function), and the *square* field
is set equal to the function *_square()*.

We can then use the default export in our main module using:
```javascript
import MyDefaultObject from './module1.js';
```
This will import the *default* export from the module as `MyDefaultObject`, so
we can then call the methods with:
```javascript
MyDefaultObject.sayHello('Fred');
console.log(MyDefaultObject.square(9));
```
Contrast the import with Example 3, above, in which we manually grouped
each separate import from the module into a module object in `index.js`. In that
example, the grouping of imports into an object was done in `index.js`.
 In this example, by contrast, we are grouping them in `module1.js` by creating
a default export.

### Example 5: renaming exported functions 

Finally, we can alias exported functions. We will return to the first
example to illustrate this:
```javascript
// index.js - 'main' JavaScript file

// Import the two functions from the module. 
// Note the './' before 'module1.js'. This means 'the current folder'
import { sayHello as sh, square as sq } from './module1.js';

// Call the sayHello() function from the module
sh("Fred");

// 'const' is a constant - like a variable, but can never change.
const a = sq(3);
console.log(`The square of 3 is : ${a}`);
```
Here we have renamed the exported `sayHello()` function as `sh()`, and the
exported `square()` function as `sq()`.

### Exercise 1

1. Create this web page.
```
<!DOCTYPE html>
<html>
<head>
<title>Modules</title>
</head>
<body>
Age from year of birth: <span id='age'></span><br />
Year of birth from age: <span id='yob'></span><br />
</body>
</html>
```

2. Create a JavaScript module containing two functions, one to calculate your
age from your year of birth, and another to calculate your year of birth from
your age. Assume everyone was born on January 1st (yes, strange assumption - but it's to keep the exercise simple!)

To get the current year, you create a `Date` object and then call 
`getFullYear()` on the `Date` object. To illustrate this, I have started 
(but not finished) the first function which needs to go in the module:
```javascript
function getAge(yearOfBirth) {
    // Create a date object
    const d = new Date();

    // Get the current year
    const y = d.getFullYear());

    // Up to you to do... calculate the age

    // Up to you to do... return the age
}
```

3. Create a "main" module which imports the functions from this module,
and contains some test code to call the two functions. You should calculate
an age from a year of birth, and vice-versa. 

Display the results in the two `<span>` elements in the HTML.
Remember that you can set the content of an HTML element with 
`innerHTML`, using code such as:
```html
document.getElementById(id_of_element).innerHTML = 'Contents of element';
```

For privacy reasons, do *not* test it with your real year of birth or age.

Note that you need to run your code through a web server in order to test 
code which uses ECMA6 modules. Luckily, a simple web server can be installed
through NPM, part of the Node.js distribution (see below for more details
on NPM). Install it from your command line (e.g. DOS prompt) with:
``` 
npm install -g local-web-server
```
and then run it from the folder containing your web page with 
```
npx ws
```
It will run a web server on port 8000, with the web root being the folder
it was launched from. So, if you go to the browser and access
```
http://localhost:8000/
```
you should see your current folder.

## Bundlers

Using modules, as we have been doing, is a good way to organise your code
and make it highly readable and understandable. However, when using 
*third-party* code, another step is frequently required.

The standard for installing third-party libraries, both in Node.js and for
the browser, is [npm](https://npmjs.com). `npm` or Node Package Manager is a
standard way to install third-party JavaScript software as *packages*. It's 
equivalent to `composer` in PHP or `pip` in Python.

An example of using `npm` would be as follows (you would run this in your
shell prompt, e.g. the DOS prompt in Windows or a shell in Linux or Mac OS X).
```
npm install querystring
```
This installs the package `querystring`. (This is a useful package, as it 
allows you to easily parse query strings from JavaScript). When a package
has been installed, it is placed in a folder called `node_modules`. This 
contains all NPM packages installed into your current project. (Evem though
the name is `node_modules`, the approach is still used for client-side
JavaScript).

How do we import a third-party module? In this discussion, it is important
to bear in mind that NPM and Node.js were originally built to use 
CommonJS modules. These would be imported in this way:
```javascript
const qs = require('querystring');
```
This is assigning the variable `qs` to the default object exported from the
module `querystring`. The equivalent using ECMA6 modules would be:
```javascript
import qs from 'querystring';
```
However, this does *not work as it stands.* The JavaScript interpreter
is not able to magically examine the `node_modules` folder, find the
`querystring` module from there, and import it. We need another tool, a
*bundler*, for this. Bundlers create a single JavaScript file, or *bundle*,
from multiple source files - and are intelligent enough to extract the
correct `npm` package from your `node_modules` folder.

Bundlers do other things too, for example they can include CSS assets too
and perform a step known as `minification`, which is to convert your 
JavaScript into a compressed form, which is unreadable but which leads to
a considerably smaller file size - vital when downloading JavaScript on
a mobile device when the signal may be poor.

There are a number of tools - "bundlers" - 
which can be used to easily include third-party dependencies.
One of these tools is [**Webpack**](https://webpack.js.org). can
transform code consisting of modules into a single "bundle" file which can
be used directly in the browser. Webpack can be installed with npm. 
As Webpack is a *development* tool, you want to install it *globally*, so that
it is accessible to all applications on your system and all users. The
`-g` option does this. (Normally, NPM packages are only installed locally into
the project that needs them, within the project's `node_modules` folder).
```
npm install -g webpack webpack-cli
```
Here is the most simple usage:
```
npx webpack index.js
```
This will take the file index.js, and any modules it uses (along with any
modules used by those modules) and prepare a single output file - a *bundle* - 
which will, by default, be placed in the `dist` subfolder with the name
`main.js`.  This can then be used directly in the browser e.g:
```html
<script type='text/javascript' src='dist/main.js'></script>
```
One key advantage of using a bundler like Webpack is that
*the bundler automatically includes third-party NPM packages* in the
bundle, if they are imported in your code with simple import statements such as:
```javascript
import qs from `querystring';
```
which will import the default export from the `querystring` package as the
variable `qs`.

### Webpack configuration

By default, Webpack will place its output in the file `main.js` within the `dist` folder, and it will also minify the code, in other words convert it into an unreadable but compact form for distribution.

However it is possible to configure Webpack to change this behaviour, and
this is done via the `webpack.config.js` configuration file. This is a 
file, itself written in JavaScript, which allows you to modify Webpack's
default behaviour. Here is an example:
```javascript
const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false
    }
};
```
What is this doing?
- We specify the application's entry point (the JavaScript file where your
application starts running) as `./index.js` (`index.js` in the current folder).
This means you can run Webpack with
```javascript
npx webpack
```
rather than
```javascript
npx webpack ./index.js
```
because the configuration file has told Webpack that the entry point of the
application will be `./index.js`. 
- We then specify some output options. Firstly, the `path` is the folder where the output bundle will be placed. Here, we are specifying the output is the `dist` subfolder of the current folder, and the filename is `bundle.js`. So, the resulting bundle will be named `bundle.js` and not `main.js`.
- The `optimization` options allow us to specify various ways in which the
output will be optimised. Here, we are turning minification off by setting
the `minimize` option to `false`. This can be useful for debugging, as you
will not get helpful error messages with a minified bundle file.

There are many other things you can do with Webpack, for example you can
include CSS inside your bundle for easy distribution. See the
[website](https://webpack.js.org) for more detail.

### Exercise 2

- Write an HTML and JavaScript application (one HTML page, one JavaScript
file) which makes use of the `querystring` module,
which you have seen here. It should read the query string specified in the
URL and display `title` and `artist` parameters within the query string.
It should display the title and artist specified in the query string by
displaying a message in a `<div>`, such as:
```
You entered the song: Life on Mars and the artist: David Bowie
```
Use `npm` and Webpack to install `querystring` build a bundle, and include
the bundle in your web page.
Here is how you would use `querystring`, assuming it's been imported as `qs`:

```javascript
// Split the current URL at the '?'. This will create an array, the first
// member being the URL before the '?' and the second member, the URL after
// the '?'. So the second member of the array will be the actual query string.

const urlParts = window.location.href.split('?');

// Parse the query string into an object called 'get'
const get = qs.parse(urlParts[1]);

// We can now access the parameters with get.paramName, e.g. for the query string:
// http://website/index.html?param1=value1&param2=value2
// we would access the parameters with get.param1 and get.param2.
```
- The `validator` package allows you to perform common validations on
input. Details [here](https://www.npmjs.com/package/validator).
Using the examples on the package's NPM page to help you, use it to validate a simple signup form, with fields for name, email and chosen username. Write an HTML page containing this form, together with a JavaScript file which imports `validator` using ECMA6 
module syntax and use it to validate the email and username fields (the 
username can contain letters and numbers). It should display appropriate
`alert` messages if any of the fields contain invalid data (the name can
contain anything). You'll need to install
`validator` using NPM and use webpack to create a bundle which can be included
in your HTML web page.

After doing that, import your year-of-birth-to-age module from Exercise 1
into your main `index.js` file for this question, add a 'year of birth' field to the form, and use your Exercise 1 code to check whether the user is at least 18 (in addition to the validation you've already done with `validator`).
