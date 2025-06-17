import { Injectable } from "@angular/core";
import { Yeoman } from "./yeoman.service";
import { DataApiService } from "./data-api-service";
import { virtualRouter } from "./virtualRouter.service";
import { AuthRESTService } from "./auth-rest.service";
import { Catalogo } from "./catalogo.service";
import { tap, count, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { merge } from "rxjs";
import { HttpClient } from "@angular/common/http";
import PocketBase from "pocketbase";
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface CategoryInterface {}
export interface PropertyInterface {}
export interface ProductInterface {}
interface Config {
  name: string;
  logo: string;
  primaryColor: string;
  slider: boolean;
  categories: boolean;
  populeri: boolean;
  banners: boolean;
  cortina: boolean;
  deal: boolean;
  topSale: boolean;
  popular: boolean;
  special: boolean;
  multilenguage: boolean;
  colors: string[]; // Propiedad color
}

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  private integrationsUrl = "https://db.buckapi.com:9023/api/integrations";
  private categoriesUrl = "https://db.buckapi.com:9023/api/categories";
  private clientesUrl = "https://db.buckapi.com:9023/api/clients";
  private solucionesUrl = "https://db.buckapi.com:9023/api/products";
  private testimoniosUrl = "https://db.buckapi.com:9023/api/testimonials";
  private modulosUrl = "https://db.buckapi.com:9023/api/modules";
  private faqsUrl = "https://db.buckapi.com:9023/api/faqs";
  private postsUrl = "https://db.buckapi.com:9023/api/posts";
  private infoUrl = "";
  private assetmentsUrl = "";
  addingProduct = false;
  editingProduct = false;
  addingProperty = false;
  editingProperty = false;
  color: any = "#fff";
  nuevoColor: string; // Variable para almacenar el nombre del nuevo color
  newBrand: string;
  newCategory: string;

  uploaderImages:string[]=[];
  newImage:boolean=false;
  newUploaderImage:boolean=false;

  private apirestUrl = "https://db.buckapi.lat:8055/api/";
  configs: Config[] = [];

  pb = new PocketBase("https://db.buckapi.lat:8055");
  showDescriptionArray: boolean[] = [];
  idCatSelected = 0;
  idProductSelected = 0;
  idproductSelected = 0;
  aside = true;
  // productSelected:any;
  productSelected: {
    id: string;
    name: string;
    files: any[];
    categories: any[];
    category: any;
    stockLevel: number;
    stockMin: number;
    price: number;
    brand: any[];
    dimensions: any[];
    formats:any[];
    /* type: any[]; */
    colors: any[];
    /* model: string; */
    description: string;
    status: string;
    weight: number;
      technique: string;
      material: string;
      yearCreation: string;
      collection: string;
  } = {
    
    id: "",
    name: "",
    files: [],
    categories: [],
    category: null,
    stockLevel: 0,
    stockMin: 0,
    price: 0,
    brand: [],
    dimensions: [],
    formats:[],
    /* type: [], */
    colors: [],
    /* model: "", */
    description: "",
    status: "",
    weight: 0,
      technique: "",
      material: "",
      yearCreation: "",
      collection: ""
  };
  propertysSelected: any[] = [];
  
  propertySelected: {
    id: string;
    description: string;
    files: any[];
    name: string;
    price: number,
    services: any[];
    status: string;
    guests: number;
    priceAditional: number;
  } = {
    
    id: "",
    description: "",
    files: [],
    name: "",
    price: 0,
    services: [],
    status: "",
    guests: 0,
    priceAditional: 0
  };
  moduloSelected: { id: string; name: string; images: any[] } = {
    name: "Seleccione un modulo",
    images: [],
    id: "",
  };
  integrationSelected: { name: string; images: any[] } = {
    name: "Seleccionar",
    images: [],
  };
  rubroSelected: { id: string; name: string; images: any[]; ref: string } = {
    name: "Seleccionar",
    images: [],
    id: "",
    ref: "",
  };
  categoryPrev: { nameCategory: string; image: string; subCategory: any[] } = {
    nameCategory: "Seleccionar",
    image:
      "data:image/png;base64,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",
    subCategory: [],
  };
  solucionSelected: {
    id: string;
    name: string;
    description: string;
    images: any[];
  } = { name: "Seleccionar", images: [], description: "", id: "" };
  products: any[] = [];
  cart: any[] = [];

  attemptPrev: { name: string; image: string; description: any[] } = {
    name: "Seleccionar",
    image:
      "data:image/png;base64,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",
    description: [],
  };
  assetments: any[] = [];
  info: {
    id: string;
    name: string;
    colors: { name: string; hex: string }[];
    types: { name: string; hex: string }[];
    orderStatus: { name: string; id: string }[];
  } = {
    name: "none",
    id: "",
    orderStatus: [],
    types: [],
    colors: [
      { name: "rojo", hex: "#FF0000" },
      { name: "azul", hex: "#00FF00" },
      { name: "amarillo", hex: "#0000FF" },
    ],
  };
  rubroIndex: any;
  rubros: any[] = [];
  rubrosSelected: any[] = [];
  modulosSelected: any[] = [];
  testimonioIndex: any;
  testimonios: any[] = [];
  testimoniosSelected: any[] = [];

  soluciones: any[] = [];
  solucionesSelected: any[] = [];

  posts: any[] = [];
  postsSelected: any[] = [];

  faqs: any[] = [];
  faqsSelected: any[] = [];
  faqsPreview: boolean = true;

  modulos: any[] = [];
  // moduloSelected: any[] = [];

  integrationIndex: any;
  integrations: any[] = [];
  integrationsSelected: any[] = [];

  totales: any = {
    totalOrders: 0,
    totalProperties: 0,
    totalProducts: 0,
    totalGallery: 0,
  };
  propertys: any[] = [];
  gallery: any[] = [];
  clientes: any[] = [];
  colors: any[] = [];
  clientesSelected: any[] = [];
  quantitiesCLientesSelected: any[] = [];
  quantitiesProductsSelected: any[] = [];
  quantitiesGallerySelected: any[] = [];
  galleryPreview: boolean = true;
  productPreview: boolean = true;
  propertyPreview: boolean = true;
  rubroPreview: boolean = false;
  moduloPreview: boolean = false;
  integrationPreview: boolean = true;
  rubroSelectedBoolean: boolean = false;
  propertySelectedBoolean: boolean = false;
  gallerySelectedBoolean: boolean = false;
  postsPreview: boolean = true;
  categories: any[] = [];
  categorySelected: any;
  currentPage: number = 1;
  totalProducts: number = 0;
  totalPropertys: number = 0;
  totalGallery: number = 0;
  limit: number = 5;
  profileOption = "attempts";
  itemsPerPage = 20;
  clients: any;
  deviceType: string = "";
  currentUser: any;
  ordersSize = 0;
  clientDetail: { clrepresentante: any }[] = [];
  constructor(
    public catalogo: Catalogo,
    // public activeModal: NgbActiveModal,
    public authRESTService: AuthRESTService,
    public http: HttpClient,
    public virtuallRouter: virtualRouter,
    public yeoman: Yeoman,
    public dataApiService: DataApiService
  ) {
    this.configs = [
      {
        name: "Servicios Volkswagen Blanca",
        logo: "assets/partsix/img/logo/logoBlue.webp",
        primaryColor: "#002151",
        slider: true,
        categories: true,
        populeri: false,
        banners: true,
        cortina: false,
        deal: false,
        topSale: false,
        popular: true,
        special: false,
        multilenguage: false,
        colors: ["#FF0000", "#00FF00", "#0000FF"],
      },
    ];
  }

 /*  getConfig(): Observable<any | boolean> {
    return this.http
      .get<any>(this.apirestUrl + "collections/svbConfig/records")
      .pipe(
        map((response) => {
          this.info = response.items[0].info;
          this.info.id = response.items[0].id;
          // console.log("info: "+this.info.colors);
          return response.items.length > 0; // Devuelve true si hay al menos un atributo en la respuesta
        })
      );
  } */

 /*  guardarColor() {
    const colorSeleccionado = { name: this.nuevoColor, hex: this.color };

    this.dataApiService.saveColor(colorSeleccionado).subscribe(
      () => {
        console.log("Color guardado correctamente");
        this.colors.push(colorSeleccionado);
        this.color = "";
        this.nuevoColor = "";
      },
      (error) => {

        console.error("Error al guardar el color:", error);
      }
    );
  } */
  saveBrand() {
    let brand = { name: this.newBrand };

    this.dataApiService.saveBrand(brand).subscribe(
      (response) => {
        console.log("Marca guardada correctamente:", JSON.stringify(response));
        // Agregar la marca de la respuesta al array de marcas
        this.yeoman.brands.push(response);
        this.yeoman.brands = [...this.yeoman.brands];

        // console.log(JSON.stringify(this.yeoman.brands))
        // Limpiar los valores para futuros usos
        this.newBrand = "";
        // this.activeModal.close();
      },
      (error) => {
        console.error("Error al guardar la marca:", error);
      }
    );
  }
  
  deleteProduct(id: string) {
    // Suponiendo que this.yeoman.origin.restUrl tiene el valor correcto de la URL base
    const url_api = `${this.yeoman.origin.restUrl}/api/collections/gallery/records/${id}`;

    // Si necesitas agregar un token de autorización, descomenta la línea a continuación
    // const token = this.AuthRESTService.getToken();

    return this.http.delete<ProductInterface>(url_api).pipe(map((data) => data));
  }
  deleteProperty(id: string) {
    // const token = this.AuthRESTService.getToken
    const url_api = `${this.yeoman.origin.restUrl}/api/collections/services/records/${id}`;

    return this.http.delete<PropertyInterface>(url_api).pipe(map((data) => data));
  }
  

  
  showAllRubros() {
    this.clientesSelected = this.clientes;
    this.rubroIndex = null;
  }
  showAllProperties() {
    this.propertySelected = this.propertys[0];
    this.rubroIndex = null;
  }
  selectProperty(property: any) {
    this.propertySelected = property;
    this.virtuallRouter.routerActive = "properties";
    this.propertyPreview = false;
  }
  selectClient(cliente: any) {
    this.productSelected = cliente;
    this.virtuallRouter.routerActive = "client-detail";
    this.productPreview = false;
  }
  selectProduct(product: any) {
    this.productSelected = product;
    this.virtuallRouter.routerActive = "product-detail";
    this.productPreview = false;
  }
  selectRubro(rubroIndex: any) {
    this.productSelected = {
      id: "",
    name: "",
    files: [],
    categories: [],
    category: null,
    stockLevel: 0,
    stockMin: 0,
    price: 0,
    brand: [],
    dimensions: [],
    formats:[],
    /* type: [], */
    colors: [],
    /* model: "", */
    description: "",
    status: "",
    weight: 0,
      technique: "",
      material: "",
      yearCreation: "",
      collection: ""
    };
    this.rubroSelectedBoolean = true;
    this.clientesSelected = [];
    this.rubroIndex = rubroIndex;
    this.categorySelected = this.yeoman.categories[rubroIndex];
    console.log("category selected: " + JSON.stringify(this.categorySelected));
    let size = this.clientes.length;
    for (let i = 0; i < size; i++) {
      const cliente = this.clientes[i];
      // Verifica si el cliente tiene una propiedad 'categories' y si 'this.categorySelected.name' está presente en el nombre de alguna categoría
      if (cliente.categories) {
        // Itera sobre el arreglo de categorías del cliente
        for (let j = 0; j < cliente.categories.length; j++) {
          // Compara el nombre de cada categoría con 'this.categorySelected.name'
          if (cliente.categories[j].id === this.categorySelected.id) {
            // Si coincide, agrega el cliente a 'this.clientesSelected' y sale del bucle
            this.clientesSelected.push(cliente);
            break; // Sale del bucle 'for' interno
          }
        }
      }
    }

    console.log("indice selected: " + this.productSelected.id);
  }
  conteoProducts() {
    let size = this.products.length;
    let rubrosSize = this.rubros.length;
    let cont = 0;
    for (let i = 0; i < rubrosSize; i++) {
      cont = 0;
      for (let j = 0; j < size; j++) {
        if (this.products[j].idCategory === this.rubros[i].id) cont = cont + 1;
      }
      this.quantitiesProductsSelected.push(cont);
      cont = 0;
    }
  }
  
  /* loadColors() {
    this.getColors().subscribe(
      (data) => {
        this.colors = data.items;
        console.log(data);
        let size = data.items.length;

        // Puedes hacer lo que quieras con los datos recibidos
      },
      (error) => {
        console.error(error); // Manejo de errores si la solicitud falla
      }
    );
  } */
  loadProducts() {
    this.getProducts().subscribe(
      (data) => {
        this.products = data.items;
        this.totales.totalProducts = this.products.length;
        this.productSelected = this.products[0]; // Asigna los registros obtenidos a la variable 'registros'
        console.log(data);
        let size = data.items.length;

        this.conteoProducts();
        // Puedes hacer lo que quieras con los datos recibidos
      },
      (error) => {
        console.error(error); // Manejo de errores si la solicitud falla
      }
    );
  }
  loadPropertys() {
    this.getPropertys().subscribe(
      (data) => {
        this.propertys = data.items;
        this.totales.totalProperties = this.propertys.length;
        this.propertySelected = this.propertys[0]; // Asigna los registros obtenidos a la variable 'registros'
        console.log(data);
        let size = data.items.length;
      },
      (error) => {
        console.error(error); // Manejo de errores si la solicitud falla
      }
    );
  }
  loadGallery() {
    this.getGallery().subscribe(
      (data) => {
        this.gallery = data.items;
        this.totales.totalGallery = this.gallery.length;
      },
      (error) => {
        console.error(error); // Manejo de errores si la solicitud falla
      }
    );
  }
  categoryUpdate(cat: CategoryInterface, id: string) {
    const url_api = this.yeoman.origin.restUrl + `/api/categories/${id}`;
    return this.http
      .put<CategoryInterface>(url_api, cat)
      .pipe(map((data) => data));
  }
  getGallery(): Observable<any> {
    const url_api = this.yeoman.origin.restUrl + "/api/collections/gallerys/records";
    return this.http.get<any>(url_api);
  }
  getPropertys(): Observable<any> {
    const url_api =
      this.yeoman.origin.restUrl + "/api/collections/services/records";
    return this.http.get<any>(url_api);
  }
  getProducts(): Observable<any> {
    const url_api =
      this.yeoman.origin.restUrl + "/api/collections/gallery/records";
    return this.http.get<any>(url_api);
  }
  /* getColors(): Observable<any> {
    const url_api =
      this.yeoman.origin.restUrl + "/api/collections/svbColors/records";
    return this.http.get<any>(url_api);
  } */

  

  setPrev(item: any) {
    console.log(item);
    this.categoryPrev = item;
  }
  setRoute(route: string) {
    this.virtuallRouter.routerActive = route;
    this.addingProduct=false;
    this.editingProduct=false;
    this.addingProperty=false;
    this.editingProperty=false;
  }
}
