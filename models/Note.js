import { Schema, model } from "mongoose";

// This is the model you will be modifying
const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /*Acceptance Criteria
    The Note model includes a required user field referencing the User model.
*/
  user: { 
    type: Schema.Types.ObjectId, //user's id
    ref: "User", // which model the id belongs to
    required: true 
  },
});

const Note = model("Note", noteSchema);

export default Note;
