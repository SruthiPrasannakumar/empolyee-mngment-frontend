import { useEffect, useState } from 'react'
import './App.css'
import Add from './components/Add';
import Edit from './components/Edit';
import { getAllEmployeeAPI, removeEmployeeAPI, updateEmployeeAPI } from './services/allAPI';


function App() {
    const [updateEmployee,setUpdateEmployee]=useState(false)
    const [allEmployee,setAllEmployee] = useState([])

    useEffect(()=>{
        displayEmployees()
    },[updateEmployee])

    const getButtonClass = (currentStatus) => {
        switch (currentStatus) {
          case 'Active':
            return 'btn btn-success btn-sm dropdown-toggle'; // Green for Active
          case 'Inactive':
            return 'btn btn-warning btn-sm dropdown-toggle'; // yellow for Inactive
          default:
            return 'btn btn-secondary btn-sm dropdown-toggle'; // Default color
        }
      }

    const displayEmployees = async () => {
        try {
            const response = await getAllEmployeeAPI()
            setAllEmployee(response.data)
        }
        catch(err)
        {
            console.log(err);
            
        }
    }

    const handleDelete = async (id) => {
        try {
            await removeEmployeeAPI(id)
            setUpdateEmployee((prev) => !prev)
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleStatusChange = async (newStatus, id) => {
        try {
            // Find the current employee
            const currentEmployee = allEmployee.find(emp => emp.id === id);
    
            // Create a new employee object with updated status
            const updatedEmployee = {
                ...currentEmployee,
                ...(newStatus && { employeeStatus: newStatus }),
            };
    
            // console.log(updatedEmployee); // Log the updated employee
    
            // Update the employee in the server
            const responseUpdate = await updateEmployeeAPI(updatedEmployee.id, updatedEmployee);
    
            // If the response is successful, update the local state
            if (responseUpdate) {
                const updatedEmployees = allEmployee.map((emp) =>
                    emp.id === id ? updatedEmployee : emp
                );
    
                setAllEmployee(updatedEmployees);
                setUpdateEmployee((prev) => !prev); // Trigger a re-fetch if necessary
            }
        } catch (error) {
            console.error('Failed to update the status:', error);
        }
    };

  return (
    <>
      <h1 className='text-center mt-5 fw-bolder text-body-dark'>Employee Management App</h1>

      
      <div className='d-flex justify-content-center my-5 align-items-center'>
            <Add setUpdateEmployee={setUpdateEmployee}/>
            <Edit setUpdateEmployee={setUpdateEmployee}/>
        </div>
      <div className='d-flex justify-content-center align-items-center mt-5 '>
        <div className='rounded  w-75'>
            <table className='table  table-striped w-100'>
              <thead>
                <tr>
                  <td className='text-center fw-bold text-body-secondary fs-5'>#</td>
                  <td className='text-center fw-bold text-body-secondary fs-5'>ID</td>
                  <td className='text-center fw-bold text-body-secondary fs-5'>Username</td>
                  <td className='text-center fw-bold text-body-secondary fs-5'>Email</td>
                  <td className='text-center fw-bold text-body-secondary fs-5'>Status</td>
                  <td className='text-center'></td>
    
                </tr>
              </thead>
              <tbody>
                {
                    allEmployee?.length>0 ?
                        allEmployee?.map((emp,index)=>(
                            <tr  key={emp?.id}>
                                <td className='text-center'>{index+1}</td>
                                <td className='text-center'>{emp?.employeeId}</td>
                                <td className='text-center'>{emp?.employeeName}</td>
                                <td className='text-center'>{emp?.employeeEmail}</td>
                                <td className='text-center'>
                                    <div className="btn-group">
                                        <button className={getButtonClass(emp.employeeStatus)} type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="true" id="statusButton">
                                            {emp?.employeeStatus}
                                        </button>
                                        <ul className="dropdown-menu">
                                                <li className="dropdown-item" onClick={() => handleStatusChange('Active', emp.id)}>
                                                    Active
                                                </li>
                                                <li className="dropdown-item" onClick={() => handleStatusChange('Inactive', emp.id)}>
                                                    Inactive
                                                </li>
                                        </ul>
                                    </div>
                                </td>
                                <td className='text-danger'><i onClick={()=>handleDelete(emp?.id)} className="fa-solid fa-trash"></i></td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan="6" className='text-warning text-center fw-bolder fs-4'>No employees added yet !!!</td>
                        </tr>
                }
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default App
