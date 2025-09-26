import { useRef, useState, useEffect } from 'react';
import TextInput from '../form/textInput';
import SearchIcon from '../../assets/icons/searchIcon';
import './style.css';
import CrossCircleIcon from '../../assets/icons/crossCircleIcon';
import Card from '../card';
import Button from '../button';
import { API_URL } from '../../service/constants';
import ProfileCircle from '../profileCircle';
import mapSpecialism from '../../userUtils/mapSpecialism';
import { useNavigate } from 'react-router-dom';

const DetailedSearchResults = ({ searchVal, setSearchVal }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchVal.trim().length >= 3) {
      setLoading(true);
      const timer = setTimeout(() => {
        fetch(`${API_URL}/users?searchTerm=${encodeURIComponent(searchVal)}`)
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

  const removeSearch = () => {
    setSearchVal('');
  };

  const editSearch = () => {
    inputRef.current?.focus();
    inputRef.current.setSelectionRange(0, inputRef.current.value.length);
  };

  const goToProfilePage = (uid) => {
    navigate(`/profile/${uid}`, { replace: false });
  }

  return (
    <div>
      <Card>
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
      </Card>
      <Card>
        <div>
          <p className="change-text-searchResults">People</p>
          <hr />
          {searchVal.trim().length < 3 && (
              <div>
                  <p className="change-text-error">Please enter at least 3 characters to see results</p>
                  <Button
                  text={'Edit search'}
                  onClick={editSearch}
                  classes="button offwhite"
                />
            </div>
          )}

          {searchVal.trim().length >= 3 && (
            <div className="search-modal">
              {loading
                ? (
                <p className="change-text">Loading...</p>
                  )
                : searchResults.length > 0
                  ? (
                  <>
                    <ul className="cohort-list">
                      {searchResults.map((user, idx) => {
                        const uid = user.id ?? user.userId ?? user.user_id ?? idx;
                        return (
                        <li key={uid} className="cohort-list-item">
                          <ProfileCircle
                            initials={`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                            uniqueKey={`search-${uid}`}
                            userId={uid}
                            role={(user.role || '').toLowerCase()}
                            name={user?.firstName + ' ' + user?.lastName}
                          />
                          <div className="user-info">
                            <strong>
                              {user?.firstName} {user?.lastName}
                            </strong>
                            <div className="user-specialism">
                              {mapSpecialism(user?.specialism) || 'No specialism'}
                            </div>
                          </div>
                          <div className="options-text-container">
                            <p className="profile-text" onClick={() => goToProfilePage(uid)}>Profile</p>
                          </div>
                        </li>
                        );
                      })}
                    </ul>
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
      </Card>
    </div>
  );
};

export default DetailedSearchResults;
