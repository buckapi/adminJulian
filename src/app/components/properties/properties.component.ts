import { Component } from '@angular/core';import { virtualRouter } from "./../../services/virtualRouter.service"; // Asegúrate de que la ruta sea correcta
import { GlobalService } from "./../../services/global.service"; // Asegúrate de que la ruta sea correcta
import { ScriptService } from "./../../services/script.service";
import { ScriptStore } from "./../../services/script.store";
import { HttpClient } from "@angular/common/http";
import { UploaderCaptions } from "ngx-awesome-uploader";
import { CustomFilePickerAdapter } from "../file-picker.adapter";
import { DataApiService } from "./../../services/data-api-service";
import { Butler } from "./../../services/butler.service";
import { Yeoman } from "./../../services/yeoman.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { AddbrandComponent } from "../addbrand/addbrand.component";
import { AddcategoryComponent } from "../addcategory/addcategory.component";
import { ModalComponent } from "@app/components/modal/modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { NgxImageCompressService } from "ngx-image-compress";
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadService } from '@app/services/image-upload.service';
@Component({
  selector: "app-properties",
  templateUrl: "./properties.component.html",
  styleUrls: ["./properties.component.css"]
})
export class PropertiesComponent {
  dropdownList = [];
  imgResultsAfterCompression = [];
  imgResultsBeforeCompression = [];
  selectedItems = [];
  showColors: boolean = true; // Agrega la propiedad 'showColors' al componente y dale un valor inicial de false
  // Dentro de tu componente Angular

  showDeleteButton: boolean = false;

  // dropdownSettings = {};
  dropdownSettings: IDropdownSettings = {};
  editing = false;
  adding = false;
  category = "Seleccione una";
  categorySeted: boolean = false;
  isEditing = false;
  propertys$: any = {};
  public captions: UploaderCaptions = {
    dropzone: {
      title: "Imágenes del servicio de Fotografia",
      or: ".",
      browse: "Cargar",
    },
    cropper: {
      crop: "Cortar",
      cancel: "Cancelar",
    },
    previewCard: {
      remove: "Borrar",
      uploadError: "error",
    },
  };
  data = {
    id: "",
    description: "",
    files: [] as string[],
    name: "",
    price: 0,
    services: [] as any[],
    status: "",
    guests: 0,
    priceAditional: 0
  };

