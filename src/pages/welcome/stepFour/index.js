import Form from '../../../components/form';

const StepFour = ({ data, setData }) => {
  const bioInfo = 'Tell us about yourself, your professional and educational highlights to date...';

  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs no-gap">
          <label htmlFor="bio">Bio</label>
          <textarea name="bio" value={data.bio} onChange={setData} placeholder={bioInfo} maxLength={300}></textarea >
          <p className="bio-count">{(data.bio || '').length}/300</p>
        </div>
      </Form>
    </>
  );
};

export default StepFour;
