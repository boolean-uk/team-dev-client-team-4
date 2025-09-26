import { useEffect, useState } from 'react';
import './style.css';

function NoteListItem({ note }) {
  const [noteState, setNoteState] = useState({});
  useEffect(() => {
    setNoteState(note);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date';
    return date.toLocaleDateString();
  };

  return (
    <li className="note-item">
      <h3 className="note-title">{noteState.title || 'No Title'}</h3>
      <div className="note-meta">
        <p className="note-updated">{formatDate(note.updatedat)}</p>
        <p className="note-content">{noteState.content || ''}</p>
      </div>
    </li>
  );
}

export default NoteListItem;
