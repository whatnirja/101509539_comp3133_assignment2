import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCardModule, MatIconModule
  ],
  templateUrl: './login.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  error = '';
  loading = false;
  hidePassword = true;

  onSubmit() {
  if (this.form.invalid) return;
  this.loading = true;
  this.error = '';
  const { username, password } = this.form.value;
  this.auth.login(username!, password!).subscribe({
    next: (res: any) => {
      this.auth.saveToken(res.data.login.token);
      this.router.navigate(['/employees']);
    },
    error: (err: any) => {
      this.error = err.message || 'Invalid credentials';
      this.loading = false;
    }
  });
}
}