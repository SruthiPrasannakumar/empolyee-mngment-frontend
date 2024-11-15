import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"


// addEmployeeapi - api must call by Add component
export const addEmployeeAPI = async (employee) => {
    return await commonAPI("POST",`${SERVER_URL}/allEmployees`,employee)
 }


 // getAllEmployeeAPI - called by add component
export const getAllEmployeeAPI = async () => {
    return await commonAPI("GET",`${SERVER_URL}/allEmployees`,"")
}

// updateEmployeeAPI - called by edit
export const updateEmployeeAPI = async (id,changedDetails) => {
    return await commonAPI("PUT",`${SERVER_URL}/allEmployees/${id}`,changedDetails)
}

//removeEmployeeAPI - called by Category
export const removeEmployeeAPI = async (id) => {
    return await commonAPI("DELETE",`${SERVER_URL}/allEmployees/${id}`,{})
}
 