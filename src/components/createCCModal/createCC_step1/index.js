/* eslint-disable */

import { useState, useEffect } from 'react';
import useModal from '../../../hooks/useModal';
import './style.css';
import Button from '../../button';
import useAuth from '../../../hooks/useAuth';
import useDialog from '../../../hooks/useDialog';
import { API_URL } from '../../../service/constants';
import CreateCohortCourseModal_step2 from '../createCC_step2';
import Card from '../../card';

const CreateCohortCourseModal_step1 = ({ closeModal }) => {
  const { loggedInUser } = useAuth();
  const { showActionSuccessPopup } = useDialog();

  const [step, setStep] = useState(1);
  const [courseList, setCourseList] = useState([]);
  const [cohortList, setCohortList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');
  const [selectedCohortObj, setSelectedCohortObj] = useState();
  const [createCC_data, setCreateCC_data] = useState({
    courseId: null,
    cohortId: null,
  });

  useEffect(() => {
    fetch(`${API_URL}/courses/info`)
      .then((res) => res.json())
      .then((data) => {
        setCourseList(data);
      })
      .catch(() => { setCourseList([]); });

    fetch(`${API_URL}/cohorts`)
      .then((res) => res.json())
      .then((data) => {
        setCohortList(data.data);
        console.log("fetched cohorts:", data.data);
      })
      .catch(() => { setCohortList([]); });
  }, []);

  useEffect(() => {
    const c = cohortList.find(c => c.id.toString() === selectedCohort);
    setSelectedCohortObj(c);
    console.log("selected cohort:", c);
  }, [selectedCohort, cohortList]);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={closeModal}>&times;</button>
        <Card style={{ width: '25vw', boxShadow: 'none', background: 'transparent' }}>
          {step === 1 && (
            <>
              <section className="create-cohort-course-header">
                <h2>Add Cohort</h2>
                <p>Create a new cohort</p>
              </section>
              <hr />

              <form className="form-basic-info">
                {/* Course Dropdown */}
                <section>
                  <label htmlFor="course-select">Course:</label>
                  <select
                    id="course-select"
                    className="form-input"
                    value={selectedCourse}
                    onChange={e => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Select a course</option>
                    {courseList.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </section>

                <section>
                  <label htmlFor="cohort-select">Cohort:</label>
                  <select
                    id="cohort-select"
                    className="form-input"
                    value={selectedCohort}
                    onChange={e => {
                      setSelectedCohort(e.target.value);
                      console.log("target val:", e.target.value);
                    }}
                  >
                    <option value="">Select a cohort</option>
                    {cohortList.map(cohort => (
                      <option key={cohort.id} value={cohort.id}>{cohort.cohortName}</option>
                    ))}
                  </select>
                </section>

                {/* Start Date and End Date fields */}
                <section>
                  <label htmlFor="start-date">Start Date: </label>
                  <input
                    id="start-date"
                    type="text"
                    className="form-input"
                    value={selectedCohortObj?.startDateFormatted || ''}
                    readOnly
                  />
                </section>
                <section>
                  <label htmlFor="end-date">End Date: </label>
                  <input
                    id="end-date"
                    type="text"
                    className="form-input"
                    value={selectedCohortObj?.endDateFormatted || ''}
                    readOnly
                  />
                </section>
              </form>

              <section className="create-cohort-course-actions">
                <Button
                  text="Cancel"
                  onClick={closeModal}
                />

                <Button
                  text="Next"
                  onClick={() => {
                    setCreateCC_data({
                      ...createCC_data,
                      courseId: selectedCourse,
                      cohortId: selectedCohort,
                      courseName: courseList.find(c => c.id.toString() === selectedCourse)?.name || '',
                      cohortName: cohortList.find(c => c.id.toString() === selectedCohort)?.cohortName || '',
                      startDate: selectedCohortObj?.startDateFormatted || '',
                      endDate: selectedCohortObj?.endDateFormatted || ''
                    });
                    setStep(2);
                  }}
                />
              </section>
            </>
          )}
          {step === 2 && (
            <CreateCohortCourseModal_step2 createCC_data={createCC_data} closeModal={closeModal} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default CreateCohortCourseModal_step1;

