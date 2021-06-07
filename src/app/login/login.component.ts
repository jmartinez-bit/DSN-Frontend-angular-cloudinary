import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario!: LoginUsuario;
  email       ?: string;
  password    ?: string;
  isLoginFail  : boolean = false;
  errMsj      ?: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.email!, this.password!);
    this.authService.loginUsuario(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/']);
      }, err => {
        this.isLoginFail = true;
        this.errMsj = err.error.mensaje;
      }
    );
  }

}
