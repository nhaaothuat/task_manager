const NoteSchema = require("../models/note.model");

const getAllNote = async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await NoteSchema.find({ userId: user._id }).sort({
      isPinned: -1,
    });

    return res.json({
      error: false,
      notes,
      message: "All note is here",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new NoteSchema({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note add successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Something went wrong" });
  }
};

const editNote = async (req, res) => {
  const noteId = req.params.noteId;

  const { title, content, tags, isPinned } = req.body;

  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "No change" });
  }

  try {
    const note = await NoteSchema.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title; 

    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;

  const { user } = req.user;
  try {
    const note = await NoteSchema.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    await NoteSchema.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const updateandpinNote = async (req, res) => {
  const noteId = req.params.noteId;

  const { isPinned } = req.body;

  const { user } = req.user;

  try {
    const note = await NoteSchema.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

     note.isPinned = isPinned ;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note pinned successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const searchNote = async (req,res)=>{
  const {user} = req.user

  const {query}  =req.query

  if(!query){
    return  res.status(400).json({error:true, message:"Search query is required"})
  }

  try {
    const matchingNotes = await NoteSchema.find({
      userId:user._id,
      $or:[
        {title:{$regex: new RegExp(query,"i")}},
        {content: {$regex: new RegExp(query,"i")}}
      ]
    })

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query successfully"
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Non"
    })
  }
}

module.exports = {
  addNote,
  editNote,
  getAllNote,
  deleteNote,
  updateandpinNote,
  searchNote
};
