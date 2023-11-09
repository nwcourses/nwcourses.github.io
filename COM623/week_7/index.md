# Week 7 - Introduction to Next.js

## What is Next.js?

Next.js (see [here](https://nextjs.org) is a framework for building React-based client-server web applications. With Next.js, you can develop both the client and the server parts of your application without having to use any other frameworks or libraries aside from React and ReactDOM. Next.js makes it easy to develop common application features such as routing and form submissions. With Next.js we can develop an application which consists of both client-side and server-side React components (it is possible to process React components on the server using Node.js). It also comes with an inbuilt, Node.js based server, so when you run a Next.js application, a server is automatically started.

Next.js offers the facility to *build your project into a bundle* without having to execute the Webpack commands or configure Babel. This is done with the custom [Next.js Compiler](https://nextjs.org/docs/architecture/nextjs-compiler). It is all done as part of the `next` command-line utility which comes with Next.js.

Next.js has an automatic [Fast Refresh](https://nextjs.org/docs/architecture/fast-refresh) facility in which your code is "hot-reloaded" if you change it. So you can fix errors on the go, rather like the Webpack Dev Server, without having to reload your page. Furthermore, in development mode, extensive error information is displayed in the browser when an error occurs.

Furthermore Next.js has various [caching features](https://nextjs.org/docs/app/building-your-application/caching) to optimise the delivery of your application.

## Creating a Next.js project

*See [the website](https://nextjs.org/docs/getting-started/installation)*

You can use the `create-next-app` tool to automatically create a Next.js project with certain files in place. However, to better understand the structure of a Next.js application, we will do so from first principles.

Make a folder for your project and change directory to it:

```
mkdir next-project
cd next-project
```

Install dependencies, including Next.js itself plus React and React DOM as follows. Note that I have also added `better-sqlite3` here, this is the SQLite library you used last year and is not necessary for a Next.js application, but we will be using it, so we may as well install it now.

```
npm install next@latest react@latest react-dom@latest better-sqlite3
```

This will create a basic `package.json`.

You should then add some scripts to your `package.json` to perform standard actions:

```
 "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
```

Of these: 

- `dev` builds your project and starts a server running your project in development mode, 
- `build` builds your project, but does not start a server, 
- `start` starts a server running your project in production mode, and 
- `lint` checks your code for potential problems (linting).

## Next.js routing

*See [the website](https://nextjs.org/docs/app/building-your-application/routing)*

Routing is one of the most fundamental aspects of Next.js, so we will start with a look at Next.js routing.

The key approach to setting up routes in your Next.js application is to use the **App Router**. This is a standard way of setting up routes for your application (remember when we looked at Express last year, we setup routes; Next.js is independent of Express and uses a different approach).

With the App Router, we place our routes in the `app` folder, which you will need to create, e.g.

```
mkdir app
```

### Layouts and Pages

With the App Router you create two types of component: `layouts` and `pages`. What are these?

- *Layouts* are essentially a "frame" for our page. In a layout we define our page body, this allows us to do things such as a common layout and CSS for a range of pages.
- *Pages* represent individual pages. These are React components which should return JSX. However, by default, they are *server-side* components: components which are processed by node.js on the server. Server-side components are a feature of React, though Next.js provides a framework to allow us to easily use them.


### Hello World in Next.js

So with that in mind, here is Hello World in Next.js.

We first create a layout file, which must be called `layout.js`.

```jsx
function RootLayout({children}) {
    return (
        <html>
        <body>
        {children}
        </body>
        </html>
    );
}

export default RootLayout;
```

The layout is a React component. Hopefully you can see that the layout contains a function which returns JSX in the normal React way, containing, essentially, a "frame" for your page into which can be inserted content. When your page is rendered, any components are passed to the function in the `children` prop, so we return JSX containing an HTML page with the children inserted into the `body`.

Next we create a page, which must be called `page.js`:

```jsx
function Page() {
    return <h1>Hello Next.js!</h1>;
}

export default Page;
```

A *page* is an individual page in your application. Note how it consists of a simple React component which returns JSX containing an `h1` heading with a Hello World message.

The file *must* be called `page.js`, however the component need not be called `Page`.

When Next.js builds your page, it will use the layout and then insert the page's JSX into the `children` parameter of the props of your layout.

### Test this out!

Test out your application by entering:
```
npm run dev
```
This will start your app in development mode, running on port 3000. So if you enter 
```
http://localhost:3000
```
in your browser, you should see the Hello World message. Because the components are directly in the `app` folder, they correspond to the root (top-level) route.

`
### Creating a new route

As you saw last year in WAD, a full web app will need to set up a range of different *routes*, all of which perform different functions. In Next.js, we define routes by creating *folders* which map to routes. 

To illustrate this, we are going to start developing a version of the "HitTastic" music site using Next.js. First of all change your Hello World component as follows, so that it is now a HitTastic! index page:

```jsx
function Page() {
    return <div><h1>HitTastic!</h1><p>Welcome to HitTastic!</p></div>;
 }
export default Page;
```

Now create an 'about' page. Inside your `app` folder, create another folder named `about` and change directory to it:

```
mkdir about
cd about
```

In here, create a new `page.js` containing a new component:


```jsx
function Page() {
    return(
        <div>
        <h2>About HitTastic!</h2>
        <p>HitTastic! is the top site for music. Whether it's rock, pop, indie, rap or pure liquid cheese you're into, you're sure to find it here.</p>
        </div>
    );
}
export default Page;
```
Folders correspond to routes in Next.js. So, you can access it in your browser with:
```
http://localhost:3000/about
```
`
### The value of the layout in providing common content for each page

As discussed above, the layout can provide common content for each page. We will now explore this: Create a small CSS file, `style.css`, and save it in your `app` folder:

```css
body {
    background-color: blue;
    color: white;
    text-decoration: none;
}

#imgdiv {
    text-align: center;
}
```

Now import this into your `layout.js` by adding an `import` statement at the top:
```javascript
import './style.css';
```
This will result in the CSS being applied to *each page* in the current route path and its descendants. 

Furthermore we can add *page content* which will be shared across pages in the layout:

```jsx
import styles from './style.css';

function RootLayout({children}) {
    return (
        <html>
        <body>
        <div id='imgdiv'>
        <img src='/hittastic.png' alt='HitTastic! logo' />
        </div>
        {children}
        </body>
        </html>
    );
}

export default RootLayout;
```

Note how our page now contains a `div` with an ID of `imgdiv` containing an image logo. The children are then inserted into the layout after the image. As a result, all pages will contain the logo with the specific content for each page appearing below the image.

#### Including static content in your application

Static content (such as images) should be placed in your application's `public` folder, which should be a subfolder of the overall application folder. Download the `hittastic.png` image from [here](https://github.com/nwcourses/nwcourses.github.io/blob/master/images/hittastic.png), create a `public` folder, and save the image in the `public` folder.

Try requesting both your pages (the Hello World page and the About page) now. Do both of them have the CSS and logo applied?

### Passing parameters to routes

There are various ways in which we can pass parameters to routes. We can either pass a **query string** or include the parameter in the route. We will look at both of these.

#### Query strings

Create a new 'search' component as follows, inside a folder called `search` within `app`.

```jsx
function Page({searchParams}) {
    return(
        <>
        <h2>Searching for {searchParams.artist}</h2>
        <p>You are searching for the artist {searchParams.artist}</p>
        </>
    );
}

export default Page;
```

Try requesting this, with a *query string* containing an artist, e.g.:
```
http://localhost:3000/search?artist=Oasis
```

Note how the component receives a *prop* called `searchParams`. This is an object containing all the query string parameters sent to the component. We can access each individual query string parameter by using the corresponding property in the `searchParams` prop, e.g. `searchParams.artist` for the parameter `artist`.

### Exercise 1

Change your code so that it will interpret a second query string parameter `title` and display it as well as the artist.

Hint: to pass in two query string parameters, separate them with an ampersand &, e.g:
```
http://localhost:3000/search?artist=Oasis&title=Wonderwall
```

#### Including parameters in the route

Alternatively, as you have seen when working with Express, you may pass the parameters through the route, e.g.:

```
http://localhost:3000/artistSearch/Oasis
```

How can we do this? 

We need to **make a folder** for the artist parameter, in the same way that we make folders for the static part of the route such as `artistSearch`. To indicate that the folder represents a parameter, we name it so that it begins and ends with square brackets, e.g. `[artist]`. You can create such a folder in the normal way:

```
mkdir [artist]
```

Within the parameter folder, i.e. `[artist]` in this case, you can create a component:

```
function Page({params}) {
    return(
        <>
        <h2>Searching for {params.artist} (route parameter version)</h2>
        <p>You are searching for the artist {params.artist}</p>
        </>
    );
}

export default Page;
```

Note that it's almost the same as the query string version, but we use the `params` prop rather than `searchParams`. Note we use `params.artist` to match the name of the parameter (`artist`): note how we named the parameter folder `[artist]` when creating our folders.

### Exercise 2

Create a component to handle a route with both artist and title e.g.
```
http://localhost:3000/artist/[artist]/title/[title]
```

Like the query string exercise above, it should display both the artist and the title.

### Exercise 3 - connecting to a database

The exercise allows you to turn the previous examples into something useful by connecting them to a database.
- Create a `resources` folder as a sub-folder of your overall project folder.
- Download the HitTastic! database from [here](https://nwcourses.github.io/COM518/wadsongs.db) and save it in the `resources` folder.
- Using [the database notes from last year](https://nwcourses.github.io/COM518/topic2.html), enhance *either* the query string-based component *or* the route parameter-based component so that it actually shows all songs by the chosen artist within the component. You should map the database results to JSX, as you've done before, and then render that JSX. **Hint**: to obtain the correct location of the database file, use `process.cwd()` to get the current directory (the root folder of the project). So you will need: 
```javascript
const db = new Database(`${process.cwd()}/resources/wadsongs.db`);
```
to open the database, once saved in the `resources` folder.

### Links

Next.js has its own `Link` component for linking between pages, which ensures the routing is correct. This is quite simple, and similar to the normal `a` tag, e.g:

```jsx
<Link href='hittastic/about'>About HitTastic!</Link>
```

## Forms, client components, and server components

How can we implement forms in Next.js? One method is to use a standard HTML form with an `action` pointing to a route which performs a search. However, Next.js has various more specialised ways of executing forms. Different approaches are taken for searches (GET requests) and adding or modifying data (POST requests).

### Searches (GET requests)

A key thing you need to understand here is the difference between *client componnents* and *server components*. Both are written using React, but client components are processed by the client (the browser) while server components are processed by the server (Node.js based). In Next.js, the default is to use server components. However there are certain circumstances in which you might want to use client components instead, such as when performing AJAX requests. We mark a client component by adding the line
```
"use client"
```
as the very first line in the component. This will setup the Next.js build system to send the component to the client, rather than process the component on the server.

A client-side component would basically be a standard React component of the kind you have seen already, which could make an AJAX call to an API, e.g:
```jsx

'use client';

import React from 'react';

function Page() {

    const [pois, setPOIs] = React.useState([]);

    const poisJSX = pois.map (poi => <li key={poi.ID}>{poi.name} {poi.type}</li>;

    async function search() {
        const type = document.getElementById('poiType').value;
        const response = await fetch(`/api/poi?type=${type}`);
        const pois = await response.json();
        setPOIs(pois);
    });

    return(
        <div>
        <input id='poiType' type='text' />
        <input type='button' value='Find POIs!' onClick={search} />
        { poisJSX }
        </div>
    );
}

export default Page;
```

There is nothing new about the above, however if you place it in an appropriate folder in a Next.js application, you will be able to access it via an appropriate route.

### Developing JSON APIs in Next.js

*See [here](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) for more detail.*

Next.js uses its own approach to JSON APIs, known as **route handlers**. In the appropriate route folder, you create a file called `route.js`. Note that there **must** not already be a `page.js` in the same folder. 

Typically, a folder called `api`, within the `app` folder, would be used to store JSON APIs. Here is an example which would work with the above AJAX front end if it were placed in a folder `poi` within the `api` folder within `app`:

```javascript
import Database from 'better-sqlite3';

export function GET(request) {
    const url = new URL(request.url);
    const db = new Database(`${process.cwd()}/assets/poi.db`);
    const stmt = db.prepare("SELECT * FROM pointsofinterest WHERE type=?");
    const results = stmt.all([url.searchParams.get('type')]);
    return Response.json(results);
}
```
Note how we export one function called `GET`, this will correspond to a `GET` request to the API endpoint `/api/poi` with a query string parameter called `type`.

We could create another API route by including the search term in the route directly (without a query string), e.g.:

```
http://localhost:3000/api/poi/hotel
```

We would, just like non-API routes, need to create a folder representing the type parameter, e.g. `[type]`, to represent the POI type. We can then access this via an optional second parameter to the `GET` function, e.g:
```javascript
import Database from 'better-sqlite3';

export function GET(request, {params}`) {
    const url = new URL(request.url);
    const db = new Database(`${process.cwd()}/assets/poi.db`);
    const stmt = db.prepare("SELECT * FROM pointsofinterest WHERE type=?");
    const results = stmt.all([params.type]);
    return Response.json(results);
}
```
The second parameter to `GET` contains an object which can be deconstructed to obtain the `params`, i.e. the route parameters. Hopefully you can see that the approach is similar to passing through parameters to a server-side component as we did above.
 
### Server Actions: Adding or updating data (POST requests)

*See [the Next.js documentation](https://nextjs.org/docs/app/api-reference/functions/server-actions)*

To send POST requests the recommended approach is to use *server actions*, which are basically functions executed by our components which respond to form submissions without having to worry about a separate route.

These make use of hybrid client/server components. We can create these by marking *certain functions* with "use client" or "use server", as appropriate.

Here is an example of a component containing a form which adds a new POI. Imagine it's available via the route `/poi/add`, i.e. a `page.js` within the `add` folder, within the `poi` folder, within `app`.

```jsx
"use client"

import { createPOI } from './createpoi';


function AddPOI() {

    return(
        <div>
        <h2>Add POI</h2>
        <form action={createPOI}>
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

export default AddPOI;
```

The server action itself is in another file, `createpoi.js`, in the same folder (though this can be changed). Note how we need to label it with "use server", as it's being called from a client component. **We cannot put server actions directly inside client components; they must go in a separate file.**

```jsx
"use server"

async function createPOI(formData) {
    const db = new Database(`${process.cwd()}/assets/pointsofinterest.db`);

    const stmt = db.prepare("INSERT INTO pois(name,type,location) VALUES (?,?,?)");
    stmt.run([formData.get('name'), formData.get('type'), formData.get('location')]);
    redirect("/poi/add");
}

export { createPOI };
```

Note how this is a *client component containing a server action* It's mostly client, due to the "use client" at the top. 

Note how the form action is, rather than a URL, the `createPOI()` function. So when the form is submitted, it will send it to `createPOI()`, running on the server (Next.js deals with the "magic" allowing this to happen, essentially the code is processed into client and server parts). 

Inside the `createPOI()` function, we read the form data that was sent using the `formData` parameter. This is a parameter of type `FormData`, which is a standard JavaScript object (not part of Next.js or React) allowing you to read form data that was sent. Note how we retrieve each item of form data with the `get()` method, passing in the ID of the form field as an argument.

Note also how we use `redirect()` to redirect the user back to the route when the POI has been added, which will reload the form into the client.


### Exercise 4

- By developing an API route handler, implement an AJAX-based song search (by artist) using your HitTastic! SQLite database.
- Create a form allowing the user to add a new song to the database and a server action to actually add the song to the database. 
