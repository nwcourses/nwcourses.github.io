# Week 3: A-Frame and JavaScript

(**NOTE that these notes are subject to minor change between now and
Tuesday.**)

## Introduction

Last week we looked at how to create some basic A-Frame scenes with HTML. We
found we could do quite a bit with plain HTML, for example we could move around
the scene, apply rotations, and even do animations. However, most of the power
of A-Frame comes from being able to create *scripts* in JavaScript to control
your scene and produce custom behaviour. In this way, powerful applications 
such as games and VR/AR applications can be built.

## It's all about building components!

The key approach to developing A-Frame applications is to *build your own
reusable components* and attach them to entities. As we have seen, A-Frame
already comes with a range of components such as `position`, `rotation`,
`scale` and `animation`. However, you can develop your *own components* and
attach them to entities. The idea is to try and make your components 
*reusable* so that once you've created a component, you can use it over and
over again in different applications.

Some examples of reusable components could be:
- a component to allow vertical movement of the camera. By default, we can
move around the scene using the WASD keys, but it would be nice also, 
particularly in a 3D world, to be able to move vertically using e.g. the
Q and Z keys. We could create a component to allow us to do this.
- a component to download the contents of our 3D world (for example, roads,
buildings and so on) from a server.


## A simple component

With that in mind, we'll write a simple component. Create the following
HTML:
```
<!DOCTYPE html>
<html>
<head>
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
<title>A-Frame Component</title>
</head>
<body>
<a-scene>
<a-sky color='skyblue'></a-sky>
<a-plane position='0 0 0' width='100' height='100' color='#7bcba4' rotation='-90 0 0'></a-plane>
<a-sphere color="red" position="0 1 -5" greeting></a-sphere>
</a-scene>
</body>
</html>
```
Note that the `<a-sphere>` has, in addition to the `color` and `position`
components, a `greeting` component. This is our own custom component
which we are going to write now. We create a component with 
`AFRAME.registerComponent()`:
```
AFRAME.registerComponent('greeting', {
    init: function() {
        alert('Hello World!');
    }
});
```
What is this doing?  We register the component with `AFRAME.registerComponent()`.  This function takes two arguments: the name of the component (`greeting`
here), and a list of component **lifecycle functions**. These functions run
at different stages of the component's lifecycle. We'll come across more
of these later, but for now, we will just consider the `init()` function.
This runs when the component is first created, and is typically used - as you
might guess - to initialise the component. So in this
example, as soon as the component is created, the "Hello World!" message
will appear.

### Exercise 1

Write the JavaScript above, save it (e.g. as `greeting.js`), include it in 
the HTML with a `<script>` tag and run it in the browser.

Then, to test, you can either load the HTML directly in the browser or use 
a local web server, as we did in Week 1.

## Giving properties to components

We can give *properties* to components. You have seen this already with 
in-built components such as `position` (which takes x, y and z coordinates)
and `animation` (which takes various properties including `from`, `to`,
`dir`, `dur` etc). In this simple example, we might want to display a 
custom greeting, not just "Hello World". The next example shows this.
```
<!DOCTYPE html>
<html>
<head>
<script type='text/javascript' src='dist/main.js'></script>
<title>A-Frame Component</title>
</head>
<body>
<a-scene>
<a-sky color='skyblue'></a-sky>
<a-plane position='0 0 0' width='100' height='100' color='#7bcba4' rotation='-90 0 0'></a-plane>
<a-sphere color="red" position="0 1 -5" greeting='message: Hello A-Frame!'></a-sphere>
</a-scene>
</body>
</html>
```
Now, the `greeting` component contains a `message` property, which is set
to "Hello A-Frame!". How can we extract that property and display it?
What we need to do is define a **schema** for our component. The schema 
defines what properties a component expects, and what data types each
component will have. For example:
```
AFRAME.registerComponent('greeting', {
    schema: {
        message: {
            type: 'string',
            default: 'Hello World!'
        }
    },

    init: function() {
        alert(this.data.message);
    }
});
```
We are now giving our `greeting` component a `schema`, and specifying that
the `schema` has one property, `message` which is of data type `string` and
has a `default` value of "Hello World!" In other words, if no `message`
property is provided, it will take "Hello World!" as the default value.

How do we access the property in our code? You can see this in the `init()`
function; we use `this.data` to access the properties of the current 
component. So to access the `message` property, we use `this.data.message`.

### Exercise 2

1. Try the example out.

