import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { forkJoin, Observable,of } from 'rxjs';
import { map,mergeMap } from 'rxjs/operators';
import { Yeoman } from './yeoman.service';
import { AuthRESTService } from "./auth-rest.service";
import { CategoryInterface } from './global.service';

export interface UserInterface {
}
export interface ColorInterface {
}export interface BrandInterface {
}
export interface OrderInterface {
}
export interface PartInterface {
}
export interface ClientInterface {
}
export interface PostInterface {
}
export interface DistInterface {
}
export interface ProductInterface {
}
export interface PropertyInterface {
}
export interface CarInterface {
}
export interface MemberInterface {
}


export interface CardInterface {
	id?:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
	//ticket: Observable<any>;
	private baseUrl = 'https://db.buckapi.lat:8065/api';

	url:any;
	cards:any;
	orders:any;
	clients:any;
	dists:any;
	client:any;
	chat:any;
	messages:any;
	chats:any;
	cars:any;
	parts:any;
	branch:any;
	cierre:any;
	serial:any;
	transactions:any;
  	constructor(
	  	// public butler:Butler, 
		public yeoman: Yeoman,
  		private AuthRESTService:AuthRESTService,
 	 	private http: HttpClient
  	) {
		}
  	headers : HttpHeaders = new HttpHeaders({  		
		  "Content-Type":"application/json"	
	});


	 
	getAllCategory() {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/categories/records';
		return this.http.get(url_api);
	  }
	  getAllBrand(){
		const url_api = this.yeoman.origin.restUrl + '/api/collections/formats/records';
		return this.http.get(url_api);
	  }
	  
	getAllProducts(){
		const url_api = this.yeoman.origin.restUrl+'/api/collections/svbProducts/records';
		return this.http.get(url_api);
	}
	
	getClients() {
		const url_api = this.yeoman.origin.restUrl+'/api/collections/svbProducts/records';
		return this.http.get(url_api);
	}
	getAllProperties() {
		const url_api = this.yeoman.origin.restUrl+'/api/collections/propertys/records';
		return this.http.get(url_api);
	}
	getProduct(id: string){
		const url_api = this.yeoman.origin.restUrl+`/api/products/${id}`;
		return this.http.get(url_api);
	}
	getAllPosts(){
		const url_api = this.yeoman.origin.restUrl+'/api/posts';
		return this.http.get(url_api);
	}
	deleteProduct(id: string){
		const token = this.AuthRESTService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/products/${id}/?access_token$={token}`;
		return this.http
		.delete<PartInterface>(url_api, {headers: this.headers})
		.pipe(map(data => data));
	}
	deleteCategory(id: string){
		const token = this.AuthRESTService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/products/${id}/?access_token$={token}`;
		return this.http
		.delete<PartInterface>(url_api, {headers: this.headers})
		.pipe(map(data => data));
	
	}
	
	savePost(post :PostInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/posts';
		return this.http
		.post<PostInterface>(url_api, post)
		.pipe(map(data => data));
	}
	saveTestimony(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/testimonials';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	saveProduct(product :ProductInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/products';
		return this.http
		.post<ProductInterface>(url_api, product)
		.pipe(map(data => data));
	}

	saveClient(client: ClientInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/gallery/records';
		return this.http.post<ClientInterface>(url_api, client).pipe(
		  map(data => data)
		);
	  }
	  saveProperty(property: PropertyInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/services/records';
		return this.http.post<PropertyInterface>(url_api, property).pipe(
		  map(data => data)
		);
	  }
	  
	  /* saveColor(color: ColorInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/svbColors/records';
		return this.http.post<ColorInterface>(url_api, color).pipe(
		  map(data => data)
		);
	  } */
	  saveBrand( brand: BrandInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/formats/records';
		return this.http.post<BrandInterface>(url_api, brand).pipe(
		  map(data => data)
		);
	  }
	  saveCategory( category: CategoryInterface) {
		const url_api = this.yeoman.origin.restUrl + '/api/collections/categories/records';
		return this.http.post<CategoryInterface>(url_api, category).pipe(
		  map(data => data)
		);
	  }
	  
