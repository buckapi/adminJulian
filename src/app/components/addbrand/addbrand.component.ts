import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@app/services/global.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataApiService } from '@app/services/data-api-service';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-addbrand',
  standalone: false,
  // imports: [NgbActiveModal],
  templateUrl: './addbrand.component.html',
  styleUrl: './addbrand.component.css'
})
export class AddbrandComponent {
constructor(
  public global:GlobalService,
  public activeModal: NgbActiveModal,
  public yeoman:Yeoman,
  public dataApiService: DataApiService
  
){}
saveBrand() {
  let brand = { "name": this.global.newBrand };
  this.dataApiService.saveBrand(brand).subscribe(
    response => {
      console.log('Marca guardada correctamente:', response);
      // Agregar la marca de la respuesta al array de marcas, si es necesario

      // Limpiar los valores para futuros usos
      this.global.newBrand = '';
      this.yeoman.brands.push(response);
      this.yeoman.brands = [...this.yeoman.brands];
      // Cerrar el modal
      this.activeModal.close();
    },
    error => {
      console.error('Error al guardar la marca:', error);
    }
  );
}
}
