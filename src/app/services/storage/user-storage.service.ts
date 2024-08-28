import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {

  constructor() {}

  public saveToken(token: string): void {
    if (UserStorageService.isLocalStorageAvailable()) { // Use the class name here
      console.log('Saving token:', token);
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user: any): void {
    if (UserStorageService.isLocalStorageAvailable()) { // Use the class name here
      console.log('Saving user:', user);
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    if (UserStorageService.isLocalStorageAvailable()) { // Use the class name here
      return localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any {
    if (UserStorageService.isLocalStorageAvailable()) { // Use the class name here
      return JSON.parse(localStorage.getItem(USER) || '{}');
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static signOut(): void {
    if (UserStorageService.isLocalStorageAvailable()) { // Use the class name here
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }

  private static isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && window.localStorage !== undefined;
    } catch (e) {
      return false;
    }
  }
}
