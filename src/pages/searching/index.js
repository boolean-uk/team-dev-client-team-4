import Card from '../../components/card';
import SearchResults from '../../components/searchResults';
import ArrowBackIcon from '../../assets/icons/arrowBackIcon';
import './searching.css';
import { useNavigate } from 'react-router-dom';

const Searching = () => {
  const navigate = useNavigate();

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
        <SearchResults />
      </Card>
    </main>
  );
};

export default Searching;
