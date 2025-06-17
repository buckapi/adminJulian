import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { QuillModule } from "ngx-quill";
import { ChildModule } from "./child-module/child-module";
import { AppComponent } from "./app.component";
import Counter from "./counter";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatQuillModule } from "./mat-quill/mat-quill-module";
import { HttpClientModule } from "@angular/common/http";
import { FilePickerModule } from "ngx-awesome-uploader";
import { HomeComponent } from "./components/home/home.component";
import { SettingsComponent } from "@app/components/settings/settings.component";
import { ColorPickerModule } from "ngx-color-picker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./components/modal/modal.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { OrdersComponent } from "@app/components/orders/orders.component";
import { AddbrandComponent } from "@app/components/addbrand/addbrand.component";
import { AddcategoryComponent } from "@app/components/addcategory/addcategory.component";
import { ProductsComponent } from "@app/components/products/products.component";
import { PropertiesComponent } from "@app/components/properties/properties.component";
import { GalleryComponent } from "@app/components/gallery/gallery.component";
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    ModalComponent,
    OrdersComponent,
    AddbrandComponent,
    AddcategoryComponent,
    ProductsComponent,
    PropertiesComponent,
    GalleryComponent    
  ],
  imports: [
    ColorPickerModule,
    HttpClientModule,
    BrowserModule,
    FilePickerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule,
    QuillModule.forRoot({
      customModules: [
        {
          implementation: Counter,
          path: "modules/counter",
        },
      ],
      customOptions: [
        {
          import: "formats/font",
          whitelist: [
            "mirza",
            "roboto",
            "aref",
            "serif",
            "sansserif",
            "monospace",
          ],
        },
      ],
    }),
    MatQuillModule,
    ChildModule,
    NgbModule,
    
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
