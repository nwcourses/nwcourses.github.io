# Week 4: Further State, Refs, Effects 

Today we will continue to look at more advanced aspects of state by considering the ownership of state by components. Please note that much of this material is based on [this section of the React documentation](https://react.dev/learn/preserving-and-resetting-state). We will also take a look at React *refs* and *effects*.

## Changing State triggers a re-render of the component

One of the most critical aspects of changing state is that it *triggers a re-render of the component*. When we update state, the component is re-rendered in order to display the new values of the state variables. (If a state variable is set to the same value as the existing value, React knows not to re-render). This example can be used to demonstrate this:

```javascript
import React from 'react';

let renderings = 0;

function App3() {

    renderings++;
    const [name, setName] = React.useState("");

    return(
        <div>
        <h1>Hello {name}!</h1>
        <p>Number of renderings: {renderings}</p>
        <p><input id='name' />
        <input type='button' value='Go!' onClick={updateState} />
        </p>
        </div>
    );

    function updateState() {
        setName(document.getElementById('name').value);
    }

}

export default App3;
```
This example is very like the `GreetingComponent` we looked at two weeks ago, but counts the number of renderings, storing it in the variable `renderings` outside of the `App3` component. (Why does it have to be outside?)

By trying this example out, you can see how many times the component re-renders itself.

(In fact it's not a good idea to change global variables from a component: see the [React documentation](URL). I have done it here simply to demonstrate that a component re-renders itself when state changes).


## State belongs to a specific component

In some cases you may wish to have multiple instances of the same child component, e.g. two separate To Do lists (one for work, one for leisure), as you saw last week. In such a case, the state belongs to a *specific component* (e.g. a specific To Do list).

Here is a simple example in which the `App` component contains two `Counter` components. First the `App` component:
~                        `
```javascript
import React from 'react';
import Counter from './Counter';

function App() {


    return (
        <div>
        <h1>Two Counters</h1>
        <Counter />
        <Counter />
        </div>
    );
}

export default App;
```

and the `Counter` component.

```javascript
import React from 'react';

function Counter() {
    const [count,setCount] = React.useState(0);

    function incCount(){
        setCount(count+1);
    }

    return(
        <div>
        Count: {count} <br />
        <input type='button' value='+' onClick={incCount} />
        </div>
    );

}

export default Counter;
```

Note how the Counter component stores a `count` in the state, which increases each time we click the button.

If you try this out (along with an appropriate HTML page and `index.js`) you will see that two counters appear, each of which independently record the number of clicks.

### Hiding a component resets state

This example includes a button on the `App` component which toggles the visibility of the second counter, showing it and hiding it.


```javascript
import React from 'react';
import Counter from './Counter';

function App(props) {

    const [show,setShow] = React.useState(false);


    function handleClick() {
        setShow(!show);
    }

    return (
        <div>
        <Counter />
        { show ? <Counter /> : "" }
        <input type='button' value={show? 'Hide':'Show'} onClick={handleClick} />
        </div>
    );
}

export default App;
```
In this example, `App` stores a variable `show` in state. This is toggled with the button, and if `show` is false, the second counter is hidden.

If you try this, you will find that the counter **resets to 0** if you hide the second counter and then show it again. This is because **state is destroyed** if a component is no longer rendered.

Furthermore state is destroyed if you change the *order* of rendering of a given component. For example:

```javascript
import React from 'react';
import Counter from './Counter';

function App(props) {

    const [swapped,setSwapped] = React.useState(false);


    function handleClick() {
        setSwapped(!swapped);
    }

    return (
        <div>
        { swapped ? <div>A placeholder div</div>: <Counter /> }
        { swapped ? <Counter /> : <div>A placeholder div</div> }
        <input type='button' value='Move Counter' onClick={handleClick} />
        </div>
    );
}

export default App;
```

This time, the `App` component renders a `Counter` along with a placeholder `div`. If you press the button, the counter and the div will be swapped over within the `App` component, as the order of rendering depends on the state variable `swapped`. When this happens, **the Counter is rendered in a different position within the DOM of `App`** (as the second child rather than first) and as a result, the state will be reset.

### Using keys to identify components

We briefly looked at **keys** last week, and saw that you should mark each item in a list with a unique key. We are now going to start looking about *why* this is a good idea. It allows us to identify a specific component, and preserve its state if its rendering position is moved. For example:

```javascript
import React from 'react';
import Counter from './Counter';

function App(props) {

    const [swapped,setSwapped] = React.useState(false);


    function handleClick() {
        setSwapped(!swapped);
    }

    return (
        <div>
        <Counter key={swapped ? 'c2': 'c1'} />
        <Counter key={swapped ? 'c1': 'c2'} />
        <input type='button' value='Swap' onClick={handleClick} />
        </div>
    );
}

export default App;
```

In this example, each counter component has a **key**, `c1` or `c2`. Depending on the value of the state variable `swapped`, the counters are rendered either in order `c1`,`c2`, or order `c2`,`c1`. But because each is identified with a key, the state of each counter will be *preserved* by the swap.

## Refs - preserving data between renderings

*React documentation: [here](https://react.dev/learn/referencing-values-with-refs)*

Sometimes it might be desirable to *preserve data* between renderings, without using state. State is intended for data that will be *rendered* (hence, updating state triggers a re-rendering) but there are some cases where we might wish to preserve data for other reasons. For example, we might want to keep hold of a timer handle used to control a timer function. Or we might want to use objects which are part of other APIs, such as mapping APIs (e.g. Leaflet, which you looked at last year).

We could use global variables, declared outside the component, for this in theory. However this is not considered good design as components are supposed to be  *pure functions* (ref React docs) which perform a task (rendering a component) without changing any exernal variables.

Instead we can use a *ref* (reference). A ref is a variable that can be changed within the component without causing a re-rendering. 

A good example to store in a ref might be a timer variable. Remember that you can use `setInterval()` in JavaScript to run code at a certain interval, e.g.

```javascript

let seconds = 0;

const timerHandle = setInterval( () => {
    document.getElementById('seconds').innerHTML = `${seconds++} seconds have passed.`
}, 1000);
```
In the example above the arrow function which displays the number of seconds that have passed, and increments the seconds, will run every second (1000 milliseconds). Note also how `setInterval()` returns a handle on the timed function (stored in the variable `timer` here) which can be used later to cancel the timer:

```javascript
clearInterval(timerHandle);
```

So how can we do this in React? We can store the timer as a *ref*, because we need to preserve it between renderings. For example:

```javascript
import React from 'react';

function Timer() {

    const timerHandle = React.useRef(null);
    const [startTime, setStartTime] = React.useState(0);
    const [time, setTime] = React.useState(0);


    function startTimer() {
        if(timerHandle.current == null) {
            const t = Date.now() / 1000;
            setStartTime(t);
            setTime(t);
            timerHandle.current = setInterval ( () => {
                setTime(Date.now() / 1000);
            } , 1000 );
        }
    }

    function stopTimer() {
        if(timerHandle.current != null) {
            clearInterval(timerHandle.current);
            timerHandle.current = null;
        }
    }

    return( <div>
        Time: {Math.round(time - startTime)} seconds <br />
        <input type='button' value='start' onClick={startTimer} />
        <input type='button' value='stop' onClick={stopTimer} />
        </div>
    );
}

export default Timer;
```

What's this doing?
- It's a component simulating a timer, which starts from 0 and increments every second when 'start' is clicked, and stops when 'stop' is clicked.
- It uses an interval function to do this. The interval function resets the `time` state variable to the current time (in seconds since January 1st 1970) every second. The timer handle (`timerHandle`) is cleared when the user clicks 'stop'.- In the rendering, the time in seconds is calculated by subtracting the initial time (`startTime`, another state variable) from the current time (the `time` state variable).
- The handle is stored in a **ref** as we need to preserve it between renderings, but isn't being rendered itself and we do not want any changes to it to trigger a re-rendering. Note that to access the actual data in the ref, we need to use its `current` property, e.g. `timerHandle.current` in this example.
    
    
Here is another example of using a ref, to hold a Leaflet map.

```javascript
import React from 'react';

function LeafletMap({lat1, lon1}) {
    const map = React.useRef(null);
    const [lat, setLat] = React.useState(lat1 || 51.05);
    const [lon, setLon] = React.useState(lon1 || -0.72);

    React.useEffect( ()=> {
        // Initialise the map ref if it hasn't been initialised already
        if(map.current === null) { 
            map.current = L.map("div1");
        }

        // Set the map up in the normal way
        L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);
        const pos = [lat, lon];    
        map.current.setView(pos, 14);

        // Handle the map moveend event by updating the state appropriately
        map.current.on("moveend", e=> {
            const centre = map.current.getCenter();
            setLat(centre.lat);
            setLon(centre.lng);
        });
    });


    // You'll need to set the dimensions of 'div1' in your CSS
    return(
        <div>
        Lat: <input id='lat' />
        Lon: <input id='lon' />
        <input type='button' value='go' onClick={setPos} />
        <p>Map centred at: {lat} {lon}</p>
        <div id="div1"></div>
        </div>
    );
    
    function setPos() {
        const lt = document.getElementById('lat').value;
        const lng = document.getElementById('lon').value;
        setLat(lt);
        setLon(lng);
        map.current.setView([lt, lng], 14);
    }
}

export default LeafletMap;
```
In this example, the current map latitude and longitude are stored in state and displayed. Also, when the user clicks the button to change the location, the map moves to that location.

The interesting thing, though, is that the map is stored as a `ref`. It's not a state variable to be rendered, it's an external entity to React which needs to be kept around between renders. Refs are a good way of handling such external objects. So we initialise it as a ref, and then update the position of the map using that ref in `setPos()`.

We also handle map `moveend` events (when the user stops dragging the map) so that the `lat` and `lon` state variables are updated to hold the new centre position of the map.

Finally you will note that the map initialisation code is written inside an arrow function passed to something we have not discussed yet: `React.useEffect()`. What is this? The next section will explain!

## Effects

*React documentation: [here](https://react.dev/learn/synchronizing-with-effects)*

Commonly we might want some non-React code to run each time we render. For example, we might wish to fetch data from an external web API. We cannot do this directly inside the component function, as the component function is intended for rendering only; it should execute quickly and not contain time-consuming code. We could use an event handler (e.g. a button click handler), to perform these kinds of operations, but in some cases we might want the action to occur without such an event, e.g. when the component first loads or each time we render.

Instead, we can create an `effect`. An effect is a function which we might want to run each time the component renders, which performs some kind of external operation. We specify effects with `React.useEffect()`, passing in a function as a parameter. An example is given above in the mapping component. Note that the code to initialise the map is placed within an arrow function passed as a parameter to `React.useEffect()`.

Note how in our effect, we check that the map (a ref) is `null`. If it's `null`, it means we haven't initialised it yet so we initialise it. If not, we do nothing. Effects run **each time the component is rendered**, so we have to ensure that we do not re-initialise the map each time the component is rendered, which would be very wasteful and would also constantly reset the map to its default location.

### Running effects just once - on initialisation

The example above showed one way to prevent effects running on each render, by setting up a ref and checking whether it's `null`. However, there is a second, automatic, way of doing this. We can pass an empty array as the second parameter to `React.useEffect()`. This will cause the effect to run just once, on startup. The example below is the Leaflet map example re-written to do this:
```javascript
import React from 'react';

function LeafletMap2({lat1, lon1}) {
    const map = React.useRef(null);
    const [lat, setLat] = React.useState(lat1 || 51.05);
    const [lon, setLon] = React.useState(lon1 || -0.72);

    React.useEffect( ()=> {
        // As effect will run only once, there is no need to check if map.current is null
        map.current = L.map("div1");

        // Set the map up in the normal way
        L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);
        const pos = [lat, lon];    
        map.current.setView(pos, 14);

        // Handle the map moveend event by updating the state appropriately
        map.current.on("moveend", e=> {
            const centre = map.current.getCenter();
            setLat(centre.lat);
            setLon(centre.lng);
        });
    },[]);


    // You'll need to set the dimensions of 'div1' in your CSS
    return(
        <div>
        Lat: <input id='lat' />
        Lon: <input id='lon' />
        <input type='button' value='go' onClick={setPos} />
        <p>Map centred at: {lat} {lon}</p>
        <div id="div1"></div>
        </div>
    );
    
    function setPos() {
        const lt = document.getElementById('lat').value;
        const lng = document.getElementById('lon').value;
        setLat(lt);
        setLon(lng);
        map.current.setView([lt, lng], 14);
    }
}

