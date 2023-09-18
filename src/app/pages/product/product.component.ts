import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from 'rxjs';
import { CreateProductDto, ProductModel, UpdateProductDto } from "src/app/models/ProductModel";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() productos!: CreateProductDto;

  products: ProductModel[] = [];
  selectedProduct!: UpdateProductDto;

  productForm!: FormGroup;
  response: any;


  initialFormState: any;
  constructor(private formBuilder: FormBuilder, private productService: ProductsService) { }

  ngOnInit() {
    // this.IniciarForm();
    // this.obtenerProductos();
  }

  get f() {
    return this.productForm.controls;
  }


 /*  IniciarForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      category: [''],
      images: [[]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]]
    });
  } */


  // async obtenerProductos() {
  //   try {
  //     const res = await firstValueFrom(this.productService.getAllProducts());
  //     this.products = res;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


 /*  saveProduct() {
    if (this.productForm.invalid) {
      console.error("El formulario es inválido.");
      return;
    }

    const formData: CreateProductDto = this.productForm.value;
    formData.categoryId = 1;


    if (!Array.isArray(formData.images)) {
      formData.images = [];
    }

    
    const imagesString: string = this.productForm.controls['images'].value;

    
    const imagesArray: string[] = imagesString.split(',').map(url => url.trim());

    
    console.log("Imágenes válidas:", imagesArray);

    
    formData.images = imagesArray;

    console.log("Formulario de datos:", formData);

    console.log("Imágenes válidas:", formData.images);

    if (this.selectedProduct) {
      if (this.selectedProduct.id !== undefined) {
        console.log("ID del producto seleccionado:", this.selectedProduct.id);

        this.productService.getProductById(this.selectedProduct.id).subscribe(
          (existingProduct) => {
            console.log("Producto existente:", existingProduct);

            if (existingProduct && this.selectedProduct.id !== undefined) {
              console.log("Actualizando producto existente...");

              this.productService.updateProduct(this.selectedProduct.id, formData).subscribe({
                next: (data) => {
                  this.response = data;
                  console.log('Producto actualizado correctamente:', this.response);
                  this.resetProductForm();
                  this.IniciarForm();
                },
                error: (error) => {
                  console.error("Error al actualizar el producto:", error);
                },
                complete: () => {
                  this.IniciarForm();
                  this.resetProductForm();
                }
              });
            } else {
              
              console.error("El producto seleccionado no existe en la base de datos.");
              
            }
          },
          (error) => {
            console.error("Error al verificar la existencia del producto:", error);
            
          }
        );
      } else {
        console.error("El producto seleccionado no tiene un ID válido.");
        
      }
    } else {
      console.log("Creando nuevo producto...");

      this.productService.createProduct(formData).subscribe({
        next: (data) => {
          this.response = data;
          console.log('Producto creado correctamente:', this.response);
          this.productForm.reset();
          this.obtenerProductos();
          // Realiza acciones adicionales si es necesario
        },
        error: (error) => {
          console.error("Error al crear el producto:", error);
          
        },
        complete: () => {
          this.productForm.reset();
          this.obtenerProductos();
          return;
          // Realiza acciones de limpieza o redirección si es necesario
        }
      });
    }
  } */



  // resetProductForm() {
  //   const formValues = {
  //     id: null,
  //     title: '',
  //     price: null, // O el valor inicial adecuado para el campo price
  //     description: '',
  //     //images: ['https://i.ibb.co/SyQ3Szg/zeynep-sumer-lk3-F07-BN8-T8-unsplash.jpg'],
  //     images: [[]],
  //     category: ''
  //   };

  //   this.productForm.reset(formValues);
  // }

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
  //   this.productForm.setValue(formValues);
  // }


  // deleteProduct(id: number) {
  //   this.productService.deleteProduct(id).subscribe(
  //     (res: any) => {
  //       console.log(res);
  //       this.obtenerProductos();
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  //   console.log("delete product");
  // }

  // setearForm() {
  //   this.productForm.reset();
  //   this.IniciarForm();
  // }

}
