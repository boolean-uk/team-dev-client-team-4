import { useRef, useState, useEffect, useContext } from 'react';
import TextInput from '../form/textInput';
import SearchIcon from '../../assets/icons/searchIcon';
import './style.css';
import CrossCircleIcon from '../../assets/icons/crossCircleIcon';
import Card from '../card';
import Button from '../button';
import { API_URL } from '../../service/constants';
import ProfileCircle from '../profileCircle';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import MenuItem from '../menu/menuItem';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';
import mapCourseToIcon from '../../userUtils/mapCourseIcon';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import useDialog from '../../hooks/useDialog';
import MoveToCohortConfirm from '../moveToCohortConfirm';
import Menu from '../menu';
import DropdownPortal from '../dropdownPortal/dropdownPortal';

const DetailedSearchResults = ({ searchVal, setSearchVal, onUserUpdate }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const userMenuRefs = useRef({});
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const { cohortCourses, cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [userMenuOpen, setUserMenuOpen] = useState({});

  const toggleMenu = (e, safeKey) => {
    e.stopPropagation();
    const el = userMenuRefs.current[safeKey];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + window.scrollX + 130
    });

    setCascadingMenuVisibleId((prev) => (prev === safeKey ? null : safeKey));
  };

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
                              {(user?.specialism) || 'No specialism'}
                            </div>
                          </div>
                          <div className="options-text-container">
                            <p className="profile-text" onClick={() => goToProfilePage(uid)}>Profile</p>
                            {loggedInUser.role?.toLowerCase() === 'teacher' && user.role?.toLowerCase() === 'student' && (
                              <>
                              <p className="add-note-text">Add Note</p>
                              <div
                                className="move-cohort-text"
                                ref={(el) => (userMenuRefs.current[uid] = el)}
                                onClick={(e) => {
                                  toggleMenu(e, uid);
                                  setUserMenuOpen((prev) => ({ ...prev, [uid]: !prev[uid] }));
                                }}
                              >
                              Move to Cohort
                                {uid === cascadingMenuVisibleId && (
                                <DropdownPortal position={menuPosition}>
                                  <SearchCascadingMenu
                                    id={uid}
                                    name={user?.firstName + ' ' + user?.lastName}
                                    currentCohortId={user?.cohortId}
                                    onUserUpdate={onUserUpdate}
                                    loggedInUser={loggedInUser}
                                    cohorts={cohortCourses}
                                    userMenuOpen={userMenuOpen}
                                  />
                                </DropdownPortal>
                                )}
                              </div >
                            </>
                            )}
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

const SearchCascadingMenu = ({
  id,
  onUserUpdate,
  userMenuOpen,
  cohorts,
  name
}) => {
  const { setDialog, openDialog } = useDialog();

  const showMoveToCohortDialog = (course, cohort, newCohortId, newCourseId) => {
    setDialog(
      `Move ${name} to new cohort?`,
      <MoveToCohortConfirm
        userToMoveId={id}
        newCohortId={newCohortId}
        newCourseId={newCourseId}
        onUserUpdate={onUserUpdate}
      />,
      <div className="dialog-texts">
        <div>
          Are you sure you want to move this user to <br />
          {course}, {cohort}?
        </div>
      </div>
    );
    openDialog();
  };

  return (
    <Menu className="profile-circle-menu" data-menu-root="true">
      {userMenuOpen[id] &&
        cohorts &&
        cohorts.map((cohort) => (
          <MenuItem key={cohort.id} icon={<SquareBracketsIcon />} text={cohort.name}>
            {cohort.courses.map((c) => (
              <MenuItem
                key={c.id}
                icon={mapCourseToIcon(c.name)}
                text={c.name}
                onClick={() => showMoveToCohortDialog(cohort.name, c.name, cohort.id, c.id)}
              />
            ))}
          </MenuItem>
        ))}
        </Menu>
  );
};

export default DetailedSearchResults;