	saveModules(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/modules';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	saveIntegrations(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/integrations';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	// saveCategory(client :ClientInterface){
	// 	const url_api=	this.yeoman.origin.restUrl+'/api/categories';
	// 	return this.http
	// 	.post<ClientInterface>(url_api, client)
	// 	.pipe(map(data => data));
	// }
	saveFaqs(client :ClientInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/faqs';
		return this.http
		.post<ClientInterface>(url_api, client)
		.pipe(map(data => data));
	}
	

	
	
	  /* updateRecord(recordId: string, data: any): Observable<any> {
		const url = `${this.baseUrl}/collections/svbConfig/records/${recordId}`;
		return this.http.patch<any>(url, data);
	  } */
	productUpdate(clientData: any, id: string): Observable<any> {
		// Construir la URL de la solicitud
		const url = `https://db.buckapi.lat:8055/api/collections/gallery/records/${id}`;
	
		// Realizar la solicitud PATCH para actualizar el registro
		return this.http.patch(url, clientData).pipe(
		  map(response => response)
		);
	  }
	  
	testimonyUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/testimonials/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	integrationsUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/integrations/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	modulesUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/modules/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	productsUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/products/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	categoryUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/categories/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}
	faqsUpdate(client :ClientInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/faqs/${id}`;
		return this.http
		.put<CardInterface>(url_api, client)
		.pipe(map(data => data));
	}

///click///
	  getAllData(url: any): Observable<any[]> {
		return forkJoin([
		  this.getArticulos(url),
		  this.getCategories(url),
		  this.getClientes(url),
		  this.getPropertys(url)
		]);
	  }
	  getArticulos(url: any): Observable<any[]> {
		return this.http.get<any[]>(url + 'webapi/articulos/getlista');
	  }
	
	  getCategories(url: any): Observable<any[]> {
		return this.http.get<any[]>(url + 'webapi/familia/all');
	  }
	
	  getClientes(url: any): Observable<any[]> {
		return this.http.get<any[]>(url + 'webapi/clientes/getall');
	  }
	  getPropertys(url: any): Observable<any[]> {
		return this.http.get<any[]>(url + 'webapi/propiedades/getall');
	  }
	  getCatalogo(url: any): Observable<any[]> {
		return this.http.get<any[]>(url );
	  }
	  getCliente(url: string, clcodigo: any): Observable<any[]> {
		// Concatena el valor de clcodigo en la URL
		const apiUrl = url + 'webapi/clientes/getcliente?clcodigo=' + clcodigo;
		
		return this.http.get<any[]>(apiUrl);
	  }
	  getDistByIdDist(ref: string) {
		const url_api = this.yeoman.origin.restUrl + `/api/dists?filter[where][ref]=${ref}`;
		this.dists = this.http.get(url_api);
		return (this.http.get(url_api));
	}
	getDistBy(idUser: string) {
		const url_api = this.yeoman.origin.restUrl + `/api/dists?filter[where][idUser]=${idUser}`;
		this.dists = this.http.get(url_api);
		return (this.http.get(url_api));
	}
	getOrdersByClient(idClient: string) {
		const url_api = this.yeoman.origin.restUrl + `/api/orders?filter[where][idClient]=${idClient}`;
		this.orders = this.http.get(url_api);
		return (this.http.get(url_api));
	}
	getOrdersByDist(idDist: string){
		const url_api = this.yeoman.origin.restUrl+`/api/orders?filter[where][idDist]=${idDist}`;
		this.orders = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}
	getClientBy(idUser: string){
		const url_api = this.yeoman.origin.restUrl+`/api/clients?filter[where][idUser]=c${idUser}`;
		this.clients = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}
	changePassword(userId: string, newPassword: string): Observable<any> {
		const url = `${this.yeoman.origin.restUrl}/api/UserPasswords/changePassword`;
		const data = { userId, newPassword };
		return this.http.post(url, data);
	  }
	  deleteOrder(orderId: string): Observable<void> {
		const token = this.AuthRESTService.getToken();
		const url_api = `${this.yeoman.origin.restUrl}/api/orders/${orderId}/?access_token=${token}`;

		return this.http.delete<void>(url_api, { headers: this.headers });
	}
	deleteClient(clientId: string): Observable<void> {
		const token = this.AuthRESTService.getToken();
		const url_api = `${this.yeoman.origin.restUrl}/api/clients/${clientId}/?access_token=${token}`;
		return this.http.delete<void>(url_api, { headers: this.headers });
	}	
	deleteProperty(propertyId: string): Observable<void> {
		const token = this.AuthRESTService.getToken();
		const url_api = `${this.yeoman.origin.restUrl}/api/propertys/${propertyId}/?access_token=${token}`;
		return this.http.delete<void>(url_api, { headers: this.headers });
	}	 
	saveOrder(order :OrderInterface){
		const url_api=	this.yeoman.origin.restUrl+'/api/orders';
		return this.http
		.post<CardInterface>(url_api, order)
		.pipe(map(data => data));
	}
	deleteMember(id: string){
		const token = this.AuthRESTService.getToken();
		const url_api=	this.yeoman.origin.restUrl+`/api/cards/${id}/?access_token$={token}`;
		return this.http
		.delete<MemberInterface>(url_api, {headers: this.headers})
		.pipe(map(data => data));
	}
	userUpdate(id: string, userUpdate: UserInterface) {
		const token = this.AuthRESTService.getToken();
		// const url_api = `${this.yeoman.origin.restUrl}/api/Users/${id}/?access_token=${token}`;
		const url_api = `${this.yeoman.origin.restUrl}/api/Users/${id}?access_token=${token}`;

		return this.http
		  .put<UserInterface>(url_api, userUpdate, { headers: this.headers })
		  .pipe(map(data => data));
	  }
	
	propertyUpdate(propertyData: any, id: string): Observable<any> {
		const url = `https://db.buckapi.lat:8055/api/collections/services/records/${id}`;
	
		// Realizar la solicitud PATCH para actualizar el registro
		return this.http.patch(url, propertyData).pipe(
		  map(response => response)
		);
	}
	
	
	
	
	
}
