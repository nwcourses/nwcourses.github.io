# Week 11 - Future Developments - WebXR

## Introduction

For this final session I will introduce some new developments in the field
of web AR, in particular the emerging [WebXR](https://immersiveweb.dev) standard. XR stands for Extended Reality and is a general term for both VR and AR. WebXR has succeeded an earlier standard, WebVR, which was purely aimed at VR environments such as headsets.

## The state of WebXR

WebXR is a very new API which is still very much in development, and consequently, it is rather difficult to find well-documented examples. Nonetheless there is API documentation available at the [W3C](https://www.w3.org/TR/webxr/) which describes the various objects needed to work with WebXR. It is of note that some of the tutorials, such as [this one at Google](https://codelabs.developers.google.com/codelabs/ar-with-webxr), are using an older version of the WebXR specification and no longer work in current browsers.

### What cam be done with WebXR?

WebXR will allow several advanced markerless AR features, such as:

- Ground plane and surface detection. Computer vision is used to detect ground planes - flat surfaces in the world - which objects can be placed on to give a realistic AR effect.
- Hit testing. A user can tap on a real-world position, as viewed through the camera, in order to add an AR image. A ray (vector line) will be cast from the screen to the real world, and the point of intersection with a real-world surface will be detected. At this point of intersection, you can then add a model.

### How is this done?

WebXR is designed to be a generic specification, which can potentially use any underlying AR library. At the moment, only limited devices actually have working, functional, WebXR-based AR - but [certain Android devices](https://developers.google.com/ar/discover/supported-devices) running Chrome will work. Any Android device which supports [ARCore](https://developers.google.com/ar) will work. ARCore is the official Google library for Android markerless augmented reality; as well as having a client-side, on-phone component, it uses Google servers to do part of the surface detection. On these devices, WebXR is wrapping ARCore, so if you write a WebXR application, you are using ARCore under the hood. 

On the other hand, there is nothing in the WebXR specification that says that oyu must use ARCore. It would be possible for developers of web browsers (Chrome, Firefox etc) to implement WebXR so that another underlying, lower-level API entirely is used if ARCore is not available, or even if it is (One issue with ARCore is that it partly uses Google services - server-side code - to implement the AR, and this code is closed-source; so a complete open-source implementation might be preferred).

## Developing WebXR applications

As explained earlier, the WebXR specification has gone rapid changes recently so finding up-to-date resources can be difficult and the only sure way to develop a working application is to look at the W3C specification documents themselves, which are quite low-level; there are few tutorials which use the most up-to-date spec.

For that reason, it might be preferred to use a library which already provides WebXR support and luckily, recent versions of A-Frame do (at least on devices which support WebXR, namely Android devices running Chrome as stated above).

### Adding AR to an A-Frame application

Adding basic ground plane detection to an A-Frame application is surprisingly easy. On an AR-compatible device (i.e. specific Android devices running Chrome as explained above) an 'AR' button will appear on the A-Frame scene, and when this button is pressed, the device will enter AR mode.

In AR mode, added models will automatically be placed on any detected flat
surfaces, without any additional code being needed. 

The simplest readily-available example appears to be the [Spinosaurus](https://xr-spinosaurus.glitch.me/) example developed by Klaus Weidner. I have modified this example to remove code unrelated to the AR, and so produce an absolute minimal example. The code for this is below. Most comments provided by the original author, Klaus Weidner. I have a demo available [on the Hikar server](https://hikar.org/ax).
```
<!-- Code by Klaus Weidner, modified by myself to remove non-AR aspects -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>XR Spinosaurus</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- import the webpage's stylesheet -->
    <link rel="stylesheet" href="style.css">
    
    <!-- import the webpage's javascript files -->
    <script src="https://aframe.io/releases/1.1.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-extras@3.3.0/dist/aframe-extras.min.js"></script>
    <script src="https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js"></script>

    <script>
      // Define a few custom components useful for AR mode. While these are somewhat reusable,
      // I recommend checking if there are officially supported alternatives before copying
      // these into new projects.
    
      
      AFRAME.registerComponent('ar-shadows', {
        // Swap an object's material to a transparent shadows-only material while
        // in AR mode. Intended for use with a ground plane. The object is also
        // set visible while in AR mode, this is useful if it's hidden in other
        // modes due to them using a 3D environment.
        schema: {
          opacity: {default: 0.3}
        },
        init: function () {
          this.el.sceneEl.addEventListener('enter-vr', (ev) => {
            this.wasVisible = this.el.getAttribute('visible');
            if (this.el.sceneEl.is('ar-mode')) {
              this.savedMaterial = this.el.object3D.children[0].material;
              this.el.object3D.children[0].material = new THREE.ShadowMaterial();
              this.el.object3D.children[0].material.opacity = this.data.opacity;
              this.el.setAttribute('visible', true);
            }
          });
          this.el.sceneEl.addEventListener('exit-vr', (ev) => {
            if (this.savedMaterial) {
              this.el.object3D.children[0].material = this.savedMaterial;
              this.savedMaterial = null;
            }
            if (!this.wasVisible) this.el.setAttribute('visible', false);
          });
        }
      });    
  </script>
  </head>  
  <body>

    <a-scene>
      <a-assets timeout="30000">
        <!-- Model source: https://sketchfab.com/3d-models/spinosaurus-2135501583704537907645bf723685e7
             Model author: https://sketchfab.com/VapTor
             Model license: CC Attribution -->
        <a-asset-item id="spinosaurus" src="https://cdn.glitch.com/324a5290-5aa7-4efc-92d6-ae0736433b12%2Fspinosaurus.glb" response-type="arraybuffer"></a-asset-item>
      </a-assets>
      
      <a-camera position="0 1.2 0"></a-camera>
      
      <a-entity id="dino" position="-1 0 -3" scale="0.25 0.25 0.25">
        <a-entity position="0 2.15 0" rotation="0 55 0"
                  gltf-model="#spinosaurus"
                  animation-mixer
                  shadow="cast: true; receive: false"></a-entity>
      </a-entity>  
      
      <a-entity light="type: ambient; intensity: 0.5;"></a-entity>
      <a-light type="directional"
               light="castShadow: true;
                      shadowMapHeight: 1024;
                      shadowMapWidth: 1024;
                      shadowCameraLeft: -7;
                      shadowCameraRight: 5;
                      shadowCameraBottom: -5;
                      shadowCameraTop: 5;"
               id="light"
               target="dino"
               position="-5 3 1.5"></a-light>

      <!-- This shadow-receiving plane is only visible in AR mode. -->
      <a-plane height="15" width="15" position="0 0 -3" rotation="-90 0 0"
               shadow="receive: true"
               ar-shadows="opacity: 0.3"
               visible="false"></a-plane>
    </a-scene>

  </body>
</html>

```
You'll note the model is the `<a-entity>` with an id of `dino` (a 
Spinosaurus dinosaur model). Note how this is scaled to a quarter of the
normal size (to avoid the dinosaur being too big) and placed at a certain
initial position in the world. You'll note that the model does not have
any special AR components attached to it; it's just specified as a model
entity as we normally would in an A-Frame application.

The only JavaScript code needed handles shadows. You'll notice that
an `<a-plane>` is added to the scene with a `shadow` component which is
set to receive shadows (while the model is similarly set to cast shadows).
This will allow the dinosaur model to cast shadows on the specified
plane. Note also how a light source is added which is shining on the 
dinosaur (`target="dino"`) and it is this light source which is casting
the shadows.

Note also how this plane has a custom `ar-shadows` component (which is the
JavaScript in the example). Looking at the JavaScript, you'll notice that
one key thing that's present is code to handle the `enter-vr` and `exit-vr` events. These are key when developing a WebXR-based AR application using A-Frame as they allow you to execute specific code when you enter AR mode (click the 'AR' button) or leave it (press the 'back' button when in AR mode). In this example, the code is adding an appropriate material (a `THREE.ShadowMaterial`) to the plane when we enter AR mode (to allow it to cast shadows); before it does so, it saves the existing plane material, so that when we leave AR mode again, the plane can have its original material applied to it.

## Hit testing

The other thing we can do wth WebXR in A-Frame is *hit testing*. As 
described above, this involves casting a ray from the point touched on the
screen to a surface detected (via ARCore) by WebXR in A-Frame. An
example is available on GitHub by [user stsphanho](https://github.com/stspanho/aframe-hit-test/); this example is based on Klaus Weidner's original Spinosaurus example above. A cut-down version of this code is available 
[on the Hikar server](https://hikar.org/ht), again with non-AR code removed.

To perform hit testing, various objects of the [WebXR Device API](https://immersive-web.github.io) are used. These objects and their roles are
described below:

- [XRSession](https://developer.mozilla.org/en-US/docs/Web/API/XRSession), represents the XR session as a whole
- [XRFrame](https://developer.mozilla.org/en-US/docs/Web/API/XRFrame) - represents the state of the XR application in a specific animation frame.
- [XRReferenceSpace](https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace), a coordinate system used for tracking relative to a given viewpoint.
These viewpoints can include:
    - 'viewer' - viewer position
    - 'local-floor' - relative to where a floor has been detected
- [XRPose](https://developer.mozilla.org/en-US/docs/Web/API/XRPose)
a *pose*, i.e. a position and orientation relative to a given XRReferenceSpace.
- [XRHitTestSource](https://immersive-web.github.io/hit-test/#hit-test-source-interface) , the source of a hit test e.g. a ray from the screen to a plane
within te world
- [XRHitTestResult](https://immersive-web.github.io/hit-test/#xrhittestresult), a result of a hit test, representing a relative orientation to place an indicator (reticle) at the hit point.

The modified Spinosaurus code of `stsphanho` is here, with comments (added by myself) indicating what is going on.
```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>XR Spinosaurus</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- import the webpage's stylesheet -->
    <link rel="stylesheet" href="./style.css">

    <!-- import the webpage's javascript files -->
    <script src="https://rawgit.com/aframevr/aframe/master/dist/aframe-master.min.js"></script>
    <script src="https://unpkg.com/aframe-extras@3.3.0/dist/aframe-extras.min.js"></script>
    <script
            src="https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js"></script>

    <script>

        // Shadows component, same as previous example
        AFRAME.registerComponent('ar-shadows', {
            // Swap an object's material to a transparent shadows-only material while
            // in AR mode. Intended for use with a ground plane. The object is also
            // set visible while in AR mode, this is useful if it's hidden in other
            // modes due to them using a 3D environment.
            schema: {
                opacity: {default: 0.3}
            },
            init: function () {
                this.el.sceneEl.addEventListener('enter-vr', (ev) => {
                    this.wasVisible = this.el.getAttribute('visible');
                    if (this.el.sceneEl.is('ar-mode')) {
                        this.savedMaterial = this.el.object3D.children[0].material;
                        this.el.object3D.children[0].material = new THREE.ShadowMaterial();
                        this.el.object3D.children[0].material.opacity = this.data.opacity;
                        this.el.setAttribute('visible', true);
                    }
                });
                this.el.sceneEl.addEventListener('exit-vr', (ev) => {
                    if (this.savedMaterial) {
                        this.el.object3D.children[0].material = this.savedMaterial;
                        this.savedMaterial = null;
                    }
                    if (!this.wasVisible) this.el.setAttribute('visible', false);
                });
            }
        });

        // This component is placed on the reticle.
        AFRAME.registerComponent('ar-hit-test', {
            init: function () {
                this.xrHitTestSource = null;
                this.viewerSpace = null;
                this.floorSpace = null;

                // when the session ends, set everything to null
                this.el.sceneEl.renderer.xr.addEventListener('sessionend', (ev) => {
                    this.viewerSpace = null;
                    this.floorSpace = null;
                    this.xrHitTestSource = null;
                });

                // triggered when the AR session starts..
                this.el.sceneEl.renderer.xr.addEventListener('sessionstart', (ev) => {
                    // Get the XRSession object 
                    let session = this.el.sceneEl.renderer.xr.getSession();

                    let element = this.el;

                    // The select event is triggered when the user interacts
                    // with the scene e.g. touches the screen where there is
                    // a plane
                    session.addEventListener('select', function () {
                        // The current reticle position, set in tick() below
                        let position = element.getAttribute('position');

                        // Place the dinosaur at that position
                        document.getElementById('dino').setAttribute('position', position);

                        // Place the light relative to the dinosaur so it's still shining down on it
                        document.getElementById('light').setAttribute('position', {
                            x: (position.x - 2),
                            y: (position.y + 4),
                            z: (position.z + 2)
                        });
                    });

                    // Get the 'viewer' XRReferenceSpace 
                    session.requestReferenceSpace('viewer').then((space) => {
                        this.viewerSpace = space;
                        session.requestHitTestSource({space: this.viewerSpace})
                                .then((hitTestSource) => {
                                    this.xrHitTestSource = hitTestSource;
                                });
                    });

                    // Get the floor reference space, this is needed to 
                    // place the reticle on the floor
                    session.requestReferenceSpace('local-floor').then((space) => {
                        this.floorSpace = space;
                    });
                });
            },
            // Run tick() every time the screen refreshes
            tick: function () {
                // Test that we are in AR mode (A-Frame API)...
                if (this.el.sceneEl.is('ar-mode')) {
                    if (!this.viewerSpace) return;

                    let frame = this.el.sceneEl.frame;

                    // Get the default viewer pose 
                    let xrViewerPose = frame.getViewerPose(this.floorSpace);

                    // If we have a hit test source setup and a viewer pose (i.e. the WebXR is setup correctly)
                    if (this.xrHitTestSource && xrViewerPose) {
                        // get the hit test results from the given source,
                        // i.e. the intersection points of the ray with
                        // surfaces in the world
                        let hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
                        if (hitTestResults.length > 0) {
                            // Get the pose of this hit relative to the 
                            // floor space. This is needed so we can show the
                            // reticle on the floor so it's superimposed
                            // correctly.
                            let pose = hitTestResults[0].getPose(this.floorSpace);

                            
                            // use the matrix from the pose to display the
                            // reticle correctly.
                            let inputMat = new THREE.Matrix4();
                            inputMat.fromArray(pose.transform.matrix);
                            let position = new THREE.Vector3();
                            position.setFromMatrixPosition(inputMat);
                            this.el.setAttribute('position', position);
                        }
                    }
                }
            }
        });

    </script>
</head>
<body>

<!-- Note how we have to specify the WebXR features we want when setting up 
     our a-scene. -->
<a-scene webxr="requiredFeatures: hit-test,local-floor;">
    <a-assets>
        <!-- Model source: https://sketchfab.com/3d-models/spinosaurus-2135501583704537907645bf723685e7
             Model author: https://sketchfab.com/VapTor
             Model license: CC Attribution -->
        <a-asset-item id="spinosaurus"
                      src="https://cdn.glitch.com/324a5290-5aa7-4efc-92d6-ae0736433b12%2Fspinosaurus.glb"
                      response-type="arraybuffer"></a-asset-item>

        <a-asset-item id="reticle"
                      src="reticle.gltf"
                      response-type="arraybuffer"></a-asset-item>
    </a-assets>

    <a-camera position="0 1.2 0"></a-camera>

    <a-entity id="dino" position="-1 0 -3" scale="0.25 0.25 0.25">
        <a-entity position="0 2.15 0" rotation="0 55 0"
                  gltf-model="#spinosaurus"
                  animation-mixer
                  shadow="cast: true; receive: false"></a-entity>

        <!-- This shadow-receiving plane is only visible in AR mode.-->
        <a-plane height="30" width="30" rotation="-90 0 0"
                 shadow="receive: true"
                 ar-shadows="opacity: 0.2"
                 visible="false"></a-plane>

    </a-entity>

    <a-entity light="type: hemisphere; intensity: 1"></a-entity>
    <a-light type="directional"
             light="castShadow: true;
                      shadowMapHeight: 1024;
                      shadowMapWidth: 1024;
                      shadowCameraLeft: -7;
                      shadowCameraRight: 5;
                      shadowCameraBottom: -5;
                      shadowCameraTop: 5;"
             id="light"
             target="dino"
             position="-2 4 2">
    </a-light>

    <a-entity gltf-model="#reticle" scale="0.8 0.8 0.8" ar-hit-test></a-entity>
</a-scene>
</body>
</html>
```
