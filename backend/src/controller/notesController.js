import Note from "../models/Note.js";

export async function getAll(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (er) {
    console.log(er);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    console.log("New Note Created");
    res.status(201).json({ savedNote });
  } catch (e) {
    console.log("Error in createNote Controller", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getByID(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      console.log(`Note Not found with id:${req.params.id}`);
      return res.status(404).json({ message: "Note not found" });
    }
    console.log("Note Found");
    res.status(200).json(note);
  } catch (er) {
    console.log("Error in getByID Controller", er);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
      },
    );
    if (!updateNote) {
      console.log("Couldn't Update Note: Note not found");
      return res.status(404).json({ message: "The given id does not exist" });
    }
    console.log("Note Updated Successfully");
    res.status(200).json({ message: "Note Updated Successfully", updateNote });
  } catch (e) {
    console.log("Error in updateNote Controller", e);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote)
      return res.status(404).json({ message: "The given id does not exist" });
    console.log(`Note with ${id} Deleted successfully`);
    res.status(200).json({ message: "Deleted Successfully", deleteNote });
  } catch (e) {
    console.log("Error in deleteNote Controller", e);
    res.status(500).json({ message: "Internal Server error" });
  }
}
