import React, { useState ,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  // State
  const [notes, setNotes] = useState([{
    Id:1,
    title:"Creator",
    content:"Likhith S T"
  }]);
  const [errmsg, setErrmsg] = useState(false)

  // setNotes using input from CreateArea component
  function addNote(newNote) {
    if (newNote.title === "" && newNote.content === ""){
      setErrmsg(true);
    }
    else{setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    setErrmsg(false)
  }
  }

  // Deleting notes on call from Note component
  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter(noteItem => {
        return noteItem.Id !== id;
      });
    });
  }
  //Load from Database already existing notes
  useEffect(function onClick(){
     fetch('/users')
       .then(res=> res.json())
       .then(text=>setNotes(prev => {return [...prev , ...text[0]]}))
   },[]);
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />    {/*passing addNote to get the note state*/}
      {errmsg && <p className="errmsg">Type something!</p>}
      {/*maping all the entries of note state*/}
      <ul>

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.Id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </ul>
      <Footer />
    </div>
  );
}

export default App;
