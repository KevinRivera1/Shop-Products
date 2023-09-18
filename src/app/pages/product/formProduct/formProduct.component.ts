import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProductDto, ProductModel, UpdateProductDto } from 'src/app/models';
import { ProductsService } from 'src/app/services';

@Component({
  selector: 'app-formProduct',
  templateUrl: './formProduct.component.html',
  styleUrls: ['./formProduct.component.css']
})
export class FormProductComponent implements OnInit {

  @Output() nuevoProducto = new EventEmitter();
  listProducts: ProductModel[] = [];
  selectedProduct: UpdateProductDto = {};
  productForm!: FormGroup;
  response: any;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) {
  }

  ngOnInit() {
    this.IniciarForm();
    this.llenarListProducts();
  }

  IniciarForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      category: [''],
      images: [[]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });
  }

  async llenarListProducts() {
    try {
      const res: any = await this.productService.getAllProducts().toPromise();
      this.listProducts = res;
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
    }
  }

  saveProduct() {



    if (this.productForm.invalid || this.productForm.pristine) {
      if (this.productForm.invalid) {
        console.error("El formulario es inválido.");
      }

      if (this.productForm.pristine) {
        console.log("No se han realizado cambios en el formulario.", this.productForm);
      }
      return;
    }


    const formData = this.productForm.value;
    formData.categoryId = 1;
    // Convierte la propiedad images en un array si no lo es
    if (!Array.isArray(formData.images)) {
      formData.images = [formData.images];
    }

    console.log("Datos del formulario:", formData);
    console.log("Datos del formulario:", formData);

    if (formData.id === null) {
      this.createProduct(formData);
      this.resetProductForm();
    } else {
      this.updateProduct(formData);
    }
  }

  createProduct(formData: CreateProductDto) {
    console.log("Creando nuevo producto...");
    this.productService.createProduct(formData).subscribe({
      next: (data) => {
        this.response = data;
        console.log('Producto creado correctamente:', this.response);
        this.resetProductForm();
        this.llenarListProducts();
      },
      error: (error) => {
        console.error("Error al crear el producto:", error);
      },
      complete: () => {
        console.log("Petición finalizada.");
      }
    });
  }

  updateProduct(formData: UpdateProductDto) {
    console.log("Valor de this.selectedProduct:", this.selectedProduct);

    if (this.selectedProduct && this.selectedProduct.id !== undefined && typeof this.selectedProduct.id === 'number') {
      console.log("Actualizando producto existente...");
      console.log("ID del producto seleccionado:", this.selectedProduct.id);

      this.productService.getProductById(this.selectedProduct.id).subscribe({
        next: (existingProduct) => {
          console.log("Producto existente:", existingProduct);

          if (existingProduct && this.selectedProduct.id !== undefined) {
            console.log("Actualizando producto existente...");

            this.productService.updateProduct(this.selectedProduct.id, formData).subscribe({
              next: (data) => {
                this.response = data;
                console.log('Producto actualizado correctamente:', this.response);
                this.resetProductForm();
                this.llenarListProducts();
              },
              error: (error) => {
                console.error("Error al actualizar el producto:", error);
              },
              complete: () => {
                console.log("Petición finalizada.");
              }
            });
          } else {
            console.error("El producto seleccionado no existe en la base de datos.");
          }
        },
        error: (error) => {
          console.error("Error al verificar la existencia del producto:", error);
        }
      });
    } else {
      console.error("El producto seleccionado no tiene un ID válido.");
    }
  }

  resetProductForm() {
    const formValues = {
      id: null,
      title: '',
      price: null,
      description: '',
      images: [[]],
      category: ''
    };
    this.productForm.reset(formValues);
  }

  editarProducto(producto: ProductModel) {
    this.selectedProduct = {
      id: producto.id,
      title: producto.title,
      price: producto.price,
      description: producto.description,
      images: producto.images,
      category: producto.category
    };
    this.productForm.setValue(this.selectedProduct);
  }
}
