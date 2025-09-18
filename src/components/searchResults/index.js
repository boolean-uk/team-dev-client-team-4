import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../form/textInput';
import ProfileCircle from '../profileCircle';
import SearchIcon from '../../assets/icons/searchIcon';
import './style.css';
import mapSpecialism from '../../userUtils/mapSpecialism';
import Button from '../button';

const SearchResults = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchVal.trim().length >= 3) {
      setLoading(true);
      const timer = setTimeout(() => {
        fetch(`https://localhost:7233/users?searchTerm=${encodeURIComponent(searchVal)}`)
          .then((res) => res.json())
          .then((data) => {
            const sortedUsers = data.data.users.sort((a, b) => {
              const firstA = a.firstName ?? '';
              const firstB = b.firstName ?? '';
              const lastA = a.lastName ?? '';
              const lastB = b.lastName ?? '';

              const firstNameCompare = firstA.localeCompare(firstB, 'en', { sensitivity: 'base' });
              if (firstNameCompare !== 0) return firstNameCompare;
              return lastA.localeCompare(lastB, 'en', { sensitivity: 'base' });
            });
            setSearchResults(sortedUsers);
          })
          .catch(() => setSearchResults([]))
          .finally(() => setLoading(false));
      }, 400);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchVal]);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  const editSearch = () => {
    inputRef.current?.focus();
  };

  const allResults = () => {
    navigate('/search');
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
        />
      </form>
      {searchVal.trim().length >= 3 && (
        <div className="search-modal">
          <p className="change-text">People</p>
          <hr />
          {loading
            ? (
            <p className="change-text">Loading...</p>
              )
            : searchResults.length > 0
              ? (
              <>
                <ul className="cohort-list">
                  {searchResults.slice(0, 10).map((user) => (
                    <li key={user.id} className="cohort-list-item">
                      <ProfileCircle
                        initials={`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                        userId={user.id}
                        role={user.role.toLowerCase()}
                      />
                      <div className="user-info">
                      <strong>
                        {user?.firstName} {user?.lastName}
                      </strong>
                      <div className="user-specialism">
                        {mapSpecialism(user?.specialism) || 'No specialism'}
                      </div>
                    </div>
                    </li>
                  ))}
                </ul>

                {searchResults.length >= 10 && (
                  <>
                    <br />
                    <Button
                      text="All results"
                      onClick={allResults}
                      classes="button offwhite"
                    />
                  </>
                )}
              </>
                )
              : (
            <span>
              <p className="change-text">Sorry, no results found</p>
              <p className="change-text">Try changing your search term.</p>
              <br />
              <Button
                text={'Edit search'}
                onClick={editSearch}
                classes="button offwhite"
              />
            </span>
                )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
