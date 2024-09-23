import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-procurement-login',
  templateUrl: './procurement-login.component.html',
  styleUrls: ['./procurement-login.component.css'],
})
export class ProcurementLoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(): void {
    this.loginService
      .login(this.username, this.password)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.authService.login();
          this.router.navigate(['/orders']);
        } else {
          this.loginFailed = true;
        }
      });
  }
}
