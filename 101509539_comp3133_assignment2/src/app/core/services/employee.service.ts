import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_EMPLOYEES, GET_EMPLOYEE, ADD_EMPLOYEE,
  UPDATE_EMPLOYEE, DELETE_EMPLOYEE, SEARCH_EMPLOYEES
} from '../../graphql/employee.queries';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAll() {
    return this.apollo.watchQuery<any>({ query: GET_EMPLOYEES });
  }

  getById(id: string) {
    return this.apollo.watchQuery<any>({ query: GET_EMPLOYEE, variables: { id } });
  }

  add(emp: any) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: emp,
      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  update(id: string, emp: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { id, ...emp },
      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  delete(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id },
      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  search(department?: string, position?: string) {
    return this.apollo.watchQuery<any>({
      query: SEARCH_EMPLOYEES,
      variables: { department, position }
    });
  }
}