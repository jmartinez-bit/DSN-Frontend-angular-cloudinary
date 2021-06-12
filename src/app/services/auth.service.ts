import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL: string = environment.authURL;

  constructor( private httpClient: HttpClient ) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'save', nuevoUsuario);
  }

  public loginUsuario(loginUsuario: LoginUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', JSON.stringify(loginUsuario), {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

}
