import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColorPickerService, Cmyk } from "ngx-color-picker";
import { GlobalService } from "@app/services/global.service";
import { DataApiService } from "@app/services/data-api-service";
@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.css",
})
export class ModalComponent {
  color: any = "#fff";
  nuevoColor: string; // Variable para almacenar el nombre del nuevo color
  sending = false;
  adding = false;
  constructor(
    private cpService: ColorPickerService,
    private modalService: NgbModal,
    public global: GlobalService,
    private http: HttpClient,
    public dataApiService: DataApiService
  ) {}

  /* guardarColor() {
    this.sending = true;
    const colorSeleccionado = { name: this.nuevoColor, hex: this.color };

    this.dataApiService.saveColor(colorSeleccionado).subscribe(
      () => {
        console.log("Color guardado correctamente");
        this.global.colors.push(colorSeleccionado);
        this.color = "";
        this.nuevoColor = "";
        this.sending = false;
      },
      (error) => {
        this.sending = false;

        console.error("Error al guardar el color:", error);
      }
    );
  } */
}
