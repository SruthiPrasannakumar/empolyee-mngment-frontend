import React, { useEffect, useState } from 'react';
import { getAllEmployeeAPI, updateEmployeeAPI } from '../services/allAPI';


const Edit = ({setUpdateEmployee}) => {
    // Create state variables for each input field
    const [empId, setEmpId] = useState('');
    const [empName, setEmpName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Select Status');
    const [isStatusSelected, setIsStatusSelected] = useState(false);

    useEffect(() => {
        // console.log('Changes detected in edit operation.');
        setUpdateEmployee((prev) => !prev)
        // Perform actions you want when changes occur
    }, [empId, empName, email, status, isStatusSelected])

    // Update the state when the input value changes
    const handleEmpIdChange = (event) => {
        setEmpId(event.target.value);
    }

    const handleEmpNameChange = (event) => {
        setEmpName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsStatusSelected(true); // Set to true if status is changed
    }

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to handle the Edit action
    const handleEdit = async () => {
        if (!empId) {
            alert('Please enter a valid employee ID to edit.');
        } else if (!empName && !email && !isStatusSelected) {
            alert('Please enter the details to be changed in order to continue editing.');
        } else if (email && !validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else {

            try{
                const response = await getAllEmployeeAPI();
                const allEmployee = response.data;
                let currentEmployee = allEmployee.find((emp) => emp.employeeId === empId);

                if (!currentEmployee) {
                    alert('Employee not found.');
                    return;
                }

                // Update currentEmployee properties based on the form input
                currentEmployee = {
                    ...currentEmployee,
                    ...(empName && { employeeName: empName }),
                    ...(email && { employeeEmail: email }),
                    ...(isStatusSelected && { employeeStatus: status }),
                }
                // console.log(currentEmployee);
                

                // Update the employee in the server
                const responseUpdate = await updateEmployeeAPI(currentEmployee.id, currentEmployee);
                // console.log(responseUpdate.data);
                

                alert(`Successfully updated employee details of ${empId}`);

                // Clear form fields
                setEmpId('');
                setEmpName('');
                setEmail('');
                setStatus('Select Status');
                setIsStatusSelected(false);

                // Close the modal
                const modalElement = document.getElementById('exampleModal1');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();
            }
            catch(err)
            {
                console.log(err);
                alert('Failed to update employee details.');
            }
        }
    }

    return (
        <>
            <button className='ms-5 fw-bold btn btn-danger p-3' data-bs-toggle="modal" data-bs-target="#exampleModal1">
                Edit Employee details
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit employee details</h1>
                            
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <p className='text-danger-emphasis'>*Employee Id is required.Fill the fields that needs to be changed from the rest.</p>
                                <div className="mb-3">
                                    <label htmlFor="empId1" className="form-label">Employee ID<span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control" id="empId1" value={empId} onChange={handleEmpIdChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="empName1" className="form-label">Employee Name</label>
                                    <input type="text" className="form-control" id="empName1" value={empName} onChange={handleEmpNameChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email1" value={email} onChange={handleEmailChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="statusButton1" className="form-label me-3">Employee Status</label>
                                    <div className="btn-group">
                                        <button className='btn btn-secondary btn-sm dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false" id="statusButton1">
                                            {status}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-item" onClick={() => handleStatusChange('Active')}>Active</li>
                                            <li className="dropdown-item" onClick={() => handleStatusChange('Inactive')}>Inactive</li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;