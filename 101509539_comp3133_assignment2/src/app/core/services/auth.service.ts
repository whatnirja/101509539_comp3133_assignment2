import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { LOGIN, SIGNUP } from '../../graphql/auth.queries';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apollo: Apollo, private router: Router) {}

  login(username: string, password: string) {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: { username, password }
    });
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: { username, email, password }
    });
  }

  saveToken(token: string) { localStorage.setItem('token', token); }
  getToken(): string | null { return localStorage.getItem('token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }

  logout() {
    localStorage.removeItem('token');
    this.apollo.client.clearStore();
    this.router.navigate(['/login']);
  }
}