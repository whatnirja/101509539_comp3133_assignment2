import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_EMPLOYEES, GET_EMPLOYEE, ADD_EMPLOYEE,
  UPDATE_EMPLOYEE, DELETE_EMPLOYEE, SEARCH_EMPLOYEES
} from '../../graphql/employee.queries';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apollo = inject(Apollo);

  getAll() {
    return this.apollo.watchQuery<any>({ query: GET_EMPLOYEES, fetchPolicy: 'network-only' });
  }

  getById(eid: string) {
    return this.apollo.watchQuery<any>({ query: GET_EMPLOYEE, variables: { eid } });
  }

  add(input: any) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: { input },
      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  update(eid: string, input: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { eid, input },
      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  delete(eid: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { eid },
      refetchQueries: [{ query: GET_EMPLOYEES }]
    });
  }

  search(designation?: string, department?: string) {
    return this.apollo.watchQuery<any>({
      query: SEARCH_EMPLOYEES,
      variables: { designation, department },
      fetchPolicy: 'network-only'
    });
  }
}