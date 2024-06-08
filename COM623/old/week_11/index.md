# Week 11 - Further Firebase: More Firestore, using Firebase with React

This week we will look at using React and Firebase together. We will also finish looking at Firestore, by considering *update* and *delete* operations and look a little more at Firestore rules.

**Credit**: some of this material (particularly the section on using React and Firebase) is based on original material by Joe Appleton, who used to run this module.

## Update and delete operations in Firestore

Last week we looked at how to create and retrieve data in Firestore. This week we will look at *update* and *delete* operations, which are a little more complex in their implementation. There are two general approaches to performing updates and deletes:

- *Transactions*. These are used in cases where we query data (to obtain the latest data) and update the current data, where the new value for the data is dependent on the old value. A good example would be reducing the quantity in stock of a song, or "liking" a point of interest. In the former, we take the current quantity and reduce it by 1, while in the latter, we take the current number of likes and increase it by 1.

- *Batched writes*. These are used when we need to perform updates which are not dependent on existing data. A good example would be updating the details of a song, such as changing its chart position, or price.

### Transactions

Here is an example of the use of a Firestore transaction.

```javascript
async function likePoi(id) {
    const docRef = doc(db, "pointsofinterest", id);

    try {
        await runTransaction(db, async(transaction) => {
            const doc = await transaction.get(docRef);
            if(!doc.exists()) {
                throw(`POI with ID ${id} does not exist!`);
            }

            const newLikes = (doc.data().likes || 0) + 1;

            transaction.update(docRef, { likes: newLikes } );
            document.getElementById(`likes${id}`).innerHTML = newLikes;
        });
    } catch(e) {
        alert(e);
    }
}
```
Note that:

- We first obtain a *document reference* (object of type `DocumentReference`, containing a reference to a given document in the collection):

```javascript
const docRef = doc(db, "pointsofinterest", id);
```

- We then start a transaction with `runTransaction`. We supply our database object and a callback which runs when the transaction has been opened. In this transaction we obtain the document that the `docRef` refers to, i.e.

```javascript
const doc = await transaction.get(docRef);
```

and check it actually exists.

- We then calculate the new likes; we can get the data associated with the document using the `data()` method.

- We then call the transaction's `update()` method to update the likes property to the new likes. Note that as well as `update()`, which updates selected properties, we can use `set()` to completely replace a document.

- Finally we update an element on the UI with the new likes, so we get a live UI update. You could of course also use React here; below we discuss using React with Firebase.

### Batched writes

Batched writes are an alternative to transactions in cases where the value of the updated data does not depend on the existing value. Here is an example:


```javascript
async function updateStudent(id, newName, newCourse, newMark) {

    try {
        const docRef = doc(db, "students", id);
        const docum = await getDoc(docRef);
        if(docum.data()) {
            const batch = writeBatch(db);
            batch.update(docRef, {
                name: newName,
                course: newCourse,
                mark: newMark
            } );
            await batch.commit();
            alert(`Record updated successfully.`);
        } else {
            alert('That document does not exist.');
        }
    } catch(e) {
        alert(e);
    }
}
```
We again obtain a document reference and then a document. We check that the document has data in it (which it will not if the ID does not exist) by checking that the `data() `method of our document returns a non-null value.

Then we start a *batched update* with the `writeBatch()` function. You can put smultiple updates or deletes inside one single batched update, and then commit it at the end with `commit()`. Here, we are again performing an `update()` to update selected properties of the student document. We could equally well use `set()` to completely replace the document, or `delete()` to delete it.


## Firebase and React

### Creating Custom Hooks

You have already seen and used Hooks. See [week 5](../week_5/). It makes sense to use a custom Hook to setup the Firebase functionality as we can call it when we load the component.

Create the file: `useAuth.js`: 

- Add the following code:

```javascript

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    updateProfile,
} from "firebase/auth";

import { useState, useEffect } from 'react';

function useAuth() {

    const [user, setUser] = useState(null);

    // Initialize Firebase Auth

    const auth = getAuth();

    
    useEffect( () => {
        onAuthStateChanged( auth, user => {
            setUser(user);
        } )
    }, [] );

    async function signup(email, password, name) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Signed up 
            const user = userCredential.user;
            alert(`signed up: ID=${user.uid}`);
            alert(user.uid);
            const profile = await updateProfile(user, {
                displayName: name
            });
          } catch(error)  {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode} ${errorMessage}`);
          }

    }

    async function login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        } catch(error) {
            alert(`${error.code} ${error.message}`);
        }
    }

    async function logout() {
        try {
            await auth.signOut();
        } catch(error) {
            alert(`${error.code} ${error.message}`);
        }
    }

    return { signup, login, logout, user };
}

