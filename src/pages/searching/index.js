import ArrowBackIcon from '../../assets/icons/arrowBackIcon';
import './searching.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DetailedSearchResults from '../../components/detailedSearchResults';

const Searching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSearch = location.state?.searchVal || '';
  const [searchVal, setSearchVal] = useState(initialSearch);

  useEffect(() => {
    if (location.state?.searchVal) {
      setSearchVal(location.state.searchVal);
    }
  }, [location.state]);

  const onUserUpdate = (updatedUser) => {
    // Update the user in search results if they exist
    setSearchVal((prev) => prev); // Trigger re-render
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="search-page">
      <div className="search-header">
        <ArrowBackIcon className="back-icon" onClick={goBack} />
        <h3>Search Results</h3>
      </div>
      <DetailedSearchResults searchVal={searchVal} setSearchVal={setSearchVal} onUserUpdate={onUserUpdate} />
    </main>
  );
};

export default Searching;
