// App.jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');

  // 1. FETCH DATA FROM BACKEND WHEN PAGE LOADS
  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // 2. SEND NEW DATA TO BACKEND ON FORM SUBMIT
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!inputText) return;

    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText })
    })
      .then((res) => res.json())
      .then((savedNote) => {
        // Update local state so UI updates instantly without refreshing
        setNotes([...notes, savedNote]);
        setInputText('');
      })
      .catch((err) => console.error('Error saving note:', err));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>Database Connection Demo</h2>

      {/* Form to add data */}
      <form onSubmit={handleAddNote} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Type a note..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Save to DB</button>
      </form>

      {/* List data fetched from MongoDB */}
      <h3>Stored Notes from MongoDB:</h3>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}
