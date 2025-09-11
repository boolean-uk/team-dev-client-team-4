import Form from '../../../components/form';
import { useState } from 'react';

const StepThree = ({ data, setData }) => {
    const [selectedOption_role, setSelectedOption_role] = useState();
    const [selectedOption_cohort, setSelectedOption_cohort] = useState();




  return (
    <>
      <div className="welcome-formheader">
        <h3>Step three</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
        
        {/* <select 
          id="dropdown_role" 
          value={data.role} 
          onChange={setData}>
            <option value="">-- Select a role --</option>
            <option value={0}>Student</option>
            <option value={1}>Teacher</option>
        </select> */}

        <select 
          id="dropdown_cohort" 
          value={data.cohortid} 
          onChange={setData}>
            <option value="">-- Select a Cohort --</option>
            <option value={1}>Cohort 1</option>
            <option value={2}>Cohort 2</option>
            <option value={3}>Cohort 3</option>
            <option value={4}>Cohort 4</option>
            <option value={5}>Cohort 5</option>
        </select>

          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepThree;
