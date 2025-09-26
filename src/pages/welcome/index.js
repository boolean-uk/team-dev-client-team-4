import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepFour from './stepFour';
import './style.css';
import Validator from './validator';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

const Welcome = () => {
  const { onCreateProfile, token } = useAuth();
  const [errors, setErrors] = useState({ firstName: [], lastName: [] });
  const { Required } = Validator();
  const [currentStep, setCurrentStep] = useState(0);

  const decoded = jwtDecode(token);
  const decodedEmail =
    decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    githubUsername: '',
    email: decodedEmail,
    mobile: '',
    password: '',
    role: '',
    cohortid: '',
    bio: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setErrors({ firstName: [], lastName: [] });
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const onComplete = () => {
    let valid = true;
    const newErrors = { firstName: [], lastName: [] };
    if (!Required(profile.firstName)) {
      newErrors.firstName.push('First name is required');
      valid = false;
    }
    if (!Required(profile.lastName)) {
      newErrors.lastName.push('Last name is required');
      valid = false;
    }
    if (valid) {
      onCreateProfile(
        profile.firstName,
        profile.lastName,
        profile.username,
        profile.githubUsername,
        profile.mobile,
        profile.cohortid,
        profile.bio
      );
    } else {
      setErrors(newErrors);
      setCurrentStep(0);
    }
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>
      <Stepper
        header={<WelcomeHeader />}
        onComplete={onComplete}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      >
        <StepOne data={profile} setData={onChange} errors={errors} />
        <StepTwo data={profile} setData={onChange} />
         {/* <StepThree data={profile} setData={onChange} /> */}
        <StepFour data={profile} setData={onChange}/>
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default Welcome;
