import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList.js";
import Search from "./components/Search.js";
import Header from "./components/Header.js";
 
const App = () => {
  const [notes, setNotes] = useState([
      {
        id: nanoid(),
        text: "Hello World",
        date: "02/12/2007",
      },
      {
        id: nanoid(),
        text: "This is a Test",
        date: "05/07/2005",
      },
      {
        id: nanoid(),
        text: "This is Another Test",
        date: "01/01/2077",
      },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('note-app-data')
    );

    if(savedNotes) {
      setNotes(savedNotes);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'note-app-data', 
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = (text) => {
    console.log(text);
    const date = new Date();

    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes =notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList 
          notes={notes.filter((note) => 
            note.text.toLowerCase().includes(searchText)
          )} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;