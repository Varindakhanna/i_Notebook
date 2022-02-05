const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const{body,validationResult}=require('express-validator');

// ROUTE 1 :- Get all the Notes using : GET "/api/notes/getuser" . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error ");
  }
})

// ROUTE 2 :- ADD a new note using : POST "/api/notes/addnote" . Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a description of atleast 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors , return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      })

      const savedNote = await note.save()

      res.json(savedNote)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error ");
    }
  }
)

// ROUTE 3 :- UPDATE an existing Note : PUT "/api/notes/updatenote" . Login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>
{
  const{title,description,tag}=req.body;

  // Create a newNote object
  const newNote={};
  if(title){
    newNote.title=title
  };

  if(description){
    newNote.description=description
  };

  if(tag){
    newNote.tag=tag
  };

  // Find the note to be updated and update it

  let note= await Note.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found")
  }
  if(note.user.toString()!==req.user.id)
  {
    return res.status(401).send("Not allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});
})

// ROUTE 4 :- DELETE an existing Note : PUT "/api/notes/deletenote" . Login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>
{

  try {
    // FIND the note to be deleted and delete it
    let note= await Note.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found")
  }

  //Allow detection only if the user owns this Note
  if(note.user.toString()!==req.user.id)
  {
    return res.status(401).send("Not allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success ":"Note has ben deleted",note:note});

    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }

  
})

module.exports = router
