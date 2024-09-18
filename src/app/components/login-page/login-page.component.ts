import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service'; // Adjust the import path as needed

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.loginService.login(this.username, this.password).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/inventory']); // Navigate to the inventory page
      } else {
        this.loginFailed = true; // Show login error message
      }
    });
  }
}
