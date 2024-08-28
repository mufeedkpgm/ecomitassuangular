import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authService.login(username, password).subscribe(
        (res) => {
          if(UserStorageService.isAdminLoggedIn()){
            this.router.navigateByUrl('admin/dashboard');
          }else if(UserStorageService.isCustomerLoggedIn()){
            this.router.navigateByUrl('customer/dashboard');
          }
          //this.snackBar.open('Login Successful', 'OK', { duration: 5000 });
          //this.router.navigate(['/dashboard']); // Navigate to the dashboard or another page
        },
        (error) => {
          this.snackBar.open('Bad Credentials', 'ERROR', { duration: 5000 });
        }
      )
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'OK', { duration: 5000 });
    }
  }
}
