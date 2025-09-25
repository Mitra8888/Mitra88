// src/app/signup/signup.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient, } from '@angular/common/http'; // Import HttpClient and CommonModule
import { User } from '../models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
   CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupFormControl: FormGroup; // Renamed for clarity
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient // Inject HttpClient
  ) {
    this.signupFormControl = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{3,15}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
      year_of_birth: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{3,15}$/)]]
    });
  }

  onClick(): void { // Added void return type
    this.signupFormControl.markAllAsTouched();
    this.successMessage = null; // Clear previous messages
    this.errorMessage = null;

    if (this.signupFormControl.valid) {
      const newUser: User = {
        name: this.signupFormControl.value.username,
        password: this.signupFormControl.value.password,
        year_of_birth: this.signupFormControl.value.year_of_birth// Placeholder, as your backend expects it. Adjust as needed.
      };

      // Make the POST request to your Express.js server
      const url = "http://localhost:1234/api/Student/GetStudents";
      this.http.post<User>(url, newUser).subscribe({
        next: (response) => {
          console.log('User signed up successfully:', response);
          this.successMessage = 'Signup successful! Redirecting to login...';
          // Redirect to login after a short delay to show success message
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); // 2-second delay
        },
        error: (error) => {
          console.error('Signup failed:', error);
          this.errorMessage = 'Signup failed. Please try a different username.';
        }
      });
    } else {
      this.errorMessage = 'Please fix the form errors.';
    }
  }

  goToLogin(): void { // Added void return type
    this.router.navigate(['/login']);
  }
}
