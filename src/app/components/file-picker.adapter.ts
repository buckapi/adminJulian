import { FilePreviewModel } from "ngx-awesome-uploader";
import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { FilePickerAdapter } from "ngx-awesome-uploader";
import { Butler } from "@app/services/butler.service";
import { GlobalService } from "@app/services/global.service";

export class CustomFilePickerAdapter extends FilePickerAdapter {
  private uploadUrl =
    "https://db.buckapi.lat:8055/api/collections/files/records";

  constructor(
    private http: HttpClient,
    public _butler: Butler,

    public global: GlobalService
  ) {
    super();
  }

  public uploadFile(fileItem: any): Observable<any> {
    
    return this.compressAndUpload(fileItem.file);
    
  }

  private compressAndUpload(file: File): Observable<any> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const compressedFile = new File([blob as Blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            const formData = new FormData();
            formData.append("image", compressedFile);
            formData.append("type", "image");
            // Aquí puedes agregar otros campos necesarios en el formData

            const uploadRequest = new HttpRequest(
              "POST",
              this.uploadUrl,
              formData,
              { reportProgress: false }
            );

            this.http
              .request(uploadRequest)
              .subscribe((event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Response) {
                  const response = event.body;
                  const imageUrl = response.id; // Obtener la URL de la imagen cargada desde la respuesta
                  this._butler.newImage = true;
                  let imageComplete =
                    "https://db.buckapi.lat:8055/api/files/" +
                    response.collectionId +
                    "/" +
                    imageUrl +
                    "/" +
                    response.image;
                  console.log("imageURL: " + imageComplete);
                  this._butler.uploaderImages.push(imageComplete); 
                  console.log("uploaderImages: " + JSON.stringify(this._butler.uploaderImages));// Agregar la URL de la imagen a la lista
                  this._butler.newUploaderImage = true;
                  
     
                  observer.next(imageUrl); // Devolver la URL de la imagen cargada
                  observer.complete();
                } else if (
                  event.type === HttpEventType.UploadProgress &&
                  event.total
                ) {
                  const uploadProgress = Math.round(
                    (100 * event.loaded) / event.total
                  );
                  observer.next(uploadProgress);
                }
              });
              this._butler.uploaderImages = [...this._butler.uploaderImages];
          }, "image/jpeg");
        };
      };
      
    });
    
  }

  public removeFile(fileItem: any): Observable<any> {
    // Aquí puedes implementar la lógica para eliminar una imagen si es necesario
    return new Observable();
  }
}