export default useAuth;
```
What's this doing? It's a hook which returns the various Firebase functions for user management: signup, login and logout. Thus it allows our React code to hook into the Firebase functionality. It also stores the current user as state (updating when authentication state changes); as we did in our original custom Hook, we also return a reference to the `user` state variable so that it can be used in our React components.

Note how we put `onAuthStateChanged()` in an Effect. This is to prevent this event handler being setup multiple times, leading to duplicate event handlers, each time we re-render.

We could then use the Hook in a React component:

```javascript
import { initializeApp } from 'firebase/app';
import React from 'react';
import useAuth from './useAuth';
import Login from './Login';
import Logout from './Logout';
import ProtectedContent from './ProtectedContent';

function App(props) {

    const app = React.useRef(null);

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "xxxxxx",
        authDomain: "xxxxxx",
        projectId: "xxxxxx",
        storageBucket: "xxxxxx",
        messagingSenderId: "xxxxxx",
        appId: "xxxxxx"
   };

   if(!app.current) app.current = initializeApp(firebaseConfig);

   const { login, logout, user } = useAuth();

   async function loginClickHandler() {
      await login(
        document.getElementById('email').value,
        document.getElementById('password').value
    );
  }

  return (
      <div>
        <h2>Firebase/React</h2>
        <div>{user == null ? 
            <Login clickHandler={loginClickHandler}/>: 
            <><ProtectedContent /><Logout clickHandler={logout}/></> 
        }</div>
      </div>
  );
}

export default App;
```
Note how we initialise Firebase inside our `App` component, but store the Firebase app as a *ref* so that it's preserved across multiple-renders.

Note also how we obtain our Firebase user management functions from the `useAuth()` hook, as well as the `user` object representing the currently logged-in user.

Note how the JSX contains a test to see whether `user` is null. If it is, the user isn't logged in so we show a `Login` component (not shown, but would contain a login form). If the user is logged in, we show some protected content as well as a `Logout` component (again, not shown, but would contain a logout button).

## Using Firebase in Next.js

If you use client components in Next.js, you can use the same kind of patterns as in plain React, as shown above.

Server components in Next.js can also work with Firebase. In this case, the best approach is to store your Firebase objects in a module which can be imported into Next components.

When using Next.js *do not try to use Firebase objects (e.g the `app` or the `auth` object) in both client and server components. They will be treated as separate Firebase objects and will be inconsistent*, for example if you login via a server-side `auth` object, the `auth` object client-side will still be in an unauuthenticated state. If using server components it's recommended to store the Firebase objects server-side for security reasons.

The best place to put your Firebase objects is in a separate module, and export them so they can be used in different components and server actions. For example:

```javascript
// app/firebase/setup.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  ...
};

export const app =  initializeApp(firebaseConfig);

export const auth = getAuth();
```

Note here how we export both the Firebase app `app` and the auth object `auth`.

We can then import one or both by selecting them in `import` statements, e.g. one of the following:

```javascript
import { app, auth } from 'app/firebase/setup';
import { app } from 'app/firebase/setup';
import { auth } from 'app/firebase/setup';
```

Example of a server component which uses the exported `auth` object to display either a `Login` or `Logout` component:

```jsx
import login from 'app/actions/login';
import logout from 'app/actions/logout';
import Login2 from 'app/ui/Login2';
import Logout2 from 'app/ui/Logout2';
import ProtectedContent from 'app/ui/ProtectedContent';
import { auth } from 'app/firebase/setup';

function Auth() {

    return(
        <div>
        {auth.currentUser ? <><ProtectedContent /><Logout2 action={logout} /></> : <Login2 action={login} /> }
        </div>
    )

};

export default Auth;
```
Example of a server action to handle login:
```jsx
"use server"

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'app/firebase/setup';
import { redirect } from 'next/navigation';

async function login(formData) {
    let errorCode = null;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.get("email"), formData.get("password"));
    } catch(error) {
        console.log("Error");
        console.log(error);
        errorCode = error.code;
    }
    // Note that '/' is the top-level route of our app
    redirect(errorCode === null ? '/' : `/?error=${errorCode}`);
}

export default login;
```

## Exercise

1. Modify your "add song" functionality from last week so that each song added also contains a quantity in stock and price.

2. Add functionality to your Firebase app from last week to allow logged-in users to edit or delete a song. The form should have form fields for ID, new quantity, and new price. There should also be a <code>select</code> box to allow the user to choose between edit or delete. If the user chooses edit,  these three properties should be updated while keeping the rest of the song's data in place. If they choose delete, the song with that ID should be deleted.

3. Convert your app to use *either* client-side React *or* Next.js with server-side components.

4. Add a "buy" button to each search result from your search form in your answer from Question 3 (i.e the React/Next.js version). This button should allow the user to buy a song, using a transaction. This should reduce the quantity of the selected song by one.
