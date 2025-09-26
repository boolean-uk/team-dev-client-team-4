import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./userContext";
import { API_URL } from "../service/constants";

const myCohortCourseContext = createContext();

const CohortProvider = ({ children }) => {
  const { user } = useContext(userContext);
  const [cohort, setCohort] = useState(null);
  const [loadingCohort, setLoadingCohort] = useState(true);

  useEffect(() => {
    setCohort(null);
    if (user) {
      setLoadingCohort(true);
      fetch(`${API_URL}/cohortcourses/${user.cohortId}`)
        .then((res) => res.json())
        .then((cohort) => {
          setCohort(cohort);
          setLoadingCohort(false);
        })
        .catch(() => {
          setCohort(null);
          setLoadingCohort(false);
        });
    }
    else {
      setLoadingCohort(false);
    }
  }, [user?.cohortId]);

  if (loadingCohort === null) { return "Loading cohortContext" }
  return (
    <myCohortCourseContext.Provider value={{ cohort }}>
        {children}
    </myCohortCourseContext.Provider>
  )
}

export { myCohortCourseContext, CohortProvider }
