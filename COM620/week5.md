# Week 5: Models and Text in A-Frame

## Introduction

This week we will start to make our A-Frame applications look more realistic
by looking at how we can add *3D models* to our scene, and also look at how
we can add *text* to our scene to explain to the user what they are looking 
at.

## Models

Most real-world 3D applications would use 3D *models* of real-world objects,
such as people, animals or objects. These models typically consist of many
small triangles; each triangle has three *vertices* (points). Triangles are
typically used because 3D hardware is optimised to work with triangles.

Models also consist of:

- *Textures*: images which are overlaid on specific
parts of the model, for example a model of a Coke can might contain the 
cylindrical can as a series of triangle, plus an image of the Coke logo as
an external file - or texture - which could then be applied to the model to
look realistic.

- *Normals*: normals are mathematical vectors indicating which direction is
'up' for each vertex. Returning to the Coke can example, the normals would
point from each vertex away from the can, i.e. towards the outside world
rather than towards the interior of the can. Normals are used to calculate
lighting effects: in 3D graphics we can position lights within our world
which can then be reflected by outwards-facing surfaces. Returning to the
concept of a *material*, first encountered in week 2: we can set our 
A-Frame entity's material to have a particular *texture*, even if we are not
working with 3D models.

### What model formats are available?

There are various formats for 3D models. Two are supported by A-Frame:
see [the A-Frame documentation](https://aframe.io/docs/1.0.0/introduction/models.html).

- The *Wavefront OBJ* format. This is a long-standing format which has been
around since at least 1992.

- The *glTF* format. A more recent format with support for more advanced
features, such as animations, and, as described in the
[A-Frame documentation](https://aframe.io/docs/1.0.0/components/gltf-model.html), information about the scene, such as light sources and cameras.


### How to include a model in an A-Frame application

The first thing to note is that models can be rather large files. If our
application is creating many instances of entities all using the same model
(e.g. many monsters in a game) you do not want to load the same model over 
and over again because this will be very inefficient. Instead, we want to load
the model *once*, on startup, and then reference the *loaded* model when we
create our entities. Luckily we can do this in A-Frame by making use of 
A-Frame *assets* (the `<a-assets>` tag).

Here is an example of `<a-assets>`. Note that the `<a-assets>` are contained
within your `<a-scene>`.

```
<a-assets>
<a-asset-item src='assets/cow.obj' id='cow'></a-asset-item>
<a-asset-item src='assets/pig.obj' id='pig'></a-asset-item>
<a-asset-item src='assets/cow.mtl' id='cow-material'></a-asset-item>
<a-asset-item src='assets/pig.mtl' id='pig-material'></a-asset-item>
</a-assets>
```

There are four assets here, two OBJ models of a cow and a pig, and two
accompanying `.mtl` (material) files. Material files describe the properties of
the material used for the model, including its colour and its reflective
properties. The `.mtl` file will also contain a link to a texture image
(e.g. a PNG image), if one is provided. Note how generic assets, such as 
models, are specified using `<a-asset-item>`.
Note also how each asset has an ID; this will be used when we
create an entity using that asset later.

#### How we would reference an asset in our code

Here is how we could reference an asset in our code:

```
<a-entity obj-model='obj: #cow'></a-entity>
```
This is creating an entity which will represent an OBJ model, hence the
`obj-model` component. The `obj-model` component contains a property `obj` 
whose value is `#cow`, which references the asset with the ID of `cow`.

To link the `.mtl` (material) asset, we use the `mtl` property, e.g:
```
<a-entity obj-model='obj: #cow; mtl: #cow-material'></a-entity>
```
As well as OBJ, we can handle GLTF with the `gltf-model` component, e.g this
`gltf-model` is using an asset with an ID of `horse`:
```
<a-entity gltf-model='#horse'></a-entity>
```
We can of course also dynamically create our entities from JavaScript, for
example:
```
const entity = document.createElement('a-entity');

// Add the obj-model component. This will simply reference the ID of the asset
// as its 'obj' property.
entity.setAttribute('obj-model', {
	obj: '#cow',
	mtl: '#cow-material'
});
```

### Points to consider with models

There are reasons why models might not appear as you expect them to. Note
that models have their own, local coordinate system; the coordinates of
each vertex are relative to the local origin of the model. The local origin
is the point within the model which has coordinates x=0, y=0, z=0 in the 
model file. When the model is placed within the world at a particular world position, the local origin of the model will be placed at that world position.

In many cases this is what we want - the base of the model will have the local
coordinates 0,0,0 - but some models have negative `y` coordinates for some 
vertices. This will result in the model being partially buried underground
if we add it to the world unchanged. So in these cases, if we wish the model
to rest on our world's surface (e.g. a plane), we may need to place
the model at a `y` coordinate above 0 in the world to compensate for the fact
that some of the model's local `y` coordinates are negative. In this way we
will ensure the entire model appears "above ground".

Also some models, by default, have a very large scale, e.g. the local x, y and
z coordinates of the model range from, say, 0 to 100. It may be necessary
to scale then down (by setting the x, y and z `scale` to values below 1) to
get the model to appear a sensible size.

## Text

We can also create text in A-Frame, using 
an `<a-entity>` with a `text` component. The `text` component has various
properties, the most important being the `value` - the actual text. See
[the A-Frame documentation](https://aframe.io/docs/1.0.0/components/text.html)
for details.  By default, text is rather small, so it needs to be scaled to 
make it visible (scaling up by 100 gives a usable size).
```
entity.setAttribute('text', {
	value: 'Some text'
});
entity.setAttribute('scale', {
	x: 100,
	y: 100,
	z: 100
});
```

### Looking at the camera

By default, text will look towards positive z however this isn't necessarily
what we want. We more commonly want the text to *look at the camera* so that
it's always visible. To do this we make use of the third-party `look-at`
component. To use `look-at` you need to include it as a link in your HTML:
```
<script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
```
then you can add it to an entity e.g:
```
<a-entity text='value: Hello World' scale='100 100 100' look-at='[camera]'></a-entity>
```
Note how in this example the text is looking at the camera. We specify the camera with the square brackets syntax `[camera]`. (Remember that square brackets
in CSS select any element with that attribute present. In A-Frame this is equivalent to selecting an entity with the given component present. So here, we are selecting the entity which contains the `camera` component, i.e. our camera entity). We can, as an alternative, look at any other entity in our scene by specifying an appropriate CSS selector.

### Other text properties

See [the A-Frame documentation](https://aframe.io/docs/1.0.0/components/text.html). Other properties you can set on the `text` component include:
- `align`: horizontally justifying the text (left, center or right);
- `baseline`: specifying the baseline of the text (top, center or bottom) - 
i.e. will the top, the centre or the bottom of the text be placed at the
`y` coordinate?

### Positioning text on a plane

A common use-case is to position text on an existing plane, for example to
draw a noticeboard or signpost. What you can do here is to create an 
`<a-plane>` with a `text` component. e.g.
```
<a-plane text='value: Hello' material='color: red' width=4 height=1 look-at='[camera]'></a-plane>
```
Note how the `<a-plane>` has a material, a width and a height - but also has
its own `text` component. This will draw the text directly on the plane.
The text is automatically scaled to fit on the plane, though by default the
text will be very small. You can, however, use the `wrapCount` property of
the `text` component to specify approximately how many characters will fit on 
the plane, for example if you set `wrapCount` to 20, the text will scale to
a size where it would exactly fit on the plane if it contained 20 characters.
Any characters beyond the `wrapCount` will appear on the next line.


### International characters

Note that A-Frame text will *not* by default work with international character sets. Only characters present in a given font will be renderered (drawn) and for the default font used by A-Frame, these are just the standard ASCII characters. The font format used is known as the *MSDF* format. If you wish to render international characters, you need to use an online font-generator such as [Don McCurdy's font generator](https://msdf-bmfont.donmccurdy.com). To use this, you upload a TrueType (`.ttf`) font containing your chosen characters to this site, and it will generate a MSDF font for those characters. This consists of two files: 

- a JSON file defining the font properties,
- and a PNG image containing the actual characters. 

These can then be used to render text by 
setting the `font` and `fontImage` properties of the `text` attribute to the
JSON file and PNG image respectively.

## Using materials to texture objects

One thing we have not covered yet is that we can use images as *textures*
to define the material of an entity. For example:
```
<a-plane material='src: grass.png' width='100' height='100' rotation='-90 0 0'></a-plane>
```
will texture the plane with the image file found in `grass.png`. Note how we set the `src` property of the `material` component.

## Exercise

The exercise for this week is to extend last week's dynamic scene (loaded from
AJAX) to use models and text.

1. Select some appropriate models. A good place to find models is 
[Clara.io](https://clara.io); note that you will need to sign up first.
The data includes bars, restaurants and cafes so select things like coffee
mugs, beer or wine glasses, and food. Make sure you download OBJ format
(GLTF is generally not available).

2. Unzip the models; they typically come as a `zip` file. In the `zip` file you
should find a `.obj` model plus, probably, a `.mtl` material file.

3. Alter your code from last week so that appropriate models are drawn in your
world, rather than spheres, depending on the point of interest type. You may
need to experiment with scaling the model, and changing the `y` coordinate
(see above).

4. Now try adding the name of the point of interest as text, so that it
appears above the model. You will need to centre-justify your text with
the `align` property of the `text` component.
You will need to scale the text for it to appear a sensible size (this is
often a case of experimentation to see what works). However, you need the
text scaling to be *independent* of the model scaling. How would you do this?

5. Alter your answer to question 4 to add the `text` component to an `<a-plane>`. Give the `<a-plane>` a colour and set the `wrapCount` to be an appropriate value. Experiment with different values of `align` and `baseline` on the `text` component.

## More advanced exercise - a simple chase game

Go to Clara.io again and find a model of a person, monster, alien etc. It
should be something that can represent an enemy. Write a simple
game where this model constantly chases the player (the player position will
be the camera position). You should be able to work this out based on what
we've learnt so far. One thing you will need to know is how to access the
camera from a component attached to another entity. You can use the
square-brackets CSS selector once again; the code below finds the entity with the `camera` component attached to it, in other words our camera entity.
```
const camera = document.querySelector('[camera]');
```
The model should always look at the camera; again you should be able to
work out how to do this.

When the enemy is within 0.1 units of the camera, the game should end
(you can use `Math.abs()` to work this out).
