import { Injectable } from '@angular/core';

@Injectable()
export class InMemoryDataService {
	
	createDb() {
		const products = [
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
		
		return { products };
	}

  constructor() { }
}
