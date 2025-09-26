import Card from '../../components/card';
import SearchInput from '../../components/searchInput';
import ArrowBackIcon from '../../assets/icons/arrowBackIcon';
import './searching.css';
import { useNavigate, useEffect } from 'react-router-dom';
import { useState } from 'react';

const Searching = () => {
  const navigate = useNavigate();
  const initialSearch = location.state?.searchTerm || '';
  const [searchVal, setSearchVal] = useState(initialSearch);

  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchVal(location.state.searchTerm);
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
      <Card>
        <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
      </Card>
    </main>
  );
};

export default Searching;
