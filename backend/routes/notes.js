const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


// ROUTE 1: Get all the notes using: GET "/api/auth/fetchallnotes" . Requires Login.
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


module.exports = router;
