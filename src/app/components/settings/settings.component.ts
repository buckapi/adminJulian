import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { GlobalService } from '@app/services/global.service';
import { DataApiService } from '@app/services/data-api-service';
import { ModalComponent } from '@app/components/modal/modal.component';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  color:any="#fff";
  nuevoColor: string; // Variable para almacenar el nombre del nuevo color
sending=false;
constructor(
  private cpService: ColorPickerService,
  private modalService: NgbModal,
  public global:GlobalService,
  private http: HttpClient,
  public dataApiService: DataApiService
){}

/* async actualizarRegistro(recordId: string, newData: any) {
  try {
    const colorSeleccionado = { name: this.nuevoColor, hex: this.color };
    this.global.info.colors.push(colorSeleccionado);
    const response = await this.dataApiService.updateRecord(recordId, newData).toPromise();
    console.log('Registro actualizado correctamente:', response);
    // Hacer algo con la respuesta si es necesario
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
  }
} */

/* guardarColor() {
  this.sending=true;
  const colorSeleccionado = { name: this.nuevoColor, hex: this.color };
   
  this.dataApiService.saveColor(colorSeleccionado).subscribe(
    () => {
      console.log('Color guardado correctamente');
      this.global.colors.push(colorSeleccionado);
      this.color = '';
      this.nuevoColor = '';
  this.sending=false;

    },
    (error) => {
  this.sending=false;

      console.error('Error al guardar el color:', error);
    }
  );
} */

}
