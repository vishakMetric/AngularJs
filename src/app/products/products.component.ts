import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	
	product: Product[];	
	selectedProduct : Product;
  constructor(private ProductService:ProductService) { }
  
  onSelectProduct(product) {
	  this.selectedProduct = product;
	  
	  this.ProductService.getProduct(2)
		.subscribe(product => console.log(product));
  }
	ngOnInit() {
	console.log("This is onInit hook");
	this.getProducts();
  }
  
  getProducts(): void {
	  const product = this.ProductService.getProducts()
				.subscribe(product => this.product=product);				
	  //this.product = product;  
  }
  
  save(product): void {
	  this.ProductService.updateProduct(product)
		.subscribe(() => console.log("product saved!!"));
  }
  
  add(name: string, price: number):void {
	  console.log(name, price);
	  this.ProductService.addProduct({ name, price } as Product)
	  .subscribe(product => { this.product.push(product)});
  }
}
