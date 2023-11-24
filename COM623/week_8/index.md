# Week 8 - Further Next.js

This week we will look at some further features of Next.js.

## Further organising your project

As your project grows, it makes sense to start separating out content into its own folders, so that it's better organised.

There is no single way of doing this but according to the Next.js documentation there are some commonly recommended standards. These folders should be placed inside your `app` folder:

`actions` - server actions;

`api` - API endpoints;

`ui` - UI components which can be included in other components which handle routes.

### The jsconfig.json config file

You can import these with paths relative to the top-level folder of your app, e.g.

```javascript
import 'app/ui/addsong.js';
```

**but only if you create, or edit, the configuration file `jsconfig.json`** (in the top-level folder of your app) to specify the `baseUrl` option,

So you should create a `jsconfig.json` in your root folder which looks like this:

```json
{
    "compilerOptions": {
        "baseUrl": "."
    }
}
```

This means that paths in `import` statements will be relative to the current folder (`.`), i.e. the root folder of your project.

## A more complex version of the server actions app 

We will now return to the server actions app (to add a new item to the database) from last week, but increase its complexity by *including a component from another component*.


If we revisit our front-end to the server action from last week:

```jsx
"use client"

import { createPoi } from './createpoi';

function AddPoi() {

    return(
        <div>
        <h2>Add Poi</h2>
        <form action={createPoi}>
        Name: <br />
        <input name='name' id='name' /><br />
        Type: <br />
        <input name='type' id='type' /><br />
        Location: <br />
        <input name='location' id='location' /><br />
        <input type='submit' value='Go!' />
        </form>
        </div>
    );
}

export default AddPoi;

```

we can save it in the `ui` folder, allowing us to include it in another component.

We can then include it as follows:

