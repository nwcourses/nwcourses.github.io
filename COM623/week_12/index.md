# Week 12 - More on Firestore rules, hosting a Firebase app

**Currently incomplete**. Will be ready by the day before the Week 12 session. The Firestore rules section is complete, but hosting a Firebase app is currently missing.

## More on Firestore rules

Last week we looked at some basic Firestore rules. We can make the rules more fine-grained, however, rather than just letting people read or write to the database depending on whether they are logged in or not. Here is an example of a more detailed set of rules:
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /songs/{song} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if !("userId" in resource.data) || resource.data.userId == request.auth.uid
    }
  }
}
```
There are quite a few things here to look at:

- firstly note the `match /songs/{song}` under `match /databases/{database}/documents`. What do these `match` statements mean? The first matches *all* documents in *all* collections. The second, however, matches **only documents in the `songs` collection**. So the rules will only apply to documents inside `songs`.

- note how we can split `write` into different types of write operations, i.e. `create`, `update` and `delete`. 

- the rule for `create` is easy: let the user create a document if they are logged in.

- What about the rule for `update` or `delete` operations? We have a more complex `if` statement here. The rule is saying: allow users to update or delete records if **either** there is no `userId` property (representing the document's creator) in the document, **or** there is a `userId` property, and it matches the user ID of the current user. **Note that `resource.data` represents the document's data**, so `resource.data.userId` represents a property called `userId` within the document.

So, documents without a `userId` can be updated or deleted by anyone. Documents *with* a `userId` can only be updated or deleted by the original creator.

You can even create functions to perform rules tests, e.g:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
  
    function isLoggedIn() {
        return request.auth != null;
    }

    function hasCorrectRights() {
        return !("userId" in resource.data) || resource.data.userId == request.auth.uid;
    }
  
    match /songs/{song} {
      allow read: if true;
      allow create: if isLoggedIn();
      allow update, delete: if isLoggedIn() && hasCorrectRights();
    }
  }
}
```

For more on Firestore rules, see [here](https://firebase.google.com/docs/firestore/security/get-started)


## Hosting a Firebase app

TODO
