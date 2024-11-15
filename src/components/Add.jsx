import React, { useState } from 'react';
import { addEmployeeAPI } from '../services/allAPI';


const Add = ({setUpdateEmployee}) => {
    const [empId, setEmpId] = useState('');
    const [empName, setEmpName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Select Status');
    const [errors, setErrors] = useState({ empId: '', empName: '', email: '', status: '' });

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleAdd = async () => {
        let valid = true;
        const newErrors = { empId: '', empName: '', email: '', status: '' };

        // Validate Employee ID
        if (!empId) {
            newErrors.empId = 'Employee ID is required.';
            valid = false;
        }

        // Validate Employee Name
        if (!empName) {
            newErrors.empName = 'Employee Name is required.';
            valid = false;
        }

        // Validate Email
        if (!email) {
            newErrors.email = 'Email address is required.';
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
            valid = false;
        }

        // Validate Status
        if (status === 'Select Status') {
            newErrors.status = 'Employee Status is required.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Reset form fields if needed
            const currentEmployeeDetails = {
                employeeId: empId,
                employeeName: empName,
                employeeEmail: email,
                employeeStatus: status,
            }
            // console.log(currentEmployeeDetails);
            
            try {
                const response = await addEmployeeAPI(currentEmployeeDetails);
                if (response.status > 200 && response.status < 300) {
                    alert(`Successfully added employee: ${empName}`);
                    // console.log(response.data);
                    setUpdateEmployee((prev) => !prev)

                    // Reset form fields
                    setEmpId('');
                    setEmpName('');
                    setEmail('');
                    setStatus('Select Status');

                    // Close the modal
                    const modalElement = document.getElementById('exampleModal');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <button className='me-5 fw-bold btn btn-info p-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Employee</button>

            {/*  Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add a new Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="empId" className="form-label">Employee ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="empId"
                                        value={empId}
                                        onChange={(e) => setEmpId(e.target.value)}
                                        required
                                    />
                                    {errors.empId && <div className="text-danger">{errors.empId}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="empName" className="form-label">Employee Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="empName"
                                        value={empName}
                                        onChange={(e) => setEmpName(e.target.value)}
                                        required
                                    />
                                    {errors.empName && <div className="text-danger">{errors.empName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="statusButton" className="form-label me-3">Employee Status</label>
                                    <div className="btn-group">
                                        <button className='btn btn-secondary btn-sm dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false" id="statusButton">
                                            {status}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-item" onClick={() => handleStatusChange('Active')}>
                                                Active
                                            </li>
                                            <li className="dropdown-item" onClick={() => handleStatusChange('Inactive')}>
                                                Inactive
                                            </li>
                                        </ul>
                                    </div>
                                    {errors.status && <div className="text-danger">{errors.status}</div>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleAdd} className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;