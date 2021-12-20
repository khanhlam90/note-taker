const router = require("express").Router();
const path = require("path");

//file systems require
const fs = require("fs");

//assign a random id since notes can be deleted
const uuid = require("uuid");

// router GET data from db.json root
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

// router POST data to db.json root
router.post("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"))
    
    //get data from body
    const newNote = req.body;

    // assgin a random id
    newNote.id = uuid.v4();

    //push new notes data to final note json
    notes.push(newNote); 

    // the data goes to the specified location
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    res.json(notes);
  })

  // router DELETE the notes
  router.delete("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));

    const deleteNote = notes.filter((note) => note.id !== req.params.id);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote))

    res.json(deleteNote);
  })

  module.exports = router;
