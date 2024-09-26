import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  loginFailed: boolean = false;
  loginpaths: string[] = ['inventory', 'procurement'];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(): void {
    // Pass the selected role to the login method
    this.loginService
      .login(this.username, this.password, this.role)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.authService.login(this.role);
          if (this.role === 'procurement') {
            this.router.navigate(['/orders']);
          } else if (this.role === 'inventory') {
            this.router.navigate(['/home']); // Ensure this path is correct
          } else {
            this.loginFailed = true; // Handle unexpected roles
          }
        } else {
          this.loginFailed = true; // Show login error message
        }
      });
  }
}
