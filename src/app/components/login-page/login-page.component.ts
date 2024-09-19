import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/auth/auth.service'; // Adjust the import path as needed

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService,) {}

  onLogin(): void {
    this.loginService.login(this.username, this.password).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.authService.login();
        this.router.navigate(['/inventory']); // Navigate to the inventory page
      } else {
        this.loginFailed = true; // Show login error message
      }
    });
  }
}
