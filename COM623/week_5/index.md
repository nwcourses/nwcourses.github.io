# Week 5: React Hooks 

## What is a hook?

*See [React documentation](https://react.dev/reference/react)*

A Hook in React is a function which allows us to use ("hook into") React functionality from a component rendering function. Hooks perform various functions, such as setting up state (`useState`), refs (`useRef`) or effects (`useEffect`). The key thing about Hooks is that they are designed to be called from the rendering function, and are designed to complete quickly so should not contain any time consuming code. Hooks (particularly custom Hooks) frequently call other Hooks.

So far we have seen these Hooks:

- `useState()`;
- `useEffect()`;
- `useRef()`.

All of these are Hooks because they allow components to use these features of React (state, effects, refs) but none of these functions are actually responsible for rendering.

Functions acting as Hooks always begin with `use`.

Today we will look at some further Hooks (memos, context) and see how we can develop our own.

## The Memo Hook: Preventing unnecessary computations when the state does not change

*See [React documentation](https://react.dev/reference/react/useMemo)*

The performance of our application can go down if we needlessly re-render certain data each time the component re-renders. For example, we might have a component which performs an AJAX request and stores the results in state, but also has other data which is stored in state. The component might convert the JSON returned by the AJAX into JSX, which could be time-consuming if there is a lot of data in the JSON. This is fine if the JSON changes, but what if one of the other state variables change? Here is an example:

```javascript
import React from 'react';

function InefficientComponent() {

    const [name,setName] = React.useState("");
    const [results,setResults] = React.useState([]);


    const songsList = results.map ( song => <p>Song: {song.title} Artist: {song.artist} Year: {song.year} </p>);

    return (
        <div>
        <p>
        Name: <input id='name' onChange={updateName} /><br />
        Name {name}
        </p>
        <p>
        Artist: <br />
        <input id='artist' onChange={doAjax} /> <br />
        <br />
        Results {songsList}
        </p>
        </div>
    );

    function updateName() {
        setName(document.getElementById('name').value);
    }

    async function doAjax() {
        const resp = await fetch(`https://hikar.org/webapp/temp/artist/${document.getElementById('artist').value}`);
        const json = await resp.json();
        setResults(json);
    }
}

export default InefficientComponent;
```
This is inefficient as the component will be re-rendered not only if a new AJAX request is made, but *also* if the name state variable is updated. Thus the relatively slow conversion from JSON to JSX will occur even if the JSON data has not changed. This is clearly inefficient. What we can do instead is to set up a `useMemo` hook. A `useMemo` hook allows us to only do a transformation if certain data has changed, e.g.:

```javascript
import React from 'react';

function MemoComponent() {

    const [name,setName] = React.useState("");
    const [results,setResults] = React.useState([]);


    const songsList = React.useMemo ( () => {
        console.log("running map");
        return results.map ( song => <p>Song: {song.title} Artist: {song.artist} Year: {song.year} </p>);
    }, [results] );

    return (
        <div>
        <p>
        Name: <input id='name' onChange={updateName} /><br />
        Name {name}
        </p>
        <p>
        Artist: <br />
        <input id='artist' onChange={doAjax} /> <br />
        <br />
        Results {songsList}
        </p>
        </div>
    );

    function updateName() {
        setName(document.getElementById('name').value);
    }

    async function doAjax() {
        const resp = await fetch(`https://hikar.org/webapp/temp/artist/${document.getElementById('artist').value}`);
        const json = await resp.json();
        setResults(json);
    }
}

export default MemoComponent;
``` 
Note that the code to transform the JSON to JSX is now wrapped in a function supplied as an argument to `React.useMemo()`. `React.useMemo()` takes two arguments:
- a function which only runs if certain state data has updated;
- an array containing the state variables which trigger the function to run if they change.

So here, the function supplied to `React.useMemo()` transforms the JSON to JSX, but it *only* runs if `results` - the state variable containing the JSON from the server - changes. If any other state variable changes, the transformation will not occur.


## Context with the `useContext()` Hook 

*See [React documentation](https://react.dev/reference/react/useContext)*

Imagine you have a highly nested sequence of components. For example, one component which has child components, and the child components have child components of its own. Imagine you want to share data between all these components, from the parent (first level), through its children (second level) and then down to *their* children (third level).

We could pass state down through props, as we have seen already in Week 3, and in some cases this is the best way, but it can become cumbersome if we have to pass *many* items of data down through the tree to the lowest level components.

### Example

This is an example of sharing state through props with three levels of component, `Nested1`, `Nested2` and `Nested3`.

#### Nested1

```javascript
import React from 'react';
import Nested2 from './Nested2';

