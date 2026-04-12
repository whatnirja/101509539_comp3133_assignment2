import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule,
    MatToolbarModule, MatChipsModule, MatDividerModule
  ],
  templateUrl: './employee-view.html',
})
export class EmployeeViewComponent implements OnInit {
  employee: any = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id')!;
  this.employeeService.getById(id).valueChanges.subscribe({
    next: (res: any) => {
      this.employee = res.data.getEmployeeByEid.employee;
      this.loading = false;
    },
    error: (err: any) => {
      this.error = err.message;
      this.loading = false;
    }
  });
}
}