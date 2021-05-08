import React, { Component } from "react";
import axios from "axios"
import EmployeeList from "./EmployeeList"
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

class Employee extends Component{

    state= {
        employees:null,
        filteredEmployees:null,
        sortOrder:'asc'
    }
    
    getEmployeeDetails = () => {
        return axios.get('https://randomuser.me/api/?results=10&inc=phone,name,email,picture')
        .then(response => {
            this.setState({
                    employees:response.data.results
                    .map(result => {
                        return {
                            picture: result.picture.thumbnail,
                            name: `${result.name.first} ${result.name.last}`,
                            email: result.email,
                            phone: result.phone
                        }
                    })
                })
        })
    }

    componentDidMount(){
        this.getEmployeeDetails();
    }

    sortEmployee = () => {
        if(this.state.filteredEmployees !== null){
            this.setState({
                filteredEmployees:_.orderBy((this.state.filteredEmployees), ['name'], [this.state.sortOrder]),
                sortOrder: this.state.sortOrder === "asc" ? "desc" : "asc"
                
            }
        )
        } else {
            this.setState({
                employees:_.orderBy((this.state.employees), ['name'], [this.state.sortOrder]),
                sortOrder: this.state.sortOrder === "asc" ? "desc" : "asc"
            }
        )
        }
        
    }

    handleInputChange = event =>{
        const searchValue= event.target.value
        if(searchValue){
            const filteredEmployee = this.state.employees.filter(employee => {
            if(employee.name.toLowerCase().includes(searchValue)){
                return employee
            }
        })
        this.setState({filteredEmployees:filteredEmployee})
        } else {
            this.setState({filteredEmployees:null})
        }
        
    }

    render(){
        // console.log('employeeList', this.state.employees)
        return(
            <div>
                <div class="text-center">
                    <label for="search"> Search Name </label>
                    <input type="text" onChange={this.handleInputChange}/> <br/>
                    <br/>
                </div>
           
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name <button className="sort" onClick={this.sortEmployee}> 
                            {this.state.sortOrder==="asc" && <FontAwesomeIcon icon={faCaretUp} />}
                            {this.state.sortOrder==="desc" && <FontAwesomeIcon icon={faCaretDown} />}
                            </button>
                            </th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.employees || this.state.filteredEmployees) ?
                         <EmployeeList employees={this.state.filteredEmployees || this.state.employees} />
                        : <tr><td colSpan="4">No Data</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Employee;