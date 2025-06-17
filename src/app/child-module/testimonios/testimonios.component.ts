import { AfterViewInit, Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from './../../services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from './../../services/script.service';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from  './../file-picker.adapter';
import { Butler } from '@app/services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from '@app/services/data-api-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrl: './testimonios.component.css'
})
export class TestimoniosComponent implements AfterViewInit {
  editing=false;
  testimony:any;
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes del testimonio',
      or: '.',
      browse: 'Cargar',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };
  data = {
    images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
    name: '',
    description: '',
    price: null,
    stock: 0,
    ref: '',
    idBranch: '',
    detail: '',
    company:''
  };
 
  adapter = new  DemoFilePickerAdapter(this.http,this._butler);
    constructor(
      public http: HttpClient,
      public script: ScriptService,
      public virtualRouter: virtualRouter,
      public global: GlobalService,
      public _butler:Butler,     
      public dataApiService:DataApiService
      ) {
  
      }
      cancelarUpdate(){
        this.editing=false;
      }
    edit(){
      this.editing=true;
    }
      preview(client:any){
        this.global.productSelected=client;
        this.global.productPreview=true;
      }
      onSubmit() {
        this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
        this.data.images=this._butler.uploaderImages;
        this.dataApiService.saveTestimony(this.data).subscribe(response=>{
          console.log(response);
          this._butler.uploaderImages=[];
          Swal.fire('Bien...', 'Testimonio agregado satisfactoriamente!', 'success');
        this.editing=false;
        this.global.loadTestimonios();
        this.virtualRouter.routerActive="testimonios";
        });
        console.log(this.data);
        
        }
        deleteTestimonio(i:any){
          this.global.deleteTestimonio(i).subscribe(response =>{
            this.global.loadTestimonios();
            Swal.fire('Testimonio borrado');
          });
        }
       
        beforeDelete(i:any){
          Swal.fire({
      
            title: 'Seguro deseas borrar este testimonio?',
      
            text: 'esta acción no se podrá revertir!',
      
            icon: 'warning',
      
            showCancelButton: true,
      
            confirmButtonText: 'Sí, bórralo!',
      
            cancelButtonText: 'No, mejor no'
      
          }).then((result) => {
      
            if (result.value) {
               this.deleteTestimonio(i)
              Swal.fire(
      
                'Borrado!',
      
                'El Testimonio ha sido borrado.',
      
                'success'
      
              )
      
            } else if (result.dismiss === Swal.DismissReason.cancel) {
      
              Swal.fire(
      
                'Cancelado',
      
                '',
      
                'error'
      
              )
      
            }
      
          })
        }
        ngAfterViewInit(): void {
        }
  }
  