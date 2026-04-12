import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule, MatToolbarModule,
    MatInputModule, MatFormFieldModule, MatSelectModule,
    MatDialogModule, MatSnackBarModule, MatCardModule, MatChipsModule
  ],
  templateUrl: './employee-list.html',
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  displayedColumns = ['photo', 'name', 'email', 'position', 'department', 'salary', 'actions'];
  searchDepartment = '';
  searchPosition = '';
  isSearching = false;

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
  this.isSearching = false;
  this.employeeService.getAll().valueChanges.subscribe({
    next: (res: any) => this.employees = res.data.getAllEmployees.employees,
    error: (err: any) => this.showError(err.message)
  });
}

onSearch() {
  if (!this.searchDepartment && !this.searchPosition) {
    this.loadEmployees();
    return;
  }
  this.isSearching = true;
  this.employeeService.search(
    this.searchPosition || undefined,
    this.searchDepartment || undefined
  ).valueChanges.subscribe({
    next: (res: any) => this.employees = res.data.searchEmployees.employees,
    error: (err: any) => this.showError(err.message)
  });
}

deleteEmployee(id: string) {
  if (!confirm('Are you sure you want to delete this employee?')) return;
  this.employeeService.delete(id).subscribe({
    next: () => {
      this.snackBar.open('Employee deleted', 'Close', { duration: 3000 });
      this.loadEmployees();
    },
    error: (err: any) => this.showError(err.message)
  });
}

   clearSearch() {
    this.searchDepartment = '';
    this.searchPosition = '';
    this.loadEmployees();
  }

  logout() { this.auth.logout(); }

  showError(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 4000, panelClass: 'error-snack' });
  }
}