import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel, ProductsService, UpdateProductDto } from '../../../index';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-listProduct',
  templateUrl: './listProduct.component.html',
  styleUrls: ['./listProduct.component.css']
})
export class ListProductComponent implements OnInit {

  @Input() productos: ProductModel[] = [];
  @Output() eliminarProductos = new EventEmitter();

  selectedProduct: UpdateProductDto [] = [];
  productsEdit!: UpdateProductDto;
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


  editProduct(doc: UpdateProductDto) {
    this.productsEdit = {...doc};
    this.eliminarProductos.emit(doc)/* Pendiente codificacion output nombre */
  }
  

  // editProduct(product: UpdateProductDto) {
  //   // Asigna el producto seleccionado a la propiedad selectedProduct
  //   this.selectedProduct = product;

  //   // Crea un objeto que contiene los valores del formulario
  //   const formValues = {
  //     id: product.id,
  //     title: product.title,
  //     price: product.price,
  //     description: product.description,
  //     images: Array.isArray(product.images) ? product.images.join(', ') : '',
  //     category: product.category
  //   };

  //   // Establece los valores en el formulario
  //   //this.productForm.setValue(formValues);
  // }


  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (res: any) => {
        console.log(res);
        this.obtenerProductos();
      },
      (err: any) => {
        console.log(err);
      }
    );
    console.log("delete product");
  }

}
