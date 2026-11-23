# Notes API

**The Notes API has full CRUD (Create, Read, Update, Delete) functionality and is protected by authentication middleware, so only logged-in users can access the endpoints and uthorization logic to ensure that users can only access and manage the notes they personally own.**


###  Associate Notes with Users
- [X] **Update the Note Model:** Add a new field to the Note schema (`models/Note.js`). This field should be named `user` (or `owner`) and should store the `ObjectId` of the user who created the note. It should be a required reference to the User model.
- [ ] **Modify the “Create Note” Route:** In your notes route file (`routes/api/notes.js`), find the `POST /` route. When a new note is created, you must associate it with the currently logged-in user. The authenticated user’s data should be available on `req.user` from the authentication middleware. Save the user’s `_id` to the new note’s user field.