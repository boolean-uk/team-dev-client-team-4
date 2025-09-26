import { useEffect, useState } from 'react';
import './style.css';

function NoteListItem({ note }) {
  const [noteState, setNoteState] = useState({});
  useEffect(() => {
    setNoteState(note);
  }, []);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

  return (
    <li className="note-item">
      <p className="note-title">{noteState.title || 'No Title'}</p>
      <div className="note-meta">
        <p className="note-updated">{formatDate(note.updatedat)}</p>
        <p className="note-content">{noteState.content || ''}</p>
      </div>
      <hr />
    </li>
  );
}

export default NoteListItem;
