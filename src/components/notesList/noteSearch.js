import TextInput from "../form/textInput";
import SearchIcon from "../../assets/icons/searchIcon";
import { useState, useRef, useEffect } from "react";
import './style.css';

function NoteSearch({ allNotes, setVisibleNotes }) {
  const [searchVal, setSearchVal] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const val = searchVal.trim().toLowerCase();

      if (val === '') {
        setVisibleNotes(allNotes); 
      } else {
        const filteredNotes = allNotes.filter(n =>
          n?.title?.toLowerCase().includes(val) ||
          n?.content?.toLowerCase().includes(val)
        );
        setVisibleNotes(filteredNotes);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchVal, allNotes, setVisibleNotes]);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="note-search-form">
      <div className="note-search-wrapper">
        <TextInput
          icon={<SearchIcon />}
          value={searchVal}
          name="Search"
          onChange={onChange}
          placeholder="Search for notes"
          ref={inputRef}
        />
      </div>
    </form>
  );
}

export default NoteSearch;
