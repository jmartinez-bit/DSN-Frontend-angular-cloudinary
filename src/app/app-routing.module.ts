import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleProductoComponent } from './imagen/detalle-producto.component';
import { DetalleComponent } from './imagen/detalle.component';
import { ListaComponent } from './imagen/lista.component';
import { NuevaComponent } from './imagen/nueva.component';

const routes: Routes = [
  {path: '', component: ListaComponent},
  {path: 'nueva', component: NuevaComponent},
  {path: 'detalle', component: DetalleComponent},
  {path: 'detalle-producto/:id', component: DetalleProductoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
