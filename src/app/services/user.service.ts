// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Use BehaviorSubject to hold the current user and emit changes
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    // Optionally load user from session storage if it exists on app start
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Sets the current logged-in user
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user)); // Persist user in session storage
  }

  // Gets the current logged-in user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Clears the current user (e.g., on logout)
  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('currentUser');
  }

  // Check if a user is currently logged in
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
