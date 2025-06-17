import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@app/services/global.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataApiService } from '@app/services/data-api-service';
import { Yeoman } from '@app/services/yeoman.service';

@Component({
  selector: 'app-addcategory',
  standalone: false,
  // imports: [NgbActiveModal],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
constructor(
  public global:GlobalService,
  public activeModal: NgbActiveModal,
  public yeoman:Yeoman,
  public dataApiService: DataApiService
  
){}
saveCategory() {
  let category = { "name": this.global.newCategory };
  this.dataApiService.saveCategory(category).subscribe(
    response => {
      console.log('Categoría guardada correctamente:', response);
      // Agregar la marca de la respuesta al array de marcas, si es necesario

      // Limpiar los valores para futuros usos
      this.global.newCategory = '';
      this.yeoman.allcategory.push(response);
      this.yeoman.allcategory = [...this.yeoman.allcategory];
      // Cerrar el modal
      this.activeModal.close();
    },
    error => {
      console.error('Error al guardar la marca:', error);
    }
  );
}
}
