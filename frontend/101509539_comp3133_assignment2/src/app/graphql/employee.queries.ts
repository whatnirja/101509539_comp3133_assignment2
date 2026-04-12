import { gql } from 'apollo-angular';

export const GET_EMPLOYEES = gql`
  query {
    getAllEmployees {
      message
      employees {
        _id first_name last_name email gender
        designation salary date_of_joining department employee_photo
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($eid: ID!) {
    getEmployeeByEid(eid: $eid) {
      message
      employee {
        _id first_name last_name email gender
        designation salary date_of_joining department employee_photo
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: AddEmployeeInput!) {
    addEmployee(input: $input) {
      message
      employee { _id first_name last_name }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($eid: ID!, $input: UpdateEmployeeInput!) {
    updateEmployeeByEid(eid: $eid, input: $input) {
      message
      employee { _id }
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($eid: ID!) {
    deleteEmployeeByEid(eid: $eid) {
      message
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($designation: String, $department: String) {
    searchEmployees(designation: $designation, department: $department) {
      message
      employees {
        _id first_name last_name email gender
        designation salary department employee_photo
      }
    }
  }
`;