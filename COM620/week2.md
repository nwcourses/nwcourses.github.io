<!DOCTYPE html>
<html>
<head>
<title>Week 2 - Introduction to A-Frame</title>
<link rel='stylesheet' type='text/css' href='../css/dfti0910.css' />
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
</head>
<body>

# Week 2: Introduction to A-Frame

## Summary

This week we will start looking at [A-Frame](https://aframe.io), a leading framework for VR and AR on the web.

## Introduction

[A-Frame](https://aframe.io) is a framework for developing web-based VR and AR
applications, using only standard web technologies, in other words HTML and 
JavaScript. No third-party plugins are required. A-Frame makes it very easy to
create simple 3D scenes: indeed, for the most basic scenes, no JavaScript is
needed - you can simply use HTML tags representing 3D shapes and define
animations.

A-Frame is actually a wrapper round lower-level 3D libraries: 
[WebGL](https://www.khronos.org/webgl) and [Three.js](https://threejs.org). 
How do these fit in?

### WebGL and Three.js

WebGL is a web implementation of the standard cross-platform API for 3D
graphics, [OpenGL](https://opengl.org). OpenGL was originally written in C and 
has been around since 1992, and was originally used on high-performance Unix
workstations provided by companies such as Silicon Graphics. Later it was
ported to other desktop environments such as Windows, Linux and the Mac.
In 2009, with increasing interest in full-featured, "desktop-like" web
applications, WebGL arrived and allowed development of 3D graphical applications
in the web browser using JavaScript. It has been supported in Firefox, for 
instance, since version 4.

WebGL, however, is a very low-level programming API, and producing even
code to show one single 2D triangle on the screen (never mind a 3D shape)
is rather complex. For this reason, [Three.js](https://threejs.org) arrived
on the scene soon after WebGL. Three.js hides a lot of the low level details
needed to create a 3D scene, allowing you to create and manipulate 3D shapes
with higher-level code. However you still need to manage certain aspects of
your application yourself, such as responding to key presses and updating the
user's position within the 3D world, known as the **camera**. 

### What do we mean by the camera?

It's important to not get confused by the terminology here. **Camera** in this
context represents the user's current position, and direction of view, within
the 3D world - not the actual hardware camera used to take pictures on the
device. A VR application, using purely computer-generated content,
would still have a **camera** in this context, representing the user or player's
position. Throughout the rest of this week, and indeed until we start talking
about AR, we will mean this camera when we use the word "camera".

## A-Frame

A-Frame is one level higher still. A-Frame is a framework which implements 
many of the standard actions of a 3D application automatically, for example:

- Moving the camera round the 3D world
- Rotating the camera
- Handling effects such as lighting 
- Easily creating and manipulating simple 3D shapes with very little code
- Handling events easily (such as click events on a 3D shape)

Furthermore, with A-Frame, we can define our 3D objects (known as 
*primitives*) using HTML tags. For instance, we use `<a-box>` to create a 3D 
box (or cube), `<a-sphere>` to create a 3D sphere, `<a-cylinder>` to create a 
3D cylinder, `<a-text>` to create text, and so on.

A-Frame objects live inside a **scene** (defined with the `<a-scene>` tag).
The scene represents your 3D world. You just place this within your HTML
page. Here is a simple example of an A-Frame scene, containing one sphere:

```
<!DOCTYPE html>
<html>
<head>
<title>Basic A-Frame Scene</title>
<script type='text/javascript' src='https://aframe.io/releases/1.0.4/aframe.min.js'></script>
</head>
<body>
<a-scene>
<a-sphere position="0 0 -5" color="red"></a-sphere>
</a-scene>
</body>
</html>
```
Try saving and running this. For this example you will *not* need to start
a web server, you can just load the file in your browser and it will work.
You should see a red sphere just in front of you. 
Try moving around the world with the WASD keys and try rotating with the
mouse. You should find that this works *automatically*, without needing to
write any code to detect keys or mouse.

Hopefully you can see how similar this code is to ordinary HTML. We are
defining our 3D shapes using HTML tags, just like we would define ordinary
HTML elements. Note how the `<a-sphere>` has two attributes, a `color`
(which is self-explanatory) and a `position`, representing its position
within the 3D world.

What does the position (`0 0 -5`) actually represent though?

### OpenGL coordinate system

A-Frame is based on OpenGL, and since OpenGL is a 3D API, it uses three coordinates: x, y and z. It's important to realise that
*x increases to the right, and y increases upwards* This is 
different to the situation in 2D computer graphics, where y increases 
downwards - but is the same as in standard maths.

Because this is 3D graphics, we have a third axis, the z axis. You can
think of this as pointing out at you from the screen, so that positive z
coordinates are "out of the screen" and negative z coordinates are
"into the screen". This is shown in the diagram below. 

![OpenGL default view](images/default_coord_system.png)

So in this example, we place the sphere 5 units "into the screen", but
level with the origin in the x and y directions.

These coordinates represent the absolute position of the object within the 3D world - so called *world coordinates*. The *origin* of the world is where x=0,
y=0 and z=0, and is the starting point of our camera within an A-Frame
application unless we change something. 

#### Exercise 1

Try adding two more spheres: 

- a green sphere two units to the left of the origin and two units "into the screen" relative to the origin, 
- a blue sphere two units to the right of the origin and two units "into the
screen" relative to the origin.

Once you've done that try adding a third sphere:

- a yellow sphere level with the origin in the x and y direction but two units
"out of the screen".

### Other properties

So far we've looked at the `position` and `color` properties of our sphere.
There are other properties too, for example `radius` will set the radius
of a sphere.

#### Exercise 2

- Give the blue and green spheres a `radius` of 2. You should find they
touch. This is what you should expect, as the blue sphere is 2 units to the
left of the origin and the green sphere 2 units to the right, so the edge of
each sphere, with a radius of 2, should reach the origin.

There is also the `scale` property, which allows you to scale objects in the
x, y, and z directions. For example:
```
<a-sphere .... scale='2 2 2'>
```
will have the same effect on a sphere as setting the `radius` to 2, as we
are scaling equally in the x, y and z directions. However it is possible to
scale differently in different axes, to produce a "stretch" effect - an oval
shape in the case of a sphere, for example:
```
<a-sphere .... scale='2 4 2'>
```
will scale by two units in the x and z directions, but four units in the y
direction - so the sphere will appear to be stretched vertically.

#### Exercise 3

Try moving your red sphere to have a `z` coordinate of -10 and your yellow
sphere to have a `z` coordinate of 10. Then, apply a 
`scale` of `2 4 2` to your red sphere and `3 1 1` to your
yellow sphere. Is the effect what you would expect?

### Boxes

We'll now move on and create a different type of shape, the box. This can
be created using the `<a-box>` tag but is otherwise fairly similar. For
example: 
```
<a-box position='0 0 -2' color='orange'></a-box>
```
The `<a-box>` can also have its `scale` adjusted.

#### Exercise 4

- Add an orange `<a-box>` to your scene at coordinates x=5, y=0, z=-10.
Find it in your scene (you may need to move from the origin as the other
shapes may be hiding it initially!)

- Scale it so that its height is three times its width (x direction) or
depth (z direction).

### Rotation

We can apply *rotations* to shapes, about the x, y, or z axes. These
rotations are specified in degrees and are anticlockwise. To imagine 
what is happening here, picture the 3D world and its three axes (x, y and z)
and try and imagine rotating the shape around *that* axis.

The rotations about the three axes are shown below.

![Axis rotations](images/axisrotation.png)

The animations below show the rotations about each axis.

#### X-axis

<a-scene embedded background='color: black' style='width: 320px; height: 240px'>
<a-box scale="1 3 0.2" position="0 1 -5" animation="property: rotation; from: 0 0 0; to: 360 0 0; loop: true; dur: 5000" color="red"></a-box>
</a-scene>

#### Y-axis

<a-scene embedded background='color: black' style='width: 320px; height: 240px'>
<a-box scale="1 3 0.2" position="0 1.5 -2.5" animation="property: rotation; from: 0 0 0; to: 0 360 0; loop: true; dur: 5000" color="green"></a-box>
</a-scene>

#### Z-axis

<a-scene embedded background='color: black' style='width: 320px; height: 240px'>
<a-box scale="1 3 0.2" position="0 1 -2.5" animation="property: rotation; from: 0 0 0; to: 0 0 360; loop: true; dur: 5000" color="blue"></a-box>
</a-scene>

#### Exercise 5

Create a *new* page with a *new* `<a-scene>`, as the first one will by now
be rather cluttered with shapes. Create an `<a-box>` within this
scene. It should have coordinates of x=0, y=0,
z=-10 and its scale should be 5 in the x direction, 10 in the y direction
and 1 in the z direction. Try each of these rotations in turn:

- 45 degrees anticlockwise about the y axis;
- 45 degrees clockwise about the y axis;
- 45 degrees anticlockwise about the x axis;
- 45 degrees clockwise about the x axis;
- 45 degrees anticlockwise about the z axis;
- 45 degrees clockwise about the z axis.

Do you get the rotations you expect?

### Adding a plane

The scenes so far might look a bit abstract as the shapes are just appearing
in white space; there is no concept of *ground*. Luckily, A-Frame comes with
another primitive which allows you to easily add a ground effect: the
*plane*. A plane only has width and height in two dimensions, so can be used
to show a flat surface. Also it is one-sided: its colour will only appear
on its front face, not its back face.
 This is represented using the `<a-plane>` tag:
```
<a-plane position='0 0 -1' width='100' height='100' color='#7bcba4'></a-plane>
```
Note the hex code for the colour. We can use hex codes in A-Frame just like we
can in normal HTML elements. Just to give credit: this particular shade of
green was taken from the basic A-Frame example on the A-Frame website.

#### Exercise 6

Try adding the plane above to your scene. Do you get what you expect?
Try moving forward with the 'w' key. What happens now? Try looking round
by moving your mouse. Can you see the plane anywhere?

#### Rotating the plane

The problem is that the plane, by default, is in what we call the *XY* plane,
in other words the plane is that formed by the X and Y axes, and
at a constant *z* position (z=-1). This means
it will be upright rather than flat on the floor as we want.

Also, when you moved forward with the 'w' key, you were moving towards negative 
'z'. The plane by default is facing positive 'z', so when you're in front of
it, it can be seen, but when you're behind it, it disappears completely - even
if you look back.

#### Exercise 7

Try to use an appropriate `rotation` property on the `<a-plane>` to make it
appear on the ground - in other words, on the 'XZ' plane (the plane formed
by the X and Z axes) - and facing upwards.

### Compound entities

So far we have looked at simple, or primitive, shapes. However it is 
possible to create more complex, or *compound* entities. You can use
the `<a-entity>` tag to define an arbitrary entity and again, give this
properties such as `scale`, `position` or `rotation`. Within the `<a-entity>`
you can then create simple shapes. For instance:
```
<a-entity position='2 0 -5'>
    <a-box position='0 0.5 0' color='red' scale='1 2 1'></a-box>
    <a-sphere position='0 2 0' color='blue'></a-sphere>
</a-entity>
```
This is defining a compound entity at position x=2, y=0, z=-5 within our 
world. The entity contains, as *child elements*, an `<a-box>` and an
`<a-sphere>`. Note the `position` properties of these child elements. These
are **relative to the compound entity's position**, not the world. So the
box will not appear just above the world origin, but at world coordinates x=2+0, y=0+0.5, z=-5+0 (z=2, y=0.5, z=-5). Likewise, the sphere will not appear at the world origin, but at world coordinates x=2+0, y=2+2, z=-5+0 (x=2, y=4, z=-5).

To give another example of a compound entity, here is a shape made up of
a blue sphere surrounded by four red boxes, making a cross-like shape.
```
<a-entity position='2 0 -5'>
    <a-sphere position='0 2 0' color='blue'></a-sphere>
    <a-box position='0 0.5 0' color='red'></a-box>
    <a-box position='-1.5 2 0' color='red'></a-box>
    <a-box position='1.5 2 0' color='red'></a-box>
    <a-box position='0 3.5 0' color='red'></a-box>
</a-entity>
```
Again the world position of this entity is at x=2, y=0, z=-5, and the 
coordinates of the four boxes and the sphere are relative to the world
position of the entity.

#### Exercise 8

Add the compound entity above to your scene, to get a feel for what it
looks like.

Then, write down the **world** x, y, and z coordinates of the sphere and four
boxes.

#### Rotating and scaling a compound entity

Furthermore, any rotations and scaling done to the compound entity will
rotate or scale the **compound entity as a whole**. So if you were to
add a rotation as shown below:
```
<a-entity position='2 0 -5' rotation='0 0 45'>
    <a-sphere position='0 2 0' color='blue'></a-sphere>
    <a-box position='0 0.5 0' color='red'></a-box>
    <a-box position='-1.5 2 0' color='red'></a-box>
    <a-box position='1.5 2 0' color='red'></a-box>
    <a-box position='0 3.5 0' color='red'></a-box>
</a-entity>
```
the entire 'cross' shape would rotate anticlockwise by 45 degrees.

### Entities and components

A-Frame consists of *entities* and *components* (along with *systems*, but we
will come on to those later). An **entity** is any object within our scene - 
including shapes, and other things within our scene such as the camera. 
Entities include not just compound entities, but also simple shapes such as 
boxes. 
A **component** is an aspect, or property, of an entity, such as its geometry, 
its surface material, or its animation. The primitives we have 
seen so far, such as `<a-box>` and `<a-sphere>`, are actually wrappers round 
entities and components. Components are written in code as attributes of
entiies. 

For example, an `<a-sphere>` could be written instead as an 
`<a-entity>` with a `sphere` geometry:
```
<a-entity geometry='primitive: sphere' material='color: red' position='0 0 -5'>
</a-entity>
```
What does this code represent?

- it's a generic `<a-entity>`;
- it has a `geometry` component which is
 a `sphere` primitive (in other words it's a sphere);
- it has a `material` component with a red colour. An entity's `material` defines the properties of its surface. This includes not just colour but also properties such as shininess (how does it reflect background light? for example does it have a metal-like surface which reflects light eaily or a carpet-like surface which does not)
- it has a `position` component defining its position. We have seen this already.

So the `<a-entity>` is the **entity**, and `geometry`, `material` and `position` are its **components**. With A-Frame, everything in a scene is an entity of some kind,
and each entity has different components attached to it. A-Frame development is all about creating your own components and then attaching them to entities. The idea is to design components to be reusable so that they can be attached to different entities in different applications. You can see this with the `geometry` and `material` components in the example above; these components can be attached to any entity to define its geometry and surface material.

#### Exercise 9 

Change the four boxes and sphere within your compound entity (from the previous
exercise) to be `<a-entity>`s with the geometry and colour defined using
appropriate components.

### Animations

An interesting feature of A-Frame is the ability to create *animations*
only using HTML code - no JavaScript is required. This is done by adding an
`animation` component to an entity (either a primitive shape or a generic 
`<a-entity>`). The animation component has various attributes including
`property`, `from`, `to` `loop`, `dir`, and `dur`, amongst others,
and can be used to animate various aspects of the entity including
its position, scale, rotation and even colour (this is done by transitioning
from one colour to another).
The meaning of these are:

- `property`: which property to animate (e.g. position, rotation, color)
- `from`: the initial value of the property.
- `to`: the final value of the property.
- `loop`: whether to continuously loop the animation.
- `dir`: the direction of animation. Can be set to `reverse` to do the animation in reverse, or `alternate` (if `loop` is true) to do the animation forwards,
then reverse, then forwards, then reverse, and so on.
- `dur`: the duration of the animation (in milliseconds)

The full list is available [on the A-Frame site](https://aframe.io/docs/1.0.0/components/animation.html).

Some examples include:
```
<a-box animation='property: position; from: 0 0 0; to: 0 0 -10'>
```
The box will move from the origin to position x=0, y=0, z=-10.


```
<a-box animation='property: rotation; from: 0 0 -90; to: 0 0 90'>
```
The box will rotate, starting from -90 about the z axis to +90 about the
z-axis.

```
<a-box animation='property: color; from: #ff0000; to: #0000ff; dur: 5000'>
```
The box will undergo a colour transition from red to blue, through
the intermediate colour (magenta). The colour transition will take 5 seconds
to complete.

#### Exercise 10 

Create a further web page with another A-Frame scene and add an `<a-box>`
at position x=0, y=0, z=-2.

1. Via an animation, make the box rotate to 360 degrees about the z-axis 
over a time scale of 5 seconds. (This is how you make something rotate
a full circle; start at 0 and finish at 360).

2. Change the animation so it continuously rotates in a loop. 

3. Change the animation so that it rotates from 0 to 180, then 180 back to
0, then 0 to 180, then 180 to 0, and so on - continuously in a loop.

4. Add a second animation which changes the colour from `#ff0000` to
`#00ff00` but over a period of 10 seconds.

5. Add your 'cross' compound entity from the previous scene into this
scene. Make it animate from y=0 to y=5, back to y=0, back to y=5, back to
y=0 and so on (so it continuously 'takes off' and 'lands') over a time
period of 5 seconds.

## If you finish

Look at the [DOM](week1a.html) notes and try the exercises.

</body>
</html>
