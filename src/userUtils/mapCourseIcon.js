import SquareBracketsIcon from '../assets/icons/squareBracketsIcon';
import { FaJava } from 'react-icons/fa';
import { AiOutlineDotNet } from 'react-icons/ai';

function mapCourseToIcon(courseName) {
  if (courseName === 'Java Development') {
    return (<FaJava size={33}/>);
  }
  if (courseName === '.NET Development') {
    return (<AiOutlineDotNet size={33} />);
  }
  return (<SquareBracketsIcon />);
}

export default mapCourseToIcon;