function Nested1() {

    const [name, setName] = React.useState("");

    return (
        <div>
        <input id='name' />
        <input type='button' onClick={updateState} value='Go!' />
        <Nested2 name={name} />
        </div>
    );

    function updateState() {
        setName(document.getElementById('name').value);
    }
}

export default Nested1;
```
#### Nested2 

```javascript
import React from 'react';
import Nested3 from './Nested3';

function Nested2({name}) {
    return(
        <>
        <h1>Hello {name}!</h1>
        <Nested3 name={name} />
        </>
    );
}
export default Nested2;
```
#### Nested3

```javascript

import React from 'react';

function Nested3({name}) {
    return(
        <p>Welcome {name} to the site!</p>
    );
}       
export default Nested3;
```

You should be able to see how the `name` is passed down from `Nested1` to `Nested3` via props. It works, and in this case its acceptable, but could become cumbersome if there were many props to pass through from the top component to the lower components.


### Using Context

What we can do instead is to store information that needs to be shared in this way in *context*. How do we create a context? First you have to create a context in a separate file:

```javascript
// NameContext.js

import React from 'react';

const NameContext = React.createContext("No name");
export default NameContext;
```
This creates a context called `NameContext` and exports it: if there is no value yet, it will take the value "No name".

We can then use it in our top-level, parent component (`Context1`):
```javascript
// Context1.js

import React from 'react';
import Context2 from './Context2';
import NameContext from './NameContext';

function Context1() {

    const [name, setName] = React.useState("No name");

    return (
        <div>
        <input id='name' />
        <input type='button' onClick={updateState} value='Go!' />
        <NameContext.Provider value={name}>
        <Context2 />
        </NameContext.Provider>
        </div>
    );

    function updateState() {
        setName(document.getElementById('name').value);
    }
}

```
Note how we:
- import the context from the `NameContext` module;
- when rendering `Context1`, we then set up a `NameContext.Provider` surrounding any child elements. This provides the given context to the child elements, note it has a value of `name`, which is the name from the state.

Moving onto the next component down in the hierarchy, `Context2`:

```javascript
import React from 'react';
import NameContext  from './NameContext';
import Context3 from './Context3';

function Context2() {
    const name = React.useContext(NameContext);
    return(
        <>
        <h1>Hello {name}!</h1>
        <Context3  />
        </>
    );
}
export default Context2;
```
Note how we reference the context we need using `React.useContext` with the desired context (the context exported from `NameContext.js`) to access the name. The name used will be that provided by the provider in the parent context, which in this example is the name from the state.

We do exactly the same in `Context3`:

```javascript
import React from 'react';
import NameContext from './NameContext';

function Context3() {
    const name = React.useContext(NameContext);
    
    return(
        <p>Welcome {name} to the site!</p>
    );
}
export default Context3;
```

### Passing multiple contexts

We can pass multiple contexts by nesting providers, e.g.

```javascript
import React from 'react';
import Context2 from './Context2';
import NameContext from './NameContext';
import CourseContext from './CourseContext';

function Context1() {

    const [name, setName] = React.useState("No Name");
    const [course, setCourse] = React.useState("No Course");

    return (
        <div>
        Name:<br />
        <input id='name' /><br />
        Course: <br />
        <input id='course' /><br />
        <input type='button' onClick={updateState} value='Go!' />
        <NameContext.Provider value={name}>
        <CourseContext.Provider value={course}>
        <Context2 />
        </CourseContext.Provider>
        </NameContext.Provider>
        </div>
    );

    function updateState() {
        setName(document.getElementById('name').value);
        setCourse(document.getElementById('course').value);
    }
}

export default Context1;
```

and we can then use them in child components separately, e.g:

```javascript
import React from 'react';
import NameContext from './NameContext';
import CourseContext from './CourseContext';

function Context3() {
    const name = React.useContext(NameContext);
    const course = React.useContext(CourseContext);
    
    return(
        <p>Welcome {name}, studying {course}, to the site!</p>
    );
}
export default Context3;
```

We would of course need a separate `CourseContext`:

```javascript
import React from 'react';

const CourseContext =  React.createContext("No Course");
export default CourseContext;
```

## Custom Hooks

*See [React documentation](https://react.dev/learn/reusing-logic-with-custom-hooks)*

You can also write your own custom Hooks to perform operations that you might need to do several times on your UI. Typically, a custom Hook uses one or more built-in Hooks. For example, you might want to allow multiple fields to update state. If we did it without custom Hooks, we'd have to do something like this:

```javascript
import React from 'react';

