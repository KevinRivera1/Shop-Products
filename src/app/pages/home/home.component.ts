import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductsService } from 'src/app';
import { ProductModel } from 'src/app/models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	productos: ProductModel[] = [];
	loading: boolean = true;

	constructor(private productService: ProductsService) { }

	ngOnInit() {
		this.obtenerProductos();
	}

	async obtenerProductos() {
		try {
			const res = await firstValueFrom(this.productService.getAllProducts());
			this.productos = res;
			console.log('LLAMADA');
			console.log(this.productos);
			this.loading = false;
		} catch (err) {
			console.log(err);
		}
	}

}
