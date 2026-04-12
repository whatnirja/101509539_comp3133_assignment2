import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { LOGIN, SIGNUP } from '../../graphql/auth.queries';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apollo = inject(Apollo);
  private router = inject(Router);

  login(username_or_email: string, password: string) {
    return this.apollo.query({
      query: LOGIN,
      variables: { input: { username_or_email, password } }
    });
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: { input: { username, email, password } }
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