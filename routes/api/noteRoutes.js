import { Router } from "express";
import Note  from "../../models/Note.js";
import { authMiddleware } from "../../utils/auth.js";
 
const router = Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);
 
// GET /api/notes - Get all notes for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get('/', async (req, res) => {
  // This currently finds all notes in the database.
  // It should only find notes owned by the logged in user.
  try {
    const notes = await Note.find({user: req.user._id});
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/notes/:id - Get one note (optional part of the lab)
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note found with this id!" });
    }

    
    const noteUserId = note.user.toString();//
    const userOwns = noteUserId === req.user._id
    // If User is logged in, but not the owner.
    if(!userOwns){
      return res.status(403).json({ message: 'User is not authorized to view this note.'});
    }


    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// POST /api/notes - Create a new note
router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      // The user ID needs to be added here
      user: req.user._id,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    /*
      with findByIdAndUpdate anyone could change any note
      findById() finds the note and returns 404 if it does not exist
    */
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

    //console.log(req.user);// { username, email, _id }, the authmiddleware is how this route has access to the user object
    
    
    //console.log(note.user);//object
    //console.log(req.user._id);//string
    const noteUserId = note.user.toString()
    const userOwns = noteUserId === req.user._id
    if(!userOwns){
      return res.status(403).json({ message: 'User is not authorized to update this note.'});
    }

    
    const newNote = { ...req.body };
    //console.log(req.body);// this route allows a user to be passed with the note but this should not be allowed
    //so if the body has something like { title: "Hello", user: "43748dghw8" }, delete the user field
    delete newNote.user;
    //console.log(newNote);

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, newNote, {returnDocument: "after", runValidators: true,})


    res.json(updatedNote);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

    const noteUserId = note.user.toString();//
    const userOwns = noteUserId === req.user._id

    if(!userOwns){
      return res.status(403).json({ message: 'User is not authorized to delete this note.'});
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
export default router;