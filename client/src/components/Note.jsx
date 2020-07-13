import React from "react";


function Note(props) {
  var display = props.content;
  function handleClick() {
    props.onDelete(props.id);
    fetch("/users",{
      method:"delete",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(props)})
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err=>console.log(err))

  };
  if (display.length > 100){
    display = display.substr(0,105)+"..."
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{display}</p>
      <button onClick={handleClick}>
      delete
      </button>
    </div>
  );
}

export default Note;
