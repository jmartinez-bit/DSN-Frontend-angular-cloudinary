import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagenService } from '../services/imagen.service';
import { switchMap } from 'rxjs/operators'
import { Imagen } from '../models/imagen';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  product!: Imagen;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private imagenService: ImagenService
  ) { }

  ngOnInit(): void {
    

    this.activatedRoute.params
            .pipe(
              switchMap( (param) => this.imagenService.getProduct(param.id) )
            )
            .subscribe( product => this.product = product  );
  }

}
