import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

  @ViewChild('imageInputFile', {static: false}) imagenFile?: ElementRef;

  imagen!: File | null;
  imagenMin?: File | null;

  constructor(
    private imagenService: ImagenService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.imagen = event.target.files[0]
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen!);
  }

  onUpload(): void {
    this.spinner.show();
    this.imagenService.upload(this.imagen!)
        .subscribe(
          data => {
            this.spinner.hide();
            this.router.navigate(['/']);
          }, 
          err => {
            alert(err.error.mensaje);
            this.spinner.hide();
            this.reset();
          }
        );
  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile!.nativeElement.value = '';
  }

}