2. Try removing the property from the `greeting` component in your HTML, so 
that it displays "Hello World!" as the default message.

3. Try adding a second property to your schema, `name`. This should represent
the name of a person. The `init()` function should now display the message plus
the name. For example if the message was "Hello" and the name was "Fred", it
should display "Hello Fred".

## Using the DOM to access entities and components from JavaScript

Hopefully you have looked at the [DOM](week1a.html) notes in your own
time, and seen how we can use the DOM to access elements within a web page.
Accessing elements within an A-Frame scene is exactly the same; A-Frame
scenes consist of a hierarchical arrangement of tags, just like an HTML page
does, and consequently, we can use the DOM to access them.

The next few examples are going to **embed** an A-Frame scene within a web
page. You can do this by adding `embedded` to your `<a-scene>` tag.
This allows us to include regular HTML input elements on our page
as well as the A-Frame scene. We are going to practise with the DOM by
manipulating our A-Frame elements from regular HTML controls.

```
<!DOCTYPE html> 
<html>
<head>  
<title>Basic A-Frame Scene</title>
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
<!-- your JavaScript -->
<script type='text/javascript' src='update-colour.js'></script>
</head>     
<body>      
<h1>Embedded A-Frame Scene</h1>
<a-scene embedded style='width:50%; height:600px; border: 1px solid black'>
<a-sky color='skyblue'></a-sky>
<a-plane position="0 0 -1" rotation="-90 0 0" width="100" height="100" color="#7bcba4" shadow></a-plane>
<a-entity geometry='primitive: box' id='box1' material='color: red' position='0 1 -5'></a-box>
</a-scene>
Change the box colour: <input id="boxcolour" type="text" />
<input type="button" id="go" value="go!" />
</body>
</html>
```
and this JavaScript:
```
// The parameter `e` is an event object, it can be used to obtain more detail
// about the event. We don't use it here, however.
function handleClick(e) {
    const box = document.getElementById('box1');
    const value = document.getElementById('boxcolour').value;
    box1.setAttribute('material', {
        color: value
    });
}

window.onload = () => {
    document.getElementById('go').addEventListener('click', handleClick);
};
```
Hopefully much of this will look familiar from the DOM examples.

We specify a `window.onload` function. This is a function which will 
automatically load when the page has finished loading. Only when the page
has finished loading will all our A-Frame components be loaded into
memory. 

Why can we not just put the code inside the `onload` function
directly inside our "main" JavaScript instead, and include it into our HTML with `defer` - to prevent it loading until the page has loaded - as we did in 
week 1? 

The problem is that `AFRAME.registerComponent()`, which is used to register
a component we saw above, has
to be loaded *before* the A-Frame scene is loaded into memory, and *not*
after the page has loaded. When the HTML of an A-Frame scene is read by the
browser, each component the browser comes across is checked if it is a registered component and if it is, it's initialised. If it isn't registered, it's ignored. So, if component registration is left until after the page has finished
loading, the components will not be recognised and therefore not initialised.

In this example, we *could* put the `onload` code in a script with a `defer`
(because `AFRAME.registerComponent()` is not used)
but larger A-Frame applications are likely to need to register some custom
components and if we tried to register components in a script with 
`defer`red loading, it would not work as they would be registered after the
page has finished loading. 

So to accommodate both constraints (components must be registered before the
scene is loaded, but components can only be *accessed* after the scene is
loaded) we typically make our JavaScript files load before the page but ensure
any code which deals with the DOM of the HTML page is placed in a 
`window.onload()` function to ensure it is only loaded *after*.

(Actually, this is not really best practice for JavaScript applications as
of ECMA6: best practice states that all JavaScript should be loaded *after*
the page, ideally as a module. But it is the way that A-Frame works, so we have
to do things this way).

To continue with the code:

- Within this function we add a `click` event listener function to the button,
so that the `handleClick()` function runs when we click the button. 

- Inside this `handleClick()` function we use the standard 
`document.getElementById()` to obtain our box using its ID.

- We then obtain the text the user entered in the input box with the ID of
`boxcolour`;

- and finally set the colour of our box (which is 
the `color` property of the `material` component) to the value
the user entered. Note how `setAttribute()` allows us to update a specific
component of the entity. It takes as its parameters, the name of the component
(`material` here) plus a JavaScript *object* containing property/value pairs 
for the properties of the component we wish to update (here, just the `color`
property of the `material` component).

See [here](../wad/objects.html) for notes on JavaScript objects. 

### Making the above example more concise using an arrow function

