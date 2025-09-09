import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const StepTwo = ({ data, setData }) => {




  return (
    <>
      <div className="welcome-formheader">
        <h3>Give us ur mobile pls</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            value={data.mobile}
            name="mobile"
            label={'Mobile'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepTwo;
