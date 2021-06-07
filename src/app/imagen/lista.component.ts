import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from '../models/imagen';
import { ImagenService } from '../services/imagen.service';
import { TokenService } from '../services/token.service';
import { DetalleComponent } from './detalle.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  imagenes: Imagen[] = [];

  constructor( 
    private imagenService: ImagenService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private tokenService: TokenService,
    private router: Router
    ) {
      if(!this.tokenService.getToken()) {
        this.router.navigate(['/login']);
      }
    }

  ngOnInit(): void {

    this.cargarImagenes();
    
  }

  cargarImagenes(): void {
    this.imagenService.list().subscribe(
      data => {
        this.imagenes = data;
      }
    );
  }

  borrar(id: number): void {
    this.spinner.show();
    this.imagenService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.cargarImagenes();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  abrirModal(i: number): void {
    const modalRef = this.modalService.open(DetalleComponent);
    modalRef.componentInstance.index = i;
  }

}
