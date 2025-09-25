import { useEffect, useState } from 'react';
import { get } from '../../service/apiClient';
import jwtDecode from 'jwt-decode';
import './style.css';

const MyExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [units, setUnits] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleResponse, setModuleResponse] = useState({})
    
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const decoded = jwtDecode(storedToken);
    const tokenId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    console.log(tokenId)
    const getModules = async() => {
      const tempModules = await get(`modules/by_user/${tokenId}`);
      console.log(tempModules)
      setModuleResponse(tempModules);
      const tempFinishModules = tempModules.map(m => m.isCompleted)
      const tempFinishUnits = tempModules.flatMap(m => m.units).map(u => u.isCompleted)
      const tempFinishExercises = tempModules.flatMap(m => m.units).flatMap(u => u.exercises).map(e => e.isSubmitted)
      setModules(tempFinishModules)
      setUnits(tempFinishUnits)
      setExercises(tempFinishExercises)
    }
    getModules();
  }, []);
  return (
    <>
    <table className="completed-table">
        <tr>
            <td> Modules: </td>
            <td> {modules.filter(m => m === true).length} / {modules.length} completed</td>
        </tr>
        <tr>
            <td> Units: </td>
            <td> {units.filter(m => m === true).length} / {units.length} completed</td>
        </tr>
        <tr>
            <td>Exercises: </td>
            <td> {exercises.filter(m => m === true).length} / {exercises.length} completed</td>
        </tr>
    </table>
    <button className="see-exercises-button">
        See exercises
    </button>
    </>
  )
}

export default MyExercises;
