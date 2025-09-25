// src/app/login/login.component.ts
import { HttpClient,} from '@angular/common/http'; 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { User } from '../models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
   CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit { // Implemented OnInit
  LoginFormControl!: FormGroup;
  loginData: User[] = []; // Initialize as empty array
  errorMessage: string | null = null; // For displaying login errors

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    // Form initialization moved to ngOnInit for better practice with async data
  }

  ngOnInit(): void {
    this.LoginFormControl = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getStudents(); // Fetch students when the component initializes
  }

  getStudents(): void { // Added void return type
    const url = "http://localhost:1234/api/Student/GetStudents";
    this.http.get<User[]>(url).subscribe({ // Specify expected type as User[]
      next: (res) => {
        console.log('Students data fetched:', res);
        this.loginData = res;
      },
      error: (err) => {
        console.error('Error fetching students data:', err);
        this.errorMessage = 'Failed to load user data. Please try again later.';
      }
    });
  }

  onLogin(): void { // Added void return type
    this.LoginFormControl.markAllAsTouched();
    this.errorMessage = null; // Clear previous error message

    if (this.LoginFormControl.valid) {
      const { name, password } = this.LoginFormControl.value;
      let loggedInUser: User | undefined;

      // Find the user in the fetched data
      loggedInUser = this.loginData.find(student =>
        student.name === name && student.password === password
      );

      if (loggedInUser) {
        this.userService.setCurrentUser(loggedInUser);
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = "Invalid username or password."; // Set error message
      }
    } else {
      this.errorMessage = "Please enter both username and password.";
    }
  }

  onSign(): void { // Added void return type
    this.router.navigate(['/signup']);
  }
}