The above example will work, however it can be made more concise using an
*arrow function*. An arrow function is an anonymous function that can be
inserted, in its entirety, where a function is expected as an argument.
So we can rewrite the above JavaScript as follows:
```
window.onload = () => {
    document.getElementById('go').addEventListener('click', e => {
        const box = document.getElementById('box1');
        const value = document.getElementById('boxcolour').value;
        box1.setAttribute('material', {
            color: value
        });
    });
};
```
Note how the arrow function is more concise than the first version with the
separate `handleClick()` function. We have added the function in
its entirety as the event handler to our click event, rather than using 
a separate, named function called `handleClick()` as in the first example.

### Exercise 3

1. Extend the example to have two boxes, each with different IDs. Allow the
user to enter the box ID as well as the colour in two separate input boxes
and change the JavaScript code so that the colour of the correct box
changes.

2. Try changing the box to a sphere from within JavaScript, after you've
changed its colour. Does it work?

## Updating more complex properties

The `color` was a simple property of the `material` component of 
our box, which can be updated by means
of a simple text string. However, most of the time we want to manipulate
more complex components of entities. For example the `position` and `rotation` 
components both have a data type 
`vec3` (3 member vectors), i.e. they contain x, y and z properties. To update 
these, we need to pass a JavaScript **object** containing x, y and z properties.
(See [here](https://aframe.io/docs/1.0.0/core/component.html) for 
documentation on the different data types).

Here is an example: 
```
<!DOCTYPE html> 
<html>
<head>  
<title>Basic A-Frame Scene</title>
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
<script type='text/javascript' src='update-pos.js'></script>
</head>     
<body>      
<h1>Embedded A-Frame Scene</h1>
<a-scene embedded style='width:50%; height:600px; border: 1px solid black'>
<a-sky color='skyblue'></a-sky>
<a-plane position="0 0 -1" rotation="-90 0 0" width="100" height="100" color="#7bcba4" shadow></a-plane>
<a-entity geometry='primitive: box' id='box1' material='color: red' position='0 1 -5'></a-box>
</a-scene>
Move the box: <input type="range" id="boxmove" min="-5" max="5" step="0.5" value="0" />
</body>
</html>
```
and this JavaScript:
```
window.onload = () => {
    document.getElementById('boxmove').addEventListener('change', e=> {
        const box = document.getElementById('box1');
        const value = document.getElementById('boxmove').value;
        box1.setAttribute('position', {
            x: value,
            y: 1,    
            z: 5    
        });
    });
};
```
In this example we control the box with a **`range`** (a slider element).
A `range` can be used to set one of a range of numerical values. Here, the
`range` is setting values from a minimum -5 to a maximum +5 in steps of 0.5
and with a default setting of 0.

If we look at our JavaScript, we can see first of all that we handle the
`change` event of the `range` element, which will occur when the `range` is
moved.

Moving on to the event handler (again, an arrow function), we can see 
that we read the value of a range
in the same way as a simple text field, using its `value`. We then set the
`position` component of the box. Note how we do not set a simple value but a 
JavaScript *object* containing x, y and z properties. Note how we 
set the `x` property to the value of the slider and thus allow the entity
to move in the `x` direction.

### Exercise 4

1. `rotation` is also a component which stores a `vec3` - the three rotations
about the three axes x,y and z.
Change the example so that it allows the user to rotate the shape about
the y axis by means of a `range` slider. The `range` should range from
0 to 360 in steps of 10 and should update the `y` property of the `rotation` component of the shape (leave `x` and `z` at 0)


2. Extend question 1 so that there are three sliders, one to rotate about
each of the x, y and z axes. Connect all three sliders to the same function. 
In this event handler, ensure the `x`, `y` and `z` properties of the `rotation` component are updated appropriately.

## Mouse events

Mouse events on A-Frame entities are a bit more difficult than you might
imagine. You cannot simply add a `click` event to an entity. This is because
they are not HTML elements - they are not part of the HTML hierarchy of the
page. What you have to do instead is to add a `cursor` property to your
scene, and specify its `rayOrigin`. The `cursor` property represents a 
mouse cursor, and the `rayOrigin` is the origin of a line (ray) leading to
the clicked position within the 3D world. We most commonly want the origin of
this ray to be the mouse position, so that the ray leads from the mouse to
the appropriate place within the world. So, we specify `rayOrigin: mouse`. 
Here is an example:
```
<!DOCTYPE html>
<html>
<head>  
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
<title>A-Frame Component</title>
</head>
<body>
<a-scene cursor='rayOrigin: mouse'>
<a-sky color='skyblue'></a-sky>
<a-plane position='0 0 0' width='100' height='100' color='#7bcba4' rotation='-90 0 0'></a-plane>
<a-entity geometry='primitive: sphere'  material='color: red' position="0 1 -5" clicker></a-sphere>
</a-scene>
</body>
</html>
``` 
Note how we add the `cursor` component to our `<a-scene>`. Note also how we've
added a `clicker` component to our `<a-sphere>` object. Let's look at 
the code for this component:
```
AFRAME.registerComponent("clicker", {
    init: function() {
        this.el.addEventListener('click', e=> {
            alert('clicked');
        });
    }
});
```
Notice now, how we add a `click` *event listener* to the element. Note also how we use `this.el` to refer to the **parent entity of the component**. So `this.el` will refer to **whichever element was clicked**.

### Exercise 5

1. Extend the example so that the sphere turns blue when you click it.

2. Add two more spheres and add the `clicker` component to each. When you
click a sphere, does the correct one turn blue?

3. Add a property `color` to the `clicker` component. When an entity with the
`clicker` component is clicked, make sure it changes colour to the value of
the `color` property.

## Controlling the camera

We can add components to other kinds of entity, for example the camera.
Why might we want to do that? We might want to control the camera in a
different way to the default camera provided by A-Frame. For instance, we might
want to move the camera up and down using the 'q' and 'z' keys. We could
create and register a `vertical-controls` component which allows the camera
to be moved vertically, and then add that component to the camera entity.

How could this be done? The camera has a `position` component just like
anything else. So, in the component, we could setup event handlers for the
'q' and 'z' keys and move the camera appropriately. For example:
```
AFRAME.registerComponent('vertical-controls', {
    init: function() {
        window.addEventListener('keydown', e=> {
            const curPos = this.el.getAttribute("position");
            if(e.keyCode == 81) {
                this.el.setAttribute("position", {
                    x: curPos.x,
                    y: curPos.y + 0.1
                    z: curPos.z
                });
            } else if (e.keyCode == 90) {
                this.el.setAttribute("position", {
                    x: curPos.x,
                    y: curPos.y - 0.1,
                    z: curPos.z
                });
            }
        });
    }
});
```
How is this working?

- we add a `keydown` event listener. This will fire when the user presses a 
key. You can read more about key events [in the WAD notes](../wad/furtherevents.html)

- the `keydown` event handler takes an event object, `e`. We didn't need this
before, but now we need to find out more detail about the event, namely, which
key was pressed. We can obtain this with `e.keyCode` which gives numerical
codes for eah key (similar to, but not always the same as, the character's
ASCII code).

- we obtain the current entity's(`this.el`), i.e. the camera's, current
position, by obtaining the `position` component of the entity. This, as we
have seen, is a `vec3` containing `x`, `y` and `z` properties.

- depending on whether the user pressed q (code 81) or z (code 90), we reset
the `position` component so that its `y` property is either 0.1 more, or 0.1
less, than the current value. 

Try this out on the scene below. Note that, because we are adding a custom
component to the camera, we have to explicitly include the
`<a-camera>` entity (the camera); normally it's added for us. 
```
<!DOCTYPE html>
<html>
<head>
<title>Basic A-Frame Scene</title>
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
<!-- Include your vertical-controls component -->
<script type='text/javascript' src='vertical-controls.js'></script>
</head>
<body>
<a-scene>
<a-camera vertical-controls></a-camera>
<a-sky color="skyblue"></a-sky>
<a-plane position='0 0 0' width='100' height='100' color="#7bcba4" rotation="-90 0 0"></a-plane>
<a-sphere position="0 1 -10" color="red" scale="2 4 2"></a-sphere>
<a-sphere position="-2 1 -5" color="green" radius="2"></a-sphere>
<a-sphere position="2 1 -2" color="blue" radius="2"></a-sphere>
<a-sphere position="0 1 10" color="yellow" scale="3 1 1"></a-sphere>
<a-box position="5 1 -10" color="orange" scale="1 3 1"></a-box>
</a-scene>
</body>
</html>

```
You will find it works, but it's rather jerky and doesn't give a pleasant, smooth experience.

What we need instead is to make use of another lifecycle function of 
a component, `tick()`. The `tick()` function runs every time the scene is 
rendered.  The strategy, a common one for smooth key event handling, is to set 
a velocity to a non-zero value when the user presses 'q' or 'z', and reset the
velocity to 0 when they release either key. In the `tick` function, we 
increase `y` by the current velocity, so that the camera moves up if the
velocity is above 0, or down if the velocity is negative. 

```
AFRAME.registerComponent('vertical-controls', {
    init: function() {
        this.velocity = 0;
        window.addEventListener('keydown', e=> {
            if(e.keyCode == 81) {
                this.velocity = 0.1;
            } else if (e.keyCode == 90) {
                this.velocity = -0.1;
            }
        });
        window.addEventListener('keyup', e=> {
            if(e.keyCode == 81 || e.keyCode == 90) {
                this.velocity = 0;
            }
        });
    },

    tick: function() {
        const curPos = this.el.getAttribute("position");
        this.el.setAttribute("position", {
            x: curPos.x,
            y: curPos.y + this.velocity,
            z: curPos.z
        });
    }
});
```
A further improvement to the smoothness can be made. At the moment, the
`y` coordinate of the camera is changing by the same amount each time 
`tick()` is called. The problem is that the time difference between successive
`tick()` calls will vary depending on what else the computer is doing; if
it's doing a lot of heavy processing, there will be a larger gap between 
`tick()` calls. Luckily, there is an easy solution, the `tick()` function
takes a `delta` parameter representing the number of milliseconds passed since
the last call. So we can specify our velocity in units per second, rather than
some arbitrary value.
```
AFRAME.registerComponent('vertical-controls', {
    init: function() {
        this.velocity = 0;
        window.addEventListener('keydown', e=> {
            if(e.keyCode == 81) {
                this.velocity = 1;
            } else if (e.keyCode == 90) {
                this.velocity = -1;
            }
        });
        window.addEventListener('keyup', e=> {
            if(e.keyCode == 81 || e.keyCode == 90) {
                this.velocity = 0;
            }
        });
    },

    tick: function(time, delta) {
        const curPos = this.el.getAttribute("position");
        this.el.setAttribute("position", {
            x: curPos.x,
            y: curPos.y + delta * 0.001 * this.velocity,
            z: curPos.z
        });
    }
});
```
Note that the `tick()` function takes two parameters: `time`, which is the
system time in milliseconds since January 1st 1970, and `delta`, the number
of milliseconds since the last call to `tick()`. So, to calculate the change
in `y`, we multiply the `delta` by 0.001 (so that we can work in seconds, which
are easier to understand than milliseconds as most people have a clear idea
what a second is), specify the velocity in units per second (here, it's 1
unit per second) and add the delta (in seconds) multiplied by the velocity
(in units per second) to the current `y` coordinate. In this way, we can 
achieve smooth changes in position which take into account the time differences
between successive calls to `tick()`.

### Exercise 6

1. Enhance the `vertical-controls` component so that it has a `velocity` 
property (type `number`; see [the A-Frame component page](https://aframe.io/docs/1.0.0/core/component.html) for all the 
available property types). This should be a number (in units per second) which
should control the velocity of the camera. Set it to different values in your
HTML, to make the camera vertical controls faster or slower.

2. Embed this scene in an HTML page and add a `range` slider which controls
the camera's vertical velocity. When the value of the `range` changes, update the `velocity` property of the `vertical-controls` component of the camera to
the current value of the `range`. The `range` should cover 0.5 to 10 in 
steps of 0.5.

## Entity-component-system architecture

A-Frame adopts what is called an *entity-component-system* architecture.
We have already seen the roles of entities and components. What are systems?
A `system` is an object which contains the detailed logic of a component.
The idea is to keep the component itself lightweight, so that it mostly just
contains lifecycle methods - and then add the detailed logic to the system.
If you register a system with `AFRAME.registerSystem()` and that system has
the same name as a component, it will be accessible from the component via
`this.system`. For example:

```
AFRAME.registerComponent("mycomponent", {
	init: function() {
		// the system can be accessed from the component as this.system 
		// e.g. this.system.doSomething() will call the doSomething() function
		// of the system
	}
});

// System contains functions which do the detailed logic
AFRAME.registerSystem("mycomponent", {
	doSomething: function() {
	},

	doSomethingElse: function() {
	}
});
```
Our components so far are not complex enough to need systems, but as you
build more complex components you'll find your code becomes more modular if
you separate out the detailed logic into a system.

See [here](https://aframe.io/docs/1.0.0/introduction/entity-component-system.html) for more detail.
