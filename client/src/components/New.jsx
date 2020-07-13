import React, { useState, useEffect} from 'react';
function New(){
  const [state, setState] = useState([]);

function onClick(){
   fetch('/users')
     .then(res=> res.json())
     .then(text=>setState(prev => {return [...prev , ...text]}))
 }
  return (
    <div>
      {state.map((user,index) =>{return(<div key={index}>{user.username} {user.password}</div>)})}
      <button onClick={onClick}>Get Data</button>
    </div>

  );
}
export default New;
