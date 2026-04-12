import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCardModule, MatIconModule, MatSelectModule,
    MatToolbarModule, MatSnackBarModule
  ],
  templateUrl: './employee-edit.html',
})
export class EmployeeEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
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

  employeeId = '';
  photoPreview: string | null = null;
  photoBase64: string | null = null;
  loading = false;
  error = '';

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getById(this.employeeId).valueChanges.subscribe({
      next: (res: any) => {
        const emp = res.data.getEmployeeByEid.employee;
        this.form.patchValue({
          ...emp,
          date_of_joining: emp.date_of_joining
            ? new Date(emp.date_of_joining).toISOString().split('T')[0]
            : ''
        });
        this.photoPreview = emp.employee_photo || null;
        this.photoBase64 = emp.employee_photo || null;
      },
      error: (err: any) => this.error = err.message
    });
  }

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
    this.employeeService.update(this.employeeId, payload).subscribe({
      next: () => {
        this.snackBar.open('Employee updated!', 'Close', { duration: 3000 });
        this.router.navigate(['/employees', this.employeeId]);
      },
      error: (err: any) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}