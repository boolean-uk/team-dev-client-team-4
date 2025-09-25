import { useEffect, useState } from 'react';
import { get } from '../../service/apiClient';
import NoteListItem from './noteListItem';
import './style.css';
import ProfileCard from './profileCard';
import NoteSearch from './noteSearch';

function NotesList({ user }) {
  const [allNotes, setAllNotes] = useState([]);
  const [visibleNotes, setVisibleNotes] = useState([]); 
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await get(`users/${user.id}/notes`);
        const notedata = response.data.notes || [];
        setAllNotes(notedata);
        setVisibleNotes(notedata);
        setIsLoaded(true);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setIsLoaded(true); 
      }
    };
    getNotes();
  }, []);

  return (
    <div className="notes-container">
      <h3>Notes</h3> <></>
      <hr className="main-border"></hr>
      <ProfileCard user={user}></ProfileCard>

      <NoteSearch allNotes={allNotes} setVisibleNotes={setVisibleNotes} />

      <hr className="main-border"></hr>
      {!isLoaded && <p className="loading">Loading notes...</p>}
        <ul className="notes-list">
        {visibleNotes.map(note => (
            <NoteListItem key={note.id} note={note} />
        ))}
        </ul>
    </div>
  );
}

export default NotesList;
