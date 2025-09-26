import SearchInput from '../../components/detailedSearchResults';
import ArrowBackIcon from '../../assets/icons/arrowBackIcon';
import './searching.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="search-page">
      <div className="search-header">
        <ArrowBackIcon className="back-icon" onClick={goBack} />
        <h3>Search Results</h3>
      </div>
      <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
    </main>
  );
};

export default Searching;