export default LeafletMap2;
``` 
What is this empty array? It's an array of dependencies: a series of props which will trigger a re-run of the effect if they change. You can fill this array with such props if you want re-running the effect to be triggered if any props change. If the array is empty, however, you are specifying that the effect should *never* be re-run: only run once when the component first loads.

## Exercise

- Re-write the first example, which counts the number of renderings, so that the number of renderings is stored in a ref rather than a global variable.
- **UPDATED for clarity** : Create a new version of your exercise from last week in which you created two separate "work" and "leisure" todo lists. This new version should have a slightly simpler structure:

	- A parent component, containing two Todo List components as described below;
	- Two Todo List components, one for work and one for leisure. These should be simpler than in the exercise last week: they should include the input form and the todo list in *one* component rather than separating the input and display functionality into separate components.

	- Add functionality to the parent component (e.g. a button) to swap the order in which the two Todo lists are rendered, using keys.

- Complete Question 4 from last week (AJAX music search), ensuring that you use an effect to connect to the server from the parent component. The effect should re-run each time the parentcomponent updates.
- Try out the Leaflet map example above. You'll need to link Leaflet to your HTML `head` section:

```html
<link rel='stylesheet' href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'/>
<script type='text/javascript' src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'></script>
```

- Enhance your Leaflet map so that the user can search for a place over AJAX by connecting to this web API: 

```
https://opentrailview.org/nomproxy.php?q=place_name
``` 

where `place_name` is the place to search for. When the AJAX search has completed, set the `lat` and `lon` inside the state to be the latitude and longitude of the first result within the JSON returned by the API.

- If you get that done, develop the map application so you have a parent component, a map component, a component to input a place to search for, and a `SearchResults` component which should list all results (not just the first). Each result should have a button labelled "Go to this location" which, when clicked, should set the latitude and longitude of the map to that location.
