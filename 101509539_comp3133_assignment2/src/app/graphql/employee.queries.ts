import { gql } from 'apollo-angular';

export const GET_EMPLOYEES = gql`
  query {
    getAllEmployees {
      _id first_name last_name email position department salary employee_photo
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    searchEmployeeById(eid: $id) {
      _id first_name last_name email gender salary position department employee_photo
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!, $last_name: String!, $email: String!,
    $gender: String, $salary: Float!, $position: String!,
    $department: String!, $employee_photo: String
  ) {
    addEmployee(
      first_name: $first_name, last_name: $last_name, email: $email,
      gender: $gender, salary: $salary, position: $position,
      department: $department, employee_photo: $employee_photo
    ) { _id first_name last_name }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!, $first_name: String, $last_name: String, $email: String,
    $gender: String, $salary: Float, $position: String, $department: String,
    $employee_photo: String
  ) {
    updateEmployee(
      eid: $id, first_name: $first_name, last_name: $last_name,
      email: $email, gender: $gender, salary: $salary,
      position: $position, department: $department, employee_photo: $employee_photo
    ) { _id }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(eid: $id) { _id }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($department: String, $position: String) {
    searchEmployeeByDepOrPos(department: $department, position: $position) {
      _id first_name last_name email position department salary employee_photo
    }
  }
`;