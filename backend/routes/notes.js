const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes" . Requires Login.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote" . Requires Login.
router.post("/addnote", fetchuser, [
  body("title", "Enter a valid title.").isLength({ min: 3 }),
  body("description", "Description must be atleast 6 characters.").isLength({ min: 6 }),
], async (req, res) => {

  try {
    // if there are errors return Bad Request, and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    const notes = new Notes({
      title, description, tag, user: req.user.id
    })

    const savedNote = await notes.save()
    res.json(savedNote);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote/:id" . Requires Login.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title
    };
    if (description) {
      newNote.description = description
    };
    if (tag) {
      newNote.tag = tag
    };

    // find the note to be updated and update it
    const notes = await Notes.findById(req.params.id);
    if (!notes) {
      res.status(404).send("Not Found!")
    }
    // Allow user to update if he owns the note.
    if (notes.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed!")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote/:id" . Requires Login.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {
    // find the note to be deleted and delete it
    const notes = await Notes.findById(req.params.id);
    if (!notes) {
      res.status(404).send("Not Found!")
    }
    // Allow user to delete only if he owns the note.
    if (notes.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed!")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been deleted.", note: note });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});


module.exports = router;
