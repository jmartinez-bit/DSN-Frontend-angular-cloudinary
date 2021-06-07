import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegister    : boolean = false;
  isRegisterFail: boolean = false;
  nuevoUsuario !: NuevoUsuario;
  username     !: string;
  email        ?: string;
  password     ?: string;
  errMsj       ?: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.username!, this.email!, this.password!);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {

        this.isRegister     = true;
        this.isRegisterFail = false;
        
        this.router.navigate(['/login']);
      }, err => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.errMsj = err.error.mensaje;
      }
    );
  }
}
