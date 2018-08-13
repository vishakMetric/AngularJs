import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { Observable, of, Subject, asapScheduler, pipe, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type':'application/json' })
}
const products= [
	{
		id: 1,
		name: 'iPhone',
		price: 10000
	},
	{
		id: 2,
		name: 'Vivo',
		price: 1000
	},
	{
		id: 3,
		name: 'Oppo',
		price: 100
	}
];

//{providedIn: 'root'}
@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  
  private productsUrl = '/api/products';
  
  private handleError<T> (operation = 'operation', result?:T) {
	  return (error : any):Observable<T> => {
		  console.error(error, 'Operation: ${operation}')
		  return of(result as T);
	  };
  };
  
  getProducts():Observable<Product[]> {
	  //return of(products);
	  //return of(products);
	  return this.http.get<Product[]>(this.productsUrl)
		.pipe(
			tap(products => console.log('Fetched Products!!')),
			catchError(this.handleError('getProducts',[]))
		);
  }
  
  getProduct(id: number): Observable<Product> {
	  
	  const url = '${this.productsUrl}/${id}';
	  console.log(url);
	  return this.http.get<Product>(url).pipe(
		tap(_ => console.log('Fetching Product By Id ${id}!')),
		catchError(this.handleError<Product>('getProduct id=${id}'))
		);  
  }
  
  updateProduct(product: Product): Observable<any> {
	  return this.http.put(this.productsUrl, product, httpOptions).pipe(
		tap(_ => console.log('Updating Product!')));
  }
  
  addProduct(product: Product): Observable<Product> {
	  return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
		tap(product: Product => console.log('New Product added!')));
	  
  }
  
}
