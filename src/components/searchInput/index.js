import { useRef } from 'react';
import TextInput from '../form/textInput';
import SearchIcon from '../../assets/icons/searchIcon';
import './style.css';
import CrossCircleIcon from '../../assets/icons/crossCircleIcon';

const SearchInput = ({ searchVal, setSearchVal }) => {
  const inputRef = useRef(null);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  const removeSearch = () => {
    setSearchVal('');
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          icon={<SearchIcon />}
          value={searchVal}
          name="Search"
          onChange={onChange}
          placeholder="Search for people"
          ref={inputRef}
          actionIcon={searchVal !== '' ? <CrossCircleIcon className="cross-icon" onClick={removeSearch} /> : null}
          onActionClick={removeSearch}
        />
      </form>
    </div>
  );
};

export default SearchInput;
