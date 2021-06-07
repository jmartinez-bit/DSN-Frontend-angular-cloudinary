import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ProdGuardService as guard } from './guards/prod-guard.service';
import { DetalleProductoComponent } from './imagen/detalle-producto.component';
import { DetalleComponent } from './imagen/detalle.component';
import { ListaComponent } from './imagen/lista.component';
import { NuevaComponent } from './imagen/nueva.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', component: ListaComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'nueva', component: NuevaComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'detalle', component: DetalleComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'detalle-producto/:id', component: DetalleProductoComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
