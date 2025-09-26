import { createContext, useState, useEffect } from 'react';
import { get, post } from '../service/apiClient';
import useAuth from '../hooks/useAuth';

const CascadingMenuContext = createContext();

const CascadingMenuProvider = ({ children }) => {
  const [cascadingMenuVisibleId, setCascadingMenuVisibleId] = useState(null);
  const [cohorts, setCohorts] = useState(null);
  const [cohortCourses, setcohortCourses] = useState(null);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    const handleClick = (e) => {
      // Ignore clicks inside any menu root so inner actions can run
      if (e.target && typeof e.target.closest === 'function') {
        const insideMenu = e.target.closest('[data-menu-root="true"]');
        if (insideMenu) return;
      }
      setCascadingMenuVisibleId(null);
    };
    document.addEventListener('click', (e) => {
      setTimeout(() => {
        const insideMenu = e.target.closest('[data-menu-root="true"]');
        if (!insideMenu) setCascadingMenuVisibleId(null);
      }, 0);
    });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const fetchCohorts = async () => {
      const fetchedCohorts = await get('cohorts').then((result) => {
        result.data;
        setCohorts(result.data);
        mapCohortCourses(result.data);
      });
    };

    fetchCohorts();
  }, [loggedInUser]);

  const mapCohortCourses = (data) => {
    const mappedCohortCourses = data.map((cohort) => ({
      id: cohort.id,
      name: `Cohort ${cohort.id}`,
      courses: cohort.courses
    }));
    setcohortCourses(mappedCohortCourses);
  };

  return (
    <CascadingMenuContext.Provider
      value={{ cascadingMenuVisibleId, setCascadingMenuVisibleId, cohorts, cohortCourses }}
    >
      {children}
    </CascadingMenuContext.Provider>
  );
};

export { CascadingMenuContext, CascadingMenuProvider };
