import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Imagen } from '../models/imagen';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() index: any;

  imagenes: Imagen[] = [];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(
    public activeModal: NgbActiveModal,
    private imagenService: ImagenService
  ) { }

  ngOnInit(): void {
    this.config.initialSlide = this.index;
    this.imagenService.list().subscribe(
      data => {
        this.imagenes = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
