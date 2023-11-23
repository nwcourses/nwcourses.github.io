# Week 9 - Next.js part 3

This week, the final of three weeks introducing the fundamentals of Next.js, will cover these further topics:

- More on using client and server components together, when they can be used together and when they cannot
- Logins and sessions in Next.js
- Middleware in Next.js
- Route groups, and why they are useful

## Using client and server components together

*(This reference [on the Next.js documentation](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) was used to draw up these notes. Please see this link for more detail).*

We've seen that Next.js allows us to use *server components* (the default) which run on the server, and *client components* which run in the browser. We mark the latter with `"use client"` to indicate to the Next.js compiler that they will be run in the browser.

When should you use each?

- Server components are needed whenever you need to do any server processing, such as querying a database;
- Client components can be used if you do not need to do any server processing; you reduce the load on the server if you simply run it on the client.

### Client components within server components

You can, as we have seen, create a page which consists of a mixture of server and client components. For example

```jsx
import ClientComponent from 'app/ui/clientcomponent';

function Page() {
    return (
        <>
        <h1>This heading is coming from the main page, running on the server</h1>
        <ClientComponent />
        </>
    );
}
export default Page;
```

Here, `Page` is a server component (which is the default) but `<ClientComponent>` is a client component. This works as expected; the server component runs on the server and the response is delivered to the client. The client then executes the `<ClientComponent>`.

The `ClientComponent` might look like this:

```jsx
function ClientComponent() {
    return <h2>This component is running on the client!</h2>;
}
export default ClientComponent;
```

This might be useful (as we have seen) when the page performs a database query and each result from the database (e.g. each product in a shopping site) is rendered as a client component, e.g, using `map` to convert the raw database data to JSX. The client component, which renders the product details, does not need to run on the server (because we have already got the data from the database) so we can reduce server load by making it a client component.

As we have also seen last week, when we use `useFormState()` with server actions to implement AJAX-based updates, the component which calls the server action needs to be client, as you might expect. So in this case you would also need to potentially include client components within a server component.

### Server components within client components

What about the opposite case, though, where we might want to embed a server component inside a client component? For example:

```jsx
import ServerComponent from 'app/ui/servercomponent';

function ClientComponent() {
    return (
        <>
        <h2>This heading is in the client component</h2>
        <ServerComponent />
        </>
    );
}
```
Will this work? **It will not, because you cannot embed a server component in a client component like this**. Think about what would have to happen here. The client component is running on the client, but to render the server component, **it would need to make another request to the server**, in addition to the original request for the page which contains the client component (as shown above).

To enable this to happen, we need to take a different approach. **We need to pass the server component into the client component as a prop**. This means the server component would render first, so there is no need for a further HTTP request. We can do this on our main page as follows:

```jsx
import Client from 'app/ui/client';
import Server from 'app/ui/server';

function Page() {
    return <><h1>Page - this is server</h1><Client srv=<Server/> /></>;
}

export default Page;
```

Note how we render `<Client>` from the page, but pass in the prop `srv` which is set equal to `<Server>`. **This works** : the server component will be executed before it's passed to the client, and its output will be sent to the client. The client might look like this:

```jsx
"use client"
function Client({srv}) {
    return <><h2>This is a client component!</h2>{srv}</>;
}

export default Client;
```

Note how it receives the `srv` prop and renders it. The server component would then need to include:

```
"use server"
```
as it's being rendered from a client component. It might look something like this:

```jsx
"use server"

import Database from 'better-sqlite3';

function Server() {
    // Connect to and query a database (not shown)
    const res = // database results mapped to JSX 
    return <><h3>This is a server component!</h3><ul>{res}</ul></>;
}

export default Server;
```

Another way of doing this is to make the server component a child of the client:
```jsx
<Client>
<Server />
</Client>
```

As we saw in the first React session, we can then access it in the `Client` component using the `children` prop:

```jsx
"use client"
function Client({children}) {
    return <><h2>This is a client component!</h2>{children}</>;
}

export default Client;
```

## Logins and sessions in Next.js                     

So far we have not considered how to implement session variables and login systems in Next.js. There is actually not a standard technique; you need to either use third-party libraries or implement your own from scratch.

Two recommended libraries for implementing sessions in Next.js are:

- `iron-session`, a reasonably simple library which stores sessions in encrypted cookies.
- `next-auth`, a more flexible though more complex library which can handle third-party providers (Google, Facebook, etc).

We will use `iron-session` as it's the simplest. This is documented [here](https://github.com/vvo/iron-session), on GitHub. It's available as an `npm` package, e.g.:

```
npm install iron-session
```

This code snippet is an example of using `iron-session`. We need a password to sign the cookie, and a cookie name. A convenient place to put these is in a module, and export them:

