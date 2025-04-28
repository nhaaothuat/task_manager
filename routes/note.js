const express = require("express");
const {
  addNote,
  editNote,
  getAllNote,
  deleteNote,
  updateandpinNote,
  searchNote
} = require("../controllers/noteController");

const router = express.Router();

router.get("/getallnote", getAllNote);
router.post("/addnote", addNote);
router.put("/editnote/:noteId", editNote);
router.delete("/deletenote/:noteId",deleteNote)
router.put("/updateandpin/:noteId",updateandpinNote)
router.get("/searchnote", searchNote)

module.exports = router;
