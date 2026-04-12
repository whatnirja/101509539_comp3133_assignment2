import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCardModule, MatIconModule, MatSelectModule,
    MatToolbarModule, MatSnackBarModule
  ],
  templateUrl: './employee-add.html',
})
export class EmployeeAddComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    salary: [null as number | null, [Validators.required, Validators.min(0)]],
    designation: ['', Validators.required],
    department: ['', Validators.required],
    date_of_joining: ['', Validators.required],
  });

  photoPreview: string | null = null;
  photoBase64: string | null = null;
  loading = false;
  error = '';

  onPhotoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.photoBase64 = reader.result as string;
      this.photoPreview = this.photoBase64;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const payload = {
      ...this.form.value,
      salary: Number(this.form.value.salary),
      employee_photo: this.photoBase64 || null
    };
    this.employeeService.add(payload).subscribe({
      next: () => {
        this.snackBar.open('Employee added!', 'Close', { duration: 3000 });
        this.router.navigate(['/employees']);
      },
      error: (err: any) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}