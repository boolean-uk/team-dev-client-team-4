import ProfileIcon from '../../../assets/icons/profileIcon';
import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const StepOne = ({ data, setData, errors }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            value={data.firstName}
            name="firstName"
            label={'First name*'}
            errors={errors.firstName}
          />
          <TextInput
            onChange={setData}
            value={data.lastName}
            name="lastName"
            label={'Last name*'}
            errors={errors.lastName}
          />
          <TextInput onChange={setData} value={data.username} name="username" label={'Username'} />
          <TextInput
            onChange={setData}
            value={data.githubUsername}
            name="githubUsername"
            label={'Github Username'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepOne;