function RepeatComponent() {

    const [name, setName] = React.useState("");
    const [course, setCourse] = React.useState("");

    return (
        <div>
        Name:<br />
        <input id='name' onChange={updateName} /><br />
        Course: <br />
        <input id='course' onChange={updateCourse} /><br />
        Name {name} course {course} />
        </div>
    );

    function updateName() {
        setName(document.getElementById('name').value);
    }

    function updateCourse() {
        setCourse(document.getElementById('course').value);
    }
}

export default RepeatComponent;
```

This works, but hopefully you can see that `updateName()` and `updateCourse()` are both doing very similar things (updating a state variable with the value in a form field), so there is unnecessary repetition.

What we can do instead is to create a *custom Hook* to update *any* state variable with the value in *any form field*. Here is an example of doing this (modified from the example in the [React documentation](https://react.dev/reference/react) ).

```javascript
import React from 'react';

function useFormInput(defaultValue) {
    const [value,setValue] = React.useState(defaultValue);

    function handleChange(ev) {
        setValue(ev.target.value);
    }

    return {
        value, handleChange
    }
}

export default useFormInput;
```

- We are creating a custom Hook `useFormInput()`, which sets up a state variable inside it, which will contain the value the user entered in the form field. 
- We also create a `handleChange()` function which will run in response to an `onChange` event in a given form field, i.e. when the user types new text. It updates the state by calling `setValue()` with the text the user entered in that form field.
- How do we know which text field to look at?atote the parameter `ev` to this function. Event handler functions, such as this, always receive at least one parameter, an object representing the **event that triggered the event handler**. We can obtain the specific page element (e.g form field, button) that triggered the event using `ev.target` (this is actually standard JavaScript, not just React). Thus, if it's a form field, we can get the text within the field with `ev.target.value`.
- So, in summary, the `handleChange` event handler is an event handler which will work with any form field, respond to the `onChange` event on that form field, and update the state to the contents of the text field.
- Note how we *return* an object containing the `value` and `handleChange` properties, i.e the state and the `onChange` event handler. We will use these from our component: see below.
- Note the short-hand way of returning an object where the property names of the object are the same as the variable names containing their values. We could, if we wanted to, write it this way:

```javascript
return {
    value: value,
    handleChange: handleChange
}
```
but, because the property names and variable names are the same, we can make this concise with:
```javascript
return {
    value, handleChange
}
```

We then use our custom Hook inside a component with multiple form fields. Here is an example:

```javascript
import React from 'react';
import useFormInput from './UseFormInput';
    
function CustomHookComponent() {
    
    const ufiName = useFormInput("No name");
    const ufiCourse = useFormInput("No course");

    return (
        <div>
        Name:<br />
        <input id='name' onChange={ufiName.handleChange} /><br />
        Course: <br />
        <input id='course' onChange={ufiCourse.handleChange} /><br />
        Name {ufiName.value} course {ufiCourse.value} <br />
        </div>
    );
}

export default CustomHookComponent; 
```
- Remember how the custom Hook returned an object with two fields, `handleChange` (the `onChange` event handler) and `value` (the state variable associated with the custom Hook).

- We create two separate copies of this object, one for the name field and one for the course field. By doing that, we ensure that we create two separate state variables. 

- We then set the `onChange` event handler of each form field to the `handleChange` property of the appropriate object, and, in the JSX, include the `value` (i.e. the state) from each object returned from the Hook.


## Exercises

1. Rewrite your Lifting Up State exercise from week 3 so that it uses context instead to share the To Do list between components.

2. Try writing a custom Hook to perform an AJAX search. It would be called as follows:
```
const ajaxHook = useAjax("URL");
```
The custom Hook should store the AJAX results in state, and should be triggered by an `onChange` event on any form field. Test it out from a component which connects to the music search API (see exercises from week 3) when a user types an artist into a search form. The component should display the AJAX results stored in state within the Hook.

3. Try enhancing the mapping example to show all the results on the map as markers (this will be in your Effect, not the Memo). To be able to clear all markers (which you will do if you do a new search) you need to create a Leaflet *layer group*. Example of creating a layer group and adding it to a map:
```javascript
const layerGroup = L.layerGroup().addTo(map);
```
Adding a marker to a layer group:
```javascript
L.marker([lat, lon]).addTo(layerGroup);
```
Clearing all markers on a layer group:
```javascript
layerGroup.clearLayers();
```
