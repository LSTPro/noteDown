import React, { useState } from "react";
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import { v1 as uuidv1 } from 'uuid';
function CreateArea(props) {
  //States for autoFocus and notetake
  const [state, setState] = useState(false);
  const [note, setNote] = useState({
    Id:"",
    title: "",
    content: ""
  });

  //Expand on Click
  function expand(){
    setState(true)
  }
  // setNote with user input "continuous update"
  function handleChange(event) {
     const i = uuidv1();
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value,
        Id:i
      };
    });
  } 
  
 //Export note to the App.jsx and to the Backend route"/"
  function submitNote(event) {
    props.onAdd(note);
    fetch("/users",{
      method:"post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(note)})
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err=>console.log(err))

    setNote({
      Id:"",
      title: "",
      content: ""
    });
    // event.preventDefault();
  }

  return (
    <div>
      <form className="create-note" autoCorrect="on">
      {state &&  <input
          id="title"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          autoFocus={state?true:false}
        />}
        <textarea
          id = "Projectone"
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={state?"3":"1"}
          onClick={expand}
        />
        <Zoom in={state}>
        <Fab onClick={submitNote}>
        <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
