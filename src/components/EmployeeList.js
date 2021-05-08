import React from "react";

const EmployeeList = (props) => {
  return (
    props.employees.map(employee => <tr>
      <td> <img src ={employee.picture} alt= "thumbnail"/> </td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
    </tr>)
    );
};

export default EmployeeList;