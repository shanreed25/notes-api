# Notes API

**The Notes API has full CRUD (Create, Read, Update, Delete) functionality and is protected by authentication middleware, so only logged-in users can access the endpoints and uthorization logic to ensure that users can only access and manage the notes they personally own.**


- [X] **Register:** ` POST /api/users/register`
```json
{ 
    "username": "shannon-builds", 
    "email": "shannon@example.com", 
    "password": "passwordshannon123" 
}

```
- [X] **Login:** `POST /api/users/login`
```json
{  
    "email": "shannon@example.com", 
    "password": "passwordshannon123" 
}

```
- [X] **Create Note:** `POST /api/notes`
> Log in or register a user and copy the token. Put the token in the request's Auth tab Bearer Token or Authorization header, then send the note body as json in the body tab

```json
{ 
    "title": "Express Middleware", 
    "content": "Middleware runs between the request and the response. Call next() to pass control to the next function."
}
```

- [X] **View Notes for logged user:** `GET /api/notes`
> Log in or register a user and copy the token. Put the token in the request's Auth tab Bearer Token or Authorization header, then send the request


- [X] **Update User Note:** `PUT api/notes/:id`
> Log in a user and copy the token. Put the token in the request's Auth tab Bearer Token or Authorization header, then send the note body as json in the body tab

> Sending a request can have a title and/or content, you can also send a user fiels with an id but it will be reject/deleted and no errors

- [X] **Delete User Note:** `DELETE api/notes/:id`
> Log in a user and copy the token. Put the token in the request's Auth tab Bearer Token or Authorization header, then make the delete request
---


###  Associate Notes with Users
- [X] **Update the Note Model:** Add a new field to the Note schema (`models/Note.js`). This field should be named `user` (or `owner`) and should store the `ObjectId` of the user who created the note. It should be a required reference to the User model.
- [X] **Modify the “Create Note” Route:** In your notes route file (`routes/api/noteRoute.js`), find the `POST /` route. When a new note is created, you must associate it with the currently logged-in user. The authenticated user’s data should be available on `req.user` from the authentication middleware. Save the user’s `_id` to the new note’s user field.

###  Implement Ownership-Based Authorization
- [X] **Filter “Get All Notes”:** Modify the `GET /` route. Instead of returning all notes in the database, it should now only return the notes where the user field matches the `_id` of the currently authenticated user (`req.user._id`).
- [X] **Secure “Update Note”:** Modify the `PUT /:id` route. Before updating a note, you must first find the note by its ID. Then, check if the user field on that note matches the authenticated user’s `_id`.
    - [ ] If they match, proceed with the update.
    - [X] If they do not match, return a 403 Forbidden status with an error message like "User is not authorized to update this note."

### Secure “Delete Note”: Modify the DELETE /:id route. Similar to the update route, you must check for ownership before deleting a note.
- [X] Find the note by its ID.
- [X] If the user is the owner, delete the note.
- [X] If the user is not the owner, return a 403 Forbidden status with an appropriate error message.

### Secure “Get Single Note”: 
- [X] If you have a GET /:id route, apply the same ownership check there as well.