```jsx
export const cookieName = "hittasticSession", 
    password = "BinnieAndClyde123456789012345678"; // must be at least 32 characters
```
Here is an example of performing a simple (and extremely insecure) authentication and saving the username in the session:
```jsx

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { cookieName, password } from 'app/sharedData';  // our module containing the cookie name and password, see above

async function login(formData) {
    const session = await getIronSession(cookies(), { password, cookieName } );

    const username = formData.get("username");
    if(username=="admin" && formData.get("password")=="password") {
        session.username = username;
    }

    // Other code omitted...
}
```
Note how we initialise the session using the `cookies()` sent from the client, and specify the cookie name we wish to use, as well as the password.

In this example we read in a username and password from a form and check that they are `admin`/`password` (yes, not at all secure, but this is just a basic example!) and if they are, store the username in the session object.

Later we can retrieve the session again, eg.

```
const session = await getIronSession(cookies(), { password, cookieName } );
if(session.username) {
    // we are logged in 
} else {
    // we are not logged in
}
```

In a full example you would check the username and password against a database. To handle logouts you can either `unset` the session property (e.g. `session.username`) or set it to `null`. 

Note however that this renders the cookie liable to tampering on the client side (e.g. adding the username back in) so further checks need to be added. If we just grant access by checking for the existence of the `username` property, it's conceivable that it will exist due to client-side tampering, so we should also store the current login status of a user in the database table, as described on the `iron-session` documentation. 

So when the user logs in, we set a flag in the database to `true` to indicate that they have authenticated successfully, and when they log out, we set the flag back to `false` to indicate that this username should no longer have access to private resources. So if the cookie contains a `username` property, we check the database to see whether that user is currently logged in (is the flag `true`?), and only grant access if they are.

### Checking the session 

We can later check the session in any page or layout, and by doing so, we can render different content depending on whether we are logged in or not.

As an alternative, we can use *middleware* to check the session.

## Middleware

*See [the Next.js documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)*

Last year in WAD we looked at *middleware* and saw that middleware was code that executed before the route itself, which can be used to perform actions such as modify the request or check the presence of sessions. We saw that you could use middleware to block access to certain routes to people who are not logged in or not administrators. 

Next.js also uses middleware. It's placed in the `middleware.js` file in the root folder of your project (i.e. the folder containing the `package.json`). Here is an example of Next.js middleware:

```javascript
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { cookieName, password } from 'app/sharedData';  // our module containing the cookie name and password, see above

export async function middleware(request) {
    const session = await getIronSession (cookies(), { password, cookieName } );

    if(!session.username && !request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", request.url));
    } else {
        console.log("forwarding to next middleware...");
        return NextResponse.next();
    }

}
```

We create a function called `middleware()` and export it. This function takes one parameter, `request`, of type `NextRequest`, which represents the HTTP request. In this example we check whether the `username` property of the session exists. If it does not, and the request (which we can obtain via `request.nextUrl.pathname`) is not for the route `/login` (the login page) we redirect to the login page. We need to check that the route is not for the login page, as we do not need to protect that, obviously - and if we did run the middleware for the login page, we'd get into an infinite redirect loop as the middleware would redirect back to the login page!

If the username does exist, or we did request the login page, then we forward to the original target of the request, i.e. the page itself (which is obtained via `NextResponse.next()`). This technique is similar to Expreess middleware.

We can also restrict the routes the middleware is applied to by exporting a `config` object from `middleware.js` (in addition to the function). For example:

```javascript
export const config = {
    matcher: '/hittastic/:path*'
};
```

This will run the middleware only on routes beginning with `/hittastic. We can alternatively specify an array of matching routes, e.g

```javascript
export const config = {
    matcher: ['/hittastic/addSong', '/hittastic/buy' ]
};
```

which means that the middleware will run only on `/hittastic/addSong` and `/hittastic/buy`.

For more refined specification of routes using pattern-matching, we can use *regular expressions* : see the documentation for more detail.

## Route groups

Sometimes we may wish to use different layouts for different routes with the same base path. For example we may have these routes:

- `/hittastic`
- `/hittastic/search`
- `/hittastic/about`
- `/hittastic/addSong`
- `/hittastic/login`

We may wish the first four to have a full layout, featuring a sidebar and main content area, and a Logout button if the user is logged in. The login route, however, probably needs a simpler layout with just a login form, and crucially no Logout button.

What we can do in this case is to create *route groups*. Route groups allow us to do just this - create different layouts for different routes within the same path. A route group is created by making a folder with a name within parentheses. For example within the ``hittastic` folder we could create:

- a `(main)` folder containing the first four routes above;
- a `(login)` folder containing the `login` route.

We could then place separate `layout.js` files in `(main)` and `(login)`.

When requesting the routes we do not need to include the route group in parentheses, so if the `search` route was within `(main)`, the route we would use to request the page would be:

`/hittastic/search`

and not

`/hittastic/(main)/search`

