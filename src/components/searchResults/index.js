import { useState, useEffect } from 'react';
import TextInput from '../form/textInput';
import ProfileCircle from '../profileCircle';
import SearchIcon from '../../assets/icons/searchIcon';
import './style.css';

const SearchResults = () => {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchVal.trim().length >= 3) {
      setLoading(true);
      const timer = setTimeout(() => {
        fetch(`https://localhost:7233/users?searchTerm=${encodeURIComponent(searchVal)}`)
          .then((res) => res.json())
          .then((data) => setSearchResults(data.data.users))
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

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          icon={<SearchIcon />}
          value={searchVal}
          name="Search"
          onChange={onChange}
          placeholder="Search for people"
        />
      </form>
      {searchVal.trim().length >= 3 && (
        <div className="search-modal">
          <p style={{ margin: '16px 0 4px 0', fontWeight: 'bold' }}>People</p>
          <hr />
          {loading ? (
            <p style={{ color: '#888', marginTop: '8px' }}>Loading...</p>
          ) : searchResults.length > 0 ? (
            <ul className="cohort-list">
              {searchResults.map((user) => (
                <li key={user.id} className="cohort-list-item">
                  <ProfileCircle
                    initials={`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                    userId={user.id}
                    role={user.role.toLowerCase()}
                  />
                  <strong style={{ marginLeft: '8px' }}>
                    {user?.firstName} {user?.lastName}
                  </strong>
                </li>
              ))}
            </ul>
          ) : (
            <span>
              <p style={{ color: '#888', marginTop: '8px' }}>Sorry, no results found</p>
              <p style={{ color: '#888', marginTop: '8px' }}>Try changing your search term.</p>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