```jsx
import AddPoi from 'app/ui/addpoi';

function Page() {
    return(
        <div>
        <p>Welcome to PointsOfInterest, the top search for things to do when on holiday!</p>
        <AddPoi />
        </div>
    );
}

export default Page;
```
Note how we can simply import it from its location within `ui` and use it. We can also mark it as `"use client"` (a client side component) and use it within a server-side component, as we have done here. (the Page component will be server side rendered as it isn't marked with `"use client"`.

This can have some advantages. For example server actions can **only be called by client-side components**, so what if you wanted to include forms which call server actions from a server-side component? You couldn't put it directly in the server-side component but you could *include client-side components containing the server action within the server-side component*. These would be processed by the browser and rendered client-side, even though the main component is rendered server-side.

### Server actions with AJAX

We can also implement server actions with an AJAX-based interface. So far, the server actions have involved a redirect but we need not do things that way. Using a trick with manipulating the URL, you can implement a server action making use of AJAX. Here is an example:

First of all the `AjaxAddPoi` component, which we would place inside `ui`:

```jsx
"use client"

import {useFormState} from 'react-dom';
import createPoi from 'app/actions/createPoi';


function AjaxAddPoi() {

    const [state, actionCreatePoi] = useFormState(createPoi, {id: 0});


    return(
        <div>
        <h2>AJAX form</h2>
        ID: { state.id }
        <form action={actionCreatePoi}>
        Location: <br />
        <input name='location' id='location' /><br />
        Type: <br />
        <input name='type' id='type' /><br />
        <input type='submit' value='Go!' />
        </form>
        </div>
    );
}

export default AjaxAddPoi
```

then the `createPoi` action:

```javascript
"use server"
import Database from 'better-sqlite3';
async function createPoi(prevState, formData) {
    const db = new Database(`${process.cwd()}/assets/pointsofinterest.db`);

    const stmt = db.prepare("INSERT INTO pointsofinterest(location,type) VALUES (?,?)");
    if (formData.get("location")=="" || formData.get("type")=="") {
        return { status: "Blank Data" };
    }
    const info = stmt.run(formData.get('location'), formData.get('type'));
    return { status: "OK", id: info.lastInsertRowid };
} 

export default createPoi;
```

How does this differ from the previous example? Note how the AJAX front end component uses `useFormState()`:


```javascript
const [state, actionCreatePoi] = useFormState(createPoi, {status: ""});
```
This takes an existing action (e.g `createPoi()`) and returns a new action set up to allow the action to update the *state* of the component. So the action can store its status (success or otherwise) in state, and this can be displayed on the front-end. 

`useFormState()` is actually part of ReactDOM, not Next.js, so it's available in plain React applications too. See [here](https://react.dev/reference/react-dom/hooks/useFormState)

If we look at the `createPoi()` action now, it does not redirect, instead it *returns* a JavaScript object containing a status and other information. Also note that it takes an additional parameter of `prevState`, the previous state of the component. This return value will be used to update the state of the front-en dcomponent.

So, back in the front-end component, note how we can use the state (`state`) to display information returned from the action. In other words, the state contains the object that was returned from the action.

## Links in Next.js

We can create links using the normal `<a>` tag in Next.js. However it's recommended to use Next.js's custom `<Link>` tag instead. When navigating to a new route, `<Link>` will only load those parts of the page which actually change from the current route to the new route, and not those which do not. (Routes might share a layout, for instance).

## Sublayouts

It's possible to create *sublayouts* for part of your application only - i.e. certain routes and their descendants. You do this by creating a new `layout.js` within a route folder. So, for example, if you place a `layout.js` within the `hittastic` folder, the `hittastic` route and its subroutes will all have that layout. Such routes would include

- `/hittastic`
- `/hittastic/newsong`
- `/hittastic/search`

etc.

Here is an example of a sub-layout:

```jsx

import "./pointsofinterest.css";
import Link from 'next/link';

function Layout({children}) {
    return(
        <div id='container'>
        <div id='nav'>
        <Link href='/pointsofinterest'>Main</Link>
        <br />
        <Link href='/pointsofinterest/search'>Search</Link>
        <br />
        <Link href='/pointsofinterest/add'>Add</Link>
        <br />
        <Link href='/pointsofinterest/about'>About</Link>
        <br />
        </div>
        <div id='main'>
        {children}
        </div>
        </div>
    );
}

export default Layout; 
```

You should be able to see that this layout contains a navigation sidebar and a main content area. This layout will be rendered *inside your overall root layout* as a child of it. Meanwhile, any pages within this route or its subroutes will be treated as the `children` of this layout and, in this example, will be rendered inside the `div` with an ID of `main`.


## Search without JSON APIs - A recommended approach

This example shows a recommended way to implement search in a Next.js application if we are not using a JSON-based API. It is shown in the example in the [Learn Next.js tutorial](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination) and is an alternative approach to lifting state up, which you have met already, as a method of implementing search.

The example shows the use of the `next/navigation` module to allow the URL to be dynamically modified after the user enters a search term, triggering a re-render of the page component. 

We will start with the `page.js`: 

```jsx
import Search from 'app/ui/search';
import SearchResults from 'app/ui/searchresults';

function Page({searchParams}) {

    return (
        <div>
        <h1>Searching for {searchParams.type}</h1>
        <Search />
        <SearchResults type={searchParams.type} />
        </div>
    );
}

export default Page;
```

You can see that this contains two components, `Search` and `SearchResults`. The former will read in a point of interest type from the user and modify the URL, and the latter will show the search results. Note how the page component imports the other two components from within the `ui` folder (as discussed above), and reads in an poi from the query string (i.e `searchParams`). This is then sent to the `SearchResults` component which will search for, and display, all points of interest of this type.

We'll now look at the `Search` component. This gathers the point of interest type from the user.


```jsx
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function Search({params}) {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    async function handleSearch() {
        const type = document.getElementById('type').value;
        const params = new URLSearchParams(searchParams);
        params.set('type', type);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
        Point of Interest Type: <input id='type' />
        <input type='button' value='Go!' onClick={handleSearch} />
        </div>
    );
}

export default Search;
```

This is mostly a standard React client side component. However note that the `handleSearch` does not actually do any server search. Instead it dynamically changes the URL using functions of the `next/navigation` module. As we saw, the top level component reads the poi from the query string and sends it to the `SearchResults` component, so the dynamic change of the URL will trigger a re-rendering of the top level component and will pass the poi to the `SearchResults` component.

It's the `SearchResults` component that actually performs the server search:

```jsx
import Database from 'better-sqlite3';

function SearchResults({type}) {
    const db = new Database(`${process.cwd()}/assets/pointsofinterest.db`);

    const stmt = db.prepare("SELECT * FROM pointsofinterest WHERE type=?");
    const results = stmt.all([type]);

    const output = results.map (pointofinterest=> <li key={pointofinterest.id}>{pointofinterest.name} at {pointofinterest.location}, type {pointofinterest.type}</li> );
    return <div><ul>{output}</ul></div>;
}

export default SearchResults;
```

You can see how this takes in a poi, performs an SQL query and returns JSX of the results.

## Streaming

*See [Streaming](https://nextjs.org/learn/dashboard-app/streaming) in the Next.js tutorial*

A particularly useful feature of Next.js is the ability to *stream* sub-components within a component. What does this mean? It means the page, or its layout, is fetched first and then sub-components within the page are fetched later. This is useful if some of the components are slow to load. It means that the user will see most of the page instantly, apart from the slower sub-components.

Streaming is not enabled by default but we can easily enable it. There are two methods we can use:

- The `loading.js` file
- React's `Suspense`

`loading.js` will apply across the whole layout while a `Suspense` can be used to wrap a *specific component*.

### loading.js

We can create a specific "Loading" component inside a `loading.js` file. This can be as simple as this:

```jsx
function Loading() {
    return <div>Loading..</div>;
}

export default Loading;
```

Any components which take time to load, will display the `Loading` component while they are loading.

This is a simple example, we could also write a component to include a spinning wheel image, or similar.

### Using Suspenses

`Suspense` is a React feature which allows us to wrap components with a fallback component which appears while the component is loading.

Here is an example:

```jsx
import SlowComponent from 'app/ui/slowcomponent';
import { Suspense } from 'react';
import SuspenseLoadingComponent from 'app/ui/suspenseloadingcomponent';

function Page() {
    return <Suspense fallback={<SuspenseLoadingComponent />}><SlowComponent /></Suspense>;
}

export default Page;
```

You can see how we wrap `SlowComponent` with a `Suspense` component with a `fallback` prop of a temporary component to display while the `SlowComponent` is loading.

## Building a larger application with multiple components, and passing data between the components

*See [the tutorial](https://nextjs.org/learn/dashboard-app/mutating-data)*

We will now look at some techniques for building a larger application, with several inter-linked components. You might, for example, want to build a shopping application in which you can buy a product by clicking on a "buy" button. Or, a points of interest application in which you can review, or "like", a particular POI. The key feature of this type of application is the user selects a given entity (product, POI, etc) and performs an operation on it.

Server actions would be ideal to perform the operation (e.g. buy, like, etc). Also, server components are the most convenient way of doing the initial search for products, POIs etc. However, remember that server actions can *only be called from client components*. So how can we get round this?

There are various approaches including:

- developing an API to perform the search which returns JSON. We parse the JSON from a client component and then render JSX from the JSON, e.g. by storing the JSON data in state and then converting the state to JSX as we have seen several times when looking at React.

- developing a server-side component to query the database and render the data. However, each item of data (e.g each Poi or product) is rendered *as its own sub-component*, a client component. This sub-component would receive the object representing the item as a prop, and then convert it to JSX and render it. The sub-component could be a client-side component as it does not need to perform any server-side tasks such as query a database. In this sub-component, we could create a form to allow the user to buy the product, like the Poi, etc. This form could contain the ID of the item of data as a hidden field, and be read from a server action. **We will look at this approach in more detail now.**


We'll start with the server component, `SearchResults`. This uses a `PoiDetails` component to display the POI details.

```jsx
import Database from 'better-sqlite3';
import PoiDetails from 'app/ui/poidetails';

function SearchResults({type}) {

    const db = new Database(`${process.cwd()}/assets/pointsofinterest.db`);

    const stmt = db.prepare("SELECT * FROM pointsofinterest WHERE type=?");
    const results = stmt.all(type);

    const output = results.map ( poi => <PoiDetails poi={poi} /> );
    return <div><h2>Search for POIs of type {type}</h2><ul>{output}</ul></div>;
}

export default SearchResults;
```
We'll now look at that `PoiDetails` client-side component. Note how it's a client-side component and includes a "Like" button within a form with a server action. The POI ID is passed through the form within a **hidden form field**.
```jsx
"use client"

import { useFormState } from 'react-dom';
import likePoi from 'app/actions/likePoi';

function PoiDetails({poi}) {

    const [state, alteredLikePoi] = useFormState(likePoi, { status: "", likes: poi.likes });

    return (
        <li key={poi.id}>
        {poi.name} is a {poi.type} in region {poi.region}. Likes: {state.likes}
        <form action={alteredLikePoi}>
        <input type='hidden' name='id' value={poi.id} />
        <input type='submit' value='Like!' />
        </form> 
        Status: {state.status}
        </li>
    );
}
export default PoiDetails;
```

There would also be a `likePoi` server action, this works in a similar way (see below) to the `createPoi` example above by returning an object updating the state, which is shown in the `PoiDetails` component.

Note also how we take the likes from the *state*. This allows us to do an easy dynamic update of the likes when we click the "like" button. We initialise the state to contain a `likes` property equal to the existing likes of the Poi, and then, in the server action, we return an updated state (as we did in the `createPoi` example above) containing the updated likes, after we have liked the Poi. As the likes are displayed as the likes in the *state* (`state.likes`), the likes will live-update whenever we like a Poi.

Here is what the `likePoi` server action might look like:

```javascript
"use server"

import Database from 'better-sqlite3';

function likePoi(prevState, formData) {

    const db = new Database(`${process.cwd()}/assets/pointsofinterest.db`);

    const id = formData.get("id");
    if(id && id >= 1) {
        const stmt = db.prepare("UPDATE pointsofinterest SET likes=likes+1 WHERE id=?");
        const { changes } = stmt.run(id);
        if(changes > 0) {
            const stmt2 = db.prepare("SELECT likes from pointsofinterest WHERE id=?");
            const row = stmt2.get(id);
            return { status: "OK", likes: likes };
        } else {
            return { status: `Poi with ID ${id} not found` };
        }
    } else {
        return { status: `Invalid ID ${id}` };
    }
}
```
Note how it increases the likes and also does a SELECT statement to find the new likes, and returns the new likes in the object to be used as state - so that it can be displayed in the client-side `PoiDetails` component.

### Alternative to hidden field - binding

A slightly more elegant way of passing the ID across is to pass it as an *argument* to the server action. To do this, we use *binding* which we looked at last year. For example:

```jsx
"use client"

import { useFormState } from 'react-dom';
import likePoi from 'app/actions/likePoi';

function PoiDetails({poi}) {

    const [state, alteredLikePoi] = useFormState(likePoi, { status: "", likes: poi.likes });

    return (
        <li key={poi.id}>
        {poi.name} is a {poi.type} in region {poi.region}. Likes: {state.likes}
        <form action={alteredLikePoi.bind(null, poi.id)}>
        <input type='submit' value='Like!' />
        </form> 
        Status: {state.status}
        </li>
    );
}
export default PoiDetails;
```

We then read the bound value directly as a parameter of the server action, rather than via `FormData`:

```javascript
"use server"

import Database from 'better-sqlite3';

function likePoi(prevState, id) {

    const db = new Database(`${process.cwd()}/assets/pointsofinterest.db`);

    if(id && id >= 1) {
        const stmt = db.prepare("UPDATE pointsofinterest SET likes=likes+1 WHERE id=?");
        const { changes } = stmt.run(id);
        if(changes > 0) {
            const stmt2 = db.prepare("SELECT likes from pointsofinterest WHERE id=?");
            const row = stmt2.get(id);
            return { status: "OK", likes: likes };
        } else {
            return { status: `Poi with ID ${id} not found` };
        }
    } else {
        return { status: `Invalid ID ${id}` };
    }
}
```

## Error handling

*See [the Next.js tutorial](https://nextjs.org/learn/dashboard-app/error-handling)*

Some of our components have featured testing for errors. However Next.js comes with some standard error-handling features, including:

- providing an `error.js` component to be displayed whenever an error is thrown (e.g. via an exception)

- providing custom 404 Not Found components via `not-found.js`.

We'll look at each of these in turn. Here is a page which searches for POIs by type.

```jsx
import Database from 'better-sqlite3';
import { notFound } from 'next/navigation';

function Page({searchParams}) {

    if(searchParams.type == "") {
        throw new Error("Missing POI type!");
    }
    const db = new Database(`${process.cwd()}/assets/pointsofinterest.db`);

    const stmt = db.prepare("SELECT * FROM pointsofinterest WHERE type=?"); 
    const results = stmt.all(searchParams.type);

    if(results.length == 0) {
        notFound();
    } else {
        // Output the POIs (not shown)
    }
}

export default Page;

```
It has two possible errors:
- the `type` query string parameter is empty;
- there are no search results.

The former error is a fundamental error so we throw an `Error` object containing an error message. The latter is a "no results" condition so we generate a 404 to indicate that; this is in agreement with the principles of REST that we saw last year.

The `error.js` might look like this:

```jsx
"use client"

function Error({error, reset}) {
    return <div><strong>ERROR: {error.message} </strong></div>;
}

export default Error;
```

Note how the `Error` component receives an `error` prop which is the `Error` object which was originally thrown, The `Error` object - see [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error) - has a `message` property containing the original error message.

The `reset` prop is a function which can be used to reload the component, where this is appropriate.

The `not-found.js` is very simple:

```jsx
"use client"

function NotFound() {
    return <h1>No songs by that artist!</h1>;
}

export default NotFound;
```

## Exercise

- Ensure you have completed the exercises from last week.

- Develop a layout for HitTastic! which will apply to all routes and subroutes of `hittastic. This should include these links within a sidebar:

	- `/hittastic` : main HitTastic! page, including some information about HitTastic!
	- `/hittastic/search` : search for a song.
	- `/hittastic/add` : add a song.

Use the `Link` component for the links, and use this CSS to setup a sidebar and main content area:

```css
html, body {
    width: 100%;
    height: 100%;
}

#container {
    min-height: 100%;
    height: 100%;
    border: 1px solid white;
    font-size: 80%;
}
#nav {
    float: left;
    width: 20%;
    background-color: black;
    color: white;
    height: 100%;
}


#main {
    background-color: #00ffff;
    color: black;
    float: right;
    width: 80%;
    height: 100%;
}

a {
    color: white;
}

#main a {
    color: blue;
}
```

Create the `search` and `add` routes (you can use the work from last week to do this). Test it out, and go to the Developer Tools and specifically the Network Tab. Turn off "XHR" (AJAX) requests (so they cannot be seen) and navigate between the three routes. Do the requests appear in the Network tab?

- Implement streaming for `hittastic` and all sub-routes, using a `loading.js` file. To prove it works, try writing a component with a path `/hittastic/slow` which simulates a slow loading, as follows, and link it to your sidebar.

```jsx
async function Page() {

    // the pauser() function returns a promise which resolves with a timeout function which runs the "resolve" function after a given number of milliseconds. This will have an effect of pausing for that time.
    function pauser(milliseconds) {

        return new Promise( resolve => {
            setTimeout(resolve, milliseconds);
        } );
    }

    // await the resolution of this promise in 3000 milliseconds
    await pauser(3000);
    return <p>Content loaded!</p>;

}

export default Page;
```

- Rewrite your "add song" functionality to use AJAX and `useFormState()`. Display the success, or otherwise, of the "add song" server action in the front-end UI via state. Include a check to make sure that the song details are not blank in the server action, and return an appropriate object to update the state with the error if so. Place your server action inside an `actions` folder within `app`.

- Rewrite your Search functionality as follows:

    - it should use three components, one page component, for the search form and one for the search results, with the search form component editing the query string and reloading the page, as shown in the example above. The search and search results components should be within the `ui` folder within `app`.

    - it should throw an error if the artist is blank (""). Write a custom `error.js` component to handle this error.

    - it should then include a Buy button for each song. This Buy button should contact a `buySong` server action which reduces the quantity by one. The `buySong` action should check whether the song with that ID exists, communicating the error to the client if not. If successful it should do a SELECT statement to find the new quantity, and communicate that to the client. The client should then do a live-update of the new quantity.

