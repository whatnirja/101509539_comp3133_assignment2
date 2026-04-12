import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatSnackBarModule,
    MatCardModule, MatTooltipModule, MatBadgeModule
  ],
  templateUrl: './employee-list.html',
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  employees: any[] = [];
  displayedColumns = ['photo', 'name', 'email', 'designation', 'department', 'salary', 'actions'];
  searchDepartment = '';
  searchPosition = '';
  isSearching = false;
  loading = true;

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.loading = true;
    this.isSearching = false;
    this.employeeService.getAll().valueChanges.subscribe({
      next: (res: any) => {
        this.employees = res.data.getAllEmployees.employees;
        this.loading = false;
      },
      error: (err: any) => { this.showError(err.message); this.loading = false; }
    });
  }

  onSearch() {
    if (!this.searchDepartment && !this.searchPosition) { this.loadEmployees(); return; }
    this.isSearching = true;
    this.employeeService.search(
      this.searchPosition || undefined,
      this.searchDepartment || undefined
    ).valueChanges.subscribe({
      next: (res: any) => this.employees = res.data.searchEmployees.employees,
      error: (err: any) => this.showError(err.message)
    });
  }

  clearSearch() {
    this.searchDepartment = '';
    this.searchPosition = '';
    this.loadEmployees();
  }

  deleteEmployee(id: string) {
    if (!confirm('Delete this employee?')) return;
    this.employeeService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Employee deleted', 'Close', { duration: 3000 });
        this.loadEmployees();
      },
      error: (err: any) => this.showError(err.message)
    });
  }

  logout() { this.auth.logout(); }
  showError(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 4000 });
  }

  getDepartmentCount(): number {
  return new Set(this.employees.map((e: any) => e.department)).size;
}
  getDesignationCount(): number {
    return new Set(this.employees.map((e: any) => e.designation)).size;
  }

  viewEmployee(id: string) {
  this.router.navigate(['/employees', id]);
}
}