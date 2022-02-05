import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []   
  const [notes, setNotes] = useState(notesInitial)

 
  //Get all notes
  const getNotes = async()=>{
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMGVkMGFhMmZiYmE5ZDhkZDA2YTE1In0sImlhdCI6MTY0MzE3OTMxMX0.v1OEtLBMeJx1pLd7sXJ0JEnflpRHA4F_jWdW3N9-p4Y"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    //TODO API CALL

     console.log(title,description,tag);
     console.log(host);
     
      const response = await fetch(`${host}/api/notes/addnote`,{

        method:'POST',
        headers:{
          'Content-Type':'application/json',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMGVkMGFhMmZiYmE5ZDhkZDA2YTE1In0sImlhdCI6MTY0MzE3OTMxMX0.v1OEtLBMeJx1pLd7sXJ0JEnflpRHA4F_jWdW3N9-p4Y"
        },
      body: JSON.stringify({title,description,tag})
      }
      );
      const json = response.json();
  console.log(json)
  
        
      
    

  
    
    
    console.log("new note");
    const note = {
      "_id": "61f0ed67a2fbba9d8dd06a1d",
      "user": "61f0ed0aa2fbba9d8dd06a15",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-01-26T06:42:47.393Z",
      "__v": 0,
    };
    setNotes(notes.concat(note));
  };

  
 // Delete a note

 const deleteNote = async (id) => {
  //TODO API CALL
   
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{

    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMGVkMGFhMmZiYmE5ZDhkZDA2YTE1In0sImlhdCI6MTY0MzE3OTMxMX0.v1OEtLBMeJx1pLd7sXJ0JEnflpRHA4F_jWdW3N9-p4Y"
    },
  });

  const json = response.json();
  console.log(json)
  

  console.log("Deleting the note with id" + id);
  const newNotes = notes.filter((note) => {
    return note._id !== id;
  });
  setNotes(newNotes);
};


 // edit a note
 const editNote=async(id,title,description,tag)=>{
   //api call
   //TODO API CALL

    
   const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMGVkMGFhMmZiYmE5ZDhkZDA2YTE1In0sImlhdCI6MTY0MzE3OTMxMX0.v1OEtLBMeJx1pLd7sXJ0JEnflpRHA4F_jWdW3N9-p4Y"
    },
  body: JSON.stringify({title,description,tag})

 });
 const json = await response.json();
 console.log(json)

 let newNotes= JSON.parse(JSON.stringify (notes))

 //logic to edit in client
 for (let index = 0; index < newNotes.length; index++) {
   const element = newNotes[index];
   if(element._id===id)
   {
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;
    break;
   }
  
   
   }
   setNotes(newNotes);
 }
 


  return (
    <NoteContext.Provider value={{ notes, addNote ,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