  // adapter = new CustomFilePickerAdapter(this.http, this._butler);
  adapter = new CustomFilePickerAdapter(this.http, this._butler, this.global);
  imgResult: string = '';
  imgResultAfterCompression: string = '';
  imgResultBeforeCompression: string = '';
  constructor(
    public imageUploadService: ImageUploadService,
    private modalService: NgbModal,
    public imageCompress: NgxImageCompressService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public http: HttpClient,
    public _butler: Butler,
    public yeoman: Yeoman,
    public dataApiService: DataApiService
  ) {

    this.getAllProperties();
    this.getAllCategories();
    this.getAllBrands();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Seleccionar todo",
      unSelectAllText: "Deseleccionar todo",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  add() {
    this.global.propertySelected = {
      id:"",
      name: "",
      description: "",
      price: 0,
      files: [] as string[],
      services: [] as any[],
      status: "",
      guests: 0,
      priceAditional: 0
    };
    this.data = {
      id:"",
      name: "",
      description: "",
      price: 0,
      files: [] as string[],
      services: [] as any[],
      status: "",
      guests: 0,
      priceAditional: 0
    };

    this.global.editingProperty = false;
    this.global.addingProperty = true;
  }
  edit(property: any) {
    this.data = this.global.propertySelected;
    this.global.editingProperty = true;
    this.global.addingProperty = false;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    // Puedes pasar datos al modal utilizando el método 'componentInstance' del modalRef.
    // modalRef.componentInstance.data = myData;
  }
  openAddbrand() {
    const modalRef = this.modalService.open(AddbrandComponent);

    // Puedes pasar datos al modal utilizando el método 'componentInstance' del modalRef.
    // modalRef.componentInstance.data = myData;
  }
  openAddcategory() {
    const modalRef = this.modalService.open(AddcategoryComponent);

    // Puedes pasar datos al modal utilizando el método 'componentInstance' del modalRef.
    // modalRef.componentInstance.data = myData;
  }

  cancelarUpdate() {
    this.global.editingProperty = false;
    this.global.addingProperty = false;
    this.data = {
      id: "",
      name: "",
      description: "",
      price: 0,
      files: [] as string[],
      services: [] as any[],
      status: "",
      guests: 0,
      priceAditional: 0
    };
  }
  
  preview(property: any) {
    this.global.propertySelected = property;
    this.global.productPreview = true;
  }
  beforeDelete() {
    Swal.fire({
      cancelButtonText: "No, mejor no",
      confirmButtonText: "Sí, bórralo!",
      icon: "warning",
      showCancelButton: true,
      text: "esta acción no se podrá revertir!",
      title: "Seguro deseas borrar este servicio de Fotografia?",
    }).then((result) => {
      if (result.value) {
        this.deleteProperty();
        Swal.fire("Borrada!", "El servicio de Fotografia ha sido borrado.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "", "error");
      }
      this.global.loadPropertys();
    });
  }

  updateProperty() {
    this.data.files =
      this._butler.uploaderImages.length > 0
        ? this._butler.uploaderImages
        : this.global.propertySelected.files;

    this.dataApiService
      .propertyUpdate(this.data, this.global.propertySelected.id)
      .subscribe((response) => {
        console.log(response);
        this.global.loadPropertys();
        this.global.editingProperty = false;
        this.virtualRouter.routerActive = "properties";
        this.data = {
          id:"",
          name: "",
          description: "",
          price: 0,
          files: [] as string[],
          services: [] as any[],
          status: "",
          guests: 0,
          priceAditional: 0
        };

        this._butler.uploaderImages = [];
        (this.global.addingProperty = false),
          (this.global.editingProperty = false),
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Servicio de Fotografia Actualizado",
            showConfirmButton: false,
            timer: 1500,
          });
      });
  }
  deleteProperty() {
    this.global
      .deleteProperty(this.global.propertySelected.id)
      .subscribe((response) => {
        this.global.rubroSelected = {
          name: "Seleccionar",
          images: [],
          id: "",
          ref: "",
        };
        this.global.loadPropertys();

        this.global.propertySelected = {
          id:"",
          name: "",
          description: "",
          price: 0,
          files: [] as string[],
          services: [] as any[],
          status: "",
          guests: 0,
          priceAditional: 0
        };
      });
  }
  onSubmit() {
    this.data.files = this._butler.uploaderImages;
    this.data.status = "active";
    this.dataApiService.saveProperty(this.data).subscribe((response) => {
      console.log(response);
      this.global.loadPropertys();
      this._butler.uploaderImages = [];
      this.data = {
        id:"",
        name: "",
        description: "",
        price: 0,
        files: [] as string[],
        services: [] as any[],
        status: "",
        guests: 0,
        priceAditional: 0
      };

      this.global.editingProperty = false;
      Swal.fire("Bien...", "Servicio de Fotografia agregado satisfactoriamente!", "success");
      this.global.editingProperty = false;
      this.global.addingProperty = false;
      this.global.loadPropertys();
      this.virtualRouter.routerActive = "properties";
    });
    console.log(this.data);
  }
  getAllCategories() {
    this.dataApiService.getAllCategory().subscribe((response) => {
      this.yeoman.categories = response;
      this.yeoman.allcategory = response;
      this.yeoman.categories = this.yeoman.categories.items;
      this.yeoman.allcategory = this.yeoman.allcategory.items;
      this.yeoman.allCategoriesSize = this.yeoman.categories.length;
    });
  }
  getAllBrands() {
    this.dataApiService.getAllBrand().subscribe((response) => {
      this.yeoman.brands = response;
      // this.yeoman.allcategory = response;
      this.yeoman.brands = this.yeoman.brands.items;
    });
  }
  getAllProperties() {
    this.dataApiService.getAllProperties().subscribe((response: any[]) => {
      this.global.propertysSelected = response;
    });
  }
  onCategorySelect(category: any) {
    // this.data.category = "c" + category.id;
    console.log(category.id);
  }

  // setCategory(category: any) {
  //   let index = category;
  //   console.log("seleccionada: " + this.yeoman.allcategory[index].name);
  //   this.categorySeted = true;
  //   if (this.yeoman.categories !== undefined) {
  //     this.data.category = this.yeoman.allcategory[index].id;
  //     console.log("id: " + JSON.stringify(this.data.category));
  //   }
  // }

}
