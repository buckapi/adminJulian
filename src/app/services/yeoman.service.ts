import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Yeoman {
  allcategory:any=[];
  allbrands:any=[];
  allstyles:any=[];
  allformats:any=[];

  allCategoriesSize:number=0;
  
  posts:any=[];
  categories:any=[];
  brands:any=[];
  formats:any=[];
  styles:any=[];
  types:any=[];

  all:any=[];
  articulos:any[][]=[];
  categorySelected="";
  catalogo:any[]=[];
  catalogoCargado=false;
  // categories:any[]=[];
  client:any;
  clientEmail:any;
  clientFicha:any={"clrepresentante":""};
  clientes:any;
  clients:any;
  cliSelected: any = {    "id": "",  "name": "" };
  config: {      productSelected:number;    } = {productSelected:-1} ;
  currency:number=1;
  data:any={};
  descuentos:any[]=[];
  dist:any;
  distName="";
  existencias:any=[];
  existenciasSize:number=0;
  filtered=false;
  go=false;
  goMessage="";
  idClient:any;
  idDist:any;
  imagesUrl="https://www.buckapi.com/api/server/local-storage/tixsImages/"
  indexPreviewCli:number=0;
  indexPreviewDist:number=0;
  myOrders:any;
  neworder: { articulo: any; iva:any,cantidad: number;precioConDescuento:number ,descuentoIndex:number}[] = [];
  notifications:any[][]=[];
  orderSize=0;
  ordersFinished:any[]=[];
  ordersNew:any[]=[];
  ordersProcessing:any[]=[];
  origin: { name: string; restUrl: string; GQLUrl: string; } = { name: "default", restUrl: "https://db.buckapi.lat:8055", GQLUrl: "<origin GQL url>" };
  pop:Boolean=false;
  preview:any={};
  previewArticulo:any={"arnombre":""};
  previewOrder: any;
  previewType:any='';
  products:any={};
  totalDescuento:any=0;
  totalIVA:any=0;
  totalOrder:any=0;
  type:any;
  user:any;
  viewSelected:boolean=true;
  virtualRoute:any="dashboard";  
  constructor() {}
  
  reset(): void {
    this.all = [];
    this.articulos = [];
    this.categorySelected = "";
    this.catalogo = [];
    this.catalogoCargado = false;
    this.categories = [];
    this.client = null;
    this.clientEmail = null;
    this.clientFicha = { "clrepresentante": "" };
    this.clientes = null;
    this.clients = null;
    this.cliSelected = { "id": "", "name": "" };
    this.config = { productSelected: -1 };
    this.currency = 1;
    this.data = {};
    this.descuentos = [];
    this.dist = null;
    this.distName = "";
    this.existencias = [];
    this.existenciasSize = 0;
    this.filtered = false;
    this.go = false;
    this.goMessage = "";
    this.idClient = null;
    this.idDist = null;
    this.imagesUrl = "https://www.buckapi.com/api/server/local-storage/tixsImages/";
    this.indexPreviewCli = 0;
    this.indexPreviewDist = 0;
    this.myOrders = null;
    this.neworder = [];
    this.notifications = [];
    this.orderSize = 0;
    this.ordersFinished = [];
    this.ordersNew = [];
    this.ordersProcessing = [];
    this.origin = {      name: "default",      restUrl: "https://db.buckapi.com:9023",      GQLUrl: "<origin GQL url>",    };
    this.pop = false;
    this.preview = {};
    this.previewArticulo = { "arnombre": "" };
    this.previewOrder = null;
    this.previewType = '';
    this.products = {};
    this.totalDescuento = 0;
    this.totalIVA = 0;
    this.totalOrder = 0;
    this.type = null;
    this.user = null;
    this.viewSelected = true;
    this.virtualRoute = "dashboard";
  }
}
