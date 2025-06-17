import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { virtualRouter } from "./../../services/virtualRouter.service"; // Asegúrate de que la ruta sea correcta
import { GlobalService } from "./../../services/global.service"; // Asegúrate de que la ruta sea correcta
import { ScriptService } from "./../../services/script.service";
import { HttpClient } from "@angular/common/http";
import { UploaderCaptions } from "ngx-awesome-uploader";
import { CustomFilePickerAdapter } from "../file-picker.adapter";
import { DataApiService } from "./../../services/data-api-service";
import { Butler } from "./../../services/butler.service";
import { Yeoman } from "./../../services/yeoman.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { AddbrandComponent } from "../addbrand/addbrand.component";
import { AddcategoryComponent } from "../addcategory/addcategory.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { NgxImageCompressService } from "ngx-image-compress";

@Component({
  selector: 'app-gallery',  

  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  constructor(
    public imageCompress: NgxImageCompressService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public http: HttpClient,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService
  ) {}
}
