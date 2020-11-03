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
<a-asset-item src='assets/cow.obj' id='cow'></a-model>
<a-asset-item src='assets/pig.obj' id='pig'></a-model>
<img src='assets/cow_texture.png' id='cow-texture' />
<img src='assets/pig_texture.png' id='pig-texture' />
</a-assets>
```

There are four assets here, two OBJ models of a cow and a pig, and two
textures, each of which are PNG images. Note how generic assets, such as 
models, are specified using `<a-asset-item>` while images use the standard
`<img>` tag. Note also how each asset has an ID; this will be used when we
create an entity using that asset later.

#### How we would reference an asset in our code

Here is how we could reference an asset in our code:

```
<a-entity obj-model='obj: #cow'></a-entity>
```
This is creating an entity which will represent an OBJ model, hence the
`obj-model` component. The `obj-model` component contains a property `obj` 
whose value is `#cow`, which references the asset with the ID of `cow`.

We could link in the texture for the model by specifying the `src` properyy
of the`material` component, e.g:
```
<a-entity obj-model='obj: #cow' material='src: #cow-texture'></a-entity>
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
	obj: '#cow'
});

// Add the material component, passing in the ID of the texture asset as its
// 'src' property.
entity.setAttribute('material', {
	src: '#cow-texture'
});
```
