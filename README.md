# Notes API

**The Notes API has full CRUD (Create, Read, Update, Delete) functionality and is protected by authentication middleware, so only logged-in users can access the endpoints and uthorization logic to ensure that users can only access and manage the notes they personally own.**


###  Associate Notes with Users
- [X] **Update the Note Model:** Add a new field to the Note schema (`models/Note.js`). This field should be named `user` (or `owner`) and should store the `ObjectId` of the user who created the note. It should be a required reference to the User model.
- [X] **Modify the “Create Note” Route:** In your notes route file (`routes/api/noteRoute.js`), find the `POST /` route. When a new note is created, you must associate it with the currently logged-in user. The authenticated user’s data should be available on `req.user` from the authentication middleware. Save the user’s `_id` to the new note’s user field.

###  Implement Ownership-Based Authorization
- [ ] Filter “Get All Notes”: Modify the `GET /` route. Instead of returning all notes in the database, it should now only return the notes where the user field matches the `_id` of the currently authenticated user (`req.user._id`).
- [ ] Secure “Update Note”: Modify the `PUT /:id` route. Before updating a note, you must first find the note by its ID. Then, check if the user field on that note matches the authenticated user’s `_id`.
- [ ] If they match, proceed with the update.
- [ ] If they do not match, return a 403 Forbidden status with an error message like "User is not authorized to update this note."