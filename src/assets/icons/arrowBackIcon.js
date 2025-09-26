import { AiOutlineArrowLeft } from 'react-icons/ai';

const ArrowBackIcon = ({ size = 30, color = 'currentColor', ...props }) => {
  return <AiOutlineArrowLeft size={size} color={color} {...props} />;
};

export default ArrowBackIcon;