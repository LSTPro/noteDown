import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import NotesIcon from '@material-ui/icons/Notes';
import CreateIcon from '@material-ui/icons/Create';
function Header() {
  return (
    <header>
      <h1><NotesIcon /> noteDown <CreateIcon /></h1>
    </header>
  );
}

export default Header;
